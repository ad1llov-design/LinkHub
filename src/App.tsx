import { useRef, useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Instagram, Send, MessageCircle, Sun, Moon, Palette, CheckCircle, Layers, Monitor, Smartphone, Globe } from 'lucide-react';
import heroImage from './HHero.png';
import { translations, Lang } from './translations';

function App() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);
  const [lang, setLang] = useState<Lang>('ru');

  const t = translations[lang];

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  useEffect(() => {
    // Reveal Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // Removed Parallax Effect to prevent conflict with Sticky positioning
  }, []);

  return (
    // Main Container
    <div className="min-h-screen overflow-x-hidden font-inter" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* Language Switcher & Theme Toggle Container */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        
        {/* Language Switcher */}
        <div className="flex items-center gap-2 bg-glass border border-glass rounded-full p-1 backdrop-blur-md" 
             style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
            <div className="pl-2 pr-1 text-text-primary opacity-70">
                <Globe size={18} />
            </div>
            {(['ru', 'kg', 'en'] as Lang[]).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 ${lang === l ? 'bg-text-primary text-bg-color' : 'text-text-primary hover:bg-glass-hover'}`}
                    style={{
                        background: lang === l ? 'var(--text-primary)' : 'transparent',
                        color: lang === l ? 'var(--bg-color)' : 'var(--text-primary)',
                    }}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>

        {/* Theme Toggle Button */}
        <button
            onClick={() => setIsLight(!isLight)}
            className="p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            aria-label="Toggle Theme"
        >
            {isLight ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* HERO BLOCK - Refactored for Sticky Layout */}
      {/* Container is relative to hold the absolute/sticky image */}
      <header className="hero container-custom relative flex flex-col md:flex-row items-start justify-between py-[100px] min-h-screen">
          
          {/* Text Content - Scrolls naturally */}
          <div className="hero-text reveal flex-1 md:max-w-[50%] z-10 pt-[20vh]">
              <div className="hero-subtitle">{t.hero_subtitle}</div>
              <h1 className="hero-title">{t.hero_title}</h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '1.2rem', lineHeight: '1.5' }}>
                  {t.hero_desc}
              </p>
          </div>

          {/* Image - STICKY on Desktop */}
          {/* md:sticky md:top-20 ensures it sticks to the top of the viewport on desktop */}
          <div ref={heroImageRef} className="hero-image group w-full md:w-[45%] h-[50vh] md:h-[80vh] md:sticky md:top-10 right-0 z-0 mt-10 md:mt-0">
              <img 
                src={heroImage} 
                alt="Портрет" 
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
              />
          </div>
      </header>

      {/* ABOUT BLOCK */}
      <section className="about container-custom relative z-10" style={{ backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.about_title}</h2>
          <div className="about-grid">
              
              {/* Education */}
              <div className="info-card reveal">
                  <h4><GraduationCap size={32} /> {t.education_title}</h4>
                  <div className="info-item">
                      <span>2025 - 2029</span>
                      <strong>{t.education_uni}</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>{t.education_major}</p>
                  </div>
                  <div className="info-item">
                      <span>2025</span>
                      <strong>{t.education_course}</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>{t.education_cert}</p>
                  </div>
              </div>

              {/* Experience */}
              <div className="info-card reveal">
                  <h4><Briefcase size={32} /> {t.experience_title}</h4>
                  <div className="info-item">
                      <span>2025 - 2026</span>
                      <strong>{t.experience_lead}</strong>
                      <p style={{ color: 'var(--text-secondary)' }}></p>
                  </div>
                  <div className="info-item">
                      <span>2025 - 2026</span>
                      <strong>{t.experience_freelance}</strong>
                      <p style={{ color: 'var(--text-secondary)' }}></p>
                  </div>
              </div>

          </div>
      </section>


      {/* ===================== */}
      {/* NEW SECTIONS          */}
      {/* ===================== */}

      {/* 1. WORKFLOW / ПРОЦЕСС РАБОТЫ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.workflow_title}</h2>
          <div className="workflow-grid">

              <div className="workflow-step reveal">
                  <div className="step-number">01</div>
                  <h4>{t.step_1_title}</h4>
                  <p>{t.step_1_desc}</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">02</div>
                  <h4>{t.step_2_title}</h4>
                  <p>{t.step_2_desc}</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">03</div>
                  <h4>{t.step_3_title}</h4>
                  <p>{t.step_3_desc}</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">04</div>
                  <h4>{t.step_4_title}</h4>
                  <p>{t.step_4_desc}</p>
              </div>

          </div>
      </section>

      {/* 2. DESIGN APPROACH / НАШ ПОДХОД */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.approach_title}</h2>
          <div className="approach-grid">

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Palette size={28} /></div>
                  <h4>{t.approach_1_title}</h4>
                  <p>{t.approach_1_desc}</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Layers size={28} /></div>
                  <h4>{t.approach_2_title}</h4>
                  <p>{t.approach_2_desc}</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Monitor size={28} /></div>
                  <h4>{t.approach_3_title}</h4>
                  <p>{t.approach_3_desc}</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Smartphone size={28} /></div>
                  <h4>{t.approach_4_title}</h4>
                  <p>{t.approach_4_desc}</p>
              </div>

          </div>
      </section>

      {/* 3. PORTFOLIO / НАШИ РАБОТЫ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.portfolio_title}</h2>
          <div className="portfolio-grid">

              <a href="#" className="portfolio-card reveal block">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">{t.cat_fintech}</span>
                      <h3 className="portfolio-name">{t.project_fintech}</h3>
                  </div>
              </a>

              <a href="#" className="portfolio-card reveal block">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">{t.cat_webdesign}</span>
                      <h3 className="portfolio-name">{t.project_ecommerce}</h3>
                  </div>
              </a>

               <a href="#" className="portfolio-card reveal block">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">{t.cat_architecture}</span>
                      <h3 className="portfolio-name">{t.project_bureau}</h3>
                  </div>
              </a>

              <a href="#" className="portfolio-card reveal block">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">{t.cat_mobile}</span>
                      <h3 className="portfolio-name">{t.project_health}</h3>
                  </div>
              </a>

          </div>
      </section>


      {/* 5. TIMELINE / СРОКИ РЕАЛИЗАЦИИ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.timeline_title}</h2>
          <div className="timeline-grid">

              <div className="timeline-card reveal">
                  <div className="timeline-days">5-7</div>
                  <div className="timeline-label">{t.days}</div>
                  <h4>{t.timeline_landing}</h4>
                  <p>{t.timeline_landing_desc}</p>
              </div>

              <div className="timeline-card reveal">
                  <div className="timeline-days">14-20</div>
                  <div className="timeline-label">{t.days}</div>
                  <h4>{t.timeline_corp}</h4>
                  <p>{t.timeline_corp_desc}</p>
              </div>

              <div className="timeline-card reveal">
                  <div className="timeline-days">30+</div>
                  <div className="timeline-label">{t.days}</div>
                  <h4>{t.timeline_app}</h4>
                  <p>{t.timeline_app_desc}</p>
              </div>

          </div>
      </section>

      {/* 6. PRICING / СТОИМОСТЬ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">{t.pricing_title}</h2>
          <div className="pricing-grid">

              {/* ===== ТАРИФ START ===== */}
              <div className="pricing-card reveal">
                  <div className="pricing-tier">Start</div>
                  <div className="pricing-price">$300</div>
                  <div className="pricing-unit">{t.price_start_unit}</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Дизайн в Figma</li>
                      <li><CheckCircle size={18} /> Адаптивная вёрстка</li>
                      <li><CheckCircle size={18} /> Анимации и hover-эффекты</li>
                      <li><CheckCircle size={18} /> SEO-оптимизация</li>
                      <li><CheckCircle size={18} /> Деплой на хостинг</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">{t.btn_order}</a>
              </div>

              {/* ===== ТАРИФ BUSINESS ===== */}
              <div className="pricing-card featured reveal">
                  <div className="pricing-tier">Business</div>
                  <div className="pricing-price">$800</div>
                  <div className="pricing-unit">{t.price_business_unit}</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Всё из тарифа Start</li>
                      <li><CheckCircle size={18} /> До 10 страниц</li>
                      <li><CheckCircle size={18} /> CMS (редактирование контента)</li>
                      <li><CheckCircle size={18} /> Интеграция аналитики</li>
                      <li><CheckCircle size={18} /> Техподдержка 30 дней</li>
                      <li><CheckCircle size={18} /> Блог / Новости</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">{t.btn_order}</a>
              </div>

              {/* ===== ТАРИФ PREMIUM ===== */}
              <div className="pricing-card reveal">
                  <div className="pricing-tier">Premium</div>
                  <div className="pricing-price">$1500+</div>
                  <div className="pricing-unit">{t.price_premium_unit}</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Всё из тарифа Business</li>
                      <li><CheckCircle size={18} /> Кастомная разработка</li>
                      <li><CheckCircle size={18} /> Авторизация и личный кабинет</li>
                      <li><CheckCircle size={18} /> API и интеграции</li>
                      <li><CheckCircle size={18} /> Техподдержка 90 дней</li>
                      <li><CheckCircle size={18} /> Исходный код в собственность</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">{t.btn_order}</a>
              </div>

          </div>
      </section>

      {/* SOCIAL HUB (FOOTER) */}
      <footer className="container-custom relative z-10" style={{ paddingBottom: '100px', paddingTop: '60px', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal" style={{ textAlign: 'center', border: 'none', marginBottom: '60px' }}>{t.contact_title}</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 reveal">
              
              <a href="https://www.instagram.com/ad1llov.o1/" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <Instagram size={28} />
                  <span>Instagram</span>
              </a>

              <a href="https://t.me/xwvllxx" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <Send size={28} />
                  <span>Telegram</span>
              </a>

              <a href="https://wa.me/+996557555058" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={28} />
                  <span>WhatsApp</span>
              </a>

          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', marginTop: '60px' }}>
            {t.copyright}
          </p>
      </footer>

    </div>
  )
}

export default App
