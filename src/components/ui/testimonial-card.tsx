import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        "flex flex-col rounded-2xl",
        "card-premium p-6 text-start",
        "w-[280px] sm:w-[320px] max-w-full",
        "transition-transform hover:-translate-y-1",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-[var(--text-secondary)]/20">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold text-[var(--text-primary)] leading-tight">
            {author.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
        {text}
      </p>
    </Card>
  )
}
