import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { mockProperties } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyCard } from '@/components/properties/PropertyCard';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  Mail,
  Check,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';

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

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Imóvel não encontrado</h1>
          <Link to="/properties">
            <Button>Voltar aos imóveis</Button>
          </Link>
        </main>
      </div>
    );
  }

  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos imóveis
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <img
                  src={property.images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  variant={statusVariants[property.status]}
                  className="absolute top-4 left-4"
                >
                  {statusLabels[property.status]}
                </Badge>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {property.images.length > 1 && (
                <div className="flex gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Location */}
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.address}, {property.city}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 p-6 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Quartos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Casas de Banho</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{property.area}m²</p>
                  <p className="text-xs text-muted-foreground">Área</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Mapa interativo em breve</p>
                    <p className="text-xs text-muted-foreground mt-1">{property.address}, {property.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Renda Mensal</p>
                  <p className="font-display text-4xl font-bold text-primary">
                    €{property.price.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {property.status === 'available' ? (
                    <>
                      <Button className="w-full" size="lg">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Visita
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        Candidatar-me
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      Imóvel Indisponível
                    </Button>
                  )}
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm font-medium mb-4">Contactar Proprietário</p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      +351 912 345 678
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Imóveis Semelhantes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
