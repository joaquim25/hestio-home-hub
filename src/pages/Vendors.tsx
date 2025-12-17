import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { ManagerVendors } from '@/components/vendors/ManagerVendors';
import { CondoCompanyVendors } from '@/components/vendors/CondoCompanyVendors';

export default function Vendors() {
  const { user } = useAuth();

  if (user?.role !== 'manager' && user?.role !== 'condo_company') {
    return <Navigate to="/dashboard" replace />;
  }

  const renderVendorsContent = () => {
    switch (user?.role) {
      case 'manager':
        return <ManagerVendors user={user} />;
      case 'condo_company':
        return <CondoCompanyVendors user={user} />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <AppLayout>
      {renderVendorsContent()}
    </AppLayout>
  );
}
