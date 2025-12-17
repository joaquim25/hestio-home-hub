import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  Users,
  Filter,
  Plus,
  Truck
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

// Mock vendors
const mockVendors = [
  { id: '1', name: 'FixIt Pro', specialty: 'Canalização', rating: 4.8 },
  { id: '2', name: 'ElectroServ', specialty: 'Eletricidade', rating: 4.6 },
  { id: '3', name: 'ClimaCool', specialty: 'Climatização', rating: 4.9 },
];

export function ManagerMaintenance() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');

  const requests = mockMaintenanceRequests;
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;
  const highUrgencyCount = requests.filter(r => r.urgency === 'high' && r.status !== 'completed').length;

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Propriedade';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manutenção</h1>
          <p className="text-muted-foreground">Gestão de manutenção e fornecedores do edifício</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Criar Ordem de Trabalho
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Pendentes"
          value={pendingCount}
          description="Aguardam atribuição"
          icon={Clock}
        />
        <StatsCard
          title="Em Progresso"
          value={inProgressCount}
          description="Fornecedores ativos"
          icon={Wrench}
        />
        <StatsCard
          title="Urgentes"
          value={highUrgencyCount}
          description="Prioridade alta"
          icon={AlertTriangle}
          trend={highUrgencyCount > 0 ? { value: highUrgencyCount, isPositive: false } : undefined}
        />
        <StatsCard
          title="Fornecedores"
          value={mockVendors.length}
          description="Ativos este mês"
          icon={Truck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Requests List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>
                <Select value={buildingFilter} onValueChange={setBuildingFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos os edifícios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os edifícios</SelectItem>
                    <SelectItem value="building1">Edifício Aurora</SelectItem>
                    <SelectItem value="building2">Edifício Sol</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('pending')}
                  >
                    Pendentes
                  </Button>
                  <Button
                    variant={filter === 'in-progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('in-progress')}
                  >
                    Em Progresso
                  </Button>
                  <Button
                    variant={filter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('completed')}
                  >
                    Concluídos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requests */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const CategoryIcon = categoryIcons[request.category];
              return (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium text-sm">{categoryLabels[request.category]}</h3>
                            <Badge variant={urgencyVariants[request.urgency]} className="text-xs">
                              {urgencyLabels[request.urgency]}
                            </Badge>
                            <Badge variant={statusVariants[request.status]} className="text-xs">
                              {statusLabels[request.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {request.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              Unidade 4B
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <Button size="sm">Atribuir</Button>
                        )}
                        <Button variant="outline" size="sm">Ver</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Vendors Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fornecedores Ativos</CardTitle>
              <CardDescription>Fornecedores com trabalhos em curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {vendor.rating}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Gerir Fornecedores
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manutenção Programada</CardTitle>
              <CardDescription>Próximas manutenções preventivas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm">Inspeção Elevadores</p>
                  <p className="text-xs text-muted-foreground">28 Dez 2024</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm">Manutenção AVAC</p>
                  <p className="text-xs text-muted-foreground">15 Jan 2025</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm">Limpeza Cisterna</p>
                  <p className="text-xs text-muted-foreground">22 Jan 2025</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Agendar Manutenção
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
