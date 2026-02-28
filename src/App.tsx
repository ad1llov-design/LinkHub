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
import { DottedSurface } from '@/components/ui/dotted-surface';
import { SplineSceneBasic } from '@/components/ui/demo';
import { Lang, translations } from './translations';

function App() {
  const [lang, setLang] = useState<Lang>('ru');
  const [scrollY, setScrollY] = useState(0);
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
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  const pricingFeatureRows = t.pricing.rows.slice(0, -1);
  const pricingPriceRow = t.pricing.rows[t.pricing.rows.length - 1];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-color)] text-[var(--text-primary)]">
      <DottedSurface />

      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-[-260px] h-[520px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(14,165,233,0.06) 52%, transparent 75%)'
            : 'radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(59,130,246,0.08) 56%, transparent 78%)',
          transform: `translate(-50%, ${scrollY * 0.08}px)`,
        }}
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_35%)] opacity-70" />

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

        <section id="pricing" className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.pricing.title}</h2>
          <p className="mb-5 text-sm uppercase tracking-[0.14em] text-[var(--text-secondary)]">{t.pricing.subtitle}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {t.pricing.columns.map((col, colIndex) => (
              <article
                key={col}
                className={`card-premium p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] ${
                  colIndex === 1 ? 'ring-1 ring-sky-500/50' : ''
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{col}</h3>
                  {colIndex === 1 && <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs text-sky-400">Best Value</span>}
                </div>
                <p className="mb-4 text-3xl font-bold text-[var(--text-primary)]">{pricingPriceRow.values[colIndex]}</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {pricingFeatureRows.map((row) => (
                    <li key={`${col}-${row.feature}`} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-1 text-emerald-500" />
                      <span>
                        <strong className="mr-1 text-[var(--text-primary)]">{row.feature}:</strong>
                        {row.values[colIndex]}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className="btn-cta mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium">
                  {t.consult.button}
                </a>
              </article>
            ))}
          </div>
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
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {t.why.items.map((item) => (
              <div key={item} className="card-premium flex items-center gap-3 p-4">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.process.title}</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {t.process.steps.map((step, idx) => (
              <div key={step} className="card-premium p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-semibold">{step}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{processDescriptions[lang][idx]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.cases.title}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.cases.items.map((caseItem) => (
              <article key={caseItem.name} className="card-premium p-6">
                <h3 className="text-lg font-semibold">{caseItem.name}</h3>
                <ul className="mt-4 grid gap-2">
                  {caseItem.metrics.map((metric) => (
                    <li key={metric} className="stat-chip flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Rocket size={14} className="text-sky-500" />
                      {metric}
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
          <div className="grid gap-4 md:grid-cols-2">
            {t.faq.items.map((item) => (
              <article key={item.q} className="card-premium p-6">
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.guarantees.title}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {t.guarantees.items.map((item) => (
              <div key={item} className="card-premium flex items-center gap-3 p-4">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.audience.title}</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {t.audience.items.map((item) => (
              <div key={item} className="card-premium p-5 text-center">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <h2 className="section-title">{t.technologies.title}</h2>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            {t.technologies.items.map((tech) => (
              <div key={tech} className="card-premium flex items-center justify-center gap-2 p-4 text-sm font-medium">
                <Layers3 size={16} className="opacity-60" />
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="reveal py-10 md:py-16">
          <div className="card-premium bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-fuchsia-500/15 p-8 md:p-10">
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
