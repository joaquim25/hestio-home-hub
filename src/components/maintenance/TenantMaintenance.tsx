import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { mockMaintenanceRequests } from '@/lib/mock-data/maintenance';
import { mockProperties } from '@/lib/mock-data/properties';
import { 
  Plus, 
  Wrench, 
  Clock, 
  CheckCircle, 
  Droplets,
  Zap,
  Wind,
  Building,
  Settings,
  HelpCircle,
  Upload,
  Calendar
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

export function TenantMaintenance() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const requests = mockMaintenanceRequests;
  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.title || 'Propriedade';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Manutenção</h1>
          <p className="text-muted-foreground mt-1">Reporte e acompanhe pedidos de manutenção</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-display">Reportar Problema</DialogTitle>
              <DialogDescription>
                Descreva o problema de manutenção que precisa ser resolvido
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="property">Propriedade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a propriedade" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProperties.slice(0, 3).map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de problema" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgência</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Nível de urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(urgencyLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o problema em detalhe..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Fotografias (opcional)</Label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Clique ou arraste fotos do problema
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Submeter Pedido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Pendentes"
          value={pendingCount}
          icon={Clock}
        >
          <p className="text-xs text-muted-foreground">Aguardam resposta</p>
        </MetricCard>
        <MetricCard
          title="Em Progresso"
          value={inProgressCount}
          icon={Wrench}
        >
          <p className="text-xs text-muted-foreground">A ser resolvidos</p>
        </MetricCard>
        <MetricCard
          title="Concluídos"
          value={completedCount}
          icon={CheckCircle}
        >
          <p className="text-xs text-muted-foreground">Este mês</p>
        </MetricCard>
      </div>

      {/* Filters */}
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 mx-auto mb-4 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-medium">Nenhum pedido encontrado</h3>
              <p className="text-muted-foreground">
                Não existem pedidos de manutenção com este filtro
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const CategoryIcon = categoryIcons[request.category];
            return (
              <Card key={request.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {getPropertyTitle(request.propertyId)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criado: {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                          {request.updatedAt && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Atualizado: {new Date(request.updatedAt).toLocaleDateString('pt-PT')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      {request.status !== 'completed' && (
                        <Button variant="outline" size="sm">
                          Contactar
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
