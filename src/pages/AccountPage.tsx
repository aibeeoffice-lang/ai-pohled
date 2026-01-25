import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, X, Settings, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AccountPage = () => {
  const { user, logout, cancelPremium } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/prihlaseni');
    return null;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-3xl font-bold mb-2">Můj účet</h1>
          <p className="text-muted-foreground mb-8">
            Přihlášen jako: <strong>{user.email}</strong>
          </p>

          <Separator className="my-8" />

          {/* Subscription Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-5 w-5 text-premium" />
              <h2 className="font-display text-xl font-semibold">Předplatné</h2>
            </div>

            {user.isPremiumActive ? (
              <div className="p-6 rounded-xl bg-gradient-to-br from-premium/10 to-premium/5 border border-premium/20">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-premium text-premium-foreground">
                    <Check className="h-3 w-3 mr-1" />
                    Aktivní
                  </Badge>
                  {user.premiumCancelAtPeriodEnd && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Zrušeno
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plán:</span>
                    <span className="font-medium">
                      {user.premiumPlan === 'annual' ? 'Roční' : 'Měsíční'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Aktivní od:</span>
                    <span className="font-medium">{formatDate(user.premiumSince)}</span>
                  </div>
                </div>

                {user.premiumCancelAtPeriodEnd ? (
                  <p className="text-sm text-orange-600 mb-4">
                    Po zrušení poběží Premium do konce zaplaceného období.
                  </p>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Zrušit předplatné
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Zrušit Premium?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Po zrušení budeš mít přístup k Premium článkům do konce zaplaceného období. Poté se přístup deaktivuje.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Zpět</AlertDialogCancel>
                          <AlertDialogAction onClick={cancelPremium}>
                            Potvrdit zrušení
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/predplatne">
                        <Settings className="h-4 w-4 mr-2" />
                        Změnit plán
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-secondary border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Neaktivní</Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Premium odemkne hloubkové články včetně grafů, schémat a checklistů.
                </p>
                <Button asChild className="bg-premium hover:bg-premium/90">
                  <Link to="/predplatne">
                    <Crown className="h-4 w-4 mr-2" />
                    Získat Premium
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-8" />

          {/* Account Actions */}
          <div className="flex flex-col gap-3">
            <Button onClick={handleLogout} variant="outline">
              Odhlásit se
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
