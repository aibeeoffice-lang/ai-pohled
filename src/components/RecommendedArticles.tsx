import { Article } from '@/data/articles';
import ArticleCard from './ArticleCard';

interface RecommendedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

const RecommendedArticles = ({ articles, currentSlug }: RecommendedArticlesProps) => {
  const recommended = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <section className="mt-12 pt-12 border-t border-border">
      <h2 className="font-display text-2xl font-bold mb-6">Doporučené články</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommended.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedArticles;
