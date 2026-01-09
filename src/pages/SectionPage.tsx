import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters from '@/components/ArticleFilters';
import EmptyState from '@/components/EmptyState';
import { articles, Level } from '@/data/articles';
import { getSectionBySlug, SECTIONS } from '@/data/sections';

const SectionPage = () => {
  const { section: sectionSlug } = useParams<{ section: string }>();
  const sectionConfig = getSectionBySlug(sectionSlug || '');
  
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [premiumOnly, setPremiumOnly] = useState(false);

  // If not a valid section slug, check if it's a special page route
  if (!sectionConfig) {
    // These are handled by other routes, but if someone navigates to an unknown path
    const specialRoutes = ['prihlaseni', 'ucet', 'newsletter', 'clanek'];
    if (sectionSlug && specialRoutes.some(r => sectionSlug.startsWith(r))) {
      return <Navigate to={`/${sectionSlug}`} replace />;
    }
    
    return (
      <Layout>
        <div className="container-wide py-16 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Sekce nenalezena</h1>
          <p className="text-muted-foreground mb-4">
            Hledaná sekce "{sectionSlug}" neexistuje.
          </p>
          <p className="text-sm text-muted-foreground">
            Dostupné sekce: {SECTIONS.map(s => s.slug).join(', ')}
          </p>
        </div>
      </Layout>
    );
  }

  const section = sectionConfig.sectionKey;
  const sectionArticles = articles.filter(a => a.section === section);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sectionArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [sectionArticles]);

  const filteredArticles = useMemo(() => {
    let result = [...sectionArticles];
    
    if (selectedLevel !== 'all') {
      result = result.filter(a => a.level === selectedLevel);
    }
    
    if (selectedTags.length > 0) {
      result = result.filter(a => selectedTags.some(t => a.tags.includes(t)));
    }
    
    if (premiumOnly) {
      result = result.filter(a => a.isPremium);
    }
    
    result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [sectionArticles, selectedLevel, selectedTags, sortBy, premiumOnly]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Layout>
      <div className="container-wide py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{sectionConfig.title}</h1>
        
        <ArticleFilters
          levels={['Začátečník', 'Pokročilý', 'PRO']}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showPremiumOnly={section === 'PRO'}
          isPremiumFilter={premiumOnly}
          onPremiumFilterChange={setPremiumOnly}
        />
        
        {filteredArticles.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SectionPage;
