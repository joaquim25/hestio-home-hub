import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { mockMaintenanceRequests } from '@/lib/mock-data/maintenance';
import { mockProperties } from '@/lib/mock-data/properties';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Droplets,
  Zap,
  Wind,
  Building,
  Settings,
  HelpCircle,
  Calendar,
  Euro,
  MapPin,
  Filter,
  Play,
  FileText
} from 'lucide-react';

const categoryIcons = {
  plumbing: Droplets,
  electrical: Zap,
  hvac: Wind,
  structural: Building,
  appliance: Settings,
  other: HelpCircle,
};

const categoryLabels = {
  plumbing: 'Canalização',
  electrical: 'Eletricidade',
  hvac: 'Climatização',
  structural: 'Estrutural',
  appliance: 'Eletrodomésticos',
  other: 'Outro',
};

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
  pending: 'Por Aceitar',
  'in-progress': 'Em Execução',
  completed: 'Concluído',
};

const statusVariants = {
  pending: 'secondary' as const,
  'in-progress': 'default' as const,
  completed: 'outline' as const,
};

export function VendorMaintenance() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const requests = mockMaintenanceRequests;
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  // Mock earnings
  const pendingEarnings = 1250;
  const monthEarnings = 3450;

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Propriedade';
  };

  const getPropertyAddress = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.address || 'Endereço';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ordens de Trabalho</h1>
          <p className="text-muted-foreground">Gerir trabalhos de manutenção atribuídos</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Por Aceitar"
          value={pendingCount}
          description="Novos trabalhos"
          icon={Clock}
        />
        <StatsCard
          title="Em Execução"
          value={inProgressCount}
          description="Trabalhos ativos"
          icon={Wrench}
        />
        <StatsCard
          title="Concluídos"
          value={completedCount}
          description="Este mês"
          icon={CheckCircle}
        />
        <StatsCard
          title="Ganhos Mês"
          value={`€${monthEarnings}`}
          description="Faturado"
          icon={Euro}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Estado:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Todos ({requests.length})
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Por Aceitar ({pendingCount})
              </Button>
              <Button
                variant={filter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('in-progress')}
              >
                Em Execução ({inProgressCount})
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Concluídos ({completedCount})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma ordem de trabalho</h3>
              <p className="text-muted-foreground">
                Não existem trabalhos com este filtro
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const CategoryIcon = categoryIcons[request.category];
            // Mock price for each job
            const jobPrice = request.urgency === 'high' ? 350 : request.urgency === 'medium' ? 180 : 95;
            
            return (
              <Card key={request.id} className={request.status === 'pending' ? 'border-primary/50' : ''}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium">{categoryLabels[request.category]}</h3>
                          <Badge variant={urgencyVariants[request.urgency]}>
                            {urgencyLabels[request.urgency]}
                          </Badge>
                          <Badge variant={statusVariants[request.status]}>
                            {statusLabels[request.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {getPropertyTitle(request.propertyId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {getPropertyAddress(request.propertyId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">€{jobPrice}</p>
                        <p className="text-xs text-muted-foreground">Valor estimado</p>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-1" />
                              Aceitar
                            </Button>
                            <Button variant="outline" size="sm">
                              Recusar
                            </Button>
                          </>
                        )}
                        {request.status === 'in-progress' && (
                          <>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Concluir
                            </Button>
                            <Button variant="outline" size="sm">
                              Atualizar
                            </Button>
                          </>
                        )}
                        {request.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Ver Fatura
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
