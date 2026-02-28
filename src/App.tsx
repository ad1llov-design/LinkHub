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
  Lock,
  ShieldCheck,
  Rocket,
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
import { Pricing } from './components/blocks/pricing';
import { TestimonialsSection } from './components/blocks/testimonials-with-marquee';
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
          } else {
            // Only remove if it's scrolling out of view (going below viewport or above)
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const navAnchors = useMemo(() => ['#hero', '#services', '#pricing', '#portfolio', '#contacts'], []);

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

        <section className="py-10 md:py-16" id="about">
          <h2 className="section-title reveal">{t.about.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {t.about.cards.map((card) => (
              <article key={card.title} className="card-premium reveal p-6">
                <h3 className="mb-3 text-xl font-semibold">{card.title}</h3>
                <p className="text-[var(--text-secondary)]">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.portfolio.title}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {t.portfolio.items.map((item) => (
              <a
                key={item.name}
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card card-premium reveal group overflow-hidden"
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

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.why.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((item) => (
              <div key={item} className="card-premium reveal flex items-start flex-col gap-3 p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 mb-2">
                  <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <span className="font-medium text-[var(--text-primary)] leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.process.title}</h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-6 relative">
            {t.process.steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center group reveal">
                <div className="card-premium p-6 md:p-8 w-full flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left z-10 transition hover:-translate-y-1">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-[var(--text-primary)] text-[var(--bg-color)] flex items-center justify-center font-bold text-xl ring-8 ring-[var(--bg-color)]">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step}</h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">{processDescriptions[lang][idx]}</p>
                  </div>
                </div>
                {/* Arrow pointing down to next step, except for the last one */}
                {idx < t.process.steps.length - 1 && (
                  <div className="h-10 w-0.5 bg-[var(--border-color)] my-2 relative transition-all group-hover:bg-emerald-500/50">
                    <div className="absolute -bottom-2 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--border-color)] group-hover:border-t-emerald-500/50 transition-all" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.cases.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.cases.items.map((caseItem) => (
              <article key={caseItem.name} className="card-premium reveal p-6 border-t-4 border-t-sky-500">
                <h3 className="text-xl font-semibold mb-6">{caseItem.name}</h3>
                <ul className="grid gap-3">
                  {caseItem.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Rocket size={16} className="text-sky-500 mt-0.5 shrink-0" />
                      <span className="leading-tight">{metric}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <TestimonialsSection 
          title={t.testimonials.title}
          testimonials={t.testimonials.items}
        />

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.faq.title}</h2>
          <div className="card-premium reveal p-6 md:p-8">
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

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.guarantees.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.guarantees.items.map((item) => (
              <div key={item} className="card-premium reveal p-6 flex flex-col gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 shrink-0">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                </div>
                <span className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.audience.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.audience.items.map((item) => (
              <div key={item} className="card-premium reveal p-6 flex items-center justify-center text-center">
                <div className="font-medium">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.technologies.title}</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
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
                <div key={tech} className="card-premium reveal flex items-center justify-center gap-3 py-4 px-6 md:px-8 text-sm md:text-base font-medium transition hover:-translate-y-1">
                  <Icon size={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>{tech}</span>
                </div>
              );
            })}
          </div>
        </section>

        <Pricing
          title={t.pricing.title}
          description={t.pricing.description}
          annualBillingText={t.pricing.annualBillingText}
          saveText={t.pricing.saveText}
          popularBadgeText={t.pricing.popularBadgeText}
          plans={[
            {
              name: t.pricing.columns[0],
              price: t.pricing.rows[6].values[0],
              yearlyPrice: String(Number(t.pricing.rows[6].values[0]) * 0.8),
              period: "per project",
              features: t.pricing.rows.slice(0, 6).map(row => `${row.feature}: ${row.values[0]}`),
              description: "Complete solution for standard requirements.",
              buttonText: t.hero.ctaPrimary,
              href: "#contacts",
              isPopular: false,
            },
            {
              name: t.pricing.columns[1],
              price: t.pricing.rows[6].values[1],
              yearlyPrice: String(Number(t.pricing.rows[6].values[1]) * 0.8),
              period: "per project",
              features: t.pricing.rows.slice(0, 6).map(row => `${row.feature}: ${row.values[1]}`),
              description: "Optimal balance of cost and features.",
              buttonText: t.hero.ctaPrimary,
              href: "#contacts",
              isPopular: true,
            },
            {
              name: t.pricing.columns[2],
              price: t.pricing.rows[6].values[2],
              yearlyPrice: String(Number(t.pricing.rows[6].values[2]) * 0.8),
              period: "per project",
              features: t.pricing.rows.slice(0, 6).map(row => `${row.feature}: ${row.values[2]}`),
              description: "Maximum capabilities for complex projects.",
              buttonText: t.hero.ctaPrimary,
              href: "#contacts",
              isPopular: false,
            }
          ]}
        />

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal text-red-500 flex items-center gap-3">
            {t.antiPortfolio.label}
          </h2>
          <div className="card-premium reveal p-6 md:p-8 flex flex-col gap-5 border-l-4 border-l-red-500 overflow-hidden relative">
            <Lock className="absolute -right-6 -bottom-6 opacity-5 w-48 h-48 pointer-events-none" />
            <h3 className="text-xl md:text-2xl font-bold">{t.antiPortfolio.title}</h3>
            <div className="flex flex-wrap gap-3">
              {t.antiPortfolio.items.map((item) => (
                <div key={item} className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-medium text-sm border border-red-500/20">
                  {item}
                </div>
              ))}
            </div>
            <p className="font-medium mt-2">{t.antiPortfolio.closing}</p>
          </div>
        </section>

        <section className="py-10 md:py-16 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl reveal">{t.calculator.title}</h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl reveal">{t.calculator.text}</p>
          <a
            href="#contacts"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)] reveal"
          >
            {t.calculator.button}
          </a>
        </section>

        <section className="py-10 md:py-16">
          <div className="card-premium reveal p-8 md:p-10 border border-[var(--text-secondary)]">
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

        <section id="contacts" className="py-10 md:py-16">
          <div className="card-premium reveal max-w-3xl mx-auto p-8 md:p-12 text-center bg-gradient-to-b from-[var(--glass-bg)] to-indigo-900/10 border-indigo-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contacts.title}</h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg">{t.contacts.description}</p>
            
            <form className="max-w-md mx-auto space-y-4 mb-10">
              <input className="field text-center py-4 rounded-full" placeholder={t.contacts.form.name} />
              <input className="field text-center py-4 rounded-full" placeholder={t.contacts.form.contact} />
              <button type="button" className="w-full inline-flex justify-center items-center gap-2 rounded-full border border-[var(--border-color)] bg-transparent hover:bg-white/5 transition-colors px-5 py-4 font-bold text-lg mt-2">
                {t.contacts.form.submit}
              </button>
            </form>

            <p className="mt-8 text-sm text-[var(--text-secondary)] mb-4">{t.contacts.socialText}</p>
            <div className="flex justify-center flex-wrap gap-4">
              <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform">
                <Send size={20} />
              </a>
              <a href="https://wa.me/+996557555058" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform bg-gradient-to-br from-green-500/20 to-green-600/10">
                <MessageCircle size={20} />
              </a>
              <a href="mailto:hello@linkhub.dev" className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform">
                <Mail size={20} />
              </a>
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
