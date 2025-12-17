import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Clock, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VendorPropertiesProps {
  user: User;
}

// Mock client properties/buildings
const clientLocations = [
  { id: 1, name: 'Edifício Aurora', address: 'Av. da Liberdade, 120, Lisboa', activeOrders: 2, totalOrders: 15 },
  { id: 2, name: 'Residencial Tejo', address: 'Rua do Comércio, 45, Lisboa', activeOrders: 1, totalOrders: 8 },
  { id: 3, name: 'Condomínio Estrela', address: 'Rua da Estrela, 78, Lisboa', activeOrders: 0, totalOrders: 12 },
  { id: 4, name: 'T3 Cascais Mar', address: 'Av. Marginal, 200, Cascais', activeOrders: 1, totalOrders: 5 },
];

export function VendorProperties({ user }: VendorPropertiesProps) {
  const totalActiveOrders = clientLocations.reduce((acc, l) => acc + l.activeOrders, 0);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Locais de Trabalho
        </h1>
        <p className="text-muted-foreground mt-1">
          Imóveis e edifícios onde presta serviços
        </p>
      </div>

      {/* Summary */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-transparent">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tem</p>
              <p className="text-2xl font-bold">
                <span className="text-primary">{totalActiveOrders}</span> ordens de trabalho ativas
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                em {clientLocations.filter(l => l.activeOrders > 0).length} locais diferentes
              </p>
            </div>
            <Button asChild>
              <Link to="/maintenance">
                <Wrench className="h-4 w-4 mr-2" />
                Ver Todas as Ordens
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Locations */}
      <div className="grid gap-4 md:grid-cols-2">
        {clientLocations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {location.address}
                    </p>
                  </div>
                </div>
                {location.activeOrders > 0 && (
                  <Badge variant="default">
                    {location.activeOrders} {location.activeOrders === 1 ? 'ativa' : 'ativas'}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Wrench className="h-4 w-4" />
                    {location.totalOrders} trabalhos realizados
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  Ver Histórico
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
