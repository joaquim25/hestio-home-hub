import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Building, Users, CreditCard, FileText } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface CondoCompanySettingsProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
}

export function CondoCompanySettings({ user }: CondoCompanySettingsProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Definições</h1>

      <Tabs defaultValue="company">
        <TabsList className="mb-6 flex-wrap">
          <TabsTrigger value="company"><Building className="h-4 w-4 mr-2" />Empresa</TabsTrigger>
          <TabsTrigger value="team"><Users className="h-4 w-4 mr-2" />Equipa</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" />Faturação</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notificações</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>Informações corporativas e fiscais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Empresa</Label>
                  <Input defaultValue="GestCondo, Lda." />
                </div>
                <div className="space-y-2">
                  <Label>NIPC</Label>
                  <Input defaultValue="501234567" />
                </div>
                <div className="space-y-2">
                  <Label>Email Geral</Label>
                  <Input defaultValue={user?.email} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue={user?.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Morada da Sede</Label>
                <Input defaultValue="Av. da República, 50, 1050-196 Lisboa" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Licença de Atividade</Label>
                  <Input defaultValue="ADM-2024-1234" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Validade</Label>
                  <Input type="date" defaultValue="2026-12-31" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição da Empresa</Label>
                <Textarea 
                  placeholder="Breve descrição dos serviços..."
                  defaultValue="Empresa especializada em administração de condomínios com mais de 15 anos de experiência no mercado português."
                />
              </div>
              <Button>Guardar Dados</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Equipa</CardTitle>
              <CardDescription>Configurações de gestores e permissões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Permitir Gestores Aprovar Despesas</p>
                  <p className="text-sm text-muted-foreground">Gestores podem aprovar até um limite</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Limite de Aprovação por Gestor (€)</Label>
                <Input type="number" defaultValue="1000" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Gestores Podem Convocar Assembleias</p>
                  <p className="text-sm text-muted-foreground">Sem aprovação prévia da empresa</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatórios Automáticos de Desempenho</p>
                  <p className="text-sm text-muted-foreground">Métricas mensais por gestor</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Máximo de Edifícios por Gestor</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 edifícios</SelectItem>
                    <SelectItem value="5">5 edifícios</SelectItem>
                    <SelectItem value="10">10 edifícios</SelectItem>
                    <SelectItem value="unlimited">Sem limite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Guardar Configurações</Button>
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
                  <Label>IBAN da Empresa</Label>
                  <Input defaultValue="PT50 0000 0000 0000 0000 0001 2" />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Banco</Label>
                  <Input defaultValue="Banco Exemplo" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Taxa de Gestão Padrão (€/mês)</Label>
                  <Input type="number" defaultValue="150" />
                </div>
                <div className="space-y-2">
                  <Label>IVA Aplicável (%)</Label>
                  <Input type="number" defaultValue="23" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Faturação Automática Mensal</p>
                  <p className="text-sm text-muted-foreground">Gerar faturas no início do mês</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enviar Faturas por Email</p>
                  <p className="text-sm text-muted-foreground">Envio automático aos condomínios</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Guardar Faturação</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>Alertas corporativos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatórios de Gestores</p>
                  <p className="text-sm text-muted-foreground">Novos relatórios submetidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Despesas Acima do Limite</p>
                  <p className="text-sm text-muted-foreground">Alertar para aprovação</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contratos a Renovar</p>
                  <p className="text-sm text-muted-foreground">30 dias antes da expiração</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ocorrências Críticas</p>
                  <p className="text-sm text-muted-foreground">Problemas graves nos edifícios</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Resumo Semanal</p>
                  <p className="text-sm text-muted-foreground">Relatório consolidado por email</p>
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
              <CardDescription>Proteja o acesso corporativo</CardDescription>
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
                  <p className="text-sm text-muted-foreground">Obrigatório para administradores</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Log de Atividades</p>
                  <p className="text-sm text-muted-foreground">Registar todas as ações</p>
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
