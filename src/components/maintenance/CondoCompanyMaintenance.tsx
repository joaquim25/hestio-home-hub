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
  Users
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

// Mock buildings data
const mockBuildings = [
  { id: '1', name: 'Edifício Aurora', manager: 'Ana Costa', pending: 3, inProgress: 2, completed: 8 },
  { id: '2', name: 'Edifício Sol', manager: 'Bruno Santos', pending: 1, inProgress: 4, completed: 12 },
  { id: '3', name: 'Edifício Luna', manager: 'Carla Ferreira', pending: 5, inProgress: 1, completed: 6 },
  { id: '4', name: 'Edifício Mar', manager: 'David Oliveira', pending: 2, inProgress: 3, completed: 15 },
];

export function CondoCompanyMaintenance() {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [buildingFilter, setBuildingFilter] = useState('all');

  const requests = mockMaintenanceRequests;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const highUrgencyCount = requests.filter(r => r.urgency === 'high' && r.status !== 'completed').length;

  // Mock costs
  const totalCosts = 15800;
  const avgResolutionTime = 3.2; // days

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manutenção</h1>
          <p className="text-muted-foreground">Visão geral de manutenção de todos os edifícios</p>
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
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <StatsCard
          title="Pendentes"
          value={pendingCount * mockBuildings.length}
          description="Todos os edifícios"
          icon={Clock}
        />
        <StatsCard
          title="Em Progresso"
          value={inProgressCount * mockBuildings.length}
          description="Em execução"
          icon={Wrench}
        />
        <StatsCard
          title="Concluídos"
          value={completedCount * mockBuildings.length}
          description="Este mês"
          icon={CheckCircle}
        />
        <StatsCard
          title="Tempo Médio"
          value={`${avgResolutionTime} dias`}
          description="Resolução"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Custos Totais"
          value={`€${totalCosts.toLocaleString()}`}
          description="Este mês"
          icon={Euro}
        />
      </div>

      {/* Buildings Overview */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Manutenção por Edifício</CardTitle>
              <CardDescription>Estado de manutenção de cada propriedade gerida</CardDescription>
            </div>
            <Select value={buildingFilter} onValueChange={setBuildingFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todos os edifícios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os edifícios</SelectItem>
                {mockBuildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
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
                <TableHead>Edifício</TableHead>
                <TableHead>Gestor</TableHead>
                <TableHead className="text-center">Pendentes</TableHead>
                <TableHead className="text-center">Em Progresso</TableHead>
                <TableHead className="text-center">Concluídos</TableHead>
                <TableHead className="text-center">Urgentes</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{building.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {building.manager}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{building.pending}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="default">{building.inProgress}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{building.completed}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {building.pending > 2 ? (
                      <Badge variant="destructive">{Math.min(building.pending, 2)}</Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver Detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* High Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Pedidos Urgentes
            </CardTitle>
            <CardDescription>Requerem atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.filter(r => r.urgency === 'high' && r.status !== 'completed').slice(0, 4).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium text-sm">{request.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Building className="h-3 w-3" />
                      <span>Edifício Aurora - Unidade 4B</span>
                    </div>
                  </div>
                  <Badge variant={statusVariants[request.status]}>
                    {statusLabels[request.status]}
                  </Badge>
                </div>
              ))}
              {requests.filter(r => r.urgency === 'high' && r.status !== 'completed').length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Nenhum pedido urgente pendente
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Completions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Concluídos Recentemente
            </CardTitle>
            <CardDescription>Últimos trabalhos finalizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.filter(r => r.status === 'completed').slice(0, 4).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{request.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>Concluído: {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString('pt-PT') : '-'}</span>
                    </div>
                  </div>
                  <Badge variant="outline">Concluído</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
