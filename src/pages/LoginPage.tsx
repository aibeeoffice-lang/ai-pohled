import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/ucet');
    } else {
      setError(result.error || 'Něco se pokazilo.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl font-bold mb-2">Přihlášení</h1>
          <p className="text-muted-foreground mb-8">Odemkni PRO obsah a pokračuj tam, kde jsi skončil.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.cz" />
            </div>
            <div>
              <Label htmlFor="password">Heslo</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Přihlašuji...' : 'Přihlásit se'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
