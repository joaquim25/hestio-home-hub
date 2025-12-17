import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types';
import {
  Building2,
  Users,
  Euro,
  TrendingUp,
  TrendingDown,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Shield,
  BarChart3,
  MapPin,
  UserCheck,
  Briefcase,
  Scale,
  PieChart,
  Activity,
  Target,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

const revenueData = [
  { month: 'Jul', revenue: 42000, expenses: 28000 },
  { month: 'Ago', revenue: 45000, expenses: 31000 },
  { month: 'Set', revenue: 43000, expenses: 27000 },
  { month: 'Out', revenue: 48000, expenses: 32000 },
  { month: 'Nov', revenue: 46000, expenses: 29000 },
  { month: 'Dez', revenue: 50000, expenses: 33000 },
];

const complianceData = [
  { name: 'Conformes', value: 21, color: 'hsl(var(--success))' },
  { name: 'Pendentes', value: 2, color: 'hsl(var(--warning))' },
  { name: 'Em Risco', value: 1, color: 'hsl(var(--destructive))' },
];

// Mock managers data
const mockManagers = [
  { 
    id: '1', 
    name: 'Ana Ferreira', 
    email: 'ana@empresa.pt',
    condos: 5, 
    units: 120, 
    collectionRate: 96,
    pendingTasks: 3,
    performance: 'excellent'
  },
  { 
    id: '2', 
    name: 'Carlos Silva', 
    email: 'carlos@empresa.pt',
    condos: 6, 
    units: 145, 
    collectionRate: 92,
    pendingTasks: 7,
    performance: 'good'
  },
  { 
    id: '3', 
    name: 'Maria Costa', 
    email: 'maria@empresa.pt',
    condos: 4, 
    units: 95, 
    collectionRate: 98,
    pendingTasks: 2,
    performance: 'excellent'
  },
  { 
    id: '4', 
    name: 'João Santos', 
    email: 'joao@empresa.pt',
    condos: 5, 
    units: 110, 
    collectionRate: 89,
    pendingTasks: 12,
    performance: 'needs-attention'
  },
];

// Mock condominiums
const mockCondominiums = [
  { id: '1', name: 'Edifício Aurora', manager: 'Ana Ferreira', units: 24, occupancy: 96, fees: 'paid', compliance: 'ok', revenue: 4800 },
  { id: '2', name: 'Residencial Sol Nascente', manager: 'Carlos Silva', units: 36, occupancy: 88, fees: 'pending', compliance: 'ok', revenue: 7200 },
  { id: '3', name: 'Condomínio Jardins', manager: 'Maria Costa', units: 18, occupancy: 100, fees: 'paid', compliance: 'ok', revenue: 3600 },
  { id: '4', name: 'Torre Atlântico', manager: 'Carlos Silva', units: 48, occupancy: 92, fees: 'overdue', compliance: 'risk', revenue: 9600 },
  { id: '5', name: 'Vila Verde', manager: 'João Santos', units: 30, occupancy: 85, fees: 'pending', compliance: 'pending', revenue: 6000 },
  { id: '6', name: 'Palácio do Mar', manager: 'Ana Ferreira', units: 42, occupancy: 95, fees: 'paid', compliance: 'ok', revenue: 8400 },
];

// Mock compliance items
const mockComplianceItems = [
  { id: '1', item: 'Certificação Energética', condo: 'Torre Atlântico', dueDate: '2024-12-20', status: 'overdue' },
  { id: '2', item: 'Seguro Incêndio', condo: 'Vila Verde', dueDate: '2024-12-30', status: 'pending' },
  { id: '3', item: 'Inspeção Elevadores', condo: 'Residencial Sol Nascente', dueDate: '2025-01-15', status: 'pending' },
];

const performanceColors: Record<string, 'success' | 'warning' | 'destructive'> = {
  'excellent': 'success',
  'good': 'success',
  'needs-attention': 'destructive',
};

const performanceLabels: Record<string, string> = {
  'excellent': 'Excelente',
  'good': 'Bom',
  'needs-attention': 'Atenção',
};

interface CondoCompanyDashboardProps {
  user: User;
}

export function CondoCompanyDashboard({ user }: CondoCompanyDashboardProps) {
  // Calculate company-wide metrics
  const totalCondos = mockCondominiums.length;
  const totalUnits = mockCondominiums.reduce((acc, c) => acc + c.units, 0);
  const totalManagers = mockManagers.length;
  const avgOccupancy = Math.round(mockCondominiums.reduce((acc, c) => acc + c.occupancy, 0) / totalCondos);
  
  const currentMonthRevenue = revenueData[revenueData.length - 1].revenue;
  const currentMonthExpenses = revenueData[revenueData.length - 1].expenses;
  const monthlyProfit = currentMonthRevenue - currentMonthExpenses;
  
  const totalAnnualRevenue = revenueData.reduce((acc, r) => acc + r.revenue, 0);
  const avgCollectionRate = Math.round(mockManagers.reduce((acc, m) => acc + m.collectionRate, 0) / mockManagers.length);
  
  const complianceOk = mockCondominiums.filter(c => c.compliance === 'ok').length;
  const complianceRate = Math.round((complianceOk / totalCondos) * 100);
  
  const overdueItems = mockComplianceItems.filter(c => c.status === 'overdue').length;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Visão geral da empresa de gestão de condomínios
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/reports">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
          </Link>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Condomínio
          </Button>
        </div>
      </div>

      {/* Compliance Alert */}
      {overdueItems > 0 && (
        <Card className="mb-6 border-l-4 border-l-destructive bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">
                    {overdueItems} item(s) de conformidade em atraso
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ação imediata necessária para evitar penalizações
                  </p>
                </div>
              </div>
              <Button size="sm" variant="destructive">
                Ver Detalhes
              </Button>
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
              {totalCondos}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Condomínios • {totalUnits} frações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Euro className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Receita Mensal</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{currentMonthRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">+8.7%</span>
              <span className="text-sm text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Gestores</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {totalManagers}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Colaboradores ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Shield className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Conformidade</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {complianceRate}%
            </p>
            <Progress value={complianceRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Receitas vs Despesas</CardTitle>
                <CardDescription>Evolução financeira nos últimos 6 meses</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Lucro este mês</p>
                <p className="font-display text-xl font-bold text-success">
                  €{monthlyProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorCompanyRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCompanyExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `€${v/1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCompanyRevenue)"
                    name="Receitas"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCompanyExpenses)"
                    name="Despesas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Despesas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estado de Conformidade</CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
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
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {complianceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manager Performance */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Desempenho dos Gestores</CardTitle>
              <CardDescription>Métricas de produtividade e cobrança</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <UserCheck className="h-4 w-4 mr-2" />
              Gerir Equipa
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockManagers.map((manager) => (
                <div 
                  key={manager.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {manager.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{manager.name}</h4>
                      <Badge variant={performanceColors[manager.performance]} className="text-xs">
                        {performanceLabels[manager.performance]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{manager.email}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{manager.condos}</p>
                      <p className="text-xs text-muted-foreground">Condos</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{manager.units}</p>
                      <p className="text-xs text-muted-foreground">Frações</p>
                    </div>
                    <div className="text-center">
                      <p className={`font-medium ${manager.collectionRate >= 95 ? 'text-success' : manager.collectionRate >= 90 ? 'text-warning' : 'text-destructive'}`}>
                        {manager.collectionRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">Cobrança</p>
                    </div>
                    <div className="text-center">
                      <p className={`font-medium ${manager.pendingTasks > 10 ? 'text-destructive' : manager.pendingTasks > 5 ? 'text-warning' : ''}`}>
                        {manager.pendingTasks}
                      </p>
                      <p className="text-xs text-muted-foreground">Tarefas</p>
                    </div>
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
              Adicionar Condomínio
            </Button>
            <Button className="w-full justify-start h-11" variant="outline">
              <UserCheck className="h-4 w-4 mr-3" />
              Adicionar Gestor
            </Button>
            <Link to="/reports" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <BarChart3 className="h-4 w-4 mr-3" />
                Ver Relatórios
              </Button>
            </Link>
            <Link to="/payments" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <Euro className="h-4 w-4 mr-3" />
                Finanças
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

        {/* Condominiums List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Condomínios Geridos</CardTitle>
              <CardDescription>Estado geral do portfolio</CardDescription>
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
              {mockCondominiums.slice(0, 5).map((condo) => (
                <div key={condo.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{condo.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Gestor: {condo.manager} • {condo.units} frações
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-display font-semibold text-sm">€{condo.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">/mês</p>
                    </div>
                    <div className="flex gap-1">
                      {condo.compliance === 'ok' ? (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Conforme
                        </Badge>
                      ) : condo.compliance === 'pending' ? (
                        <Badge variant="warning" className="text-xs">Pendente</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">Risco</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Conformidade Legal</CardTitle>
              <CardDescription>Itens a regularizar</CardDescription>
            </div>
            <Badge variant={overdueItems > 0 ? 'destructive' : 'success'}>
              {overdueItems > 0 ? `${overdueItems} em atraso` : 'Tudo em dia'}
            </Badge>
          </CardHeader>
          <CardContent>
            {mockComplianceItems.length > 0 ? (
              <div className="space-y-3">
                {mockComplianceItems.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{item.item}</p>
                      <Badge 
                        variant={item.status === 'overdue' ? 'destructive' : 'warning'}
                        className="text-xs"
                      >
                        {item.status === 'overdue' ? 'Em Atraso' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {item.condo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.dueDate).toLocaleDateString('pt-PT')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Todos os itens em conformidade</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
