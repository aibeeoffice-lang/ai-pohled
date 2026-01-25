import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AIPulse, NetworkBackground } from '@/components/visuals';

const PremiumPage = () => {
  const { user } = useAuth();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    'Plný přístup k Premium článkům',
    'Grafy, schémata a praktické checklisty',
    'Konkrétní postupy a frameworky z praxe',
    'Aktivace hned po zaplacení',
  ];

  const faqItems = [
    {
      question: 'Co je rozdíl mezi PRO a Premium?',
      answer: 'PRO je obsah pro přihlášené (bez placení). Premium je placené předplatné pro hloubkové články s grafikou, schématy a praktickými materiály.',
    },
    {
      question: 'Co přesně odemknu s Premium?',
      answer: 'Plný přístup k Premium článkům (včetně kompletního textu, grafů, schémat a checklistů).',
    },
    {
      question: 'Můžu Premium kdykoliv zrušit?',
      answer: 'Ano. V ostrém provozu můžeš zrušit kdykoliv v účtu. Přístup běží do konce zaplaceného období.',
    },
    {
      question: 'Dostanu fakturu?',
      answer: 'Ano, v ostrém provozu bude faktura k dispozici v e-mailu a/nebo v účtu. (V prototypu je platba simulovaná.)',
    },
    {
      question: 'Je Premium pro jednotlivce nebo firmy?',
      answer: 'Primárně pro jednotlivce. Pro firmy lze řešit více licencí.',
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
              Premium
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Odemkni hloubkové články, grafy, schémata a checklisty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
                <Crown className="h-4 w-4 mr-2" />
                Vybrat plán
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pro?premium=true">Prohlédnout Premium články</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AIPulse variant="section" />

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              Co dostaneš s Premium
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

      {/* What Premium Unlocks */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Co Premium odemkne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nejen delší text. Hlavně strukturu a praxi: konkrétní kroky, měření přínosu, 
              ukázkové workflow a vizuální vysvětlení věcí, které se v AI často zbytečně komplikují.
            </p>
          </div>
        </div>
      </section>

      <AIPulse variant="section" />

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-secondary">
        <div className="container-narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            Vyber si plán
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
              <h3 className="font-display text-xl font-bold mb-2">Měsíčně</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">49 Kč</span>
                <span className="text-muted-foreground"> / měsíc</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Ideální na vyzkoušení a průběžné čtení.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Premium články
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Grafy a schémata
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-premium" />
                  Checklisty v článcích
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/checkout?plan=monthly">Pokračovat k platbě</Link>
              </Button>
            </div>

            {/* Annual Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border-2 border-premium relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-premium text-premium-foreground">
                Nejvýhodnější
              </Badge>
              <h3 className="font-display text-xl font-bold mb-2">Ročně</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">399 Kč</span>
                <span className="text-muted-foreground"> / rok</span>
              </div>
              <p className="text-sm text-premium mb-2">Ušetříš oproti měsíčnímu.</p>
              <p className="text-muted-foreground mb-6">
                Nejlepší poměr cena/výkon.
              </p>
              <ul className="space-y-3 mb-6">
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
                <Link to="/checkout?plan=annual">Pokračovat k platbě</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground space-y-1">
            <p>✓ Aktivace hned po zaplacení.</p>
            <p>✓ Zrušení kdykoliv.</p>
            <p className="italic">V ostrém provozu bude platba přes platební bránu (v prototypu simulováno).</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
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
            Odemkni si přístup k hloubkovým článkům a praktickým materiálům.
          </p>
          <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
            <Crown className="h-4 w-4 mr-2" />
            Vybrat plán
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default PremiumPage;
