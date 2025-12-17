import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments, mockProperties } from '@/lib/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  CreditCard,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
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
import { StatsCard } from '@/components/dashboard/StatsCard';

const statusIcons = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertTriangle,
};

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

export default function Payments() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const totalPaid = mockPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
  const totalOverdue = mockPayments.filter(p => p.status === 'overdue').reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Pagamentos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os seus pagamentos e histórico financeiro
            </p>
          </div>
          {user?.role === 'tenant' && (
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Pagar Renda
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatsCard
            title="Total Pago"
            value={`€${totalPaid.toLocaleString()}`}
            description="Este ano"
            icon={CheckCircle2}
            variant="accent"
          />
          <StatsCard
            title="Pendente"
            value={`€${totalPending.toLocaleString()}`}
            description="A aguardar pagamento"
            icon={Clock}
          />
          <StatsCard
            title="Em Atraso"
            value={`€${totalOverdue.toLocaleString()}`}
            description="Requer atenção"
            icon={AlertTriangle}
          />
        </div>

        {/* Upcoming Payments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Próximos Pagamentos</CardTitle>
            <CardDescription>Pagamentos agendados para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {mockPayments.filter(p => p.status === 'pending').slice(0, 2).map((payment) => {
                const property = mockProperties.find(p => p.id === payment.propertyId);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{property?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Vence: {new Date(payment.dueDate).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-bold">€{payment.amount}</p>
                      <Button size="sm" className="mt-2">Pagar Agora</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>Todas as suas transações</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
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

            {/* Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Descrição</TableHead>
                    <TableHead>Imóvel</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayments.map((payment) => {
                    const property = mockProperties.find(p => p.id === payment.propertyId);
                    const StatusIcon = statusIcons[payment.status];
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.description}</TableCell>
                        <TableCell className="text-muted-foreground">{property?.title}</TableCell>
                        <TableCell>{new Date(payment.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                        <TableCell className="font-display font-semibold">€{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant={statusColors[payment.status]} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusLabels[payment.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Ver Fatura
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
      </main>
    </div>
  );
}
