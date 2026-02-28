import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Locale } from '../translations';
import { Link } from 'react-router-dom';

interface CalculatorPageProps {
  t: Locale;
}

export default function CalculatorPage({ t }: CalculatorPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  // Default Russian questions if translations aren't strictly typed for the calculator yet
  const questions = [
    {
      question: "Какой тип сайта вам нужен?",
      options: [
        { label: "Лендинг (одностраничный)", value: 300 },
        { label: "Многостраничный корпоративный", value: 800 },
        { label: "Интернет-магазин (eCommerce)", value: 1200 },
        { label: "Сложный веб-сервис / Портал", value: 2000 }
      ]
    },
    {
      question: "Есть ли у вас готовый дизайн (Figma)?",
      options: [
        { label: "Нет, нужен дизайн под ключ", value: 200 },
        { label: "Есть референсы, нужен дизайн", value: 150 },
        { label: "Да, дизайн готов к верстке", value: 0 }
      ]
    },
    {
      question: "Нужны ли сложные анимации (3D, скролл-эффекты)?",
      options: [
        { label: "Нет, стандартная верстка", value: 0 },
        { label: "Да, базовая интерактивность", value: 150 },
        { label: "Да, премиум анимации (Framer Motion, 3D)", value: 400 }
      ]
    },
    {
      question: "Есть ли у вас готовые тексты (Копирайтинг)?",
      options: [
        { label: "Да, все тексты готовы", value: 0 },
        { label: "Частично, нужно доработать", value: 100 },
        { label: "Нет, тексты нужно написать с нуля", value: 250 }
      ]
    },
    {
      question: "Нужна ли админ-панель (CMS) для управления контентом?",
      options: [
        { label: "Нет, сайт статичный", value: 0 },
        { label: "Да, стандартная CMS (WordPress/Sanity)", value: 300 },
        { label: "Да, кастомная админка", value: 700 }
      ]
    },
    {
      question: "Потребуется ли настройка SEO-оптимизации?",
      options: [
        { label: "Только базовая (уже включена)", value: 0 },
        { label: "Продвинутая SEO-подготовка", value: 200 }
      ]
    },
    {
      question: "Сколько языковых версий будет на сайте?",
      options: [
        { label: "Один язык", value: 0 },
        { label: "Два языка", value: 150 },
        { label: "Три и более языков", value: 300 }
      ]
    },
    {
      question: "Нужна ли интеграция с внешними сервисами (CRM, Платежи)?",
      options: [
        { label: "Нет", value: 0 },
        { label: "Да, базовая CRM (Amo, Bitrix) / Подписка", value: 250 },
        { label: "Сложные API-интеграции (1C, Кассы и т.д.)", value: 600 }
      ]
    },
    {
      question: "Насколько срочно вам нужен проект?",
      options: [
        { label: "Стандартные сроки (от 2 недель)", value: 0 },
        { label: "Срочно (менее 14 дней, +30% к бюджету)", value: -1 } // -1 means multiplier 1.3
      ]
    },
    {
      question: "Нужна ли техническая поддержка после запуска?",
      options: [
        { label: "Достаточно базовой (1 месяц - бесплатно)", value: 0 },
        { label: "Да, поддержка на 3 месяца", value: 200 },
        { label: "Да, постоянное сопровождение", value: 500 }
      ]
    }
  ];

  const handleSelectOption = (value: number) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      calculateTotal();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const calculateTotal = () => {
    let base = 0;
    let isUrgent = false;

    Object.values(answers).forEach((val) => {
      if (val === -1) {
        isUrgent = true;
      } else {
        base += val;
      }
    });

    if (isUrgent) {
      base = Math.round(base * 1.3);
    }

    setTotalCost(base);
    setIsCalculated(true);
  };

  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="min-h-[85vh] py-10 md:py-20 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 w-full">
      <Link to="/" className="self-start flex items-center gap-2 mb-8 text-[var(--text-secondary)] hover:text-emerald-500 transition-colors">
        <ArrowLeft size={20} />
        <span>{t.nav[0] ? "Вернуться на главную" : "Вернуться"}</span>
      </Link>

      <div className="w-full card-premium p-6 md:p-12 relative overflow-hidden">
        {/* Progress Bar */}
        {!isCalculated && (
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--border-color)]">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isCalculated ? (
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col min-h-[400px]"
            >
              <div className="text-sm font-semibold text-emerald-500 mb-2 uppercase tracking-wide">
                Шаг {currentStep + 1} из {questions.length}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug text-[var(--text-primary)]">
                {questions[currentStep].question}
              </h2>

              <div className="flex flex-col gap-3 mt-auto mb-8">
                {questions[currentStep].options.map((option, idx) => {
                  const isSelected = answers[currentStep] === option.value;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.value)}
                      className={`text-left w-full p-4 md:p-5 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-[var(--glass-border)] bg-[var(--card-bg)] hover:bg-[var(--glass-hover)]'
                      }`}
                    >
                      <span className={`font-medium ${isSelected ? 'text-emerald-500' : 'text-[var(--text-primary)]'}`}>
                        {option.label}
                      </span>
                      {isSelected && <CheckCircle2 size={20} className="text-emerald-500" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-6 py-3 rounded-lg font-medium text-[var(--text-secondary)] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.contacts.form.submit ? "Назад" : "Назад"}
                </button>
                <button
                  onClick={handleNext}
                  disabled={answers[currentStep] === undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  {currentStep === questions.length - 1 ? "Узнать стоимость" : "Далее"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Расчет завершен</h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-md">
                Ориентировочная стоимость вашего проекта составит:
              </p>
              
              <div className="text-5xl md:text-6xl font-black text-emerald-500 mb-10 tracking-tight">
                ~${totalCost.toLocaleString()}
              </div>

              <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-sm">
                Оставьте заявку, чтобы получить точную смету и обсудить детали вашего проекта.
              </p>

              <div className="flex flex-col w-full max-w-sm gap-4">
                <a href="/#contacts" className="w-full inline-flex justify-center items-center rounded-full bg-[var(--text-primary)] text-[var(--bg-color)] px-6 py-4 font-bold transition hover:scale-105">
                  Оставить заявку
                </a>
                <button 
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setIsCalculated(false);
                  }}
                  className="w-full inline-flex justify-center items-center rounded-full border border-[var(--border-color)] px-6 py-4 font-bold transition hover:bg-white/5"
                >
                  Пройти заново
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
