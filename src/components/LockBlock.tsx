import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LockBlockProps {
  type: 'pro' | 'premium';
}

const LockBlock = ({ type }: LockBlockProps) => {
  if (type === 'pro') {
    return (
      <div className="my-8 p-6 md:p-8 bg-secondary rounded-xl border border-border text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">
          Pokračování je jen pro přihlášené
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Tento článek je v sekci PRO. Přihlas se a dočti ho celý.
        </p>
        <Button asChild size="lg">
          <Link to="/prihlaseni">Přihlásit se</Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Zabere to méně než minutu.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-premium/20 mb-4">
        <Lock className="h-6 w-6 text-premium" />
      </div>
      <h3 className="font-display text-xl font-bold mb-2">
        Tento článek je Premium
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Vidíš první odstavec. Pro zbytek se prosím přihlas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/prihlaseni">Přihlásit se a pokračovat</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Žádný spam. Jen AI.
      </p>
    </div>
  );
};

export default LockBlock;
