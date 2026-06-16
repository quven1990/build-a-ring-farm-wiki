import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrackedLink } from "@/components/wiki/tracked-link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatMultiplier, wikiMutations } from "@/lib/mutations-data"
import {
  formatCompactNumber,
  formatGrowTime,
  seeds,
  seedsDataMeta,
} from "@/lib/seeds-data"
import { wikiStats } from "@/lib/wiki-stats"
import { GitBranch, LayoutGrid, Sprout } from "lucide-react"

const HOME_SEED_IDS = ["wheat", "corn", "strawberry", "golden apple"] as const

const layoutPhases = [
  {
    title: "Early game",
    goal: "Stable income fast",
    bullets: [
      "Fill every Inner plot with quick crops (e.g. Wheat, Corn)",
      "Redeem codes for sprays, packs, and time skips",
      "Short paths — harvest often, reinvest roller budget",
    ],
  },
  {
    title: "Mid game",
    goal: "Balance speed and profit",
    bullets: [
      "Move epics and legendaries to Middle ring when unlocked",
      "Buy shop mutations when calculator shows positive ROI",
      "Line up mature crops before Galaxy or Nuclear windows",
    ],
  },
  {
    title: "Late game",
    goal: "Max profit per tile",
    bullets: [
      "Outer ring for slow, high base-income crops during events",
      "Stack event procs (Honeycomb, Farm) on ready Outer harvests",
      "Avoid empty tiles — every slot should earn or roll forward",
    ],
  },
] as const

const efficiencyTips = [
  "Keep high-value crops on the highest ring you can fill consistently.",
  "Run the profit calculator before billion-coin spray purchases.",
  "Pair the mutations matrix with the events page for trigger timing.",
  "Upgrade saw level after Middle and Outer hold strong leveled plants.",
]

export function HomeWikiSections() {
  const previewSeeds = HOME_SEED_IDS.map((id) => seeds.find((s) => s.id === id)).filter(
    (s): s is (typeof seeds)[number] => s != null
  )
  const mutationsSorted = [...wikiMutations].sort((a, b) => b.multiplier - a.multiplier)

  return (
    <>
      <section
        id="mutations-seeds"
        className="border-b border-border bg-background py-12 sm:py-14"
        aria-labelledby="home-mutations-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <Badge variant="outline" className="mb-3">
              <GitBranch className="mr-1 h-3 w-3" aria-hidden />
              Game databases
            </Badge>
            <h2
              id="home-mutations-heading"
              className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Mutations &amp; Seeds at a Glance
            </h2>
            <p className="text-pretty text-muted-foreground sm:text-lg">
              Full {wikiStats.mutations} mutations and {wikiStats.seeds} seeds — compare multipliers
              and crop efficiency before you plant. Tables below are summaries; open each database
              for filters, confidence labels, and patch notes.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Mutation multipliers
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mutation</TableHead>
                      <TableHead>Effect</TableHead>
                      <TableHead>Trigger</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mutationsSorted.map((m) => (
                      <TableRow key={m.name}>
                        <TableCell className="font-medium">
                          <span aria-hidden>{m.emoji}</span> {m.name}
                        </TableCell>
                        <TableCell>{formatMultiplier(m.multiplier)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {m.trigger}
                          {m.eventOnly ? (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Event
                            </Badge>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                <TrackedLink
                  href="/mutations"
                  tracking={{ kind: "cta", source: "home-wiki-sections", label: "mutations-list" }}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Full mutations list &amp; shop prices →
                </TrackedLink>
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Example seeds ({seedsDataMeta.totalSeeds} total)
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Seed</TableHead>
                      <TableHead>Rarity</TableHead>
                      <TableHead>Income</TableHead>
                      <TableHead>Grow</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewSeeds.map((seed) => (
                      <TableRow key={seed.id}>
                        <TableCell className="font-medium">
                          <span aria-hidden>{seed.emoji}</span> {seed.name}
                        </TableCell>
                        <TableCell className="capitalize text-sm text-muted-foreground">
                          {seed.rarity}
                        </TableCell>
                        <TableCell>{formatCompactNumber(seed.baseIncome)}</TableCell>
                        <TableCell>{formatGrowTime(seed.growTimeSeconds)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                <TrackedLink
                  href="/seeds"
                  tracking={{ kind: "cta", source: "home-wiki-sections", label: "seeds-list" }}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Browse all {seeds.length} seeds →
                </TrackedLink>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="farm-layout"
        className="border-b border-border bg-muted/20 py-12 sm:py-14"
        aria-labelledby="home-layout-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <Badge variant="outline" className="mb-3">
              <LayoutGrid className="mr-1 h-3 w-3" aria-hidden />
              Farm layout
            </Badge>
            <h2
              id="home-layout-heading"
              className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Build A Ring Farm Layout by Stage
            </h2>
            <p className="text-pretty text-muted-foreground sm:text-lg">
              Ring placement and harvest timing matter as much as seed rarity. Use these goals for
              early, mid, and late game — then read the{" "}
              <TrackedLink
                href="/build-a-ring-farm"
                tracking={{ kind: "cta", source: "home-wiki-sections", label: "farm-guide" }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                farm efficiency guide
              </TrackedLink>{" "}
              for event sessions and reinvestment order.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
            {layoutPhases.map((phase) => (
              <Card key={phase.title} className="h-full border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{phase.title}</CardTitle>
                  <p className="text-sm font-medium text-primary">Goal: {phase.goal}</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                    {phase.bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mx-auto mt-6 max-w-3xl border-primary/10 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sprout className="h-4 w-4 text-primary" aria-hidden />
                Efficiency tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 sm:grid-cols-2">
                {efficiencyTips.map((tip) => (
                  <li key={tip} className="text-sm text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
