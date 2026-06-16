import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrackedLink } from "@/components/wiki/tracked-link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  effectiveMutationRate,
  eventsFaq,
  formatEventChance,
  formatRollChance,
  weatherEvents,
} from "@/lib/events-data"
import { formatMultiplier } from "@/lib/mutations-data"
import { pageMeta } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { ArrowRight, Coins, CloudRain } from "lucide-react"

function EventCard({
  event,
}: {
  event: (typeof weatherEvents)[number]
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary/50 to-secondary/40" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="text-4xl" role="img" aria-hidden>
            {event.emoji}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-bold tracking-tight text-foreground">
          {event.name}
        </h3>
        <p className="mb-4 text-xs font-medium text-muted-foreground">
          Mutation multiplier
        </p>
        <span className="mb-4 inline-flex w-fit rounded-xl bg-primary px-4 py-2 text-2xl font-bold tracking-tight text-primary-foreground">
          {formatMultiplier(event.multiplier)}
        </span>
        <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
          <span className="rounded-lg bg-muted/80 px-2.5 py-1 tabular-nums">
            {formatEventChance(event.eventChancePercent)} base
          </span>
          <span className="rounded-lg bg-muted/80 px-2.5 py-1 tabular-nums">
            {formatRollChance(event.rollChancePercent)} / roll
          </span>
        </div>
        <p className="mt-auto flex items-center gap-2 text-sm text-foreground">
          <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>
            Applies{" "}
            <span role="img" aria-hidden>
              {event.mutationEmoji}
            </span>{" "}
            <TrackedLink
              href="/mutations"
              tracking={{ kind: "cta", source: "events-guide", label: "mutation-link" }}
              className="font-semibold text-primary hover:underline"
            >
              {event.mutationName}
            </TrackedLink>{" "}
            <span className="text-muted-foreground">
              ({formatRollChance(event.rollChancePercent)} per roll)
            </span>
          </span>
        </p>
      </div>
    </article>
  )
}

function ExampleBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-border/80 bg-card shadow-sm">
      <CardContent className="space-y-3 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export function EventsGuide() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.12,transparent)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            <CloudRain className="h-4 w-4" />
            Weather Events
          </div>
          <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {pageMeta.events.h1}
          </h1>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            {pageMeta.events.heroDescription}
          </p>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-sm backdrop-blur-sm">
          <div className="wiki-table-scroll">
            <Table className="min-w-[36rem]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Event Chance</TableHead>
                  <TableHead className="text-right">Chance per Roll</TableHead>
                  <TableHead className="text-right">Multiplier</TableHead>
                  <TableHead>Mutation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weatherEvents.map((event) => (
                  <TableRow key={event.name}>
                    <TableCell className="font-medium">
                      <span className="mr-2" role="img" aria-hidden>
                        {event.emoji}
                      </span>
                      {event.name}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {formatEventChance(event.eventChancePercent)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {formatRollChance(event.rollChancePercent)}
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums text-primary">
                      {formatMultiplier(event.multiplier)}
                    </TableCell>
                    <TableCell>
                      <TrackedLink
                        href="/mutations"
                        tracking={{ kind: "cta", source: "events-guide", label: "mutation-table" }}
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        <span role="img" aria-hidden>
                          {event.mutationEmoji}
                        </span>
                        {event.mutationName}
                      </TrackedLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {weatherEvents.map((event) => (
            <EventCard key={event.name} event={event} />
          ))}
        </div>

        <div className="mx-auto mb-14 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How Events Work &amp; Rolls Per Event
          </h2>
          <p className="mb-8 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            When a weather event activates, each of your plants receives{" "}
            <strong className="font-semibold text-foreground">1 to 3 independent rolls</strong>{" "}
            to receive the event&apos;s linked mutation. Every roll is independent —
            one plant getting a mutation does not reduce the odds for any other
            plant.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <ExampleBlock title="🌧️ Rain Event Example: 2 Rolls">
              <p>
                When Rain activates (40% chance), each plant gets{" "}
                <strong className="text-foreground">2 independent rolls</strong> at 8%
                each to receive the Wet mutation (1.5x). For Plant A:
              </p>
              <p className="font-mono text-xs sm:text-sm">
                Roll 1: 8% chance → Wet or no mutation
                <br />
                Roll 2: 8% chance → Wet or no mutation
              </p>
              <p>
                Probability of at least one Wet on Plant A:{" "}
                <strong className="text-foreground">1 − (0.92)² = 15.36%</strong>
              </p>
            </ExampleBlock>
            <ExampleBlock title="🌑 Black Hole Event: 20 Plants × 3% Independent Chance">
              <p>
                When Black Hole activates (12% chance), all 20 plants each roll
                independently at 3% for the Void mutation (2.25x). Each plant&apos;s
                roll is completely separate:
              </p>
              <p className="font-mono text-xs sm:text-sm">
                Expected mutated plants: 20 × 3% = <strong>0.6 plants</strong>
                <br />
                P(at least 1 plant mutated): 1 − (0.97)²⁰ ={" "}
                <strong>45.6%</strong>
              </p>
              <p>
                Getting Void on Plant #3 does{" "}
                <em>not</em> change the 3% chance for Plants #1, #2, or #4–#20.
                Every roll is an independent coin flip.
              </p>
            </ExampleBlock>
          </div>
        </div>

        <div className="mx-auto mb-14 max-w-3xl space-y-10">
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
              Mutation Events: The Ultimate Free Income Boost
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Mutation Events are random weather occurrences that apply powerful
                multipliers to your crops — and they are the most important free
                income mechanic in Build A Ring Farm. Without spending currency on
                Gear Shop sprays, a well-timed event can multiply harvest value by
                1.5x to 5x or more. Understanding when events trigger, how per-roll
                mutation chances work, and when to prioritize harvesting during
                events is high-impact knowledge for maximizing farming profits.
              </p>
              <p>
                Events use a two-layer probability system. First, the event must
                activate — Rain 40%, Blizzard 20%, Black Hole 12%, Nuclear 7%, Galaxy
                4%. Once active, each plant receives independent rolls for the
                linked mutation. During Rain, each plant rolls at 8% for Wet; during
                Galaxy, each plant rolls at 1% for Rainbow. Effective per-plant
                rates combine both layers: Rain+Wet ≈{" "}
                {effectiveMutationRate(40, 8).toFixed(1)}%, Nuclear+Radioactive ≈{" "}
                {effectiveMutationRate(7, 2).toFixed(2)}%, Galaxy+Rainbow ≈{" "}
                {effectiveMutationRate(4, 1).toFixed(2)}%.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              Independent Roll Mechanics Explained
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              When an event triggers, every plant gets its own separate mutation
              roll — not a shared pool. If Plant A mutates, Plants B–Z still have
              their full independent chance. With 20 plants and 3% per roll (Black
              Hole), P(at least one Void) = 1 − (0.97)²⁰ = 45.6%, even though each
              plant only has 3%. More plants means more rolls and higher expected
              mutation income from every event.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              Event Priority and Harvest Timing
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Rain (40%, 1.5x) happens often with a modest boost. Nuclear (7%, 3x)
                is rarer but triples income. Galaxy (4%, 5x) is the rarest standard
                weather event and delivers the highest multiplier. Harvest during any
                active event — even 1.5x Wet beats no mutation — but save large
                harvest pushes for Nuclear and Galaxy when you can.
              </p>
              <p>
                Ring tier amplifies impact: Rainbow (5x) during Galaxy with the Outer
                Ring (19x) yields 95x before seed level adjustments. Use the{" "}
                <TrackedLink
                  href="/calculator"
                  tracking={{ kind: "cta", source: "events-guide", label: "calculator-inline" }}
                  className="font-medium text-primary hover:underline"
                >
                  profit calculator
                </TrackedLink>{" "}
                to simulate event + ring + seed combinations. Start from your crop
                table on the{" "}
                <TrackedLink
                  href="/seeds"
                  tracking={{ kind: "cta", source: "events-guide", label: "seeds-inline" }}
                  className="font-medium text-primary hover:underline"
                >
                  Seeds
                </TrackedLink>{" "}
                guide, then check{" "}
                <TrackedLink
                  href="/progression"
                  tracking={{ kind: "cta", source: "events-guide", label: "progression-inline" }}
                  className="font-medium text-primary hover:underline"
                >
                  Progression
                </TrackedLink>{" "}
                to see whether waiting fits your stage.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-10 max-w-3xl">
          <h2 className="mb-4 text-lg font-bold text-foreground">Event FAQ</h2>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border/80 bg-card px-2 shadow-sm"
          >
            {eventsFaq.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`events-faq-${index}`}
                className="border-border/60 px-2"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:text-primary sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
          )}
        >
          <p className="max-w-xl text-sm text-muted-foreground">
            Six mutations are sold in the Gear Shop; weather events apply Wet through
            Rainbow for free. Stack with rings and seed level for maximum harvest
            value.
          </p>
          <Button asChild variant="secondary" className="shrink-0 rounded-xl font-semibold">
            <TrackedLink
              href="/calculator"
              tracking={{ kind: "cta", source: "events-guide", label: "open-calculator" }}
            >
              <Coins className="mr-2 h-4 w-4" />
              Open calculator
            </TrackedLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
