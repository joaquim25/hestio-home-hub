import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { OwnerReports } from '@/components/reports/OwnerReports';
import { AgentReports } from '@/components/reports/AgentReports';
import { CondoCompanyReports } from '@/components/reports/CondoCompanyReports';
import { GovernmentReports } from '@/components/reports/GovernmentReports';

export default function Reports() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only owner, agent, condo_company, and government can access reports
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderReportsContent()}
      </main>
    </div>
  );
}
