import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MetricCard } from '@/components/dashboard/MetricCard';
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
  User,
  Filter
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
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

const statusVariants = {
  pending: 'secondary' as const,
  'in-progress': 'default' as const,
  completed: 'outline' as const,
};

export function OwnerMaintenance() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [propertyFilter, setPropertyFilter] = useState<string>('all');

  const requests = mockMaintenanceRequests;
  let filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);
  
  if (propertyFilter !== 'all') {
    filteredRequests = filteredRequests.filter(r => r.propertyId === propertyFilter);
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const highUrgencyCount = requests.filter(r => r.urgency === 'high' && r.status !== 'completed').length;

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Propriedade';
  };

  // Estimated costs (mock)
  const estimatedCosts = {
    pending: 850,
    inProgress: 1200,
    thisMonth: 2450,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Manutenção</h1>
          <p className="text-muted-foreground mt-1">Gerir pedidos de manutenção das suas propriedades</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Pendentes"
          value={pendingCount}
          subtitle="Aguardam aprovação"
          icon={Clock}
          iconColor="warning"
        />
        <MetricCard
          title="Em Progresso"
          value={inProgressCount}
          subtitle="A ser executados"
          icon={Wrench}
          iconColor="primary"
        />
        <MetricCard
          title="Alta Urgência"
          value={highUrgencyCount}
          subtitle="Requerem atenção"
          icon={AlertTriangle}
          iconColor="warning"
          trend={highUrgencyCount > 0 ? { value: highUrgencyCount, isPositive: false } : undefined}
        />
        <MetricCard
          title="Custos Est. Mês"
          value={`€${estimatedCosts.thisMonth}`}
          subtitle="Manutenção em curso"
          icon={Euro}
          iconColor="accent"
        />
      </div>

      {/* Filters */}
      <Card className="glass-card rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todas as propriedades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as propriedades</SelectItem>
                {mockProperties.slice(0, 5).map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                Pendentes ({pendingCount})
              </Button>
              <Button
                variant={filter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('in-progress')}
              >
                Em Progresso ({inProgressCount})
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="glass-card rounded-2xl">
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium font-display">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground">
                Não existem pedidos de manutenção com estes filtros
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const CategoryIcon = categoryIcons[request.category];
            return (
              <Card key={request.id} className="glass-card rounded-2xl hover-lift">
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
                            <User className="h-3 w-3" />
                            Inquilino #1
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-auto flex-wrap">
                      {request.status === 'pending' && (
                        <>
                          <Button variant="default" size="sm">
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm">
                            Atribuir Fornecedor
                          </Button>
                        </>
                      )}
                      {request.status === 'in-progress' && (
                        <>
                          <Button variant="outline" size="sm">
                            Ver Progresso
                          </Button>
                          <Button variant="outline" size="sm">
                            Contactar Fornecedor
                          </Button>
                        </>
                      )}
                      {request.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          Ver Fatura
                        </Button>
                      )}
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
