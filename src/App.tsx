import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Globe,
  ArrowRight,
  CheckCircle2,
  Send,
  MessageCircle,
  Mail,
  Code2,
  ShieldCheck,
  Rocket,
  Star,
  Layers3,
} from 'lucide-react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiVercel, 
  SiFigma, 
  SiWordpress, 
  SiNodedotjs, 
  SiFramer 
} from 'react-icons/si';
import { DottedSurface } from './components/ui/dotted-surface';
import { SplineSceneBasic } from './components/ui/demo';
import { Pricing, PricingPlan } from './components/blocks/pricing';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';
import { Lang, translations } from './translations';

function App() {
  const [lang, setLang] = useState<Lang>('ru');
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const t = translations[lang];
  const processDescriptions: Record<Lang, string[]> = {
    ru: [
      'Оставляете заявку, фиксируем цели и KPI.',
      'Собираем требования, аудиторию и офферы.',
      'Проектируем структуру и сценарии конверсии.',
      'Собираем визуал и UI-компоненты в едином стиле.',
      'Разрабатываем адаптивный и быстрый сайт.',
      'Проверяем на устройствах, браузерах и формах.',
      'Публикуем, подключаем аналитику и поддержку.',
    ],
    en: [
      'You submit a request, we define goals and KPIs.',
      'We gather requirements, audience data, and offers.',
      'We design structure and conversion scenarios.',
      'We build visuals and UI components in one style.',
      'We develop a responsive and fast website.',
      'We test devices, browsers, and forms.',
      'We launch, connect analytics, and support.',
    ],
    kg: [
      'Заявка калтырасыз, максаттар жана KPI такталат.',
      'Талаптар, аудитория жана офферлер чогултулат.',
      'Структура жана конверсия сценарийлери түзүлөт.',
      'Визуал жана UI компоненттер бир стилде жыйналат.',
      'Ыңгайлашкан жана ылдам сайт иштелет.',
      'Түзмөк, браузер жана форма текшерилет.',
      'Сайт жарыяланып, аналитика жана колдоо кошулат.',
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const navAnchors = useMemo(() => ['#hero', '#services', '#pricing', '#portfolio', '#contacts'], []);

  const pricingPlans: PricingPlan[] = useMemo(() => {
    return t.pricing.columns.map((col, index) => {
      const isPopular = index === 1;
      const priceStr = t.pricing.rows[t.pricing.rows.length - 1].values[index];
      const monthlyPriceNum = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
      const yearlyPriceNum = Math.floor(monthlyPriceNum * 0.8); // 20% discount

      const features = t.pricing.rows.slice(0, -1).map(row => `${row.feature}: ${row.values[index]}`);

      return {
        name: col,
        price: monthlyPriceNum.toString(),
        yearlyPrice: yearlyPriceNum.toString(),
        period: '', // Empty as the design manages the period at the component top layer
        features: features,
        description: '', // You can add custom descriptions per plan if needed
        buttonText: t.consult.button,
        href: '#contacts',
        isPopular: isPopular,
      };
    });
  }, [t]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-color)] text-[var(--text-primary)]">
      <DottedSurface />

      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--glass-bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-sm font-semibold tracking-[0.18em] uppercase">
            {t.brand}
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
            {t.nav.map((item, index) => (
              <a key={item} href={navAnchors[index]} className="transition hover:text-[var(--text-primary)]">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1">
              <Globe size={16} className="mx-1 opacity-70" />
              {(['ru', 'en', 'kg'] as Lang[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setLang(value)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                    lang === value ? 'bg-[var(--text-primary)] text-[var(--bg-color)]' : 'text-[var(--text-primary)]/80'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              aria-label="Toggle theme"
              className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2.5 transition hover:scale-105"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <section id="hero" className="relative min-h-[92vh] overflow-hidden py-14 md:py-24">
          <div className="absolute right-[-28%] top-[-10%] h-[72vh] w-[72vw] md:right-[-8%] md:top-[2%] md:h-[86vh] md:w-[52vw] hero-robot">
            <SplineSceneBasic />
          </div>

          <div className="relative z-10 max-w-3xl reveal space-y-6">
            <span className="inline-flex rounded-full border border-[var(--glass-border)] px-4 py-1.5 text-xs tracking-[0.14em] uppercase text-[var(--text-secondary)]">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-7xl">{t.hero.title}</h1>
            <p className="max-w-xl text-base text-[var(--text-secondary)] md:text-lg">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contacts"
                className="btn-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={18} />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-[var(--glass-hover)]"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="grid max-w-2xl gap-3 pt-4 text-sm text-[var(--text-secondary)] md:grid-cols-2">
              {t.hero.benefits.map((benefit) => (
                <div key={benefit} className="card-mini flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal py-10 md:py-16" id="about">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {t.about.cards.map((card) => (
              <article key={card.title} className="card-premium p-6">
                <h3 className="mb-3 text-xl font-semibold">{card.title}</h3>
                <p className="text-[var(--text-secondary)]">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing">
          <Pricing 
            plans={pricingPlans} 
            title={t.pricing.title} 
            description={t.pricing.description}
            annualBillingText={t.pricing.annualBillingText}
            saveText={t.pricing.saveText}
            popularBadgeText={t.pricing.popularBadgeText}
          />
        </section>

        <section id="portfolio" className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.portfolio.title}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {t.portfolio.items.map((item) => (
              <a
                key={item.name}
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card card-premium group overflow-hidden"
              >
                <div className="h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="space-y-2 p-5">
                  <div className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">{item.niche}</div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.task}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{item.done}</p>
                  <p className="font-medium text-emerald-500">{item.result}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.why.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {t.why.items.map((item) => (
              <div key={item} className="card-premium flex items-start flex-col gap-3 p-6 min-w-[280px] w-[280px] shrink-0 snap-start relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 mb-2">
                  <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <span className="font-medium text-[var(--text-primary)] leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.process.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar relative">
            {/* Connecting Line */}
            <div className="absolute top-10 left-0 w-[200%] h-0.5 bg-[var(--border-color)] -z-10" />
            {t.process.steps.map((step, idx) => (
              <div key={step} className="card-premium p-6 min-w-[300px] w-[300px] shrink-0 snap-start flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-color)] flex items-center justify-center font-bold text-sm ring-4 ring-[var(--bg-color)]">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{step}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{processDescriptions[lang][idx]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.cases.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {t.cases.items.map((caseItem) => (
              <article key={caseItem.name} className="card-premium p-8 min-w-[320px] w-[320px] shrink-0 snap-start border-t-4 border-t-sky-500">
                <h3 className="text-xl font-semibold mb-6">{caseItem.name}</h3>
                <ul className="grid gap-3">
                  {caseItem.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Rocket size={16} className="text-sky-500 mt-0.5" />
                      <span className="leading-tight">{metric}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.testimonials.title}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.testimonials.items.map((review) => (
              <article key={review.author} className="card-premium p-6">
                <div className="mb-3 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`${review.author}-${i}`} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">“{review.text}”</p>
                <p className="mt-5 font-semibold">{review.author}</p>
                <p className="text-xs text-[var(--text-secondary)]">{review.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.faq.title}</h2>
          <div className="card-premium p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {t.faq.items.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className={i === t.faq.items.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-left text-base md:text-lg">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.guarantees.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {t.guarantees.items.map((item) => (
              <div key={item} className="card-premium p-6 min-w-[280px] w-[280px] shrink-0 snap-start flex flex-col gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 shrink-0">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                </div>
                <span className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.audience.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {t.audience.items.map((item) => (
              <div key={item} className="card-premium p-6 min-w-[260px] w-[260px] shrink-0 snap-start flex items-center justify-center text-center">
                <div className="font-medium">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.technologies.title}</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            {t.technologies.items.map((tech) => {
              let Icon: any = Layers3;
              if (tech.includes('React')) Icon = SiReact;
              if (tech.includes('Next.js')) Icon = SiNextdotjs;
              if (tech.includes('TypeScript')) Icon = SiTypescript;
              if (tech.includes('Tailwind')) Icon = SiTailwindcss;
              if (tech.includes('Vercel')) Icon = SiVercel;
              if (tech.includes('Figma')) Icon = SiFigma;
              if (tech.includes('WordPress')) Icon = SiWordpress;
              if (tech.includes('Node.js')) Icon = SiNodedotjs;
              if (tech.includes('Framer')) Icon = SiFramer;

              return (
                <div key={tech} className="card-premium flex items-center justify-center gap-3 p-6 min-w-[200px] w-[200px] shrink-0 snap-start text-sm font-medium transition hover:scale-105">
                  <Icon size={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>{tech}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <div className="card-premium p-8 md:p-10 border border-[var(--text-secondary)]">
            <h2 className="text-3xl font-semibold md:text-4xl">{t.consult.title}</h2>
            <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">{t.consult.text}</p>
            <a
              href="#contacts"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--text-primary)] px-6 py-3 font-medium text-[var(--bg-color)] transition hover:-translate-y-0.5"
            >
              {t.consult.button}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section id="contacts" className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.contacts.title}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card-premium p-6">
              <p className="mb-5 text-[var(--text-secondary)]">{t.contacts.text}</p>
              <form className="space-y-3">
                <input className="field" placeholder={t.contacts.form.name} />
                <input className="field" placeholder={t.contacts.form.contact} />
                <textarea className="field min-h-[120px]" placeholder={t.contacts.form.message} />
                <button type="button" className="btn-cta inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium">
                  {t.contacts.form.submit}
                </button>
              </form>
            </div>

            <div className="grid gap-3">
              <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="card-premium flex items-center gap-3 p-5 transition hover:-translate-y-0.5">
                <Send size={18} /> Telegram
              </a>
              <a href="https://wa.me/+996557555058" target="_blank" rel="noopener noreferrer" className="card-premium flex items-center gap-3 p-5 transition hover:-translate-y-0.5">
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href="mailto:hello@linkhub.dev" className="card-premium flex items-center gap-3 p-5 transition hover:-translate-y-0.5">
                <Mail size={18} /> hello@linkhub.dev
              </a>
              <div className="card-premium flex items-center gap-3 p-5">
                <Code2 size={18} /> React / Next.js / WordPress / Headless CMS
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-color)] py-8 text-center text-sm text-[var(--text-secondary)]">
        {t.footer}
      </footer>
    </div>
  );
}

export default App;
