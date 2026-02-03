import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Check, X, Settings, AlertTriangle, Clock, Sparkles, CreditCard, FileText } from 'lucide-react';
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
import { ACCOUNT_PREMIUM, getPriceByPlan } from '@/data/premiumCopy';

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
  const planPrice = getPriceByPlan(user.premiumPlan);

  // Calculate next billing date (for active state)
  const getNextBillingDate = () => {
    if (!user.premiumSince) return '-';
    const since = new Date(user.premiumSince);
    if (user.premiumPlan === 'annual') {
      since.setFullYear(since.getFullYear() + 1);
    } else {
      since.setMonth(since.getMonth() + 1);
    }
    return formatDate(since.toISOString());
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
              <h2 className="font-display text-xl font-semibold">
                {isTrialing ? ACCOUNT_PREMIUM.trial.title : ACCOUNT_PREMIUM.sectionTitle}
              </h2>
            </div>

            {isTrialing ? (
              // Trialing state
              <div className="p-6 rounded-xl bg-gradient-to-br from-premium/10 to-premium/5 border border-premium/20">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-premium text-premium-foreground">
                    <Check className="h-3 w-3 mr-1" />
                    {ACCOUNT_PREMIUM.trial.status}
                  </Badge>
                  {user.premiumCancelAtPeriodEnd && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Zrušeno
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">
                  {ACCOUNT_PREMIUM.trial.text(formatDate(user.trialEndsAt), planPrice)}
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
                    {ACCOUNT_PREMIUM.trial.cancelledText(formatDate(user.trialEndsAt))}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          {ACCOUNT_PREMIUM.trial.buttons.cancel}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{ACCOUNT_PREMIUM.trial.cancelModal.title}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {ACCOUNT_PREMIUM.trial.cancelModal.text}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{ACCOUNT_PREMIUM.trial.cancelModal.cancelCta}</AlertDialogCancel>
                          <AlertDialogAction onClick={cancelPremium}>
                            {ACCOUNT_PREMIUM.trial.cancelModal.confirmCta}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/predplatne">
                        <Settings className="h-4 w-4 mr-2" />
                        {ACCOUNT_PREMIUM.trial.buttons.changePlan}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {ACCOUNT_PREMIUM.trial.buttons.changePayment}
                    </Button>
                  </div>
                )}
              </div>
            ) : isActive ? (
              // Active state
              <div className="p-6 rounded-xl bg-gradient-to-br from-premium/10 to-premium/5 border border-premium/20">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-premium text-premium-foreground">
                    <Check className="h-3 w-3 mr-1" />
                    {ACCOUNT_PREMIUM.active.status}
                  </Badge>
                  {user.premiumCancelAtPeriodEnd && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Zrušeno
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">
                  {ACCOUNT_PREMIUM.active.text(getNextBillingDate(), planPrice)}
                </p>

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
                    {ACCOUNT_PREMIUM.active.cancelledText}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          {ACCOUNT_PREMIUM.active.buttons.cancel}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{ACCOUNT_PREMIUM.active.cancelModal.title}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {ACCOUNT_PREMIUM.active.cancelModal.text}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{ACCOUNT_PREMIUM.active.cancelModal.cancelCta}</AlertDialogCancel>
                          <AlertDialogAction onClick={cancelPremium}>
                            {ACCOUNT_PREMIUM.active.cancelModal.confirmCta}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/predplatne">
                        <Settings className="h-4 w-4 mr-2" />
                        {ACCOUNT_PREMIUM.active.buttons.changePlan}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {ACCOUNT_PREMIUM.active.buttons.changePayment}
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <FileText className="h-4 w-4 mr-2" />
                      {ACCOUNT_PREMIUM.active.buttons.invoices}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // No premium
              <div className="p-6 rounded-xl bg-secondary border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{ACCOUNT_PREMIUM.none.status}</Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  {ACCOUNT_PREMIUM.none.text}
                </p>
                <Button asChild className="bg-premium hover:bg-premium/90">
                  <Link to="/predplatne">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {ACCOUNT_PREMIUM.none.cta}
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
