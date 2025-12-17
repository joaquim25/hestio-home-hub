import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { TenantProperties } from '@/components/properties/TenantProperties';
import { OwnerProperties } from '@/components/properties/OwnerProperties';
import { AgentProperties } from '@/components/properties/AgentProperties';
import { ManagerProperties } from '@/components/properties/ManagerProperties';
import { CondoCompanyProperties } from '@/components/properties/CondoCompanyProperties';
import { VendorProperties } from '@/components/properties/VendorProperties';
import { GovernmentProperties } from '@/components/properties/GovernmentProperties';

export default function Properties() {
  const { user } = useAuth();

  const renderPropertiesView = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantProperties user={user} />;
      case 'owner':
        return <OwnerProperties user={user} />;
      case 'agent':
        return <AgentProperties user={user} />;
      case 'manager':
        return <ManagerProperties user={user} />;
      case 'condo_company':
        return <CondoCompanyProperties user={user} />;
      case 'vendor':
        return <VendorProperties user={user} />;
      case 'government':
        return <GovernmentProperties user={user} />;
      default:
        return <TenantProperties user={user!} />;
    }
  };

  return (
    <AppLayout>
      {renderPropertiesView()}
    </AppLayout>
  );
}
