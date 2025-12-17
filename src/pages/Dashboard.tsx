import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { TenantDashboard } from '@/components/dashboard/TenantDashboard';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { AgentDashboard } from '@/components/dashboard/AgentDashboard';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
import { CondoCompanyDashboard } from '@/components/dashboard/CondoCompanyDashboard';
import { VendorDashboard } from '@/components/dashboard/VendorDashboard';
import { GovernmentDashboard } from '@/components/dashboard/GovernmentDashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProperties, mockPayments, mockMaintenanceRequests } from '@/lib/mock-data';
import { Link, Navigate } from 'react-router-dom';
import {
  Building2,
  CreditCard,
  Wrench,
  TrendingUp,
  Plus,
  MessageSquare,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
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

const revenueData = [
  { month: 'Jul', value: 4200 },
  { month: 'Ago', value: 4800 },
  { month: 'Set', value: 4500 },
  { month: 'Out', value: 5200 },
  { month: 'Nov', value: 4900 },
  { month: 'Dez', value: 5400 },
];

const paymentHistory = [
  { month: 'Jul', value: 1200 },
  { month: 'Ago', value: 1200 },
  { month: 'Set', value: 1200 },
  { month: 'Out', value: 1200 },
  { month: 'Nov', value: 1200 },
  { month: 'Dez', value: 1200 },
];

const statusColors: Record<string, 'success' | 'warning' | 'default' | 'secondary'> = {
  pending: 'warning',
  'in-progress': 'default',
  completed: 'success',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  'in-progress': 'Em Progresso',
  completed: 'Concluído',
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-specific data
  const userProperties = user?.role === 'tenant' 
    ? mockProperties.filter(p => p.tenantId === '1')
    : mockProperties.filter(p => p.ownerId === '2');

  const userPayments = mockPayments.filter(p => 
    user?.role === 'tenant' ? p.tenantId === '1' : true
  );

  const userMaintenanceRequests = mockMaintenanceRequests.filter(m =>
    user?.role === 'tenant' ? m.tenantId === '1' : true
  );

  // Tenant Dashboard
  if (user?.role === 'tenant') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <TenantDashboard user={user} />
      </div>
    );
  }

  // Owner Dashboard
  if (user?.role === 'owner') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <OwnerDashboard user={user} />
      </div>
    );
  }

  // Agent Dashboard
  if (user?.role === 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <AgentDashboard user={user} />
      </div>
    );
  }

  // Condominium Company Dashboard
  if (user?.role === 'condo_company') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CondoCompanyDashboard user={user} />
      </div>
    );
  }

  // Service Provider/Vendor Dashboard
  if (user?.role === 'vendor') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <VendorDashboard user={user} />
      </div>
    );
  }

  // Government Housing Agency Dashboard
  if (user?.role === 'government') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <GovernmentDashboard user={user} />
      </div>
    );
  }

  // Manager Dashboard
  if (user?.role === 'manager') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <ManagerDashboard user={user} />
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Olá, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao Hestio
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Selecione um perfil no menu para aceder ao dashboard correspondente.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
