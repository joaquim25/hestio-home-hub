import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Euro,
  Building2,
  Users,
  Download,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from 'recharts';

interface CondoCompanyReportsProps {
  user: User | null;
}

const revenueData = [
  { month: 'Jan', revenue: 125000, expenses: 95000 },
  { month: 'Fev', revenue: 128000, expenses: 92000 },
  { month: 'Mar', revenue: 130000, expenses: 98000 },
  { month: 'Abr', revenue: 132000, expenses: 94000 },
  { month: 'Mai', revenue: 135000, expenses: 96000 },
  { month: 'Jun', revenue: 138000, expenses: 102000 },
  { month: 'Jul', revenue: 140000, expenses: 99000 },
  { month: 'Ago', revenue: 142000, expenses: 97000 },
  { month: 'Set', revenue: 145000, expenses: 101000 },
  { month: 'Out', revenue: 148000, expenses: 98000 },
  { month: 'Nov', revenue: 150000, expenses: 103000 },
  { month: 'Dez', revenue: 152000, expenses: 105000 },
];

const buildingPerformance = [
  { building: 'Edifício Aurora', units: 48, collection: 98, maintenance: 12, manager: 'Carlos Silva' },
  { building: 'Residencial Sol', units: 32, collection: 95, maintenance: 8, manager: 'Ana Costa' },
  { building: 'Torre Oceano', units: 64, collection: 92, maintenance: 18, manager: 'Pedro Santos' },
  { building: 'Condomínio Verde', units: 24, collection: 100, maintenance: 5, manager: 'Maria Oliveira' },
  { building: 'Palácio do Mar', units: 40, collection: 88, maintenance: 22, manager: 'João Ferreira' },
];

const expenseBreakdown = [
  { name: 'Manutenção', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Pessoal', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'Utilities', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Seguros', value: 12, color: 'hsl(var(--warning))' },
  { name: 'Outros', value: 8, color: 'hsl(var(--muted))' },
];

export function CondoCompanyReports({ user }: CondoCompanyReportsProps) {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;
  const totalUnits = buildingPerformance.reduce((sum, b) => sum + b.units, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Relatórios da Empresa</h1>
          <p className="text-muted-foreground">Visão consolidada de todos os condomínios</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-[120px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Anual</p>
                <p className="text-2xl font-bold">€{(totalRevenue / 1000000).toFixed(2)}M</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                <p className="text-2xl font-bold text-green-600">€{(netIncome / 1000).toFixed(0)}k</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Edifícios</p>
                <p className="text-2xl font-bold">{buildingPerformance.length}</p>
              </div>
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Frações</p>
                <p className="text-2xl font-bold">{totalUnits}</p>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Receita vs Despesas
            </CardTitle>
            <CardDescription>Evolução financeira mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `€${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString('pt-PT')}`, '']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Receita" />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.3} name="Despesas" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Building Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Edifício</CardTitle>
          <CardDescription>Métricas de gestão de cada condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Edifício</th>
                  <th className="text-center p-3 font-medium">Frações</th>
                  <th className="text-center p-3 font-medium">Taxa Cobrança</th>
                  <th className="text-center p-3 font-medium">Manutenções</th>
                  <th className="text-left p-3 font-medium">Gestor</th>
                  <th className="text-right p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {buildingPerformance.map((building) => (
                  <tr key={building.building} className="border-b last:border-0">
                    <td className="p-3 font-medium">{building.building}</td>
                    <td className="p-3 text-center">{building.units}</td>
                    <td className="p-3 text-center">
                      <Badge variant={building.collection >= 95 ? 'default' : building.collection >= 90 ? 'secondary' : 'destructive'}>
                        {building.collection}%
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <span className={building.maintenance > 15 ? 'text-yellow-500' : ''}>
                        {building.maintenance} pendentes
                      </span>
                    </td>
                    <td className="p-3">{building.manager}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
