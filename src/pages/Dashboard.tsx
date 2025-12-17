import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProperties, mockPayments, mockMaintenanceRequests } from '@/lib/mock-data';
import { Link, Navigate } from 'react-router-dom';
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
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { month: 'Jul', value: 4200 },
  { month: 'Ago', value: 4800 },
  { month: 'Set', value: 4500 },
  { month: 'Out', value: 5200 },
  { month: 'Nov', value: 4900 },
  { month: 'Dez', value: 5400 },
];

const paymentHistory = [
  { month: 'Jul', value: 1200 },
  { month: 'Ago', value: 1200 },
  { month: 'Set', value: 1200 },
  { month: 'Out', value: 1200 },
  { month: 'Nov', value: 1200 },
  { month: 'Dez', value: 1200 },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'secondary'> = {
  pending: 'warning',
  'in-progress': 'default',
  completed: 'success',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-specific data
  const userProperties = user?.role === 'tenant' 
    ? mockProperties.filter(p => p.tenantId === '1')
    : mockProperties.filter(p => p.ownerId === '2');

  const userPayments = mockPayments.filter(p => 
    user?.role === 'tenant' ? p.tenantId === '1' : true
  );

  const userMaintenanceRequests = mockMaintenanceRequests.filter(m =>
    user?.role === 'tenant' ? m.tenantId === '1' : true
  );

  // Tenant Dashboard
  if (user?.role === 'tenant') {
    const currentProperty = mockProperties.find(p => p.tenantId === '1');
    const nextPayment = userPayments.find(p => p.status === 'pending');
    
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {user.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo ao seu painel de inquilino
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Próximo Pagamento"
              value={nextPayment ? `€${nextPayment.amount}` : '-'}
              description={nextPayment ? `Vence a ${new Date(nextPayment.dueDate).toLocaleDateString('pt-PT')}` : 'Sem pagamentos pendentes'}
              icon={CreditCard}
              variant="primary"
            />
            <StatsCard
              title="Pedidos de Manutenção"
              value={userMaintenanceRequests.filter(m => m.status !== 'completed').length}
              description="Em aberto"
              icon={Wrench}
            />
            <StatsCard
              title="Documentos"
              value="4"
              description="Contrato ativo"
              icon={FileText}
            />
            <StatsCard
              title="Mensagens"
              value="2"
              description="Não lidas"
              icon={MessageSquare}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Current Rental */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Imóvel Atual</CardTitle>
                <CardDescription>Detalhes do seu arrendamento</CardDescription>
              </CardHeader>
              <CardContent>
                {currentProperty ? (
                  <div className="flex gap-6">
                    <img
                      src={currentProperty.images[0]}
                      alt={currentProperty.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{currentProperty.title}</h3>
                      <p className="text-muted-foreground text-sm">{currentProperty.address}, {currentProperty.city}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Renda Mensal</p>
                          <p className="font-display text-2xl font-bold text-primary">€{currentProperty.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Próximo Vencimento</p>
                          <p className="font-semibold">1 Jan 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link to={`/properties/${currentProperty.id}`}>
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contactar Senhorio
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum imóvel associado.</p>
                )}
              </CardContent>
            </Card>

            {/* Payment History Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={paymentHistory}>
                      <defs>
                        <linearGradient id="colorPayment" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorPayment)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Requests */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pedidos de Manutenção</CardTitle>
                  <CardDescription>Estado dos seus pedidos</CardDescription>
                </div>
                <Link to="/maintenance">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Pedido
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userMaintenanceRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-card">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{request.description}</p>
                          <p className="text-xs text-muted-foreground capitalize">{request.category}</p>
                        </div>
                      </div>
                      <Badge variant={statusColors[request.status]}>
                        {statusLabels[request.status]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagar Renda
                </Button>
                <Link to="/maintenance" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Wrench className="h-4 w-4 mr-2" />
                    Reportar Problema
                  </Button>
                </Link>
                <Link to="/documents" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Contrato
                  </Button>
                </Link>
                <Link to="/messages" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Owner Dashboard
  if (user?.role === 'owner') {
    const totalRevenue = userPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
    const occupiedProperties = userProperties.filter(p => p.status === 'occupied').length;
    
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Olá, {user.name} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Visão geral do seu portfolio imobiliário
              </p>
            </div>
            <Link to="/properties/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Imóvel
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total de Imóveis"
              value={userProperties.length}
              description={`${occupiedProperties} ocupados`}
              icon={Building2}
              variant="primary"
            />
            <StatsCard
              title="Receita Total"
              value={`€${totalRevenue.toLocaleString()}`}
              description="Este ano"
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Taxa de Ocupação"
              value={`${Math.round((occupiedProperties / userProperties.length) * 100)}%`}
              description={`${userProperties.length - occupiedProperties} disponíveis`}
              icon={Users}
              variant="accent"
            />
            <StatsCard
              title="Manutenção Pendente"
              value={userMaintenanceRequests.filter(m => m.status === 'pending').length}
              description="Pedidos por resolver"
              icon={Wrench}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>Evolução nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`€${value}`, 'Receita']}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Properties List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Os Seus Imóveis</CardTitle>
                <Link to="/properties">
                  <Button variant="ghost" size="sm">
                    Ver todos
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProperties.slice(0, 4).map((property) => (
                    <Link key={property.id} to={`/properties/${property.id}`} className="block">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{property.title}</p>
                          <p className="text-xs text-muted-foreground">€{property.price}/mês</p>
                        </div>
                        <Badge
                          variant={property.status === 'occupied' ? 'secondary' : property.status === 'available' ? 'success' : 'warning'}
                          className="text-xs"
                        >
                          {property.status === 'occupied' ? 'Ocupado' : property.status === 'available' ? 'Disponível' : 'Manutenção'}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Pagamentos Recentes</CardTitle>
                <CardDescription>Últimas transações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userPayments.slice(0, 5).map((payment) => {
                    const property = mockProperties.find(p => p.id === payment.propertyId);
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          {payment.status === 'paid' ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : payment.status === 'pending' ? (
                            <Clock className="h-5 w-5 text-warning" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{payment.description}</p>
                            <p className="text-xs text-muted-foreground">{property?.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-semibold">€{payment.amount}</p>
                          <Badge
                            variant={payment.status === 'paid' ? 'success' : payment.status === 'pending' ? 'warning' : 'destructive'}
                            className="text-xs"
                          >
                            {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Em Atraso'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/properties/new" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Imóvel
                  </Button>
                </Link>
                <Link to="/reports" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Relatórios
                  </Button>
                </Link>
                <Link to="/messages" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Mensagens
                  </Button>
                </Link>
                <Link to="/maintenance" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Wrench className="h-4 w-4 mr-2" />
                    Manutenção
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Agent Dashboard (simplified)
  if (user?.role === 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {user.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Painel do agente imobiliário
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Imóveis Ativos"
              value="12"
              description="Em gestão"
              icon={Building2}
              variant="primary"
            />
            <StatsCard
              title="Clientes"
              value="8"
              description="Proprietários geridos"
              icon={Users}
            />
            <StatsCard
              title="Comissões"
              value="€2,450"
              description="Este mês"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
              variant="accent"
            />
            <StatsCard
              title="Leads"
              value="15"
              description="Por contactar"
              icon={MessageSquare}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agenda de Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Visita - T3 em Foz</p>
                      <p className="text-xs text-muted-foreground">10:00 - Cliente: João Pereira</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Assinatura de Contrato</p>
                      <p className="text-xs text-muted-foreground">15:00 - Apartamento Chiado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leads Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Ana Costa</p>
                      <p className="text-xs text-muted-foreground">Procura T2 em Lisboa</p>
                    </div>
                    <Button size="sm" variant="outline">Contactar</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">Miguel Santos</p>
                      <p className="text-xs text-muted-foreground">Investidor - até €200k</p>
                    </div>
                    <Button size="sm" variant="outline">Contactar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Condominium Company Dashboard
  if (user?.role === 'condo_company') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {user.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Painel de empresa de gestão de condomínios
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Condomínios Geridos"
              value="24"
              description="Total de edifícios"
              icon={Building2}
              variant="primary"
            />
            <StatsCard
              title="Gestores"
              value="8"
              description="Colaboradores ativos"
              icon={Users}
            />
            <StatsCard
              title="Receita Mensal"
              value="€45,000"
              description="Honorários de gestão"
              icon={DollarSign}
              trend={{ value: 15, isPositive: true }}
              variant="accent"
            />
            <StatsCard
              title="Conformidade"
              value="98%"
              description="Taxa de regularização"
              icon={FileText}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Condomínios por Gestor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Ana Ferreira', count: 5, revenue: '€9,500' },
                    { name: 'Carlos Silva', count: 6, revenue: '€11,200' },
                    { name: 'Maria Costa', count: 4, revenue: '€7,800' },
                    { name: 'João Santos', count: 5, revenue: '€9,100' },
                  ].map((manager) => (
                    <div key={manager.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{manager.name}</p>
                          <p className="text-xs text-muted-foreground">{manager.count} condomínios</p>
                        </div>
                      </div>
                      <span className="font-display font-semibold">{manager.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tarefas Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-warning/50 bg-warning/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-medium">Relatórios Financeiros</span>
                    </div>
                    <p className="text-sm text-muted-foreground">3 condomínios com relatórios por enviar</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">Assembleias Marcadas</span>
                    </div>
                    <p className="text-sm text-muted-foreground">5 reuniões esta semana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Service Provider/Vendor Dashboard
  if (user?.role === 'vendor') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {user.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Painel de prestador de serviços
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Ordens Ativas"
              value="7"
              description="Por executar"
              icon={Wrench}
              variant="primary"
            />
            <StatsCard
              title="Concluídas"
              value="23"
              description="Este mês"
              icon={CheckCircle2}
              variant="accent"
            />
            <StatsCard
              title="Faturação"
              value="€3,450"
              description="Este mês"
              icon={DollarSign}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Avaliação"
              value="4.8"
              description="Média de clientes"
              icon={TrendingUp}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ordens de Trabalho</CardTitle>
                <CardDescription>Serviços pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { service: 'Reparação canalização', location: 'Ed. Aurora, Fração 3B', urgency: 'high', date: '17 Dez' },
                    { service: 'Manutenção elevador', location: 'Cond. Sol Nascente', urgency: 'medium', date: '18 Dez' },
                    { service: 'Pintura áreas comuns', location: 'Residencial Jardins', urgency: 'low', date: '20 Dez' },
                  ].map((order, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Wrench className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{order.service}</p>
                          <p className="text-xs text-muted-foreground">{order.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.urgency === 'high' ? 'destructive' : order.urgency === 'medium' ? 'warning' : 'secondary'}>
                          {order.urgency === 'high' ? 'Urgente' : order.urgency === 'medium' ? 'Médio' : 'Normal'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faturação Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { invoice: 'FAT-2024-089', client: 'Cond. Vila Verde', amount: '€580', status: 'paid' },
                    { invoice: 'FAT-2024-088', client: 'Ed. Aurora', amount: '€320', status: 'pending' },
                    { invoice: 'FAT-2024-087', client: 'Torre Atlântico', amount: '€890', status: 'paid' },
                  ].map((inv, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{inv.invoice}</p>
                        <p className="text-xs text-muted-foreground">{inv.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-semibold">{inv.amount}</p>
                        <Badge variant={inv.status === 'paid' ? 'success' : 'warning'}>
                          {inv.status === 'paid' ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Government Housing Agency Dashboard
  if (user?.role === 'government') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Olá, {user.name} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Painel de gestão de habitação social
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Fogos Geridos"
              value="1,245"
              description="Habitação social"
              icon={Building2}
              variant="primary"
            />
            <StatsCard
              title="Taxa Ocupação"
              value="94%"
              description="Fogos ocupados"
              icon={Users}
              variant="accent"
            />
            <StatsCard
              title="Candidaturas"
              value="328"
              description="Em análise"
              icon={FileText}
            />
            <StatsCard
              title="Rendas Cobradas"
              value="€186k"
              description="Este mês"
              icon={DollarSign}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Candidaturas Recentes</CardTitle>
                <CardDescription>Pedidos de habitação social</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Família Silva', members: 4, income: '€850/mês', status: 'Em análise', priority: 'high' },
                    { name: 'Maria Oliveira', members: 2, income: '€620/mês', status: 'Documentos', priority: 'medium' },
                    { name: 'António Santos', members: 1, income: '€480/mês', status: 'Aprovado', priority: 'low' },
                    { name: 'Família Costa', members: 5, income: '€1,100/mês', status: 'Em análise', priority: 'high' },
                  ].map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.members} membros · {app.income}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.priority === 'high' && <Badge variant="destructive">Prioritário</Badge>}
                        <Badge variant={app.status === 'Aprovado' ? 'success' : app.status === 'Documentos' ? 'warning' : 'secondary'}>
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conformidade Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-success/50 bg-success/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="font-medium text-sm">Contratos</span>
                    </div>
                    <p className="text-xs text-muted-foreground">98% em conformidade</p>
                  </div>
                  <div className="p-4 rounded-lg border border-warning/50 bg-warning/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-medium text-sm">Rendas em Atraso</span>
                    </div>
                    <p className="text-xs text-muted-foreground">47 casos (3.8%)</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">Manutenção</span>
                    </div>
                    <p className="text-xs text-muted-foreground">23 pedidos pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Manager Dashboard (simplified) - default fallback
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Painel de gestão de condomínio
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Edifícios"
            value="5"
            description="Em gestão"
            icon={Building2}
            variant="primary"
          />
          <StatsCard
            title="Residentes"
            value="120"
            description="Total de frações"
            icon={Users}
          />
          <StatsCard
            title="Despesas Comuns"
            value="€8,500"
            description="Este mês"
            icon={DollarSign}
          />
          <StatsCard
            title="Reuniões"
            value="2"
            description="Agendadas"
            icon={Calendar}
            variant="accent"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Edifícios Geridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Edifício Aurora', 'Condomínio Sol Nascente', 'Residencial Jardins', 'Torre Atlântico', 'Vila Verde'].map((building) => (
                  <div key={building} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-sm">{building}</span>
                    </div>
                    <Badge variant="success">Ativo</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Reuniões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Assembleia Geral - Ed. Aurora</span>
                  </div>
                  <p className="text-sm text-muted-foreground">15 Jan 2025, 19:00</p>
                  <p className="text-sm text-muted-foreground mt-1">Ordem: Aprovação de contas 2024</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Reunião Extraordinária - Vila Verde</span>
                  </div>
                  <p className="text-sm text-muted-foreground">22 Jan 2025, 18:30</p>
                  <p className="text-sm text-muted-foreground mt-1">Ordem: Obras no elevador</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
