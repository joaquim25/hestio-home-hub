import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Home, Building2, CreditCard, Wrench, FileText, MessageSquare, Settings, BarChart3, ChevronDown, Users, Calendar, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

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
          { href: '/schedule', label: 'Agenda', icon: Calendar },
          { href: '/maintenance', label: 'Manutenção', icon: Wrench },
          { href: '/payments', label: 'Despesas', icon: CreditCard },
          ...commonItems,
        ];
      case 'condo_company':
        return [
          { href: '/dashboard', label: 'Dashboard', icon: Home },
          { href: '/properties', label: 'Condomínios', icon: Building2 },
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

  const navItems = getNavItems(user?.role);
  const roles: UserRole[] = ['tenant', 'owner', 'agent', 'manager', 'condo_company', 'vendor', 'government'];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
              <Home className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">Hestio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated && navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Role Switcher for Demo */}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                    <Badge variant={roleColors[user?.role || 'tenant']} className="text-xs">
                      {roleLabels[user?.role || 'tenant']}
                    </Badge>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Definições
                    </Link>
                  </DropdownMenuItem>
                  {(user?.role === 'owner' || user?.role === 'agent') && (
                    <DropdownMenuItem asChild>
                      <Link to="/reports" className="cursor-pointer">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Relatórios
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    Terminar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Começar Grátis</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isAuthenticated && (
          <div className="md:hidden border-t py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
