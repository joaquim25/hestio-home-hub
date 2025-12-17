import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TenantSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function TenantSettings({ user }: TenantSettingsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Definições</h1>
        <p className="text-muted-foreground mt-1">Gerencie as suas preferências e conta</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="payments"><CreditCard className="h-4 w-4 mr-2" />Pagamentos</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display">Informações Pessoais</CardTitle>
              <CardDescription>Atualize os seus dados de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
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
                  <Label>Idioma Preferido</Label>
                  <Select defaultValue="pt">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>Guardar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display">Preferências de Notificações</CardTitle>
              <CardDescription>Escolha como quer ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Lembretes de Renda', desc: 'Receber lembrete antes do vencimento', checked: true },
                { title: 'Atualizações de Manutenção', desc: 'Estado dos pedidos de manutenção', checked: true },
                { title: 'Mensagens do Senhorio', desc: 'Notificar quando receber mensagens', checked: true },
                { title: 'Documentos', desc: 'Novos documentos ou assinaturas pendentes', checked: true },
                { title: 'Notificações por Email', desc: 'Receber resumo diário por email', checked: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display">Métodos de Pagamento</CardTitle>
              <CardDescription>Gerir formas de pagamento da renda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-muted/50">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Débito Direto</p>
                      <p className="text-sm text-muted-foreground">IBAN: PT50 •••• •••• 1234</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div>
                  <p className="font-medium">Pagamento Automático</p>
                  <p className="text-sm text-muted-foreground">Debitar automaticamente no dia do vencimento</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline">Adicionar Método de Pagamento</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display">Segurança da Conta</CardTitle>
              <CardDescription>Proteja a sua conta</CardDescription>
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
              <div className="space-y-2">
                <Label>Confirmar Nova Palavra-passe</Label>
                <Input type="password" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div>
                  <p className="font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-muted-foreground">Adicione segurança extra à sua conta</p>
                </div>
                <Switch />
              </div>
              <Button>Atualizar Palavra-passe</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
