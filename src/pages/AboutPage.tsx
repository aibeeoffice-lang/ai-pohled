import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const bullets = [
  "Novinky a kontext: co se stalo a jaký to má dopad.",
  "Vysvětleno: pojmy a principy tak, aby dávaly smysl i bez technického backgroundu.",
  "Návody a postupy: konkrétní 'jak na to' pro práci i běžný život.",
  "Nástroje: tipy, srovnání a doporučení, co stojí za vyzkoušení.",
  "AI v praxi: příklady použití ve firmách i u jednotlivců.",
  "PRO: hlubší obsah pro praxi (ale PRO je zdarma pro všechny).",
  "Premium: vybrané hloubkové materiály pro předplatitele (trial/předplatné dle nastavení webu).",
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container-wide py-12 lg:py-16 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-6">O nás</h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          AI Magazín je web o umělé inteligenci pro lidi, kteří chtějí vědět, co se děje — a hlavně proč na tom záleží. Píšeme srozumitelně, prakticky a bez zbytečné omáčky.
        </p>

        <h2 className="font-display text-2xl font-semibold mb-4">Co tu najdete</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-10">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <h2 className="font-display text-2xl font-semibold mb-4">Jak pracujeme</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Upřednostňujeme jasnost před efektem. Když něco nevíme, řekneme to. Když je něco hype, napíšeme to nahlas. A když existuje lepší jednoduché řešení, vybereme ho — i když není 'sexy'.
        </p>

        <h2 className="font-display text-2xl font-semibold mb-4">Pro koho to je</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Pro zvídavé lidi. Pro markeťáky, podnikatele, studenty, manažery, tvůrce i všechny, kdo chtějí AI používat chytře — ne jen o ní mluvit.
        </p>

        <div className="rounded-lg border bg-card p-6 lg:p-8">
          <h3 className="font-display text-xl font-semibold mb-2">Chceš to mít jednou týdně v e-mailu?</h3>
          <p className="text-muted-foreground mb-4">
            Přihlas se k newsletteru a pošleme ti výběr toho nejdůležitějšího. Bez spamu. Jen AI.
          </p>
          <Button asChild>
            <Link to="/newsletter">Odebírat newsletter</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
