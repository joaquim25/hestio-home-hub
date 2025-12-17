import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Upload,
  Download,
  Search,
  FileSignature,
  Clock,
  MoreVertical,
  Building,
  Shield,
  Scale,
  Users,
  Wrench,
  Receipt,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockDocuments = [
  {
    id: '1',
    name: 'Regulamento Interno - Ed. Aurora',
    type: 'regulation',
    building: 'Edifício Aurora',
    uploadedAt: '2024-01-15',
    size: '2.4 MB',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ata Assembleia Geral 2024',
    type: 'meeting',
    building: 'Edifício Aurora',
    uploadedAt: '2024-03-20',
    size: '1.2 MB',
    status: 'signed',
  },
  {
    id: '3',
    name: 'Contrato Manutenção Elevadores',
    type: 'vendor',
    building: 'Edifício Aurora',
    vendor: 'ElevaTech',
    uploadedAt: '2024-02-01',
    expiresAt: '2025-02-01',
    size: '890 KB',
    status: 'active',
  },
  {
    id: '4',
    name: 'Apólice Seguro Condomínio',
    type: 'insurance',
    building: 'Edifício Aurora',
    uploadedAt: '2024-01-01',
    expiresAt: '2025-01-01',
    size: '1.5 MB',
    status: 'expiring',
  },
  {
    id: '5',
    name: 'Orçamento Obras Fachada',
    type: 'budget',
    building: 'Edifício Aurora',
    uploadedAt: '2024-11-15',
    size: '3.2 MB',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Licença de Utilização',
    type: 'license',
    building: 'Edifício Aurora',
    uploadedAt: '2015-06-10',
    size: '456 KB',
    status: 'active',
  },
  {
    id: '7',
    name: 'Relatório Contas Anual 2023',
    type: 'financial',
    building: 'Edifício Aurora',
    uploadedAt: '2024-02-15',
    size: '2.8 MB',
    status: 'signed',
  },
];

const typeLabels: Record<string, string> = {
  regulation: 'Regulamentos',
  meeting: 'Assembleias',
  vendor: 'Fornecedores',
  insurance: 'Seguros',
  budget: 'Orçamentos',
  license: 'Licenças',
  financial: 'Financeiro',
};

const typeIcons: Record<string, any> = {
  regulation: Scale,
  meeting: Users,
  vendor: Wrench,
  insurance: Shield,
  budget: Receipt,
  license: FileSignature,
  financial: FileText,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  active: 'Ativo',
  signed: 'Aprovado',
  expiring: 'A Expirar',
  expired: 'Expirado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  active: 'success',
  signed: 'success',
  expiring: 'warning',
  expired: 'destructive',
};

export function ManagerDocuments() {
  const documentsByType = {
    all: mockDocuments,
    regulation: mockDocuments.filter(d => d.type === 'regulation'),
    meeting: mockDocuments.filter(d => d.type === 'meeting'),
    vendor: mockDocuments.filter(d => d.type === 'vendor'),
    insurance: mockDocuments.filter(d => d.type === 'insurance'),
    budget: mockDocuments.filter(d => d.type === 'budget'),
    financial: mockDocuments.filter(d => d.type === 'financial'),
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Regulamentos, atas, contratos e documentação do condomínio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Nova Ata
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Carregar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="glass-card rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/15">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{mockDocuments.length}</p>
                <p className="text-sm text-muted-foreground">Total Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/15">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'meeting').length}
                </p>
                <p className="text-sm text-muted-foreground">Atas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/15">
                <Wrench className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'vendor').length}
                </p>
                <p className="text-sm text-muted-foreground">Contratos Fornecedores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/15">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.status === 'pending' || d.status === 'expiring').length}
                </p>
                <p className="text-sm text-muted-foreground">Requer Atenção</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card className="glass-card rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Biblioteca de Documentos</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar documentos..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="regulation">Regulamentos</TabsTrigger>
              <TabsTrigger value="meeting">Assembleias</TabsTrigger>
              <TabsTrigger value="vendor">Fornecedores</TabsTrigger>
              <TabsTrigger value="insurance">Seguros</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
            </TabsList>

            {Object.entries(documentsByType).map(([type, docs]) => (
              <TabsContent key={type} value={type}>
                <div className="space-y-3">
                  {docs.map((doc) => {
                    const TypeIcon = typeIcons[doc.type];
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{doc.building}</span>
                              {'vendor' in doc && (
                                <>
                                  <span>•</span>
                                  <span>{doc.vendor}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}</span>
                              {'expiresAt' in doc && (
                                <>
                                  <span>•</span>
                                  <span>Expira: {new Date(doc.expiresAt as string).toLocaleDateString('pt-PT')}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={statusVariants[doc.status]}>
                            {statusLabels[doc.status]}
                          </Badge>
                          {doc.status === 'pending' && (
                            <Button size="sm">Aprovar</Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver</DropdownMenuItem>
                              <DropdownMenuItem>Descarregar</DropdownMenuItem>
                              <DropdownMenuItem>Enviar Condóminos</DropdownMenuItem>
                              <DropdownMenuItem>Renovar</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Arquivar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
