import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Instagram, Send, Youtube, Sun, Moon, Palette, CheckCircle, Layers, Monitor, Smartphone } from 'lucide-react';
import heroImage from './HHero.png';

function App() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

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
    <div className="min-h-screen overflow-x-hidden font-inter" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsLight(!isLight)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
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

      {/* HERO BLOCK - Refactored for Sticky Layout */}
      {/* Container is relative to hold the absolute/sticky image */}
      <header className="hero container-custom relative flex flex-col md:flex-row items-start justify-between py-[100px] min-h-screen">
          
          {/* Text Content - Scrolls naturally */}
          <div className="hero-text reveal flex-1 md:max-w-[50%] z-10 pt-[20vh]">
              <div className="hero-subtitle">Frontend Developer & UX/UI Designer</div>
              <h1 className="hero-title">Adylov <br /> Botirzhon</h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '1.2rem', lineHeight: '1.5' }}>
                  Создаю цифровые продукты, объединяющие эстетику и функциональность. 
                  Фокус на минимализме, производительности и удобстве пользователя.
                  Работаю над проектами, которые привлекают внимание и заставляют людей оставаться.
                  И главное - создаю продукты, которые приносят пользу и радость.
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
          <h2 className="section-title reveal">Обо мне</h2>
          <div className="about-grid">
              
              {/* Education */}
              <div className="info-card reveal">
                  <h4><GraduationCap size={32} /> Образование</h4>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Ошский государственный университет</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>Программная инженерия</p>
                  </div>
                  <div className="info-item">
                      <span>2025</span>
                      <strong>UX/UI Продвинутый курс</strong>
                      <p style={{ color: 'var(--text-secondary)' }}>Google Сертификация</p>
                  </div>
              </div>

              {/* Experience */}
              <div className="info-card reveal">
                  <h4><Briefcase size={32} /> Опыт работы</h4>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Lead Frontend Developer</strong>
                      <p style={{ color: 'var(--text-secondary)' }}></p>
                  </div>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Freelance Web Developer & UX/UI Designer</strong>
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
          <h2 className="section-title reveal">Процесс работы</h2>
          <div className="workflow-grid">

              <div className="workflow-step reveal">
                  <div className="step-number">01</div>
                  <h4>Брифинг</h4>
                  <p>Знакомимся с вашим бизнесом, целями и аудиторией. Формируем техническое задание.</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">02</div>
                  <h4>Прототип</h4>
                  <p>Создаём интерактивный прототип в Figma. Согласовываем каждый экран с вами.</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">03</div>
                  <h4>Разработка</h4>
                  <p>Верстаем и программируем. Pixel-perfect, чистый код, адаптивность.</p>
              </div>

              <div className="workflow-step reveal">
                  <div className="step-number">04</div>
                  <h4>Запуск</h4>
                  <p>Тестируем, оптимизируем и деплоим. Поддерживаем после релиза.</p>
              </div>

          </div>
      </section>

      {/* 2. DESIGN APPROACH / НАШ ПОДХОД */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">Наш подход к дизайну</h2>
          <div className="approach-grid">

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Palette size={28} /></div>
                  <h4>Эстетика</h4>
                  <p>Каждый проект — это визуальное высказывание. Мы создаём дизайн, который запоминается с первого взгляда.</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Layers size={28} /></div>
                  <h4>Системность</h4>
                  <p>Дизайн-система, компоненты, токены. Всё масштабируется и поддерживается легко.</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Monitor size={28} /></div>
                  <h4>Удобство</h4>
                  <p>Не просто красиво — удобно. UX-исследования, юзабилити-тесты, A/B тестирование.</p>
              </div>

              <div className="approach-card reveal">
                  <div className="icon-wrap"><Smartphone size={28} /></div>
                  <h4>Адаптивность</h4>
                  <p>Mobile-first подход. Идеальный вид на любом устройстве, от iPhone до 4K-монитора.</p>
              </div>

          </div>
      </section>

      {/* 3. PORTFOLIO / НАШИ РАБОТЫ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">Наши работы</h2>
          <div className="portfolio-grid">

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Финтех</span>
                      <h3 className="portfolio-name">Мобильный Банкинг</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Стартап</span>
                      <h3 className="portfolio-name">Лендинг Кибербезопасности</h3>
                  </div>
              </article>

               <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Архитектура</span>
                      <h3 className="portfolio-name">Портфолио Бюро</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Веб-дизайн</span>
                      <h3 className="portfolio-name">E-Commerce Платформа</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Мобильное приложение</span>
                      <h3 className="portfolio-name">Трекер Здоровья</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Брендинг</span>
                      <h3 className="portfolio-name">IT Стартап</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Лендинг</span>
                      <h3 className="portfolio-name">Крипто Дашборд</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">UI/UX</span>
                      <h3 className="portfolio-name">SaaS Платформа</h3>
                  </div>
              </article>

              <article className="portfolio-card reveal">
                  <div className="portfolio-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop')" }}></div>
                  <div className="portfolio-overlay">
                      <span className="portfolio-category">Корпоративный</span>
                      <h3 className="portfolio-name">Сайт Агентства</h3>
                  </div>
              </article>

          </div>
      </section>


      {/* 5. TIMELINE / СРОКИ РЕАЛИЗАЦИИ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">Сроки реализации</h2>
          <div className="timeline-grid">

              <div className="timeline-card reveal">
                  <div className="timeline-days">5-7</div>
                  <div className="timeline-label">рабочих дней</div>
                  <h4>Лендинг</h4>
                  <p>Одностраничный сайт с анимациями, адаптивной вёрсткой и формой заявки.</p>
              </div>

              <div className="timeline-card reveal">
                  <div className="timeline-days">14-20</div>
                  <div className="timeline-label">рабочих дней</div>
                  <h4>Корпоративный сайт</h4>
                  <p>Многостраничный сайт с CMS, блогом и интеграцией аналитики.</p>
              </div>

              <div className="timeline-card reveal">
                  <div className="timeline-days">30+</div>
                  <div className="timeline-label">рабочих дней</div>
                  <h4>Веб-приложение</h4>
                  <p>Полноценная SPA/PWA с авторизацией, базой данных и API.</p>
              </div>

          </div>
      </section>

      {/* 6. PRICING / СТОИМОСТЬ */}
      <section className="container-custom relative z-10" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal">Стоимость</h2>
          <div className="pricing-grid">

              {/* ===== ТАРИФ START ===== */}
              <div className="pricing-card reveal">
                  <div className="pricing-tier">Start</div>
                  <div className="pricing-price">$300</div>
                  <div className="pricing-unit">Лендинг «‎под ключ»</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Дизайн в Figma</li>
                      <li><CheckCircle size={18} /> Адаптивная вёрстка</li>
                      <li><CheckCircle size={18} /> Анимации и hover-эффекты</li>
                      <li><CheckCircle size={18} /> SEO-оптимизация</li>
                      <li><CheckCircle size={18} /> Деплой на хостинг</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">Заказать</a>
              </div>

              {/* ===== ТАРИФ BUSINESS ===== */}
              <div className="pricing-card featured reveal">
                  <div className="pricing-tier">Business</div>
                  <div className="pricing-price">$800</div>
                  <div className="pricing-unit">Корпоративный сайт</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Всё из тарифа Start</li>
                      <li><CheckCircle size={18} /> До 10 страниц</li>
                      <li><CheckCircle size={18} /> CMS (редактирование контента)</li>
                      <li><CheckCircle size={18} /> Интеграция аналитики</li>
                      <li><CheckCircle size={18} /> Техподдержка 30 дней</li>
                      <li><CheckCircle size={18} /> Блог / Новости</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">Заказать</a>
              </div>

              {/* ===== ТАРИФ PREMIUM ===== */}
              <div className="pricing-card reveal">
                  <div className="pricing-tier">Premium</div>
                  <div className="pricing-price">$1500+</div>
                  <div className="pricing-unit">Веб-приложение / SaaS</div>
                  <ul className="pricing-features">
                      <li><CheckCircle size={18} /> Всё из тарифа Business</li>
                      <li><CheckCircle size={18} /> Кастомная разработка</li>
                      <li><CheckCircle size={18} /> Авторизация и личный кабинет</li>
                      <li><CheckCircle size={18} /> API и интеграции</li>
                      <li><CheckCircle size={18} /> Техподдержка 90 дней</li>
                      <li><CheckCircle size={18} /> Исходный код в собственность</li>
                  </ul>
                  <a href="https://t.me/xwvllxx" target="_blank" rel="noopener noreferrer" className="pricing-btn">Заказать</a>
              </div>

          </div>
      </section>

      {/* SOCIAL HUB (FOOTER) */}
      <footer className="container-custom relative z-10" style={{ paddingBottom: '100px', paddingTop: '60px', backgroundColor: 'var(--bg-color)' }}>
          <h2 className="section-title reveal" style={{ textAlign: 'center', border: 'none', marginBottom: '60px' }}>Связаться со мной</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 reveal">
              
              <a href="https://www.instagram.com/ad1llov.o1/" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <Instagram size={28} />
                  <span>Instagram</span>
              </a>

              <a href="https://t.me/xwvllxx" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <Send size={28} />
                  <span>Telegram</span>
              </a>

              <a href="https://youtube.com" className="btn-glass w-full md:w-auto" target="_blank" rel="noopener noreferrer">
                  <Youtube size={28} />
                  <span>YouTube</span>
              </a>

          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', marginTop: '60px' }}>
            &copy; 2026 Adylov . Все права защищены.
          </p>
      </footer>

    </div>
  )
}

export default App
