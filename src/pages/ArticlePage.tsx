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
import { Crown, Play } from 'lucide-react';
import { SectionPlaceholder, AIPulse } from '@/components/visuals';
import { AdSlot } from '@/components/ads';
import { VideoPlayer, LockedVideoOverlay } from '@/components/VideoPlayer';

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
  const { user, hasPremiumAccess } = useAuth();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Layout><div className="container-narrow py-16">Článek nenalezen</div></Layout>;
  }

  const { title, section, level, isPremium, excerpt, content, tags, author, publishedAt, whatItMeans, coverImage, proPillar, inlineVisuals, type, video } = article;
  
  const isVideo = type === 'video';
  
  // Parse cover image
  const placeholderData = coverImage ? parsePlaceholder(coverImage) : null;
  const isPlaceholder = !!placeholderData;
  
  // Access logic - PRO is now PUBLIC (no gating)
  // Only Premium articles are gated
  const isLoggedIn = !!user;
  
  // Determine what content to show based on access rules
  let visibleContent = content;
  let showLock = false;
  let lockType: 'guest' | 'logged-in-no-premium' = 'guest';
  let showInlineVisuals = true;
  let canPlayVideo = true;

  // Premium article (isPremium=true): Apply premium gating
  if (isPremium) {
    if (!isLoggedIn) {
      // Guest: show ONLY FIRST PARAGRAPH + guest paywall
      visibleContent = [content[0]];
      showLock = true;
      lockType = 'guest';
      showInlineVisuals = false;
      canPlayVideo = false;
    } else if (!hasPremiumAccess) {
      // Logged-in but no Premium/trial: show ONLY FIRST PARAGRAPH + logged-in paywall
      visibleContent = [content[0]];
      showLock = true;
      lockType = 'logged-in-no-premium';
      showInlineVisuals = false;
      canPlayVideo = false;
    }
    // Logged-in with trialing or active: show full content (default)
  }
  // Non-premium article (including PRO): Everyone sees full content

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

  // Poster image component for video
  const PosterImage = () => {
    if (isPlaceholder) {
      return (
        <SectionPlaceholder 
          section={placeholderData.section} 
          pillar={placeholderData.pillar} 
          className="w-full h-full"
        />
      );
    }
    if (coverImage) {
      return <img src={coverImage} alt={title} className="w-full h-full object-cover" />;
    }
    return (
      <SectionPlaceholder 
        section={section} 
        pillar={proPillar} 
        className="w-full h-full"
      />
    );
  };

  return (
    <Layout>
      <div className="container-wide py-8 md:py-12">
        <div className="flex gap-8">
          <article className="flex-1 max-w-3xl mx-auto xl:mx-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {isVideo && (
                  <Badge className="bg-accent text-accent-foreground">
                    <Play className="h-3 w-3 mr-1 fill-current" />
                    VIDEO
                  </Badge>
                )}
                {section !== 'PRO' && (
                  <Badge className={`text-white border-0 ${getSectionColor(section)}`}>{section}</Badge>
                )}
                {(section === 'PRO' || level.toUpperCase() !== section.toUpperCase()) && (
                  <Badge className={getLevelColor(level)}>{level}</Badge>
                )}
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

            {/* Video Player or Hero Image */}
            {isVideo && video ? (
              <div className="mb-8">
                {canPlayVideo ? (
                  <VideoPlayer
                    video={video}
                    title={title}
                    posterImage={<PosterImage />}
                  />
                ) : (
                  <LockedVideoOverlay
                    posterImage={<PosterImage />}
                    durationSeconds={video.durationSeconds}
                  />
                )}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden mb-8 aspect-video">
                <PosterImage />
              </div>
            )}

            {/* Billboard Ad - after header, before content (only for unlocked content) */}
            {!showLock && (
              <div className="mb-8">
                <AdSlot type="billboard" />
              </div>
            )}

            {/* Content - for text articles or as description for video */}
            <div className="prose-magazine">
              {visibleContent.map((p, i) => {
                const elements = [renderContent(p, i)];
                
                // Insert inline visual after certain paragraphs (for authorized users, text articles only)
                if (!isVideo && showInlineVisuals && inlineVisuals && inlineVisuals.length > 0) {
                  if (i === Math.floor(visibleContent.length / 3) && inlineVisuals[0]) {
                    elements.push(<InlineVisual key={`visual-${0}`} visual={inlineVisuals[0]} index={0} />);
                  }
                  if (i === Math.floor(visibleContent.length * 2 / 3) && inlineVisuals[1]) {
                    elements.push(<InlineVisual key={`visual-${1}`} visual={inlineVisuals[1]} index={1} />);
                  }
                }
                
                return elements;
              })}
              
              {whatItMeans && section === 'Novinky' && !showLock && (
                <WhatItMeansBox data={whatItMeans} />
              )}
              
              {showLock && <LockBlock type={lockType} />}
            </div>

            {/* Tags */}
            {!showLock && (
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Newsletter */}
            <div className="mt-12 p-6 bg-secondary rounded-xl">
              <NewsletterSignup variant="article" />
            </div>

            {/* Recommended */}
            <RecommendedArticles articles={articles.filter(a => a.section === section)} currentSlug={slug || ''} />
          </article>
          
          {/* Vertical Ad Sidebar - desktop only */}
          <aside className="hidden xl:block w-[300px] flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot type="vertical" />
            </div>
          </aside>
        </div>
      </div>

      {/* Billboard below paywall for locked content */}
      {showLock && (
        <div className="container-wide pb-8">
          <AdSlot type="billboard" />
        </div>
      )}
    </Layout>
  );
};

export default ArticlePage;
