import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LockBlock from '@/components/LockBlock';
import WhatItMeansBox from '@/components/WhatItMeansBox';
import RecommendedArticles from '@/components/RecommendedArticles';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Badge } from '@/components/ui/badge';
import { articles, getSectionColor, getLevelColor } from '@/data/articles';
import { useAuth } from '@/contexts/AuthContext';
import { Crown } from 'lucide-react';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Layout><div className="container-narrow py-16">Článek nenalezen</div></Layout>;
  }

  const { title, section, level, isPremium, excerpt, content, tags, author, publishedAt, whatItMeans } = article;
  
  // Access logic
  const isProSection = section === 'PRO';
  const isLoggedIn = !!user;
  
  // Determine what content to show
  let visibleContent = content;
  let showLock = false;
  let lockType: 'pro' | 'premium' = 'pro';

  if (isPremium && !isLoggedIn) {
    // Premium: show only first paragraph
    visibleContent = [content[0]];
    showLock = true;
    lockType = 'premium';
  } else if (isProSection && !isPremium && !isLoggedIn) {
    // PRO non-premium: show only excerpt
    visibleContent = [];
    showLock = true;
    lockType = 'pro';
  }

  const renderContent = (text: string, index: number) => {
    if (text.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-display font-bold mt-8 mb-4">{text.replace('## ', '')}</h2>;
    }
    if (text.startsWith('**') && text.endsWith('**')) {
      return <p key={index} className="font-semibold mb-4">{text.replace(/\*\*/g, '')}</p>;
    }
    if (text.startsWith('- ')) {
      return <li key={index} className="mb-2">{text.replace('- ', '')}</li>;
    }
    if (text.startsWith('✅')) {
      return <p key={index} className="mb-2">{text}</p>;
    }
    return <p key={index} className="mb-4 leading-relaxed">{text}</p>;
  };

  return (
    <Layout>
      <article className="container-narrow py-8 md:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className={`text-white border-0 ${getSectionColor(section)}`}>{section}</Badge>
            <Badge className={getLevelColor(level)}>{level}</Badge>
            {isPremium && (
              <Badge className="bg-premium text-premium-foreground">
                <Crown className="h-3 w-3 mr-1" />Premium
              </Badge>
            )}
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          
          <p className="text-xl text-muted-foreground mb-6">{excerpt}</p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div className="prose-magazine">
          {showLock && lockType === 'pro' ? (
            <LockBlock type="pro" />
          ) : (
            <>
              {visibleContent.map((p, i) => renderContent(p, i))}
              
              {whatItMeans && section === 'Novinky' && isLoggedIn && (
                <WhatItMeansBox data={whatItMeans} />
              )}
              
              {showLock && lockType === 'premium' && <LockBlock type="premium" />}
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
          {tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 bg-secondary rounded-xl">
          <NewsletterSignup variant="article" />
        </div>

        {/* Recommended */}
        <RecommendedArticles articles={articles.filter(a => a.section === section)} currentSlug={slug || ''} />
      </article>
    </Layout>
  );
};

export default ArticlePage;
