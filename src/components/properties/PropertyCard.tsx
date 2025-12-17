import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

const statusLabels: Record<string, string> = {
  available: 'Disponível',
  occupied: 'Ocupado',
  maintenance: 'Manutenção',
};

const statusVariants: Record<string, 'success' | 'secondary' | 'warning'> = {
  available: 'success',
  occupied: 'secondary',
  maintenance: 'warning',
};

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <Badge
          variant={statusVariants[property.status]}
          className="absolute top-3 left-3"
        >
          {statusLabels[property.status]}
        </Badge>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
          />
        </Button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="font-display text-2xl font-bold text-card">
            €{property.price.toLocaleString()}
          </span>
          <span className="text-sm text-card/80">/mês</span>
        </div>
      </div>

      <CardContent className="p-4">
        <Link to={`/properties/${property.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Square className="h-4 w-4" />
            <span>{property.area}m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
