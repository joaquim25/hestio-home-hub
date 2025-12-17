import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  produto: [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Integrações', href: '#' },
    { label: 'API', href: '#' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Carreiras', href: '#' },
    { label: 'Contacto', href: '#' },
  ],
  suporte: [
    { label: 'Centro de Ajuda', href: '#' },
    { label: 'Documentação', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Comunidade', href: '#' },
  ],
  legal: [
    { label: 'Privacidade', href: '#' },
    { label: 'Termos', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Licenças', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card/80 backdrop-blur-xl border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Hestio</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Simplificamos a gestão imobiliária em Portugal. A sua casa merece o melhor cuidado.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-display font-semibold mb-4 capitalize">
                {key === 'produto' ? 'Produto' : key === 'empresa' ? 'Empresa' : key === 'suporte' ? 'Suporte' : 'Legal'}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hestio. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com ❤️ em Portugal 🇵🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
