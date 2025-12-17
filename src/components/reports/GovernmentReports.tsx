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
  MapPin,
  Home,
  Clock,
  FileText,
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

interface GovernmentReportsProps {
  user: User | null;
}

const occupancyTrend = [
  { month: 'Jan', occupancy: 94, applications: 45 },
  { month: 'Fev', occupancy: 94, applications: 52 },
  { month: 'Mar', occupancy: 95, applications: 48 },
  { month: 'Abr', occupancy: 95, applications: 61 },
  { month: 'Mai', occupancy: 96, applications: 55 },
  { month: 'Jun', occupancy: 96, applications: 67 },
  { month: 'Jul', occupancy: 97, applications: 58 },
  { month: 'Ago', occupancy: 97, applications: 49 },
  { month: 'Set', occupancy: 97, applications: 72 },
  { month: 'Out', occupancy: 98, applications: 63 },
  { month: 'Nov', occupancy: 98, applications: 78 },
  { month: 'Dez', occupancy: 98, applications: 85 },
];

const districtData = [
  { district: 'Lisboa', units: 1250, occupied: 1213, waiting: 342, collection: 94 },
  { district: 'Porto', units: 890, occupied: 854, waiting: 256, collection: 92 },
  { district: 'Setúbal', units: 450, occupied: 432, waiting: 128, collection: 96 },
  { district: 'Braga', units: 320, occupied: 301, waiting: 89, collection: 91 },
  { district: 'Faro', units: 280, occupied: 266, waiting: 67, collection: 95 },
];

const applicationStatus = [
  { name: 'Aprovadas', value: 324, color: 'hsl(var(--primary))' },
  { name: 'Em Análise', value: 456, color: 'hsl(var(--warning))' },
  { name: 'Lista de Espera', value: 882, color: 'hsl(var(--secondary))' },
  { name: 'Rejeitadas', value: 89, color: 'hsl(var(--destructive))' },
];

const complianceMetrics = [
  { metric: 'Inspeções Realizadas', current: 245, target: 300, percentage: 82 },
  { metric: 'Manutenções em Dia', current: 92, target: 100, percentage: 92 },
  { metric: 'Documentação Atualizada', current: 98, target: 100, percentage: 98 },
  { metric: 'Certificados Energéticos', current: 78, target: 100, percentage: 78 },
];

export function GovernmentReports({ user }: GovernmentReportsProps) {
  const totalUnits = districtData.reduce((sum, d) => sum + d.units, 0);
  const totalOccupied = districtData.reduce((sum, d) => sum + d.occupied, 0);
  const totalWaiting = districtData.reduce((sum, d) => sum + d.waiting, 0);
  const avgCollection = Math.round(districtData.reduce((sum, d) => sum + d.collection, 0) / districtData.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Relatórios de Habitação Social</h1>
          <p className="text-muted-foreground">Análise do parque habitacional público</p>
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
                <p className="text-sm text-muted-foreground">Total Fogos</p>
                <p className="text-2xl font-bold">{totalUnits.toLocaleString('pt-PT')}</p>
              </div>
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                <p className="text-2xl font-bold">{Math.round((totalOccupied / totalUnits) * 100)}%</p>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lista de Espera</p>
                <p className="text-2xl font-bold">{totalWaiting.toLocaleString('pt-PT')}</p>
              </div>
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Cobrança</p>
                <p className="text-2xl font-bold">{avgCollection}%</p>
              </div>
              <Badge variant="default">Dentro da Meta</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Occupancy Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Tendência de Ocupação e Candidaturas
            </CardTitle>
            <CardDescription>Evolução mensal ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" domain={[90, 100]} />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area yAxisId="left" type="monotone" dataKey="occupancy" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Ocupação %" />
                  <Bar yAxisId="right" dataKey="applications" fill="hsl(var(--secondary))" name="Candidaturas" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Application Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Estado das Candidaturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={applicationStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {applicationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {applicationStatus.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Distrito</CardTitle>
          <CardDescription>Métricas detalhadas por região</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Distrito</th>
                  <th className="text-center p-3 font-medium">Fogos</th>
                  <th className="text-center p-3 font-medium">Ocupados</th>
                  <th className="text-center p-3 font-medium">Lista Espera</th>
                  <th className="text-center p-3 font-medium">Taxa Cobrança</th>
                  <th className="text-right p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {districtData.map((district) => (
                  <tr key={district.district} className="border-b last:border-0">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{district.district}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{district.units}</td>
                    <td className="p-3 text-center">
                      <span className="text-green-600">{district.occupied}</span>
                      <span className="text-muted-foreground text-sm ml-1">
                        ({Math.round((district.occupied / district.units) * 100)}%)
                      </span>
                    </td>
                    <td className="p-3 text-center text-yellow-600">{district.waiting}</td>
                    <td className="p-3 text-center">
                      <Badge variant={district.collection >= 95 ? 'default' : district.collection >= 90 ? 'secondary' : 'destructive'}>
                        {district.collection}%
                      </Badge>
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

      {/* Compliance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Conformidade</CardTitle>
          <CardDescription>Progresso em relação às metas regulamentares</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceMetrics.map((metric) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{metric.metric}</span>
                  <span className={metric.percentage >= 90 ? 'text-green-500' : metric.percentage >= 75 ? 'text-yellow-500' : 'text-red-500'}>
                    {metric.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${metric.percentage >= 90 ? 'bg-green-500' : metric.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{metric.current} de {metric.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
