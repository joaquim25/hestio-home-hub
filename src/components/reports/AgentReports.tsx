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
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Award
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
} from 'recharts';

interface AgentReportsProps {
  user: User | null;
}

const commissionData = [
  { month: 'Jan', commission: 2400, deals: 3 },
  { month: 'Fev', commission: 1800, deals: 2 },
  { month: 'Mar', commission: 3600, deals: 4 },
  { month: 'Abr', commission: 2100, deals: 3 },
  { month: 'Mai', commission: 4200, deals: 5 },
  { month: 'Jun', commission: 3000, deals: 4 },
  { month: 'Jul', commission: 3900, deals: 5 },
  { month: 'Ago', commission: 2700, deals: 3 },
  { month: 'Set', commission: 4500, deals: 6 },
  { month: 'Out', commission: 3300, deals: 4 },
  { month: 'Nov', commission: 5100, deals: 7 },
  { month: 'Dez', commission: 4800, deals: 6 },
];

const topClients = [
  { name: 'Maria Silva', deals: 5, value: 450000, commission: 13500 },
  { name: 'João Santos', deals: 3, value: 320000, commission: 9600 },
  { name: 'Ana Costa', deals: 4, value: 280000, commission: 8400 },
  { name: 'Pedro Oliveira', deals: 2, value: 250000, commission: 7500 },
  { name: 'Carla Ferreira', deals: 3, value: 220000, commission: 6600 },
];

const performanceMetrics = [
  { metric: 'Conversão de Leads', value: 32, target: 30, unit: '%' },
  { metric: 'Tempo Médio de Venda', value: 45, target: 60, unit: 'dias' },
  { metric: 'Visitas por Negócio', value: 4.2, target: 5, unit: '' },
  { metric: 'Satisfação do Cliente', value: 4.7, target: 4.5, unit: '/5' },
];

export function AgentReports({ user }: AgentReportsProps) {
  const totalCommission = commissionData.reduce((sum, d) => sum + d.commission, 0);
  const totalDeals = commissionData.reduce((sum, d) => sum + d.deals, 0);
  const avgDealValue = Math.round(totalCommission / totalDeals);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Relatórios de Performance</h1>
          <p className="text-muted-foreground">Análise de vendas e comissões</p>
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
                <p className="text-sm text-muted-foreground">Comissões Totais</p>
                <p className="text-2xl font-bold">€{(totalCommission / 1000).toFixed(1)}k</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Negócios Fechados</p>
                <p className="text-2xl font-bold">{totalDeals}</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>8</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comissão Média</p>
                <p className="text-2xl font-bold">€{avgDealValue}</p>
              </div>
              <Badge variant="default">Acima da Meta</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ranking</p>
                <p className="text-2xl font-bold">#3</p>
              </div>
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Commission Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Comissões Mensais
            </CardTitle>
            <CardDescription>Evolução das comissões ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commissionData}>
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
                  <Bar dataKey="commission" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Comissão" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric) => {
              const isAboveTarget = metric.unit === 'dias' 
                ? metric.value < metric.target 
                : metric.value >= metric.target;
              return (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.metric}</span>
                    <span className={isAboveTarget ? 'text-green-500' : 'text-yellow-500'}>
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isAboveTarget ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ 
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Meta: {metric.target}{metric.unit}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clientes</CardTitle>
          <CardDescription>Clientes com maior volume de negócios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Cliente</th>
                  <th className="text-center p-3 font-medium">Negócios</th>
                  <th className="text-right p-3 font-medium">Valor Total</th>
                  <th className="text-right p-3 font-medium">Comissão</th>
                  <th className="text-right p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((client, index) => (
                  <tr key={client.name} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{client.deals}</td>
                    <td className="p-3 text-right">€{client.value.toLocaleString('pt-PT')}</td>
                    <td className="p-3 text-right font-medium text-green-600">€{client.commission.toLocaleString('pt-PT')}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm">Ver Perfil</Button>
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
