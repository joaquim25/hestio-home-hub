import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  TrendingUp,
  Euro,
  PieChart,
  Users,
  FileText,
  MapPin,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
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

export function GovernmentPayments() {
  const totalCollected = 2450000;
  const monthlyCollection = 285000;
  const pendingAmount = 124000;
  const overdueAmount = 42000;
  const avgCollectionRate = 91;
  const subsidizedAmount = 380000;

  const districtCollection = [
    { id: '1', district: 'Lisboa Norte', units: 450, collected: 92, amount: 85000, pending: 7200 },
    { id: '2', district: 'Lisboa Sul', units: 380, collected: 89, amount: 72000, pending: 8800 },
    { id: '3', district: 'Sintra', units: 520, collected: 94, amount: 98000, pending: 6000 },
    { id: '4', district: 'Cascais', units: 280, collected: 88, amount: 52000, pending: 7200 },
    { id: '5', district: 'Almada', units: 340, collected: 90, amount: 64000, pending: 7000 },
  ];

  const subsidyBreakdown = [
    { type: 'Subsídio Total', count: 245, amount: 180000 },
    { type: 'Subsídio Parcial (75%)', count: 312, amount: 120000 },
    { type: 'Subsídio Parcial (50%)', count: 428, amount: 80000 },
    { type: 'Sem Subsídio', count: 985, amount: 0 },
  ];

  const recentPayments = [
    { id: '1', tenant: 'Maria Silva', district: 'Lisboa Norte', type: 'Renda Social', amount: 150, subsidized: 250, status: 'paid', date: '2024-01-20' },
    { id: '2', tenant: 'João Santos', district: 'Sintra', type: 'Renda Apoiada', amount: 280, subsidized: 120, status: 'paid', date: '2024-01-19' },
    { id: '3', tenant: 'Ana Costa', district: 'Lisboa Sul', type: 'Renda Social', amount: 180, subsidized: 220, status: 'pending', date: '2024-01-25' },
    { id: '4', tenant: 'Pedro Oliveira', district: 'Cascais', type: 'Renda Apoiada', amount: 320, subsidized: 80, status: 'overdue', date: '2024-01-10' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Gestão de Rendas</h1>
          <p className="text-muted-foreground mt-1">Cobrança e subsídios de habitação social</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PieChart className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <StatsCard
          title="Total Cobrado"
          value={`€${(totalCollected / 1000).toFixed(0)}k`}
          description="Este ano"
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Cobrança Mensal"
          value={`€${(monthlyCollection / 1000).toFixed(0)}k`}
          description="+2.1% vs mês anterior"
          icon={TrendingUp}
        />
        <StatsCard
          title="Taxa Cobrança"
          value={`${avgCollectionRate}%`}
          description="Média distritos"
          icon={Percent}
        />
        <StatsCard
          title="Pendente"
          value={`€${(pendingAmount / 1000).toFixed(0)}k`}
          description="A receber"
          icon={Clock}
        />
        <StatsCard
          title="Em Atraso"
          value={`€${(overdueAmount / 1000).toFixed(0)}k`}
          description="Necessita ação"
          icon={AlertTriangle}
        />
      </div>

      {/* District Collection Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Cobrança por Distrito
          </CardTitle>
          <CardDescription>Performance de cobrança por área geográfica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtCollection.map((district) => (
              <div key={district.id} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">{district.district}</p>
                    <p className="text-sm text-muted-foreground">{district.units} habitações</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{district.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Pendente: €{district.pending.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={district.collected} className="h-2 flex-1" />
                  <Badge variant={district.collected >= 92 ? 'success' : district.collected >= 88 ? 'warning' : 'destructive'}>
                    {district.collected}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subsidy Distribution & Financial Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Distribuição de Subsídios
            </CardTitle>
            <CardDescription>Apoios atribuídos este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subsidyBreakdown.map((subsidy) => (
                <div key={subsidy.type} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{subsidy.type}</p>
                    <p className="text-sm text-muted-foreground">{subsidy.count} beneficiários</p>
                  </div>
                  <div className="text-right">
                    {subsidy.amount > 0 ? (
                      <p className="font-semibold text-primary">€{subsidy.amount.toLocaleString()}</p>
                    ) : (
                      <Badge variant="outline">N/A</Badge>
                    )}
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-lg bg-primary/10 mt-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Total Subsídios Mensais</p>
                  <p className="font-display text-xl font-bold text-primary">€{subsidizedAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Resumo Financeiro
            </CardTitle>
            <CardDescription>Balanço mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rendas Cobradas</p>
                    <p className="text-2xl font-bold text-green-600">€{monthlyCollection.toLocaleString()}</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Subsídios Atribuídos</p>
                    <p className="text-2xl font-bold text-blue-600">€{subsidizedAmount.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dívida Acumulada</p>
                    <p className="text-2xl font-bold text-red-600">€{overdueAmount.toLocaleString()}</p>
                  </div>
                  <ArrowDownRight className="h-8 w-8 text-red-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Famílias Apoiadas</p>
                  <p className="text-2xl font-bold">985</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renda Média</p>
                  <p className="text-2xl font-bold">€189</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Movimentos Recentes</CardTitle>
            <CardDescription>Pagamentos e cobranças</CardDescription>
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
              <Input placeholder="Pesquisar por nome ou NIF..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Pagos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="overdue">Em Atraso</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Distrito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {districtCollection.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo Renda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="social">Renda Social</SelectItem>
                <SelectItem value="apoiada">Renda Apoiada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Distrito</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Renda</TableHead>
                  <TableHead>Subsídio</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.tenant}</TableCell>
                    <TableCell>{payment.district}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.type}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">€{payment.amount}</TableCell>
                    <TableCell className="text-blue-600">€{payment.subsidized}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'paid' ? 'success' : payment.status === 'pending' ? 'warning' : 'destructive'}>
                        {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Atraso'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
