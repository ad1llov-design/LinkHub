import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileCarouselProps {
  items: React.ReactNode[];
}

export function MobileCarousel({ items }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <div className="w-full relative min-h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full absolute inset-0 flex items-center justify-center p-2"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glass Controls */}
      <div className="flex items-center gap-6 mt-6 z-10">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <span className="text-sm font-medium text-white/60">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
