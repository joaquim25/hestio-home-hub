import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Eye, EyeOff, Loader2, User, Building2, Briefcase, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';

const roles: { value: UserRole; label: string; description: string; icon: any }[] = [
  { value: 'tenant', label: 'Inquilino', description: 'Estou a arrendar um imóvel', icon: User },
  { value: 'owner', label: 'Proprietário', description: 'Tenho imóveis para arrendar', icon: Building2 },
  { value: 'agent', label: 'Agente', description: 'Sou agente imobiliário', icon: Briefcase },
  { value: 'manager', label: 'Gestor', description: 'Faço gestão de condomínios', icon: Users },
];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register(name, email, password, role);
      if (success) {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Bem-vindo ao Hestio.',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Erro no registo',
        description: 'Ocorreu um erro ao criar a sua conta.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-dark items-center justify-center p-12">
        <div className="max-w-md text-center text-secondary-foreground">
          <h2 className="font-display text-4xl font-bold mb-6">
            Junte-se a milhares de utilizadores
          </h2>
          <p className="text-secondary-foreground/80 text-lg">
            O Hestio simplifica a gestão imobiliária para todos os intervenientes: 
            proprietários, inquilinos, agentes e gestores de condomínio.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">Hestio</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Criar conta</h1>
            <p className="mt-2 text-muted-foreground">Comece a sua jornada connosco</p>
          </div>

          <Card className="border-0 shadow-soft-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Palavra-passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Sou um...</Label>
                  <RadioGroup value={role} onValueChange={(v) => setRole(v as UserRole)} className="grid grid-cols-2 gap-3">
                    {roles.map((r) => (
                      <div key={r.value}>
                        <RadioGroupItem value={r.value} id={r.value} className="peer sr-only" />
                        <Label
                          htmlFor={r.value}
                          className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-muted bg-card cursor-pointer transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        >
                          <r.icon className="h-5 w-5 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          <span className="font-medium text-sm">{r.label}</span>
                          <span className="text-xs text-muted-foreground text-center">{r.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Criar Conta
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Ao criar conta, concorda com os{' '}
                <a href="#" className="text-primary hover:underline">Termos de Serviço</a>
                {' '}e{' '}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
              </p>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Já tem conta?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Entrar
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
