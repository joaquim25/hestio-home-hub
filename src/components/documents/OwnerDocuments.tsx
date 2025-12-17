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
  CheckCircle2,
  MoreVertical,
  Home,
  Receipt,
  Shield,
  Scale,
  Building,
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
    name: 'Contrato de Arrendamento - T2 Chiado',
    type: 'lease',
    property: 'T2 Chiado',
    tenant: 'João Silva',
    uploadedAt: '2024-06-15',
    expiresAt: '2025-06-15',
    size: '2.4 MB',
    status: 'signed',
  },
  {
    id: '2',
    name: 'Contrato de Arrendamento - T3 Cascais',
    type: 'lease',
    property: 'T3 Cascais',
    tenant: 'Maria Santos',
    uploadedAt: '2024-03-01',
    expiresAt: '2025-03-01',
    size: '2.1 MB',
    status: 'signed',
  },
  {
    id: '3',
    name: 'Certificado Energético - T2 Chiado',
    type: 'certificate',
    property: 'T2 Chiado',
    uploadedAt: '2024-06-10',
    expiresAt: '2034-06-10',
    size: '1.2 MB',
    status: 'signed',
  },
  {
    id: '4',
    name: 'Licença de Utilização - T3 Cascais',
    type: 'license',
    property: 'T3 Cascais',
    uploadedAt: '2020-03-15',
    size: '456 KB',
    status: 'signed',
  },
  {
    id: '5',
    name: 'Seguro Multirriscos - T2 Chiado',
    type: 'insurance',
    property: 'T2 Chiado',
    uploadedAt: '2024-07-20',
    expiresAt: '2025-07-20',
    size: '890 KB',
    status: 'signed',
  },
  {
    id: '6',
    name: 'Seguro Multirriscos - T3 Cascais',
    type: 'insurance',
    property: 'T3 Cascais',
    uploadedAt: '2024-02-15',
    expiresAt: '2025-02-15',
    size: '920 KB',
    status: 'expiring',
  },
  {
    id: '7',
    name: 'Renovação Contratual - T2 Chiado',
    type: 'lease',
    property: 'T2 Chiado',
    tenant: 'João Silva',
    uploadedAt: '2024-11-15',
    size: '456 KB',
    status: 'pending',
  },
  {
    id: '8',
    name: 'Escritura de Propriedade - T2 Chiado',
    type: 'property',
    property: 'T2 Chiado',
    uploadedAt: '2018-05-20',
    size: '3.5 MB',
    status: 'signed',
  },
];

const typeLabels: Record<string, string> = {
  lease: 'Contratos',
  certificate: 'Certificados',
  license: 'Licenças',
  insurance: 'Seguros',
  property: 'Propriedade',
};

const typeIcons: Record<string, any> = {
  lease: FileSignature,
  certificate: CheckCircle2,
  license: Scale,
  insurance: Shield,
  property: Building,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  signed: 'Válido',
  expiring: 'A Expirar',
  expired: 'Expirado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  signed: 'success',
  expiring: 'warning',
  expired: 'destructive',
};

export function OwnerDocuments() {
  const documentsByType = {
    all: mockDocuments,
    lease: mockDocuments.filter(d => d.type === 'lease'),
    certificate: mockDocuments.filter(d => d.type === 'certificate'),
    license: mockDocuments.filter(d => d.type === 'license'),
    insurance: mockDocuments.filter(d => d.type === 'insurance'),
    property: mockDocuments.filter(d => d.type === 'property'),
  };

  const expiringDocs = mockDocuments.filter(d => d.status === 'expiring');
  const pendingDocs = mockDocuments.filter(d => d.status === 'pending');

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Contratos, licenças e documentação das suas propriedades
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Carregar Documento
        </Button>
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
                <FileSignature className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'lease').length}
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
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{pendingDocs.length}</p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{expiringDocs.length}</p>
                <p className="text-sm text-muted-foreground">A Expirar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(expiringDocs.length > 0 || pendingDocs.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {expiringDocs.length > 0 && (
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium">Documentos a Expirar</p>
                      <p className="text-sm text-muted-foreground">
                        {expiringDocs.length} documento(s) próximo(s) da data de validade
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {pendingDocs.length > 0 && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Assinaturas Pendentes</p>
                      <p className="text-sm text-muted-foreground">
                        {pendingDocs.length} documento(s) aguardando assinatura
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="lease">Contratos</TabsTrigger>
              <TabsTrigger value="certificate">Certificados</TabsTrigger>
              <TabsTrigger value="license">Licenças</TabsTrigger>
              <TabsTrigger value="insurance">Seguros</TabsTrigger>
              <TabsTrigger value="property">Propriedade</TabsTrigger>
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
                              <span>{doc.property}</span>
                              {'tenant' in doc && (
                                <>
                                  <span>•</span>
                                  <span>{doc.tenant}</span>
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
                            <Button size="sm">Enviar para Assinatura</Button>
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
                              <DropdownMenuItem>Partilhar</DropdownMenuItem>
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
