import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { TenantPayments } from '@/components/payments/TenantPayments';
import { OwnerPayments } from '@/components/payments/OwnerPayments';
import { AgentPayments } from '@/components/payments/AgentPayments';
import { ManagerPayments } from '@/components/payments/ManagerPayments';
import { CondoCompanyPayments } from '@/components/payments/CondoCompanyPayments';
import { VendorPayments } from '@/components/payments/VendorPayments';
import { GovernmentPayments } from '@/components/payments/GovernmentPayments';

export default function Payments() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderPaymentsContent()}
      </main>
    </div>
  );
}
