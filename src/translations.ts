export type Lang = 'ru' | 'en' | 'kg';

export type Locale = {
  brand: string;
  nav: string[];
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    benefits: string[];
  };
  about: {
    title: string;
    cards: { title: string; text: string }[];
  };
  services: {
    title: string;
    from: string;
    includesLabel: string;
    timelineLabel: string;
    items: {
      title: string;
      description: string;
      includes: string[];
      timeline: string;
      price: string;
    }[];
  };
  pricing: {
    title: string;
    description: string;
    annualBillingText: string;
    saveText: string;
    billedMonthlyText: string;
    billedAnnuallyText: string;
    popularBadgeText: string;
    columns: string[];
    rows: { feature: string; values: string[] }[];
  };
  portfolio: {
    title: string;
    items: { niche: string; name: string; task: string; done: string; result: string; image: string }[];
  };
  why: { title: string; items: string[] };
  process: { title: string; steps: string[] };
  cases: {
    title: string;
    items: { name: string; metrics: string[] }[];
  };
  testimonials: {
    title: string;
    items: { author: { name: string; handle: string; avatar: string }; text: string }[];
  };
  faq: { title: string; items: { q: string; a: string }[] };
  guarantees: { title: string; items: string[] };
  audience: { title: string; items: { title: string; text: string }[] };
  technologies: { title: string; items: string[] };
  antiPortfolio: { label: string; title: string; items: string[]; closing: string };
  calculator: { title: string; text: string; button: string };
  contacts: {
    title: string;
    description: string;
    form: { name: string; contact: string; submit: string };
    socialText: string;
  };
  footer: {
    brandDesc: string;
    copyright: string;
    navTitle: string;
    contacts: {
      phone: string;
      address: string;
      hours: string;
      email: string;
    }
  };
};

