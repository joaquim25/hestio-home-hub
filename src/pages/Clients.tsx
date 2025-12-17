import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { AgentClients } from '@/components/clients/AgentClients';
import { ManagerClients } from '@/components/clients/ManagerClients';

export default function Clients() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only agents and managers can access this page
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {renderClientsContent()}
      </main>
    </div>
  );
}
