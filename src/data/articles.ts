import { ProPillar } from './pillars';

export type Section = 'Novinky' | 'Vysvětleno' | 'Návody' | 'Nástroje' | 'AI v práci' | 'PRO';
export type Level = 'Začátečník' | 'Pokročilý' | 'PRO';

export interface InlineVisual {
  type: 'image' | 'chart' | 'diagram';
  src?: string;
  alt: string;
  caption?: string;
  data?: { label: string; value: number }[]; // for charts
  title?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  section: Section;
  level: Level;
  isPremium: boolean;
  excerpt: string;
  content: string[];
  tags: string[];
  author: string;
  publishedAt: string;
  coverImage?: string;
  proPillar?: ProPillar;
  inlineVisuals?: InlineVisual[];
  whatItMeans?: {
    changed: string;
    important: string;
    affects: string;
    recommendation: string;
  };
}

export const articles: Article[] = [
  // NOVINKY (6 articles)
  {
    id: '1',
    title: 'AI asistenti se stěhují do běžných aplikací: méně chatování, víc práce na pozadí',
    slug: 'ai-asistenti-v-beznych-aplikacich',
    section: 'Novinky',
    level: 'Začátečník',
    isPremium: false,
    coverImage: 'placeholder:Novinky',
    excerpt: 'AI už není jen okno chatu. Postupně se přesouvá přímo do nástrojů, které používáme každý den – dokumenty, e-mail, tabulky, CRM. A to mění, jak s ní lidé reálně pracují.',
    content: [
      'Ještě před rokem jsme si s AI povídali v okně chatu. Dnes se inteligentní funkce stěhují přímo tam, kde pracujeme – do e-mailových klientů, dokumentových editorů, tabulkových procesorů i CRM systémů. Změna je nenápadná, ale zásadní.',
      'Microsoft přidal Copilot do celého balíku 365. Google integruje Gemini do Workspace. Notion, Slack, Zoom a další nástroje následují. AI už není extra krok – stává se součástí běžného workflow.',
      'Pro uživatele to znamená méně přepínání mezi aplikacemi. AI dokáže navrhnout odpověď na e-mail, shrnout schůzku, vytvořit graf z dat nebo naformátovat dokument – a to přímo tam, kde se pracuje.',
      'Firmy, které tyto funkce nasadí chytře, ušetří hodiny týdně. Ty, které je ignorují, budou za rok vypadat jako firmy bez internetu v roce 2005.',
      'Klíčové je vybrat si jednu oblast a otestovat ji pořádně. Generické nasazení všude nepřinese nic. Cílené využití v konkrétním procesu ano.'
    ],
    tags: ['AI asistenti', 'produktivita', 'Microsoft', 'Google'],
    author: 'Martin Novák',
    publishedAt: '2026-01-08',
    inlineVisuals: [
      { type: 'chart', title: 'Úspora času při integraci AI', alt: 'Graf úspory času', data: [
        { label: 'E-mail', value: 35 },
        { label: 'Dokumenty', value: 45 },
        { label: 'Tabulky', value: 30 },
        { label: 'CRM', value: 25 }
      ], caption: 'Průměrná úspora času v % po nasazení AI asistentů' }
    ],
    whatItMeans: {
      changed: 'AI se přesouvá z chatu přímo do nástrojů a procesů.',
      important: 'Reálné používání roste, když AI šetří kliky a čas, ne když vyžaduje prompty.',
      affects: 'Každého, kdo píše, plánuje, reportuje nebo řeší zákazníky.',
      recommendation: 'Vyber 1 oblast (email/dokumenty/tabulky) a otestuj, kde AI zkrátí čas aspoň o 20 %.'
    }
  },
  {
    id: '2',
    title: 'OpenAI spouští nový model o3: co umí a proč na tom záleží',
    slug: 'openai-o3-model',
    section: 'Novinky',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'OpenAI představila o3, model zaměřený na komplexní reasoning. Je to krok k obecné umělé inteligenci, nebo jen další iterace?',
    content: [
      'OpenAI oznámila model o3, který podle benchmarků výrazně překonává předchůdce v úlohách vyžadujících logické uvažování a plánování. Jde o přímého nástupce řady o1.',
      'Hlavní vylepšení se týkají tzv. chain-of-thought reasoning – model lépe rozkládá složité problémy na kroky a kontroluje vlastní odpovědi.',
      'Pro vývojáře to znamená spolehlivější výstupy u technických dotazů. Pro běžné uživatele zatím změna není tak viditelná – většina aplikací stále běží na GPT-4.',
      'Kritici upozorňují, že benchmarky nemusí odpovídat reálnému použití. OpenAI ale tvrdí, že o3 je základ pro budoucí agentické systémy.',
      'Co to znamená prakticky? Pokud stavíte AI aplikace, sledujte dokumentaci. Pro ostatní: zatím klid, ale budoucnost bude zajímavá.'
    ],
    tags: ['OpenAI', 'o3', 'LLM', 'vývoj'],
    author: 'Petra Králová',
    publishedAt: '2026-01-07'
  },
  {
    id: '3',
    title: 'EU schválila AI Act: co to znamená pro české firmy',
    slug: 'eu-ai-act-ceske-firmy',
    section: 'Novinky',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Evropská unie přijala první komplexní regulaci umělé inteligence. České firmy mají dva roky na přizpůsobení.',
    content: [
      'AI Act vstoupil v platnost a přináší první ucelený právní rámec pro umělou inteligenci v Evropě. Regulace rozděluje AI systémy do kategorií podle rizika.',
      'Vysokorizikové aplikace – například v zdravotnictví nebo při náboru – budou muset projít certifikací. Zakázané jsou systémy pro sociální skórování nebo manipulativní AI.',
      'Pro většinu českých firem to zatím znamená hlavně dokumentaci. Pokud používáte AI pro interní účely, pravděpodobně spadáte do nízké kategorie rizika.',
      'E-shopy s AI doporučováním, HR nástroje s automatickým tříděním životopisů nebo chatboti pro zákazníky – všichni si musí zkontrolovat, do jaké kategorie patří.',
      'Doporučení: začněte inventurou AI nástrojů ve firmě. Než přijdou kontroly, buďte připraveni.'
    ],
    tags: ['regulace', 'AI Act', 'EU', 'compliance'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-06'
  },
  {
    id: '4',
    title: 'Anthropic představil Claude 4: zaměřeno na bezpečnost',
    slug: 'anthropic-claude-4',
    section: 'Novinky',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Konkurent ChatGPT přichází s novou verzí, která klade důraz na bezpečné chování a transparentnost.',
    content: [
      'Anthropic vydal Claude 4, čtvrtou generaci svého AI asistenta. Model se zaměřuje na to, aby odmítal škodlivé požadavky a zároveň zůstal užitečný.',
      'Nová verze lépe vysvětluje, proč něco nedokáže nebo nechce udělat. To je důležité pro firemní nasazení, kde je transparentnost klíčová.',
      'V testech Claude 4 dosahuje srovnatelných výsledků s GPT-4 v běžných úlohách, ale vyniká v eticky citlivých situacích.',
      'Pro uživatele to znamená: pokud potřebujete AI pro zákaznickou podporu nebo citlivé oblasti, Claude stojí za vyzkoušení.',
      'Anthropic také rozšiřuje API a přidává podporu pro delší kontexty. Vývojáři mohou pracovat s až 200 tisíci tokeny najednou.'
    ],
    tags: ['Anthropic', 'Claude', 'bezpečnost', 'LLM'],
    author: 'Eva Horová',
    publishedAt: '2026-01-05'
  },
  {
    id: '5',
    title: 'České startupy v AI: kdo roste a kam míří',
    slug: 'ceske-ai-startupy-2026',
    section: 'Novinky',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Přehled nejzajímavějších českých AI firem v roce 2026. Od jazykových modelů po průmyslovou automatizaci.',
    content: [
      'Česká AI scéna roste. Už to není jen o pár akademických projektech – vznikají reálné produkty s globálním potenciálem.',
      'Rossum automatizuje zpracování dokumentů pro velké korporace. Jejich technologie čte a rozumí fakturám, objednávkám a smlouvám.',
      'Resistant AI chrání finanční instituce před podvody s využitím strojového učení. Nedávno získali další kolo investic.',
      'V oblasti jazykových modelů roste zájem o české varianty. Několik týmů pracuje na modelech trénovaných speciálně na češtinu.',
      'Pro investory i talenty je to signál: v Česku se AI dělá na světové úrovni. A příležitosti jsou jak pro techniky, tak pro obchodníky.'
    ],
    tags: ['startupy', 'Česko', 'investice', 'Rossum'],
    author: 'Martin Novák',
    publishedAt: '2026-01-04'
  },
  {
    id: '6',
    title: 'Google DeepMind posouvá hranice v medicíně',
    slug: 'google-deepmind-medicina',
    section: 'Novinky',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Nový model AlphaFold 3 předpovídá strukturu proteinů s dosud nevídanou přesností. Co to znamená pro vývoj léků?',
    content: [
      'Google DeepMind zveřejnil AlphaFold 3, který rozšiřuje schopnosti předchůdce o predikci interakcí mezi proteiny a léky.',
      'Pro farmaceutický průmysl to znamená potenciálně rychlejší a levnější vývoj nových léčiv. Místo let laboratorních testů – měsíce simulací.',
      'Model je dostupný pro akademický výzkum zdarma. Komerční využití vyžaduje licenci, ale podmínky jsou rozumné.',
      'Kritici upozorňují, že jde stále o predikce – reálné testy zůstávají nezbytné. Ale jako první krok v designu molekul je to revoluce.',
      'Pro Česko: univerzity a výzkumné ústavy mohou AlphaFold využívat okamžitě. Příležitost pro spolupráci s farmaceutickými firmami.'
    ],
    tags: ['DeepMind', 'AlphaFold', 'medicína', 'výzkum'],
    author: 'Petra Králová',
    publishedAt: '2026-01-03'
  },

  // VYSVĚTLENO (6 articles)
  {
    id: '7',
    title: 'Co jsou to velké jazykové modely a jak fungují',
    slug: 'velke-jazykove-modely-vysvetleni',
    section: 'Vysvětleno',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'ChatGPT, Claude, Gemini – všechno jsou to velké jazykové modely. Ale co to vlastně znamená a jak fungují?',
    content: [
      'Velký jazykový model (LLM) je typ umělé inteligence, který se naučil předpovídat, jaké slovo přijde jako další v textu. Zní to jednoduše, ale důsledky jsou obrovské.',
      'Představte si, že čtete miliardy stránek textu a snažíte se najít vzory. Které slovo následuje po kterém? Jaké věty dávají smysl? To přesně dělají LLM.',
      'Klíčový průlom přišel s architekturou zvanou Transformer. Ta umožňuje modelu "dívat se" na celý kontext věty najednou, ne jen na předchozí slovo.',
      'ChatGPT a podobné modely jsou trénované ve dvou fázích: nejprve na obrovském množství textu z internetu, pak na příkladech kvalitních odpovědí.',
      'Důležité je chápat: LLM nemají "rozum" jako člověk. Jsou to sofistikované systémy pro predikci textu, které můžou být neuvěřitelně užitečné – ale i nebezpečně sebevědomé v nepravdách.',
      'Pro běžné použití to stačí vědět. Pokud vás zajímá víc, doporučujeme kurz v sekci Návody.'
    ],
    tags: ['LLM', 'základy', 'ChatGPT', 'Transformer'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-07'
  },
  {
    id: '8',
    title: 'Prompt engineering: jak mluvit s AI',
    slug: 'prompt-engineering-zaklady',
    section: 'Vysvětleno',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Kvalita výstupu závisí na kvalitě vstupu. Naučte se základy promptingu a získejte lepší odpovědi.',
    content: [
      'Prompt je to, co napíšete AI. Může to být otázka, instrukce nebo popis úkolu. A záleží na každém slově.',
      'Základní pravidlo: buďte konkrétní. Místo "napiš článek o AI" zkuste "napiš 500 slov o tom, jak malé firmy v ČR využívají AI pro zákaznickou podporu, s 3 konkrétními příklady".',
      'Další tip: řekněte AI, v jaké roli má být. "Jsi zkušený copywriter" funguje lépe než jen zadat úkol.',
      'Struktura promptu: kontext → úkol → formát → omezení. Například: "Jsem majitel e-shopu (kontext). Potřebuji napsat popis produktu (úkol). Maximálně 100 slov, přesvědčivý tón (formát a omezení)."',
      'Chain-of-thought: u složitějších úkolů požádejte AI, aby "přemýšlela krok za krokem". Zlepšuje to přesnost u logických úloh.',
      'Experimentujte. Nejlepší prompt je ten, který funguje pro váš konkrétní případ.'
    ],
    tags: ['prompty', 'základy', 'tipy', 'produktivita'],
    author: 'Eva Horová',
    publishedAt: '2026-01-06'
  },
  {
    id: '9',
    title: 'Rozdíl mezi AI, strojovým učením a neuronovými sítěmi',
    slug: 'ai-ml-nn-rozdily',
    section: 'Vysvětleno',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Termíny se často zaměňují, ale znamenají různé věci. Vysvětlíme hierarchii a vztahy.',
    content: [
      'Umělá inteligence (AI) je nejširší pojem. Zahrnuje jakýkoli systém, který simuluje inteligentní chování – od jednoduchých pravidel po komplexní modely.',
      'Strojové učení (ML) je podmnožina AI. Systémy se učí z dat, místo aby byly explicitně naprogramované. Algoritmus najde vzory sám.',
      'Neuronové sítě jsou typ strojového učení inspirovaný lidským mozkem. Skládají se z vrstev "neuronů", které zpracovávají informace.',
      'Deep learning je strojové učení s hlubokými neuronovými sítěmi – mnoho vrstev, komplexní vzory, obrovské datové sady.',
      'ChatGPT je deep learning model, konkrétně velký jazykový model (LLM), což je typ neuronové sítě trénované na textu.',
      'Proč na tom záleží? Abyste věděli, co můžete očekávat. AI není magie – je to matematika a data.'
    ],
    tags: ['AI', 'ML', 'neuronové sítě', 'základy'],
    author: 'Martin Novák',
    publishedAt: '2026-01-05'
  },
  {
    id: '10',
    title: 'Halucinace AI: proč modely lžou a co s tím',
    slug: 'halucinace-ai-vysvetleni',
    section: 'Vysvětleno',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'AI někdy tvrdí nesmysly s naprostou jistotou. Proč to dělá a jak se tomu bránit?',
    content: [
      'Halucinace je termín pro situace, kdy AI generuje nepravdivé nebo nesmyslné informace, ale prezentuje je sebevědomě jako fakta.',
      'Důvod je technický: jazykové modely predikují pravděpodobná slova, ne pravdivá slova. Pokud vzor vypadá věrohodně, model ho použije.',
      'Typické případy: vymyšlené citace, neexistující studie, špatná čísla, smíšené biografické údaje.',
      'Jak se bránit? Vždy ověřujte důležité informace z jiných zdrojů. Nevěřte AI slepě, zejména u faktů, dat a jmen.',
      'Pro kritické aplikace používejte RAG (Retrieval-Augmented Generation) – model čerpá z ověřených zdrojů místo vlastní "paměti".',
      'Budoucí modely budou mít lepší kalibraci nejistoty. Zatím platí: důvěřuj, ale prověřuj.'
    ],
    tags: ['halucinace', 'bezpečnost', 'faktická přesnost', 'RAG'],
    author: 'Petra Králová',
    publishedAt: '2026-01-04'
  },
  {
    id: '11',
    title: 'Tokeny: proč AI počítá jinak než vy',
    slug: 'tokeny-vysvetleni',
    section: 'Vysvětleno',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Jazykové modely nepracují se slovy, ale s tokeny. Pochopení tokenizace pomáhá lépe využít AI nástroje.',
    content: [
      'Token je základní jednotka, kterou jazykový model zpracovává. Není to slovo – je to kousek textu, který může být slovo, část slova, nebo i interpunkce.',
      'V angličtině je průměrné slovo asi 1.3 tokenu. V češtině je to více, protože skloňování a delší slova.',
      'Proč je to důležité? Platíte za tokeny. Limit kontextu je v tokenech. A čím více tokenů, tím pomalejší a dražší odpověď.',
      'Příklad: "Ahoj" je 1 token. "Nejneobhospodařovávatelnější" může být 5 tokenů. Čísla jsou často tokenizována po jednotlivých cifrách.',
      'Praktický tip: kratší, přesnější prompty šetří peníze a dávají lepší výsledky. Méně je více.',
      'Většina nástrojů zobrazuje spotřebu tokenů. Sledujte ji, pokud pracujete s API nebo máte limit.'
    ],
    tags: ['tokeny', 'tokenizace', 'API', 'optimalizace'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-03'
  },
  {
    id: '12',
    title: 'Fine-tuning vs. RAG: kdy použít co',
    slug: 'fine-tuning-vs-rag',
    section: 'Vysvětleno',
    level: 'PRO',
    isPremium: false,
    excerpt: 'Dva hlavní přístupy k přizpůsobení AI vašim potřebám. Jaký je rozdíl a kdy který použít?',
    content: [
      'Fine-tuning znamená dodatečné trénování modelu na vlastních datech. Model se "naučí" váš styl, terminologii nebo doménu.',
      'RAG (Retrieval-Augmented Generation) je jiný přístup: model zůstává stejný, ale dostává relevantní informace z vaší databáze jako kontext.',
      'Fine-tuning je vhodný, když potřebujete změnit chování modelu – styl odpovědí, specifický formát, konzistentní tón.',
      'RAG je lepší pro aktuální informace a faktickou přesnost. Data se dají snadno aktualizovat bez přetrénování.',
      'V praxi se často kombinují. Fine-tuned model s RAG backendem může být velmi silná kombinace.',
      'Pro většinu firemních use cases doporučujeme začít s RAG – je rychlejší na implementaci a levnější na údržbu.'
    ],
    tags: ['fine-tuning', 'RAG', 'implementace', 'architektura'],
    author: 'Eva Horová',
    publishedAt: '2026-01-02'
  },

  // NÁVODY (6 articles)
  {
    id: '13',
    title: 'Jak napsat životopis s pomocí AI za 15 minut',
    slug: 'zivotopis-s-ai',
    section: 'Návody',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Praktický návod na vytvoření profesionálního CV s využitím ChatGPT nebo Claude.',
    content: [
      'Krok 1: Připravte si podklady. Seznam pracovních zkušeností, vzdělání, dovedností. Nemusí být perfektní – AI pomůže s formulací.',
      'Krok 2: Zadejte kontext. "Jsem [profese] s [X] lety zkušeností. Hledám pozici [Y]. Pomoz mi napsat profesionální životopis."',
      'Krok 3: Vložte své podklady. AI přeformuluje body do profesionálnějšího jazyka a doporučí strukturu.',
      'Krok 4: Iterujte. "Zkrať sekci o vzdělání." "Přidej více čísel a měřitelných výsledků." "Přizpůsob pro IT firmu."',
      'Krok 5: Finální kontrola. AI může přehlédnout nepřesnosti. Zkontrolujte data, názvy firem a konkrétní údaje.',
      'Bonus tip: požádejte AI o návrh průvodního dopisu ke konkrétní pozici. Vložte text inzerátu pro personalizaci.'
    ],
    tags: ['životopis', 'CV', 'práce', 'produktivita'],
    author: 'Martin Novák',
    publishedAt: '2026-01-07'
  },
  {
    id: '14',
    title: 'Automatizace e-mailů s AI: kompletní průvodce',
    slug: 'automatizace-emailu-ai',
    section: 'Návody',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Nastavte si AI asistenta pro e-maily. Od šablon odpovědí po inteligentní třídění.',
    content: [
      'E-mail je časožrout. Průměrný pracovník stráví 2.5 hodiny denně e-maily. AI může ušetřit polovinu.',
      'Možnost 1: Integrovaná AI (Gmail, Outlook). Zapněte funkce jako "Smart Compose" a "Suggested replies". Základní, ale funkční.',
      'Možnost 2: Dedikovaný nástroj (SaneBox, Superhuman). Pokročilejší třídění, prioritizace a automatizace.',
      'Možnost 3: Custom řešení s API. Pro firmy s specifickými potřebami. Propojte e-mail s CRM přes Make nebo Zapier.',
      'Praktický tip: vytvořte si knihovnu promptů pro časté situace. "Odmítni schůzku zdvořile." "Odpověz na reklamaci." "Požádej o feedback."',
      'Měřte úsporu. Před nasazením si změřte čas strávený e-maily. Po měsíci porovnejte. Cíl: minimálně 30% úspora.'
    ],
    tags: ['e-mail', 'automatizace', 'produktivita', 'Gmail'],
    author: 'Petra Králová',
    publishedAt: '2026-01-06'
  },
  {
    id: '15',
    title: 'Tvorba obsahu s AI: od nápadu k publikaci',
    slug: 'tvorba-obsahu-s-ai',
    section: 'Návody',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Jak využít AI pro blog, sociální sítě i newsletter. Workflow, tipy a nástroje.',
    content: [
      'AI nenahradí kreativitu, ale zrychlí rutinu. Brainstorming, první draft, editace – všude pomůže.',
      'Fáze 1: Nápady. "Navrhni 10 témat článků o [obor] pro [cílovka]." Vyberte nejlepší a rozveďte.',
      'Fáze 2: Osnova. "Vytvoř strukturu článku o [téma]. Cíl: 1500 slov, praktický, s příklady."',
      'Fáze 3: První draft. Nechte AI napsat sekce podle osnovy. Pak přepište vlastními slovy.',
      'Fáze 4: Editace. "Zkontroluj text na gramatiku. Navrhni silnější úvod. Zkrať odstavce."',
      'Důležité: vždy přidejte vlastní hlas a zkušenosti. AI text bez lidského dotyku je poznat.'
    ],
    tags: ['content', 'blog', 'sociální sítě', 'workflow'],
    author: 'Eva Horová',
    publishedAt: '2026-01-05'
  },
  {
    id: '16',
    title: 'ChatGPT pro Excel: 10 praktických použití',
    slug: 'chatgpt-excel-navod',
    section: 'Návody',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Od vzorců po makra. Jak využít AI pro práci s tabulkami.',
    content: [
      '1. Generování vzorců. Popište, co potřebujete: "Vzorec pro součet sloupce A, pokud sloupec B obsahuje \'Praha\'."',
      '2. Vysvětlení složitých vzorců. Vložte vzorec a požádejte o vysvětlení krok po kroku.',
      '3. Konverze dat. "Převeď tato data do pivot tabulky" s popisem struktury.',
      '4. Čištění dat. "Jak odstranit duplicity a prázdné řádky?" – AI navrhne postup.',
      '5. VBA makra. Popište automatizaci: "Makro, které každé pondělí exportuje list jako PDF."',
      '6. Vizualizace. "Jaký typ grafu použít pro srovnání tržeb po měsících?"',
      '7. Analýza. "Jak najít korelaci mezi těmito dvěma sloupci?"',
      '8. Formátování. "Podmíněné formátování: červeně hodnoty pod průměrem."',
      '9. Import dat. "Jak propojit Excel s API a automaticky stahovat data?"',
      '10. Debugging. Když něco nefunguje, popište problém a AI pomůže najít chybu.'
    ],
    tags: ['Excel', 'tabulky', 'vzorce', 'produktivita'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-04'
  },
  {
    id: '17',
    title: 'Nastavení AI chatbota pro web za odpoledne',
    slug: 'ai-chatbot-web-navod',
    section: 'Návody',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Praktický návod na implementaci zákaznického chatbota s využitím moderních AI nástrojů.',
    content: [
      'Budete potřebovat: web, kam chatbot umístíte, a účet u jedné z platforem (Intercom, Crisp, Tidio nebo vlastní řešení).',
      'Krok 1: Vyberte platformu. Pro začátek doporučujeme Tidio nebo Crisp – mají freemium a AI funkce.',
      'Krok 2: Natrénujte znalostní bázi. Vložte FAQ, produktové informace, ceník. Čím více dat, tím lepší odpovědi.',
      'Krok 3: Nastavte fallback. Co se stane, když bot nezná odpověď? Přepojení na člověka nebo e-mail.',
      'Krok 4: Testujte. Projděte typické dotazy zákazníků. Upravte odpovědi, kde bot selhává.',
      'Krok 5: Nasaďte a měřte. Sledujte metriky: počet konverzací, úspěšnost odpovědí, eskalace na lidi.',
      'Tip: začněte s omezeným scope. Chatbot pro "stav objednávky" je lepší než chatbot, který "umí všechno", ale nic pořádně.'
    ],
    tags: ['chatbot', 'zákaznická podpora', 'implementace', 'web'],
    author: 'Martin Novák',
    publishedAt: '2026-01-03'
  },
  {
    id: '18',
    title: 'AI pro učení jazyků: nejlepší nástroje a metody',
    slug: 'ai-uceni-jazyku',
    section: 'Návody',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Jak využít AI k efektivnímu učení cizích jazyků. Od konverzace po gramatiku.',
    content: [
      'AI mění učení jazyků. Už nemusíte čekat na lektora – konverzovat můžete kdykoli.',
      'ChatGPT jako učitel: "Buď můj učitel španělštiny. Opravuj mé chyby a vysvětluj gramatiku česky."',
      'Konverzační praxe: roleplay situace. "Jsem v restauraci v Madridu. Ty jsi číšník. Začni konverzaci."',
      'Specializované nástroje: Duolingo Max, Speak, Pimsleur – všechny integrují AI pro personalizaci.',
      'Tipy pro efektivitu: denní praxe (10 min stačí), zaměřte se na témata, která reálně potřebujete.',
      'Kombinujte s lidmi. AI je skvělá na drill a praxi, ale konverzace s rodilým mluvčím je nenahraditelná.'
    ],
    tags: ['jazyky', 'vzdělávání', 'Duolingo', 'učení'],
    author: 'Petra Králová',
    publishedAt: '2026-01-02'
  },

  // NÁSTROJE (6 articles)
  {
    id: '19',
    title: 'ChatGPT vs Claude vs Gemini: velké srovnání 2026',
    slug: 'chatgpt-claude-gemini-srovnani',
    section: 'Nástroje',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Tři největší AI asistenti v přímém srovnání. Který je nejlepší pro co?',
    content: [
      'ChatGPT (OpenAI): nejrozšířenější, nejlepší ekosystém pluginů, GPT-4 je silný na kreativu i analýzu.',
      'Claude (Anthropic): vyniká v bezpečnosti a nuancích. Lepší pro citlivá témata a dlouhé dokumenty.',
      'Gemini (Google): integrovaný s Google službami. Silný v multimodálních úlohách (text + obrázky).',
      'Pro psaní: ChatGPT nebo Claude. Pro analýzu dat: Gemini s propojením na Sheets. Pro kódování: ChatGPT.',
      'Ceny jsou srovnatelné (cca 20 USD/měsíc za premium). Většina nabízí free tier pro vyzkoušení.',
      'Doporučení: vyzkoušejte všechny tři na svém typickém use case. Osobní preference rozhoduje.'
    ],
    tags: ['ChatGPT', 'Claude', 'Gemini', 'srovnání'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-07'
  },
  {
    id: '20',
    title: 'Midjourney v6: recenze a tipy pro začátečníky',
    slug: 'midjourney-v6-recenze',
    section: 'Nástroje',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Nejpopulárnější AI generátor obrázků v nové verzi. Co se změnilo a jak začít?',
    content: [
      'Midjourney v6 přináší výrazně lepší fotorealismus a porozumění textu v obrázcích.',
      'Jak začít: potřebujete Discord účet. Připojte se na Midjourney server a použijte /imagine příkaz.',
      'Základní prompt: buďte popisní. "Fotorealistický portrét ženy, měkké světlo, bokeh pozadí" funguje lépe než "hezká žena".',
      'Nové funkce v6: lepší ruce (!), text v obrázcích, konzistentnější postavy přes více obrázků.',
      'Cena: od 10 USD/měsíc za základní plán. Pro profesionální použití doporučujeme Standard (30 USD).',
      'Alternativy: DALL-E 3 (integrovaný v ChatGPT), Stable Diffusion (open source, lokální běh).'
    ],
    tags: ['Midjourney', 'generování obrázků', 'design', 'kreativita'],
    author: 'Eva Horová',
    publishedAt: '2026-01-06'
  },
  {
    id: '21',
    title: 'Notion AI: produktivita na steroidech',
    slug: 'notion-ai-recenze',
    section: 'Nástroje',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Jak Notion integruje AI do práce s dokumenty, databázemi a projekty.',
    content: [
      'Notion AI je příplatek k běžnému Notion (10 USD/měsíc navíc). Stojí to za to?',
      'Hlavní funkce: generování textu, sumarizace, překlad, brainstorming, extrakce klíčových bodů.',
      'Silné stránky: integrace přímo do workflow. Nemusíte přepínat mezi aplikacemi.',
      'Praktické použití: shrnutí dlouhých meeting notes, generování první verze dokumentace, brainstorming nápadů.',
      'Slabiny: méně flexibilní než ChatGPT. Pro komplexní úkoly je lepší použít dedikovaný nástroj.',
      'Verdikt: pokud Notion používáte denně, AI addon se vyplatí. Pokud ne, začněte s ChatGPT.'
    ],
    tags: ['Notion', 'produktivita', 'dokumenty', 'organizace'],
    author: 'Martin Novák',
    publishedAt: '2026-01-05'
  },
  {
    id: '22',
    title: 'GitHub Copilot: AI párové programování',
    slug: 'github-copilot-recenze',
    section: 'Nástroje',
    level: 'PRO',
    isPremium: false,
    excerpt: 'Recenze AI asistenta pro vývojáře. Zvýší produktivitu, nebo jen generuje technický dluh?',
    content: [
      'GitHub Copilot je AI nástroj, který navrhuje kód přímo v editoru. Integruje se do VS Code, JetBrains IDE a dalších.',
      'Jak funguje: analyzuje kontext (soubor, komentáře, název funkce) a navrhuje dokončení. Tab pro přijetí.',
      'Výhody: zrychluje rutinní úkoly, pomáhá s neznámými jazyky a frameworky, učí nové patterny.',
      'Rizika: navržený kód může obsahovat chyby, bezpečnostní díry nebo licenční problémy. Vždy kontrolujte.',
      'Pro koho: zkušení vývojáři, kteří dokážou posoudit kvalitu návrhu. Junioři riskují učení špatných návyků.',
      'Cena: 10 USD/měsíc pro jednotlivce, 19 USD pro business. Pro studenty zdarma.'
    ],
    tags: ['GitHub Copilot', 'programování', 'vývojáři', 'VS Code'],
    author: 'Petra Králová',
    publishedAt: '2026-01-04'
  },
  {
    id: '23',
    title: 'Nejlepší AI nástroje pro tvorbu prezentací',
    slug: 'ai-nastroje-prezentace',
    section: 'Nástroje',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Gamma, Tome, Beautiful.ai a další. Které nástroje ušetří hodiny práce na slidech?',
    content: [
      'Tvorba prezentací je časožrout. AI nástroje slibují zkrátit hodiny na minuty. Funguje to?',
      'Gamma: náš favorit. Z textu vytvoří vizuálně atraktivní prezentaci. Intuitivní, moderní design.',
      'Tome: storytelling first. Skvělé pro pitche a prezentace s narativem. AI navrhuje strukturu.',
      'Beautiful.ai: automatické formátování. Vy píšete obsah, AI řeší design. Konzistentní výsledky.',
      'PowerPoint + Copilot: pokud jste v Microsoft ekosystému, stačí upgrade. AI přímo v známém prostředí.',
      'Tip: kombinujte. Nechte AI vytvořit první draft, pak dolaďte ručně. Čistě AI výstupy působí genericky.'
    ],
    tags: ['prezentace', 'Gamma', 'PowerPoint', 'design'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-03'
  },
  {
    id: '24',
    title: 'AI pro audio: přepisy, dabingu a voice klony',
    slug: 'ai-audio-nastroje',
    section: 'Nástroje',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Od automatických přepisů po syntetické hlasy. Přehled nástrojů pro práci s audiem.',
    content: [
      'Přepisy: Whisper od OpenAI je standard. Zdarma, přesný, podporuje češtinu. Alternativa: Otter.ai pro real-time.',
      'Voice klony: ElevenLabs vede. Naklonujte svůj hlas z 30 sekund nahrávky. Kvalita je ohromující.',
      'Dabing: HeyGen, Synthesia – automatický dabing videa do jiných jazyků včetně lip-sync.',
      'Podcast editing: Descript umožňuje editovat audio jako text. Smažete slovo z transkriptu, smaže se z nahrávky.',
      'Etické otázky: voice klony mohou být zneužity. Používejte jen vlastní hlas nebo s explicitním souhlasem.',
      'Pro čeho se hodí: content creatorům, marketérům, e-learning, přístupnost pro neslyšící.'
    ],
    tags: ['audio', 'hlas', 'Whisper', 'ElevenLabs'],
    author: 'Eva Horová',
    publishedAt: '2026-01-02'
  },

  // AI V PRÁCI (6 articles)
  {
    id: '25',
    title: 'Jak AI mění práci v HR a recruitmentu',
    slug: 'ai-hr-recruitment',
    section: 'AI v práci',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Od screeningu životopisů po onboarding. Jak AI transformuje lidské zdroje.',
    content: [
      'HR je jedna z oblastí s největším potenciálem pro AI automatizaci. A také s největšími riziky.',
      'Screening CV: AI dokáže projít stovky životopisů za sekundy. Ale pozor na bias – modely mohou diskriminovat.',
      'Plánování pohovorů: automatizace e-mailů, kalendářů, připomínek. Ušetří hodiny administrativy.',
      'Chatboti pro kandidáty: odpovídají na FAQ, informují o stavu přihlášky, sbírají základní údaje.',
      'Onboarding: personalizované learning paths, automatické přidělení přístupů, AI mentor pro nováčky.',
      'Důležité: AI v HR musí být transparentní. Kandidáti mají právo vědět, jak jsou hodnoceni. Kontrolujte bias.'
    ],
    tags: ['HR', 'recruitment', 'automatizace', 'nábor'],
    author: 'Martin Novák',
    publishedAt: '2026-01-07'
  },
  {
    id: '26',
    title: 'AI v zákaznické podpoře: případová studie',
    slug: 'ai-zakaznicka-podpora-studie',
    section: 'AI v práci',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Jak středně velký e-shop nasadil AI a snížil náklady na support o 40 %.',
    content: [
      'Firma: český e-shop s módou, 50 tisíc objednávek měsíčně, 5členný support tým.',
      'Problém: rostoucí objem dotazů, dlouhé čekací doby, přetížení týmu v sezóně.',
      'Řešení: AI chatbot pro Tier 1 dotazy (stav objednávky, vrácení, FAQ), lidé pro složitější případy.',
      'Implementace: 3 měsíce. Trénink na historických konverzacích, postupný rollout, kontinuální ladění.',
      'Výsledky po 6 měsících: 60 % konverzací vyřešeno botem, průměrná doba odpovědi z hodin na sekundy.',
      'Poučení: klíčový byl dobrý fallback na lidi. Zákazníci nesnáší, když bot "nechápe" a nikam je nepošle.'
    ],
    tags: ['zákaznická podpora', 'chatbot', 'případová studie', 'e-commerce'],
    author: 'Petra Králová',
    publishedAt: '2026-01-06'
  },
  {
    id: '27',
    title: 'AI pro právníky: co funguje a co ne',
    slug: 'ai-pravnici',
    section: 'AI v práci',
    level: 'Pokročilý',
    isPremium: false,
    excerpt: 'Právní profese objevuje AI. Kde pomáhá, kde selhává a co čekat?',
    content: [
      'Právníci jsou konzervativní – a právem. Chyba v dokumentu může stát miliony. Ale AI přesto proniká.',
      'Kde AI pomáhá: rešerše judikatury, první draft smluv, due diligence, analýza velkých objemů dokumentů.',
      'Contract review: AI nástroje jako Kira, LegalSifter analyzují smlouvy a upozorňují na rizikové klauzule.',
      'Kde AI selhává: komplexní právní argumentace, eticky citlivé případy, cokoli vyžadující lidský úsudek.',
      'Rizika: halucinace. AI může vymyslet neexistující judikát. Vždy ověřujte.',
      'Budoucnost: AI jako asistent, ne náhrada. Junior pozice se změní, seniorní práce zůstane lidská.'
    ],
    tags: ['právo', 'právníci', 'smlouvy', 'due diligence'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-05'
  },
  {
    id: '28',
    title: 'AI v marketingu: personalizace a automatizace',
    slug: 'ai-marketing',
    section: 'AI v práci',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Od personalizovaných e-mailů po predikci churn. Jak marketéři využívají AI.',
    content: [
      'Marketing byl jedním z prvních oborů, kde AI našla masové využití. A stále je v čele.',
      'Personalizace: AI analyzuje chování uživatelů a přizpůsobuje obsah, nabídky, timing komunikace.',
      'Content creation: generování textů, obrázků, variant pro A/B testy. Rychlost vs. kvalita.',
      'Prediktivní analýza: kdo odejde (churn), kdo koupí, jaký kanál funguje. Data-driven rozhodování.',
      'Chatboti a konverzační marketing: lead generation, kvalifikace, nurturing automatizovaně.',
      'Praktický tip: začněte s jedním use case. Personalizace e-mailů nebo automatizace reportingu. Pak škálujte.'
    ],
    tags: ['marketing', 'personalizace', 'automatizace', 'e-mail'],
    author: 'Eva Horová',
    publishedAt: '2026-01-04'
  },
  {
    id: '29',
    title: 'Jak AI mění práci finančních analytiků',
    slug: 'ai-financni-analytici',
    section: 'AI v práci',
    level: 'PRO',
    isPremium: false,
    excerpt: 'Automatizace reportingu, prediktivní modely a analýza rizik s AI.',
    content: [
      'Finanční analytici tráví hodiny přípravou dat a reportů. AI může většinu z toho automatizovat.',
      'Data processing: AI čte finanční výkazy, extrahuje klíčové metriky, detekuje anomálie.',
      'Reporting: automatické generování komentářů k číslům. "Tržby vzrostly o 15 % díky sezónnosti a..."',
      'Predikce: modely pro forecast tržeb, cash flow, rizik. Přesnější než ruční odhady.',
      'Risk management: AI analyzuje portfolio, detekuje korelace, navrhuje hedging strategie.',
      'Co zůstane lidem: interpretace, strategie, komunikace s managementem. AI dělá grunt work.'
    ],
    tags: ['finance', 'analytika', 'reporting', 'rizika'],
    author: 'Martin Novák',
    publishedAt: '2026-01-03'
  },
  {
    id: '30',
    title: 'AI ve vzdělávání: učitel nebo nástroj?',
    slug: 'ai-vzdelavani',
    section: 'AI v práci',
    level: 'Začátečník',
    isPremium: false,
    excerpt: 'Jak AI mění učení i výuku. Příležitosti a rizika pro školy i firmy.',
    content: [
      'AI ve vzdělávání vyvolává vášnivé debaty. Je to konec učitelů, nebo jejich nejlepší pomocník?',
      'Pro studenty: personalizované učení, AI tutoring, okamžitá zpětná vazba, překlad materiálů.',
      'Pro učitele: automatické hodnocení, generování testů, adaptivní obsah, identifikace struggling studentů.',
      'Rizika: plagiátorství (studenti nechají AI napsat práci), povrchní učení, závislost na technologii.',
      'Řešení: učit kritické myšlení a práci s AI, ne boj proti ní. AI literacy je nová gramotnost.',
      'Pro firemní vzdělávání: personalizované learning paths, microlearning, just-in-time training.'
    ],
    tags: ['vzdělávání', 'školy', 'e-learning', 'studenti'],
    author: 'Petra Králová',
    publishedAt: '2026-01-02'
  },

  // PRO (8 articles, at least 3 premium)
  // Pillar: Byznys & trh
  {
    id: '31',
    title: 'AI v roce 2026: kdo vydělá, kdo ztratí a co to znamená pro ČR',
    slug: 'ai-rok-2026-analyza',
    section: 'PRO',
    level: 'PRO',
    isPremium: true,
    proPillar: 'Byznys & trh',
    coverImage: 'placeholder:PRO:Byznys & trh',
    inlineVisuals: [
      { type: 'chart', title: 'Očekávaný dopad AI na sektory', alt: 'Graf dopadu AI', data: [
        { label: 'Finance', value: 85 },
        { label: 'Retail', value: 70 },
        { label: 'Výroba', value: 60 },
        { label: 'Služby', value: 75 }
      ], caption: 'Procentuální připravenost sektorů na AI transformaci' }
    ],
    excerpt: 'AI už není hračka pro geeky. V roce 2026 rozhodne o penězích a konkurenceschopnosti to, kdo ji zvládne nasadit do procesů – a kdo zůstane u hezkých demíček.',
    content: [
      'Je snadné zamilovat se do nových modelů a jejich wow efektu. Těžší je udělat z AI skutečný výkon: rychlejší práci, levnější procesy, lepší rozhodování. V roce 2026 se bude lámat chleba – firmy, které AI "přilepí" jen na marketing, budou vypadat moderně. Ty, které ji integrují do obchodu, provozu a řízení, budou moderní doopravdy.',
      '## Trh se štěpí na „modely" a „implementace"\n\nVelcí hráči (OpenAI, Google, Anthropic, Meta) soutěží o nejlepší modely. Ale pro většinu firem to není relevantní. Důležité je, kdo dokáže existující modely nasadit do reálných procesů.',
      'Vzniká nová vrstva: implementation partners, AI consultanti, specializované agentury. Ti, kdo rozumí technologii I businessu.',
      '## Vítězí firmy s daty a disciplínou, ne s nejhlasitějším AI hype\n\nData jsou ropa AI. Firmy s čistými, strukturovanými daty mají náskok. Ty, které mají bordel v CRM, nepomůže žádný model.',
      'Disciplína = měření. Firmy, které nasazují AI na základě metrik (ušetřený čas, snížené náklady, zvýšená konverze), uspějí. Ty, které nasazují "protože konkurence", selžou.',
      '## Kdo vydělá (typicky)\n\n- Firmy s jasným use case a daty\n- Implementační partneři a konzultanti\n- Tvůrci vertikálních AI řešení (AI pro advokáty, AI pro e-shopy...)\n- Vzdělávací firmy a školicí programy',
      '## Kdo ztratí (typicky)\n\n- Firmy spoléhající na "AI to vyřeší"\n- Zaměstnanci rutinních pozic bez rekvalifikace\n- Poskytovatelé služeb, které AI zvládne lépe a levněji\n- Ti, kdo čekají "až to bude hotové"',
      '## Česko: příležitost je v pragmatismu\n\nČR nemá prostředky soutěžit ve vývoji modelů. Ale má talenty a pragmatický přístup. Příležitost je v implementaci a lokalizaci.',
      'České firmy mohou být rychlejší než korporace. Menší, agilnější, méně byrokracie. Pokud se naučí AI nasazovat efektivně, mohou předběhnout větší konkurenty.',
      '## Premium závěr: 3 věci, které udělej hned teď\n\n**90denní AI playbook:**\n1. Dny 1-30: Audit. Kde ve firmě jsou opakující se úkoly? Kde jsou data? Kde je nejvíc bolesti?\n2. Dny 31-60: Pilot. Vyberte JEDEN use case. Nasaďte. Měřte.\n3. Dny 61-90: Scale nebo pivot. Funguje? Škálujte. Nefunguje? Analyzujte proč a zkuste jiný use case.',
      '**3 věci, které udělejte tento týden:**\n1. Svolejte meeting: kdo ve firmě už AI používá? (Tipy: hodně lidí používá ChatGPT "na černo")\n2. Identifikujte TOP 3 rutinní procesy, které zabírají nejvíc času\n3. Přihlaste klíčové lidi na AI školení nebo workshop'
    ],
    tags: ['strategie', 'byznys', 'Česko', 'predikce'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-08'
  },
  // Pillar: Byznys & trh
  {
    id: '32',
    title: 'Jak poznat, že AI projekt fakt funguje: 7 metrik, které nejsou vanity',
    slug: 'ai-projekt-metriky',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Byznys & trh',
    coverImage: 'placeholder:PRO:Byznys & trh',
    excerpt: 'AI projekt je úspěšný teprve tehdy, když se dá obhájit čísly. Ne počtem promptů, ale dopadem na čas, náklady a kvalitu.',
    content: [
      '## Proč většina AI projektů nedojde dál než „wow demo"\n\nJe snadné udělat impresivní demo. Těžké je dostat AI do produkce a měřit reálný dopad. Většina projektů selže na přechodu z "funguje to" na "vyplatí se to".',
      '## 7 metrik, které používej (a co znamenají)\n\n**1. Time-to-completion (TTC)**\nKolik času úkol zabíral před AI vs. po AI. Nejjednodušší a nejpřesvědčivější metrika.',
      '**2. Cost per task (CPT)**\nNáklady na jeden úkol. Zahrnuje: mzdy, API calls, nástroje, režii. Porovnej s baseline.',
      '**3. Quality score**\nJak kvalitní je výstup? Definuj metriku pro svůj use case: chybovost, zákaznická spokojenost, přesnost.',
      '**4. Adoption rate**\nKolik lidí AI reálně používá? High tech, low use = fail. Sleduj denní/týdenní active users.',
      '**5. Escalation rate**\nKolik případů AI "eskaluje" na člověka? Příliš mnoho = špatný model nebo training. Příliš málo = možná přehlíží problémy.',
      '**6. ROI timeline**\nZa jak dlouho se investice vrátí? Buď realistický. Většina AI projektů má ROI 6-18 měsíců.',
      '**7. Employee satisfaction**\nJak se zaměstnanci cítí? AI má pomáhat, ne frustrovat. Měř NPS nebo pravidelné surveys.',
      '## Vanitní metriky (tyhle vypadají hezky, ale lžou)\n\n- Počet promptů / dotazů (aktivita ≠ hodnota)\n- "Potenciální úspory" (bez skutečného měření)\n- Přesnost modelu na testovacích datech (bez produkční validace)\n- Počet integrací (integrace ≠ utilizace)',
      '## Doporučený reporting pro vedení (1 slide)\n\n**AI Dashboard – měsíční report:**\n- TTC: průměrná úspora X hodin/týden\n- CPT: snížení nákladů o Y %\n- Quality: chybovost Z % (cíl: pod 5 %)\n- Adoption: N aktivních uživatelů (trend: ↑↓)\n- ROI: break-even za M měsíců',
      '## Jak nastavit KPI hned dnes (prakticky)\n\n1. Vyberte 2-3 metriky relevantní pro váš projekt\n2. Změřte baseline PŘED nasazením AI\n3. Nastavte automatický reporting (týdenní minimum)\n4. Reviewujte s týmem měsíčně\n5. Buďte připraveni přiznat, když něco nefunguje',
      '---\n\n**Chci další PRO články** | **Odebírat PRO digest**'
    ],
    tags: ['metriky', 'KPI', 'projektové řízení', 'ROI'],
    author: 'Petra Králová',
    publishedAt: '2026-01-07'
  },
  // Pillar: Regulace & governance
  {
    id: '33',
    title: 'Enterprise AI governance: jak nastavit pravidla hry',
    slug: 'enterprise-ai-governance',
    section: 'PRO',
    level: 'PRO',
    isPremium: true,
    proPillar: 'Regulace & governance',
    excerpt: 'Velké firmy potřebují AI strategii, procesy a governance. Framework pro zodpovědné nasazení.',
    content: [
      'Bez governance je AI jako divoký západ. Každý tým si nasadí, co chce. Data tečou kam nemají. Rizika rostou.',
      '## Proč governance\n\nGovernance není brzda inovace. Je to plánovaná cesta místo náhodné procházky. Snižuje rizika, zvyšuje efektivitu, zajišťuje compliance.',
      '## Framework pro AI governance\n\n**1. Policy layer**\n- Jaké use cases jsou povolené?\n- Jaká data mohou do AI?\n- Kdo schvaluje nové projekty?\n- Jak řešíme incidenty?',
      '**2. Process layer**\n- Request → Review → Approval → Pilot → Production\n- Risk assessment pro každý projekt\n- Pravidelné audity běžících systémů',
      '**3. Technology layer**\n- Approved vendors a modely\n- Data flow a bezpečnost\n- Monitoring a logging\n- Fallback mechanismy',
      '**4. People layer**\n- AI Council nebo Steering Committee\n- Clear ownership pro každý projekt\n- Training a certifikace\n- Incident response tým',
      '## Praktické kroky pro implementaci\n\n1. Vytvořte AI Council (cross-functional: IT, Legal, HR, Business)\n2. Definujte risk matrix (high/medium/low risk use cases)\n3. Napište AI Policy (max 2 strany, jasný jazyk)\n4. Implementujte lightweight approval process\n5. Nastavte quarterly review všech AI projektů',
      '## Nejčastější chyby\n\n- Příliš složitá governance → nikdo ji nedodržuje\n- Governance bez buy-in → obcházení\n- Žádná governance → chaos a rizika\n- Governance bez flexibility → zabití inovace',
      '## Checklist pro enterprise AI readiness\n\n✅ AI Policy schválená boardem\n✅ Risk assessment proces\n✅ Approved vendor list\n✅ Data governance propojená s AI\n✅ Incident response plán\n✅ Training program pro zaměstnance\n✅ Měření a reporting KPIs'
    ],
    tags: ['governance', 'enterprise', 'compliance', 'strategie'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-06'
  },
  // Pillar: Dev & data
  {
    id: '34',
    title: 'AI agents: od chatbotů k autonomním systémům',
    slug: 'ai-agents-analyza',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Dev & data',
    excerpt: 'AI agenti jsou další evoluce. Systémy, které plánují, rozhodují a jednají samostatně.',
    content: [
      'Chatbot odpovídá na otázky. Agent řeší úkoly. To je klíčový rozdíl.',
      '## Co je AI agent\n\nAI agent je systém, který:\n- Přijme cíl (ne jednotlivou instrukci)\n- Rozloží ho na kroky\n- Provede kroky autonomně\n- Reaguje na výsledky a přizpůsobuje plán',
      '## Příklady agentů\n\n- Booking agent: "Zarezervuj mi letenku do Paříže" → agent hledá, porovnává, rezervuje\n- Research agent: "Najdi kompetitivní analýzu trhu X" → agent prochází zdroje, sumarizuje, vytváří report\n- Coding agent: "Implementuj tuto feature" → agent píše kód, testuje, opravuje chyby',
      '## Současný stav\n\nAgenti jsou reální, ale zatím nespolehliví pro kritické úkoly. Fungují dobře pro:\n- Jednoduché, dobře definované úkoly\n- Úkoly s nízkou cenou chyby\n- Prostředí s jasným feedbackem',
      '## Technické výzvy\n\n- Planning: agenti dělají chybné kroky, které eskalují\n- Tool use: integrace s reálnými systémy je křehká\n- Guardrails: jak zabránit škodlivým akcím?\n- Observability: jak ladit, když agent "přemýšlí"?',
      '## Business příležitosti\n\n2026 je rok, kdy se agenti dostanou do produkce pro vybrané use cases. First-movers advantage pro ty, kdo je nasadí zodpovědně.',
      '## Doporučení\n\n1. Sledujte vývoj (AutoGPT, LangChain agents, Anthropic tooling)\n2. Experimentujte v sandboxu s nízkým rizikem\n3. Nepouštějte agenty na kritické systémy bez human-in-the-loop\n4. Připravujte infrastrukturu: API, nástroje, monitoring'
    ],
    tags: ['agents', 'automatizace', 'budoucnost', 'vývoj'],
    author: 'Eva Horová',
    publishedAt: '2026-01-05'
  },
  // Pillar: Regulace & governance
  {
    id: '35',
    title: 'Právní rizika AI: co může firmu stát miliony',
    slug: 'pravni-rizika-ai',
    section: 'PRO',
    level: 'PRO',
    isPremium: true,
    proPillar: 'Regulace & governance',
    excerpt: 'Od autorských práv po diskriminaci. Přehled právních rizik a jak je minimalizovat.',
    content: [
      'AI přináší nová právní rizika, která většina firem podcenila. A pokuty rostou.',
      '## Autorská práva\n\nKdo vlastní výstup AI? Je trénink na cizích datech legální? Soudní spory běží, judikatura vzniká.',
      'Praktické riziko: používáte AI generované texty nebo obrázky? Ujistěte se, že licence to umožňuje. A že je originální (AI může "vzpomenout" na training data).',
      '## Diskriminace a bias\n\nAI v HR, úvěrování nebo pojišťovnictví může diskriminovat. A firma je odpovědná.',
      'Praktické riziko: testujte modely na bias. Dokumentujte. Buďte transparentní vůči dotčeným osobám.',
      '## GDPR a data protection\n\nAI zpracovává osobní údaje? Potřebujete právní základ. Posuzujete lidi automatizovaně? Mají právo na vysvětlení.',
      'Praktické riziko: DPIA (Data Protection Impact Assessment) pro AI projekty. Informujte subjekty údajů.',
      '## Odpovědnost za škodu\n\nKdo odpovídá, když AI udělá chybu? Výrobce modelu? Provozovatel? Uživatel? Zatím nejasné.',
      'Praktické riziko: pojištění, disclaimery, human-in-the-loop pro kritická rozhodnutí.',
      '## AI Act compliance\n\nVysoce rizikové aplikace vyžadují certifikaci, dokumentaci, monitoring. Nesplnění = pokuty až 7 % obratu.',
      'Praktické riziko: klasifikujte své AI systémy. Připravujte dokumentaci. Sledujte vývoj regulace.',
      '## Checklist pro právní risk management\n\n✅ Audit AI systémů ve firmě\n✅ Právní posouzení každého use case\n✅ Dokumentace procesů a rozhodování\n✅ Training zaměstnanců na compliance\n✅ Incident response pro AI incidenty\n✅ Pravidelná revize s právníkem'
    ],
    tags: ['právo', 'compliance', 'GDPR', 'AI Act'],
    author: 'Martin Novák',
    publishedAt: '2026-01-04'
  },
  // Pillar: Byznys & trh (team building is business)
  {
    id: '36',
    title: 'Budování AI týmu: koho najmout a jak',
    slug: 'budovani-ai-tymu',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Byznys & trh',
    excerpt: 'Kompetence, role a struktura pro úspěšný AI tým. Od prvního hire po scale-up.',
    content: [
      'AI projekty selhávají kvůli lidem, ne technologii. Správný tým je základ úspěchu.',
      '## Klíčové role\n\n**Data Engineer**: pipeline, kvalita dat, infrastruktura. Bez čistých dat není AI.\n\n**ML Engineer**: modely, training, deployment. Technické srdce týmu.\n\n**AI Product Manager**: use cases, prioritizace, byznys hodnota. Most mezi tech a business.\n\n**Domain Expert**: člověk, který rozumí oboru. Kritický pro relevanci.',
      '## Fáze budování týmu\n\n**Fáze 1 (0-1)**: Jeden "full-stack AI" člověk nebo konzultant. Experimentuje, validuje use cases.\n\n**Fáze 2 (1-3)**: Malý tým. ML engineer + data engineer + product owner.\n\n**Fáze 3 (3+)**: Specializace. Oddělené data a ML týmy, dedicated PM, možná research.',
      '## Kde hledat talenty\n\n- Interně: retrain existující vývojáře, analytiky\n- Univerzity: ČVUT, MFF UK, VŠE mají silné programy\n- Komunita: meetupy, konference, open source\n- Remote: talenty nejsou jen v Praze',
      '## Kompenzace a retence\n\nAI talenty jsou drahé. Očekávejte 80-150k+ CZK pro seniory. Nabídněte:\n- Zajímavé projekty (to je často důležitější než peníze)\n- Learning budget a čas na rozvoj\n- Flexibilitu a autonomii\n- Jasnou kariérní cestu',
      '## Nejčastější chyby\n\n- Najmete PhDs, kteří neumí deployment\n- Najmete devops, kteří neumí ML\n- Izolujete AI tým od businessu\n- Podceníte data engineering',
      '## Checklist pro nábor\n\n✅ Definujte role jasně (co přesně bude dělat?)\n✅ Technický screening (praktické úkoly, ne teorie)\n✅ Culture fit (spolupráce je klíčová)\n✅ Realistická očekávání (AI není magie)\n✅ Onboarding plán (první projekty, mentoring)'
    ],
    tags: ['tým', 'nábor', 'HR', 'organizace'],
    author: 'Petra Králová',
    publishedAt: '2026-01-03'
  },
  // Pillar: Dev & data (security is technical)
  {
    id: '37',
    title: 'AI a bezpečnost: nové hrozby, nové obrany',
    slug: 'ai-bezpecnost-hrozby',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Dev & data',
    excerpt: 'AI mění kybernetickou bezpečnost na obou stranách. Co musíte vědět.',
    content: [
      'AI je dvojsečná zbraň. Útočníci ji používají. Obránci také. Kdo bude rychlejší?',
      '## AI pro útočníky\n\n- Phishing: personalizované, gramaticky perfektní e-maily ve velkém\n- Social engineering: deepfake voice calls, video manipulace\n- Malware: polymorfní kód, který se mění aby unikl detekci\n- Reconnaissance: automatizované skenování zranitelností',
      '## AI pro obránce\n\n- Detekce anomálií: modely rozpoznávají neobvyklé chování v síti\n- Automatická odpověď: izolace hrozeb bez lidského zásahu\n- Threat intelligence: analýza velkých objemů dat o hrozbách\n- User behavior analytics: identifikace kompromitovaných účtů',
      '## Nové typy útoků\n\n**Prompt injection**: útočník vloží instrukce do vstupu, které přepíšou chování modelu.\n\n**Data poisoning**: kontaminace trénovacích dat pro ovlivnění modelu.\n\n**Model stealing**: extrakce modelu přes API dotazy.\n\n**Adversarial examples**: vstupy, které oklamou model (např. sticker na značce změní její klasifikaci).',
      '## Jak se chránit\n\n1. Input validation: filtrujte a sanitizujte vstupy do AI systémů\n2. Output validation: kontrolujte, co AI generuje před použitím\n3. Monitoring: logujte a analyzujte chování AI systémů\n4. Access control: kdo má přístup k modelům a datům?\n5. Regular testing: red team vaše AI systémy',
      '## Doporučení pro security týmy\n\n- Zahrňte AI systémy do security architecture review\n- Školte zaměstnance na deepfakes a AI phishing\n- Implementujte guardrails pro AI výstupy\n- Připravte incident response pro AI incidenty',
      '## Budoucnost\n\nZávod ve zbrojení pokračuje. Investujte do obou stran: AI pro bezpečnost a bezpečnost AI.'
    ],
    tags: ['bezpečnost', 'kybernetická bezpečnost', 'hrozby', 'ochrana'],
    author: 'Jan Svoboda',
    publishedAt: '2026-01-02'
  },
  // Pillar: Byznys & trh
  {
    id: '38',
    title: 'AI ROI kalkulačka: jak obhájit investici',
    slug: 'ai-roi-kalkulacka',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Byznys & trh',
    excerpt: 'Praktický framework pro výpočet návratnosti AI projektů. S příklady a šablonou.',
    content: [
      'CFO se ptá: "Kolik to stojí a kdy se to vrátí?" Bez dobré odpovědi projekt nedostane budget.',
      '## Komponenty AI ROI\n\n**Náklady (CAPEX + OPEX):**\n- Licence za nástroje a API\n- Infrastruktura (cloud, compute)\n- Lidé (interní tým nebo konzultanti)\n- Training a change management\n- Ongoing maintenance',
      '**Přínosy (měřitelné):**\n- Úspora času (× hodinová sazba)\n- Snížení chybovosti (× náklady na chybu)\n- Zvýšení konverze (× marže)\n- Snížení churn (× CLV)\n- Úspora FTE (× náklady na zaměstnance)',
      '## Vzorec\n\nROI = (Přínosy - Náklady) / Náklady × 100 %\n\nPayback period = Náklady / Měsíční přínosy',
      '## Příklad: AI chatbot pro zákaznickou podporu\n\n**Náklady (rok 1):**\n- Platforma: 120 000 Kč\n- Implementace: 200 000 Kč\n- Training: 50 000 Kč\n- Celkem: 370 000 Kč',
      '**Přínosy (rok 1):**\n- 40 % dotazů automatizováno\n- Úspora 1.5 FTE × 600 000 Kč = 900 000 Kč\n- ROI = (900 000 - 370 000) / 370 000 = 143 %\n- Payback = 4.9 měsíce',
      '## Tipy pro prezentaci\n\n1. Buďte konzervativní v odhadech (raději překvapit pozitivně)\n2. Ukažte citlivostní analýzu (co když přínosy budou o 30 % nižší?)\n3. Zahrňte kvalitativní přínosy (spokojenost zákazníků, konkurenční výhoda)\n4. Definujte milestones pro měření',
      '## Šablona\n\nVytvořte tabulku s:\n- Položka | Rok 1 | Rok 2 | Rok 3\n- Náklady (rozepsané)\n- Přínosy (rozepsané)\n- Net benefit\n- Kumulativní cash flow\n- Break-even měsíc'
    ],
    tags: ['ROI', 'finance', 'business case', 'investice'],
    author: 'Eva Horová',
    publishedAt: '2026-01-01'
  },
  // Pillar: Výzkum - NEW ARTICLE
  {
    id: '39',
    title: 'Research digest: GPT-5 benchmarky a co z nich plyne',
    slug: 'research-digest-gpt5-benchmarky',
    section: 'PRO',
    level: 'PRO',
    isPremium: false,
    proPillar: 'Výzkum',
    excerpt: 'Přehled nejnovějších benchmarků a výzkumných zjištění o velkých jazykových modelech. Co vyšlo a proč to matters.',
    content: [
      'Každý měsíc vychází desítky papers o LLM. Většina je šum. Tady je to podstatné.',
      '## Nové benchmarky pro reasoning\n\nKlasické benchmarky (MMLU, HellaSwag) už nestačí – modely je "hackují". Nové testy se zaměřují na skutečné uvažování.',
      '## ARC-AGI a GPQA\n\nARC-AGI testuje abstraktní reasoning na vizuálních puzzlech. GPQA klade PhD-level otázky. GPT-5 dosahuje 85 % na GPQA vs. 70 % u GPT-4.',
      '## Multimodální schopnosti\n\nNové modely lépe kombinují text, obraz a audio. Gemini 2 a GPT-5 zvládají video understanding a real-time analýzu.',
      '## Co to znamená pro praxi\n\n- Reasoning úlohy jsou spolehlivější\n- Multimodální use cases jsou reálné\n- Ale: halucinace zůstávají problém\n- Fine-tuning na doménových datech stále pomáhá',
      '## Klíčové papers k přečtení\n\n1. "Scaling Laws for Transfer" (Anthropic)\n2. "Constitutional AI 2.0" (Anthropic)\n3. "Mixture of Experts at Scale" (Google)\n4. "Long Context Faithfulness" (OpenAI)',
      '## Doporučení\n\nNehoňte se za nejnovějším modelem. Důležitější je kvalita dat a jasný use case. Nové modely pomohou, ale nezachrání špatný projekt.'
    ],
    tags: ['výzkum', 'benchmarky', 'GPT-5', 'papers'],
    author: 'Jan Svoboda',
    publishedAt: '2025-12-28'
  },
  // Pillar: Výzkum - NEW ARTICLE (Premium)
  {
    id: '40',
    title: 'Emerging research: AI v medicíně 2026',
    slug: 'vyzkum-ai-medicina-2026',
    section: 'PRO',
    level: 'PRO',
    isPremium: true,
    proPillar: 'Výzkum',
    excerpt: 'Přehled průlomových výzkumů v aplikaci AI v medicíně. Od diagnostiky po drug discovery.',
    content: [
      'Medicína je oblast, kde AI přináší měřitelné výsledky. Tady jsou nejdůležitější průlomy roku.',
      '## AlphaFold 3 a protein interactions\n\nNová verze predikuje nejen strukturu proteinů, ale i jejich interakce s léky. Revolucionizuje drug discovery.',
      '## AI v radiologii\n\nModely dosahují přesnosti srovnatelné s radiology v detekci rakoviny prsu, plic a kůže. FDA schválila první autonomous AI diagnostické systémy.',
      '## Personalizovaná medicína\n\nAI analyzuje genomická data a navrhuje personalizované léčebné protokoly. Pilotní programy běží v Mayo Clinic a Cleveland Clinic.',
      '## Klinické studie s AI\n\nAI pomáhá identifikovat vhodné pacienty pro studie a predikovat výsledky. Zkracuje čas vývoje léků o měsíce.',
      '## Etické otázky\n\n- Kdo je odpovědný za AI diagnózu?\n- Jak zajistit rovný přístup?\n- Transparentnost algoritmů vs. proprietární IP',
      '## Příležitosti pro české firmy\n\nČeské zdravotnictví má kvalitní data. Příležitost pro startupy v medical AI, pokud zvládnou regulatorní překážky.'
    ],
    tags: ['medicína', 'výzkum', 'AlphaFold', 'diagnostika'],
    author: 'Petra Králová',
    publishedAt: '2025-12-25'
  },
  // Pillar: Dev & data - NEW ARTICLE (Premium)
  {
    id: '41',
    title: 'RAG v produkci: architektura, evaluace a škálování',
    slug: 'rag-produkce-architektura',
    section: 'PRO',
    level: 'PRO',
    isPremium: true,
    proPillar: 'Dev & data',
    excerpt: 'Praktický guide pro nasazení RAG systémů v enterprise prostředí. Od architektury po monitoring.',
    content: [
      'RAG je zlatý standard pro enterprise AI. Ale přejít z demo do produkce je těžké. Tady je jak.',
      '## Architektura RAG systému\n\n**Komponenty:**\n- Document ingestion pipeline\n- Embedding model (OpenAI, Cohere, local)\n- Vector database (Pinecone, Weaviate, Qdrant)\n- Retrieval layer\n- LLM for generation\n- Reranking (optional)',
      '## Chunking strategies\n\n- Fixed size: jednoduché, ale ztrácí kontext\n- Semantic: lepší kvalita, složitější implementace\n- Hierarchical: kombinuje oba přístupy\n- Doporučení: začněte semantic s overlap',
      '## Evaluace RAG systémů\n\n**Metriky:**\n- Retrieval precision/recall\n- Answer relevance\n- Faithfulness (groundedness)\n- Latency a cost\n\n**Nástroje:** Ragas, TruLens, LangSmith',
      '## Škálování\n\n- Horizontal scaling vector DB\n- Caching frequent queries\n- Async processing pro batch\n- Edge deployment pro latency',
      '## Production checklist\n\n✅ Monitoring retrieval quality\n✅ Logging všech queries a responses\n✅ Fallback pro edge cases\n✅ Regular reindexing pipeline\n✅ Cost alerting\n✅ A/B testing pro improvements',
      '## Časté chyby\n\n- Příliš velké chunky\n- Ignorování metadata\n- Žádná evaluace\n- Over-engineering od začátku'
    ],
    tags: ['RAG', 'architektura', 'MLOps', 'produkce'],
    author: 'Eva Horová',
    publishedAt: '2025-12-20'
  }
];

export const getSectionSlug = (section: Section): string => {
  const map: Record<Section, string> = {
    'Novinky': 'novinky',
    'Vysvětleno': 'vysvetleno',
    'Návody': 'navody',
    'Nástroje': 'nastroje',
    'AI v práci': 'ai-v-praci',
    'PRO': 'pro'
  };
  return map[section];
};

export const getSectionFromSlug = (slug: string): Section | null => {
  const map: Record<string, Section> = {
    'novinky': 'Novinky',
    'vysvetleno': 'Vysvětleno',
    'navody': 'Návody',
    'nastroje': 'Nástroje',
    'ai-v-praci': 'AI v práci',
    'pro': 'PRO'
  };
  return map[slug] || null;
};

export const getSectionColor = (section: Section): string => {
  const map: Record<Section, string> = {
    'Novinky': 'bg-section-news',
    'Vysvětleno': 'bg-section-explained',
    'Návody': 'bg-section-guides',
    'Nástroje': 'bg-section-tools',
    'AI v práci': 'bg-section-work',
    'PRO': 'bg-section-pro'
  };
  return map[section];
};

export const getLevelColor = (level: Level): string => {
  const map: Record<Level, string> = {
    'Začátečník': 'bg-level-beginner text-level-beginner-foreground',
    'Pokročilý': 'bg-level-advanced text-level-advanced-foreground',
    'PRO': 'bg-level-pro text-level-pro-foreground'
  };
  return map[level];
};

export const getLevelTooltip = (level: Level): string => {
  const map: Record<Level, string> = {
    'Začátečník': 'Vysvětlené od nuly, bez žargonu.',
    'Pokročilý': 'Víc detailů, méně omáčky.',
    'PRO': 'Hloubka, praxe, trh a technické souvislosti.'
  };
  return map[level];
};
