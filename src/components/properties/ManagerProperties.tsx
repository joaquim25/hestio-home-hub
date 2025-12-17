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
  Wrench,
  DollarSign,
  Home,
  Layers,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';

interface ManagerPropertiesProps {
  user: User;
}

// Mock buildings data
const mockBuildings = [
  {
    id: '1',
    name: 'Edifício Aurora',
    address: 'Av. da Liberdade, 120',
    city: 'Lisboa',
    totalUnits: 24,
    occupiedUnits: 22,
    floors: 6,
    parkingSpaces: 30,
    commonAreas: ['Jardim', 'Ginásio', 'Piscina'],
    pendingIssues: 3,
    monthlyFees: 18500,
    collectionRate: 94,
    lastInspection: '2024-01-10',
  },
  {
    id: '2',
    name: 'Residencial Tejo',
    address: 'Rua do Comércio, 45',
    city: 'Lisboa',
    totalUnits: 16,
    occupiedUnits: 16,
    floors: 4,
    parkingSpaces: 20,
    commonAreas: ['Terraço', 'Sala Reuniões'],
    pendingIssues: 1,
    monthlyFees: 12000,
    collectionRate: 98,
    lastInspection: '2024-01-05',
  },
  {
    id: '3',
    name: 'Condomínio Estrela',
    address: 'Rua da Estrela, 78',
    city: 'Lisboa',
    totalUnits: 32,
    occupiedUnits: 28,
    floors: 8,
    parkingSpaces: 45,
    commonAreas: ['Jardim', 'Playground', 'Churrasqueira'],
    pendingIssues: 5,
    monthlyFees: 24000,
    collectionRate: 89,
    lastInspection: '2024-01-12',
  },
];

export function ManagerProperties({ user }: ManagerPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const totalUnits = mockBuildings.reduce((acc, b) => acc + b.totalUnits, 0);
  const totalOccupied = mockBuildings.reduce((acc, b) => acc + b.occupiedUnits, 0);
  const totalPendingIssues = mockBuildings.reduce((acc, b) => acc + b.pendingIssues, 0);
  const avgCollectionRate = Math.round(mockBuildings.reduce((acc, b) => acc + b.collectionRate, 0) / mockBuildings.length);

  const filteredBuildings = mockBuildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    building.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Edifícios
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão dos condomínios sob sua responsabilidade
          </p>
        </div>
        <Button variant="outline">
          <Building2 className="h-4 w-4 mr-2" />
          Relatório Geral
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Frações</p>
                <p className="text-3xl font-bold font-display">{totalUnits}</p>
                <p className="text-xs text-muted-foreground mt-1">{mockBuildings.length} edifícios</p>
              </div>
              <Layers className="h-8 w-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Ocupação</p>
                <p className="text-3xl font-bold font-display">{Math.round((totalOccupied / totalUnits) * 100)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{totalOccupied} ocupadas</p>
              </div>
              <Users className="h-8 w-8 text-success/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Cobrança</p>
                <p className="text-3xl font-bold font-display">{avgCollectionRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">Média dos edifícios</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ocorrências</p>
                <p className="text-3xl font-bold font-display">{totalPendingIssues}</p>
                <p className="text-xs text-muted-foreground mt-1">Pendentes</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar edifícios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Buildings List */}
      <div className="space-y-4">
        {filteredBuildings.map((building) => (
          <Card key={building.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Building Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{building.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {building.address}, {building.city}
                      </p>
                    </div>
                    {building.pendingIssues > 2 && (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {building.pendingIssues} ocorrências
                      </Badge>
                    )}
                  </div>

                  {/* Building Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Frações</span>
                      </div>
                      <p className="font-semibold">{building.occupiedUnits}/{building.totalUnits}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Pisos</span>
                      </div>
                      <p className="font-semibold">{building.floors}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Quotas/Mês</span>
                      </div>
                      <p className="font-semibold">€{building.monthlyFees.toLocaleString('pt-PT')}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Cobrança</span>
                      </div>
                      <p className={`font-semibold ${building.collectionRate >= 95 ? 'text-success' : building.collectionRate >= 90 ? 'text-warning' : 'text-destructive'}`}>
                        {building.collectionRate}%
                      </p>
                    </div>
                  </div>

                  {/* Collection Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Taxa de Cobrança</span>
                      <span className="font-medium">{building.collectionRate}%</span>
                    </div>
                    <Progress 
                      value={building.collectionRate} 
                      className={`h-2 ${building.collectionRate >= 95 ? '[&>div]:bg-success' : building.collectionRate >= 90 ? '[&>div]:bg-warning' : '[&>div]:bg-destructive'}`}
                    />
                  </div>

                  {/* Common Areas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {building.commonAreas.map((area, idx) => (
                      <Badge key={idx} variant="outline">{area}</Badge>
                    ))}
                  </div>

                  {/* Last Inspection */}
                  <p className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Última inspeção: {new Date(building.lastInspection).toLocaleDateString('pt-PT')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <Button className="w-full">
                    <Building2 className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Wrench className="h-4 w-4 mr-2" />
                    Manutenções
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Condóminos
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Finanças
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBuildings.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Nenhum edifício encontrado</h3>
          <p className="text-muted-foreground">
            Ajuste a pesquisa para encontrar resultados.
          </p>
        </div>
      )}
    </main>
  );
}
