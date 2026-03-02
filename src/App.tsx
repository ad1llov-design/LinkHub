import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export const TELEGRAM_LINK = "https://t.me/xwvllxx"; // Directs to user personal acc for discussion
export const BRAND_NAME = "PixelCode";

export const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    style={{ willChange: "opacity, transform" }}
  >
    {children}
  </motion.div>
);
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
import { ContactWidget } from './components/ContactWidget';
import { MobileCarousel } from './components/ui/MobileCarousel';

// Hardcoded for the bot redirect funnel.
const BOT_LINK = "https://t.me/PixelCodeWeb_bot?start=site";
// Placeholder WA number
const WHATSAPP_LINK = "https://wa.me/996557555058";

function App() {
  const [lang, setLang] = useState<Lang>('kg');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToAnchor = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const t = translations[lang];

  // Hero Spline Mouse Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useTransform(useSpring(mouseY), [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotY = useTransform(useSpring(mouseX), [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormStatus('loading');
    
    // NOTE: Hardcoding token here is unsafe for production, but done via requirement.
    // Replace YOUR_TELEGRAM_BOT_TOKEN_HERE / CHAT_ID
    const botToken = '8412566173:AAEpJRSA3kMsjwmd7cl4DAdl4jBOvOtTwEg'; // Old bot for form notifications
    const chatId = '1319315093';
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
    uz: [
      'Loyihaning maqsadi va KPI-lari aniqlanadi.',
      'Talablar, maqsadli auditoriya va takliflar o\'rganiladi.',
      'Tuzilma va konversiya ssenariylari loyihalashtiriladi.',
      'Vizual va UI komponentlar bir yagona uslubda yig\'iladi.',
      'Moslashuvchan va tez ishlovchi veb-sayt ishlab chiqiladi.',
      'Sayt turli qurilmalar va brauzerlarda to\'liq sinovdan o\'tkaziladi.',
      'Sayt e\'lon qilinib, tahliliy tizimlar ulanadi va qo\'llab-quvvatlanadi.',
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
    // Replaced custom IntersectionObserver with Framer Motion primitives
  }, [lang]);

  const navAnchors = useMemo(() => ['#hero', '#services', '#pricing', '#portfolio', '#contacts'], []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navAnchors.map(anchor => document.querySelector(anchor) as HTMLElement | null);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navAnchors[i].replace('#', ''));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navAnchors]);

  const handleNavClick = (anchor: string) => {
    handleScrollToAnchor(anchor);
    setIsMobileMenuOpen(false);
  };

  return (
    <HelmetProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-color)] text-[var(--text-primary)]">
        <DottedSurface />

        <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--glass-bg)]/90 backdrop-blur-xl transition-all duration-300">
          <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-4 py-4 md:px-8">
            {/* Logo & Brand Name */}
            <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }} className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-emerald-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21V3H13.5C16.5376 3 19 5.46243 19 8.5V8.5C19 11.5376 16.5376 14 13.5 14H7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="7" y="3" width="6.5" height="11" fill="currentColor" fillOpacity="0.2"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {BRAND_NAME}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {t.nav.map((item, index) => {
                const anchorId = navAnchors[index].replace('#', '');
                const isActive = activeSection === anchorId;
                
                return (
                  <button 
                    key={item} 
                    onClick={() => handleNavClick(navAnchors[index])}
                    className={`relative text-sm font-medium transition-colors hover:text-[var(--text-primary)] ${
                      isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1">
                {(['kg', 'ru', 'uz'] as Lang[]).map((value) => (
                  <button
                    key={value}
                    onClick={() => setLang(value)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                      lang === value ? 'bg-[var(--text-primary)] text-[var(--bg-color)]' : 'text-[var(--text-primary)]/80 hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                aria-label="Toggle theme"
                className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 transition hover:scale-105"
              >
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 text-[var(--text-primary)] transition hover:scale-105"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-color)]/95 backdrop-blur-3xl overflow-hidden"
              >
                <nav className="flex flex-col p-4 gap-4">
                  {t.nav.map((item, index) => {
                    const anchorId = navAnchors[index].replace('#', '');
                    const isActive = activeSection === anchorId;
                    
                    return (
                      <button 
                        key={item} 
                        onClick={() => handleNavClick(navAnchors[index])}
                        className={`text-left text-lg font-medium p-2 rounded-lg transition-colors ${
                          isActive ? 'bg-emerald-500/10 text-emerald-500' : 'text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                  
                  <div className="flex items-center gap-2 mt-2 pt-4 border-t border-[var(--border-color)] justify-center">
                    {(['kg', 'ru', 'uz'] as Lang[]).map((value) => (
                      <button
                        key={value}
                        onClick={() => { setLang(value); setIsMobileMenuOpen(false); }}
                        className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition ${
                          lang === value ? 'bg-emerald-500/20 text-emerald-500' : 'text-[var(--text-primary)]/80 hover:bg-[var(--glass-bg)]'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="mx-auto w-full max-w-[100rem] px-4 md:px-8">
          <Helmet>
            <title>{`${t.hero.title.slice(0, 50)} | ${t.brand}`}</title>
            <meta name="description" content={t.hero.subtitle} />
            <meta property="og:title" content={`${t.hero.title} | ${t.brand}`} />
            <meta property="og:description" content={t.hero.subtitle} />
            
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "${t.brand}",
                  "url": "https://linkhub.design/",
                  "description": "${t.hero.subtitle}"
                }
              `}
            </script>
          </Helmet>
          <Routes>
            <Route path="/" element={
              <article>
              <section 
                id="hero" 
                className="relative min-h-[92vh] overflow-hidden py-14 md:py-24"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              style={{ 
                rotateX: rotX, 
                rotateY: rotY
              }}
              className="absolute right-[-28%] top-[-10%] h-[72vh] w-[72vw] md:right-[-4%] md:top-[2%] md:h-[86vh] md:w-[48vw] pointer-events-auto"
            >
              <SplineSceneBasic />
            </motion.div>

            <Reveal className="relative z-10 max-w-3xl space-y-6 pointer-events-none">
              <span className="inline-flex rounded-full border border-[var(--glass-border)] px-4 py-1.5 text-xs tracking-[0.14em] uppercase text-[var(--text-secondary)]">
                {t.hero.badge}
              </span>
              <h1 className="text-4xl font-semibold leading-tight md:text-7xl">{t.hero.title}</h1>
              <p className="max-w-xl text-base text-[var(--text-secondary)] md:text-lg">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.open(TELEGRAM_LINK, '_blank')}
                  className="btn-cta inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium pointer-events-auto"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleScrollToAnchor('#portfolio')}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-[var(--glass-hover)] pointer-events-auto"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
              <div className="grid max-w-2xl gap-3 pt-4 text-sm text-[var(--text-secondary)] md:grid-cols-2">
                {t.hero.benefits.map((benefit) => (
                  <div key={benefit} className="card-mini flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="py-10 md:py-16" id="about">
            <Reveal>
              <h2 className="section-title">{t.about.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {t.about.cards.map((card) => (
                  <article key={card.title} className="card-premium flex flex-col gap-3 p-6 transition-colors hover:border-emerald-500/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--text-primary)]/5">
                      <span className="text-emerald-500"><CheckCircle2 size={20} /></span>
                    </div>
                    <h3 className="font-semibold text-lg">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{card.text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="portfolio" className="py-10 md:py-16">
            <h2 className="section-title">{t.portfolio.title}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {t.portfolio.items.map((item) => (
                <article
                  key={item.name}
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
                </article>
              ))}
            </div>
          </section>

          <section className="py-10 md:py-16">
            <Reveal>
              <h2 className="section-title">{t.why.title}</h2>
              <div className="hidden sm:grid gap-6 sm:grid-cols-2">
                {t.why.items.map((item, idx) => (
                  <article key={item} className="card-premium p-8 flex flex-col gap-4 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 text-8xl font-black text-[var(--text-primary)] opacity-[0.03] select-none group-hover:scale-110 transition-transform duration-500">
                      0{idx + 1}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <ShieldCheck className="text-emerald-500" size={24} />
                    </div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] relative z-10 leading-snug max-w-[80%]">
                      {item}
                    </h3>
                  </article>
                ))}
              </div>
              <div className="sm:hidden -mx-4">
                <MobileCarousel items={t.why.items.map((item, idx) => (
                  <article key={item} className="w-full card-premium p-8 flex flex-col gap-4 relative overflow-hidden h-[240px]">
                    <div className="absolute -right-4 -bottom-4 text-8xl font-black text-[var(--text-primary)] opacity-[0.03] select-none">
                      0{idx + 1}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <ShieldCheck className="text-emerald-500" size={24} />
                    </div>
                    <h3 className="text-xl font-medium text-[var(--text-primary)] relative z-10 leading-snug">
                      {item}
                    </h3>
                  </article>
                ))} />
              </div>
            </Reveal>
          </section>

          <section className="py-10 md:py-16">
            <Reveal>
              <h2 className="section-title">{t.process.title}</h2>
              
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
                  {/* Mobile Vertical View (Replaced with Carousel) */}
                  <div className="md:hidden -mx-4 mt-6">
                    <MobileCarousel items={t.process.steps.map((step, idx) => (
                      <div key={idx} className="w-full h-full flex items-center px-4">
                        <RenderCard idx={idx} step={step} />
                      </div>
                    ))} />
                  </div>
                  
                  {/* Desktop Wrapping Grid View (Variant B) */}
                  <div className="hidden md:grid grid-cols-3 gap-x-12 gap-y-16 relative max-w-6xl mx-auto mt-10">
                      {t.process.steps.map((step, idx) => {
                        const isLastInRow = (idx + 1) % 3 === 0;
                        const isLastItem = idx === t.process.steps.length - 1;
                        
                        return (
                          <div key={idx} className="relative h-full flex flex-col items-center">
                              <RenderCard idx={idx} step={step} />
                              
                              {/* Arrow to the right (if not last in row and not last item) */}
                              {!isLastInRow && !isLastItem && (
                                <div className="absolute top-1/2 -right-8 translate-x-2 -translate-y-1/2 w-8 flex items-center justify-center text-[var(--border-color)] z-[-1] hidden lg:flex">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              )}

                              {/* Arrow pointing down from the first item of the line to indicate reading flow */}
                              {/* Disabled per user request for cleaner UI */}
                          </div>
                        )
                      })}
                  </div>
                  </>
                )
              })()}
            </Reveal>
          </section>

          <section className="py-10 md:py-16">
            <h2 className="section-title">{t.cases.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.cases.items.map((caseItem) => (
                <article key={caseItem.name} className="card-premium p-6 border-t-4 border-t-sky-500">
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

          <section className="py-10 md:py-16">
            <h2 className="section-title">{t.guarantees.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.guarantees.items.map((item) => (
                <div key={item} className="card-premium p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 shrink-0">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  </div>
                  <span className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="py-10 md:py-16">
            <Reveal>
              <h2 className="section-title">{t.audience.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {t.audience.items.map((item) => (
                  <article key={item.title} className="card-premium p-6 flex flex-col items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 shrink-0 text-emerald-500 font-bold">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="py-10 md:py-16">
            <Reveal>
              <h2 className="section-title">{t.technologies.title}</h2>
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
                    <div key={tech} className="card-premium flex items-center justify-center gap-3 py-4 px-6 md:px-8 text-sm md:text-base font-medium transition hover:-translate-y-1">
                      <Icon size={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span>{tech}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="pricing" className="py-10 md:py-16">
            <Reveal>
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
            </Reveal>
          </section>

          <section className="py-10 md:py-16">
            <Reveal>
              <h2 className="section-title text-red-500 flex items-center gap-3">
                {t.antiPortfolio.label}
              </h2>
              <div className="card-premium p-6 md:p-8 flex flex-col gap-5 border-l-4 border-l-red-500 overflow-hidden relative">
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
            </Reveal>
          </section>

          <section id="contacts" className="py-10 md:py-16">
            <Reveal>
              <div className="card-premium max-w-3xl mx-auto p-8 md:p-12 text-center bg-gradient-to-b from-[var(--glass-bg)] to-indigo-900/10 border-indigo-500/20">
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
                  <button onClick={() => window.open(TELEGRAM_LINK, '_blank')} className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform">
                    <Send size={20} />
                  </button>
                  <a href="https://wa.me/+996557555058" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform bg-gradient-to-br from-green-500/20 to-green-600/10">
                    <MessageCircle size={20} />
                  </a>
                  <a href="mailto:adilovbatir959@gmail.com" className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:-translate-y-1 transition-transform">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
          </article>
          } />
        </Routes>
      </main>

      <footer className="bg-black text-white py-16 border-t border-white/10 relative z-[100]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Column 1: Brand Info */}
              <div className="space-y-6">
                <button onClick={() => handleScrollToAnchor('#hero')} className="flex items-center gap-2">
                  <Globe className="h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold font-display tracking-tight text-white">{BRAND_NAME}</span>
                </button>
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

              {/* Column 3: Contacts */}
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
                  <button onClick={() => window.open(TELEGRAM_LINK, '_blank')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                    <Send size={18} />
                  </button>
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
            </div>
          </div>
        </footer>
        {/* Floating Action Button */}
        <ContactWidget telegramUrl={BOT_LINK} whatsappUrl={WHATSAPP_LINK} />
      </div>
    </HelmetProvider>
  );
}

export default App;
