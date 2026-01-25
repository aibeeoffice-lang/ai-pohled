import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LockBlock from '@/components/LockBlock';
import WhatItMeansBox from '@/components/WhatItMeansBox';
import RecommendedArticles from '@/components/RecommendedArticles';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Badge } from '@/components/ui/badge';
import { articles, getSectionColor, getLevelColor } from '@/data/articles';
import { getPillarBadgeColor } from '@/data/pillars';
import { parsePlaceholder } from '@/data/coverImages';
import { useAuth } from '@/contexts/AuthContext';
import { Crown } from 'lucide-react';
import { SectionPlaceholder, AIPulse } from '@/components/visuals';

// Inline visual component for charts and diagrams
const InlineVisual = ({ visual, index }: { visual: { type: string; alt: string; caption?: string; title?: string; data?: { label: string; value: number }[] }; index: number }) => {
  if (visual.type === 'chart' && visual.data) {
    const maxValue = Math.max(...visual.data.map(d => d.value));
    return (
      <figure className="my-8 p-6 bg-secondary rounded-xl">
        {visual.title && <h4 className="font-semibold mb-4 text-center">{visual.title}</h4>}
        <div className="flex items-end justify-center gap-4 h-48">
          {visual.data.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className="w-12 bg-accent rounded-t transition-all hover:bg-accent/80"
                style={{ height: `${(item.value / maxValue) * 160}px` }}
              />
              <span className="text-xs text-muted-foreground text-center max-w-[60px]">{item.label}</span>
            </div>
          ))}
        </div>
        {visual.caption && <figcaption className="text-sm text-muted-foreground text-center mt-4">{visual.caption}</figcaption>}
      </figure>
    );
  }

  if (visual.type === 'diagram') {
    return (
      <figure className="my-8 p-6 bg-secondary rounded-xl">
        {visual.title && <h4 className="font-semibold mb-4 text-center">{visual.title}</h4>}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {['Vstup', 'Zpracování', 'Model', 'Výstup'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm font-medium">
                {step}
              </div>
              {i < 3 && <span className="text-accent">→</span>}
            </div>
          ))}
        </div>
        {visual.caption && <figcaption className="text-sm text-muted-foreground text-center mt-4">{visual.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden bg-secondary aspect-video flex items-center justify-center">
        <span className="text-muted-foreground">{visual.alt}</span>
      </div>
      {visual.caption && <figcaption className="text-sm text-muted-foreground text-center mt-2">{visual.caption}</figcaption>}
    </figure>
  );
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Layout><div className="container-narrow py-16">Článek nenalezen</div></Layout>;
  }

  const { title, section, level, isPremium, excerpt, content, tags, author, publishedAt, whatItMeans, coverImage, proPillar, inlineVisuals } = article;
  
  // Parse cover image
  const placeholderData = coverImage ? parsePlaceholder(coverImage) : null;
  const isPlaceholder = !!placeholderData;
  
  // Access logic
  const isProSection = section === 'PRO';
  const isLoggedIn = !!user;
  
  // Determine what content to show
  let visibleContent = content;
  let showLock = false;
  let lockType: 'pro' | 'premium' = 'pro';
  let showInlineVisuals = true;

  if (isPremium && !isLoggedIn) {
    // Premium: show only first paragraph
    visibleContent = [content[0]];
    showLock = true;
    lockType = 'premium';
    showInlineVisuals = false;
  } else if (isProSection && !isPremium && !isLoggedIn) {
    // PRO non-premium: show only excerpt
    visibleContent = [];
    showLock = true;
    lockType = 'pro';
    showInlineVisuals = false;
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
            {section === 'PRO' && proPillar && (
              <Badge variant="outline" className={getPillarBadgeColor(proPillar)}>
                {proPillar}
              </Badge>
            )}
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
          
          <p className="text-xl text-muted-foreground mb-6">{excerpt}</p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span>{author}</span>
            <span>•</span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
          
          <AIPulse variant="header" className="mb-6" />
        </header>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-8 aspect-video">
          {isPlaceholder ? (
            <SectionPlaceholder 
              section={placeholderData.section} 
              pillar={placeholderData.pillar} 
              className="w-full h-full"
            />
          ) : coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <SectionPlaceholder 
              section={section} 
              pillar={proPillar} 
              className="w-full h-full"
            />
          )}
        </div>

        {/* Content */}
        <div className="prose-magazine">
          {showLock && lockType === 'pro' ? (
            <LockBlock type="pro" />
          ) : (
            <>
              {visibleContent.map((p, i) => {
                const elements = [renderContent(p, i)];
                
                // Insert inline visual after certain paragraphs (for logged-in users or public content)
                if (showInlineVisuals && inlineVisuals && inlineVisuals.length > 0) {
                  const visualIndex = Math.floor((i + 1) / Math.ceil(visibleContent.length / inlineVisuals.length));
                  if (i === Math.floor(visibleContent.length / 3) && inlineVisuals[0]) {
                    elements.push(<InlineVisual key={`visual-${0}`} visual={inlineVisuals[0]} index={0} />);
                  }
                  if (i === Math.floor(visibleContent.length * 2 / 3) && inlineVisuals[1]) {
                    elements.push(<InlineVisual key={`visual-${1}`} visual={inlineVisuals[1]} index={1} />);
                  }
                }
                
                return elements;
              })}
              
              {whatItMeans && section === 'Novinky' && (
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
