import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockProperties, mockMaintenanceRequests } from '@/lib/mock-data';
import { User } from '@/types';
import {
  Building2,
  Wrench,
  Euro,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Users,
  Truck,
  ClipboardList,
  Phone,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Settings,
  Bell,
  UserCheck,
  MapPin,
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

const expensesData = [
  { month: 'Jul', maintenance: 2400, utilities: 1800, services: 1200 },
  { month: 'Ago', maintenance: 1800, utilities: 1900, services: 1400 },
  { month: 'Set', maintenance: 3200, utilities: 1700, services: 1100 },
  { month: 'Out', maintenance: 2100, utilities: 2000, services: 1300 },
  { month: 'Nov', maintenance: 1900, utilities: 2200, services: 1500 },
  { month: 'Dez', maintenance: 2800, utilities: 2100, services: 1600 },
];

const condoFeesData = [
  { month: 'Jul', collected: 12500, pending: 1200 },
  { month: 'Ago', collected: 13200, pending: 800 },
  { month: 'Set', collected: 12800, pending: 1500 },
  { month: 'Out', collected: 13500, pending: 600 },
  { month: 'Nov', collected: 13100, pending: 1100 },
  { month: 'Dez', collected: 12900, pending: 1400 },
];

// Mock buildings data
const mockBuildings = [
  { id: '1', name: 'Edifício Aurora', address: 'Rua da Liberdade, 45', units: 24, occupancy: 92, pendingFees: 2, maintenanceIssues: 3 },
  { id: '2', name: 'Residencial Sol Nascente', address: 'Av. da República, 120', units: 36, occupancy: 88, pendingFees: 5, maintenanceIssues: 1 },
  { id: '3', name: 'Condomínio Jardins', address: 'Praça das Flores, 8', units: 18, occupancy: 100, pendingFees: 0, maintenanceIssues: 2 },
];

// Mock vendors
const mockVendors = [
  { id: '1', name: 'EletriMax', service: 'Eletricidade', status: 'active', rating: 4.8, pendingWork: 2 },
  { id: '2', name: 'AquaServ', service: 'Canalização', status: 'active', rating: 4.5, pendingWork: 1 },
  { id: '3', name: 'CleanPro', service: 'Limpeza', status: 'active', rating: 4.9, pendingWork: 0 },
  { id: '4', name: 'JardimVerde', service: 'Jardinagem', status: 'active', rating: 4.6, pendingWork: 1 },
];

// Mock tasks
const mockTasks = [
  { id: '1', title: 'Inspeção elevadores', building: 'Edifício Aurora', dueDate: '2024-12-20', priority: 'high', status: 'pending' },
  { id: '2', title: 'Limpeza garagem', building: 'Residencial Sol Nascente', dueDate: '2024-12-18', priority: 'medium', status: 'in-progress' },
  { id: '3', title: 'Reparação portão', building: 'Condomínio Jardins', dueDate: '2024-12-22', priority: 'low', status: 'pending' },
  { id: '4', title: 'Revisão sistema incêndio', building: 'Edifício Aurora', dueDate: '2024-12-25', priority: 'high', status: 'pending' },
];

const priorityColors: Record<string, 'destructive' | 'warning' | 'secondary'> = {
  high: 'destructive',
  medium: 'warning',
  low: 'secondary',
};

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
};

interface ManagerDashboardProps {
  user: User;
}

