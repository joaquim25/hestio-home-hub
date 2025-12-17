import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { VendorSchedule } from '@/components/schedule/VendorSchedule';
import { ManagerSchedule } from '@/components/schedule/ManagerSchedule';

export default function Schedule() {
  const { user } = useAuth();

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
    <AppLayout>
      {renderScheduleContent()}
    </AppLayout>
  );
}
