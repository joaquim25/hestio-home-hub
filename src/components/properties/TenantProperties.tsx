import { useState } from 'react';
import { User, Property } from '@/types';
import { PropertyCard } from './PropertyCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  Heart, 
  Bell,
  MapPin,
  Home,
  Star,
} from 'lucide-react';

interface TenantPropertiesProps {
  user: User;
}

const cities = ['Todas', 'Lisboa', 'Porto', 'Cascais', 'Sintra'];
const propertyTypes = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Moradia' },
  { value: 'studio', label: 'Estúdio' },
  { value: 'villa', label: 'Villa' },
];

// Mock saved searches
const savedSearches = [
  { id: 1, name: 'T2 Lisboa Centro', criteria: 'Lisboa, T2, até €1500' },
  { id: 2, name: 'Apartamento Porto', criteria: 'Porto, Apartamento, até €1000' },
];

// Mock favorited properties
const favoritedIds = ['1', '3'];

export function TenantProperties({ user }: TenantPropertiesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavorites, setShowFavorites] = useState(false);

  // Get available properties only
  const availableProperties = mockProperties.filter(p => p.status === 'available');

  const filteredProperties = availableProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'Todas' || property.city === selectedCity;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 'all' || property.bedrooms === parseInt(bedrooms);
    const matchesFavorites = !showFavorites || favoritedIds.includes(property.id);

    return matchesSearch && matchesCity && matchesType && matchesPrice && matchesBedrooms && matchesFavorites;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('Todas');
    setSelectedType('all');
    setPriceRange([0, 5000]);
    setBedrooms('all');
    setShowFavorites(false);
  };

  const hasActiveFilters = searchQuery || selectedCity !== 'Todas' || selectedType !== 'all' || 
    priceRange[0] > 0 || priceRange[1] < 5000 || bedrooms !== 'all';

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Encontrar Casa
        </h1>
        <p className="text-muted-foreground mt-1">
          Descubra o seu próximo lar em Portugal
        </p>
      </div>

      {/* Saved Searches Banner */}
      {savedSearches.length > 0 && (
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Pesquisas Guardadas</p>
                  <p className="text-xs text-muted-foreground">
                    Receba alertas quando surgirem novos imóveis
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {savedSearches.map((search) => (
                  <Badge key={search.id} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {search.name}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-1" />
                  Novo Alerta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por localização, nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-3">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Quartos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="0">T0</SelectItem>
              <SelectItem value="1">T1</SelectItem>
              <SelectItem value="2">T2</SelectItem>
              <SelectItem value="3">T3</SelectItem>
              <SelectItem value="4">T4+</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant={showFavorites ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        {/* Mobile Filters */}
        <div className="flex md:hidden gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <Badge variant="default" className="ml-2">!</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Localização</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Imóvel</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Preço (€/mês)</label>
                    <span className="text-sm text-muted-foreground">
                      €{priceRange[0]} - €{priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={5000}
                    step={100}
                    className="mt-2"
                  />
                </div>

                {hasActiveFilters && (
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            variant={showFavorites ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="hidden md:flex border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredProperties.length} imóveis disponíveis
        </p>
        {showFavorites && (
          <Badge variant="secondary">
            <Heart className="h-3 w-3 mr-1 fill-current" />
            Favoritos
          </Badge>
        )}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 bg-background/80 hover:bg-background"
              >
                <Heart className={`h-4 w-4 ${favoritedIds.includes(property.id) ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Nenhum imóvel encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros para encontrar mais resultados.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>
      )}
    </main>
  );
}
