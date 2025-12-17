import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'secondary';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-hero text-primary-foreground',
  accent: 'bg-gradient-accent text-accent-foreground',
  secondary: 'bg-gradient-dark text-secondary-foreground',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-primary-foreground/20 text-primary-foreground',
  accent: 'bg-accent-foreground/20 text-accent-foreground',
  secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
};

export function StatsCard({ title, value, description, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', variant !== 'default' && 'border-0 shadow-lg', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {title}
            </p>
            <p className="text-3xl font-bold font-display">{value}</p>
            {description && (
              <p className={cn(
                'text-sm',
                variant === 'default' ? 'text-muted-foreground' : 'opacity-70'
              )}>
                {description}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                <span className={cn(
                  trend.isPositive ? 'text-success' : 'text-destructive',
                  variant !== 'default' && 'font-semibold'
                )}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className={variant === 'default' ? 'text-muted-foreground' : 'opacity-70'}>
                  vs mês anterior
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            'p-3 rounded-xl',
            iconVariantStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
