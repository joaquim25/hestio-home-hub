import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VendorSchedule } from '@/components/schedule/VendorSchedule';
import { ManagerSchedule } from '@/components/schedule/ManagerSchedule';

export default function Schedule() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only vendors and managers can access this page
  if (user?.role !== 'vendor' && user?.role !== 'manager') {
    return <Navigate to="/dashboard" replace />;
  }

  const renderScheduleContent = () => {
    switch (user?.role) {
      case 'vendor':
        return <VendorSchedule />;
      case 'manager':
        return <ManagerSchedule />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderScheduleContent()}
      </main>
    </div>
  );
}
