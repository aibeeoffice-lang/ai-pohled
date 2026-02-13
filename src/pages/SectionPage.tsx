import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters from '@/components/ArticleFilters';
import EmptyState from '@/components/EmptyState';
import { articles, Level } from '@/data/articles';
import { getSectionBySlug, SECTIONS } from '@/data/sections';
import { PRO_PILLARS, ProPillar } from '@/data/pillars';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AdSlot } from '@/components/ads';

const SectionPage = () => {
  const { section: sectionSlug } = useParams<{ section: string }>();
  const sectionConfig = getSectionBySlug(sectionSlug || '');
  
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<ProPillar | 'all'>('all');
  const [videoOnly, setVideoOnly] = useState(false);

  // If not a valid section slug, render NotFound
  if (!sectionConfig) {
    return <NotFound />;
  }

  const section = sectionConfig.sectionKey;
  const isPro = section === 'PRO';
  const sectionArticles = articles.filter(a => a.section === section);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sectionArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [sectionArticles]);

  // Count articles per pillar
  const pillarCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sectionArticles.length };
    PRO_PILLARS.forEach(p => {
      counts[p.key] = sectionArticles.filter(a => a.proPillar === p.key).length;
    });
    return counts;
  }, [sectionArticles]);

  const filteredArticles = useMemo(() => {
    let result = [...sectionArticles];
    
    // Pillar filter (PRO only)
    if (isPro && selectedPillar !== 'all') {
      result = result.filter(a => a.proPillar === selectedPillar);
    }
    
    if (selectedLevel !== 'all') {
      result = result.filter(a => a.level === selectedLevel);
    }
    
    if (selectedTags.length > 0) {
      result = result.filter(a => selectedTags.some(t => a.tags.includes(t)));
    }
    
    if (premiumOnly) {
      result = result.filter(a => a.isPremium);
    }
    
    // Video filter
    if (videoOnly) {
      result = result.filter(a => a.type === 'video');
    }
    
    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [sectionArticles, selectedLevel, selectedTags, sortBy, premiumOnly, selectedPillar, isPro, videoOnly]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Split articles for ad insertion (after 6 cards)
  const firstBatch = filteredArticles.slice(0, 6);
  const secondBatch = filteredArticles.slice(6);

  return (
    <Layout>
      <div className="container-wide py-8 md:py-12">
        <div className="flex gap-8">
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{sectionConfig.title}</h1>
            
            {/* PRO intro text */}
            {isPro && (
              <p className="text-muted-foreground mb-6">
                Hloubkové články pro praxi: trh, výzkum, technické postupy a firemní governance. Zdarma pro všechny.
              </p>
            )}

            {/* Pillar navigation for PRO */}
            {isPro && (
              <div className="mb-6">
                <div className="text-sm font-medium text-muted-foreground mb-2">Pilíře:</div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedPillar === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPillar('all')}
                  >
                    Vše ({pillarCounts.all})
                  </Button>
                  {PRO_PILLARS.map((pillar) => (
                    <Tooltip key={pillar.key}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={selectedPillar === pillar.key ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPillar(pillar.key)}
                        >
                          {pillar.label} ({pillarCounts[pillar.key] || 0})
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{pillar.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
            
            <ArticleFilters
              levels={['Začátečník', 'Pokročilý', 'PRO']}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              tags={allTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showPremiumOnly={isPro}
              isPremiumFilter={premiumOnly}
              onPremiumFilterChange={setPremiumOnly}
              showVideoFilter={true}
              videoOnly={videoOnly}
              onVideoFilterChange={setVideoOnly}
            />
            
            {filteredArticles.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* First batch of articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {firstBatch.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* Billboard ad after 6 articles */}
                {secondBatch.length > 0 && (
                  <div className="my-8">
                    <AdSlot type="billboard" />
                  </div>
                )}
                
                {/* Rest of articles */}
                {secondBatch.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondBatch.map(article => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Vertical Ad Sidebar - desktop only */}
          <aside className="hidden xl:block w-[300px] flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot type="vertical" />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default SectionPage;
