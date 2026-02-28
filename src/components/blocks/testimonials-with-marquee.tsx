import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

export interface TestimonialsSectionProps {
  title: string
  description?: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn("py-10 md:py-16 reveal", className)}>
      <div className="mx-auto flex flex-col items-center text-center gap-8 md:gap-12 overflow-hidden w-full">
        <div className="flex flex-col items-center gap-3 px-4">
          <h2 className="section-title mb-0">{title}</h2>
          {description && (
            <p className="max-w-2xl text-[var(--text-secondary)] sm:text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 -mx-4 md:mx-0">
          {/* Marquee Container */}
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s] w-full">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] min-w-min">
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
            {/* Duplicate for seamless infinite scrolling */}
            <div aria-hidden="true" className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] min-w-min">
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`dup-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Gradient Overlays for smooth edges (matched to body background var(--bg-color)) */}
          <div 
            className="pointer-events-none absolute inset-y-0 left-0 w-[15%] hidden sm:block z-10" 
            style={{ background: 'linear-gradient(to right, var(--bg-color), transparent)'}} 
          />
          <div 
            className="pointer-events-none absolute inset-y-0 right-0 w-[15%] hidden sm:block z-10" 
            style={{ background: 'linear-gradient(to left, var(--bg-color), transparent)'}} 
          />
        </div>
      </div>
    </section>
  )
}
