import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { TenantProperties } from '@/components/properties/TenantProperties';
import { OwnerProperties } from '@/components/properties/OwnerProperties';
import { AgentProperties } from '@/components/properties/AgentProperties';
import { ManagerProperties } from '@/components/properties/ManagerProperties';
import { CondoCompanyProperties } from '@/components/properties/CondoCompanyProperties';
import { VendorProperties } from '@/components/properties/VendorProperties';
import { GovernmentProperties } from '@/components/properties/GovernmentProperties';
import { mockProperties } from '@/lib/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Properties() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render role-specific properties view
  const renderPropertiesView = () => {
    switch (user?.role) {
      case 'tenant':
        return <TenantProperties user={user} />;
      case 'owner':
        return <OwnerProperties user={user} />;
      case 'agent':
        return <AgentProperties user={user} />;
      case 'manager':
        return <ManagerProperties user={user} />;
      case 'condo_company':
        return <CondoCompanyProperties user={user} />;
      case 'vendor':
        return <VendorProperties user={user} />;
      case 'government':
        return <GovernmentProperties user={user} />;
      default:
        return <TenantProperties user={user!} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {renderPropertiesView()}
    </div>
  );
}
