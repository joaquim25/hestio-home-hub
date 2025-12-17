import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Building2, 
  Users, 
  AlertTriangle,
  MapPin,
  Home,
  Clock,
  FileText,
  TrendingUp,
  Filter,
  Download,
  Plus,
} from 'lucide-react';

interface GovernmentPropertiesProps {
  user: User;
}

// Mock public housing data
const mockHousingStock = [
  {
    id: '1',
    name: 'Bairro Social da Amadora',
    district: 'Lisboa',
    municipality: 'Amadora',
    totalUnits: 420,
    occupiedUnits: 402,
    waitingList: 156,
    avgRent: 180,
    condition: 'good',
    lastRenovation: '2022',
    pendingMaintenance: 12,
  },
  {
    id: '2',
    name: 'Habitação Municipal de Setúbal',
    district: 'Setúbal',
    municipality: 'Setúbal',
    totalUnits: 285,
    occupiedUnits: 267,
    waitingList: 98,
    avgRent: 150,
    condition: 'fair',
    lastRenovation: '2019',
    pendingMaintenance: 28,
  },
  {
    id: '3',
    name: 'Complexo Habitacional do Porto',
    district: 'Porto',
    municipality: 'Porto',
    totalUnits: 380,
    occupiedUnits: 358,
    waitingList: 203,
    avgRent: 200,
    condition: 'good',
    lastRenovation: '2023',
    pendingMaintenance: 8,
  },
  {
    id: '4',
    name: 'Bairro Municipal de Faro',
    district: 'Faro',
    municipality: 'Faro',
    totalUnits: 160,
    occupiedUnits: 141,
    waitingList: 67,
    avgRent: 140,
    condition: 'needs_renovation',
    lastRenovation: '2015',
    pendingMaintenance: 35,
  },
];

const conditionConfig = {
  good: { label: 'Bom Estado', variant: 'success' as const },
  fair: { label: 'Razoável', variant: 'warning' as const },
  needs_renovation: { label: 'Necessita Renovação', variant: 'destructive' as const },
};

export function GovernmentProperties({ user }: GovernmentPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');

  const totalUnits = mockHousingStock.reduce((acc, h) => acc + h.totalUnits, 0);
  const totalOccupied = mockHousingStock.reduce((acc, h) => acc + h.occupiedUnits, 0);
  const totalWaiting = mockHousingStock.reduce((acc, h) => acc + h.waitingList, 0);
  const totalMaintenance = mockHousingStock.reduce((acc, h) => acc + h.pendingMaintenance, 0);

  const districts = [...new Set(mockHousingStock.map(h => h.district))];

  const filteredHousing = mockHousingStock.filter((housing) => {
    const matchesSearch = housing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      housing.municipality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'all' || housing.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Parque Habitacional
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão do inventário de habitação social
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Complexo
          </Button>
        </div>
      </div>

      {/* National Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fogos</p>
                <p className="text-3xl font-bold font-display">{totalUnits.toLocaleString('pt-PT')}</p>
                <p className="text-xs text-muted-foreground mt-1">{mockHousingStock.length} complexos</p>
              </div>
              <Building2 className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                <p className="text-3xl font-bold font-display">{Math.round((totalOccupied / totalUnits) * 100)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{totalOccupied.toLocaleString('pt-PT')} ocupados</p>
              </div>
              <Users className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lista de Espera</p>
                <p className="text-3xl font-bold font-display">{totalWaiting.toLocaleString('pt-PT')}</p>
                <p className="text-xs text-muted-foreground mt-1">Candidaturas ativas</p>
              </div>
              <Clock className="h-8 w-8 text-secondary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Manutenções</p>
                <p className="text-3xl font-bold font-display">{totalMaintenance}</p>
                <p className="text-xs text-muted-foreground mt-1">Pedidos pendentes</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar complexos habitacionais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={districtFilter} onValueChange={setDistrictFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Distrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Distritos</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Housing Stock List */}
      <div className="space-y-4">
        {filteredHousing.map((housing) => (
          <Card key={housing.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Housing Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-xl">{housing.name}</h3>
                        <Badge variant={conditionConfig[housing.condition].variant}>
                          {conditionConfig[housing.condition].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {housing.municipality}, {housing.district}
                      </p>
                    </div>
                    {housing.pendingMaintenance > 20 && (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {housing.pendingMaintenance} manutenções
                      </Badge>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Fogos</span>
                      </div>
                      <p className="font-semibold">{housing.totalUnits}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Ocupados</span>
                      </div>
                      <p className="font-semibold">{housing.occupiedUnits} ({Math.round((housing.occupiedUnits / housing.totalUnits) * 100)}%)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Lista Espera</span>
                      </div>
                      <p className="font-semibold">{housing.waitingList}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Renda Média</span>
                      </div>
                      <p className="font-semibold">€{housing.avgRent}/mês</p>
                    </div>
                  </div>

                  {/* Occupancy Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Taxa de Ocupação</span>
                      <span className="font-medium">{Math.round((housing.occupiedUnits / housing.totalUnits) * 100)}%</span>
                    </div>
                    <Progress 
                      value={Math.round((housing.occupiedUnits / housing.totalUnits) * 100)} 
                      className="h-2"
                    />
                  </div>

                  {/* Additional Info */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Última renovação: {housing.lastRenovation}</span>
                    <span>•</span>
                    <span>{housing.pendingMaintenance} manutenções pendentes</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <Button className="w-full">
                    <Building2 className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Residentes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Candidaturas
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Manutenções
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHousing.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Nenhum complexo encontrado</h3>
          <p className="text-muted-foreground">
            Ajuste os filtros para encontrar resultados.
          </p>
        </div>
      )}
    </main>
  );
}
