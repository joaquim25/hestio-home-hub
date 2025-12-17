import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from './StatsCard';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  ArrowRight,
  ClipboardList,
  Shield,
  TrendingUp,
  Home,
  UserPlus,
  Scale,
  Calendar,
  MapPin,
  AlertCircle,
  BarChart3,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface GovernmentDashboardProps {
  user: User;
}

// Mock data for government housing
const applicationTrend = [
  { month: 'Jul', applications: 45, approved: 28 },
  { month: 'Ago', applications: 52, approved: 31 },
  { month: 'Set', applications: 48, approved: 35 },
  { month: 'Out', applications: 61, approved: 42 },
  { month: 'Nov', applications: 55, approved: 38 },
  { month: 'Dez', applications: 58, approved: 44 },
];

const budgetAllocation = [
  { name: 'Manutenção', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Novas Construções', value: 25, color: 'hsl(var(--accent))' },
  { name: 'Subsídios', value: 20, color: 'hsl(var(--secondary))' },
  { name: 'Administração', value: 12, color: 'hsl(var(--muted))' },
  { name: 'Reserva', value: 8, color: 'hsl(var(--chart-5))' },
];

const housingByDistrict = [
  { district: 'Lisboa', units: 420, occupancy: 96 },
  { district: 'Porto', units: 285, occupancy: 94 },
  { district: 'Setúbal', units: 180, occupancy: 91 },
  { district: 'Faro', units: 145, occupancy: 88 },
  { district: 'Coimbra', units: 125, occupancy: 93 },
  { district: 'Braga', units: 90, occupancy: 89 },
];

const recentApplications = [
  { id: 1, name: 'Família Silva', members: 4, income: '€850/mês', status: 'analysis', priority: 'high', date: '2024-01-15', district: 'Lisboa' },
  { id: 2, name: 'Maria Oliveira', members: 2, income: '€620/mês', status: 'documents', priority: 'medium', date: '2024-01-14', district: 'Porto' },
  { id: 3, name: 'António Santos', members: 1, income: '€480/mês', status: 'approved', priority: 'low', date: '2024-01-12', district: 'Setúbal' },
  { id: 4, name: 'Família Costa', members: 5, income: '€1,100/mês', status: 'analysis', priority: 'high', date: '2024-01-11', district: 'Lisboa' },
  { id: 5, name: 'João Ferreira', members: 3, income: '€720/mês', status: 'waitlist', priority: 'medium', date: '2024-01-10', district: 'Faro' },
];

const complianceItems = [
  { name: 'Contratos Ativos', compliant: 1180, total: 1205, icon: FileText },
  { name: 'Inspeções Segurança', compliant: 1150, total: 1245, icon: Shield },
  { name: 'Certificados Energia', compliant: 980, total: 1245, icon: CheckCircle2 },
  { name: 'Licenças Habitação', compliant: 1200, total: 1245, icon: Home },
];

const urgentAlerts = [
  { type: 'overdue', message: '47 rendas em atraso superior a 30 dias', severity: 'high' },
  { type: 'maintenance', message: '12 reparações urgentes pendentes', severity: 'high' },
  { type: 'inspection', message: '28 inspeções agendadas esta semana', severity: 'medium' },
  { type: 'expiring', message: '15 contratos a expirar em 30 dias', severity: 'medium' },
];

const statusConfig = {
  analysis: { label: 'Em Análise', variant: 'secondary' as const },
  documents: { label: 'Documentos', variant: 'warning' as const },
  approved: { label: 'Aprovado', variant: 'success' as const },
  rejected: { label: 'Rejeitado', variant: 'destructive' as const },
  waitlist: { label: 'Lista Espera', variant: 'default' as const },
};

export function GovernmentDashboard({ user }: GovernmentDashboardProps) {
  const totalUnits = housingByDistrict.reduce((acc, d) => acc + d.units, 0);
  const avgOccupancy = Math.round(housingByDistrict.reduce((acc, d) => acc + d.occupancy, 0) / housingByDistrict.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-normal text-foreground tracking-tight">
          Olá, {user.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Painel de Gestão de Habitação Social — Visão geral do programa
        </p>
      </div>

      {/* Urgent Alerts Banner */}
      {urgentAlerts.filter(a => a.severity === 'high').length > 0 && (
        <Card className="mb-6 border-destructive/50 bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-destructive mb-2">Alertas Prioritários</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {urgentAlerts.filter(a => a.severity === 'high').map((alert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      {alert.message}
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Ver Todos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Fogos Geridos"
          value={totalUnits.toLocaleString('pt-PT')}
          description="Habitação social"
          icon={Building2}
          variant="primary"
        />
        <StatsCard
          title="Taxa Ocupação"
          value={`${avgOccupancy}%`}
          description="Média nacional"
          icon={Users}
          variant="accent"
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Candidaturas Ativas"
          value="328"
          description="Em processamento"
          icon={ClipboardList}
        />
        <StatsCard
          title="Rendas Cobradas"
          value="€186k"
          description="Este mês"
          icon={DollarSign}
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Lista de Espera</p>
                <p className="text-2xl font-bold text-secondary">1,847</p>
              </div>
              <Clock className="h-8 w-8 text-secondary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tempo médio: 18 meses</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Aprovados (Mês)</p>
                <p className="text-2xl font-bold text-accent">44</p>
              </div>
              <UserPlus className="h-8 w-8 text-accent/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Manutenções Pendentes</p>
                <p className="text-2xl font-bold text-warning">67</p>
              </div>
              <Wrench className="h-8 w-8 text-warning/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">12 urgentes</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Orçamento Anual</p>
                <p className="text-2xl font-bold text-primary">€4.2M</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">68% executado</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Applications Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tendência de Candidaturas
            </CardTitle>
            <CardDescription>Candidaturas recebidas vs aprovadas (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationTrend}>
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorApplications)"
                    name="Candidaturas"
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorApproved)"
                    name="Aprovadas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Alocação Orçamental
            </CardTitle>
            <CardDescription>Distribuição do orçamento anual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {budgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {budgetAllocation.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications & Compliance Row */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Candidaturas Recentes
              </CardTitle>
              <CardDescription>Pedidos de habitação social em processamento</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/applications">
                Ver Todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{app.members} membros</span>
                        <span>·</span>
                        <span>{app.income}</span>
                        <span>·</span>
                        <MapPin className="h-3 w-3" />
                        <span>{app.district}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">Prioritário</Badge>
                    )}
                    <Badge variant={statusConfig[app.status as keyof typeof statusConfig]?.variant || 'secondary'}>
                      {statusConfig[app.status as keyof typeof statusConfig]?.label || app.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Conformidade Legal
            </CardTitle>
            <CardDescription>Estado de conformidade do parque habitacional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item, idx) => {
                const percentage = Math.round((item.compliant / item.total) * 100);
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span>{item.name}</span>
                      </div>
                      <span className={`font-medium ${percentage >= 95 ? 'text-success' : percentage >= 85 ? 'text-warning' : 'text-destructive'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 ${percentage >= 95 ? '[&>div]:bg-success' : percentage >= 85 ? '[&>div]:bg-warning' : '[&>div]:bg-destructive'}`}
                    />
                    <p className="text-xs text-muted-foreground">
                      {item.compliant.toLocaleString('pt-PT')} de {item.total.toLocaleString('pt-PT')} fogos
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Housing by District */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Distribuição por Distrito
          </CardTitle>
          <CardDescription>Fogos e taxa de ocupação por região</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {housingByDistrict.map((district, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{district.district}</h4>
                  <Badge variant={district.occupancy >= 93 ? 'success' : district.occupancy >= 88 ? 'warning' : 'destructive'}>
                    {district.occupancy}% ocupado
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{district.units} fogos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{Math.round(district.units * district.occupancy / 100)} ocupados</span>
                  </div>
                </div>
                <Progress value={district.occupancy} className="mt-3 h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Operações frequentes de gestão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              <span>Nova Candidatura</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileText className="h-5 w-5 text-accent" />
              <span>Gerar Relatório</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <span>Agendar Inspeção</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Wrench className="h-5 w-5 text-warning" />
              <span>Pedido Manutenção</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
