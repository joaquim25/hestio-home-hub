import { useState } from 'react';
import { User, Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties } from '@/lib/mock-data';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  MapPin,
  Euro,
  BedDouble,
  Square,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface OwnerPropertiesProps {
  user: User;
}

const statusConfig = {
  available: { label: 'Disponível', variant: 'success' as const, color: 'text-success' },
  occupied: { label: 'Ocupado', variant: 'default' as const, color: 'text-primary' },
  maintenance: { label: 'Manutenção', variant: 'warning' as const, color: 'text-warning' },
};

export function OwnerProperties({ user }: OwnerPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get owner's properties
  const ownerProperties = mockProperties.filter(p => p.ownerId === '2');

  const filteredProperties = ownerProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const occupiedCount = ownerProperties.filter(p => p.status === 'occupied').length;
  const availableCount = ownerProperties.filter(p => p.status === 'available').length;
  const maintenanceCount = ownerProperties.filter(p => p.status === 'maintenance').length;
  const occupancyRate = Math.round((occupiedCount / ownerProperties.length) * 100);
  const totalRevenue = ownerProperties.filter(p => p.status === 'occupied').reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Os Meus Imóveis
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o seu portfólio de propriedades
          </p>
        </div>
        <Button size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Imóvel
        </Button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Imóveis</p>
                <p className="text-3xl font-bold font-display">{ownerProperties.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                <p className="text-3xl font-bold font-display">{occupancyRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
            <Progress value={occupancyRate} className="mt-3 h-2 [&>div]:bg-success" />
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Mensal</p>
                <p className="text-3xl font-bold font-display">€{totalRevenue.toLocaleString('pt-PT')}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Manutenção</p>
                <p className="text-3xl font-bold font-display">{maintenanceCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar imóveis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
            <SelectItem value="occupied">Ocupados</SelectItem>
            <SelectItem value="available">Disponíveis</SelectItem>
            <SelectItem value="maintenance">Em Manutenção</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="glass-card hover:shadow-soft-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Property Image */}
                <div className="md:w-64 h-48 md:h-auto">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                  />
                </div>

                {/* Property Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-lg">{property.title}</h3>
                        <Badge variant={statusConfig[property.status].variant}>
                          {statusConfig[property.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.address}, {property.city}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Property Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <BedDouble className="h-4 w-4" />
                      {property.bedrooms} quartos
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Square className="h-4 w-4" />
                      {property.area}m²
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <Euro className="h-4 w-4" />
                      {property.price}/mês
                    </span>
                  </div>

                  {/* Tenant Info (if occupied) */}
                  {property.status === 'occupied' && (
                    <div className="p-3 rounded-xl bg-muted/30 backdrop-blur-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">João Silva</p>
                          <p className="text-xs text-muted-foreground">Inquilino desde Jan 2024</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Contactar
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  )}

                  {/* Available - Show actions */}
                  {property.status === 'available' && (
                    <div className="flex gap-2">
                      <Button size="sm">Publicar Anúncio</Button>
                      <Button variant="outline" size="sm">Agendar Visita</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 mx-auto mb-4 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Adicione o seu primeiro imóvel para começar.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Imóvel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
