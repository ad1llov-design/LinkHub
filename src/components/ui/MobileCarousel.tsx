import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileCarouselProps {
  items: React.ReactNode[];
}

export function MobileCarousel({ items }: MobileCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      setCurrentIndex(Math.round(scrollLeft / clientWidth));
    }
  };

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      scrollContainerRef.current.scrollTo({
        left: newIndex * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      scrollContainerRef.current.scrollTo({
        left: newIndex * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full group py-4">
      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap scrollbar-hide w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="w-full shrink-0 snap-center px-10 md:px-14 flex justify-center items-center">
            {item}
          </div>
        ))}
      </div>

      {/* Glass Controls - Absolute Sides */}
      <button
        onClick={prevSlide}
        className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-emerald-500/80 hover:border-emerald-400 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-emerald-500/80 hover:border-emerald-400 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <div 
            key={idx} 
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex ? 'w-6 h-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'w-2 h-2 bg-[var(--text-secondary)] opacity-50'
            }`}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
