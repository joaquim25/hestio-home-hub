import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  FileText,
  Upload,
  Download,
  Search,
  FileSignature,
  Clock,
  MoreVertical,
  Home,
  Receipt,
  Shield,
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
    uploadedAt: '2024-06-15',
    expiresAt: '2025-06-15',
    size: '2.4 MB',
    status: 'signed',
  },
  {
    id: '2',
    name: 'Comprovativo de Renda - Dezembro 2024',
    type: 'receipt',
    property: 'T2 Chiado',
    uploadedAt: '2024-12-01',
    size: '156 KB',
    status: 'signed',
  },
  {
    id: '3',
    name: 'Comprovativo de Renda - Novembro 2024',
    type: 'receipt',
    property: 'T2 Chiado',
    uploadedAt: '2024-11-01',
    size: '152 KB',
    status: 'signed',
  },
  {
    id: '4',
    name: 'Seguro de Conteúdos',
    type: 'insurance',
    property: 'T2 Chiado',
    uploadedAt: '2024-07-20',
    expiresAt: '2025-07-20',
    size: '890 KB',
    status: 'signed',
  },
  {
    id: '5',
    name: 'Aditamento Contratual - Renovação',
    type: 'lease',
    property: 'T2 Chiado',
    uploadedAt: '2024-11-15',
    size: '456 KB',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Relatório de Entrada',
    type: 'inspection',
    property: 'T2 Chiado',
    uploadedAt: '2024-06-15',
    size: '3.1 MB',
    status: 'signed',
  },
];

const typeLabels: Record<string, string> = {
  lease: 'Contratos',
  receipt: 'Recibos',
  insurance: 'Seguros',
  inspection: 'Vistorias',
};

const typeIcons: Record<string, any> = {
  lease: FileSignature,
  receipt: Receipt,
  insurance: Shield,
  inspection: Home,
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente Assinatura',
  signed: 'Assinado',
  expired: 'Expirado',
};

const statusVariants: Record<string, 'warning' | 'success' | 'destructive'> = {
  pending: 'warning',
  signed: 'success',
  expired: 'destructive',
};

export function TenantDocuments() {
  const documentsByType = {
    all: mockDocuments,
    lease: mockDocuments.filter(d => d.type === 'lease'),
    receipt: mockDocuments.filter(d => d.type === 'receipt'),
    insurance: mockDocuments.filter(d => d.type === 'insurance'),
    inspection: mockDocuments.filter(d => d.type === 'inspection'),
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Os Meus Documentos</h1>
          <p className="text-muted-foreground mt-1">
            Contratos, recibos e documentação do seu arrendamento
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Carregar Documento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Documentos"
          value={mockDocuments.length}
          icon={FileText}
        />
        <MetricCard
          title="Contratos"
          value={mockDocuments.filter(d => d.type === 'lease').length}
          icon={FileSignature}
        />
        <MetricCard
          title="Recibos"
          value={mockDocuments.filter(d => d.type === 'receipt').length}
          icon={Receipt}
        />
        <MetricCard
          title="Pendentes"
          value={mockDocuments.filter(d => d.status === 'pending').length}
          icon={Clock}
        />
      </div>

      {/* Pending Signatures Alert */}
      {mockDocuments.filter(d => d.status === 'pending').length > 0 && (
        <Card className="glass-card border-warning/50 bg-gradient-to-r from-warning/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Documentos Pendentes de Assinatura</p>
                  <p className="text-sm text-muted-foreground">
                    Tem {mockDocuments.filter(d => d.status === 'pending').length} documento(s) aguardando a sua assinatura
                  </p>
                </div>
              </div>
              <Button variant="outline">Ver Pendentes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
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
              <TabsTrigger value="receipt">Recibos</TabsTrigger>
              <TabsTrigger value="insurance">Seguros</TabsTrigger>
              <TabsTrigger value="inspection">Vistorias</TabsTrigger>
            </TabsList>

            {Object.entries(documentsByType).map(([type, docs]) => (
              <TabsContent key={type} value={type}>
                <div className="space-y-3">
                  {docs.map((doc) => {
                    const TypeIcon = typeIcons[doc.type];
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-muted/50">
                            <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{doc.property}</span>
                              <span>•</span>
                              <span>{new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={statusVariants[doc.status]}>
                            {statusLabels[doc.status]}
                          </Badge>
                          {doc.status === 'pending' && (
                            <Button size="sm">Assinar</Button>
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
    </div>
  );
}
