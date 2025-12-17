import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Eye, EyeOff, Loader2, User, Building2, Briefcase, Users, Sparkles, Check } from 'lucide-react';
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
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-[80px]" />
        
        <div className="max-w-md text-primary-foreground relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Comece gratuitamente</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
            Junte-se a milhares de utilizadores
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            O Hestio simplifica a gestão imobiliária para todos os intervenientes: 
            proprietários, inquilinos, agentes e gestores de condomínio.
          </p>
          
          <div className="space-y-3">
            {['Gestão completa de imóveis', 'Pagamentos seguros integrados', 'Comunicação centralizada'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-primary-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto bg-gradient-page relative">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" />
        
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-soft">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">Hestio</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Criar conta</h1>
            <p className="mt-2 text-muted-foreground">Comece a sua jornada connosco</p>
          </div>

          <Card className="glass-card border-border/30 shadow-soft-lg">
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
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg"
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
                          className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer transition-all hover:bg-muted/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        >
                          <r.icon className="h-5 w-5 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          <span className="font-medium text-sm">{r.label}</span>
                          <span className="text-xs text-muted-foreground text-center leading-tight">{r.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full rounded-xl shadow-soft" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Criar Conta
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Ao criar conta, concorda com os{' '}
                <a href="#" className="text-primary hover:underline">Termos de Serviço</a>
                {' '}e{' '}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
              </p>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card/80 backdrop-blur-sm px-3 text-muted-foreground rounded-full">Ou continue com</span>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-xl bg-card/50 backdrop-blur-sm border-border/50" type="button">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>

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
