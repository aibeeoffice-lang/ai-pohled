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
import { PREMIUM_PAGE } from '@/data/premiumCopy';

const PremiumPage = () => {
  const { user, hasPremiumAccess } = useAuth();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-premium/5 to-background">
        <NetworkBackground variant="premium" className="absolute inset-0 opacity-30" />
        <div className="container-narrow relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="bg-premium text-premium-foreground mb-4">
              <Crown className="h-3 w-3 mr-1" />
              {PREMIUM_PAGE.hero.badge}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {PREMIUM_PAGE.hero.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {PREMIUM_PAGE.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
                <Sparkles className="h-4 w-4 mr-2" />
                {PREMIUM_PAGE.hero.primaryCta}
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pro?premium=true">{PREMIUM_PAGE.hero.secondaryCta}</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {PREMIUM_PAGE.hero.miniText}
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
              {PREMIUM_PAGE.benefits.title}
            </h2>
            <ul className="space-y-4">
              {PREMIUM_PAGE.benefits.items.map((benefit, index) => (
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
            {PREMIUM_PAGE.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {PREMIUM_PAGE.howItWorks.steps.map((item, index) => (
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
            {PREMIUM_PAGE.pricing.title}
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {PREMIUM_PAGE.pricing.subtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Monthly Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
              <h3 className="font-display text-xl font-bold mb-2">{PREMIUM_PAGE.pricing.monthly.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{PREMIUM_PAGE.pricing.monthly.price}</span>
                <span className="text-muted-foreground"> {PREMIUM_PAGE.pricing.monthly.period}</span>
              </div>
              <p className="text-muted-foreground mb-6">
                {PREMIUM_PAGE.pricing.monthly.description}
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
                <Link to="/checkout?plan=monthly">{PREMIUM_PAGE.pricing.monthly.cta}</Link>
              </Button>
            </div>

            {/* Annual Plan */}
            <div className="p-6 md:p-8 rounded-xl bg-card border-2 border-premium relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-premium text-premium-foreground">
                {PREMIUM_PAGE.pricing.annual.badge}
              </Badge>
              <h3 className="font-display text-xl font-bold mb-2">{PREMIUM_PAGE.pricing.annual.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{PREMIUM_PAGE.pricing.annual.price}</span>
                <span className="text-muted-foreground"> {PREMIUM_PAGE.pricing.annual.period}</span>
              </div>
              <p className="text-muted-foreground mb-6">
                {PREMIUM_PAGE.pricing.annual.description}
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
                <Link to="/checkout?plan=annual">{PREMIUM_PAGE.pricing.annual.cta}</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            {PREMIUM_PAGE.pricing.notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
            <p className="italic mt-2">{PREMIUM_PAGE.pricing.prototypeNote}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container-narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            {PREMIUM_PAGE.faq.title}
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {PREMIUM_PAGE.faq.items.map((item, index) => (
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
            {PREMIUM_PAGE.finalCta.title}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {PREMIUM_PAGE.finalCta.subtitle}
          </p>
          <Button size="lg" onClick={scrollToPricing} className="bg-premium hover:bg-premium/90">
            <Sparkles className="h-4 w-4 mr-2" />
            {PREMIUM_PAGE.finalCta.cta}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {PREMIUM_PAGE.finalCta.miniText}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PremiumPage;
