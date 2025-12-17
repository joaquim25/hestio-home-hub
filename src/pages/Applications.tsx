import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { GovernmentApplications } from '@/components/applications/GovernmentApplications';

export default function Applications() {
  const { user } = useAuth();

  if (user?.role !== 'government') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AppLayout>
      <GovernmentApplications />
    </AppLayout>
  );
}
