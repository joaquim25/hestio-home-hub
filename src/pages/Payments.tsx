import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { TenantPayments } from '@/components/payments/TenantPayments';
import { OwnerPayments } from '@/components/payments/OwnerPayments';
import { AgentPayments } from '@/components/payments/AgentPayments';
import { ManagerPayments } from '@/components/payments/ManagerPayments';
import { CondoCompanyPayments } from '@/components/payments/CondoCompanyPayments';
import { VendorPayments } from '@/components/payments/VendorPayments';
import { GovernmentPayments } from '@/components/payments/GovernmentPayments';

export default function Payments() {
  const { user } = useAuth();

  const renderPaymentsContent = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantPayments />;
      case 'owner':
        return <OwnerPayments />;
      case 'agent':
        return <AgentPayments />;
      case 'manager':
        return <ManagerPayments />;
      case 'condo_company':
        return <CondoCompanyPayments />;
      case 'vendor':
        return <VendorPayments />;
      case 'government':
        return <GovernmentPayments />;
      default:
        return <TenantPayments />;
    }
  };

  return (
    <AppLayout>
      {renderPaymentsContent()}
    </AppLayout>
  );
}
