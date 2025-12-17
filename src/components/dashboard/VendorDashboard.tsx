import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types';
import {
  Wrench,
  Euro,
  TrendingUp,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Star,
  MapPin,
  Phone,
  ClipboardList,
  Receipt,
  Users,
  Building2,
  Timer,
  CalendarDays,
  CircleDollarSign,
  Hammer,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { month: 'Jul', revenue: 3200, jobs: 12 },
  { month: 'Ago', revenue: 4100, jobs: 15 },
  { month: 'Set', revenue: 3800, jobs: 14 },
  { month: 'Out', revenue: 4500, jobs: 18 },
  { month: 'Nov', revenue: 4200, jobs: 16 },
  { month: 'Dez', revenue: 5100, jobs: 21 },
];

// Mock work orders
const mockWorkOrders = [
  { 
    id: '1', 
    title: 'Reparação de canalização', 
    client: 'Edifício Aurora',
    clientType: 'Condomínio',
    address: 'Rua da Liberdade, 45',
    status: 'in-progress',
    priority: 'high',
    scheduledDate: '2024-12-17',
    scheduledTime: '09:00',
    estimatedValue: 250,
  },
  { 
    id: '2', 
    title: 'Manutenção elevador', 
    client: 'Torre Atlântico',
    clientType: 'Condomínio',
    address: 'Av. da República, 120',
    status: 'pending',
    priority: 'high',
    scheduledDate: '2024-12-18',
    scheduledTime: '14:00',
    estimatedValue: 450,
  },
  { 
    id: '3', 
    title: 'Instalação ar condicionado', 
    client: 'Ana Costa',
    clientType: 'Particular',
    address: 'Rua das Flores, 22',
    status: 'scheduled',
    priority: 'medium',
    scheduledDate: '2024-12-19',
    scheduledTime: '10:30',
    estimatedValue: 380,
  },
  { 
    id: '4', 
    title: 'Revisão sistema elétrico', 
    client: 'Residencial Sol Nascente',
    clientType: 'Condomínio',
    address: 'Praça Central, 8',
    status: 'pending',
    priority: 'low',
    scheduledDate: '2024-12-20',
    scheduledTime: '09:00',
    estimatedValue: 180,
  },
  { 
    id: '5', 
    title: 'Limpeza de fachada', 
    client: 'Vila Verde',
    clientType: 'Condomínio',
    address: 'Rua do Parque, 15',
    status: 'completed',
    priority: 'medium',
    scheduledDate: '2024-12-15',
    scheduledTime: '08:00',
    estimatedValue: 600,
  },
];

// Mock invoices
const mockInvoices = [
  { id: '1', client: 'Edifício Aurora', description: 'Reparação canalização', amount: 245, status: 'paid', date: '2024-12-10' },
  { id: '2', client: 'Torre Atlântico', description: 'Manutenção mensal', amount: 350, status: 'pending', date: '2024-12-12' },
  { id: '3', client: 'Ana Costa', description: 'Instalação tomadas', amount: 120, status: 'overdue', date: '2024-11-28' },
  { id: '4', client: 'Vila Verde', description: 'Limpeza fachada', amount: 600, status: 'pending', date: '2024-12-15' },
];

