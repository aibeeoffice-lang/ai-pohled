/**
 * Premium/Paywall Copy Constants
 * Source of truth for all Premium-related text across the site.
 * Matches the approved "Paywall - copy.docx" exactly.
 */

// ============================================================
// 1) ARTICLE PAYWALLS
// ============================================================

export const PAYWALL_GUEST = {
  title: 'Tento článek je Premium',
  text: 'Dočtěte tento článek s předplatným Premium.',
  primaryCta: 'Přihlásit se',
  secondaryCta: 'Vytvořit účet',
  subtext: '14 dní zdarma po registraci (zadáte kartu). Zrušíte kdykoliv.',
};

export const PAYWALL_LOGGED_IN_NO_PREMIUM = {
  title: 'Odemkněte Premium na 14 dní zdarma',
  text: 'Zadejte kartu a získejte přístup k Premium článkům. Pokud nezrušíte do 14 dní, automaticky se spustí měsíční předplatné.',
  primaryCta: 'Spustit na 14 dní zdarma',
  secondaryLink: 'Chci zůstat jen u obsahu zdarma',
  subtext: 'Žádné účtování během trialu. Zrušení zabere pár kliků.',
};

export const PAYWALL_TRIALING = {
  badge: 'Premium aktivní (trial)',
  // {datum} placeholder - will be replaced with actual date
  text: (datum: string) => `Trial končí ${datum}. Potom 49 Kč / měsíc (pokud nezrušíte).`,
  cta: 'Spravovat v účtu',
};

export const PAYWALL_ACTIVE = {
  badge: 'Premium aktivní ✅',
};

// ============================================================
// 2) PREMIUM LANDING PAGE (/predplatne)
// ============================================================

export const PREMIUM_PAGE = {
  hero: {
    badge: 'Premium',
    h1: 'Odemkni hloubku, kterou jinde nenajdeš',
    subtitle: 'Premium ti dá přístup k článkům s daty, grafy a checklisty. Žádné povrchní shrnutí – jen praxe.',
    primaryCta: 'Spustit 14 dní zdarma',
    secondaryCta: 'Prohlédnout Premium články',
    miniText: 'Pak 49 Kč/měsíc. Zrušení kdykoliv.',
  },
  benefits: {
    title: 'Co Premium odemkne',
    items: [
      'Plný přístup k Premium článkům',
      'Grafy, schémata a checklisty',
      'Hloubkové analýzy a praktické postupy',
    ],
  },
  howItWorks: {
    title: 'Jak Premium funguje',
    steps: [
      {
        step: '1',
        title: 'Spusť trial',
        description: 'Zadej kartu a aktivuj 14denní trial zdarma.',
      },
      {
        step: '2',
        title: 'Čti Premium',
        description: 'Odemkni všechny Premium články, grafy a checklisty.',
      },
      {
        step: '3',
        title: 'Rozhodni se',
        description: 'Po 14 dnech se spustí platba. Zrušit můžeš kdykoliv.',
      },
      {
        step: '4',
        title: 'Zruš kdykoliv',
        description: 'V účtu, bez otázek.',
      },
    ],
  },
  pricing: {
    title: 'Vyber si Premium plán hned',
    subtitle: 'Obě varianty začínají 14denním trialem zdarma.',
    monthly: {
      name: 'Měsíčně',
      price: '49 Kč',
      period: '/ měsíc',
      description: 'Flexibilní, bez závazků.',
      cta: 'Spustit měsíční předplatné',
    },
    annual: {
      badge: 'Nejvýhodnější',
      name: 'Ročně',
      price: '399 Kč',
      period: '/ rok',
      description: 'Nejlepší poměr cena/výkon.',
      cta: 'Spustit roční předplatné',
    },
    notes: [
      '✓ Trial = 14 dní zdarma, potřebuješ zadat kartu.',
      '✓ Zrušení kdykoliv, bez otázek.',
    ],
    prototypeNote: 'V prototypu je platba simulovaná.',
  },
  faq: {
    title: 'Časté otázky',
    items: [
      {
        question: 'Jak funguje 14denní trial?',
        answer: 'Po zadání karty máš 14 dní plný přístup zdarma. Pokud nezrušíš, po 14 dnech se spustí platba podle zvoleného plánu.',
      },
      {
        question: 'Kdy se strhne platba?',
        answer: 'Až po uplynutí 14denního trialu. Před koncem ti pošleme připomínku.',
      },
      {
        question: 'Můžu Premium kdykoliv zrušit?',
        answer: 'Ano. Zrušit můžeš kdykoliv v účtu. Přístup běží do konce zaplaceného období.',
      },
      {
        question: 'Co se stane po zrušení?',
        answer: 'Přístup k Premium obsahu končí na konci období. Tvůj účet a přístup k běžným článkům zůstává.',
      },
      {
        question: 'Dostanu fakturu?',
        answer: 'Ano, faktura bude k dispozici v e-mailu a/nebo v účtu.',
      },
      {
        question: 'Je Premium pro jednotlivce nebo firmy?',
        answer: 'Primárně pro jednotlivce. Pro firmy lze řešit více licencí – napiš nám.',
      },
      {
        question: 'Co když nejsem technický typ?',
        answer: 'Premium je psané prakticky a srozumitelně. Vizuály (grafy, schémata) pomáhají rychle pochopit podstatu.',
      },
      {
        question: 'Proč je část obsahu placená?',
        answer: 'Premium články jsou náročnější na přípravu (analýza, grafy, schémata). Předplatné pomáhá udržet kvalitu a pravidelnost.',
      },
    ],
  },
  finalCta: {
    title: 'Připraven(a) na Premium?',
    subtitle: 'Spusť 14denní trial a odemkni hloubkové články s grafy a checklisty.',
    cta: 'Spustit 14 dní zdarma',
    miniText: 'Pak 49 Kč/měsíc. Zrušení kdykoliv.',
  },
};

