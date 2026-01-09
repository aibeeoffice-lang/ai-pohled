import { Link } from 'react-router-dom';
import NewsletterSignup from '@/components/NewsletterSignup';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">AI</span>
              </div>
              <span className="font-display font-bold text-xl">Magazín</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              AI, které dává smysl. Novinky, vysvětlení a návody pro běžný život i práci.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-semibold mb-4">Sekce</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/novinky" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Novinky
                </Link>
              </li>
              <li>
                <Link to="/vysvetleno" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Vysvětleno
                </Link>
              </li>
              <li>
                <Link to="/navody" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Návody
                </Link>
              </li>
              <li>
                <Link to="/nastroje" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Nástroje
                </Link>
              </li>
              <li>
                <Link to="/ai-v-praci" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  AI v práci
                </Link>
              </li>
              <li>
                <Link to="/pro" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  PRO
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4">Informace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/newsletter" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} AI Magazín. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
