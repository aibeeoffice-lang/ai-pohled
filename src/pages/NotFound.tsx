import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { articles } from '@/data/articles';

const NotFound = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles
      .filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  return (
    <Layout>
      <div className="container-wide py-20 lg:py-32">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">404 — Tady nic není</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Buď je odkaz špatně, nebo jsme stránku přesunuli. AI umí halucinovat — ale tohle není ten případ. 🙂
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild size="lg">
              <Link to="/">Zpět na homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/slovnik">Slovník AI</Link>
            </Button>
          </div>

          <Link to="/kontakt" className="text-sm text-muted-foreground hover:text-foreground underline">
            Kontakt
          </Link>

          {/* Search */}
          <div className="mt-12 text-left">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hledej článek…"
                className="pl-10"
              />
            </div>
            {results.length > 0 && (
              <ul className="space-y-2">
                {results.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/clanek/${a.slug}`}
                      className="block p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
                    >
                      <span className="text-sm font-medium text-foreground">{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.trim() && results.length === 0 && (
              <p className="text-sm text-muted-foreground">Nic nenalezeno.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
