import { Link } from 'react-router-dom';
import { Lock, Crown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LockBlockProps {
  type: 'pro' | 'premium';
}

const LockBlock = ({ type }: LockBlockProps) => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const isPremiumActive = user?.isPremiumActive || false;

  if (type === 'pro') {
    return (
      <div className="my-8 p-6 md:p-8 bg-secondary rounded-xl border border-border text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">
          Přihlas se pro čtení
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Tento článek je pro přihlášené. Přihlas se a dočti ho celý.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/prihlaseni">Přihlásit se</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/registrace">Vytvořit účet</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Zabere to méně než minutu.
        </p>
      </div>
    );
  }

  // Premium paywall
  return (
    <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-premium/20 mb-4">
        <Crown className="h-6 w-6 text-premium" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">
        Tento článek je Premium
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Vidíš první odstavec. Pro zbytek potřebuješ aktivní Premium.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {isLoggedIn ? (
          // Logged in but not premium
          <Button asChild size="lg" className="bg-premium hover:bg-premium/90">
            <Link to="/predplatne">
              <Crown className="h-4 w-4 mr-2" />
              Získat Premium
            </Link>
          </Button>
        ) : (
          // Guest
          <>
            <Button asChild size="lg">
              <Link to="/prihlaseni">Přihlásit se</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/registrace">Vytvořit účet</Link>
            </Button>
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Kdykoliv můžeš zrušit. Žádný spam. Jen AI.
      </p>
      
      {/* Why Premium tooltip */}
      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-3 w-3" />
              Proč je to Premium?
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">
              Premium články jsou hloubkové a připravené s větším úsilím (data, schémata, praxe). 
              Předplatné nám pomáhá držet kvalitu a vydávat pravidelně.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default LockBlock;
