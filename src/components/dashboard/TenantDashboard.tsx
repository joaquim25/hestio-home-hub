import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProperties, mockPayments, mockMaintenanceRequests } from '@/lib/mock-data';
import { User } from '@/types';
import { MetricCard } from './MetricCard';
import { WelcomeHeader } from './WelcomeHeader';
import { SectionHeader } from './SectionHeader';
import {
  Home,
  CreditCard,
  Wrench,
  FileText,
  MessageSquare,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
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
  { month: 'Jul', value: 850 },
  { month: 'Ago', value: 850 },
  { month: 'Set', value: 850 },
  { month: 'Out', value: 850 },
  { month: 'Nov', value: 850 },
  { month: 'Dez', value: 850 },
];

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

const statusVariants: Record<string, 'warning' | 'default' | 'success'> = {
  pending: 'warning',
  'in-progress': 'default',
  completed: 'success',
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
  
  const daysUntilPayment = nextPayment 
    ? Math.ceil((new Date(nextPayment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-8">
      <WelcomeHeader 
        name={user.name} 
        subtitle="Bem-vindo ao seu espaço de inquilino" 
      />

      {/* Alert Banner */}
      {(overduePayments.length > 0 || (daysUntilPayment > 0 && daysUntilPayment <= 5)) && (
        <div className={`glass-card p-4 rounded-2xl border-l-4 ${overduePayments.length > 0 ? 'border-l-destructive' : 'border-l-warning'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {overduePayments.length > 0 ? (
                <div className="p-2 rounded-xl bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-warning/10">
                  <Bell className="h-5 w-5 text-warning" />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
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
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Próxima Renda"
          value={`€${nextPayment?.amount || currentProperty?.price || 0}`}
          subtitle={nextPayment 
            ? `Vence ${new Date(nextPayment.dueDate).toLocaleDateString('pt-PT')}`
            : 'Sem pagamentos pendentes'
          }
          icon={CreditCard}
          iconColor="primary"
        >
          {daysUntilPayment > 0 && daysUntilPayment <= 30 && (
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Tempo restante</span>
                <span className="font-medium">{daysUntilPayment} dias</span>
              </div>
              <Progress value={100 - (daysUntilPayment / 30) * 100} className="h-1.5" />
            </div>
          )}
        </MetricCard>

        <MetricCard
          title="Manutenção"
          value={openMaintenanceCount}
          subtitle={openMaintenanceCount === 1 ? 'Pedido em aberto' : 'Pedidos em aberto'}
          icon={Wrench}
          iconColor="accent"
        />

        <MetricCard
          title="Documentos"
          value="4"
          subtitle="Contrato ativo até Dez 2025"
          icon={FileText}
          iconColor="muted"
        />

        <MetricCard
          title="Mensagens"
          value="2"
          subtitle="Não lidas"
          icon={MessageSquare}
          iconColor="muted"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Property */}
        <Card className="lg:col-span-2 glass-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-display">
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
                    <h3 className="font-display text-lg font-semibold">{currentProperty.title}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {currentProperty.address}, {currentProperty.city}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full">
                      <BedDouble className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.bedrooms} quartos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.bathrooms} WC</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span>{currentProperty.area} m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Renda Mensal</p>
                      <p className="font-display text-2xl font-semibold text-primary">
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
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">Sem imóvel associado</h3>
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
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg font-display">Ações Rápidas</CardTitle>
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
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg font-display">Histórico de Rendas</CardTitle>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                    formatter={(value: number) => [`€${value}`, 'Renda']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTenantPayment)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
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
        <Card className="lg:col-span-2 glass-card border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-display">Pedidos de Manutenção</CardTitle>
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
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{request.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={statusVariants[request.status]}>
                      {statusLabels[request.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <p className="text-muted-foreground">Não tem pedidos de manutenção</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
