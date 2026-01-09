import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'hero' | 'footer' | 'article';
}

const NewsletterSignup = ({ variant = 'default' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Zadej prosím platný e-mail.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Je potřeba souhlasit se zpracováním e-mailu.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch {
      setStatus('error');
      setErrorMessage('Něco se pokazilo. Zkus to prosím znovu.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${variant === 'footer' ? 'text-primary-foreground' : ''}`}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-5 w-5 text-level-beginner" />
          <span className="font-semibold">Hotovo!</span>
        </div>
        <p className={`text-sm ${variant === 'footer' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          Díky. První e-mail dorazí při nejbližším vydání.
        </p>
      </div>
    );
  }

  const isFooter = variant === 'footer';
  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {variant !== 'footer' && (
        <div className="mb-4">
          {isHero ? (
            <>
              <h3 className="text-2xl font-display font-bold mb-2">Chceš AI přehled do e-mailu?</h3>
              <p className="text-muted-foreground">
                1× týdně výběr toho důležitého + praktické tipy. Bez balastu.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg mb-1">Chceš AI přehled do e-mailu?</h3>
              <p className="text-sm text-muted-foreground">
                1× týdně výběr toho důležitého + praktické tipy. Bez balastu.
              </p>
            </>
          )}
        </div>
      )}

      <div className={`flex gap-2 ${isHero ? 'flex-col sm:flex-row' : ''}`}>
        <Input
          type="email"
          placeholder="Zadej e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 ${isFooter ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50' : ''}`}
        />
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className={isFooter ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}
        >
          {status === 'loading' ? 'Odesílám...' : 'Odebírat'}
        </Button>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id={`consent-${variant}`}
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked === true)}
          className={isFooter ? 'border-primary-foreground/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent' : ''}
        />
        <label
          htmlFor={`consent-${variant}`}
          className={`text-xs leading-snug cursor-pointer ${isFooter ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
        >
          Souhlasím se zpracováním e-mailu pro zasílání newsletteru.
        </label>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
};

export default NewsletterSignup;
