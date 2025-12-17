import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments, mockProperties } from '@/lib/mock-data';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Euro,
  Building2,
  Users,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const statusColors: Record<string, 'success' | 'warning' | 'destructive'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
};

const statusLabels: Record<string, string> = {
  paid: 'Recebido',
  pending: 'Pendente',
  overdue: 'Em Atraso',
};

export function OwnerPayments() {
  const totalReceived = mockPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
  const totalOverdue = mockPayments.filter(p => p.status === 'overdue').reduce((acc, p) => acc + p.amount, 0);
  const collectionRate = 94;
  const monthlyIncome = 4250;
  const lastMonthIncome = 3900;
  const incomeChange = ((monthlyIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1);

  const propertyIncomes = [
    { id: '1', title: 'Apartamento T2 Alfama', income: 1200, collected: 1200, status: 'paid' },
    { id: '2', title: 'Moradia T4 Cascais', income: 2500, collected: 2500, status: 'paid' },
    { id: '3', title: 'Estúdio Baixa', income: 850, collected: 0, status: 'pending' },
    { id: '4', title: 'T1 Parque das Nações', income: 950, collected: 950, status: 'paid' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Receitas</h1>
          <p className="text-muted-foreground mt-1">Acompanhe os pagamentos das suas propriedades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PieChart className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Recebido"
          value={`€${totalReceived.toLocaleString()}`}
          icon={CheckCircle2}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Receita Mensal"
          value={`€${monthlyIncome.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: Number(incomeChange), isPositive: Number(incomeChange) >= 0 }}
        />
        <MetricCard
          title="Pendente"
          value={`€${totalPending.toLocaleString()}`}
          icon={Clock}
        />
        <MetricCard
          title="Em Atraso"
          value={`€${totalOverdue.toLocaleString()}`}
          icon={AlertTriangle}
        />
      </div>

      {/* Collection Rate & Income by Property */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <TrendingUp className="h-5 w-5 text-primary" />
              Taxa de Cobrança
            </CardTitle>
            <CardDescription>Eficiência na cobrança de rendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-display font-bold text-primary">{collectionRate}%</span>
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +2.5%
                </Badge>
              </div>
              <Progress value={collectionRate} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 rounded-xl bg-success/10">
                  <p className="text-2xl font-bold text-success">8</p>
                  <p className="text-xs text-muted-foreground">Pagos</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-warning/10">
                  <p className="text-2xl font-bold text-warning">1</p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-destructive/10">
                  <p className="text-2xl font-bold text-destructive">0</p>
                  <p className="text-xs text-muted-foreground">Em Atraso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <Building2 className="h-5 w-5 text-primary" />
              Receita por Imóvel
            </CardTitle>
            <CardDescription>Este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {propertyIncomes.map((prop) => (
                <div key={prop.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{prop.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress 
                        value={(prop.collected / prop.income) * 100} 
                        className="h-2 flex-1" 
                      />
                      <span className="text-xs text-muted-foreground w-12">
                        {Math.round((prop.collected / prop.income) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold">€{prop.collected}</p>
                    <p className="text-xs text-muted-foreground">de €{prop.income}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payments */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Clock className="h-5 w-5 text-primary" />
            Rendas a Receber
          </CardTitle>
          <CardDescription>Pagamentos pendentes dos seus inquilinos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {mockPayments.filter(p => p.status === 'pending').slice(0, 4).map((payment) => {
              const property = mockProperties.find(p => p.id === payment.propertyId);
              const daysUntil = Math.ceil((new Date(payment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl border bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{property?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {daysUntil > 0 ? `Vence em ${daysUntil} dias` : 'Vencido'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold">€{payment.amount}</p>
                    <Button variant="outline" size="sm" className="mt-1">Lembrar</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display">Histórico de Receitas</CardTitle>
            <CardDescription>Todas as rendas recebidas</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar por imóvel ou inquilino..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Recebidos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="overdue">Em Atraso</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {mockProperties.slice(0, 4).map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => {
                  const property = mockProperties.find(p => p.id === payment.propertyId);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{property?.title}</TableCell>
                      <TableCell className="text-muted-foreground">João Silva</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell className="font-display font-semibold">€{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[payment.status]}>
                          {statusLabels[payment.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Euro className="h-4 w-4 mr-1" />
                          Fatura
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
