import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Landmark, Users, FileText, Scale } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface GovernmentSettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function GovernmentSettings({ user }: GovernmentSettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="organization">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="organization"><Landmark className="h-4 w-4 mr-2" />Organização</TabsTrigger>
          <TabsTrigger value="users"><Users className="h-4 w-4 mr-2" />Utilizadores</TabsTrigger>
          <TabsTrigger value="policies"><Scale className="h-4 w-4 mr-2" />Políticas</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Organização</CardTitle>
              <CardDescription>Informações da entidade governamental</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Entidade</Label>
                  <Input defaultValue="Instituto da Habitação e Reabilitação Urbana" />
                </div>
                <div className="space-y-2">
                  <Label>Sigla</Label>
                  <Input defaultValue="IHRU" />
                </div>
                <div className="space-y-2">
                  <Label>NIF</Label>
                  <Input defaultValue="501234567" />
                </div>
                <div className="space-y-2">
                  <Label>Código da Entidade</Label>
                  <Input defaultValue="GOV-HAB-001" />
                </div>
                <div className="space-y-2">
                  <Label>Email Institucional</Label>
                  <Input defaultValue={user?.email} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue={user?.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Morada</Label>
                <Input defaultValue="Av. Columbano Bordalo Pinheiro, 5, 1099-019 Lisboa" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Distritos Abrangidos</Label>
                  <Input defaultValue="Lisboa, Porto, Faro, Setúbal" />
                </div>
                <div className="space-y-2">
                  <Label>Tutela</Label>
                  <Input defaultValue="Ministério das Infraestruturas e da Habitação" />
                </div>
              </div>
              <Button>Guardar Dados</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Utilizadores</CardTitle>
              <CardDescription>Permissões e acessos internos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Aprovação de Novos Utilizadores</p>
                  <p className="text-sm text-muted-foreground">Requer validação do administrador</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Níveis de Acesso Disponíveis</Label>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Administrador - Acesso total</p>
                  <p>• Gestor de Distrito - Acesso ao seu distrito</p>
                  <p>• Técnico - Análise de candidaturas</p>
                  <p>• Consulta - Apenas visualização</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Expiração de Sessão Automática</p>
                  <p className="text-sm text-muted-foreground">Logout após período de inatividade</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Tempo de Sessão (minutos)</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                    <SelectItem value="120">120 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registo de Auditoria</p>
                  <p className="text-sm text-muted-foreground">Registar todas as ações dos utilizadores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Habitação Social</CardTitle>
              <CardDescription>Configurações de elegibilidade e alocação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Rendimento Máximo Elegível (€/mês)</Label>
                  <Input type="number" defaultValue="1500" />
                </div>
                <div className="space-y-2">
                  <Label>Taxa Esforço Máxima (%)</Label>
                  <Input type="number" defaultValue="35" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Critérios de Prioridade</Label>
                <Textarea 
                  defaultValue="1. Famílias numerosas&#10;2. Pessoas com deficiência&#10;3. Idosos&#10;4. Vítimas de violência doméstica&#10;5. Sem-abrigo"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atualização Automática de Rendas Sociais</p>
                  <p className="text-sm text-muted-foreground">Aplicar coeficiente anual</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Prazo Máximo de Análise (dias)</Label>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Verificação Automática de Rendimentos</p>
                  <p className="text-sm text-muted-foreground">Integração com Autoridade Tributária</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Políticas</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Alertas institucionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novas Candidaturas</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre novos pedidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Candidaturas Pendentes</p>
                  <p className="text-sm text-muted-foreground">Lembrete de processos em atraso</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rendas em Atraso</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre incumprimentos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Manutenção Urgente</p>
                  <p className="text-sm text-muted-foreground">Problemas críticos em habitações</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatórios Mensais</p>
                  <p className="text-sm text-muted-foreground">Estatísticas e indicadores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auditorias Agendadas</p>
                  <p className="text-sm text-muted-foreground">Lembretes de inspeções</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança Institucional</CardTitle>
              <CardDescription>Políticas de segurança e conformidade</CardDescription>
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
                  <p className="text-sm text-muted-foreground">Obrigatório para todos os utilizadores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Renovação de Palavra-passe</p>
                  <p className="text-sm text-muted-foreground">Obrigar mudança a cada 90 dias</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Acesso por IP Autorizado</p>
                  <p className="text-sm text-muted-foreground">Restringir acesso a IPs da rede institucional</p>
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
