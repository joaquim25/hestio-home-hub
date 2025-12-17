import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments, mockProperties } from '@/lib/mock-data';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Receipt,
  Wallet,
  TrendingDown,
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
  paid: 'Pago',
  pending: 'Pendente',
  overdue: 'Em Atraso',
};

export function TenantPayments() {
  const tenantPayments = mockPayments.filter(p => p.tenantId === '1');
  
  const totalPaid = tenantPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = tenantPayments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
  const totalOverdue = tenantPayments.filter(p => p.status === 'overdue').reduce((acc, p) => acc + p.amount, 0);
  const monthlyRent = 850;
  const paidThisYear = 10200;
  const totalYearlyRent = monthlyRent * 12;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">As Minhas Rendas</h1>
          <p className="text-muted-foreground mt-1">Gerencie os seus pagamentos de renda</p>
        </div>
        <Button size="lg" className="gap-2">
          <CreditCard className="h-5 w-5" />
          Pagar Renda
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Pago"
          value={`€${totalPaid.toLocaleString()}`}
          icon={CheckCircle2}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Renda Mensal"
          value={`€${monthlyRent}`}
          icon={Wallet}
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

      {/* Payment Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <TrendingDown className="h-5 w-5 text-primary" />
            Progresso Anual
          </CardTitle>
          <CardDescription>Rendas pagas este ano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>€{paidThisYear.toLocaleString()} pagos</span>
              <span>€{totalYearlyRent.toLocaleString()} total anual</span>
            </div>
            <Progress value={(paidThisYear / totalYearlyRent) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Faltam {12 - Math.floor(paidThisYear / monthlyRent)} meses para completar o ano
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Payment */}
      {tenantPayments.filter(p => p.status === 'pending').length > 0 && (
        <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <Clock className="h-5 w-5 text-primary" />
              Próximo Pagamento
            </CardTitle>
            <CardDescription>A sua renda está a aguardar pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {tenantPayments.filter(p => p.status === 'pending').slice(0, 2).map((payment) => {
                const property = mockProperties.find(p => p.id === payment.propertyId);
                const daysUntil = Math.ceil((new Date(payment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={payment.id} className="flex items-center justify-between p-5 rounded-2xl border bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{property?.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {daysUntil > 0 
                            ? `Vence em ${daysUntil} dias (${new Date(payment.dueDate).toLocaleDateString('pt-PT')})`
                            : daysUntil === 0 
                              ? 'Vence hoje!'
                              : `Venceu há ${Math.abs(daysUntil)} dias`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-primary">€{payment.amount}</p>
                      <Button size="sm" className="mt-3">Pagar Agora</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <CreditCard className="h-5 w-5" />
            Métodos de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Cartão •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expira 12/25</p>
              </div>
            </div>
            <Badge variant="outline">Predefinido</Badge>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Adicionar Método de Pagamento
          </Button>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display">Histórico de Rendas</CardTitle>
            <CardDescription>Todas as suas rendas pagas</CardDescription>
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
              <Input placeholder="Pesquisar..." className="pl-10" />
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
          </div>

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Descrição</TableHead>
                  <TableHead>Imóvel</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenantPayments.map((payment) => {
                  const property = mockProperties.find(p => p.id === payment.propertyId);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell className="text-muted-foreground">{property?.title}</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell className="font-display font-semibold">€{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[payment.status]}>
                          {statusLabels[payment.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'pending' ? (
                          <Button size="sm">Pagar</Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Receipt className="h-4 w-4 mr-1" />
                            Recibo
                          </Button>
                        )}
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
