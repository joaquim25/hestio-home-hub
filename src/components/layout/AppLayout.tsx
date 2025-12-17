import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AppSidebar, MobileSidebarTrigger } from './AppSidebar';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

const roleLabels: Record<UserRole, string> = {
  tenant: 'Inquilino',
  owner: 'Proprietário',
  agent: 'Agente',
  manager: 'Gestor Condomínio',
  condo_company: 'Empresa Condomínios',
  vendor: 'Prestador Serviços',
  government: 'Entidade Pública',
};

const roleColors: Record<UserRole, 'default' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'> = {
  tenant: 'default',
  owner: 'accent',
  agent: 'secondary',
  manager: 'success',
  condo_company: 'warning',
  vendor: 'default',
  government: 'destructive',
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isAuthenticated, switchRole } = useAuth();
  const roles: UserRole[] = ['tenant', 'owner', 'agent', 'manager', 'condo_company', 'vendor', 'government'];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-page">
      <AppSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      <div className={cn(
        "transition-all duration-300",
        "ml-0 md:ml-64",
        collapsed && "md:ml-[72px]"
      )}>
        {/* Top Bar with Role Switcher */}
        <header className="sticky top-0 z-40 h-16 bg-card/60 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MobileSidebarTrigger />
          </div>
          
          {/* Role Switcher for Demo */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-card/50">
                <Badge variant={roleColors[user?.role || 'tenant']} className="text-xs">
                  {roleLabels[user?.role || 'tenant']}
                </Badge>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Mudar Perfil (Demo)
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map((role) => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => switchRole(role)}
                  className="gap-2"
                >
                  <Badge variant={roleColors[role]} className="text-xs">
                    {roleLabels[role]}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
