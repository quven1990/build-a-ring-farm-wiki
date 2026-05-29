import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { guideCards, footerGuideLinks } from "@/lib/site-config"
import { LayoutGrid } from "lucide-react"

const toolLinks = [
  { title: "Profit Calculator", href: "/calculator", description: "Verified harvest formula — test mutations & rings" },
  { title: "Mutations Matrix", href: "/mutations", description: "Full 2026 list with multipliers & shop prices" },
  { title: "Active Codes", href: "/codes", description: "Copy redeem codes with status labels" },
  { title: "Seeds Database", href: "/seeds", description: "51 crops, 10 rarities" },
]

export function HomeHubSection() {
  return (
    <section className="border-b border-border bg-background py-14 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-2">
            <LayoutGrid className="mr-1 h-3 w-3" />
            Player Toolkit
          </Badge>
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Explore Tools & Guides</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pick a task — redeem codes, compare seeds, run profit math, or read a focused guide. Each page has unique content for search and planning.
          </p>
        </div>

        <h3 className="mb-4 text-lg font-semibold text-foreground">Popular tools</h3>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolLinks.map((item) => (
            <Card key={item.href} className="h-full transition-colors hover:border-primary/40">
              <Link href={item.href} className="group block h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <h3 className="mb-4 text-lg font-semibold text-foreground">Written guides</h3>
        <ul className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {footerGuideLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mb-4 text-lg font-semibold text-foreground">All databases</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guideCards.map((guide) => (
            <Link key={guide.href} href={guide.href} className="text-sm text-primary hover:underline">
              {guide.title} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
