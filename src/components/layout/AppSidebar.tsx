import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Home, 
  Building2, 
  CreditCard, 
  Wrench, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Users, 
  Calendar, 
  ClipboardList, 
  HardHat,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const roleLabels: Record<UserRole, string> = {
  tenant: 'Inquilino',
  owner: 'Proprietário',
  agent: 'Agente',
  manager: 'Gestor',
  condo_company: 'Empresa',
  vendor: 'Fornecedor',
  government: 'Público',
};

// Role-specific navigation items
const getNavItems = (role: UserRole | undefined) => {
  const commonItems = [
    { href: '/messages', label: 'Mensagens', icon: MessageSquare },
    { href: '/documents', label: 'Documentos', icon: FileText },
  ];

  switch (role) {
    case 'tenant':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Procurar Imóveis', icon: Building2 },
        { href: '/payments', label: 'Pagamentos', icon: CreditCard },
        { href: '/maintenance', label: 'Manutenção', icon: Wrench },
        ...commonItems,
      ];
    case 'owner':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Imóveis', icon: Building2 },
        { href: '/payments', label: 'Pagamentos', icon: CreditCard },
        { href: '/maintenance', label: 'Manutenção', icon: Wrench },
        { href: '/reports', label: 'Relatórios', icon: BarChart3 },
        ...commonItems,
      ];
    case 'agent':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Imóveis', icon: Building2 },
        { href: '/clients', label: 'Clientes', icon: Users },
        { href: '/payments', label: 'Comissões', icon: CreditCard },
        { href: '/reports', label: 'Relatórios', icon: BarChart3 },
        ...commonItems,
      ];
    case 'manager':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Edifícios', icon: Building2 },
        { href: '/clients', label: 'Condóminos', icon: Users },
        { href: '/vendors', label: 'Fornecedores', icon: HardHat },
        { href: '/schedule', label: 'Agenda', icon: Calendar },
        { href: '/maintenance', label: 'Manutenção', icon: Wrench },
        { href: '/payments', label: 'Despesas', icon: CreditCard },
        ...commonItems,
      ];
    case 'condo_company':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Condomínios', icon: Building2 },
        { href: '/vendors', label: 'Fornecedores', icon: HardHat },
        { href: '/payments', label: 'Finanças', icon: CreditCard },
        { href: '/reports', label: 'Relatórios', icon: BarChart3 },
        ...commonItems,
      ];
    case 'vendor':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/schedule', label: 'Agenda', icon: Calendar },
        { href: '/maintenance', label: 'Ordens de Trabalho', icon: Wrench },
        { href: '/payments', label: 'Faturação', icon: CreditCard },
        ...commonItems,
      ];
    case 'government':
      return [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/properties', label: 'Habitação Social', icon: Building2 },
        { href: '/applications', label: 'Candidaturas', icon: ClipboardList },
        { href: '/payments', label: 'Rendas', icon: CreditCard },
        { href: '/maintenance', label: 'Manutenção', icon: Wrench },
        { href: '/reports', label: 'Relatórios', icon: BarChart3 },
        ...commonItems,
      ];
    default:
      return [
        { href: '/properties', label: 'Imóveis', icon: Building2 },
      ];
  }
};

interface AppSidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AppSidebar({ collapsed = false, onCollapsedChange }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navItems = getNavItems(user?.role);

  const NavItem = ({ item }: { item: { href: string; label: string; icon: React.ComponentType<{ className?: string }> } }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    const linkContent = (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
          isActive 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary-foreground")} />
        {!collapsed && (
          <span className="font-medium text-sm">{item.label}</span>
        )}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full -ml-3" />
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
          <Home className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display text-xl font-bold text-sidebar-foreground">Hestio</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {/* Settings */}
        <NavItem item={{ href: '/settings', label: 'Definições', icon: Settings }} />
        
        {/* User Info & Logout */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-xl bg-sidebar-accent/50",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{roleLabels[user?.role || 'tenant']}</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className="flex items-center justify-center w-full px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Terminar Sessão</TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Terminar Sessão</span>
          </button>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => onCollapsedChange?.(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
