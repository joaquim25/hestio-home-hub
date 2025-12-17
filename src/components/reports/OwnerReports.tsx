import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown,
  Euro,
  Building2,
  Users,
  Download,
  Calendar,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
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

interface OwnerReportsProps {
  user: User | null;
}

const revenueData = [
  { month: 'Jan', revenue: 4200, expenses: 800 },
  { month: 'Fev', revenue: 4200, expenses: 1200 },
  { month: 'Mar', revenue: 4200, expenses: 600 },
  { month: 'Abr', revenue: 4800, expenses: 900 },
  { month: 'Mai', revenue: 4800, expenses: 700 },
  { month: 'Jun', revenue: 4800, expenses: 1500 },
  { month: 'Jul', revenue: 5400, expenses: 800 },
  { month: 'Ago', revenue: 5400, expenses: 600 },
  { month: 'Set', revenue: 5400, expenses: 1100 },
  { month: 'Out', revenue: 5400, expenses: 750 },
  { month: 'Nov', revenue: 5400, expenses: 900 },
  { month: 'Dez', revenue: 5400, expenses: 1200 },
];

const occupancyData = [
  { name: 'Ocupados', value: 4, color: 'hsl(var(--primary))' },
  { name: 'Disponíveis', value: 1, color: 'hsl(var(--muted))' },
  { name: 'Manutenção', value: 1, color: 'hsl(var(--warning))' },
];

const propertyPerformance = [
  { property: 'T2 Alfama', revenue: 1200, occupancy: 100, rating: 4.8 },
  { property: 'T3 Cascais', revenue: 1800, occupancy: 100, rating: 4.5 },
  { property: 'T1 Baixa', revenue: 950, occupancy: 92, rating: 4.9 },
  { property: 'T4 Sintra', revenue: 2200, occupancy: 100, rating: 4.3 },
  { property: 'Estúdio Chiado', revenue: 750, occupancy: 0, rating: null },
];

export function OwnerReports({ user }: OwnerReportsProps) {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;
  const avgOccupancy = Math.round((4 / 6) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Relatórios Financeiros</h1>
          <p className="text-muted-foreground">Análise de desempenho do seu portfólio</p>
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
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar PDF
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
                <p className="text-2xl font-bold">€{(totalRevenue / 1000).toFixed(1)}k</p>
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
                <p className="text-sm text-muted-foreground">Despesas Anuais</p>
                <p className="text-2xl font-bold">€{(totalExpenses / 1000).toFixed(1)}k</p>
              </div>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownRight className="h-4 w-4" />
                <span>5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                <p className="text-2xl font-bold text-green-600">€{(netIncome / 1000).toFixed(1)}k</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                <p className="text-2xl font-bold">{avgOccupancy}%</p>
              </div>
              <Badge variant="default">Bom</Badge>
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
            <CardDescription>Evolução mensal ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3}
                    name="Receita"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2"
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))" 
                    fillOpacity={0.3}
                    name="Despesas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Estado dos Imóveis
            </CardTitle>
            <CardDescription>Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {occupancyData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Imóvel</CardTitle>
          <CardDescription>Análise detalhada de cada propriedade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Imóvel</th>
                  <th className="text-right p-3 font-medium">Receita Mensal</th>
                  <th className="text-center p-3 font-medium">Ocupação</th>
                  <th className="text-center p-3 font-medium">Avaliação</th>
                  <th className="text-right p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {propertyPerformance.map((prop) => (
                  <tr key={prop.property} className="border-b last:border-0">
                    <td className="p-3 font-medium">{prop.property}</td>
                    <td className="p-3 text-right">€{prop.revenue}</td>
                    <td className="p-3 text-center">
                      <Badge variant={prop.occupancy === 100 ? 'default' : prop.occupancy > 0 ? 'secondary' : 'outline'}>
                        {prop.occupancy}%
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      {prop.rating ? `⭐ ${prop.rating}` : '-'}
                    </td>
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
