import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TenantDashboard } from '@/components/dashboard/TenantDashboard';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { AgentDashboard } from '@/components/dashboard/AgentDashboard';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
import { CondoCompanyDashboard } from '@/components/dashboard/CondoCompanyDashboard';
import { VendorDashboard } from '@/components/dashboard/VendorDashboard';
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

  // Agent Dashboard
  if (user?.role === 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <AgentDashboard user={user} />
      </div>
    );
  }

  // Condominium Company Dashboard
  if (user?.role === 'condo_company') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CondoCompanyDashboard user={user} />
      </div>
    );
  }

  // Service Provider/Vendor Dashboard
  if (user?.role === 'vendor') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <VendorDashboard user={user} />
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

  // Manager Dashboard
  if (user?.role === 'manager') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <ManagerDashboard user={user} />
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao Hestio
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Selecione um perfil no menu para aceder ao dashboard correspondente.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
