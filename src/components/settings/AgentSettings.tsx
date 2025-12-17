import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, CreditCard, Briefcase, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AgentSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function AgentSettings({ user }: AgentSettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Perfil</TabsTrigger>
          <TabsTrigger value="business"><Briefcase className="h-4 w-4 mr-2" />Negócio</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="commissions"><CreditCard className="h-4 w-4 mr-2" />Comissões</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil Profissional</CardTitle>
              <CardDescription>Informações visíveis para clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email Profissional</Label>
                  <Input defaultValue={user?.email} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue={user?.phone} />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue={user?.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Biografia Profissional</Label>
                <Textarea 
                  placeholder="Descreva a sua experiência e especialidades..."
                  defaultValue="Agente imobiliário com mais de 10 anos de experiência no mercado português..."
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Áreas de Atuação</Label>
                  <Input defaultValue="Lisboa, Cascais, Sintra" />
                </div>
                <div className="space-y-2">
                  <Label>Especialidades</Label>
                  <Input defaultValue="Arrendamento, Venda, Investimento" />
                </div>
              </div>
              <Button>Guardar Perfil</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Dados Empresariais</CardTitle>
              <CardDescription>Informações da sua atividade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Licença AMI</Label>
                  <Input defaultValue="12345" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Validade</Label>
                  <Input type="date" defaultValue="2025-12-31" />
                </div>
                <div className="space-y-2">
                  <Label>NIF</Label>
                  <Input defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label>Nome da Empresa/Mediadora</Label>
                  <Input defaultValue="Imobiliária ABC" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Morada do Escritório</Label>
                <Input defaultValue="Av. da Liberdade, 100, Lisboa" />
              </div>
              <Button>Guardar Dados</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Gerir alertas de negócio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos Leads</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre novos interessados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mensagens de Clientes</p>
                  <p className="text-sm text-muted-foreground">Notificar novas mensagens</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contratos Pendentes</p>
                  <p className="text-sm text-muted-foreground">Documentos aguardando assinatura</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comissões Recebidas</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre pagamentos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Visitas Agendadas</p>
                  <p className="text-sm text-muted-foreground">Lembrete de visitas marcadas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatório Semanal</p>
                  <p className="text-sm text-muted-foreground">Resumo de atividade por email</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Comissões</CardTitle>
              <CardDescription>Taxas e dados de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Taxa de Comissão Padrão (%)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>IVA Aplicável (%)</Label>
                  <Input type="number" defaultValue="23" />
                </div>
              </div>
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
                  <p className="font-medium">Faturação Automática</p>
                  <p className="text-sm text-muted-foreground">Gerar fatura ao fechar negócio</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Configurações</Button>
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
