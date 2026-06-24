import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroCarouselDeferred } from "@/components/wiki/hero-carousel-deferred"
import { HeroCopyLatest } from "@/components/wiki/hero-copy-latest"
import { PlayOnRobloxLink } from "@/components/wiki/play-on-roblox-link"
import { TrackedLink } from "@/components/wiki/tracked-link"
import { wikiStats } from "@/lib/wiki-stats"
import { pageMeta } from "@/lib/site-config"
import { CitableSummary } from "@/components/wiki/citable-summary"
import { PageShareButtons } from "@/components/wiki/page-share-buttons"
import { wikiCodesSorted } from "@/lib/codes-data"
import {
  Sprout,
  Calculator,
  Database,
  GitBranch,
  Gift,
  Sparkles,
  ExternalLink,
  Gamepad2,
} from "lucide-react"

const stats = [
  { icon: Database, label: "SEEDS", value: wikiStats.seeds, href: "/seeds" },
  { icon: GitBranch, label: "RARITIES", value: wikiStats.rarities, href: "/seeds" },
  { icon: Calculator, label: "MUTATIONS", value: wikiStats.mutations, href: "/mutations" },
  { icon: Gift, label: "CODES", value: wikiStats.codes, href: "/codes" },
] as const

/** Server-rendered hero — LCP image + copy in first HTML; carousel JS deferred. */
export function HeroSectionStatic() {
  const latestCode = wikiCodesSorted[0]?.code

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sprout className="h-4 w-4" />
              <span>Unofficial Player Toolkit</span>
            </div>

            <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Build A Ring Farm Wiki — Codes, Seeds &amp; Calculator
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl lg:mx-0">
              Active <strong className="font-medium text-foreground">redeem codes</strong>, free{" "}
              <strong className="font-medium text-foreground">profit calculator</strong>, full{" "}
              <strong className="font-medium text-foreground">mutations list</strong>, and a{" "}
              <strong className="font-medium text-foreground">51-seed database</strong> for Build A
              Ring Farm on Roblox — updated for June 2026.
            </p>

            <CitableSummary page="home" className="mx-auto mb-8 max-w-xl text-left lg:mx-0" />

            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <PlayOnRobloxLink location="hero">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Play on Roblox
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70" aria-hidden />
                </PlayOnRobloxLink>
              </Button>
              {latestCode ? <HeroCopyLatest code={latestCode} /> : null}
              <Button size="lg" className="w-full sm:w-auto" variant="outline" asChild>
                <TrackedLink href="#latest-codes" tracking={{ kind: "cta", source: "home-hero", label: "working-codes" }}>
                  <Gift className="mr-2 h-5 w-5" />
                  Working codes
                </TrackedLink>
              </Button>
            </div>

            <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-start">
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <TrackedLink href="/calculator" tracking={{ kind: "cta", source: "home-hero", label: "calculator" }}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculator
                </TrackedLink>
              </Button>
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <TrackedLink href="/mutations" tracking={{ kind: "cta", source: "home-hero", label: "mutations" }}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Mutations
                </TrackedLink>
              </Button>
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <TrackedLink href="/seeds" tracking={{ kind: "cta", source: "home-hero", label: "seeds" }}>
                  <Database className="mr-2 h-4 w-4" />
                  51 Seeds
                </TrackedLink>
              </Button>
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground lg:mx-0">
              Jump to{" "}
              <TrackedLink
                href="/mutations"
                tracking={{ kind: "cta", source: "home-hero", label: "mutations-inline" }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                full mutations list
              </TrackedLink>
              ,{" "}
              <TrackedLink
                href="/codes"
                tracking={{ kind: "cta", source: "home-hero", label: "codes-inline" }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                active redeem codes
              </TrackedLink>
              , or the{" "}
              <TrackedLink
                href="/seeds"
                tracking={{ kind: "cta", source: "home-hero", label: "seeds-inline" }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                seeds database
              </TrackedLink>
              .
            </p>

            <PageShareButtons
              path="/"
              title={pageMeta.home.title}
              text={pageMeta.home.description}
              className="mt-6 items-center sm:items-start"
            />
          </div>

          <div className="order-1 lg:order-2">
            <HeroCarouselDeferred />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <TrackedLink
              key={stat.label}
              href={stat.href}
              tracking={{ kind: "cta", source: "home-hero-stats", label: stat.label.toLowerCase() }}
              className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${stat.value} ${stat.label} — open ${stat.label === "RARITIES" ? "seeds" : stat.label.toLowerCase()} page`}
            >
              <Card className="h-full border-primary/10 bg-card/80 backdrop-blur transition-colors group-hover:border-primary/30 group-hover:bg-card">
                <CardContent className="flex flex-col items-center p-4">
                  <stat.icon className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</span>
                  <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
                </CardContent>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  )
}
