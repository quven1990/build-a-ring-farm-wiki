import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"

type Breadcrumb = {
  label: string
  href?: string
}

type PageHeroProps = {
  title: string
  description: string
  breadcrumbs?: Breadcrumb[]
  showLastUpdated?: boolean
}

export function PageHero({ title, description, breadcrumbs, showLastUpdated }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background py-10 sm:py-14">
      <div className="container mx-auto px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            {breadcrumbs.map((item, index) => (
              <span key={item.label} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {showLastUpdated && <LastUpdatedBadge />}
        <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">{description}</p>
      </div>
    </section>
  )
}