// ============================================================
// 3) CHECKOUT PAGE (/checkout)
// ============================================================

export const CHECKOUT_PAGE = {
  h1: 'Aktivujte Premium na 14 dní zdarma',
  subtitle: 'Zadejte kartu. Během trialu nic neúčtujeme.',
  summary: {
    title: 'Co dostanete',
    items: [
      '14 dní Premium zdarma',
      'Přístup k Premium článkům',
      'Grafy, schémata a checklisty',
      'Zrušení kdykoliv před koncem trialu',
    ],
    todayLabel: 'Dnes:',
    todayValue: '0 Kč',
    afterTrialLabel: 'Po 14 dnech:',
    // {cena} will be replaced with actual price
  },
  checkbox: (cena: string) => `Souhlasím s podmínkami. Beru na vědomí, že po 14 dnech se spustí platba ${cena}, pokud nezruším.`,
  primaryCta: 'Spustit 14 dní zdarma',
  smallNote: 'Zrušení kdykoliv v účtu.',
  backLink: '← Zpět na Premium',
  processingText: 'Zpracovávám...',
  // Error states
  noPlanSelected: {
    title: 'Nebyl vybrán plán',
    text: 'Prosím vyber si plán na stránce Premium.',
    cta: 'Zpět na Premium',
  },
  guestAlert: 'Pro spuštění trialu se nejdřív přihlas nebo si vytvoř účet.',
};

// ============================================================
// 4) ACCOUNT PAGE (/ucet) - Premium section
// ============================================================

export const ACCOUNT_PREMIUM = {
  sectionTitle: 'Premium',
  
  trial: {
    title: 'Premium (trial)',
    status: 'Aktivní — 14 dní zdarma ✅',
    // {datum} and {cena} placeholders
    text: (datum: string, cena: string) => `Trial končí ${datum}. Potom se začne účtovat ${cena}.`,
    buttons: {
      cancel: 'Zrušit trial',
      changePlan: 'Změnit plán',
      changePayment: 'Změnit platební metodu',
    },
    cancelModal: {
      title: 'Zrušit Premium trial?',
      text: 'Pokud zrušíte, po skončení trialu se Premium vypne a nic nebudeme účtovat.',
      confirmCta: 'Ano, zrušit trial',
      cancelCta: 'Zpět',
    },
    cancelledText: (datum: string) => `Trial byl zrušen. Premium skončí ${datum}.`,
  },
  
  active: {
    title: 'Premium',
    status: 'Aktivní ✅',
    // {datum} and {cena} placeholders
    text: (datum: string, cena: string) => `Další stržení: ${datum} • Cena: ${cena}`,
    buttons: {
      cancel: 'Zrušit předplatné',
      changePlan: 'Změnit plán',
      changePayment: 'Změnit platební metodu',
      invoices: 'Faktury a platby',
    },
    cancelModal: {
      title: 'Zrušit předplatné?',
      text: 'Přístup poběží do konce zaplaceného období. Poté se Premium vypne.',
      confirmCta: 'Ano, zrušit',
      cancelCta: 'Zpět',
    },
    cancelledText: 'Premium bylo zrušeno. Přístup poběží do konce zaplaceného období.',
  },
  
  none: {
    status: 'Neaktivní',
    text: 'Premium ti dá přístup k hloubkovým článkům, grafům a checklistům. Spusť 14denní trial zdarma.',
    cta: 'Spustit 14denní trial',
  },
};

// ============================================================
// HELPER: Get price string by plan
// ============================================================

export const getPriceByPlan = (plan: 'monthly' | 'annual' | null): string => {
  if (plan === 'annual') return '399 Kč/rok';
  return '49 Kč/měsíc';
};
