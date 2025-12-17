import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Bem-vindo de volta!',
          description: 'Login efetuado com sucesso.',
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: 'Verifique as suas credenciais e tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { label: '🏠 Inquilino', email: 'joao@email.com' },
    { label: '🏢 Proprietário', email: 'maria@email.com' },
    { label: '🔑 Agente', email: 'pedro@email.com' },
    { label: '🏛️ Gestor Cond.', email: 'ana@email.com' },
    { label: '🏗️ Empresa Cond.', email: 'empresa@email.com' },
    { label: '🔧 Prestador', email: 'carlos@email.com' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-page relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-soft">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">Hestio</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
            <p className="mt-2 text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          <Card className="glass-card border-border/30 shadow-soft-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Esqueceu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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

                <Button type="submit" className="w-full rounded-xl shadow-soft" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Entrar
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card/80 backdrop-blur-sm px-3 text-muted-foreground rounded-full">Contas Demo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword('demo123');
                    }}
                    className="text-xs rounded-xl bg-card/50 backdrop-blur-sm border-border/50 hover:bg-muted/50"
                  >
                    {account.label}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setEmail('ihru@email.com');
                    setPassword('demo123');
                  }}
                  className="text-xs col-span-2 rounded-xl bg-card/50 backdrop-blur-sm border-border/50 hover:bg-muted/50"
                >
                  🏛️ Entidade Pública
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
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

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Não tem conta?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Criar conta
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-[80px]" />
        
        <div className="max-w-md text-center text-primary-foreground relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Gestão simplificada</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
            Gerir imóveis nunca foi tão simples
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Aceda ao seu dashboard personalizado e tenha controlo total sobre 
            os seus imóveis, pagamentos e comunicações.
          </p>
        </div>
      </div>
    </div>
  );
}
