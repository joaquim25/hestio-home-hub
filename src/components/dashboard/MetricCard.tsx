import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: 'primary' | 'success' | 'warning' | 'accent' | 'muted';
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const iconColorStyles = {
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  accent: 'bg-accent text-accent-foreground',
  muted: 'bg-muted text-muted-foreground',
};

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  iconColor = 'primary',
  children,
  onClick,
  className
}: MetricCardProps) {
  return (
    <div 
      className={cn(
        "metric-card p-6 rounded-2xl cursor-default transition-all duration-300",
        onClick && "cursor-pointer hover-lift",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", iconColorStyles[iconColor])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          )}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="font-display text-3xl font-semibold text-foreground tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      
      {children && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {children}
        </div>
      )}
    </div>
  );
}
