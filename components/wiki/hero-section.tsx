import Link from "next/link"
import { HeroCarousel } from "@/components/wiki/hero-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { wikiStats } from "@/lib/wiki-stats"
import { Calculator, Sprout, Database, GitBranch, BookOpen } from "lucide-react"

const stats = [
  { icon: Database, label: "SEEDS", value: wikiStats.seeds },
  { icon: GitBranch, label: "RARITIES", value: wikiStats.rarities },
  { icon: Calculator, label: "MUTATIONS", value: wikiStats.mutations },
  { icon: BookOpen, label: "CODES", value: wikiStats.codes },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sprout className="h-4 w-4" />
              <span>Unofficial Fan Guide</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
              Build A Ring Farm Wiki &amp; Calculator
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl lg:mx-0">
              Your complete unofficial guide to seeds, mutations, codes, rings, and earnings on Roblox.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start sm:gap-4">
              <Button size="lg" asChild>
                <Link href="/seeds">
                  <Sprout className="mr-2 h-5 w-5" />
                  Explore Seeds
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/progression">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Progression Guide
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/codes">View Codes</Link>
              </Button>
            </div>
          </div>

          <HeroCarousel />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-primary/10 bg-card/80 backdrop-blur">
              <CardContent className="flex flex-col items-center p-4">
                <stat.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</span>
                <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
