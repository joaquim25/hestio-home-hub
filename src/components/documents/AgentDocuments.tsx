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
  Users,
  Building,
  Briefcase,
  FileCheck,
  Send,
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
    client: 'João Silva',
    owner: 'António Ferreira',
    uploadedAt: '2024-06-15',
    size: '2.4 MB',
    status: 'signed',
  },
  {
    id: '2',
    name: 'Contrato de Mediação - T3 Cascais',
    type: 'mediation',
    property: 'T3 Cascais',
    owner: 'Maria Santos',
    uploadedAt: '2024-10-01',
    expiresAt: '2025-04-01',
    size: '1.8 MB',
    status: 'signed',
  },
  {
    id: '3',
    name: 'Proposta de Arrendamento - T1 Alfama',
    type: 'proposal',
    property: 'T1 Alfama',
    client: 'Pedro Costa',
    uploadedAt: '2024-12-10',
    size: '456 KB',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Ficha Técnica - T2 Chiado',
    type: 'listing',
    property: 'T2 Chiado',
    uploadedAt: '2024-06-01',
    size: '3.2 MB',
    status: 'signed',
  },
  {
    id: '5',
    name: 'Contrato de Mediação - T2 Sintra',
    type: 'mediation',
    property: 'T2 Sintra',
    owner: 'Carlos Mendes',
    uploadedAt: '2024-11-15',
    size: '1.9 MB',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Relatório de Avaliação - T3 Cascais',
    type: 'valuation',
    property: 'T3 Cascais',
    uploadedAt: '2024-09-20',
    size: '2.1 MB',
    status: 'signed',
  },
  {
    id: '7',
    name: 'Documentação Cliente - João Silva',
    type: 'client',
    client: 'João Silva',
    uploadedAt: '2024-06-10',
    size: '5.4 MB',
    status: 'signed',
  },
];

const typeLabels: Record<string, string> = {
  lease: 'Contratos',
  mediation: 'Mediação',
  proposal: 'Propostas',
  listing: 'Fichas',
  valuation: 'Avaliações',
  client: 'Clientes',
};

const typeIcons: Record<string, any> = {
  lease: FileSignature,
  mediation: Briefcase,
  proposal: Send,
  listing: Building,
  valuation: FileCheck,
  client: Users,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  signed: 'Assinado',
  sent: 'Enviado',
  rejected: 'Rejeitado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  signed: 'success',
  sent: 'secondary',
  rejected: 'destructive',
};

export function AgentDocuments() {
  const documentsByType = {
    all: mockDocuments,
    lease: mockDocuments.filter(d => d.type === 'lease'),
    mediation: mockDocuments.filter(d => d.type === 'mediation'),
    proposal: mockDocuments.filter(d => d.type === 'proposal'),
    listing: mockDocuments.filter(d => d.type === 'listing'),
    valuation: mockDocuments.filter(d => d.type === 'valuation'),
    client: mockDocuments.filter(d => d.type === 'client'),
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Contratos de mediação, propostas e documentação de clientes
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
                <Briefcase className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'mediation').length}
                </p>
                <p className="text-sm text-muted-foreground">Contratos Mediação</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/15">
                <Send className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'proposal').length}
                </p>
                <p className="text-sm text-muted-foreground">Propostas Ativas</p>
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
                  {mockDocuments.filter(d => d.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Documents Alert */}
      {mockDocuments.filter(d => d.status === 'pending').length > 0 && (
        <Card className="mb-8 border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Documentos Pendentes</p>
                  <p className="text-sm text-muted-foreground">
                    {mockDocuments.filter(d => d.status === 'pending').length} documento(s) aguardando ação
                  </p>
                </div>
              </div>
              <Button variant="outline">Ver Pendentes</Button>
            </div>
          </CardContent>
        </Card>
      )}

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
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="lease">Contratos</TabsTrigger>
              <TabsTrigger value="mediation">Mediação</TabsTrigger>
              <TabsTrigger value="proposal">Propostas</TabsTrigger>
              <TabsTrigger value="listing">Fichas</TabsTrigger>
              <TabsTrigger value="client">Clientes</TabsTrigger>
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
                              {'property' in doc && <span>{doc.property}</span>}
                              {'client' in doc && (
                                <>
                                  {('property' in doc) && <span>•</span>}
                                  <span>Cliente: {doc.client}</span>
                                </>
                              )}
                              {'owner' in doc && (
                                <>
                                  <span>•</span>
                                  <span>Proprietário: {doc.owner}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}</span>
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