// Mock clients
const mockClients = [
  { id: '1', name: 'Edifício Aurora', type: 'Condomínio', contact: 'Ana Ferreira', totalJobs: 12, totalRevenue: 4500, rating: 5 },
  { id: '2', name: 'Torre Atlântico', type: 'Condomínio', contact: 'Carlos Silva', totalJobs: 8, totalRevenue: 3200, rating: 4 },
  { id: '3', name: 'Residencial Sol Nascente', type: 'Condomínio', contact: 'Maria Costa', totalJobs: 15, totalRevenue: 5800, rating: 5 },
  { id: '4', name: 'Ana Costa', type: 'Particular', contact: 'Ana Costa', totalJobs: 3, totalRevenue: 450, rating: 5 },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'destructive' | 'secondary'> = {
  'completed': 'success',
  'in-progress': 'default',
  'scheduled': 'secondary',
  'pending': 'warning',
  'paid': 'success',
  'overdue': 'destructive',
};

const statusLabels: Record<string, string> = {
  'completed': 'Concluído',
  'in-progress': 'Em Curso',
  'scheduled': 'Agendado',
  'pending': 'Pendente',
  'paid': 'Pago',
  'overdue': 'Em Atraso',
};

const priorityColors: Record<string, 'destructive' | 'warning' | 'secondary'> = {
  high: 'destructive',
  medium: 'warning',
  low: 'secondary',
};

interface VendorDashboardProps {
  user: User;
}

export function VendorDashboard({ user }: VendorDashboardProps) {
  // Calculate metrics
  const pendingOrders = mockWorkOrders.filter(w => w.status === 'pending' || w.status === 'scheduled').length;
  const inProgressOrders = mockWorkOrders.filter(w => w.status === 'in-progress').length;
  const completedOrders = mockWorkOrders.filter(w => w.status === 'completed').length;
  const todayOrders = mockWorkOrders.filter(w => w.scheduledDate === '2024-12-17').length;
  
  const totalRevenue = revenueData.reduce((acc, r) => acc + r.revenue, 0);
  const currentMonthRevenue = revenueData[revenueData.length - 1].revenue;
  const currentMonthJobs = revenueData[revenueData.length - 1].jobs;
  
  const pendingInvoices = mockInvoices.filter(i => i.status === 'pending');
  const overdueInvoices = mockInvoices.filter(i => i.status === 'overdue');
  const pendingAmount = pendingInvoices.reduce((acc, i) => acc + i.amount, 0);
  const overdueAmount = overdueInvoices.reduce((acc, i) => acc + i.amount, 0);
  
  const avgRating = (mockClients.reduce((acc, c) => acc + c.rating, 0) / mockClients.length).toFixed(1);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Painel de prestador de serviços
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Nova Fatura
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Trabalho
          </Button>
        </div>
      </div>

      {/* Today's Schedule Banner */}
      {todayOrders > 0 && (
        <Card className="mb-6 border-l-4 border-l-primary bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">
                    Tem {todayOrders} trabalho(s) agendado(s) para hoje
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Próximo: Reparação de canalização às 09:00
                  </p>
                </div>
              </div>
              <Button size="sm">
                Ver Agenda
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overdue Invoice Alert */}
      {overdueInvoices.length > 0 && (
        <Card className="mb-6 border-l-4 border-l-destructive bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">
                    {overdueInvoices.length} fatura(s) em atraso
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total: €{overdueAmount} por receber
                  </p>
                </div>
              </div>
              <Link to="/payments">
                <Button size="sm" variant="destructive">
                  Ver Faturas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Trabalhos Ativos</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {pendingOrders + inProgressOrders}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {inProgressOrders} em curso • {pendingOrders} agendados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Euro className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Faturação (Mês)</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{currentMonthRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">+21%</span>
              <span className="text-sm text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <CircleDollarSign className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Por Receber</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{(pendingAmount + overdueAmount).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {pendingInvoices.length + overdueInvoices.length} faturas pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Avaliação</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {avgRating}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= Math.round(Number(avgRating)) ? 'text-warning fill-warning' : 'text-muted'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Faturação Mensal</CardTitle>
                <CardDescription>Receita e trabalhos concluídos</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total (6 meses)</p>
                <p className="font-display text-xl font-bold">€{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorVendorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `€${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? `€${value.toLocaleString()}` : value,
                      name === 'revenue' ? 'Receita' : 'Trabalhos'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVendorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="font-display text-2xl font-bold">{currentMonthJobs}</p>
                <p className="text-xs text-muted-foreground">Trabalhos este mês</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold">€{Math.round(currentMonthRevenue / currentMonthJobs)}</p>
                <p className="text-xs text-muted-foreground">Valor médio/trabalho</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-success">{completedOrders}</p>
                <p className="text-xs text-muted-foreground">Concluídos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Agenda de Hoje</CardTitle>
              <CardDescription>17 Dezembro 2024</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Calendário
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockWorkOrders
                .filter(w => w.scheduledDate === '2024-12-17')
                .map((order) => (
                  <div key={order.id} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={statusColors[order.status]} className="text-xs">
                        {statusLabels[order.status]}
                      </Badge>
                      <span className="text-sm font-medium">{order.scheduledTime}</span>
                    </div>
                    <p className="font-medium text-sm">{order.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {order.address}
                    </p>
                  </div>
                ))}
              {mockWorkOrders.filter(w => w.scheduledDate === '2024-12-17').length === 0 && (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Sem trabalhos para hoje</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ordens de Trabalho</CardTitle>
              <CardDescription>Trabalhos ativos e pendentes</CardDescription>
            </div>
            <Link to="/maintenance">
              <Button variant="outline" size="sm">
                Ver Todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockWorkOrders.filter(w => w.status !== 'completed').slice(0, 4).map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`p-3 rounded-lg ${
                    order.status === 'in-progress' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Hammer className={`h-5 w-5 ${
                      order.status === 'in-progress' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{order.title}</h4>
                      <Badge variant={priorityColors[order.priority]} className="text-xs">
                        {order.priority === 'high' ? 'Urgente' : order.priority === 'medium' ? 'Normal' : 'Baixa'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.client} • {order.clientType}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(order.scheduledDate).toLocaleDateString('pt-PT')} às {order.scheduledTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold">€{order.estimatedValue}</p>
                    <Badge variant={statusColors[order.status]} className="text-xs mt-1">
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-11" variant="default">
              <Plus className="h-4 w-4 mr-3" />
              Registar Trabalho
            </Button>
            <Button className="w-full justify-start h-11" variant="outline">
              <Receipt className="h-4 w-4 mr-3" />
              Emitir Fatura
            </Button>
            <Link to="/maintenance" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <ClipboardList className="h-4 w-4 mr-3" />
                Ver Ordens
              </Button>
            </Link>
            <Link to="/messages" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <MessageSquare className="h-4 w-4 mr-3" />
                Mensagens
              </Button>
            </Link>
            <Link to="/documents" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <FileText className="h-4 w-4 mr-3" />
                Documentos
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Faturas Recentes</CardTitle>
              <CardDescription>Estado de pagamentos</CardDescription>
            </div>
            <Link to="/payments">
              <Button variant="ghost" size="sm">
                Ver Todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      invoice.status === 'paid' ? 'bg-success/10' : 
                      invoice.status === 'overdue' ? 'bg-destructive/10' : 'bg-warning/10'
                    }`}>
                      {invoice.status === 'paid' ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : invoice.status === 'overdue' ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">{invoice.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold">€{invoice.amount}</p>
                    <Badge variant={statusColors[invoice.status]} className="text-xs">
                      {statusLabels[invoice.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Principais Clientes</CardTitle>
            <CardDescription>Por volume de trabalho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockClients.slice(0, 4).map((client) => (
                <div key={client.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {client.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-sm">€{client.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="h-3 w-3 text-warning fill-warning" />
                      <span className="text-xs">{client.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
