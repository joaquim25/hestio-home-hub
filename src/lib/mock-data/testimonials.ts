import { Testimonial, PricingPlan } from '@/types';

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ricardo Mendes',
    role: 'Proprietário, Lisboa',
    content: 'O Hestio transformou completamente a forma como giro os meus imóveis. Antes passava horas com papelada, agora tudo está organizado numa única plataforma. Recomendo a todos os senhorios!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sofia Rodrigues',
    role: 'Inquilina, Porto',
    content: 'Finalmente uma plataforma que pensa nos inquilinos! Pagar a renda e comunicar com o senhorio nunca foi tão fácil. A app é intuitiva e o suporte é excelente.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    role: 'Agente Imobiliário, Cascais',
    content: 'Como agente, o Hestio permite-me gerir dezenas de propriedades sem stress. O dashboard é fantástico e as funcionalidades de comunicação poupam-me horas de trabalho por semana.',
    rating: 5,
  },
];

export const mockPricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'month',
    features: [
      '1 propriedade',
      'Gestão de pagamentos básica',
      'Comunicação com inquilinos',
      'Suporte por email',
    ],
  },
  {
    id: 'basic',
    name: 'Básico',
    price: 9.99,
    period: 'month',
    features: [
      'Até 5 propriedades',
      'Gestão completa de pagamentos',
      'Pedidos de manutenção',
      'Relatórios mensais',
      'Suporte prioritário',
    ],
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 29.99,
    period: 'month',
    highlighted: true,
    features: [
      'Propriedades ilimitadas',
      'Todas as funcionalidades',
      'Recomendações com IA',
      'Integração contabilística',
      'API access',
      'Suporte dedicado 24/7',
    ],
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: -1,
    period: 'month',
    features: [
      'Soluções personalizadas',
      'Gestão de condomínios',
      'White-label disponível',
      'Onboarding dedicado',
      'SLA garantido',
      'Gestor de conta dedicado',
    ],
  },
];
