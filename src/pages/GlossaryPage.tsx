import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { glossaryTerms, LETTERS, type GlossaryTerm } from '@/data/glossary';
import { articles } from '@/data/articles';

const GlossaryPage = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return glossaryTerms;
    const q = search.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.shortDefinition.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const key = t.letterGroup;
      if (!map[key]) map[key] = [];
      map[key].push(t);
    }
    return map;
  }, [filtered]);

  const activeLetters = useMemo(() => new Set(Object.keys(grouped)), [grouped]);

  const scrollTo = (letter: string) => {
    sectionRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getRelatedArticles = (slugs?: string[]) => {
    if (!slugs?.length) return [];
    return articles.filter((a) => slugs.includes(a.slug));
  };

  return (
    <Layout>
      <div className="container-wide py-10 lg:py-16">
        {/* Hero */}
        <div className="max-w-2xl mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-3">Slovník AI</h1>
          <p className="text-muted-foreground text-lg">
            Rychlé vysvětlení pojmů z AI — lidsky, stručně a bez zbytečné magie.
          </p>
        </div>

        {/* Controls */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-border mb-8">
          {/* Search */}
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hledej výraz… (např. 'RAG', 'token', 'agent')"
              className="pl-10"
            />
          </div>
          {/* Letter picker */}
          <div className="flex flex-wrap gap-1">
            {LETTERS.map((l) => {
              const active = activeLetters.has(l);
              return (
                <button
                  key={l}
                  onClick={() => active && scrollTo(l)}
                  disabled={!active}
                  className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer'
                      : 'text-muted-foreground/40 cursor-default'
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terms */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            Nic nenalezeno. Zkus jiné slovo nebo jiné písmeno.
          </p>
        ) : (
          LETTERS.filter((l) => grouped[l]).map((letter) => (
            <div
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              className="mb-10 scroll-mt-40"
            >
              <h2 className="font-display text-2xl font-bold mb-4 text-primary">{letter}</h2>
              <div className="space-y-3">
                {grouped[letter].map((term) => {
                  const isOpen = expanded.has(term.slug);
                  const related = getRelatedArticles(term.relatedArticles);
                  return (
                    <div
                      key={term.slug}
                      className="border border-border rounded-lg bg-card overflow-hidden"
                    >
                      <div className="p-4 flex flex-col sm:flex-row sm:items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-foreground">{term.term}</span>
                            {term.level && (
                              <Badge variant="secondary" className="text-[10px]">
                                {term.level}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{term.shortDefinition}</p>
                        </div>
                        {(term.longDefinition || term.example || related.length > 0) && (
                          <button
                            onClick={() => toggle(term.slug)}
                            className="text-sm text-primary hover:underline flex items-center gap-1 shrink-0"
                          >
                            {isOpen ? (
                              <>Sbalit <ChevronUp className="h-3 w-3" /></>
                            ) : (
                              <>Rozbalit <ChevronDown className="h-3 w-3" /></>
                            )}
                          </button>
                        )}
                      </div>
                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-border pt-3 space-y-3 animate-fade-in">
                          {term.longDefinition && (
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {term.longDefinition.map((line, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {term.example && (
                            <div className="bg-secondary/50 rounded-md p-3 text-sm">
                              <span className="font-semibold text-foreground">Příklad: </span>
                              <span className="text-muted-foreground">{term.example}</span>
                            </div>
                          )}
                          {related.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                                <BookOpen className="h-3 w-3" /> Související články
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {related.map((a) => (
                                  <Link
                                    key={a.slug}
                                    to={`/clanek/${a.slug}`}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    {a.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-12">
          Pozn.: Slovník je živý. Výrazy doplňujeme průběžně.
        </p>

        {/* CTA */}
        <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border text-center">
          <h3 className="font-display font-bold text-lg mb-2">Chybí tu nějaký pojem?</h3>
          <p className="text-muted-foreground text-sm mb-4">Napiš nám tip a doplníme ho.</p>
          <Button asChild>
            <Link to="/kontakt">Poslat tip</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GlossaryPage;
