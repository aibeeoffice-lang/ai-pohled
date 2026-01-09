import { Link } from 'react-router-dom';
import { Lock, Crown } from 'lucide-react';
import { Article, getSectionColor, getLevelColor, getLevelTooltip } from '@/data/articles';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const { title, slug, section, level, isPremium, excerpt, author, publishedAt } = article;

  return (
    <Link to={`/clanek/${slug}`} className="block group">
      <article className={`card-magazine h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {article.coverImage && (
          <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'aspect-video'}`}>
            <img
              src={article.coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className={`p-5 flex flex-col flex-1 ${featured && article.coverImage ? 'md:w-1/2' : ''}`}>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge 
              variant="outline" 
              className={`text-xs font-medium text-white border-0 ${getSectionColor(section)}`}
            >
              {section}
            </Badge>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={`text-xs font-medium ${getLevelColor(level)}`}>
                  {level}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getLevelTooltip(level)}</p>
              </TooltipContent>
            </Tooltip>

            {isPremium && (
              <Badge className="text-xs font-medium bg-premium text-premium-foreground">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}

            {section === 'PRO' && !isPremium && (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Title */}
          <h3 className={`font-display font-bold mb-2 group-hover:text-accent transition-colors ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className={`text-muted-foreground mb-4 flex-1 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('cs-CZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
