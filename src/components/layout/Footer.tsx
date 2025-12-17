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
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Hestio</span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 mb-6">
              Simplificamos a gestão imobiliária em Portugal. A sua casa merece o melhor cuidado.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Hestio. Todos os direitos reservados.
          </p>
          <p className="text-sm text-secondary-foreground/60">
            Feito com ❤️ em Portugal 🇵🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
