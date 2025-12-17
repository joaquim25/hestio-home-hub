import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Navigate } from 'react-router-dom';
import { AgentClients } from '@/components/clients/AgentClients';
import { ManagerClients } from '@/components/clients/ManagerClients';

export default function Clients() {
  const { user } = useAuth();

  if (user?.role !== 'agent' && user?.role !== 'manager') {
    return <Navigate to="/dashboard" replace />;
  }

  const renderClientsContent = () => {
    switch (user?.role) {
      case 'agent':
        return <AgentClients />;
      case 'manager':
        return <ManagerClients />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  };

  return (
    <AppLayout>
      {renderClientsContent()}
    </AppLayout>
  );
}
