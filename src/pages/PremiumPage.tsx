import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AIPulse, NetworkBackground } from '@/components/visuals';

const PremiumPage = () => {
  const { user, hasPremiumAccess } = useAuth();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    'Plný přístup k Premium článkům',
    'Grafy, schémata a checklisty',
    'Hloubkové analýzy a praktické postupy',
    'Bez reklam v Premium obsahu',
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Spusť trial',
      description: 'Zadej kartu a aktivuj 14denní trial zdarma.',
    },
    {
      step: '2',
      title: 'Čti Premium',
      description: 'Odemkni všechny Premium články, grafy a checklisty.',
    },
    {
      step: '3',
      title: 'Rozhodni se',
      description: 'Po 14 dnech se spustí platba. Zrušit můžeš kdykoliv.',
    },
  ];

  const faqItems = [
    {
      question: 'Jak funguje 14denní trial?',
      answer: 'Po zadání karty máš 14 dní plný přístup zdarma. Pokud nezrušíš, po 14 dnech se spustí platba podle zvoleného plánu.',
    },
    {
      question: 'Kdy se strhne platba?',
      answer: 'Až po uplynutí 14denního trialu. Před koncem ti pošleme připomínku.',
    },
    {
      question: 'Můžu Premium kdykoliv zrušit?',
      answer: 'Ano. Zrušit můžeš kdykoliv v účtu. Přístup běží do konce zaplaceného období.',
    },
    {
      question: 'Co se stane po zrušení?',
      answer: 'Přístup k Premium obsahu končí na konci období. Tvůj účet a přístup k běžným článkům zůstává.',
    },
    {
      question: 'Dostanu fakturu?',
      answer: 'Ano, faktura bude k dispozici v e-mailu a/nebo v účtu.',
    },
    {
      question: 'Je Premium pro jednotlivce nebo firmy?',
      answer: 'Primárně pro jednotlivce. Pro firmy lze řešit více licencí – napiš nám.',
    },
    {
      question: 'Co když nejsem technický typ?',
      answer: 'Premium je psané prakticky a srozumitelně. Vizuály (grafy, schémata) pomáhají rychle pochopit podstatu.',
    },
    {
      question: 'Proč je část obsahu placená?',
      answer: 'Premium články jsou náročnější na přípravu (analýza, grafy, schémata). Předplatné pomáhá udržet kvalitu a pravidelnost.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-premium/5 to-background">
        <NetworkBackground variant="premium" className="absolute inset-0 opacity-30" />
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-premium text-premium-foreground mb-4">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Odemkni hloubku, kterou jinde nenajdeš
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Premium ti dá přístup k článkům s daty, grafy a checklisty. Žádné povrchní shrnutí – jen praxe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
                <Sparkles className="h-4 w-4 mr-2" />
                Spustit 14 dní zdarma
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pro?premium=true">Prohlédnout Premium články</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Pak 49 Kč/měsíc. Zrušení kdykoliv.
            </p>
          </div>
        </div>
      </section>

      <AIPulse variant="section" />

      {/* What Premium Unlocks */}
      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              Co Premium odemkne
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-premium/20 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-premium" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-12 text-center">
            Jak Premium funguje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-premium/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-premium font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIPulse variant="section" />

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20">
        <div className="container-narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-center">
            Vyber si Premium plán hned
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Obě varianty začínají 14denním trialem zdarma.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
              <h3 className="font-display text-xl font-bold mb-2">Měsíční</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">49 Kč</span>
                <span className="text-muted-foreground"> / měsíc</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Flexibilní, zrušíš kdykoliv.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  14 dní zdarma
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Plný přístup k Premium
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Grafy, schémata, checklisty
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/checkout?plan=monthly">Spustit měsíční předplatné</Link>
              </Button>
            </div>

            {/* Annual Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border-2 border-premium relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-premium text-premium-foreground">
                Nejvýhodnější
              </Badge>
              <h3 className="font-display text-xl font-bold mb-2">Roční</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">399 Kč</span>
                <span className="text-muted-foreground"> / rok</span>
              </div>
              <p className="text-sm text-premium mb-2">Ušetříš 2 měsíce oproti měsíčnímu.</p>
              <p className="text-muted-foreground mb-6">
                Nejlepší poměr cena/výkon.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  14 dní zdarma
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Vše z měsíčního plánu
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Výhodnější cena
                </li>
              </ul>
              <Button asChild className="w-full bg-premium hover:bg-premium/90">
                <Link to="/checkout?plan=annual">Spustit roční předplatné</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>✓ Trial = 14 dní zdarma, potřebuješ zadat kartu.</p>
            <p>✓ Zrušení kdykoliv, bez otázek.</p>
            <p className="italic mt-2">V prototypu je platba simulovaná.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            Časté otázky
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-premium/5">
        <div className="container-narrow text-center">
          <Crown className="h-12 w-12 text-premium mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Připraven(a) na Premium?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Spusť 14denní trial a odemkni hloubkové články s grafy a checklisty.
          </p>
          <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
            <Sparkles className="h-4 w-4 mr-2" />
            Spustit 14 dní zdarma
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Pak 49 Kč/měsíc. Zrušení kdykoliv.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PremiumPage;
