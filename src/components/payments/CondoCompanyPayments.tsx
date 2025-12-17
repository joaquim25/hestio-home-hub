import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  TrendingUp,
  Euro,
  PieChart,
  Users,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

export function CondoCompanyPayments() {
  const totalRevenue = 245000;
  const monthlyRevenue = 28500;
  const pendingAmount = 12400;
  const overdueAmount = 4200;
  const avgCollectionRate = 94;

  const buildingFinancials = [
    { id: '1', building: 'Ed. Aurora', manager: 'Ana Rodrigues', revenue: 4800, collected: 4400, rate: 92, units: 24 },
    { id: '2', building: 'Ed. Belém', manager: 'Carlos Silva', revenue: 3600, collected: 3600, rate: 100, units: 18 },
    { id: '3', building: 'Ed. Central', manager: 'Maria Costa', revenue: 6400, collected: 5800, rate: 91, units: 32 },
    { id: '4', building: 'Ed. Douro', manager: 'Pedro Santos', revenue: 5200, collected: 4900, rate: 94, units: 26 },
    { id: '5', building: 'Ed. Estrela', manager: 'Ana Rodrigues', revenue: 4200, collected: 4000, rate: 95, units: 21 },
  ];

  const recentTransactions = [
    { id: '1', description: 'Quotas Janeiro - Ed. Aurora', type: 'income', amount: 4400, date: '2024-01-20' },
    { id: '2', description: 'Pagamento Fornecedor - Elevadores', type: 'expense', amount: 1200, date: '2024-01-18' },
    { id: '3', description: 'Quotas Janeiro - Ed. Belém', type: 'income', amount: 3600, date: '2024-01-17' },
    { id: '4', description: 'Seguro Multi-riscos', type: 'expense', amount: 2400, date: '2024-01-15' },
    { id: '5', description: 'Quotas Janeiro - Ed. Central', type: 'income', amount: 5800, date: '2024-01-14' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Finanças da Empresa</h1>
          <p className="text-muted-foreground mt-1">Visão consolidada de todos os edifícios</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <PieChart className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Receita Total"
          value={`€${totalRevenue.toLocaleString()}`}
          description="Este ano"
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Receita Mensal"
          value={`€${monthlyRevenue.toLocaleString()}`}
          description="+5.2% vs mês anterior"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pendente"
          value={`€${pendingAmount.toLocaleString()}`}
          description="A receber"
          icon={Clock}
        />
        <StatsCard
          title="Em Atraso"
          value={`€${overdueAmount.toLocaleString()}`}
          description="Necessita ação"
          icon={AlertTriangle}
        />
      </div>

      {/* Collection Performance by Building */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Performance por Edifício
          </CardTitle>
          <CardDescription>Taxa de cobrança e receita mensal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buildingFinancials.map((building) => (
              <div key={building.id} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium">{building.building}</p>
                    <p className="text-sm text-muted-foreground">
                      Gestor: {building.manager} • {building.units} frações
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{building.collected.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">de €{building.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={building.rate} className="h-2 flex-1" />
                  <Badge variant={building.rate >= 95 ? 'success' : building.rate >= 90 ? 'warning' : 'destructive'}>
                    {building.rate}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manager Performance & Company Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Performance por Gestor
            </CardTitle>
            <CardDescription>Eficiência na cobrança</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Ana Rodrigues', buildings: 2, avgRate: 93.5, collected: 8400 },
                { name: 'Carlos Silva', buildings: 1, avgRate: 100, collected: 3600 },
                { name: 'Maria Costa', buildings: 1, avgRate: 91, collected: 5800 },
                { name: 'Pedro Santos', buildings: 1, avgRate: 94, collected: 4900 },
              ].map((manager) => (
                <div key={manager.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{manager.name}</p>
                    <p className="text-sm text-muted-foreground">{manager.buildings} edifício(s)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">€{manager.collected.toLocaleString()}</p>
                      <Badge variant={manager.avgRate >= 95 ? 'success' : 'warning'}>
                        {manager.avgRate}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Resumo Financeiro
            </CardTitle>
            <CardDescription>Este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950">
                <div>
                  <p className="text-sm text-muted-foreground">Total Receitas</p>
                  <p className="text-2xl font-bold text-green-600">€{(22700).toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950">
                <div>
                  <p className="text-sm text-muted-foreground">Total Despesas</p>
                  <p className="text-2xl font-bold text-red-600">€{(8400).toLocaleString()}</p>
                </div>
                <FileText className="h-8 w-8 text-red-600" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                <div>
                  <p className="text-sm text-muted-foreground">Resultado Líquido</p>
                  <p className="text-2xl font-bold text-primary">€{(14300).toLocaleString()}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Movimentos Recentes</CardTitle>
            <CardDescription>Todas as transações da empresa</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar transações..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Edifício" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {buildingFinancials.map(b => (
                  <SelectItem key={b.id} value={b.id}>{b.building}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={transaction.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
                        {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className={`text-right font-display font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
