import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';
import { NetworkBackground, AIPulse } from '@/components/visuals';

const SectionHeader = ({ title, link, linkText }: { title: string; link: string; linkText: string }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
      <AIPulse variant="separator" className="hidden sm:block" />
    </div>
    <Link to={link} className="text-accent hover:underline font-medium flex items-center gap-1">
      {linkText} <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

const Index = () => {
  const novinky = articles.filter(a => a.section === 'Novinky').slice(0, 6);
  const vysvetleno = articles.filter(a => a.section === 'Vysvětleno').slice(0, 3);
  const navody = articles.filter(a => a.section === 'Návody').slice(0, 3);
  const nastroje = articles.filter(a => a.section === 'Nástroje').slice(0, 3);
  const aiVPraci = articles.filter(a => a.section === 'AI v práci').slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <NetworkBackground variant="hero" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-primary-foreground/60 uppercase tracking-wider">AI Magazín</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              AI, které dává smysl.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 animate-slide-up">
              Novinky, vysvětlení a návody pro běžný život i práci. Bez kouzel, bez paniky.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all">
              <Link to="/newsletter">
                <Mail className="mr-2 h-5 w-5" />
                Odebírat newsletter
              </Link>
            </Button>
          </div>
        </div>
        {/* Decorative gradient orb */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </section>

      {/* Novinky */}
      <section className="container-wide py-12 md:py-16">
        <SectionHeader title="Novinky" link="/novinky" linkText="Všechny novinky" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {novinky.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Vysvětleno */}
      <section className="bg-secondary py-12 md:py-16 relative">
        <div className="container-wide">
          <SectionHeader title="Vysvětleno" link="/vysvetleno" linkText="Celá akademie" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vysvetleno.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Návody */}
      <section className="container-wide py-12 md:py-16">
        <SectionHeader title="Návody a tipy" link="/navody" linkText="Všechny návody" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navody.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Nástroje */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader title="Nástroje a recenze" link="/nastroje" linkText="Všechny nástroje" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nastroje.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* AI v práci */}
      <section className="container-wide py-12 md:py-16">
        <SectionHeader title="AI v práci" link="/ai-v-praci" linkText="Všechny články" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiVPraci.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* PRO Teaser */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16 relative overflow-hidden">
        <NetworkBackground variant="hero" />
        <div className="container-wide text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-premium animate-pulse" />
            <span className="text-sm text-primary-foreground/60 uppercase tracking-wider">Prémiový obsah</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            PRO: Pro ty, co to berou vážně
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Hloubková témata z trhu, výzkumu a praxe. Některý obsah je jen pro přihlášené.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
            <Link to="/pro">Přihlásit se do PRO</Link>
          </Button>
        </div>
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-premium/10 rounded-full blur-3xl" />
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
