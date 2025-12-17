import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockMaintenanceRequests } from '@/lib/mock-data/maintenance';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Calendar,
  Euro,
  TrendingUp,
  Filter,
  Download,
  MapPin,
  FileText,
  BarChart3
} from 'lucide-react';

const urgencyLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

const urgencyVariants = {
  low: 'secondary' as const,
  medium: 'default' as const,
  high: 'destructive' as const,
};

const statusLabels = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

const statusVariants = {
  pending: 'secondary' as const,
  'in-progress': 'default' as const,
  completed: 'outline' as const,
};

// Mock districts data
const mockDistricts = [
  { id: '1', name: 'Lisboa Centro', units: 450, pending: 23, inProgress: 12, avgTime: 4.2 },
  { id: '2', name: 'Lisboa Norte', units: 380, pending: 18, inProgress: 8, avgTime: 3.8 },
  { id: '3', name: 'Lisboa Sul', units: 290, pending: 15, inProgress: 6, avgTime: 5.1 },
  { id: '4', name: 'Amadora', units: 520, pending: 31, inProgress: 15, avgTime: 4.5 },
];

export function GovernmentMaintenance() {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [districtFilter, setDistrictFilter] = useState('all');

  const requests = mockMaintenanceRequests;
  const totalPending = mockDistricts.reduce((sum, d) => sum + d.pending, 0);
  const totalInProgress = mockDistricts.reduce((sum, d) => sum + d.inProgress, 0);
  const totalUnits = mockDistricts.reduce((sum, d) => sum + d.units, 0);

  // Mock data
  const totalBudget = 125000;
  const usedBudget = 87500;
  const avgResolutionTime = 4.2;
  const complianceRate = 94;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manutenção</h1>
          <p className="text-muted-foreground">Gestão de manutenção do parque habitacional público</p>
        </div>
        <div className="flex gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <StatsCard
          title="Pedidos Pendentes"
          value={totalPending}
          description="Todos os distritos"
          icon={Clock}
        />
        <StatsCard
          title="Em Execução"
          value={totalInProgress}
          description="Trabalhos ativos"
          icon={Wrench}
        />
        <StatsCard
          title="Tempo Médio"
          value={`${avgResolutionTime} dias`}
          description="Resolução"
          icon={TrendingUp}
        />
        <StatsCard
          title="Taxa Conformidade"
          value={`${complianceRate}%`}
          description="Normas cumpridas"
          icon={CheckCircle}
        />
        <StatsCard
          title="Orçamento Usado"
          value={`€${(usedBudget / 1000).toFixed(0)}k`}
          description={`de €${(totalBudget / 1000).toFixed(0)}k`}
          icon={Euro}
        />
      </div>

      {/* Districts Overview */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Manutenção por Distrito</CardTitle>
              <CardDescription>Estado de manutenção por área geográfica</CardDescription>
            </div>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos os distritos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os distritos</SelectItem>
                {mockDistricts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distrito</TableHead>
                <TableHead className="text-center">Unidades</TableHead>
                <TableHead className="text-center">Pendentes</TableHead>
                <TableHead className="text-center">Em Progresso</TableHead>
                <TableHead className="text-center">Tempo Médio</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDistricts.map((district) => (
                <TableRow key={district.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{district.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-muted-foreground">{district.units}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={district.pending > 25 ? 'destructive' : 'secondary'}>
                      {district.pending}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="default">{district.inProgress}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={district.avgTime > 4.5 ? 'text-destructive' : 'text-muted-foreground'}>
                      {district.avgTime} dias
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {district.pending > 25 ? (
                      <Badge variant="destructive">Atenção</Badge>
                    ) : district.pending > 15 ? (
                      <Badge variant="default">Normal</Badge>
                    ) : (
                      <Badge variant="outline">Bom</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Problemas Críticos
            </CardTitle>
            <CardDescription>Requerem intervenção urgente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.filter(r => r.urgency === 'high' && r.status !== 'completed').slice(0, 4).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium text-sm">{request.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>Lisboa Centro - Bloco A, Fração 12</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Urgente</Badge>
                    <Button variant="outline" size="sm">Atribuir</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Reporting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Conformidade & Relatórios
            </CardTitle>
            <CardDescription>Estado regulamentar e documentação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Inspeções Obrigatórias</p>
                  <p className="text-xs text-muted-foreground">Elevadores, gás, eletricidade</p>
                </div>
                <Badge variant="outline">94% completas</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Certificados Energéticos</p>
                  <p className="text-xs text-muted-foreground">Atualização anual</p>
                </div>
                <Badge variant="outline">87% válidos</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Relatório Mensal</p>
                  <p className="text-xs text-muted-foreground">Dezembro 2024</p>
                </div>
                <Badge variant="secondary">Por gerar</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Auditoria Trimestral</p>
                  <p className="text-xs text-muted-foreground">Q4 2024</p>
                </div>
                <Badge variant="default">Em curso</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <BarChart3 className="h-4 w-4 mr-2" />
              Gerar Relatório Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
