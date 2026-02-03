import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Crown, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ThankYouPage = () => {
  const { user } = useAuth();
  const isTrialing = user?.premiumStatus === 'trialing';

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-premium/20 mb-6">
            <Sparkles className="h-10 w-10 text-premium" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {isTrialing ? 'Trial je aktivní!' : 'Premium je aktivní!'}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {isTrialing 
              ? `Máš 14 dní plného přístupu zdarma. Trial končí ${formatDate(user?.trialEndsAt)}.`
              : 'Máš plný přístup k Premium článkům, grafům a checklistům.'
            }
          </p>

          <div className="p-6 rounded-xl bg-secondary border border-border mb-8 text-left">
            <h2 className="font-semibold mb-4">Co teď můžeš dělat:</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-premium flex-shrink-0 mt-0.5" />
                <span>Číst všechny Premium články bez omezení</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-premium flex-shrink-0 mt-0.5" />
                <span>Prohlížet grafy, schémata a checklisty</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-premium flex-shrink-0 mt-0.5" />
                <span>Spravovat předplatné v sekci Můj účet</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-premium hover:bg-premium/90">
              <Link to="/pro?premium=true">
                <Crown className="h-4 w-4 mr-2" />
                Prohlédnout Premium články
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/ucet">
                Můj účet
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
