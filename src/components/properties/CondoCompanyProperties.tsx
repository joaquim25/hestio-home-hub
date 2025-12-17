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
  TrendingUp,
  AlertTriangle,
  MapPin,
  Euro,
  UserCheck,
  BarChart3,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface CondoCompanyPropertiesProps {
  user: User;
}

// Mock portfolio data
const mockPortfolio = [
  {
    id: '1',
    name: 'Edifício Aurora',
    address: 'Av. da Liberdade, 120, Lisboa',
    manager: 'António Silva',
    managerPerformance: 92,
    totalUnits: 24,
    occupancyRate: 96,
    monthlyRevenue: 18500,
    collectionRate: 94,
    pendingIssues: 3,
    contract: { start: '2023-01', end: '2025-12' },
  },
  {
    id: '2',
    name: 'Residencial Tejo',
    address: 'Rua do Comércio, 45, Lisboa',
    manager: 'Maria Santos',
    managerPerformance: 88,
    totalUnits: 16,
    occupancyRate: 100,
    monthlyRevenue: 12000,
    collectionRate: 98,
    pendingIssues: 1,
    contract: { start: '2022-06', end: '2024-05' },
  },
  {
    id: '3',
    name: 'Condomínio Estrela',
    address: 'Rua da Estrela, 78, Lisboa',
    manager: 'João Ferreira',
    managerPerformance: 75,
    totalUnits: 32,
    occupancyRate: 88,
    monthlyRevenue: 24000,
    collectionRate: 89,
    pendingIssues: 8,
    contract: { start: '2024-01', end: '2026-12' },
  },
  {
    id: '4',
    name: 'Torre do Parque',
    address: 'Av. dos Aliados, 200, Porto',
    manager: 'Ana Costa',
    managerPerformance: 95,
    totalUnits: 48,
    occupancyRate: 94,
    monthlyRevenue: 36000,
    collectionRate: 96,
    pendingIssues: 4,
    contract: { start: '2023-06', end: '2026-05' },
  },
];

export function CondoCompanyProperties({ user }: CondoCompanyPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [performanceFilter, setPerformanceFilter] = useState('all');

  const totalUnits = mockPortfolio.reduce((acc, p) => acc + p.totalUnits, 0);
  const totalRevenue = mockPortfolio.reduce((acc, p) => acc + p.monthlyRevenue, 0);
  const avgOccupancy = Math.round(mockPortfolio.reduce((acc, p) => acc + p.occupancyRate, 0) / mockPortfolio.length);
  const avgCollection = Math.round(mockPortfolio.reduce((acc, p) => acc + p.collectionRate, 0) / mockPortfolio.length);
  const totalIssues = mockPortfolio.reduce((acc, p) => acc + p.pendingIssues, 0);

  const filteredPortfolio = mockPortfolio.filter((building) => {
    const matchesSearch = building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (performanceFilter === 'high') return matchesSearch && building.managerPerformance >= 90;
    if (performanceFilter === 'medium') return matchesSearch && building.managerPerformance >= 80 && building.managerPerformance < 90;
    if (performanceFilter === 'low') return matchesSearch && building.managerPerformance < 80;
    return matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Portfólio de Condomínios
          </h1>
          <p className="text-muted-foreground mt-1">
            Visão geral de todos os edifícios geridos pela empresa
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Relatório Geral
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Condomínio
          </Button>
        </div>
      </div>

      {/* Company-wide Stats */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold font-display">{mockPortfolio.length}</p>
              <p className="text-xs text-muted-foreground">Condomínios</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold font-display">{totalUnits}</p>
              <p className="text-xs text-muted-foreground">Total Frações</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold font-display">€{(totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground">Receita Mensal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <UserCheck className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold font-display">{avgCollection}%</p>
              <p className="text-xs text-muted-foreground">Média Cobrança</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-warning" />
              <p className="text-2xl font-bold font-display">{totalIssues}</p>
              <p className="text-xs text-muted-foreground">Ocorrências</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar condomínios ou gestores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Performance do Gestor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Performances</SelectItem>
            <SelectItem value="high">Alta (≥90%)</SelectItem>
            <SelectItem value="medium">Média (80-89%)</SelectItem>
            <SelectItem value="low">Baixa (&lt;80%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Portfolio Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredPortfolio.map((building) => (
          <Card key={building.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{building.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {building.address}
                  </p>
                </div>
                {building.pendingIssues > 5 && (
                  <Badge variant="destructive">
                    {building.pendingIssues} ocorrências
                  </Badge>
                )}
              </div>

              {/* Manager Info */}
              <div className="p-3 rounded-lg bg-muted/50 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {building.manager.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{building.manager}</p>
                      <p className="text-xs text-muted-foreground">Gestor</p>
                    </div>
                  </div>
                  <Badge 
                    variant={building.managerPerformance >= 90 ? 'success' : building.managerPerformance >= 80 ? 'warning' : 'destructive'}
                  >
                    {building.managerPerformance}%
                  </Badge>
                </div>
                <Progress 
                  value={building.managerPerformance} 
                  className={`h-1.5 ${building.managerPerformance >= 90 ? '[&>div]:bg-success' : building.managerPerformance >= 80 ? '[&>div]:bg-warning' : '[&>div]:bg-destructive'}`}
                />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 rounded bg-muted/30 text-center">
                  <p className="text-lg font-bold">{building.totalUnits}</p>
                  <p className="text-xs text-muted-foreground">Frações</p>
                </div>
                <div className="p-2 rounded bg-muted/30 text-center">
                  <p className="text-lg font-bold">{building.occupancyRate}%</p>
                  <p className="text-xs text-muted-foreground">Ocupação</p>
                </div>
                <div className="p-2 rounded bg-muted/30 text-center">
                  <p className="text-lg font-bold">€{(building.monthlyRevenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Receita/Mês</p>
                </div>
                <div className="p-2 rounded bg-muted/30 text-center">
                  <p className={`text-lg font-bold ${building.collectionRate >= 95 ? 'text-success' : building.collectionRate >= 90 ? 'text-warning' : 'text-destructive'}`}>
                    {building.collectionRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">Cobrança</p>
                </div>
              </div>

              {/* Contract Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Contrato: {building.contract.start} - {building.contract.end}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button size="sm" className="flex-1">
                  Gestão
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPortfolio.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Nenhum condomínio encontrado</h3>
          <p className="text-muted-foreground">
            Ajuste os filtros para encontrar resultados.
          </p>
        </div>
      )}
    </main>
  );
}