export const translations: Record<Lang, Locale> = {
  ru: {
    brand: 'PixelCode',
    nav: ['Главная', 'Обо мне', 'Тарифы', 'Портфолио', 'Контакты'],
    hero: {
      badge: 'Премиум веб-разработка',
      title: 'Создаем сайты, которые продают и усиливают бренд',
      subtitle:
        'Лендинги, корпоративные сайты и интернет-магазины с современным дизайном, высокой скоростью и понятной воронкой заявки.',
      ctaPrimary: 'Обсудить проект',
      ctaSecondary: 'Посмотреть работы',
      benefits: ['Запуск от 5 дней', 'Конверсионный UX/UI', 'SEO-ready структура', 'Поддержка после релиза'],
    },
    about: {
      title: 'О нас',
      cards: [
        { title: 'Кто мы', text: 'Команда веб-разработчиков и дизайнеров, совмещающая бизнес-мышление, маркетинг и чистую инженерную реализацию.' },
        { title: 'Наш подход', text: 'Каждый экран проектируется как часть воронки: внимание, доверие, действие.' },
        { title: 'Как мы работаем', text: 'Как полноценная digital-студия: стратегия, дизайн, разработка, запуск и аналитика в одном процессе.' },
        { title: 'Почему нам доверяют', text: 'Прозрачные сроки, четкие этапы, аргументированные решения и фокус на бизнес-результате.' },
      ],
    },
    services: {
      title: 'Услуги',
      from: 'от',
      includesLabel: 'Что входит',
      timelineLabel: 'Сроки',
      items: [
        {
          title: 'Лендинг',
          description: 'Одностраничный сайт для быстрого запуска рекламы и лидогенерации.',
          includes: ['Анализ ниши', 'Продающая структура', 'Форма заявки', 'Базовое SEO'],
          timeline: '5-7 дней',
          price: '$300',
        },
        {
          title: 'Корпоративный сайт',
          description: 'Многостраничный сайт компании с акцентом на доверие и презентацию услуг.',
          includes: ['До 10 страниц', 'UI-кит', 'Интеграция аналитики', 'CMS/редактирование'],
          timeline: '14-20 дней',
          price: '$800',
        },
        {
          title: 'Интернет-магазин',
          description: 'E-commerce решение с каталогом, корзиной и удобным сценарием покупки.',
          includes: ['Каталог и фильтры', 'Карточка товара', 'Оплата/доставка', 'Техоптимизация'],
          timeline: '20-35 дней',
          price: '$1200',
        },
        {
          title: 'Дизайн в Figma',
          description: 'Современный интерфейс с продуманной типографикой и единым стилем бренда.',
          includes: ['Прототип', 'UI-система', 'Адаптивные экраны', 'Передача в разработку'],
          timeline: '4-10 дней',
          price: '$250',
        },
        {
          title: 'Поддержка сайта',
          description: 'Техническое сопровождение, улучшения и обновления после запуска.',
          includes: ['Контент-обновления', 'Мониторинг', 'Мелкие доработки', 'Консультации'],
          timeline: 'ежемесячно',
          price: '$120',
        },
      ],
    },
    pricing: {
      title: 'Простые, прозрачные тарифы',
      description: 'Выберите тариф, который подходит именно вам\nВсе тарифы включают базовую поддержку и высокое качество.',
      annualBillingText: 'Оплата за год',
      saveText: '(Экономия 20%)',
      billedMonthlyText: 'оплата помесячно',
      billedAnnuallyText: 'оплата за год',
      popularBadgeText: 'Популярный',
      columns: ['Start', 'Business', 'Premium'],
      rows: [
        { feature: 'Тип проекта', values: ['Лендинг', 'Корпоративный сайт', 'Сложный продукт / eCommerce'] },
        { feature: 'Количество страниц', values: ['1', 'до 10', 'индивидуально'] },
        { feature: 'Уникальный дизайн', values: ['Да', 'Да', 'Да + дизайн-система'] },
        { feature: 'Анимации и интерактив', values: ['Базовые', 'Расширенные', 'Премиум уровень'] },
        { feature: 'SEO-оптимизация', values: ['Базовая', 'Расширенная', 'Продвинутая'] },
        { feature: 'Поддержка после запуска', values: ['7 дней', '30 дней', '90 дней'] },
        { feature: 'Стоимость', values: ['200', '600', '1000'] },
      ],
    },
    portfolio: {
      title: 'Портфолио',
      items: [
        {
          niche: 'FinTech',
          name: 'Платформа для инвестиций',
          task: 'Повысить доверие и заявки с платного трафика.',
          done: 'Новая структура оффера, UI/UX, лендинг на React.',
          result: '+38% заявок за 30 дней',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'Education',
          name: 'Онлайн-школа языков',
          task: 'Упаковать продукт и увеличить запись на пробный урок.',
          done: 'Редизайн, квиз-форма, скорость загрузки < 2s.',
          result: '+52% конверсия в заявку',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'eCommerce',
          name: 'Магазин электроники',
          task: 'Снизить отказы и поднять средний чек.',
          done: 'Новый каталог, фильтры, карточки товара и UX корзины.',
          result: '+27% средний чек',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'B2B',
          name: 'Сайт IT-интегратора',
          task: 'Сделать премиальную презентацию услуг.',
          done: 'Корпоративный сайт, кейсы, SEO-структура, анимации.',
          result: 'x2 входящих обращений',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    why: {
      title: 'Почему выбирают нас',
      items: [
        'Фокус на продажах, а не только на визуале',
        'Чистый и масштабируемый код от инженерной команды',
        'Понятная коммуникация и отчеты по этапам',
        'Быстрая загрузка и техническая оптимизация',
        'Современный минималистичный дизайн',
        'Поддержка и развитие после запуска',
      ],
    },
    process: {
      title: 'Этапы работы',
      steps: ['Заявка', 'Брифинг', 'Прототип', 'Дизайн', 'Разработка', 'Тестирование', 'Запуск'],
    },
    cases: {
      title: 'Кейсы и результаты',
      items: [
        { name: 'Лендинг B2B-услуг', metrics: ['+41% лидов', '-23% стоимость заявки', 'Срок запуска 6 дней'] },
        { name: 'Корпоративный сайт', metrics: ['x2 органический трафик', '+34% время на сайте', 'Рост бренд-запросов'] },
        { name: 'Интернет-магазин', metrics: ['+29% конверсия в корзину', '+18% повторные покупки', '-35% отказов'] },
      ],
    },
    testimonials: {
      title: 'Отзывы клиентов',
      items: [
        {
          author: {
            name: 'Азамат Р.',
            handle: '@aza_fin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Получили сайт уровня digital-агентства. Всё точно по срокам, а заявки пошли уже в первую неделю.',
        },
        {
          author: {
            name: 'Айзада К.',
            handle: '@aiza_edtech',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Сильный UX и грамотная структура. Реклама стала окупаться быстрее, чем на старом сайте.',
        },
        {
          author: {
            name: 'Тимур С.',
            handle: '@timur_ecom',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Очень аккуратная работа: дизайн, код и аналитика. Видно профессиональный системный подход.',
        },
        {
          author: { name: 'Евгений В.', handle: '@evg_logistic', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
          text: 'Сайт отрабатывает на 10/10. Быстрая загрузка, удобная админка. Конверсия выросла в полтора раза.',
        },
        {
          author: { name: 'Динара Т.', handle: '@dina_beauty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
          text: 'Идеальное попадание в стиль бренда. Картинка сочная, а запуск занял всего 10 дней.',
        },
        {
          author: { name: 'Максим О.', handle: '@max_dev', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' },
          text: 'Как технарь, я оценил качество кода. Никаких лагов, 90+ в Google PageSpeed. Рекомендую.',
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Сколько стоит сайт?', a: 'Стоимость зависит от задач. Лендинг от $300, корпоративный сайт от $800.' },
        { q: 'Какие сроки разработки?', a: 'Лендинг: 5-7 дней, корпоративный сайт: 14-20 дней, eCommerce: от 20 дней.' },
        { q: 'Вы работаете по договору?', a: 'Да, можем оформить договор и зафиксировать этапы, сроки и объем работ.' },
        { q: 'Можно ли вносить правки?', a: 'Да, в каждом этапе предусмотрены согласования и итерации правок.' },
        { q: 'Вы делаете SEO?', a: 'Да, базовое SEO включено. При необходимости делаю расширенную SEO-подготовку.' },
        { q: 'Есть ли поддержка после запуска?', a: 'Да, предоставляю поддержку и развитие сайта по выбранному пакету.' },
      ],
    },
    guarantees: {
      title: 'Гарантии',
      items: [
        'Фиксация сроков и этапов работ до старта',
        'Прозрачная смета и никаких скрытых платежей',
        'Передача исходного кода и доступов',
        'Техническая поддержка после запуска',
      ],
    },
    audience: {
      title: 'Кому подойдут наши сайты',
      items: [
        { title: 'Экспертам и личным брендам', text: 'Упакуем ваш опыт в стильный сайт, который будет транслировать профессионализм и доверие аудитории.' },
        { title: 'Малому и среднему бизнесу', text: 'Создадим представительство в сети для стабильного потока заявок и автоматизации продаж.' },
        { title: 'Digital-агентствам (white-label)', text: 'Надежный партнер для разработки сайтов под ключ вашим клиентам с полным погружением.' },
        { title: 'Стартапам и IT-продуктам', text: 'Быстрый запуск MVP или лендингов для проверки гипотез и привлечения первых пользователей.' }
      ],
    },
    technologies: {
      title: 'Используемые технологии',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Figma', 'WordPress', 'Node.js', 'Framer Motion'],
    },
    antiPortfolio: {
      label: 'Не сотрудничаем',
      title: 'Мы категорически не работаем с тем, что связано:',
      items: [
        'алкоголь',
        'табак',
        'сетевой маркетинг',
        'финансовые пирамиды',
        'микрокредитные компании',
        'банки',
        'политические партии',
        'экстрасенсы, чародеи, маги и т.д.'
      ],
      closing: 'Благодарим за понимание'
    },
    calculator: {
      title: 'Хотите узнать, сколько будет стоить сайт со скидкой? Пройдите калькулятор!',
      text: 'Ответьте всего на 10 вопросов и мы рассчитаем вам стоимость и вышлем КП',
      button: 'Калькулятор цен'
    },
    contacts: {
      title: 'Есть дополнительные вопросы?',
      description: 'Оставьте свои контакты и мы перезвоним Вам',
      form: { name: 'Имя', contact: 'Телефон', submit: 'Перезвоните мне' },
      socialText: 'Нажмите, чтобы связаться с нами через мессенджеры',
    },
    footer: {
      brandDesc: 'Студия веб-разработки полного цикла нового поколения. Мы не просто создаем красивую картинку, мы делаем продукт, который решает задачи бизнеса и приносит прибыль.',
      copyright: '© 2024-2026 PixelCode. Все права защищены. Политика конфиденциальности',
      navTitle: 'Навигация',
      contacts: {
        phone: '+996 (557) 55-50-58',
        address: 'г. Паш, онлайн',
        hours: 'Пн-Пт 10:00 - 18:00',
        email: 'hello@linkhub.dev'
      }
    },
  },
  en: {
    brand: 'PixelCode',
    nav: ['Home', 'About Me', 'Pricing', 'Portfolio', 'Contacts'],
    hero: {
      badge: 'Premium Web Development',
      title: 'We create websites that sell and elevate your brand',
      subtitle: 'Landing pages, corporate websites, and e-commerce platforms with modern design, high speed, and a clear conversion funnel.',
      ctaPrimary: 'Discuss Project',
      ctaSecondary: 'View Our Work',
      benefits: ['Launch in 5 days', 'Conversion UX/UI', 'SEO-ready structure', 'Post-release support'],
    },
    about: {
      title: 'About Us',
      cards: [
        { title: 'Who We Are', text: 'A team of web developers and designers combining business thinking, marketing, and clean engineering.' },
        { title: 'Our Approach', text: 'Every screen is designed as part of a funnel: attention, trust, action.' },
        { title: 'How We Work', text: 'As a full-cycle digital studio: strategy, design, development, launch, and analytics in one united process.' },
        { title: 'Why Trust Us', text: 'Transparent deadlines, clear stages, reasoned decisions, and a focus on business results.' },
      ],
    },
    services: {
      title: 'Services',
      from: 'from',
      includesLabel: 'Includes',
      timelineLabel: 'Timeline',
      items: [
        {
          title: 'Landing page',
          description: 'A one-page website for fast ad launches and lead generation.',
          includes: ['Niche analysis', 'Sales-driven structure', 'Lead form', 'Basic SEO'],
          timeline: '5-7 days',
          price: '$300',
        },
        {
          title: 'Corporate website',
          description: 'A multi-page company website focused on trust and service presentation.',
          includes: ['Up to 10 pages', 'UI kit', 'Analytics setup', 'CMS/content editing'],
          timeline: '14-20 days',
          price: '$800',
        },
        {
          title: 'Online store',
          description: 'An eCommerce solution with catalog, cart, and smooth checkout experience.',
          includes: ['Catalog and filters', 'Product page', 'Payments/delivery', 'Tech optimization'],
          timeline: '20-35 days',
          price: '$1200',
        },
        {
          title: 'Figma design',
          description: 'Modern interface with thoughtful typography and a unified brand style.',
          includes: ['Prototype', 'UI system', 'Responsive screens', 'Handoff to development'],
          timeline: '4-10 days',
          price: '$250',
        },
        {
          title: 'Website support',
          description: 'Ongoing technical support, updates, and improvements after launch.',
          includes: ['Content updates', 'Monitoring', 'Minor improvements', 'Consulting'],
          timeline: 'monthly',
          price: '$120',
        },
      ],
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      description: 'Choose the plan that works for you\nAll plans include basic support and high quality execution.',
      annualBillingText: 'Annual billing',
      saveText: '(Save 20%)',
      billedMonthlyText: 'billed monthly',
      billedAnnuallyText: 'billed annually',
      popularBadgeText: 'Popular',
      columns: ['Start', 'Business', 'Premium'],
      rows: [
        { feature: 'Project type', values: ['Landing page', 'Corporate website', 'Complex product / eCommerce'] },
        { feature: 'Pages', values: ['1', 'up to 10', 'custom'] },
        { feature: 'Custom design', values: ['Yes', 'Yes', 'Yes + design system'] },
        { feature: 'Animation and interactivity', values: ['Basic', 'Advanced', 'Premium'] },
        { feature: 'SEO optimization', values: ['Basic', 'Advanced', 'Extended'] },
        { feature: 'Post-launch support', values: ['7 days', '30 days', '90 days'] },
        { feature: 'Price', values: ['200', '600', '1000'] },
      ],
    },
    portfolio: {
      title: 'Portfolio',
      items: [
        {
          niche: 'FinTech',
          name: 'Investment platform',
          task: 'Increase trust and lead volume from paid traffic.',
          done: 'New offer structure, UI/UX, React landing page.',
          result: '+38% leads in 30 days',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'Education',
          name: 'Online language school',
          task: 'Package product and improve trial lesson sign-ups.',
          done: 'Redesign, quiz form, <2s page speed.',
          result: '+52% lead conversion',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'eCommerce',
          name: 'Electronics store',
          task: 'Lower bounce rate and increase average order value.',
          done: 'New catalog, filters, product pages, cart UX.',
          result: '+27% average order value',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'B2B',
          name: 'IT integrator website',
          task: 'Build a premium-level service presentation.',
          done: 'Corporate site, case studies, SEO structure, motion.',
          result: 'x2 inbound requests',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    why: {
      title: 'Why Choose Us',
      items: [
        'Sales-oriented approach, not just visuals',
        'Clean and scalable code from an engineering team',
        'Clear communication and stage reports',
        'Fast load speed and technical optimization',
        'Modern minimalist design',
        'Post-launch support and growth',
      ],
    },
    process: {
      title: 'Workflow',
      steps: ['Request', 'Briefing', 'Prototype', 'Design', 'Development', 'Testing', 'Launch'],
    },
    cases: {
      title: 'Cases and results',
      items: [
        { name: 'B2B services landing', metrics: ['+41% leads', '-23% lead cost', '6-day launch'] },
        { name: 'Corporate website', metrics: ['x2 organic traffic', '+34% time on site', 'Brand demand growth'] },
        { name: 'Online store', metrics: ['+29% add-to-cart rate', '+18% repeat purchases', '-35% bounce rate'] },
      ],
    },
    testimonials: {
      title: 'Client testimonials',
      items: [
        {
          author: {
            name: 'Azamat R.',
            handle: '@aza_fin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'We got a digital agency-level website. Everything was on time, and leads started coming in the very first week.',
        },
        {
          author: {
            name: 'Aizada K.',
            handle: '@aiza_edtech',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Strong UX and logical structure. Advertising started paying off faster than with the old site.',
        },
        {
          author: {
            name: 'Timur S.',
            handle: '@timur_ecom',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Very accurate work: design, code, and analytics. A professional, systematic approach is evident.',
        },
        {
          author: { name: 'Eugene V.', handle: '@evg_logistic', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
          text: 'The website performs 10/10. Fast loading, convenient admin panel, and conversion increased by 1.5 times.',
        },
        {
          author: { name: 'Dinara T.', handle: '@dina_beauty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
          text: 'Perfect alignment with our brand. Clients constantly praise the design, and launch took only 10 days.',
        },
        {
          author: { name: 'Maxim O.', handle: '@max_dev', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' },
          text: 'As an engineer, I appreciated the code quality. Zero lag, 90+ on Google PageSpeed. Highly recommended.',
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'How much does a website cost?', a: 'Depends on scope. Landing pages start at $300, corporate websites from $800.' },
        { q: 'How long does development take?', a: 'Landing: 5-7 days, corporate website: 14-20 days, eCommerce: from 20 days.' },
        { q: 'Do you work with contracts?', a: 'Yes, we can formalize contract terms, milestones, and deliverables.' },
        { q: 'Can we request revisions?', a: 'Yes, each project stage includes approval and revision cycles.' },
        { q: 'Do you provide SEO?', a: 'Yes, basic SEO is included. Extended SEO preparation is also available.' },
        { q: 'Is support available after launch?', a: 'Yes, support and growth options are available based on package.' },
      ],
    },
    guarantees: {
      title: 'Guarantees',
      items: [
        'Clear timeline and scope before project starts',
        'Transparent pricing with no hidden fees',
        'Full handover of source code and access',
        'Technical support after launch',
      ],
    },
    audience: {
      title: 'Who Our Websites Are For',
      items: [
        { title: 'Experts and Personal Brands', text: 'We package your expertise into a stylish website that broadcasts professionalism and audience trust.' },
        { title: 'Small and Medium Businesses', text: 'We create a digital presence for a stable flow of leads and sales automation.' },
        { title: 'Digital Agencies (White-label)', text: 'A reliable partner for turnkey website development for your clients with full immersion.' },
        { title: 'Startups and IT Products', text: 'Rapid MVP or landing page launches for testing hypotheses and attracting early users.' }
      ],
    },
    technologies: {
      title: 'Technologies Used',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Figma', 'WordPress', 'Node.js', 'Framer Motion'],
    },
    antiPortfolio: {
      label: 'Do not cooperate',
      title: 'We strictly do not work with anything related to:',
      items: [
        'alcohol',
        'tobacco',
        'network marketing',
        'ponzi schemes',
        'microcredit companies',
        'banks',
        'political parties',
        'psychics, sorcerers, magicians, etc.'
      ],
      closing: 'Thank you for your understanding'
    },
    calculator: {
      title: 'Want to know how much your website will cost with a discount? Try the calculator!',
      text: 'Answer just 10 questions, and we will calculate the cost of your project.',
      button: 'Price Calculator'
    },
    contacts: {
      title: 'Have additional questions?',
      description: 'Leave your contacts, and we will call you back',
      form: { name: 'Name', contact: 'Phone', submit: 'Call me back' },
      socialText: 'Click to reach us via messengers',
    },
    footer: {
      brandDesc: 'Next-generation full-cycle web development studio. We don’t just create a beautiful picture, we build a product that solves business problems and generates profit.',
      copyright: '© 2024-2026 PixelCode. All rights reserved. Privacy Policy',
      navTitle: 'Navigation',
      contacts: {
        phone: '+996 (557) 55-50-58',
        address: 'Osh, Remote',
        hours: 'Mon-Fri 10:00 - 18:00',
        email: 'hello@linkhub.dev'
      }
    },
  },
  kg: {
    brand: 'PixelCode',
    nav: ['Башкы', 'Мен жөнүндө', 'Тарифтер', 'Портфолио', 'Байланыштар'],
    hero: {
      badge: 'Премиум веб-иштеп чыгуу',
      title: 'Биз сатуучу жана брендди күчөтүүчү сайттарды жасайбыз',
      subtitle: 'Лендинг, корпоративдик сайттар жана интернет-дүкөндөр заманбап дизайн, жогорку ылдамдык жана түшүнүктүү өтүнмө воронкасы менен.',
      ctaPrimary: 'Проектини талкуулоо',
      ctaSecondary: 'Биздин иштерди көрүү',
      benefits: ['5 күндөн баштап ишке киргизүү', 'Конверсиялык UX/UI', 'SEO-даяр түзүм', 'Релизден кийинки колдоо'],
    },
    about: {
      title: 'Биз жөнүндө',
      cards: [
        { title: 'Биз кимбиз', text: 'Бизнес-ой жүгүртүүнү, маркетингди жана таза инженердик ишке ашырууну айкалыштырган веб-иштеп чыгуучулар командасы.' },
        { title: 'Биздин мамиле', text: 'Ар бир экран воронканын бир бөлүгү катары долбоорлонот: көңүл буруу, ишеним, аракет.' },
        { title: 'Кантип иштейбиз', text: 'Digital-студия катары: стратегия, дизайн, иштеп чыгуу, ишке киргизүү жана аналитика бир процессте.' },
        { title: 'Эмне үчүн бизге ишенишет', text: 'Айкын мөөнөттөр, так этаптар, негизделген чечимдер жана бизнес-натыйжага көңүл буруу.' },
      ],
    },
    services: {
      title: 'Кызматтар',
      from: 'баштап',
      includesLabel: 'Курамына кирет',
      timelineLabel: 'Мөөнөт',
      items: [
        {
          title: 'Лендинг',
          description: 'Жарнаманы тез баштоо жана лид алуу үчүн бир барактуу сайт.',
          includes: ['Нишаны талдоо', 'Сатуучу структура', 'Заявка формасы', 'Негизги SEO'],
          timeline: '5-7 күн',
          price: '$300',
        },
        {
          title: 'Корпоративдик сайт',
          description: 'Компанияны ишенимдүү көрсөтүү үчүн көп барактуу сайт.',
          includes: ['10 бетке чейин', 'UI кит', 'Аналитика орнотуу', 'CMS/контент оңдоо'],
          timeline: '14-20 күн',
          price: '$800',
        },
        {
          title: 'Интернет-дүкөн',
          description: 'Каталог, корзина жана ыңгайлуу сатып алуу сценарийи бар eCommerce чечим.',
          includes: ['Каталог жана фильтр', 'Товар барагы', 'Төлөм/жеткирүү', 'Техникалык оптимизация'],
          timeline: '20-35 күн',
          price: '$1200',
        },
        {
          title: 'Figma дизайн',
          description: 'Заманбап интерфейс, так типографика жана бренд стили.',
          includes: ['Прототип', 'UI системасы', 'Адаптивдүү экрандар', 'Иштеп чыгууга өткөрүү'],
          timeline: '4-10 күн',
          price: '$250',
        },
        {
          title: 'Сайт колдоосу',
          description: 'Релизден кийин техникалык коштоо, жаңыртуу жана жакшыртуу.',
          includes: ['Контент жаңыртуу', 'Мониторинг', 'Майда жакшыртуулар', 'Консультация'],
          timeline: 'ай сайын',
          price: '$120',
        },
      ],
    },
    pricing: {
      title: 'Жөнөкөй жана ачык тарифтер',
      description: 'Сизге ылайыктуу тарифти тандаңыз\nБардык тарифтер негизги колдоону жана жогорку сапатты камтыйт.',
      annualBillingText: 'Жылдык төлөм',
      saveText: '(20% үнөмдөө)',
      billedMonthlyText: 'ай сайын төлөө',
      billedAnnuallyText: 'жыл сайын төлөө',
      popularBadgeText: 'Популярдуу',
      columns: ['Start', 'Business', 'Premium'],
      rows: [
        { feature: 'Долбоор түрү', values: ['Лендинг', 'Корпоративдик сайт', 'Татаал продукт / eCommerce'] },
        { feature: 'Беттер саны', values: ['1', '10го чейин', 'жеке'] },
        { feature: 'Уникалдуу дизайн', values: ['Ооба', 'Ооба', 'Ооба + дизайн-система'] },
        { feature: 'Анимация жана интерактив', values: ['Негизги', 'Кеңейтилген', 'Премиум'] },
        { feature: 'SEO оптимизация', values: ['Негизги', 'Кеңейтилген', 'Өркүндөтүлгөн'] },
        { feature: 'Релизден кийинки колдоо', values: ['7 күн', '30 күн', '90 күн'] },
        { feature: 'Баасы', values: ['200', '600', '1000'] },
      ],
    },
    portfolio: {
      title: 'Портфолио',
      items: [
        {
          niche: 'FinTech',
          name: 'Инвестиция платформасы',
          task: 'Ишенимди жана paid трафиктен заявкаларды көбөйтүү.',
          done: 'Оффер структурасы, UI/UX, React лендинг.',
          result: '30 күндө +38% заявка',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'Education',
          name: 'Онлайн тил мектеби',
          task: 'Продуктту туура таңгактап, сыноо сабакка жазылууну көбөйтүү.',
          done: 'Редизайн, квиз-форма, жүктөлүү < 2s.',
          result: 'Заявка конверсиясы +52%',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'eCommerce',
          name: 'Электроника дүкөнү',
          task: 'Кайтуу көрсөткүчүн азайтып, орточо чекти көтөрүү.',
          done: 'Жаңы каталог, фильтр, товар картасы жана корзина UX.',
          result: 'Орточо чек +27%',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        },
        {
          niche: 'B2B',
          name: 'IT интегратор сайты',
          task: 'Кызматтарды премиум деңгээлде көрсөтүү.',
          done: 'Корпоративдик сайт, кейстер, SEO структура, анимация.',
          result: 'Кирген кайрылуу x2',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
        },
      ],
    },
    why: {
      title: 'Эмне үчүн бизди тандашат',
      items: [
        'Визуалга эле эмес, сатууга көңүл буруу',
        'Инженердик командадан таза жана масштабдуу код',
        'Түшүнүктүү коммуникация жана этаптар боюнча отчеттор',
        'Тез жүктөө жана техникалык оптималдаштыруу',
        'Заманбап минималисттик дизайн',
        'Ишке киргизгенден кийинки колдоо жана өнүктүрүү',
      ],
    },
    process: {
      title: 'Иш этаптары',
      steps: ['Заявка', 'Брифинг', 'Прототип', 'Дизайн', 'Иштеп чыгуу', 'Тестирлөө', 'Ишке киргизүү'],
    },
    cases: {
      title: 'Кейстер жана жыйынтыктар',
      items: [
        { name: 'B2B кызмат лендинги', metrics: ['+41% лид', 'Заявка баасы -23%', '6 күндө ишке кирди'] },
        { name: 'Корпоративдик сайт', metrics: ['Органикалык трафик x2', 'Сайтта убакыт +34%', 'Бренд суроо-талабы өстү'] },
        { name: 'Интернет-дүкөн', metrics: ['Корзинага кошуу +29%', 'Кайра сатып алуу +18%', 'Кайтуу -35%'] },
      ],
    },
    testimonials: {
      title: 'Кардарлардын пикирлери',
      items: [
        {
          author: {
            name: 'Азамат Р.',
            handle: '@aza_fin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Digital-агентство деңгээлиндеги сайт алдык. Баары өз убагында болду, биринчи жумада эле кардарлар келе баштады.',
        },
        {
          author: {
            name: 'Айзада К.',
            handle: '@aiza_edtech',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Мыкты UX жана туура структура. Жарнама эски сайтка караганда тезирээк актай баштады.',
        },
        {
          author: {
            name: 'Тимур С.',
            handle: '@timur_ecom',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          text: 'Аябай так иш: дизайн, код жана аналитика. Профессионалдык системалуу мамиле байкалып турат.',
        },
        {
          author: { name: 'Евгений В.', handle: '@evg_logistic', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
          text: 'Сайт 10/10 иштейт. Тез жүктөлөт, ыңгайлуу админка. Конверсия өнүгүп жатат.',
        },
        {
          author: { name: 'Динара Т.', handle: '@dina_beauty', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
          text: 'Бренддин стилине идеалдуу туура келди. Ишке киргизүү 10 эле күндү алды.',
        },
        {
          author: { name: 'Максим О.', handle: '@max_dev', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' },
          text: 'Коддун сапатын биз бийик бааладык. Эч кандай катуулар жок. Сунуштайм.',
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        { q: 'Сайт канча турат?', a: 'Баасы максатка жараша. Лендинг $300дөн, корпоративдик сайт $800дөн башталат.' },
        { q: 'Иштеп чыгуу мөөнөтү кандай?', a: 'Лендинг: 5-7 күн, корпоративдик сайт: 14-20 күн, eCommerce: 20 күндөн.' },
        { q: 'Келишим менен иштейсизби?', a: 'Ооба, этаптар, мөөнөттөр жана жумуш көлөмү келишимде бекитилет.' },
        { q: 'Түзөтүү киргизсе болобу?', a: 'Ооба, ар бир этапта макулдашуу жана түзөтүү цикли каралган.' },
        { q: 'SEO жасайсызбы?', a: 'Ооба, негизги SEO камтылган. Зарыл болсо кеңейтилген SEO даярдоо бар.' },
        { q: 'Релизден кийин колдоо барбы?', a: 'Ооба, тандалган пакетке жараша колдоо жана өнүктүрүү кызматын берем.' },
      ],
    },
    guarantees: {
      title: 'Кепилдиктер',
      items: [
        'Стартка чейин мөөнөт жана этаптар так бекитилет',
        'Ачык смета, жашыруун төлөмдөр жок',
        'Баштапкы код жана бардык доступдар өткөрүлөт',
        'Релизден кийин техникалык колдоо',
      ],
    },
    audience: {
      title: 'Биздин сайттар кимдерге ылайыктуу',
      items: [
        { title: 'Эксперттерге жана жеке бренддерге', text: 'Сиздин тажрыйбаңызды профессионалдуулукту жана аудиториянын ишенимин чагылдыра турган стилдүү сайтка таңгактайбыз.' },
        { title: 'Чакан жана орто бизнеске', text: 'Сурамдардын туруктуу агымы жана сатууну автоматташтыруу үчүн интернетте өкүлчүлүк түзөбүз.' },
        { title: 'Digital-агенттиктерге (white-label)', text: 'Сиздин кардарларыңызга сайттарды толук иштеп чыгуу үчүн ишенимдүү өнөктөш.' },
        { title: 'Стартаптарга жана IT-өнүмдөргө', text: 'Гипотезаларды текшерүү жана алгачкы колдонуучуларды тартуу үчүн MVP же лендингдерди тез ишке киргизүү.' }
      ],
    },
    technologies: {
      title: 'Колдонулган технологиялар',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Figma', 'WordPress', 'Node.js', 'Framer Motion'],
    },
    antiPortfolio: {
      label: 'Кызматташпайбыз',
      title: 'Биз төмөнкүлөр менен таптакыр иштешпейбиз:',
      items: [
        'алкоголь',
        'тамеки',
        'тармактуу маркетинг',
        'финансылык пирамидалар',
        'микрокредиттик компаниялар',
        'банктар',
        'саясий партиялар',
        'экстрасенс, бакшы, көз ачык ж.б.'
      ],
      closing: 'Түшүнгөнүңүз үчүн рахмат'
    },
    calculator: {
      title: 'Сайттын баасын арзандатуу менен билгиңиз келеби? Калькулятордон өтүңүз!',
      text: 'Болгону 10 суроого жооп берип, баасын эсептеп беребиз',
      button: 'Баа эсептөөчү калькулятор'
    },
    contacts: {
      title: 'Суроолоруңуз барбы?',
      description: 'Байланыш маалыматтарыңызды калтырыңыз, биз сизге чалабыз',
      form: { name: 'Атыңыз', contact: 'Телефон номериңиз', submit: 'Мага чалыңыз' },
      socialText: 'Мессенджер аркылуу байланышуу үчүн төмөнкүнү басыңыз',
    },
    footer: {
      brandDesc: 'Жаңы муундагы толук циклдуу веб-иштеп чыгуу студиясы. Биз жөн гана кооз сүрөт жаратпайбыз, бизнес көйгөйлөрүн чечип, киреше алып келүүчү продукт жасайбыз.',
      copyright: '© 2024-2026 PixelCode. Бардык укуктар корголгон. Купуялык саясаты',
      navTitle: 'Навигация',
      contacts: {
        phone: '+996 (557) 55-50-58',
        address: 'Паш ш., онлайн',
        hours: 'Дүйш-Жума 10:00 - 18:00',
        email: 'hello@linkhub.dev'
      }
    },
  },
};
