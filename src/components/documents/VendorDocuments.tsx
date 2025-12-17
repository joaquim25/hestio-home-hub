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
  Shield,
  Scale,
  Award,
  Wrench,
  Receipt,
  AlertTriangle,
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
    name: 'Licença de Atividade',
    type: 'license',
    uploadedAt: '2023-01-15',
    expiresAt: '2025-01-15',
    size: '890 KB',
    status: 'active',
  },
  {
    id: '2',
    name: 'Seguro Responsabilidade Civil',
    type: 'insurance',
    uploadedAt: '2024-01-01',
    expiresAt: '2025-01-01',
    size: '1.2 MB',
    status: 'expiring',
  },
  {
    id: '3',
    name: 'Certificação Técnica Elevadores',
    type: 'certification',
    uploadedAt: '2024-06-15',
    expiresAt: '2027-06-15',
    size: '2.4 MB',
    status: 'active',
  },
  {
    id: '4',
    name: 'Contrato Serviço - Ed. Aurora',
    type: 'contract',
    client: 'Edifício Aurora',
    uploadedAt: '2024-02-01',
    expiresAt: '2025-02-01',
    size: '1.8 MB',
    status: 'active',
  },
  {
    id: '5',
    name: 'Contrato Serviço - Ed. Belém',
    type: 'contract',
    client: 'Edifício Belém',
    uploadedAt: '2024-05-15',
    expiresAt: '2025-05-15',
    size: '1.6 MB',
    status: 'active',
  },
  {
    id: '6',
    name: 'Proposta Manutenção - Cond. Tejo',
    type: 'proposal',
    client: 'Condomínio Tejo',
    uploadedAt: '2024-12-01',
    size: '956 KB',
    status: 'pending',
  },
  {
    id: '7',
    name: 'Fatura #2024-156',
    type: 'invoice',
    client: 'Edifício Aurora',
    uploadedAt: '2024-12-10',
    size: '245 KB',
    status: 'sent',
  },
  {
    id: '8',
    name: 'Relatório Técnico - Inspeção Anual',
    type: 'report',
    client: 'Edifício Belém',
    uploadedAt: '2024-11-20',
    size: '4.2 MB',
    status: 'signed',
  },
];

const typeLabels: Record<string, string> = {
  license: 'Licenças',
  insurance: 'Seguros',
  certification: 'Certificações',
  contract: 'Contratos',
  proposal: 'Propostas',
  invoice: 'Faturas',
  report: 'Relatórios',
};

const typeIcons: Record<string, any> = {
  license: Scale,
  insurance: Shield,
  certification: Award,
  contract: FileSignature,
  proposal: FileText,
  invoice: Receipt,
  report: Wrench,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  active: 'Ativo',
  signed: 'Aprovado',
  sent: 'Enviado',
  expiring: 'A Expirar',
  expired: 'Expirado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  active: 'success',
  signed: 'success',
  sent: 'secondary',
  expiring: 'warning',
  expired: 'destructive',
};

export function VendorDocuments() {
  const documentsByType = {
    all: mockDocuments,
    license: mockDocuments.filter(d => d.type === 'license'),
    insurance: mockDocuments.filter(d => d.type === 'insurance'),
    certification: mockDocuments.filter(d => d.type === 'certification'),
    contract: mockDocuments.filter(d => d.type === 'contract'),
    proposal: mockDocuments.filter(d => d.type === 'proposal'),
    invoice: mockDocuments.filter(d => d.type === 'invoice'),
  };

  const expiringDocs = mockDocuments.filter(d => d.status === 'expiring');

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Licenças, certificações, contratos e faturas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Nova Fatura
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
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'certification').length}
                </p>
                <p className="text-sm text-muted-foreground">Certificações</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <FileSignature className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'contract').length}
                </p>
                <p className="text-sm text-muted-foreground">Contratos Ativos</p>
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
                    {expiringDocs.length} documento(s) próximo(s) da validade - renove para manter a atividade
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
              <TabsTrigger value="license">Licenças</TabsTrigger>
              <TabsTrigger value="certification">Certificações</TabsTrigger>
              <TabsTrigger value="contract">Contratos</TabsTrigger>
              <TabsTrigger value="proposal">Propostas</TabsTrigger>
              <TabsTrigger value="invoice">Faturas</TabsTrigger>
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
                              {'client' in doc && <span>{doc.client}</span>}
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
                            <Button size="sm">Enviar</Button>
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
                              <DropdownMenuItem>Enviar ao Cliente</DropdownMenuItem>
                              <DropdownMenuItem>Duplicar</DropdownMenuItem>
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
