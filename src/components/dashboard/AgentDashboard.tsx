import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockProperties, mockPayments, mockUsers } from '@/lib/mock-data';
import { User } from '@/types';
import {
  Building2,
  Users,
  TrendingUp,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Euro,
  Target,
  Handshake,
  Phone,
  Mail,
  Eye,
  Star,
  MapPin,
  BarChart3,
  UserPlus,
  Briefcase,
  Award,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const commissionsData = [
  { month: 'Jul', value: 1200 },
  { month: 'Ago', value: 1800 },
  { month: 'Set', value: 1400 },
  { month: 'Out', value: 2200 },
  { month: 'Nov', value: 1900 },
  { month: 'Dez', value: 2400 },
];

const leadsData = [
  { month: 'Jul', new: 12, converted: 4 },
  { month: 'Ago', new: 18, converted: 6 },
  { month: 'Set', new: 15, converted: 5 },
  { month: 'Out', new: 22, converted: 8 },
  { month: 'Nov', new: 19, converted: 7 },
  { month: 'Dez', new: 25, converted: 9 },
];

// Mock leads/clients data
const mockLeads = [
  { id: '1', name: 'Ana Costa', email: 'ana@email.com', phone: '+351 912 345 678', status: 'hot', interest: 'T2 Lisboa', lastContact: '2024-12-15' },
  { id: '2', name: 'Pedro Santos', email: 'pedro@email.com', phone: '+351 923 456 789', status: 'warm', interest: 'Moradia Porto', lastContact: '2024-12-14' },
  { id: '3', name: 'Maria Silva', email: 'maria@email.com', phone: '+351 934 567 890', status: 'cold', interest: 'T3 Cascais', lastContact: '2024-12-10' },
  { id: '4', name: 'João Ferreira', email: 'joao@email.com', phone: '+351 945 678 901', status: 'hot', interest: 'T1 Alfama', lastContact: '2024-12-16' },
];

// Mock transactions
const mockTransactions = [
  { id: '1', property: 'Apartamento T2 Chiado', client: 'Ana Costa', type: 'Arrendamento', value: 1200, commission: 1200, status: 'completed', date: '2024-12-10' },
  { id: '2', property: 'Moradia V3 Cascais', client: 'Pedro Santos', type: 'Venda', value: 450000, commission: 13500, status: 'pending', date: '2024-12-15' },
  { id: '3', property: 'T1 Alfama', client: 'Maria Silva', type: 'Arrendamento', value: 850, commission: 850, status: 'in-progress', date: '2024-12-12' },
];

const leadStatusColors: Record<string, 'destructive' | 'warning' | 'secondary'> = {
  hot: 'destructive',
  warm: 'warning',
  cold: 'secondary',
};

const leadStatusLabels: Record<string, string> = {
  hot: 'Quente',
  warm: 'Morno',
  cold: 'Frio',
};

interface AgentDashboardProps {
  user: User;
}

export function AgentDashboard({ user }: AgentDashboardProps) {
  // Agent metrics
  const activeListings = mockProperties.filter(p => p.status === 'available').length;
  const totalListings = mockProperties.length;
  const occupiedListings = mockProperties.filter(p => p.status === 'occupied').length;
  
  // Commission calculations
  const totalCommissions = commissionsData.reduce((acc, c) => acc + c.value, 0);
  const monthlyTarget = 2500;
  const currentMonthCommission = commissionsData[commissionsData.length - 1].value;
  const targetProgress = Math.min((currentMonthCommission / monthlyTarget) * 100, 100);
  
  // Leads metrics
  const totalLeads = mockLeads.length;
  const hotLeads = mockLeads.filter(l => l.status === 'hot').length;
  
  // Transactions
  const completedTransactions = mockTransactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = mockTransactions.filter(t => t.status === 'pending' || t.status === 'in-progress').length;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Painel do agente imobiliário
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
          <Link to="/properties/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Imóvel
            </Button>
          </Link>
        </div>
      </div>

      {/* Performance Banner */}
      <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Meta Mensal de Comissões</p>
                <p className="text-sm text-muted-foreground">
                  €{currentMonthCommission.toLocaleString()} de €{monthlyTarget.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48">
                <Progress value={targetProgress} className="h-3" />
              </div>
              <span className="font-display font-bold text-lg text-primary">
                {Math.round(targetProgress)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Imóveis Ativos</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {activeListings}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              de {totalListings} no portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Euro className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Comissões (Ano)</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{totalCommissions.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">+18%</span>
              <span className="text-sm text-muted-foreground">vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Leads Ativos</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {totalLeads}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {hotLeads} leads quentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Handshake className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Negócios</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {completedTransactions}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {pendingTransactions} em curso
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Commissions Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Evolução de Comissões</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </div>
              <Link to="/reports">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatórios
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={commissionsData}>
                  <defs>
                    <linearGradient id="colorAgentCommission" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `€${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, 'Comissão']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAgentCommission)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leads Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pipeline de Leads</CardTitle>
            <CardDescription>Conversão este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsData.slice(-3)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="month" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="new" fill="hsl(var(--muted))" name="Novos" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="converted" fill="hsl(var(--primary))" name="Convertidos" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="font-display text-2xl font-bold">39%</p>
                <p className="text-xs text-muted-foreground">Taxa Conversão</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">{hotLeads}</p>
                <p className="text-xs text-muted-foreground">Leads Quentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Leads */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Leads Recentes</CardTitle>
              <CardDescription>Contactos a acompanhar</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Lead
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{lead.name}</h4>
                      <Badge variant={leadStatusColors[lead.status]} className="text-xs">
                        {leadStatusLabels[lead.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interesse: {lead.interest}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      Último contacto: {new Date(lead.lastContact).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/properties/new" className="block">
              <Button className="w-full justify-start h-11" variant="default">
                <Plus className="h-4 w-4 mr-3" />
                Adicionar Imóvel
              </Button>
            </Link>
            <Button className="w-full justify-start h-11" variant="outline">
              <UserPlus className="h-4 w-4 mr-3" />
              Registar Lead
            </Button>
            <Link to="/properties" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <Building2 className="h-4 w-4 mr-3" />
                Gerir Imóveis
              </Button>
            </Link>
            <Link to="/messages" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <MessageSquare className="h-4 w-4 mr-3" />
                Mensagens
              </Button>
            </Link>
            <Link to="/documents" className="block">
              <Button className="w-full justify-start h-11" variant="outline">
                <FileText className="h-4 w-4 mr-3" />
                Contratos
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Negócios e comissões</CardDescription>
            </div>
            <Link to="/payments">
              <Button variant="ghost" size="sm">
                Ver Todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.status === 'completed' ? 'bg-success/10' : 
                      transaction.status === 'pending' ? 'bg-warning/10' : 'bg-primary/10'
                    }`}>
                      {transaction.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : transaction.status === 'pending' ? (
                        <Clock className="h-4 w-4 text-warning" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.property}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.client} • {transaction.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-primary">
                      €{transaction.commission.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">comissão</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Imóveis em Destaque</CardTitle>
              <CardDescription>Mais visualizados</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProperties.filter(p => p.status === 'available').slice(0, 3).map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`} className="block">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{property.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-sm">€{property.price}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        124
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <Link to="/properties">
                <Button variant="ghost" className="w-full mt-2">
                  Ver Todos os Imóveis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
