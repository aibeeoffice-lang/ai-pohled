import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CHECKOUT_PAGE, getPriceByPlan } from '@/data/premiumCopy';

const CheckoutPage = () => {
  const { user, startTrial } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = searchParams.get('plan') as 'monthly' | 'annual' | null;
  const planName = plan === 'annual' ? 'Roční' : 'Měsíční';
  const planPrice = getPriceByPlan(plan);

  useEffect(() => {
    // Redirect guests to login
    if (!user) {
      navigate('/prihlaseni?redirect=/checkout?plan=' + (plan || 'monthly'));
    }
  }, [user, navigate, plan]);

  const handleCheckout = async () => {
    if (!agreed || !plan) return;
    
    setIsProcessing(true);
    
    // Simulate card validation / payment setup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Start 14-day trial
    startTrial(plan);
    navigate('/premium-dekuji');
  };

  if (!user) {
    return (
      <Layout>
        <div className="container-narrow py-16 md:py-24">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {CHECKOUT_PAGE.guestAlert}
            </AlertDescription>
          </Alert>
          <div className="flex gap-4 mt-6 justify-center">
            <Button asChild>
              <Link to={`/prihlaseni?redirect=/checkout?plan=${plan || 'monthly'}`}>Přihlásit se</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/registrace">Vytvořit účet</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!plan || (plan !== 'monthly' && plan !== 'annual')) {
    return (
      <Layout>
        <div className="container-narrow py-16 md:py-24 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">{CHECKOUT_PAGE.noPlanSelected.title}</h1>
          <p className="text-muted-foreground mb-6">{CHECKOUT_PAGE.noPlanSelected.text}</p>
          <Button asChild>
            <Link to="/predplatne">{CHECKOUT_PAGE.noPlanSelected.cta}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium/20 mb-4">
              <Crown className="h-8 w-8 text-premium" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">{CHECKOUT_PAGE.h1}</h1>
            <p className="text-muted-foreground">
              {CHECKOUT_PAGE.subtitle}
            </p>
          </div>

          {/* Plan Summary */}
          <div className="p-6 rounded-xl bg-secondary border border-border mb-6">
            <h2 className="font-semibold mb-4">{CHECKOUT_PAGE.summary.title}</h2>
            <ul className="space-y-2 text-sm mb-4">
              {CHECKOUT_PAGE.summary.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-premium" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{CHECKOUT_PAGE.summary.todayLabel}</span>
                <span className="font-bold text-premium">{CHECKOUT_PAGE.summary.todayValue}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">{CHECKOUT_PAGE.summary.afterTrialLabel}</span>
                <span className="font-medium">{planPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Plán:</span>
                <span className="font-medium">{planName}</span>
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3 mb-6">
            <Checkbox 
              id="terms" 
              checked={agreed} 
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              {CHECKOUT_PAGE.checkbox(planPrice)}
            </label>
          </div>

          {/* CTA */}
          <Button 
            onClick={handleCheckout} 
            disabled={!agreed || isProcessing}
            className="w-full bg-premium hover:bg-premium/90"
            size="lg"
          >
            {isProcessing ? (
              CHECKOUT_PAGE.processingText
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {CHECKOUT_PAGE.primaryCta}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {CHECKOUT_PAGE.smallNote}
          </p>

          <div className="mt-6 text-center">
            <Link to="/predplatne" className="text-sm text-muted-foreground hover:text-foreground">
              {CHECKOUT_PAGE.backLink}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
