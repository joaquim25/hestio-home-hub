import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  CreditCard,
  Scale,
  Brain,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Star,
  Check,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockTestimonials, mockPricingPlans } from '@/lib/mock-data';

const features = [
  {
    icon: Building2,
    title: 'Gestão de Imóveis',
    description: 'Gerencie todas as suas propriedades num único lugar. Controle de contratos, inquilinos e documentação.',
  },
  {
    icon: CreditCard,
    title: 'Processamento de Pagamentos',
    description: 'Receba e faça pagamentos de forma segura. Lembretes automáticos e histórico completo.',
  },
  {
    icon: Scale,
    title: 'Conformidade Legal',
    description: 'Mantenha-se em dia com a legislação portuguesa. Contratos atualizados e alertas importantes.',
  },
  {
    icon: Brain,
    title: 'Recomendações com IA',
    description: 'Sugestões inteligentes de preços, manutenção preventiva e otimização de portfolio.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Integrada',
    description: 'Chat direto entre inquilinos, proprietários e agentes. Tudo documentado e organizado.',
  },
  {
    icon: TrendingUp,
    title: 'Análise Financeira',
    description: 'Relatórios detalhados de rendimentos, despesas e retorno sobre investimento.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-page">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Glassmorphic badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-border/50 shadow-soft mb-8 animate-fade-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">A nova era da gestão imobiliária em Portugal</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up leading-tight">
              Simplifique a Gestão{' '}
              <span className="text-primary">Imobiliária</span>{' '}
              em Portugal
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Plataforma completa para proprietários, inquilinos, agentes e gestores de condomínio. 
              Pagamentos, manutenção, documentos e comunicação - tudo num só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register">
                <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-soft hover:shadow-soft-lg transition-all">
                  Começar Gratuitamente
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl bg-card/60 backdrop-blur-sm border-border/50">
                  Ver Demonstração
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground animate-fade-up flex-wrap" style={{ animationDelay: '0.3s' }}>
              {[
                'Sem cartão de crédito',
                'Configuração em 2 minutos',
                'Suporte em português'
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">Funcionalidades</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo o que precisa para gerir imóveis
            </h2>
            <p className="text-muted-foreground">
              Do primeiro contacto ao fim do contrato, o Hestio acompanha todo o ciclo de vida do arrendamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="glass-card group hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 px-4 py-1.5">Preços</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planos para cada necessidade
            </h2>
            <p className="text-muted-foreground">
              Comece gratuitamente e escale conforme o seu portfolio cresce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mockPricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`glass-card relative transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted 
                    ? 'border-primary/50 shadow-soft-lg ring-1 ring-primary/20' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-soft">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-display text-lg">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price === -1 ? (
                      <span className="font-display text-3xl font-bold">Personalizado</span>
                    ) : (
                      <>
                        <span className="font-display text-4xl font-bold text-primary">€{plan.price}</span>
                        {plan.price > 0 && <span className="text-muted-foreground">/mês</span>}
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 border-t border-border/50">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 rounded-xl ${
                      plan.highlighted 
                        ? '' 
                        : 'bg-card/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-muted/50'
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.price === -1 ? 'Contactar Vendas' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5">Testemunhos</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que dizem os nossos clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Glassmorphic CTA card */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Background effects */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/30 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-[80px]" />
            
            <div className="relative bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 p-12 md:p-16 text-center shadow-soft-lg">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Pronto para simplificar a gestão dos seus imóveis?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                Junte-se a milhares de proprietários, inquilinos e agentes que já confiam no Hestio 
                para gerir o seu património imobiliário.
              </p>
              <Link to="/register">
                <Button size="lg" className="text-base px-10 py-6 rounded-xl shadow-soft hover:shadow-soft-lg transition-all">
                  Criar Conta Gratuita
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
