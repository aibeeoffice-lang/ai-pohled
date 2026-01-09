import { Level } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ArticleFiltersProps {
  levels: Level[];
  selectedLevel: Level | 'all';
  onLevelChange: (level: Level | 'all') => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: 'newest' | 'oldest';
  onSortChange: (sort: 'newest' | 'oldest') => void;
  showPremiumOnly?: boolean;
  isPremiumFilter?: boolean;
  onPremiumFilterChange?: (value: boolean) => void;
}

const ArticleFilters = ({
  levels,
  selectedLevel,
  onLevelChange,
  tags,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
  showPremiumOnly = false,
  isPremiumFilter = false,
  onPremiumFilterChange,
}: ArticleFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap items-center gap-3">
        {/* Level Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Úroveň:</span>
          <div className="flex gap-1">
            <Button
              variant={selectedLevel === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onLevelChange('all')}
            >
              Vše
            </Button>
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => onLevelChange(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <Select value={sortBy} onValueChange={(v) => onSortChange(v as 'newest' | 'oldest')}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Nejnovější</SelectItem>
              <SelectItem value="oldest">Nejstarší</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Premium Toggle */}
        {showPremiumOnly && onPremiumFilterChange && (
          <Button
            variant={isPremiumFilter ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPremiumFilterChange(!isPremiumFilter)}
          >
            Jen Premium
          </Button>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground py-1">Tagy:</span>
          {tags.slice(0, 10).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleFilters;
