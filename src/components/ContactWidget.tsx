import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

// SiWhatsapp from react-icons/si doesn't exist out of the box without installing react-icons. 
// We will use a custom SVG for WhatsApp to keep dependencies light.
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13"></path>
    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
  </svg>
);

interface ContactWidgetProps {
  telegramUrl: string;
  whatsappUrl: string;
}

export function ContactWidget({ telegramUrl, whatsappUrl }: ContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* WhatsApp Button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-transform origin-right"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-medium text-sm">WhatsApp</span>
              <WhatsAppIcon />
            </motion.a>

            {/* Telegram Button (Primary focus with pulse) */}
            <motion.a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#0088cc] text-white shadow-lg shadow-[#0088cc]/30 hover:scale-105 transition-transform origin-right relative overflow-hidden group"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              <span className="font-medium text-sm">Telegram</span>
              <TelegramIcon />
              {/* Pulse effect absolute overlay */}
              <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Action Button */}
      <button
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 relative ${
          isOpen ? 'bg-[var(--card-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] backdrop-blur-md' : 'bg-emerald-500 hover:bg-emerald-600'
        }`}
        aria-label="Связаться с нами"
      >
        {/* Subtle glowing pulse when closed */}
        {!isOpen && (
          <span className="absolute w-full h-full rounded-full bg-emerald-500/50 animate-ping opacity-75 pointer-events-none"></span>
        )}
        
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.div>
      </button>
    </div>
  );
}
