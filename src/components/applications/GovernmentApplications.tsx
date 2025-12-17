import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  MoreVertical,
  Phone,
  Mail,
  FileText,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Eye,
  Download,
  Calendar,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const mockApplications = [
  {
    id: 'CAND-2024-1234',
    applicant: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+351 912 345 678',
    district: 'Lisboa',
    submittedAt: '2024-11-20',
    status: 'pending',
    householdSize: 4,
    income: 850,
    priority: 'high',
    priorityReason: 'Família numerosa',
    documents: 8,
    documentsComplete: true,
  },
  {
    id: 'CAND-2024-1235',
    applicant: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+351 923 456 789',
    district: 'Porto',
    submittedAt: '2024-11-25',
    status: 'review',
    householdSize: 2,
    income: 1100,
    priority: 'medium',
    priorityReason: 'Idosos',
    documents: 6,
    documentsComplete: false,
  },
  {
    id: 'CAND-2024-1236',
    applicant: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+351 934 567 890',
    district: 'Lisboa',
    submittedAt: '2024-11-28',
    status: 'approved',
    householdSize: 3,
    income: 950,
    priority: 'high',
    priorityReason: 'Vítima de violência',
    documents: 10,
    documentsComplete: true,
    allocatedProperty: 'Bloco A - Marvila',
  },
  {
    id: 'CAND-2024-1237',
    applicant: 'Pedro Ferreira',
    email: 'pedro.ferreira@email.com',
    phone: '+351 945 678 901',
    district: 'Faro',
    submittedAt: '2024-12-01',
    status: 'rejected',
    householdSize: 1,
    income: 1600,
    priority: 'low',
    documents: 5,
    documentsComplete: true,
    rejectionReason: 'Rendimento acima do limite',
  },
  {
    id: 'CAND-2024-1238',
    applicant: 'Sofia Martins',
    email: 'sofia.martins@email.com',
    phone: '+351 956 789 012',
    district: 'Lisboa',
    submittedAt: '2024-12-05',
    status: 'pending',
    householdSize: 5,
    income: 780,
    priority: 'high',
    priorityReason: 'Família numerosa + deficiência',
    documents: 7,
    documentsComplete: false,
  },
];

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  review: 'Em Análise',
  approved: 'Aprovada',
  rejected: 'Rejeitada',
  waitlist: 'Lista de Espera',
};

const statusVariants: Record<string, 'warning' | 'secondary' | 'success' | 'destructive'> = {
  pending: 'warning',
  review: 'secondary',
  approved: 'success',
  rejected: 'destructive',
  waitlist: 'warning',
};

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
};

const priorityVariants: Record<string, 'destructive' | 'warning' | 'secondary'> = {
  high: 'destructive',
  medium: 'warning',
  low: 'secondary',
};

export function GovernmentApplications() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredApplications = activeTab === 'all' 
    ? mockApplications 
    : mockApplications.filter(a => a.status === activeTab);

  const pendingCount = mockApplications.filter(a => a.status === 'pending').length;
  const reviewCount = mockApplications.filter(a => a.status === 'review').length;
  const approvedCount = mockApplications.filter(a => a.status === 'approved').length;
  const totalCount = mockApplications.length;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Candidaturas</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de candidaturas a habitação social
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
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
                <p className="text-2xl font-bold font-display">{totalCount}</p>
                <p className="text-sm text-muted-foreground">Total Candidaturas</p>
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
                <p className="text-2xl font-bold font-display">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <AlertCircle className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{reviewCount}</p>
                <p className="text-sm text-muted-foreground">Em Análise</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">Taxa de Processamento</p>
            <p className="text-sm text-muted-foreground">
              {approvedCount + mockApplications.filter(a => a.status === 'rejected').length} de {totalCount} processadas
            </p>
          </div>
          <Progress 
            value={((approvedCount + mockApplications.filter(a => a.status === 'rejected').length) / totalCount) * 100} 
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Candidaturas</CardTitle>
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
                <Input placeholder="Pesquisar candidaturas..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="review">Em Análise</TabsTrigger>
              <TabsTrigger value="approved">Aprovadas</TabsTrigger>
              <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidatura</TableHead>
                    <TableHead>Candidato</TableHead>
                    <TableHead>Distrito</TableHead>
                    <TableHead>Agregado</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Docs</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium font-mono text-sm">{app.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(app.submittedAt).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {app.applicant.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{app.applicant}</p>
                            <p className="text-xs text-muted-foreground">€{app.income}/mês</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{app.district}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{app.householdSize}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant={priorityVariants[app.priority]}>
                            {priorityLabels[app.priority]}
                          </Badge>
                          {app.priorityReason && (
                            <p className="text-xs text-muted-foreground mt-1">{app.priorityReason}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[app.status]}>
                          {app.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {app.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {statusLabels[app.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className={app.documentsComplete ? 'text-success' : 'text-warning'}>
                            {app.documents}
                          </span>
                          {app.documentsComplete ? (
                            <CheckCircle className="h-3 w-3 text-success" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Ver Documentos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Contactar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Agendar Entrevista
                            </DropdownMenuItem>
                            {app.status === 'pending' && (
                              <DropdownMenuItem>Iniciar Análise</DropdownMenuItem>
                            )}
                            {app.status === 'review' && (
                              <>
                                <DropdownMenuItem className="text-success">Aprovar</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Rejeitar</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
