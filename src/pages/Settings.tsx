import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, CreditCard, Shield, Globe } from 'lucide-react';

export default function Settings() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>Atualize os seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input defaultValue={user?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={user?.email} type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input defaultValue={user?.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Input defaultValue="Português" />
                  </div>
                </div>
                <Button>Guardar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {['Pagamentos', 'Manutenção', 'Mensagens', 'Documentos'].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item}</p>
                      <p className="text-sm text-muted-foreground">Receber notificações de {item.toLowerCase()}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Palavra-passe Atual</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Nova Palavra-passe</Label>
                  <Input type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de Dois Fatores</p>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
                <Button>Atualizar Segurança</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
