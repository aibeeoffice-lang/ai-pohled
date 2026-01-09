import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';

const Index = () => {
  const novinky = articles.filter(a => a.section === 'Novinky').slice(0, 6);
  const vysvetleno = articles.filter(a => a.section === 'Vysvětleno').slice(0, 3);
  const navody = articles.filter(a => a.section === 'Návody').slice(0, 3);
  const nastroje = articles.filter(a => a.section === 'Nástroje').slice(0, 3);
  const aiVPraci = articles.filter(a => a.section === 'AI v práci').slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              AI, které dává smysl.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 animate-slide-up">
              Novinky, vysvětlení a návody pro běžný život i práci. Bez kouzel, bez paniky.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/newsletter">
                  <Mail className="mr-2 h-5 w-5" />
                  Odebírat newsletter
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/vysvetleno">
                  Začít ve Vysvětleno
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Novinky */}
      <section className="container-wide py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Novinky</h2>
          <Link to="/novinky" className="text-accent hover:underline font-medium flex items-center gap-1">
            Všechny novinky <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {novinky.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Vysvětleno */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Vysvětleno</h2>
            <Link to="/vysvetleno" className="text-accent hover:underline font-medium flex items-center gap-1">
              Celá akademie <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vysvetleno.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Návody */}
      <section className="container-wide py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Návody a tipy</h2>
          <Link to="/navody" className="text-accent hover:underline font-medium flex items-center gap-1">
            Všechny návody <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navody.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Nástroje */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Nástroje a recenze</h2>
            <Link to="/nastroje" className="text-accent hover:underline font-medium flex items-center gap-1">
              Všechny nástroje <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nastroje.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* AI v práci */}
      <section className="container-wide py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">AI v práci</h2>
          <Link to="/ai-v-praci" className="text-accent hover:underline font-medium flex items-center gap-1">
            Všechny články <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiVPraci.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* PRO Teaser */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            PRO: Pro ty, co to berou vážně
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Hloubková témata z trhu, výzkumu a praxe. Některý obsah je jen pro přihlášené.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/pro">Přihlásit se do PRO</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-wide py-12 md:py-16">
        <div className="max-w-xl mx-auto text-center">
          <NewsletterSignup variant="hero" />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
