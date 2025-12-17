import { cn } from '@/lib/utils';

interface WelcomeHeaderProps {
  name: string;
  subtitle: string;
  className?: string;
}

export function WelcomeHeader({ name, subtitle, className }: WelcomeHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="font-display text-3xl md:text-4xl font-normal text-foreground tracking-tight">
        Olá, {name}
      </h1>
      <p className="text-muted-foreground mt-2 text-base">
        {subtitle}
      </p>
    </div>
  );
}
