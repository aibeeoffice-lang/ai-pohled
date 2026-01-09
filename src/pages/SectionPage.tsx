import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters from '@/components/ArticleFilters';
import EmptyState from '@/components/EmptyState';
import { articles, Section, Level, getSectionFromSlug } from '@/data/articles';

const SectionPage = () => {
  const { section: sectionSlug } = useParams<{ section: string }>();
  const section = getSectionFromSlug(sectionSlug || '') as Section;
  
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [premiumOnly, setPremiumOnly] = useState(false);

  const sectionArticles = articles.filter(a => a.section === section);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sectionArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [sectionArticles]);

  const filteredArticles = useMemo(() => {
    let result = sectionArticles;
    
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

  const sectionTitles: Record<Section, string> = {
    'Novinky': 'Novinky',
    'Vysvětleno': 'Vysvětleno (AI Akademie)',
    'Návody': 'Návody a tipy',
    'Nástroje': 'Nástroje a recenze',
    'AI v práci': 'AI v práci',
    'PRO': 'PRO'
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (!section) {
    return <Layout><div className="container-wide py-16">Sekce nenalezena</div></Layout>;
  }

  return (
    <Layout>
      <div className="container-wide py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{sectionTitles[section]}</h1>
        
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
