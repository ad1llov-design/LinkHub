import React, { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Instagram, Send, Youtube } from 'lucide-react';
import heroImage from './HHero.png';

function App() {
  const heroImageRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-inter">
      
      {/* HERO BLOCK - Refactored for Sticky Layout */}
      {/* Container is relative to hold the absolute/sticky image */}
      <header className="hero container-custom relative flex flex-col md:flex-row items-start justify-between py-[100px] min-h-screen">
          
          {/* Text Content - Scrolls naturally */}
          <div className="hero-text reveal flex-1 md:max-w-[50%] z-10 pt-[20vh]">
              <div className="hero-subtitle">Frontend Developer & UX/UI Designer</div>
              <h1 className="hero-title">Adylov <br /> Botirzhon</h1>
              <p style={{ color: '#888', maxWidth: '480px', fontSize: '1.2rem', lineHeight: '1.5' }}>
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
      <section className="about container-custom relative z-10 bg-[#0a0a0a]">
          <h2 className="section-title reveal">Обо мне</h2>
          <div className="about-grid">
              
              {/* Education */}
              <div className="info-card reveal">
                  <h4><GraduationCap size={32} className="text-white" /> Образование</h4>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Ошский государственный университет</strong>
                      <p style={{ color: '#666' }}>Программная инженерия</p>
                  </div>
                  <div className="info-item">
                      <span>2025</span>
                      <strong>UX/UI Продвинутый курс</strong>
                      <p style={{ color: '#666' }}>Google Сертификация</p>
                  </div>
              </div>

              {/* Experience */}
              <div className="info-card reveal">
                  <h4><Briefcase size={32} className="text-white" /> Опыт работы</h4>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Lead Frontend Developer</strong>
                      <p style={{ color: '#666' }}></p>
                  </div>
                  <div className="info-item">
                      <span>2025 - Наст. время</span>
                      <strong>Freelance Web Developer & UX/UI Designer</strong>
                      <p style={{ color: '#666' }}></p>
                  </div>
              </div>

          </div>
      </section>

      {/* PROJECTS BLOCK */}
      <section className="projects container-custom relative z-10 bg-[#0a0a0a]">
          <h2 className="section-title reveal">Мои Проекты</h2>
          <div className="project-grid">
              
              <article className="project-card reveal">
                  <div className="project-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="project-content">
                      <h3 className="project-title">FinTech App</h3>
                      <p className="project-desc">Редизайн интерфейса мобильного банкинга. Безопасность и удобство.</p>
                  </div>
              </article>

              <article className="project-card reveal">
                  <div className="project-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="project-content">
                      <h3 className="project-title">Cyber Start</h3>
                      <p className="project-desc">Футуристичный лендинг для стартапа в сфере кибербезопасности.</p>
                  </div>
              </article>

               <article className="project-card reveal">
                  <div className="project-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="project-content">
                      <h3 className="project-title">Architect Bureau</h3>
                      <p className="project-desc">Минималистичное портфолио для архитектурного бюро.</p>
                  </div>
              </article>

              <article className="project-card reveal">
                  <div className="project-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472851294608-415522f96485?q=80&w=800&auto=format&fit=crop')" }}></div>
                  <div className="project-content">
                      <h3 className="project-title">Store Platform</h3>
                      <p className="project-desc">E-commerce платформа с высокой нагрузкой и кастомным дизайном.</p>
                  </div>
              </article>

          </div>
      </section>

      {/* SOCIAL HUB (FOOTER) */}
      <footer className="container-custom relative z-10 bg-[#0a0a0a]" style={{ paddingBottom: '100px', paddingTop: '60px' }}>
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

          <p style={{ color: '#444', fontSize: '0.8rem', textAlign: 'center', marginTop: '60px' }}>
            &copy; 2026 Adylov . Все права защищены.
          </p>
      </footer>

    </div>
  )
}

export default App
