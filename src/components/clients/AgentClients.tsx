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
  Calendar,
  Star,
  Users,
  TrendingUp,
  Filter,
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

const mockClients = [
  {
    id: '1',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+351 912 345 678',
    type: 'owner',
    status: 'active',
    properties: 3,
    since: '2022-03-15',
    lastContact: '2024-12-10',
    revenue: 4500,
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+351 923 456 789',
    type: 'buyer',
    status: 'active',
    properties: 0,
    since: '2024-11-01',
    lastContact: '2024-12-15',
    revenue: 0,
    interested: 'T2 Chiado, T3 Cascais',
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+351 934 567 890',
    type: 'tenant',
    status: 'lead',
    properties: 0,
    since: '2024-12-01',
    lastContact: '2024-12-12',
    revenue: 0,
    interested: 'T1 Alfama',
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '+351 945 678 901',
    type: 'owner',
    status: 'inactive',
    properties: 1,
    since: '2021-06-20',
    lastContact: '2024-09-05',
    revenue: 1200,
  },
  {
    id: '5',
    name: 'Pedro Ferreira',
    email: 'pedro.ferreira@email.com',
    phone: '+351 956 789 012',
    type: 'buyer',
    status: 'active',
    properties: 0,
    since: '2024-10-15',
    lastContact: '2024-12-14',
    revenue: 0,
    interested: 'Moradia Sintra',
  },
];

const typeLabels: Record<string, string> = {
  owner: 'Proprietário',
  buyer: 'Comprador',
  tenant: 'Inquilino',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  lead: 'Lead',
};

const statusVariants: Record<string, 'success' | 'secondary' | 'warning'> = {
  active: 'success',
  inactive: 'secondary',
  lead: 'warning',
};

export function AgentClients() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredClients = activeTab === 'all' 
    ? mockClients 
    : mockClients.filter(c => c.type === activeTab || c.status === activeTab);

  const totalRevenue = mockClients.reduce((acc, c) => acc + c.revenue, 0);
  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const totalLeads = mockClients.filter(c => c.status === 'lead').length;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de proprietários, compradores e leads
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
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
                <p className="text-2xl font-bold font-display">{mockClients.length}</p>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Star className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{activeClients}</p>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalLeads}</p>
                <p className="text-sm text-muted-foreground">Leads</p>
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
                <p className="text-2xl font-bold font-display">€{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Comissões Geradas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar clientes..." className="pl-10" />
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
              <TabsTrigger value="buyer">Compradores</TabsTrigger>
              <TabsTrigger value="tenant">Inquilinos</TabsTrigger>
              <TabsTrigger value="lead">Leads</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Propriedades</TableHead>
                    <TableHead>Último Contacto</TableHead>
                    <TableHead>Comissões</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {client.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{typeLabels[client.type]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[client.status]}>
                          {statusLabels[client.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.properties}</TableCell>
                      <TableCell>
                        {new Date(client.lastContact).toLocaleDateString('pt-PT')}
                      </TableCell>
                      <TableCell>€{client.revenue.toLocaleString()}</TableCell>
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
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Agendar Reunião
                            </DropdownMenuItem>
                            <DropdownMenuItem>Ver Perfil Completo</DropdownMenuItem>
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
