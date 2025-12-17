import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments, mockProperties } from '@/lib/mock-data';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp,
  Euro,
  Percent,
  Target,
  Users,
  FileText,
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

export function AgentPayments() {
  const totalCommissions = 12450;
  const pendingCommissions = 3200;
  const monthlyTarget = 5000;
  const currentMonthCommissions = 3800;
  const targetProgress = (currentMonthCommissions / monthlyTarget) * 100;

  const commissions = [
    { id: '1', client: 'Maria Santos', property: 'T2 Alfama', type: 'Venda', value: 250000, commission: 7500, status: 'paid', date: '2024-01-15' },
    { id: '2', client: 'João Ferreira', property: 'T4 Cascais', type: 'Arrendamento', value: 2500, commission: 625, status: 'paid', date: '2024-01-10' },
    { id: '3', client: 'Ana Costa', property: 'Estúdio Baixa', type: 'Venda', value: 180000, commission: 5400, status: 'pending', date: '2024-01-20' },
    { id: '4', client: 'Pedro Oliveira', property: 'T1 Parque Nações', type: 'Arrendamento', value: 950, commission: 237, status: 'pending', date: '2024-01-25' },
  ];

  const clientPayments = [
    { id: '1', client: 'Maria Santos', amount: 250000, commission: 7500, status: 'completed' },
    { id: '2', client: 'João Ferreira', amount: 2500, commission: 625, status: 'completed' },
    { id: '3', client: 'Ana Costa', amount: 180000, commission: 5400, status: 'processing' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Comissões</h1>
          <p className="text-muted-foreground mt-1">Acompanhe as suas comissões e transações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
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
        <StatsCard
          title="Total Ganho"
          value={`€${totalCommissions.toLocaleString()}`}
          description="Este ano"
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Este Mês"
          value={`€${currentMonthCommissions.toLocaleString()}`}
          description="+18% vs mês anterior"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pendente"
          value={`€${pendingCommissions.toLocaleString()}`}
          description="A receber"
          icon={Clock}
        />
        <StatsCard
          title="Taxa Média"
          value="2.5%"
          description="Comissão média"
          icon={Percent}
        />
      </div>

      {/* Monthly Target & Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Meta Mensal
            </CardTitle>
            <CardDescription>Progresso este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-display font-bold text-primary">
                  {targetProgress.toFixed(0)}%
                </span>
                <div className="text-right">
                  <p className="text-lg font-semibold">€{currentMonthCommissions.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">de €{monthlyTarget.toLocaleString()}</p>
                </div>
              </div>
              <Progress value={targetProgress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Faltam €{(monthlyTarget - currentMonthCommissions).toLocaleString()} para atingir a meta
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Transações por Cliente
            </CardTitle>
            <CardDescription>Últimas transações fechadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{payment.client}</p>
                    <p className="text-sm text-muted-foreground">
                      Transação: €{payment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">€{payment.commission.toLocaleString()}</p>
                    <Badge variant={payment.status === 'completed' ? 'success' : 'warning'} className="text-xs">
                      {payment.status === 'completed' ? 'Recebido' : 'Processando'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Commissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Comissões Pendentes
          </CardTitle>
          <CardDescription>Comissões a receber das últimas transações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {commissions.filter(c => c.status === 'pending').map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <p className="font-medium">{commission.property}</p>
                  <p className="text-sm text-muted-foreground">{commission.client}</p>
                  <Badge variant="outline" className="mt-1">{commission.type}</Badge>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-primary">
                    €{commission.commission.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {commission.type === 'Venda' ? '3%' : '25%'} de €{commission.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commission History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Comissões</CardTitle>
            <CardDescription>Todas as suas comissões</CardDescription>
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
              <Input placeholder="Pesquisar por cliente ou imóvel..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Recebidos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sale">Vendas</SelectItem>
                <SelectItem value="rent">Arrendamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Cliente</TableHead>
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.client}</TableCell>
                    <TableCell>{commission.property}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{commission.type}</Badge>
                    </TableCell>
                    <TableCell>€{commission.value.toLocaleString()}</TableCell>
                    <TableCell className="font-display font-semibold text-primary">
                      €{commission.commission.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[commission.status]}>
                        {commission.status === 'paid' ? 'Recebido' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(commission.date).toLocaleDateString('pt-PT')}
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
