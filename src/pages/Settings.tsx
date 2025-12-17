import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { TenantSettings } from '@/components/settings/TenantSettings';
import { OwnerSettings } from '@/components/settings/OwnerSettings';
import { AgentSettings } from '@/components/settings/AgentSettings';
import { ManagerSettings } from '@/components/settings/ManagerSettings';
import { CondoCompanySettings } from '@/components/settings/CondoCompanySettings';
import { VendorSettings } from '@/components/settings/VendorSettings';
import { GovernmentSettings } from '@/components/settings/GovernmentSettings';

export default function Settings() {
  const { user } = useAuth();

  const renderSettingsContent = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantSettings user={user} />;
      case 'owner':
        return <OwnerSettings user={user} />;
      case 'agent':
        return <AgentSettings user={user} />;
      case 'manager':
        return <ManagerSettings user={user} />;
      case 'condo_company':
        return <CondoCompanySettings user={user} />;
      case 'vendor':
        return <VendorSettings user={user} />;
      case 'government':
        return <GovernmentSettings user={user} />;
      default:
        return <TenantSettings user={user} />;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl">
        {renderSettingsContent()}
      </div>
    </AppLayout>
  );
}
