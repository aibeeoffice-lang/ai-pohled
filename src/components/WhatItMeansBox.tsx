import { Lightbulb } from 'lucide-react';

interface WhatItMeansBoxProps {
  data: {
    changed: string;
    important: string;
    affects: string;
    recommendation: string;
  };
}

const WhatItMeansBox = ({ data }: WhatItMeansBoxProps) => {
  return (
    <div className="my-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h3 className="font-display font-bold text-lg">Co to znamená</h3>
      </div>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-semibold text-foreground">Co se změnilo:</dt>
          <dd className="text-muted-foreground">{data.changed}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-foreground">Proč to je důležité:</dt>
          <dd className="text-muted-foreground">{data.important}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-foreground">Koho se to týká:</dt>
          <dd className="text-muted-foreground">{data.affects}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-foreground">Doporučení:</dt>
          <dd className="text-muted-foreground">{data.recommendation}</dd>
        </div>
      </dl>
    </div>
  );
};

export default WhatItMeansBox;
