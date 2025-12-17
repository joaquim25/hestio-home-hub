import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Wrench, CreditCard, Calendar, Award } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface VendorSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function VendorSettings({ user }: VendorSettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
          <TabsTrigger value="services"><Wrench className="h-4 w-4 mr-2" />Serviços</TabsTrigger>
          <TabsTrigger value="availability"><Calendar className="h-4 w-4 mr-2" />Disponibilidade</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" />Faturação</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil da Empresa</CardTitle>
              <CardDescription>Dados visíveis para clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input defaultValue="TecniServ, Lda." />
                </div>
                <div className="space-y-2">
                  <Label>NIF/NIPC</Label>
                  <Input defaultValue="501234567" />
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
                  <Label>Responsável</Label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="www.tecniserv.pt" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Morada</Label>
                <Input defaultValue="Zona Industrial, Lote 15, Lisboa" />
              </div>
              <div className="space-y-2">
                <Label>Descrição dos Serviços</Label>
                <Textarea 
                  placeholder="Descreva os serviços que presta..."
                  defaultValue="Empresa especializada em manutenção de elevadores, AVAC e sistemas elétricos com mais de 20 anos de experiência."
                />
              </div>
              <Button>Guardar Perfil</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Serviços e Certificações</CardTitle>
              <CardDescription>Áreas de especialização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Categorias de Serviço</Label>
                  <Input defaultValue="Elevadores, AVAC, Eletricidade" />
                </div>
                <div className="space-y-2">
                  <Label>Áreas Geográficas</Label>
                  <Input defaultValue="Lisboa, Cascais, Sintra, Oeiras" />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Certificações</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Certificação ISO 9001</p>
                        <p className="text-xs text-muted-foreground">Válida até: 31/12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Atualizar</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Licença Técnica de Elevadores</p>
                        <p className="text-xs text-muted-foreground">Válida até: 30/06/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Atualizar</Button>
                  </div>
                </div>
                <Button variant="outline">Adicionar Certificação</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidade</CardTitle>
              <CardDescription>Horários e capacidade de trabalho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Horário de Funcionamento</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm">Abertura</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Fecho</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Serviço de Emergência 24h</p>
                  <p className="text-sm text-muted-foreground">Disponível fora de horas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Contacto de Emergência</Label>
                <Input defaultValue="+351 912 345 678" />
              </div>
              <div className="space-y-2">
                <Label>Tempo Médio de Resposta</Label>
                <Select defaultValue="24">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 horas</SelectItem>
                    <SelectItem value="8">8 horas</SelectItem>
                    <SelectItem value="24">24 horas</SelectItem>
                    <SelectItem value="48">48 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Aceitar Novos Clientes</p>
                  <p className="text-sm text-muted-foreground">Permitir pedidos de novos clientes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Disponibilidade</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Faturação</CardTitle>
              <CardDescription>Dados fiscais e de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>IBAN</Label>
                  <Input defaultValue="PT50 0000 0000 0000 0000 0001 2" />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Banco</Label>
                  <Input defaultValue="Banco Exemplo" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Taxa Horária Padrão (€/h)</Label>
                  <Input type="number" defaultValue="45" />
                </div>
                <div className="space-y-2">
                  <Label>IVA Aplicável (%)</Label>
                  <Input type="number" defaultValue="23" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Faturação Eletrónica</p>
                  <p className="text-sm text-muted-foreground">Enviar faturas por email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Prazo de Pagamento (dias)</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="45">45 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Guardar Faturação</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Alertas de trabalhos e pagamentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos Pedidos de Trabalho</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre novas ordens de serviço</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mensagens de Clientes</p>
                  <p className="text-sm text-muted-foreground">Novas mensagens recebidas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagamentos Recebidos</p>
                  <p className="text-sm text-muted-foreground">Confirmação de pagamentos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lembretes de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Trabalhos agendados para o dia seguinte</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chamadas de Emergência</p>
                  <p className="text-sm text-muted-foreground">Notificações SMS urgentes</p>
                </div>
                <Switch defaultChecked />
              </div>
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
