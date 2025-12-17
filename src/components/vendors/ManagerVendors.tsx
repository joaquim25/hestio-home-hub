import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Star, 
  Phone, 
  Mail, 
  FileText, 
  Clock, 
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Wrench,
  Zap,
  Droplets,
  Shield,
  Sparkles,
  MoreVertical
} from 'lucide-react';

interface ManagerVendorsProps {
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
    totalJobs: 45,
    activeJobs: 2,
    phone: '+351 912 345 678',
    email: 'info@canalizacoeslisboa.pt',
    contractEnd: '2025-06-30',
    status: 'active',
    responseTime: '2h',
    completionRate: 98,
  },
  {
    id: '2',
    name: 'ElectriPro Services',
    category: 'electrical',
    rating: 4.5,
    totalJobs: 32,
    activeJobs: 1,
    phone: '+351 923 456 789',
    email: 'contacto@electripro.pt',
    contractEnd: '2025-03-15',
    status: 'active',
    responseTime: '4h',
    completionRate: 95,
  },
  {
    id: '3',
    name: 'CleanMax Limpezas',
    category: 'cleaning',
    rating: 4.9,
    totalJobs: 120,
    activeJobs: 5,
    phone: '+351 934 567 890',
    email: 'geral@cleanmax.pt',
    contractEnd: '2025-12-31',
    status: 'active',
    responseTime: '1h',
    completionRate: 99,
  },
  {
    id: '4',
    name: 'HVAC Solutions',
    category: 'hvac',
    rating: 4.2,
    totalJobs: 18,
    activeJobs: 0,
    phone: '+351 945 678 901',
    email: 'suporte@hvacsolutions.pt',
    contractEnd: '2025-01-31',
    status: 'expiring',
    responseTime: '6h',
    completionRate: 90,
  },
  {
    id: '5',
    name: 'SecureGuard Portugal',
    category: 'security',
    rating: 4.7,
    totalJobs: 24,
    activeJobs: 1,
    phone: '+351 956 789 012',
    email: 'info@secureguard.pt',
    contractEnd: '2024-12-01',
    status: 'expired',
    responseTime: '30min',
    completionRate: 100,
  },
];

const mockWorkHistory = [
  { id: '1', vendor: 'Canalizações Lisboa Lda', service: 'Reparação de fuga', date: '2024-12-20', cost: 150, rating: 5 },
  { id: '2', vendor: 'ElectriPro Services', service: 'Instalação de tomadas', date: '2024-12-18', cost: 280, rating: 4 },
  { id: '3', vendor: 'CleanMax Limpezas', service: 'Limpeza geral', date: '2024-12-15', cost: 200, rating: 5 },
  { id: '4', vendor: 'HVAC Solutions', service: 'Manutenção AC', date: '2024-12-10', cost: 350, rating: 4 },
  { id: '5', vendor: 'Canalizações Lisboa Lda', service: 'Desentupimento', date: '2024-12-08', cost: 120, rating: 5 },
];

const categoryLabels: Record<string, string> = {
  plumbing: 'Canalização',
  electrical: 'Eletricidade',
  hvac: 'AVAC',
  cleaning: 'Limpeza',
  security: 'Segurança',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  expiring: 'A Expirar',
  expired: 'Expirado',
};

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  expiring: 'secondary',
  expired: 'destructive',
};

export function ManagerVendors({ user }: ManagerVendorsProps) {
  const activeVendors = mockVendors.filter(v => v.status === 'active').length;
  const expiringContracts = mockVendors.filter(v => v.status === 'expiring').length;
  const avgRating = (mockVendors.reduce((sum, v) => sum + v.rating, 0) / mockVendors.length).toFixed(1);
  const totalActiveJobs = mockVendors.reduce((sum, v) => sum + v.activeJobs, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">Gestão de Fornecedores</h1>
          <p className="text-muted-foreground">Gerir prestadores de serviços e contratos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Fornecedor
        </Button>
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
                <p className="text-2xl font-bold">{activeVendors}</p>
                <p className="text-xs text-muted-foreground">Fornecedores Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgRating}</p>
                <p className="text-xs text-muted-foreground">Avaliação Média</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Wrench className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActiveJobs}</p>
                <p className="text-xs text-muted-foreground">Trabalhos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <FileText className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringContracts}</p>
                <p className="text-xs text-muted-foreground">Contratos a Expirar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">Fornecedores</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="expiring">A Expirar</SelectItem>
                <SelectItem value="expired">Expirados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockVendors.map((vendor) => {
              const CategoryIcon = categoryIcons[vendor.category] || Wrench;
              return (
                <Card key={vendor.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{vendor.name}</CardTitle>
                          <CardDescription>{categoryLabels[vendor.category]}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={statusVariants[vendor.status]}>
                        {statusLabels[vendor.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-muted-foreground">({vendor.totalJobs} trabalhos)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{vendor.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{vendor.completionRate}% conclusão</span>
                      </div>
                      {vendor.activeJobs > 0 && (
                        <Badge variant="outline">{vendor.activeJobs} ativo(s)</Badge>
                      )}
                    </div>

                    <div className="pt-2 border-t space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{vendor.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Contactar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Ver Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contratos Ativos</CardTitle>
              <CardDescription>Gestão de contratos com fornecedores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{categoryLabels[vendor.category]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Expira: {new Date(vendor.contractEnd).toLocaleDateString('pt-PT')}</p>
                        <Badge variant={statusVariants[vendor.status]} className="mt-1">
                          {statusLabels[vendor.status]}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Trabalhos</CardTitle>
              <CardDescription>Trabalhos realizados por fornecedores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWorkHistory.map((work) => (
                  <div key={work.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{work.service}</p>
                      <p className="text-sm text-muted-foreground">{work.vendor}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">€{work.cost}</p>
                        <p className="text-sm text-muted-foreground">{new Date(work.date).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{work.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
