import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { OwnerReports } from '@/components/reports/OwnerReports';
import { AgentReports } from '@/components/reports/AgentReports';
import { CondoCompanyReports } from '@/components/reports/CondoCompanyReports';
import { GovernmentReports } from '@/components/reports/GovernmentReports';

export default function Reports() {
  const { user } = useAuth();

  const allowedRoles = ['owner', 'agent', 'condo_company', 'government'];
  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  const renderReportsContent = () => {
    switch (user?.role) {
      case 'owner':
        return <OwnerReports user={user} />;
      case 'agent':
        return <AgentReports user={user} />;
      case 'condo_company':
        return <CondoCompanyReports user={user} />;
      case 'government':
        return <GovernmentReports user={user} />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <AppLayout>
      {renderReportsContent()}
    </AppLayout>
  );
}
