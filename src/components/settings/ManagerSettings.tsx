import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Building, Wrench, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ManagerSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function ManagerSettings({ user }: ManagerSettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
          <TabsTrigger value="building"><Building className="h-4 w-4 mr-2" />Edifício</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="vendors"><Wrench className="h-4 w-4 mr-2" />Fornecedores</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Gestor</CardTitle>
              <CardDescription>Dados pessoais e de contacto</CardDescription>
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
                  <Label>Telefone de Emergência</Label>
                  <Input placeholder="Contacto fora de horas" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Horário de Atendimento</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input defaultValue="09:00" type="time" />
                  <Input defaultValue="18:00" type="time" />
                </div>
              </div>
              <Button>Guardar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="building">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Edifício</CardTitle>
              <CardDescription>Preferências de gestão do condomínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome do Edifício</Label>
                  <Input defaultValue="Edifício Aurora" />
                </div>
                <div className="space-y-2">
                  <Label>Número de Frações</Label>
                  <Input type="number" defaultValue="24" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Envio Automático de Avisos de Cobrança</p>
                  <p className="text-sm text-muted-foreground">Enviar aviso antes do vencimento</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Dias de Antecedência para Aviso</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="10">10 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatório Automático Mensal</p>
                  <p className="text-sm text-muted-foreground">Gerar e enviar relatório à empresa</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Alertas de gestão do condomínio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagamentos Recebidos</p>
                  <p className="text-sm text-muted-foreground">Quotas pagas pelos condóminos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagamentos em Atraso</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre quotas em falta</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ocorrências Reportadas</p>
                  <p className="text-sm text-muted-foreground">Novas queixas ou problemas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Manutenção Agendada</p>
                  <p className="text-sm text-muted-foreground">Lembretes de intervenções</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mensagens de Condóminos</p>
                  <p className="text-sm text-muted-foreground">Novas mensagens recebidas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Emergência</p>
                  <p className="text-sm text-muted-foreground">Notificações críticas 24/7</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Fornecedores</CardTitle>
              <CardDescription>Preferências de contacto com prestadores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificar Fornecedores Automaticamente</p>
                  <p className="text-sm text-muted-foreground">Enviar pedidos de serviço diretamente</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Requer Aprovação para Orçamentos</p>
                  <p className="text-sm text-muted-foreground">Aprovar antes de executar serviços</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Limite de Aprovação Automática (€)</Label>
                <Input type="number" defaultValue="500" />
                <p className="text-xs text-muted-foreground">Valores abaixo deste limite não requerem aprovação</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Avaliar Fornecedores Após Serviço</p>
                  <p className="text-sm text-muted-foreground">Lembrete para avaliar trabalho concluído</p>
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
              <Button>Atualizar Segurança</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
