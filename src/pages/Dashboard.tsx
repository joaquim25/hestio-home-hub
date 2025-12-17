import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TenantDashboard } from '@/components/dashboard/TenantDashboard';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
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
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <TenantDashboard user={user} />
      </div>
    );
  }

  // Owner Dashboard
  if (user?.role === 'owner') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <OwnerDashboard user={user} />
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
