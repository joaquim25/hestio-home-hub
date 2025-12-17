import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Building2, 
  TrendingUp, 
  Eye,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Euro,
  Clock,
  Star,
  BarChart3,
  Target,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface AgentPropertiesProps {
  user: User;
}

// Mock listings data
const mockListings = [
  { 
    ...mockProperties[0], 
    views: 234, 
    inquiries: 12, 
    daysOnMarket: 15,
    owner: 'Maria Santos',
    commission: 750,
    performance: 85,
  },
  { 
    ...mockProperties[1], 
    views: 189, 
    inquiries: 8, 
    daysOnMarket: 22,
    owner: 'José Ferreira',
    commission: 500,
    performance: 72,
  },
  { 
    ...mockProperties[2], 
    views: 312, 
    inquiries: 18, 
    daysOnMarket: 7,
    owner: 'Ana Costa',
    commission: 900,
    performance: 95,
  },
];

// Mock clients
const mockClients = [
  { id: 1, name: 'Pedro Almeida', type: 'buyer', budget: '€150k-200k', preferences: 'T2/T3 Lisboa', lastContact: '2024-01-14', status: 'active' },
  { id: 2, name: 'Sofia Martins', type: 'seller', property: 'T3 Cascais', listingDate: '2024-01-01', status: 'active' },
  { id: 3, name: 'Ricardo Silva', type: 'buyer', budget: '€80k-120k', preferences: 'T1 Porto', lastContact: '2024-01-10', status: 'warm' },
];

export function AgentProperties({ user }: AgentPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('listings');

  const totalListings = mockListings.length;
  const totalViews = mockListings.reduce((acc, l) => acc + l.views, 0);
  const totalInquiries = mockListings.reduce((acc, l) => acc + l.inquiries, 0);
  const avgDaysOnMarket = Math.round(mockListings.reduce((acc, l) => acc + l.daysOnMarket, 0) / mockListings.length);
  const potentialCommission = mockListings.reduce((acc, l) => acc + l.commission, 0);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Gestão de Imóveis
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os seus anúncios e clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Novo Anúncio
          </Button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalListings}</p>
                <p className="text-xs text-muted-foreground">Anúncios Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Eye className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalViews}</p>
                <p className="text-xs text-muted-foreground">Visualizações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalInquiries}</p>
                <p className="text-xs text-muted-foreground">Contactos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{avgDaysOnMarket}</p>
                <p className="text-xs text-muted-foreground">Média Dias Mercado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Euro className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">€{potentialCommission.toLocaleString('pt-PT')}</p>
                <p className="text-xs text-muted-foreground">Comissões Potenciais</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="listings">Anúncios</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
          </TabsList>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          {mockListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="md:w-56 h-40 md:h-auto relative">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-background/90">
                        <Clock className="h-3 w-3 mr-1" />
                        {listing.daysOnMarket} dias
                      </Badge>
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {listing.address}, {listing.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-xl font-bold text-primary">€{listing.price}/mês</p>
                        <p className="text-xs text-muted-foreground">Comissão: €{listing.commission}</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-semibold">{listing.views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-semibold">{listing.inquiries}</p>
                        <p className="text-xs text-muted-foreground">Contactos</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-muted/50">
                        <Target className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-semibold">{listing.performance}%</p>
                        <p className="text-xs text-muted-foreground">Performance</p>
                      </div>
                    </div>

                    {/* Owner & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Proprietário:</span>
                        <span className="font-medium text-foreground">{listing.owner}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Estatísticas
                        </Button>
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockClients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{client.name}</h4>
                        <Badge variant={client.type === 'buyer' ? 'default' : 'secondary'}>
                          {client.type === 'buyer' ? 'Comprador' : 'Vendedor'}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={client.status === 'active' ? 'success' : 'warning'}>
                      {client.status === 'active' ? 'Ativo' : 'Morno'}
                    </Badge>
                  </div>

                  {client.type === 'buyer' ? (
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Orçamento:</span> {client.budget}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Preferências:</span> {client.preferences}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Último contacto:</span> {new Date(client.lastContact!).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Imóvel:</span> {client.property}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Em anúncio desde:</span> {new Date(client.listingDate!).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Ligar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>Métricas detalhadas dos seus anúncios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Análises detalhadas em breve disponíveis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
