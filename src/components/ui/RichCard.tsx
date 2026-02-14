import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import React from 'react';

interface RichCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  external?: boolean;
}

export function RichCard({ title, description, icon, external, className, ...props }: RichCardProps) {
  return (
    <a
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex items-center justify-between gap-4 w-full p-6",
        "bg-white/5 border border-white/10 rounded-2xl overflow-hidden",
        "backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
        "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10",
        "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

      <div className="flex items-center gap-5 z-10">
        {/* Icon Container */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>

        {/* Text Content */}
        <div className="flex flex-col text-left">
          <span className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
            {title}
          </span>
          <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors">
            {description}
          </span>
        </div>
      </div>

      {/* Arrow Icon */}
      <div className="text-white/30 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
        <ArrowUpRight size={24} />
      </div>
    </a>
  );
}
