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
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage';

function App() {
  const [lang, setLang] = useState<Lang>('ru');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const t = translations[lang];
  const location = useLocation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormStatus('loading');
    
    // NOTE: Hardcoding token here is unsafe for production, but done via requirement.
    // Replace YOUR_TELEGRAM_BOT_TOKEN_HERE / CHAT_ID
    const botToken = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
    const chatId = 'YOUR_TELEGRAM_CHAT_ID_HERE';
    const msgTemplate = `🔥 Новая заявка с сайта:\n\n👤 Имя: ${formData.name}\n📞 Контакт: ${formData.phone}`;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msgTemplate }),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

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
        <Routes>
          <Route path="/" element={
            <>
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
              <article key={card.title} className="card-premium reveal p-6 flex flex-col justify-center">
                <h3 className="mb-3 text-xl font-medium">{card.title}</h3>
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
          <div className="grid gap-6 sm:grid-cols-2">
            {t.why.items.map((item, idx) => (
              <div key={item} className="card-premium reveal p-8 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-[var(--text-primary)] opacity-[0.03] select-none group-hover:scale-110 transition-transform duration-500">
                  0{idx + 1}
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
                <h3 className="text-xl font-medium text-[var(--text-primary)] relative z-10 leading-snug max-w-[80%]">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.process.title}</h2>
          
          {(() => {
            const RenderCard = ({ idx, step }: { idx: number, step: string }) => (
              <div className="card-premium p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start z-10 hover:-translate-y-1 transition-transform w-full h-full relative group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-[var(--bg-color)] transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-[var(--text-primary)]">{step}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{processDescriptions[lang][idx]}</p>
                </div>
              </div>
            );

            return (
              <>
                 {/* Mobile Vertical View */}
                 <div className="md:hidden flex flex-col gap-4">
                  {t.process.steps.map((step, idx) => (
                    <div key={idx} className="reveal"><RenderCard idx={idx} step={step} /></div>
                  ))}
                 </div>
                 
                 {/* Desktop Snake View */}
                 <div className="hidden md:flex flex-col relative max-w-5xl mx-auto">
                    {Array.from({ length: Math.ceil(t.process.steps.length / 2) }).map((_, rowIndex) => {
                       const idx1 = rowIndex * 2;
                       const idx2 = rowIndex * 2 + 1;
                       const isReverse = rowIndex % 2 !== 0;

                       return (
                         <div key={rowIndex} className={`flex gap-12 w-full mb-12 relative reveal ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Horizontal connecting subtle line */}
                            {idx2 < t.process.steps.length && (
                              <div className="absolute top-1/2 left-[30%] right-[30%] h-[1px] bg-[var(--border-color)] -translate-y-1/2 -z-10" />
                            )}
                            
                            <div className="flex-1 w-full relative">
                               <RenderCard idx={idx1} step={t.process.steps[idx1]} />
                            </div>
                            <div className="flex-1 w-full relative">
                               {idx2 < t.process.steps.length ? (
                                 <RenderCard idx={idx2} step={t.process.steps[idx2]} />
                               ) : (
                                 <div className="w-full h-full" />
                               )}
                            </div>
                         </div>
                       )
                    })}
                 </div>
              </>
            )
          })()}
        </section>

        <section className="py-10 md:py-16">
          <h2 className="section-title reveal">{t.cases.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.cases.items.map((caseItem) => (
              <article key={caseItem.name} className="card-premium reveal p-6 border-t-4 border-t-sky-500">
                <h3 className="text-xl font-medium mb-6">{caseItem.name}</h3>
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
              <div key={item.title} className="card-premium reveal p-6 flex flex-col items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 shrink-0 text-emerald-500 font-bold">
                  {/* Just an icon or initial */}
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
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

        <section className="py-10 md:py-16">
          <div className="card-premium reveal p-8 md:p-12 text-center flex flex-col items-center border border-emerald-500/20 bg-gradient-to-b from-[var(--glass-bg)] to-emerald-900/10">
            <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">{t.calculator.title}</h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl text-lg">{t.calculator.text}</p>
            <Link
              to="/calculator"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-10 py-5 font-bold text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              {t.calculator.button}
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        <section id="contacts" className="py-10 md:py-16">
          <div className="card-premium reveal max-w-3xl mx-auto p-8 md:p-12 text-center bg-gradient-to-b from-[var(--glass-bg)] to-indigo-900/10 border-indigo-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contacts.title}</h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg">{t.contacts.description}</p>
            
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-4 mb-10">
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="field text-center py-4 rounded-full w-full bg-[var(--card-bg)] border border-[var(--border-color)] px-4 focus:border-emerald-500 focus:outline-none transition-colors" 
                placeholder={t.contacts.form.name} 
              />
              <input 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="field text-center py-4 rounded-full w-full bg-[var(--card-bg)] border border-[var(--border-color)] px-4 focus:border-emerald-500 focus:outline-none transition-colors" 
                placeholder={t.contacts.form.contact} 
              />
              <button 
                type="submit" 
                disabled={formStatus === 'loading' || formStatus === 'success'}
                className="w-full inline-flex justify-center items-center gap-2 rounded-full border border-[var(--border-color)] bg-transparent hover:bg-white/5 transition-colors px-5 py-4 font-bold text-lg mt-2 disabled:opacity-50"
              >
                {formStatus === 'loading' ? 'Отправка...' : formStatus === 'success' ? 'Отправлено! 🎉' : t.contacts.form.submit}
              </button>
              {formStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2">Ошибка при отправке. Пожалуйста, напишите нам в мессенджеры.</p>
              )}
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
            </>
          } />
          <Route path="/calculator" element={<CalculatorPage t={t} />} />
        </Routes>
      </main>

      {/* Conditionally render footer only if we are not taking up screen size, 
          or just render it always. I will keep it globally accessible. */}
      {location.pathname !== '/calculator' && (
        <footer className="bg-black text-white py-16 mt-16 border-t border-white/10 relative z-[100]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-2">
                <Globe className="h-8 w-8 text-emerald-500" />
                <span className="text-2xl font-bold font-display tracking-tight text-white">{t.brand}</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                {t.footer.brandDesc}
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.navTitle}</h4>
              <ul className="space-y-4">
                {navAnchors.map((href, i) => (
                  <li key={href}>
                    <a href={href} className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                      {t.nav[i]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.servicesTitle}</h4>
              <ul className="space-y-4">
                {t.footer.services.map((service) => (
                  <li key={service} className="text-gray-400 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contacts */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">{t.nav[4]}</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="text-emerald-500">📞</span>
                  {t.footer.contacts.phone}
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-500">📍</span>
                  {t.footer.contacts.address}
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-500">🕒</span>
                  {t.footer.contacts.hours}
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-500">✉️</span>
                  <a href={`mailto:${t.footer.contacts.email}`} className="hover:text-emerald-500 transition-colors">
                    {t.footer.contacts.email}
                  </a>
                </li>
              </ul>
              
              <div className="mt-8 flex gap-4">
                <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                  <Send size={18} />
                </a>
                <a href="https://wa.me/+996557555058" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                  <MessageCircle size={18} />
                </a>
                <a href={`mailto:${t.footer.contacts.email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>{t.footer.copyright}</p>
            <p>Made by {t.brand}</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}

export default App;
