import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, X, Settings, AlertTriangle, Clock, Sparkles } from 'lucide-react';
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
  const { user, logout, cancelPremium, hasPremiumAccess } = useAuth();
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

  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const isTrialing = user.premiumStatus === 'trialing';
  const isActive = user.premiumStatus === 'active';
  const trialDaysRemaining = isTrialing ? getDaysRemaining(user.trialEndsAt) : 0;

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
              <h2 className="font-display text-xl font-semibold">Premium</h2>
            </div>

            {isTrialing ? (
              // Trialing state
              <div className="p-6 rounded-xl bg-gradient-to-br from-premium/10 to-premium/5 border border-premium/20">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-premium text-premium-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Trial aktivní
                  </Badge>
                  {user.premiumCancelAtPeriodEnd && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Zrušeno
                    </Badge>
                  )}
                </div>

                <p className="text-lg font-medium mb-2">
                  Zbývá {trialDaysRemaining} {trialDaysRemaining === 1 ? 'den' : trialDaysRemaining < 5 ? 'dny' : 'dní'} trialu
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Po skončení trialu se spustí platba {user.premiumPlan === 'annual' ? '399 Kč/rok' : '49 Kč/měsíc'}.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plán:</span>
                    <span className="font-medium">
                      {user.premiumPlan === 'annual' ? 'Roční' : 'Měsíční'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trial končí:</span>
                    <span className="font-medium">{formatDate(user.trialEndsAt)}</span>
                  </div>
                </div>

                {user.premiumCancelAtPeriodEnd ? (
                  <p className="text-sm text-orange-600">
                    Trial byl zrušen. Premium skončí {formatDate(user.trialEndsAt)}.
                  </p>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Zrušit trial
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Zrušit trial?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Pokud zrušíš, Premium vyprší na konci trialu ({formatDate(user.trialEndsAt)}). Platba se nestrhne.
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
                )}
              </div>
            ) : isActive ? (
              // Active state
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

                <p className="text-lg font-medium mb-4">Máš plný přístup k Premium obsahu.</p>

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
                    Premium bylo zrušeno. Přístup poběží do konce zaplaceného období.
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
              // No premium
              <div className="p-6 rounded-xl bg-secondary border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">Neaktivní</Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Premium ti dá přístup k hloubkovým článkům, grafům a checklistům. Spusť 14denní trial zdarma.
                </p>
                <Button asChild className="bg-premium hover:bg-premium/90">
                  <Link to="/predplatne">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Spustit 14denní trial
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