export function ManagerDashboard({ user }: ManagerDashboardProps) {
  // Calculate metrics
  const totalUnits = mockBuildings.reduce((acc, b) => acc + b.units, 0);
  const avgOccupancy = Math.round(mockBuildings.reduce((acc, b) => acc + b.occupancy, 0) / mockBuildings.length);
  const totalPendingFees = mockBuildings.reduce((acc, b) => acc + b.pendingFees, 0);
  const totalMaintenanceIssues = mockBuildings.reduce((acc, b) => acc + b.maintenanceIssues, 0);
  
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const highPriorityTasks = mockTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  
  const currentMonthExpenses = expensesData[expensesData.length - 1];
  const totalMonthlyExpenses = currentMonthExpenses.maintenance + currentMonthExpenses.utilities + currentMonthExpenses.services;
  
  const pendingVendorWork = mockVendors.reduce((acc, v) => acc + v.pendingWork, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-foreground tracking-tight">
            Olá, {user.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestão operacional dos condomínios
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <ClipboardList className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
          <Link to="/maintenance">
            <Button>
              <Wrench className="h-4 w-4 mr-2" />
              Manutenção
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert Banner for High Priority */}
      {highPriorityTasks > 0 && (
        <Card className="mb-6 border-l-4 border-l-destructive bg-destructive/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium">
                    {highPriorityTasks} tarefa(s) de alta prioridade
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Requerem atenção imediata
                  </p>
                </div>
              </div>
              <Button size="sm" variant="destructive">
                Ver Tarefas
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
              <span className="text-sm text-muted-foreground">Edifícios</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {mockBuildings.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {totalUnits} frações • {avgOccupancy}% ocupação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <ClipboardList className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Tarefas Pendentes</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {pendingTasks}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {highPriorityTasks} alta prioridade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Wrench className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Manutenções</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {totalMaintenanceIssues}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Pedidos em aberto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Receipt className="h-5 w-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Quotas Pendentes</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {totalPendingFees}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Condóminos em atraso
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expenses Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Despesas Mensais</CardTitle>
                <CardDescription>Por categoria nos últimos 6 meses</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Este mês</p>
                <p className="font-display text-xl font-bold">€{totalMonthlyExpenses.toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `€${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                  />
                  <Bar dataKey="maintenance" fill="hsl(var(--primary))" name="Manutenção" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="utilities" fill="hsl(var(--muted))" name="Utilidades" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="services" fill="hsl(var(--accent))" name="Serviços" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Manutenção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">Utilidades</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Serviços</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Tarefas</CardTitle>
              <CardDescription>Por concluir</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nova
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.filter(t => t.status !== 'completed').slice(0, 4).map((task) => (
                <div key={task.id} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{task.title}</p>
                    <Badge variant={priorityColors[task.priority]} className="text-xs">
                      {priorityLabels[task.priority]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {task.building}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buildings Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Edifícios sob Gestão</CardTitle>
              <CardDescription>Estado geral dos condomínios</CardDescription>
            </div>
            <Link to="/properties">
              <Button variant="outline" size="sm">
                Ver Todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBuildings.map((building) => (
                <div 
                  key={building.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="p-3 rounded-lg bg-background">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{building.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {building.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{building.units}</p>
                      <p className="text-xs text-muted-foreground">Frações</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{building.occupancy}%</p>
                      <p className="text-xs text-muted-foreground">Ocupação</p>
                    </div>
                    <div className="flex gap-2">
                      {building.pendingFees > 0 && (
                        <Badge variant="warning" className="text-xs">
                          {building.pendingFees} quotas
                        </Badge>
                      )}
                      {building.maintenanceIssues > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {building.maintenanceIssues} manutenções
                        </Badge>
                      )}
                      {building.pendingFees === 0 && building.maintenanceIssues === 0 && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          OK
                        </Badge>
                      )}
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
            <Link to="/maintenance" className="block">
              <Button className="w-full justify-start h-11" variant="default">
                <Wrench className="h-4 w-4 mr-3" />
                Gerir Manutenções
              </Button>
            </Link>
            <Button className="w-full justify-start h-11" variant="outline">
              <ClipboardList className="h-4 w-4 mr-3" />
              Nova Tarefa
            </Button>
            <Link to="/payments" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <Receipt className="h-4 w-4 mr-3" />
                Ver Quotas
              </Button>
            </Link>
            <Link to="/messages" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <MessageSquare className="h-4 w-4 mr-3" />
                Comunicações
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

        {/* Vendors List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Prestadores de Serviços</CardTitle>
              <CardDescription>Fornecedores ativos</CardDescription>
            </div>
            <Badge variant="secondary">{pendingVendorWork} trabalhos pendentes</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {mockVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {vendor.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.service}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-warning">★</span>
                      <span className="font-medium">{vendor.rating}</span>
                    </div>
                    {vendor.pendingWork > 0 && (
                      <p className="text-xs text-muted-foreground">{vendor.pendingWork} pendente</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cobrança de Quotas</CardTitle>
            <CardDescription>Este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cobrado</span>
                <span className="font-display font-bold text-success">
                  €{condoFeesData[condoFeesData.length - 1].collected.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pendente</span>
                <span className="font-display font-bold text-warning">
                  €{condoFeesData[condoFeesData.length - 1].pending.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={(condoFeesData[condoFeesData.length - 1].collected / 
                  (condoFeesData[condoFeesData.length - 1].collected + condoFeesData[condoFeesData.length - 1].pending)) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground text-center">
                {Math.round((condoFeesData[condoFeesData.length - 1].collected / 
                  (condoFeesData[condoFeesData.length - 1].collected + condoFeesData[condoFeesData.length - 1].pending)) * 100)}% cobrado
              </p>
              <Link to="/payments">
                <Button variant="outline" className="w-full mt-2">
                  Ver Detalhes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
