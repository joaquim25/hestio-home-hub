import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Building,
  Users,
  AlertCircle,
  CheckCircle,
  Filter,
  Home,
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

const mockResidents = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+351 912 345 678',
    unit: 'Fração A - 1º Esq',
    type: 'owner',
    status: 'active',
    quotaStatus: 'paid',
    since: '2020-03-15',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+351 923 456 789',
    unit: 'Fração B - 2º Dto',
    type: 'tenant',
    owner: 'Carlos Mendes',
    status: 'active',
    quotaStatus: 'paid',
    since: '2023-06-01',
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+351 934 567 890',
    unit: 'Fração C - 3º Esq',
    type: 'owner',
    status: 'active',
    quotaStatus: 'overdue',
    since: '2019-01-10',
  },
  {
    id: '4',
    name: 'Pedro Ferreira',
    email: 'pedro.ferreira@email.com',
    phone: '+351 945 678 901',
    unit: 'Fração D - R/C',
    type: 'owner',
    status: 'inactive',
    quotaStatus: 'paid',
    since: '2021-08-20',
  },
  {
    id: '5',
    name: 'Sofia Martins',
    email: 'sofia.martins@email.com',
    phone: '+351 956 789 012',
    unit: 'Fração E - 4º Dto',
    type: 'tenant',
    owner: 'António Rodrigues',
    status: 'active',
    quotaStatus: 'pending',
    since: '2024-01-15',
  },
];

const typeLabels: Record<string, string> = {
  owner: 'Proprietário',
  tenant: 'Inquilino',
};

const quotaLabels: Record<string, string> = {
  paid: 'Em Dia',
  pending: 'Pendente',
  overdue: 'Em Atraso',
};

const quotaVariants: Record<string, 'success' | 'warning' | 'destructive'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
};

export function ManagerClients() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredResidents = activeTab === 'all' 
    ? mockResidents 
    : mockResidents.filter(r => r.type === activeTab || r.quotaStatus === activeTab);

  const totalOwners = mockResidents.filter(r => r.type === 'owner').length;
  const totalTenants = mockResidents.filter(r => r.type === 'tenant').length;
  const overdueCount = mockResidents.filter(r => r.quotaStatus === 'overdue').length;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Condóminos</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de proprietários e inquilinos do edifício
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Condómino
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{mockResidents.length}</p>
                <p className="text-sm text-muted-foreground">Total Residentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Home className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalOwners}</p>
                <p className="text-sm text-muted-foreground">Proprietários</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Building className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalTenants}</p>
                <p className="text-sm text-muted-foreground">Inquilinos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Quotas em Atraso</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Residents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Condóminos</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar condóminos..." className="pl-10" />
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
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="owner">Proprietários</TabsTrigger>
              <TabsTrigger value="tenant">Inquilinos</TabsTrigger>
              <TabsTrigger value="overdue">Em Atraso</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Residente</TableHead>
                    <TableHead>Fração</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quotas</TableHead>
                    <TableHead>Desde</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResidents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {resident.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{resident.name}</p>
                            <p className="text-xs text-muted-foreground">{resident.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{resident.unit}</p>
                          {'owner' in resident && resident.owner && (
                            <p className="text-xs text-muted-foreground">Prop: {resident.owner}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{typeLabels[resident.type]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={quotaVariants[resident.quotaStatus]}>
                          {resident.quotaStatus === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {resident.quotaStatus === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {quotaLabels[resident.quotaStatus]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(resident.since).toLocaleDateString('pt-PT')}
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
                              <Phone className="h-4 w-4 mr-2" />
                              Ligar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Enviar Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>Ver Perfil Completo</DropdownMenuItem>
                            <DropdownMenuItem>Ver Histórico de Pagamentos</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
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
