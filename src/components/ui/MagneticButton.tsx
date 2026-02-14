import { cn } from '../../lib/utils';
import React from 'react';

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function MagneticButton({ children, className, external, ...props }: MagneticButtonProps) {
  return (
    <a
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex w-full items-center justify-center rounded-xl bg-white/5 px-6 py-4",
        "border border-white/10 backdrop-blur-md transition-all duration-300",
        "hover:scale-[1.02] hover:bg-white/10 hover:border-white/20",
        "active:scale-[0.98]",
        "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3 font-medium text-white/90 group-hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}
