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
  Users,
  Wrench,
  Receipt,
  TrendingUp,
  Euro,
  Send,
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

const statusColors: Record<string, 'success' | 'warning' | 'destructive'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
};

export function ManagerPayments() {
  const totalCollected = 45800;
  const pendingFees = 3200;
  const overdueAmount = 850;
  const collectionRate = 92;

  const buildingFees = [
    { id: '1', building: 'Ed. Aurora', units: 24, collected: 22, total: 4800, status: 'partial' },
    { id: '2', building: 'Ed. Belém', units: 18, collected: 18, total: 3600, status: 'complete' },
    { id: '3', building: 'Ed. Central', units: 32, collected: 28, total: 6400, status: 'partial' },
  ];

  const vendorPayments = [
    { id: '1', vendor: 'LimpaTudo Lda', service: 'Limpeza', amount: 450, status: 'pending', dueDate: '2024-01-25' },
    { id: '2', vendor: 'ElectroFix', service: 'Manutenção Elétrica', amount: 280, status: 'paid', dueDate: '2024-01-15' },
    { id: '3', vendor: 'JardinArte', service: 'Jardinagem', amount: 320, status: 'pending', dueDate: '2024-01-28' },
    { id: '4', vendor: 'SegurMax', service: 'Segurança', amount: 890, status: 'paid', dueDate: '2024-01-10' },
  ];

  const recentPayments = [
    { id: '1', unit: 'Fração A', building: 'Ed. Aurora', tenant: 'João Silva', amount: 200, status: 'paid', date: '2024-01-15' },
    { id: '2', unit: 'Fração B', building: 'Ed. Aurora', tenant: 'Maria Costa', amount: 200, status: 'pending', date: '2024-01-20' },
    { id: '3', unit: 'Fração C', building: 'Ed. Belém', tenant: 'Pedro Santos', amount: 200, status: 'paid', date: '2024-01-12' },
    { id: '4', unit: 'Fração D', building: 'Ed. Central', tenant: 'Ana Ferreira', amount: 200, status: 'overdue', date: '2024-01-05' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Gestão Financeira</h1>
          <p className="text-muted-foreground mt-1">Quotas de condomínio e pagamentos a fornecedores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Gerar Avisos
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
          title="Total Cobrado"
          value={`€${totalCollected.toLocaleString()}`}
          description="Este ano"
          icon={CheckCircle2}
          variant="accent"
        />
        <StatsCard
          title="Taxa Cobrança"
          value={`${collectionRate}%`}
          description="Eficiência"
          icon={TrendingUp}
        />
        <StatsCard
          title="Pendente"
          value={`€${pendingFees.toLocaleString()}`}
          description="Quotas por pagar"
          icon={Clock}
        />
        <StatsCard
          title="Em Atraso"
          value={`€${overdueAmount.toLocaleString()}`}
          description="Necessita cobrança"
          icon={AlertTriangle}
        />
      </div>

      {/* Building Collection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Cobrança por Edifício
          </CardTitle>
          <CardDescription>Estado das quotas de condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {buildingFees.map((building) => (
              <div key={building.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{building.building}</p>
                    <p className="text-sm text-muted-foreground">
                      {building.collected}/{building.units} frações pagas
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{(building.collected * (building.total / building.units)).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">de €{building.total.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(building.collected / building.units) * 100} className="h-2 flex-1" />
                  <span className="text-sm font-medium w-12">
                    {Math.round((building.collected / building.units) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Payments & Recent Collections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Pagamentos a Fornecedores
            </CardTitle>
            <CardDescription>Serviços contratados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendorPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{payment.vendor}</p>
                    <p className="text-sm text-muted-foreground">{payment.service}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">€{payment.amount}</p>
                      <Badge variant={statusColors[payment.status]} className="text-xs">
                        {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                      </Badge>
                    </div>
                    {payment.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Euro className="h-4 w-4 mr-2" />
              Registar Pagamento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Quotas Recentes
            </CardTitle>
            <CardDescription>Últimos pagamentos recebidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{payment.unit} - {payment.building}</p>
                    <p className="text-sm text-muted-foreground">{payment.tenant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{payment.amount}</p>
                    <Badge variant={statusColors[payment.status]} className="text-xs">
                      {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Atraso'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Movimentos</CardTitle>
            <CardDescription>Todas as transações financeiras</CardDescription>
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
              <Input placeholder="Pesquisar..." className="pl-10" />
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
                <SelectItem value="aurora">Ed. Aurora</SelectItem>
                <SelectItem value="belem">Ed. Belém</SelectItem>
                <SelectItem value="central">Ed. Central</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Descrição</TableHead>
                  <TableHead>Edifício</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.unit} - Quota</TableCell>
                    <TableCell>{payment.building}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Receita</Badge>
                    </TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className="font-display font-semibold text-green-600">+€{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[payment.status]}>
                        {payment.status === 'paid' ? 'Pago' : payment.status === 'pending' ? 'Pendente' : 'Atraso'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {vendorPayments.slice(0, 2).map((payment) => (
                  <TableRow key={`vendor-${payment.id}`}>
                    <TableCell className="font-medium">{payment.vendor}</TableCell>
                    <TableCell>Geral</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700">Despesa</Badge>
                    </TableCell>
                    <TableCell>{new Date(payment.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className="font-display font-semibold text-red-600">-€{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[payment.status]}>
                        {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                      </Badge>
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
