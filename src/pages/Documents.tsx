import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { TenantDocuments } from '@/components/documents/TenantDocuments';
import { OwnerDocuments } from '@/components/documents/OwnerDocuments';
import { AgentDocuments } from '@/components/documents/AgentDocuments';
import { ManagerDocuments } from '@/components/documents/ManagerDocuments';
import { CondoCompanyDocuments } from '@/components/documents/CondoCompanyDocuments';
import { VendorDocuments } from '@/components/documents/VendorDocuments';
import { GovernmentDocuments } from '@/components/documents/GovernmentDocuments';

export default function Documents() {
  const { user } = useAuth();

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
    <AppLayout>
      {renderDocumentsContent()}
    </AppLayout>
  );
}
