import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { mockProperties } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const cities = ['Todas', 'Lisboa', 'Porto', 'Cascais', 'Sintra'];
const propertyTypes = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'house', label: 'Moradia' },
  { value: 'studio', label: 'Estúdio' },
  { value: 'villa', label: 'Villa' },
];

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === 'Todas' || property.city === selectedCity;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesBedrooms = bedrooms === 'all' || property.bedrooms === parseInt(bedrooms);

    return matchesSearch && matchesCity && matchesType && matchesPrice && matchesBedrooms;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('Todas');
    setSelectedType('all');
    setPriceRange([0, 5000]);
    setBedrooms('all');
  };

  const hasActiveFilters = searchQuery || selectedCity !== 'Todas' || selectedType !== 'all' || 
    priceRange[0] > 0 || priceRange[1] < 5000 || bedrooms !== 'all';

  const FiltersContent = () => (
    <div className="space-y-6">
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
        <label className="text-sm font-medium mb-2 block">Quartos</label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Número de quartos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="0">Estúdio (T0)</SelectItem>
            <SelectItem value="1">T1</SelectItem>
            <SelectItem value="2">T2</SelectItem>
            <SelectItem value="3">T3</SelectItem>
            <SelectItem value="4">T4+</SelectItem>
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
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Imóveis</h1>
          <p className="text-muted-foreground mt-1">
            Encontre o imóvel perfeito para si
          </p>
        </div>

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
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
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
            {filteredProperties.length} imóveis encontrados
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
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
    </div>
  );
}
