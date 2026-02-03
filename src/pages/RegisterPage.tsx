import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Client-side validation
    if (!email) {
      setError('Zadej prosím e-mail.');
      return;
    }
    if (!password) {
      setError('Zadej prosím heslo.');
      return;
    }
    if (password.length < 3) {
      setError('Heslo musí mít alespoň 3 znaky.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Hesla se neshodují.');
      return;
    }

    setLoading(true);
    
    const result = await register(email, password);
    
    if (result.success) {
      setSuccess(true);
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/pro');
      }, 1500);
    } else {
      setError(result.error || 'Něco se pokazilo.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <Layout>
        <div className="container-narrow py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Hotovo!</h1>
            <p className="text-muted-foreground">Účet je vytvořen. Přesměrováváme tě...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold mb-2">Vytvořit účet</h1>
          <p className="text-muted-foreground mb-6">
            Vytvoř si účet a odemkni Premium (14 dní zdarma po zadání karty).
          </p>
          <p className="text-sm text-muted-foreground/80 mb-8">
            PRO je zdarma pro všechny. Premium je pro hloubkové články a materiály.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="vas@email.cz" 
              />
            </div>
            <div>
              <Label htmlFor="password">Heslo</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Alespoň 3 znaky" 
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirm">Heslo znovu</Label>
              <Input 
                id="passwordConfirm" 
                type="password" 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
                placeholder="Zopakuj heslo" 
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="consent" 
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
              />
              <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                Souhlasím se zpracováním údajů pro účely vytvoření účtu.
              </Label>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Vytvářím účet...' : 'Vytvořit účet'}
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Už máš účet?{' '}
            <Link to="/prihlaseni" className="text-primary hover:underline font-medium">
              Přihlásit se
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
