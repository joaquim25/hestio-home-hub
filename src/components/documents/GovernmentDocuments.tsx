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
  Users,
  Building,
  ClipboardCheck,
  AlertTriangle,
  Landmark,
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
    name: 'Regulamento Habitação Social 2024',
    type: 'regulation',
    district: 'Todos',
    uploadedAt: '2024-01-01',
    size: '3.4 MB',
    status: 'active',
  },
  {
    id: '2',
    name: 'Contrato Arrendamento Social - Bairro Olivais',
    type: 'lease',
    district: 'Lisboa',
    tenant: 'Família Silva',
    uploadedAt: '2024-06-15',
    size: '1.8 MB',
    status: 'signed',
  },
  {
    id: '3',
    name: 'Relatório Auditoria Q3 2024',
    type: 'audit',
    district: 'Todos',
    uploadedAt: '2024-10-15',
    size: '5.2 MB',
    status: 'signed',
  },
  {
    id: '4',
    name: 'Candidatura Habitação - Proc. 2024/1234',
    type: 'application',
    district: 'Porto',
    applicant: 'António Costa',
    uploadedAt: '2024-11-20',
    size: '2.1 MB',
    status: 'pending',
  },
  {
    id: '5',
    name: 'Certificado Conformidade - Bloco A Marvila',
    type: 'compliance',
    district: 'Lisboa',
    uploadedAt: '2024-08-10',
    expiresAt: '2029-08-10',
    size: '1.5 MB',
    status: 'active',
  },
  {
    id: '6',
    name: 'Plano Manutenção 2025',
    type: 'plan',
    district: 'Todos',
    uploadedAt: '2024-12-01',
    size: '4.8 MB',
    status: 'pending',
  },
  {
    id: '7',
    name: 'Relatório Ocupação Mensal - Nov 2024',
    type: 'report',
    district: 'Todos',
    uploadedAt: '2024-12-05',
    size: '890 KB',
    status: 'signed',
  },
  {
    id: '8',
    name: 'Protocolo IHRU - Programa Renda Acessível',
    type: 'protocol',
    uploadedAt: '2024-03-15',
    expiresAt: '2026-03-15',
    size: '2.3 MB',
    status: 'active',
  },
];

const typeLabels: Record<string, string> = {
  regulation: 'Regulamentos',
  lease: 'Contratos',
  audit: 'Auditorias',
  application: 'Candidaturas',
  compliance: 'Conformidade',
  plan: 'Planeamento',
  report: 'Relatórios',
  protocol: 'Protocolos',
};

const typeIcons: Record<string, any> = {
  regulation: Scale,
  lease: FileSignature,
  audit: ClipboardCheck,
  application: Users,
  compliance: Shield,
  plan: FileText,
  report: Building,
  protocol: Landmark,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  active: 'Em Vigor',
  signed: 'Aprovado',
  expiring: 'A Expirar',
  rejected: 'Rejeitado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive' | 'secondary'> = {
  pending: 'warning',
  active: 'success',
  signed: 'success',
  expiring: 'warning',
  rejected: 'destructive',
};

export function GovernmentDocuments() {
  const documentsByType = {
    all: mockDocuments,
    regulation: mockDocuments.filter(d => d.type === 'regulation'),
    lease: mockDocuments.filter(d => d.type === 'lease'),
    audit: mockDocuments.filter(d => d.type === 'audit'),
    application: mockDocuments.filter(d => d.type === 'application'),
    compliance: mockDocuments.filter(d => d.type === 'compliance'),
    report: mockDocuments.filter(d => d.type === 'report'),
  };

  const pendingDocs = mockDocuments.filter(d => d.status === 'pending');

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Regulamentos, contratos sociais, auditorias e documentação oficial
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Novo Relatório
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
                <FileSignature className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'lease').length}
                </p>
                <p className="text-sm text-muted-foreground">Contratos Sociais</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {mockDocuments.filter(d => d.type === 'application').length}
                </p>
                <p className="text-sm text-muted-foreground">Candidaturas</p>
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
      </div>

      {/* Pending Alert */}
      {pendingDocs.length > 0 && (
        <Card className="mb-8 border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Documentos Pendentes de Aprovação</p>
                  <p className="text-sm text-muted-foreground">
                    {pendingDocs.length} documento(s) aguardando análise e aprovação
                  </p>
                </div>
              </div>
              <Button variant="outline">Ver Pendentes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Arquivo Documental</CardTitle>
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Distrito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="lisboa">Lisboa</SelectItem>
                  <SelectItem value="porto">Porto</SelectItem>
                  <SelectItem value="faro">Faro</SelectItem>
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
              <TabsTrigger value="regulation">Regulamentos</TabsTrigger>
              <TabsTrigger value="lease">Contratos</TabsTrigger>
              <TabsTrigger value="application">Candidaturas</TabsTrigger>
              <TabsTrigger value="audit">Auditorias</TabsTrigger>
              <TabsTrigger value="compliance">Conformidade</TabsTrigger>
              <TabsTrigger value="report">Relatórios</TabsTrigger>
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
                              {'district' in doc && <span>{doc.district}</span>}
                              {'tenant' in doc && (
                                <>
                                  <span>•</span>
                                  <span>{doc.tenant}</span>
                                </>
                              )}
                              {'applicant' in doc && (
                                <>
                                  <span>•</span>
                                  <span>{doc.applicant}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}</span>
                              {'expiresAt' in doc && (
                                <>
                                  <span>•</span>
                                  <span>Válido até: {new Date(doc.expiresAt as string).toLocaleDateString('pt-PT')}</span>
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
                            <Button size="sm">Analisar</Button>
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
                              <DropdownMenuItem>Aprovar</DropdownMenuItem>
                              <DropdownMenuItem>Rejeitar</DropdownMenuItem>
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
