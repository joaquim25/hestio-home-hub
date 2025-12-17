import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, CreditCard, Building, FileText } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OwnerSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function OwnerSettings({ user }: OwnerSettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" />Faturação</TabsTrigger>
          <TabsTrigger value="properties"><Building className="h-4 w-4 mr-2" />Propriedades</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Proprietário</CardTitle>
              <CardDescription>Dados pessoais e fiscais</CardDescription>
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
                  <Label>NIF</Label>
                  <Input defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label>Morada Fiscal</Label>
                  <Input defaultValue="Rua Principal, 123, Lisboa" />
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
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
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Configure alertas importantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagamentos Recebidos</p>
                  <p className="text-sm text-muted-foreground">Notificar quando receber rendas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagamentos em Atraso</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre rendas não pagas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pedidos de Manutenção</p>
                  <p className="text-sm text-muted-foreground">Novos pedidos dos inquilinos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contratos a Expirar</p>
                  <p className="text-sm text-muted-foreground">Alertar 30 dias antes da renovação</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Documentos Pendentes</p>
                  <p className="text-sm text-muted-foreground">Certificados e licenças a expirar</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatório Mensal</p>
                  <p className="text-sm text-muted-foreground">Resumo financeiro por email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Dados de Faturação</CardTitle>
              <CardDescription>Configurações fiscais e bancárias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>IBAN para Recebimentos</Label>
                  <Input defaultValue="PT50 0000 0000 0000 0000 0001 2" />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Banco</Label>
                  <Input defaultValue="Banco Exemplo" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Emissão Automática de Recibos</p>
                  <p className="text-sm text-muted-foreground">Gerar recibo ao receber pagamento</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enviar Recibo ao Inquilino</p>
                  <p className="text-sm text-muted-foreground">Email automático com recibo anexo</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Propriedades</CardTitle>
              <CardDescription>Preferências gerais para as suas propriedades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualização Automática de Renda</p>
                  <p className="text-sm text-muted-foreground">Aplicar coeficiente de atualização anual</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Dias de Tolerância para Pagamento</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sem tolerância</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="10">10 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Manutenção Preventiva</p>
                  <p className="text-sm text-muted-foreground">Lembretes para inspeções periódicas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Proteja o acesso à sua conta</CardDescription>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-muted-foreground">Segurança adicional no login</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificar Novos Acessos</p>
                  <p className="text-sm text-muted-foreground">Email quando houver login de novo dispositivo</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Atualizar Segurança</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
