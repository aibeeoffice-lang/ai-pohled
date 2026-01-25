import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Crown, BookOpen, Settings, CheckCircle } from 'lucide-react';
import { AIPulse } from '@/components/visuals';

const ThankYouPage = () => {
  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-premium/20 mb-6">
            <CheckCircle className="h-10 w-10 text-premium" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Díky! Premium je aktivní.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Máš odemčený přístup k Premium článkům. Příjemné čtení a ať to šetří čas (ne nervy).
          </p>

          <AIPulse variant="header" className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-premium hover:bg-premium/90">
              <Link to="/pro">
                <Crown className="h-4 w-4 mr-2" />
                Jít do PRO
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pro?premium=true">
                <BookOpen className="h-4 w-4 mr-2" />
                Číst Premium články
              </Link>
            </Button>
          </div>

          <div className="mt-6">
            <Button asChild variant="ghost" size="sm">
              <Link to="/ucet">
                <Settings className="h-4 w-4 mr-2" />
                Spravovat předplatné
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
