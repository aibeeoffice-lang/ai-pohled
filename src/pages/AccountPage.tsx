import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/prihlaseni');
    return null;
  }

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Můj účet</h1>
          <p className="text-muted-foreground mb-8">Přihlášen jako: <strong>{user.email}</strong></p>
          <Button onClick={handleLogout} variant="outline">Odhlásit se</Button>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
