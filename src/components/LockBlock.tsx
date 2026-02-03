import { Link, useNavigate } from 'react-router-dom';
import { Crown, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PAYWALL_GUEST, PAYWALL_LOGGED_IN_NO_PREMIUM } from '@/data/premiumCopy';

interface LockBlockProps {
  type: 'guest' | 'logged-in-no-premium';
}

const LockBlock = ({ type }: LockBlockProps) => {
  const navigate = useNavigate();

  const handleSecondaryClick = () => {
    // Navigate back to listing / close paywall
    navigate(-1);
  };

  if (type === 'guest') {
    // Guest paywall - not logged in
    return (
      <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-premium/20 mb-4">
          <Crown className="h-6 w-6 text-premium" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">
          {PAYWALL_GUEST.title}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {PAYWALL_GUEST.text}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-premium hover:bg-premium/90">
            <Link to="/prihlaseni">
              <Sparkles className="h-4 w-4 mr-2" />
              {PAYWALL_GUEST.primaryCta}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/registrace">{PAYWALL_GUEST.secondaryCta}</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          {PAYWALL_GUEST.subtext}
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
  }

  // Logged-in but no Premium/trial
  return (
    <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-premium/20 mb-4">
        <Crown className="h-6 w-6 text-premium" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">
        {PAYWALL_LOGGED_IN_NO_PREMIUM.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {PAYWALL_LOGGED_IN_NO_PREMIUM.text}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg" className="bg-premium hover:bg-premium/90">
          <Link to="/predplatne">
            <Crown className="h-4 w-4 mr-2" />
            {PAYWALL_LOGGED_IN_NO_PREMIUM.primaryCta}
          </Link>
        </Button>
      </div>
      <button 
        onClick={handleSecondaryClick}
        className="text-sm text-muted-foreground hover:text-foreground mt-4 underline cursor-pointer"
      >
        {PAYWALL_LOGGED_IN_NO_PREMIUM.secondaryLink}
      </button>
      <p className="text-xs text-muted-foreground mt-2">
        {PAYWALL_LOGGED_IN_NO_PREMIUM.subtext}
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
