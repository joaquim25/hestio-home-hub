import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { TenantDocuments } from '@/components/documents/TenantDocuments';
import { OwnerDocuments } from '@/components/documents/OwnerDocuments';
import { AgentDocuments } from '@/components/documents/AgentDocuments';
import { ManagerDocuments } from '@/components/documents/ManagerDocuments';
import { CondoCompanyDocuments } from '@/components/documents/CondoCompanyDocuments';
import { VendorDocuments } from '@/components/documents/VendorDocuments';
import { GovernmentDocuments } from '@/components/documents/GovernmentDocuments';

export default function Documents() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderDocumentsContent = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantDocuments />;
      case 'owner':
        return <OwnerDocuments />;
      case 'agent':
        return <AgentDocuments />;
      case 'manager':
        return <ManagerDocuments />;
      case 'condo_company':
        return <CondoCompanyDocuments />;
      case 'vendor':
        return <VendorDocuments />;
      case 'government':
        return <GovernmentDocuments />;
      default:
        return <TenantDocuments />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderDocumentsContent()}
      </main>
    </div>
  );
}
