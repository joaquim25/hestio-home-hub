import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ManagerVendors } from '@/components/vendors/ManagerVendors';
import { CondoCompanyVendors } from '@/components/vendors/CondoCompanyVendors';

const Vendors = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only managers and condo companies can access vendors page
  if (user.role !== 'manager' && user.role !== 'condo_company') {
    return <Navigate to="/dashboard" replace />;
  }

  const renderVendorsContent = () => {
    switch (user.role) {
      case 'manager':
        return <ManagerVendors user={user} />;
      case 'condo_company':
        return <CondoCompanyVendors user={user} />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderVendorsContent()}
    </div>
  );
};

export default Vendors;
