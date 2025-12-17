import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { TenantDashboard } from '@/components/dashboard/TenantDashboard';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { AgentDashboard } from '@/components/dashboard/AgentDashboard';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
import { CondoCompanyDashboard } from '@/components/dashboard/CondoCompanyDashboard';
import { VendorDashboard } from '@/components/dashboard/VendorDashboard';
import { GovernmentDashboard } from '@/components/dashboard/GovernmentDashboard';
import { Card, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  const { user } = useAuth();

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantDashboard user={user} />;
      case 'owner':
        return <OwnerDashboard user={user} />;
      case 'agent':
        return <AgentDashboard user={user} />;
      case 'manager':
        return <ManagerDashboard user={user} />;
      case 'condo_company':
        return <CondoCompanyDashboard user={user} />;
      case 'vendor':
        return <VendorDashboard user={user} />;
      case 'government':
        return <GovernmentDashboard user={user} />;
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Selecione um perfil no menu para aceder ao dashboard correspondente.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <AppLayout>
      {getDashboardContent()}
    </AppLayout>
  );
}
