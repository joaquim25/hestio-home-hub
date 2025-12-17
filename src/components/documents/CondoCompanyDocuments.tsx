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
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockDocuments = [
  {
    id: '1',
    name: 'Contrato de Gestão - Ed. Aurora',
    type: 'management',
    building: 'Edifício Aurora',
    uploadedAt: '2024-01-15',
    expiresAt: '2025-01-15',
    size: '2.4 MB',
    status: 'active',
  },
  {
    id: '2',
    name: 'Contrato de Gestão - Ed. Belém',
    type: 'management',
    building: 'Edifício Belém',
    uploadedAt: '2024-03-01',
    expiresAt: '2025-03-01',
    size: '2.2 MB',
    status: 'active',
  },
  {
    id: '3',
    name: 'Apólice Responsabilidade Civil',
    type: 'insurance',
    uploadedAt: '2024-01-01',
    expiresAt: '2025-01-01',
    size: '1.8 MB',
    status: 'expiring',
  },
  {
    id: '4',
    name: 'Licença AMI',
    type: 'license',
    uploadedAt: '2023-06-15',
    expiresAt: '2025-06-15',
    size: '456 KB',
    status: 'active',
  },
  {
    id: '5',
    name: 'Relatório Consolidado Q3 2024',
    type: 'report',
    uploadedAt: '2024-10-15',
    size: '5.2 MB',
    status: 'signed',
  },
  {
    id: '6',
    name: 'Contrato de Gestão - Cond. Tejo',
    type: 'management',
    building: 'Condomínio Tejo',
    uploadedAt: '2024-11-01',
    size: '2.1 MB',
    status: 'pending',
  },
  {
    id: '7',
    name: 'Certificação ISO 9001',
    type: 'certification',
    uploadedAt: '2024-02-20',
    expiresAt: '2027-02-20',
    size: '1.2 MB',
    status: 'active',
  },
  {
    id: '8',
    name: 'Regulamento Interno Empresa',
    type: 'internal',
    uploadedAt: '2024-01-01',
    size: '3.4 MB',
    status: 'active',
  },
];

const typeLabels: Record<string, string> = {
  management: 'Gestão',
  insurance: 'Seguros',
  license: 'Licenças',
  report: 'Relatórios',
  certification: 'Certificações',
  internal: 'Interno',
};

const typeIcons: Record<string, any> = {
  management: Briefcase,
  insurance: Shield,
  license: Scale,
  report: FileText,
  certification: FileSignature,
  internal: Users,
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

export function CondoCompanyDocuments() {
  const documentsByType = {
    all: mockDocuments,
    management: mockDocuments.filter(d => d.type === 'management'),
    insurance: mockDocuments.filter(d => d.type === 'insurance'),
    license: mockDocuments.filter(d => d.type === 'license'),
    report: mockDocuments.filter(d => d.type === 'report'),
    certification: mockDocuments.filter(d => d.type === 'certification'),
    internal: mockDocuments.filter(d => d.type === 'internal'),
  };

  const expiringDocs = mockDocuments.filter(d => d.status === 'expiring');

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Contratos de gestão, licenças e documentação corporativa
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSignature className="h-4 w-4 mr-2" />
            Novo Contrato
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Carregar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{mockDocuments.length}</p>
                <p className="text-sm text-muted-foreground">Total Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Briefcase className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'management').length}
                </p>
                <p className="text-sm text-muted-foreground">Contratos Gestão</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Building className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">3</p>
                <p className="text-sm text-muted-foreground">Edifícios Geridos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{expiringDocs.length}</p>
                <p className="text-sm text-muted-foreground">A Expirar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiring Alert */}
      {expiringDocs.length > 0 && (
        <Card className="mb-8 border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Documentos a Expirar</p>
                  <p className="text-sm text-muted-foreground">
                    {expiringDocs.length} documento(s) próximo(s) da validade - requer renovação
                  </p>
                </div>
              </div>
              <Button variant="outline">Ver Todos</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Biblioteca de Documentos</CardTitle>
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por edifício" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Edifícios</SelectItem>
                  <SelectItem value="aurora">Edifício Aurora</SelectItem>
                  <SelectItem value="belem">Edifício Belém</SelectItem>
                  <SelectItem value="tejo">Condomínio Tejo</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar documentos..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="management">Gestão</TabsTrigger>
              <TabsTrigger value="insurance">Seguros</TabsTrigger>
              <TabsTrigger value="license">Licenças</TabsTrigger>
              <TabsTrigger value="report">Relatórios</TabsTrigger>
              <TabsTrigger value="certification">Certificações</TabsTrigger>
            </TabsList>

            {Object.entries(documentsByType).map(([type, docs]) => (
              <TabsContent key={type} value={type}>
                <div className="space-y-3">
                  {docs.map((doc) => {
                    const TypeIcon = typeIcons[doc.type];
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {'building' in doc && <span>{doc.building}</span>}
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
                            <Button size="sm">Finalizar</Button>
                          )}
                          {doc.status === 'expiring' && (
                            <Button size="sm" variant="outline">Renovar</Button>
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
                              <DropdownMenuItem>Enviar</DropdownMenuItem>
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
