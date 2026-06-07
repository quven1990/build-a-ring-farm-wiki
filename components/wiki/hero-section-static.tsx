import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroCarouselDeferred } from "@/components/wiki/hero-carousel-deferred"
import { HeroCopyLatest } from "@/components/wiki/hero-copy-latest"
import { wikiStats } from "@/lib/wiki-stats"
import { siteConfig, pageMeta } from "@/lib/site-config"
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
  { icon: Database, label: "SEEDS", value: wikiStats.seeds },
  { icon: GitBranch, label: "RARITIES", value: wikiStats.rarities },
  { icon: Calculator, label: "MUTATIONS", value: wikiStats.mutations },
  { icon: Gift, label: "CODES", value: wikiStats.codes },
]

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
          <div className="text-center lg:text-left">
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
                <a
                  href={siteConfig.robloxGameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Play on Roblox
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70" aria-hidden />
                </a>
              </Button>
              {latestCode ? <HeroCopyLatest code={latestCode} /> : null}
              <Button size="lg" className="w-full sm:w-auto" variant="outline" asChild>
                <Link href="#latest-codes">
                  <Gift className="mr-2 h-5 w-5" />
                  Working codes
                </Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-start">
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <Link href="/calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculator
                </Link>
              </Button>
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <Link href="/mutations">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Mutations
                </Link>
              </Button>
              <Button size="default" className="w-full sm:w-auto" variant="outline" asChild>
                <Link href="/seeds">
                  <Database className="mr-2 h-4 w-4" />
                  51 Seeds
                </Link>
              </Button>
            </div>

            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground lg:mx-0">
              Jump to{" "}
              <Link href="/mutations" className="font-medium text-primary underline-offset-4 hover:underline">
                full mutations list
              </Link>
              ,{" "}
              <Link href="/codes" className="font-medium text-primary underline-offset-4 hover:underline">
                active redeem codes
              </Link>
              , or the{" "}
              <Link href="/seeds" className="font-medium text-primary underline-offset-4 hover:underline">
                seeds database
              </Link>
              .
            </p>

            <PageShareButtons
              path="/"
              title={pageMeta.home.title}
              text={pageMeta.home.description}
              className="mt-6 items-center sm:items-start"
            />
          </div>

          <HeroCarouselDeferred />
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
