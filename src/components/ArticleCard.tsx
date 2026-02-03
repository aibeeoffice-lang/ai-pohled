import { Link } from 'react-router-dom';
import { Crown, Play } from 'lucide-react';
import { Article, getSectionColor, getLevelColor, getLevelTooltip, formatDuration } from '@/data/articles';
import { getPillarBadgeColor } from '@/data/pillars';
import { parsePlaceholder } from '@/data/coverImages';
import { Badge } from '@/components/ui/badge';
import { SectionPlaceholder } from '@/components/visuals';
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
  const { title, slug, section, level, isPremium, excerpt, author, publishedAt, coverImage, proPillar, type, video } = article;

  // Parse placeholder or use actual image
  const placeholderData = coverImage ? parsePlaceholder(coverImage) : null;
  const isPlaceholder = !!placeholderData;
  const isVideo = type === 'video';

  return (
    <Link to={`/clanek/${slug}`} className="block group">
      <article className={`card-magazine h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {/* Thumbnail */}
        <div className={`relative overflow-hidden ${featured ? 'md:w-2/5' : 'aspect-[16/10]'}`}>
          {isPlaceholder ? (
            <SectionPlaceholder 
              section={placeholderData.section} 
              pillar={placeholderData.pillar} 
              className="w-full h-full"
            />
          ) : coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <SectionPlaceholder 
              section={section} 
              pillar={proPillar} 
              className="w-full h-full"
            />
          )}
          
          {/* Play icon overlay for video */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="bg-accent/90 rounded-full p-3 group-hover:scale-110 transition-transform shadow-lg">
                <Play className="h-6 w-6 text-accent-foreground fill-current" />
              </div>
            </div>
          )}
          
          {/* Duration badge for video - bottom right */}
          {isVideo && video?.durationSeconds && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
              {formatDuration(video.durationSeconds)}
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        
        <div className={`p-5 flex flex-col flex-1 ${featured ? 'md:w-3/5' : ''}`}>
          {/* Badges - deduplicated */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Video badge - first if it's a video */}
            {isVideo && (
              <Badge className="text-xs font-medium bg-accent text-accent-foreground">
                <Play className="h-3 w-3 mr-1 fill-current" />
                VIDEO
              </Badge>
            )}
            
            {/* Section badge - only show if NOT PRO (to avoid duplicate with level PRO) */}
            {section !== 'PRO' && (
              <Badge 
                variant="outline" 
                className={`text-xs font-medium text-white border-0 ${getSectionColor(section)}`}
              >
                {section}
              </Badge>
            )}
            
            {/* Level badge - always show for PRO section, otherwise skip if level equals section */}
            {(section === 'PRO' || level.toUpperCase() !== section.toUpperCase()) && (
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
            )}

            {isPremium && (
              <Badge className="text-xs font-medium bg-premium text-premium-foreground">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}

            {/* PRO Pillar badge - only for PRO section articles */}
            {section === 'PRO' && proPillar && (
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${getPillarBadgeColor(proPillar)}`}
              >
                {proPillar}
              </Badge>
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
