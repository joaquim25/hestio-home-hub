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
  FileText,
  TrendingUp,
  Euro,
  Plus,
  Send,
  Users,
  Calendar,
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

export function VendorPayments() {
  const totalEarned = 45200;
  const pendingInvoices = 8400;
  const overdueAmount = 1200;
  const monthlyRevenue = 6800;
  const avgPaymentTime = 18;

  const invoices = [
    { id: 'INV-001', client: 'Ed. Aurora', service: 'Manutenção Elevador', amount: 450, status: 'paid', date: '2024-01-15', dueDate: '2024-01-30' },
    { id: 'INV-002', client: 'Ed. Belém', service: 'Reparação Canalização', amount: 280, status: 'pending', date: '2024-01-18', dueDate: '2024-02-02' },
    { id: 'INV-003', client: 'Maria Santos', service: 'Instalação AC', amount: 1200, status: 'pending', date: '2024-01-20', dueDate: '2024-02-05' },
    { id: 'INV-004', client: 'Ed. Central', service: 'Manutenção Elétrica', amount: 380, status: 'overdue', date: '2024-01-05', dueDate: '2024-01-20' },
    { id: 'INV-005', client: 'João Ferreira', service: 'Pintura Interior', amount: 850, status: 'paid', date: '2024-01-10', dueDate: '2024-01-25' },
  ];

  const clientSummary = [
    { id: '1', name: 'Condomínios ABC Lda', totalBilled: 12400, pending: 2800, onTime: 95 },
    { id: '2', name: 'Gestão Imobiliária XYZ', totalBilled: 8600, pending: 1200, onTime: 88 },
    { id: '3', name: 'Clientes Particulares', totalBilled: 6200, pending: 850, onTime: 92 },
  ];

  const monthlyTrend = [
    { month: 'Out', amount: 5200 },
    { month: 'Nov', amount: 5800 },
    { month: 'Dez', amount: 6400 },
    { month: 'Jan', amount: 6800 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Faturação</h1>
          <p className="text-muted-foreground mt-1">Gerencie as suas faturas e pagamentos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Fatura
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Faturado"
          value={`€${totalEarned.toLocaleString()}`}
          description="Este ano"
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Este Mês"
          value={`€${monthlyRevenue.toLocaleString()}`}
          description="+6.3% vs mês anterior"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pendente"
          value={`€${pendingInvoices.toLocaleString()}`}
          description="A receber"
          icon={Clock}
        />
        <StatsCard
          title="Em Atraso"
          value={`€${overdueAmount.toLocaleString()}`}
          description="Necessita cobrança"
          icon={AlertTriangle}
        />
      </div>

      {/* Pending Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Faturas Pendentes
          </CardTitle>
          <CardDescription>Aguardando pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invoices.filter(inv => inv.status !== 'paid').map((invoice) => {
              const daysUntil = Math.ceil((new Date(invoice.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={invoice.id} className={`p-4 rounded-lg border ${invoice.status === 'overdue' ? 'border-red-200 bg-red-50 dark:bg-red-950' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{invoice.id}</Badge>
                    <Badge variant={statusColors[invoice.status]}>
                      {invoice.status === 'pending' ? 'Pendente' : 'Em Atraso'}
                    </Badge>
                  </div>
                  <p className="font-medium">{invoice.client}</p>
                  <p className="text-sm text-muted-foreground">{invoice.service}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-display text-xl font-bold text-primary">€{invoice.amount}</p>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {daysUntil > 0 ? `Vence em ${daysUntil} dias` : `Venceu há ${Math.abs(daysUntil)} dias`}
                      </p>
                      <Button variant="outline" size="sm" className="mt-1">
                        <Send className="h-3 w-3 mr-1" />
                        Lembrar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Client Summary & Payment Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Resumo por Cliente
            </CardTitle>
            <CardDescription>Faturação e taxas de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientSummary.map((client) => (
                <div key={client.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{client.name}</p>
                    <Badge variant={client.onTime >= 90 ? 'success' : 'warning'}>
                      {client.onTime}% pontual
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total faturado: €{client.totalBilled.toLocaleString()}</span>
                    <span className="font-semibold">Pendente: €{client.pending}</span>
                  </div>
                  <Progress value={(client.totalBilled - client.pending) / client.totalBilled * 100} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Estatísticas de Pagamento
            </CardTitle>
            <CardDescription>Métricas de faturação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Tempo Médio de Pagamento</p>
                <p className="text-3xl font-display font-bold">{avgPaymentTime} dias</p>
                <p className="text-sm text-green-600 mt-1">-2 dias vs mês anterior</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-3">Tendência Mensal</p>
                <div className="flex items-end gap-2 h-24">
                  {monthlyTrend.map((month, i) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary/20 rounded-t"
                        style={{ height: `${(month.amount / 7000) * 100}%` }}
                      >
                        <div 
                          className="w-full bg-primary rounded-t transition-all"
                          style={{ height: i === monthlyTrend.length - 1 ? '100%' : '70%' }}
                        />
                      </div>
                      <p className="text-xs mt-1">{month.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Faturas Emitidas</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Cobrança</p>
                  <p className="text-2xl font-bold text-green-600">91%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Faturas</CardTitle>
            <CardDescription>Todas as suas faturas emitidas</CardDescription>
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
              <Input placeholder="Pesquisar por cliente ou serviço..." className="pl-10" />
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
                <SelectValue placeholder="Cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="condo">Condomínios</SelectItem>
                <SelectItem value="private">Particulares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Nº Fatura</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.service}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className="font-display font-semibold">€{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[invoice.status]}>
                        {invoice.status === 'paid' ? 'Pago' : invoice.status === 'pending' ? 'Pendente' : 'Atraso'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Euro className="h-4 w-4 mr-1" />
                        Ver
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
