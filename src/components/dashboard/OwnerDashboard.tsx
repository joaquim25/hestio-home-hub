import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties, mockPayments, mockMaintenanceRequests, mockUsers } from '@/lib/mock-data';
import { User } from '@/types';
import { MetricCard } from './MetricCard';
import { WelcomeHeader } from './WelcomeHeader';
import {
  Building2,
  CreditCard,
  Wrench,
  TrendingUp,
  Plus,
  Clock,
  AlertTriangle,
  ArrowRight,
  Percent,
  Euro,
  UserCheck,
  MapPin,
  Eye,
  BarChart3,
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
  { month: 'Jul', value: 4200 },
  { month: 'Ago', value: 4800 },
  { month: 'Set', value: 4500 },
  { month: 'Out', value: 5200 },
  { month: 'Nov', value: 4900 },
  { month: 'Dez', value: 5400 },
];

interface OwnerDashboardProps {
  user: User;
}

export function OwnerDashboard({ user }: OwnerDashboardProps) {
  const ownerProperties = mockProperties.filter(p => p.ownerId === '2');
  const occupiedProperties = ownerProperties.filter(p => p.status === 'occupied');
  const availableProperties = ownerProperties.filter(p => p.status === 'available');
  const maintenanceProperties = ownerProperties.filter(p => p.status === 'maintenance');
  
  const allPayments = mockPayments;
  const paidPayments = allPayments.filter(p => p.status === 'paid');
  const pendingPayments = allPayments.filter(p => p.status === 'pending');
  const overduePayments = allPayments.filter(p => p.status === 'overdue');
  
  const totalRevenue = paidPayments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = pendingPayments.reduce((acc, p) => acc + p.amount, 0);
  const overdueAmount = overduePayments.reduce((acc, p) => acc + p.amount, 0);
  const expectedMonthlyRevenue = ownerProperties.reduce((acc, p) => acc + p.price, 0);
  
  const maintenanceRequests = mockMaintenanceRequests;
  const pendingMaintenance = maintenanceRequests.filter(m => m.status === 'pending');
  
  const occupancyRate = ownerProperties.length > 0 
    ? Math.round((occupiedProperties.length / ownerProperties.length) * 100) 
    : 0;

  const propertyStatusData = [
    { name: 'Ocupados', value: occupiedProperties.length, color: 'hsl(var(--success))' },
    { name: 'Disponíveis', value: availableProperties.length, color: 'hsl(var(--primary))' },
    { name: 'Manutenção', value: maintenanceProperties.length, color: 'hsl(var(--warning))' },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <WelcomeHeader 
          name={user.name} 
          subtitle="Visão geral do seu portfolio imobiliário" 
          className="mb-0"
        />
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

      {/* Alert Banner */}
      {overduePayments.length > 0 && (
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">
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
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Portfolio"
          value={ownerProperties.length}
          subtitle={`Imóveis • ${occupiedProperties.length} ocupados`}
          icon={Building2}
          iconColor="primary"
        />

        <MetricCard
          title="Receita Anual"
          value={`€${totalRevenue.toLocaleString()}`}
          icon={Euro}
          iconColor="success"
          trend={{ value: 12, isPositive: true }}
        />

        <MetricCard
          title="Taxa Ocupação"
          value={`${occupancyRate}%`}
          icon={Percent}
          iconColor="accent"
        >
          <Progress value={occupancyRate} className="h-2" />
        </MetricCard>

        <MetricCard
          title="Por Receber"
          value={`€${(pendingAmount + overdueAmount).toLocaleString()}`}
          subtitle={`${pendingPayments.length + overduePayments.length} pagamentos`}
          icon={Clock}
          iconColor="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 glass-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display">Receita Mensal</CardTitle>
                <CardDescription>Evolução nos últimos 6 meses</CardDescription>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `€${v}`} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)',
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
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Receita Mensal Esperada</p>
                <p className="font-display text-xl font-semibold">€{expectedMonthlyRevenue.toLocaleString()}</p>
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
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="font-display">Estado dos Imóveis</CardTitle>
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
                      borderRadius: '12px',
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
        <Card className="lg:col-span-2 glass-card border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display">Os Seus Imóveis</CardTitle>
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
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-16 rounded-xl object-cover"
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
                      <p className="font-display font-semibold text-primary">€{property.price}</p>
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
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg font-display">Ações Rápidas</CardTitle>
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
                Manutenções
              </Button>
            </Link>
            <Link to="/reports" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <BarChart3 className="h-4 w-4 mr-3" />
                Ver Relatórios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
