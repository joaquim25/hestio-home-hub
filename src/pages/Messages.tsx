import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { TenantMessages } from '@/components/messages/TenantMessages';
import { OwnerMessages } from '@/components/messages/OwnerMessages';
import { AgentMessages } from '@/components/messages/AgentMessages';
import { ManagerMessages } from '@/components/messages/ManagerMessages';
import { CondoCompanyMessages } from '@/components/messages/CondoCompanyMessages';
import { VendorMessages } from '@/components/messages/VendorMessages';
import { GovernmentMessages } from '@/components/messages/GovernmentMessages';

export default function Messages() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderMessagesContent = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantMessages />;
      case 'owner':
        return <OwnerMessages />;
      case 'agent':
        return <AgentMessages />;
      case 'manager':
        return <ManagerMessages />;
      case 'condo_company':
        return <CondoCompanyMessages />;
      case 'vendor':
        return <VendorMessages />;
      case 'government':
        return <GovernmentMessages />;
      default:
        return <TenantMessages />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderMessagesContent()}
      </main>
    </div>
  );
}
