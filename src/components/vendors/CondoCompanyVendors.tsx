import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  FileText, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  Wrench,
  Zap,
  Droplets,
  Shield,
  Sparkles,
  Building2,
  Euro,
  BarChart3,
  Award
} from 'lucide-react';

interface CondoCompanyVendorsProps {
  user: User | null;
}

const categoryIcons: Record<string, React.ElementType> = {
  plumbing: Droplets,
  electrical: Zap,
  hvac: Wrench,
  cleaning: Sparkles,
  security: Shield,
};

const mockVendors = [
  {
    id: '1',
    name: 'Canalizações Lisboa Lda',
    category: 'plumbing',
    rating: 4.8,
    totalJobs: 156,
    buildings: 8,
    phone: '+351 912 345 678',
    email: 'info@canalizacoeslisboa.pt',
    contractValue: 24000,
    status: 'preferred',
    performance: 95,
  },
  {
    id: '2',
    name: 'ElectriPro Services',
    category: 'electrical',
    rating: 4.5,
    totalJobs: 89,
    buildings: 5,
    phone: '+351 923 456 789',
    email: 'contacto@electripro.pt',
    contractValue: 18000,
    status: 'active',
    performance: 88,
  },
  {
    id: '3',
    name: 'CleanMax Limpezas',
    category: 'cleaning',
    rating: 4.9,
    totalJobs: 320,
    buildings: 12,
    phone: '+351 934 567 890',
    email: 'geral@cleanmax.pt',
    contractValue: 48000,
    status: 'preferred',
    performance: 98,
  },
  {
    id: '4',
    name: 'HVAC Solutions',
    category: 'hvac',
    rating: 4.2,
    totalJobs: 45,
    buildings: 3,
    phone: '+351 945 678 901',
    email: 'suporte@hvacsolutions.pt',
    contractValue: 12000,
    status: 'active',
    performance: 82,
  },
  {
    id: '5',
    name: 'SecureGuard Portugal',
    category: 'security',
    rating: 4.7,
    totalJobs: 72,
    buildings: 6,
    phone: '+351 956 789 012',
    email: 'info@secureguard.pt',
    contractValue: 36000,
    status: 'preferred',
    performance: 94,
  },
  {
    id: '6',
    name: 'Jardins & Espaços Verdes',
    category: 'cleaning',
    rating: 4.4,
    totalJobs: 28,
    buildings: 4,
    phone: '+351 967 890 123',
    email: 'info@jardinsverdes.pt',
    contractValue: 8000,
    status: 'under-review',
    performance: 78,
  },
];

const mockPerformanceByCategory = [
  { category: 'Limpeza', vendors: 3, avgRating: 4.7, totalSpend: 56000, jobs: 348 },
  { category: 'Segurança', vendors: 2, avgRating: 4.6, totalSpend: 42000, jobs: 96 },
  { category: 'Canalização', vendors: 2, avgRating: 4.6, totalSpend: 28000, jobs: 178 },
  { category: 'Eletricidade', vendors: 2, avgRating: 4.4, totalSpend: 22000, jobs: 112 },
  { category: 'AVAC', vendors: 1, avgRating: 4.2, totalSpend: 12000, jobs: 45 },
];

const categoryLabels: Record<string, string> = {
  plumbing: 'Canalização',
  electrical: 'Eletricidade',
  hvac: 'AVAC',
  cleaning: 'Limpeza',
  security: 'Segurança',
};

const statusLabels: Record<string, string> = {
  preferred: 'Preferencial',
  active: 'Ativo',
  'under-review': 'Em Análise',
};

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  preferred: 'default',
  active: 'secondary',
  'under-review': 'outline',
};

export function CondoCompanyVendors({ user }: CondoCompanyVendorsProps) {
  const totalVendors = mockVendors.length;
  const preferredVendors = mockVendors.filter(v => v.status === 'preferred').length;
  const totalContractValue = mockVendors.reduce((sum, v) => sum + v.contractValue, 0);
  const avgPerformance = Math.round(mockVendors.reduce((sum, v) => sum + v.performance, 0) / mockVendors.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Gestão de Fornecedores</h1>
          <p className="text-muted-foreground">Visão geral de todos os prestadores de serviços da empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Relatórios
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Fornecedor
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalVendors}</p>
                <p className="text-xs text-muted-foreground">Total Fornecedores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{preferredVendors}</p>
                <p className="text-xs text-muted-foreground">Preferenciais</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Euro className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">€{(totalContractValue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-muted-foreground">Valor Contratos/Ano</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgPerformance}%</p>
                <p className="text-xs text-muted-foreground">Performance Média</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">Fornecedores</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar fornecedores..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="plumbing">Canalização</SelectItem>
                <SelectItem value="electrical">Eletricidade</SelectItem>
                <SelectItem value="hvac">AVAC</SelectItem>
                <SelectItem value="cleaning">Limpeza</SelectItem>
                <SelectItem value="security">Segurança</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="preferred">Preferenciais</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="under-review">Em Análise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Fornecedor</th>
                      <th className="text-left p-4 font-medium">Categoria</th>
                      <th className="text-center p-4 font-medium">Edifícios</th>
                      <th className="text-center p-4 font-medium">Avaliação</th>
                      <th className="text-center p-4 font-medium">Performance</th>
                      <th className="text-right p-4 font-medium">Contrato</th>
                      <th className="text-center p-4 font-medium">Estado</th>
                      <th className="text-right p-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockVendors.map((vendor) => {
                      const CategoryIcon = categoryIcons[vendor.category] || Wrench;
                      return (
                        <tr key={vendor.id} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <CategoryIcon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{vendor.name}</p>
                                <p className="text-sm text-muted-foreground">{vendor.totalJobs} trabalhos</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {categoryLabels[vendor.category]}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span>{vendor.buildings}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{vendor.rating}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Progress value={vendor.performance} className="h-2 w-16" />
                              <span className="text-sm">{vendor.performance}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">
                            €{vendor.contractValue.toLocaleString('pt-PT')}
                          </td>
                          <td className="p-4 text-center">
                            <Badge variant={statusVariants[vendor.status]}>
                              {statusLabels[vendor.status]}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm">Ver Detalhes</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Categoria</CardTitle>
                <CardDescription>Análise de desempenho dos fornecedores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPerformanceByCategory.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{cat.category}</span>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{cat.avgRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{cat.vendors} fornecedores • {cat.jobs} trabalhos</span>
                        <span>€{(cat.totalSpend / 1000).toFixed(0)}k/ano</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Fornecedores</CardTitle>
                <CardDescription>Melhores avaliações e performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVendors
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 5)
                    .map((vendor, index) => (
                      <div key={vendor.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium">{vendor.name}</p>
                            <p className="text-sm text-muted-foreground">{categoryLabels[vendor.category]}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={vendor.performance} className="h-2 w-20" />
                          <span className="font-medium">{vendor.performance}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Contratos</CardTitle>
              <CardDescription>Visão geral dos contratos ativos por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockPerformanceByCategory.map((cat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{cat.category}</p>
                        <p className="text-sm text-muted-foreground">{cat.vendors} fornecedores contratados</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">€{(cat.totalSpend / 1000).toFixed(0)}k</p>
                        <p className="text-sm text-muted-foreground">por ano</p>
                      </div>
                    </div>
                    <Progress value={(cat.totalSpend / 60000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Total Anual</span>
                  <span className="text-2xl font-bold">€{(totalContractValue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
