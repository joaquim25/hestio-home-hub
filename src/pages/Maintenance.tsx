import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockMaintenanceRequests, mockProperties } from '@/lib/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Wrench,
  Plus,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Zap,
  Wind,
  Building,
  Settings,
  HelpCircle,
  Calendar,
  MessageSquare,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  plumbing: Droplets,
  electrical: Zap,
  hvac: Wind,
  structural: Building,
  appliance: Settings,
  other: HelpCircle,
};

const categoryLabels: Record<string, string> = {
  plumbing: 'Canalização',
  electrical: 'Eletricidade',
  hvac: 'Climatização',
  structural: 'Estrutural',
  appliance: 'Eletrodomésticos',
  other: 'Outro',
};

const urgencyLabels: Record<string, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

const urgencyVariants: Record<string, 'muted' | 'warning' | 'destructive'> = {
  low: 'muted',
  medium: 'warning',
  high: 'destructive',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

const statusVariants: Record<string, 'warning' | 'default' | 'success'> = {
  pending: 'warning',
  'in-progress': 'default',
  completed: 'success',
};

export default function Maintenance() {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredRequests = filter === 'all' 
    ? mockMaintenanceRequests 
    : mockMaintenanceRequests.filter(r => r.status === filter);

  const pendingCount = mockMaintenanceRequests.filter(r => r.status === 'pending').length;
  const inProgressCount = mockMaintenanceRequests.filter(r => r.status === 'in-progress').length;
  const completedCount = mockMaintenanceRequests.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Manutenção</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie pedidos de manutenção dos seus imóveis
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Novo Pedido de Manutenção</DialogTitle>
                <DialogDescription>
                  Descreva o problema e iremos encaminhar para resolução.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Imóvel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o imóvel" />
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
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de problema" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Urgência</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nível de urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa - Pode esperar</SelectItem>
                      <SelectItem value="medium">Média - Resolver em breve</SelectItem>
                      <SelectItem value="high">Alta - Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Descrição do Problema</Label>
                  <Textarea 
                    placeholder="Descreva o problema com o máximo de detalhes possível..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fotos (opcional)</Label>
                  <Input type="file" accept="image/*" multiple />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Submeter Pedido</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('pending')}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('in-progress')}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{inProgressCount}</p>
                  <p className="text-sm text-muted-foreground">Em Progresso</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilter('completed')}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Concluídos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
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

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const property = mockProperties.find(p => p.id === request.propertyId);
            const CategoryIcon = categoryIcons[request.category];

            return (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-muted">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{request.description}</h3>
                          <Badge variant={urgencyVariants[request.urgency]} className="text-xs">
                            {urgencyLabels[request.urgency]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{property?.title}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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

                    <div className="flex items-center gap-3">
                      <Badge variant={statusVariants[request.status]}>
                        {statusLabels[request.status]}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-16">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Nenhum pedido encontrado</h3>
            <p className="text-muted-foreground">
              Não existem pedidos de manutenção com este filtro.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
