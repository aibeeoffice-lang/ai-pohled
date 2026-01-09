import Layout from '@/components/layout/Layout';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Check } from 'lucide-react';

const NewsletterPage = () => {
  const benefits = [
    'Krátký výběr novinek (co fakt stojí za to)',
    'Praktické tipy a šablony',
    'Kontext: co z toho plyne pro ČR a práci'
  ];

  return (
    <Layout>
      <div className="container-narrow py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Newsletter</h1>
          <p className="text-xl text-muted-foreground mb-8">To nejdůležitější z AI. Jednoduše. Česky.</p>
          
          <ul className="text-left space-y-3 mb-8">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-level-beginner mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          
          <div className="text-left">
            <NewsletterSignup variant="hero" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterPage;
