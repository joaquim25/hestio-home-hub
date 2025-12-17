import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties, mockPayments, mockMaintenanceRequests } from '@/lib/mock-data';
import { User } from '@/types';
import {
  Home,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  Calendar,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Search,
  Bell,
  Receipt,
  Shield,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const paymentHistory = [
  { month: 'Jul', value: 850, status: 'paid' },
  { month: 'Ago', value: 850, status: 'paid' },
  { month: 'Set', value: 850, status: 'paid' },
  { month: 'Out', value: 850, status: 'paid' },
  { month: 'Nov', value: 850, status: 'paid' },
  { month: 'Dez', value: 850, status: 'pending' },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'secondary'> = {
  pending: 'warning',
  'in-progress': 'secondary',
  completed: 'success',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

interface TenantDashboardProps {
  user: User;
}

export function TenantDashboard({ user }: TenantDashboardProps) {
  const currentProperty = mockProperties.find(p => p.tenantId === '1');
  const userPayments = mockPayments.filter(p => p.tenantId === '1');
  const userMaintenanceRequests = mockMaintenanceRequests.filter(m => m.tenantId === '1');
  
  const nextPayment = userPayments.find(p => p.status === 'pending');
  const overduePayments = userPayments.filter(p => p.status === 'overdue');
  const openMaintenanceCount = userMaintenanceRequests.filter(m => m.status !== 'completed').length;
  
  // Calculate days until next payment
  const daysUntilPayment = nextPayment 
    ? Math.ceil((new Date(nextPayment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Olá, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo ao seu espaço de inquilino
        </p>
      </div>

      {/* Alert Banner for Overdue/Upcoming Payment */}
      {(overduePayments.length > 0 || (daysUntilPayment > 0 && daysUntilPayment <= 5)) && (
        <Card className={`mb-6 border-l-4 ${overduePayments.length > 0 ? 'border-l-destructive bg-destructive/5' : 'border-l-warning bg-warning/5'}`}>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {overduePayments.length > 0 ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <Bell className="h-5 w-5 text-warning" />
                )}
                <div>
                  <p className="font-medium">
                    {overduePayments.length > 0 
                      ? `Tem ${overduePayments.length} pagamento(s) em atraso`
                      : `A sua renda vence em ${daysUntilPayment} dias`
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {overduePayments.length > 0 
                      ? 'Por favor regularize a situação o mais breve possível.'
                      : 'Certifique-se de efetuar o pagamento atempadamente.'
                    }
                  </p>
                </div>
              </div>
              <Button size="sm" variant={overduePayments.length > 0 ? 'destructive' : 'default'}>
                <CreditCard className="h-4 w-4 mr-2" />
                Pagar Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Next Payment Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-8 -mt-8" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Próxima Renda</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              €{nextPayment?.amount || currentProperty?.price || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {nextPayment 
                ? `Vence ${new Date(nextPayment.dueDate).toLocaleDateString('pt-PT')}`
                : 'Sem pagamentos pendentes'
              }
            </p>
            {daysUntilPayment > 0 && daysUntilPayment <= 30 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Tempo restante</span>
                  <span className="font-medium">{daysUntilPayment} dias</span>
                </div>
                <Progress value={100 - (daysUntilPayment / 30) * 100} className="h-1.5" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Maintenance Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Wrench className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Manutenção</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {openMaintenanceCount}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {openMaintenanceCount === 1 ? 'Pedido em aberto' : 'Pedidos em aberto'}
            </p>
            {openMaintenanceCount > 0 && (
              <Link to="/maintenance">
                <Button variant="link" className="px-0 h-auto mt-2 text-primary">
                  Ver estado <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Documents Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <FileText className="h-5 w-5 text-secondary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Documentos</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground mt-1">Contrato ativo até Dez 2025</p>
            <Link to="/documents">
              <Button variant="link" className="px-0 h-auto mt-2 text-primary">
                Ver documentos <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-muted">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Mensagens</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">2</p>
            <p className="text-sm text-muted-foreground mt-1">Não lidas</p>
            <Link to="/messages">
              <Button variant="link" className="px-0 h-auto mt-2 text-primary">
                Ver mensagens <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Property - Large Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  A Minha Casa
                </CardTitle>
                <CardDescription>Detalhes do seu arrendamento atual</CardDescription>
              </div>
              <Badge variant="success" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Contrato Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {currentProperty ? (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img
                    src={currentProperty.images[0]}
                    alt={currentProperty.title}
                    className="w-full md:w-56 h-40 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{currentProperty.title}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {currentProperty.address}, {currentProperty.city}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.bedrooms} quartos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.bathrooms} WC</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.area} m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Renda Mensal</p>
                      <p className="font-display text-2xl font-bold text-primary">
                        €{currentProperty.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/properties/${currentProperty.id}`}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contactar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sem imóvel associado</h3>
                <p className="text-muted-foreground mb-4">
                  Procure o seu próximo lar na nossa plataforma.
                </p>
                <Link to="/properties">
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Procurar Imóveis
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            <CardDescription>O que pretende fazer?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12" variant="default">
              <CreditCard className="h-4 w-4 mr-3" />
              <div className="text-left">
                <p className="font-medium">Pagar Renda</p>
                <p className="text-xs opacity-80">Pagamento rápido e seguro</p>
              </div>
            </Button>
            <Link to="/maintenance" className="block">
              <Button className="w-full justify-start h-12" variant="outline">
                <Wrench className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Reportar Problema</p>
                  <p className="text-xs text-muted-foreground">Submeter pedido de manutenção</p>
                </div>
              </Button>
            </Link>
            <Link to="/documents" className="block">
              <Button className="w-full justify-start h-12" variant="outline">
                <FileText className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Ver Contrato</p>
                  <p className="text-xs text-muted-foreground">Consultar documentos</p>
                </div>
              </Button>
            </Link>
            <Link to="/payments" className="block">
              <Button className="w-full justify-start h-12" variant="outline">
                <Receipt className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Ver Recibos</p>
                  <p className="text-xs text-muted-foreground">Histórico de pagamentos</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Payment History Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Rendas</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={paymentHistory}>
                  <defs>
                    <linearGradient id="colorTenantPayment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`€${value}`, 'Renda']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorTenantPayment)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm">5 pagos</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm">1 pendente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pedidos de Manutenção</CardTitle>
              <CardDescription>Acompanhe o estado dos seus pedidos</CardDescription>
            </div>
            <Link to="/maintenance">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {userMaintenanceRequests.length > 0 ? (
              <div className="space-y-3">
                {userMaintenanceRequests.slice(0, 3).map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-background">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{request.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground capitalize">
                            {request.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={statusColors[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                ))}
                {userMaintenanceRequests.length > 3 && (
                  <Link to="/maintenance" className="block">
                    <Button variant="ghost" className="w-full">
                      Ver todos os {userMaintenanceRequests.length} pedidos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                <p className="font-medium">Tudo em ordem!</p>
                <p className="text-sm text-muted-foreground">
                  Não tem pedidos de manutenção pendentes.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Landlord Contact Info */}
      {currentProperty && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Contacto do Senhorio</CardTitle>
            <CardDescription>Para questões urgentes ou esclarecimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 flex-1 p-4 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-background">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-medium">+351 912 345 678</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 p-4 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-background">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">senhorio@email.com</p>
                </div>
              </div>
              <Button className="sm:self-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
