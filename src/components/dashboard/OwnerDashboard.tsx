import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties, mockPayments, mockMaintenanceRequests, mockUsers } from '@/lib/mock-data';
import { User } from '@/types';
import {
  Building2,
  CreditCard,
  Wrench,
  TrendingUp,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Percent,
  Euro,
  Home,
  UserCheck,
  Bell,
  BarChart3,
  MapPin,
  Eye,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const revenueData = [
  { month: 'Jul', value: 4200, expected: 4500 },
  { month: 'Ago', value: 4800, expected: 4500 },
  { month: 'Set', value: 4500, expected: 4500 },
  { month: 'Out', value: 5200, expected: 4500 },
  { month: 'Nov', value: 4900, expected: 4500 },
  { month: 'Dez', value: 5400, expected: 4500 },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'destructive'> = {
  pending: 'warning',
  'in-progress': 'default',
  completed: 'success',
  paid: 'success',
  overdue: 'destructive',
};

interface OwnerDashboardProps {
  user: User;
}

export function OwnerDashboard({ user }: OwnerDashboardProps) {
  // Owner's properties
  const ownerProperties = mockProperties.filter(p => p.ownerId === '2');
  const occupiedProperties = ownerProperties.filter(p => p.status === 'occupied');
  const availableProperties = ownerProperties.filter(p => p.status === 'available');
  const maintenanceProperties = ownerProperties.filter(p => p.status === 'maintenance');
  
  // Financial data
  const allPayments = mockPayments;
  const paidPayments = allPayments.filter(p => p.status === 'paid');
  const pendingPayments = allPayments.filter(p => p.status === 'pending');
  const overduePayments = allPayments.filter(p => p.status === 'overdue');
  
  const totalRevenue = paidPayments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = pendingPayments.reduce((acc, p) => acc + p.amount, 0);
  const overdueAmount = overduePayments.reduce((acc, p) => acc + p.amount, 0);
  const expectedMonthlyRevenue = ownerProperties.reduce((acc, p) => acc + p.price, 0);
  
  // Maintenance
  const maintenanceRequests = mockMaintenanceRequests;
  const pendingMaintenance = maintenanceRequests.filter(m => m.status === 'pending');
  const inProgressMaintenance = maintenanceRequests.filter(m => m.status === 'in-progress');
  
  // Occupancy rate
  const occupancyRate = ownerProperties.length > 0 
    ? Math.round((occupiedProperties.length / ownerProperties.length) * 100) 
    : 0;

  // Pie chart data for property status
  const propertyStatusData = [
    { name: 'Ocupados', value: occupiedProperties.length, color: 'hsl(var(--success))' },
    { name: 'Disponíveis', value: availableProperties.length, color: 'hsl(var(--primary))' },
    { name: 'Manutenção', value: maintenanceProperties.length, color: 'hsl(var(--warning))' },
  ].filter(d => d.value > 0);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do seu portfolio imobiliário
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/reports">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
          </Link>
          <Link to="/properties/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Imóvel
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert Banner for Overdue Payments */}
      {overduePayments.length > 0 && (
        <Card className="mb-6 border-l-4 border-l-destructive bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">
                    {overduePayments.length} pagamento(s) em atraso
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total de €{overdueAmount.toLocaleString()} por receber
                  </p>
                </div>
              </div>
              <Link to="/payments">
                <Button size="sm" variant="destructive">
                  Ver Detalhes
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
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Portfolio</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {ownerProperties.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Imóveis • {occupiedProperties.length} ocupados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Euro className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Receita Anual</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">+12%</span>
              <span className="text-sm text-muted-foreground">vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Percent className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Taxa Ocupação</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {occupancyRate}%
            </p>
            <Progress value={occupancyRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Por Receber</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{(pendingAmount + overdueAmount).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {pendingPayments.length + overduePayments.length} pagamentos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>Evolução nos últimos 6 meses</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Recebido</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorOwnerRevenue" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(value: number) => [`€${value.toLocaleString()}`, 'Receita']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOwnerRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Receita Mensal Esperada</p>
                <p className="font-display text-xl font-bold">€{expectedMonthlyRevenue.toLocaleString()}</p>
              </div>
              <Link to="/reports">
                <Button variant="outline" size="sm">
                  Ver Relatório Completo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Property Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado dos Imóveis</CardTitle>
            <CardDescription>Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {propertyStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm">Ocupados</span>
                </div>
                <span className="font-medium">{occupiedProperties.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">Disponíveis</span>
                </div>
                <span className="font-medium">{availableProperties.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm">Em Manutenção</span>
                </div>
                <span className="font-medium">{maintenanceProperties.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Os Seus Imóveis</CardTitle>
              <CardDescription>Gestão rápida do portfolio</CardDescription>
            </div>
            <Link to="/properties">
              <Button variant="outline" size="sm">
                Ver Todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ownerProperties.slice(0, 4).map((property) => {
                const propertyPayments = mockPayments.filter(p => p.propertyId === property.id);
                const hasOverdue = propertyPayments.some(p => p.status === 'overdue');
                const tenant = mockUsers.find(u => u.id === property.tenantId);
                
                return (
                  <div 
                    key={property.id} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">{property.title}</h4>
                        {hasOverdue && (
                          <Badge variant="destructive" className="text-xs">Atraso</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {property.city}
                      </p>
                      {property.status === 'occupied' && tenant && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <UserCheck className="h-3 w-3" />
                          {tenant.name}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-primary">€{property.price}</p>
                      <p className="text-xs text-muted-foreground">/mês</p>
                    </div>
                    <Badge
                      variant={property.status === 'occupied' ? 'success' : property.status === 'available' ? 'secondary' : 'warning'}
                    >
                      {property.status === 'occupied' ? 'Ocupado' : property.status === 'available' ? 'Disponível' : 'Manutenção'}
                    </Badge>
                    <Link to={`/properties/${property.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/properties/new" className="block">
              <Button className="w-full justify-start h-11" variant="default">
                <Plus className="h-4 w-4 mr-3" />
                Adicionar Imóvel
              </Button>
            </Link>
            <Link to="/payments" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <CreditCard className="h-4 w-4 mr-3" />
                Gerir Pagamentos
              </Button>
            </Link>
            <Link to="/maintenance" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <Wrench className="h-4 w-4 mr-3" />
                Ver Manutenções
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

        {/* Recent Payments */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pagamentos Recentes</CardTitle>
              <CardDescription>Últimas transações dos inquilinos</CardDescription>
            </div>
            <Link to="/payments">
              <Button variant="ghost" size="sm">
                Ver Todos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allPayments.slice(0, 5).map((payment) => {
                const property = mockProperties.find(p => p.id === payment.propertyId);
                const tenant = mockUsers.find(u => u.id === payment.tenantId);
                
                return (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {payment.status === 'paid' ? (
                        <div className="p-2 rounded-full bg-success/10">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                      ) : payment.status === 'pending' ? (
                        <div className="p-2 rounded-full bg-warning/10">
                          <Clock className="h-4 w-4 text-warning" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-destructive/10">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{property?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {tenant?.name} • {new Date(payment.dueDate).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-semibold">€{payment.amount}</p>
                      <Badge variant={statusColors[payment.status]} className="text-xs">
                        {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Em Atraso'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Manutenção</CardTitle>
              <CardDescription>Pedidos ativos</CardDescription>
            </div>
            <Badge variant={pendingMaintenance.length > 0 ? 'warning' : 'success'}>
              {pendingMaintenance.length + inProgressMaintenance.length} ativos
            </Badge>
          </CardHeader>
          <CardContent>
            {pendingMaintenance.length + inProgressMaintenance.length > 0 ? (
              <div className="space-y-3">
                {[...pendingMaintenance, ...inProgressMaintenance].slice(0, 3).map((request) => {
                  const property = mockProperties.find(p => p.id === request.propertyId);
                  
                  return (
                    <div key={request.id} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm truncate">{request.description}</p>
                        <Badge 
                          variant={request.status === 'pending' ? 'warning' : 'default'}
                          className="text-xs"
                        >
                          {request.status === 'pending' ? 'Pendente' : 'Em Progresso'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{property?.title}</p>
                    </div>
                  );
                })}
                <Link to="/maintenance">
                  <Button variant="ghost" className="w-full mt-2">
                    Ver Todos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Sem pedidos pendentes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
