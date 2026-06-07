"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  formatChance,
  formatMultiplier,
  formatMutationPrice,
  formatGameDataSyncDate,
  gameDataSyncMeta,
  getMutationTier,
  mutationSummary,
  mutationTierStyles,
  wikiMutations,
  type MutationSortOption,
  type WikiMutation,
} from "@/lib/mutations-data"
import { pageMeta } from "@/lib/site-config"
import { DataConfidenceBadge, DataConfidenceLegend } from "@/components/wiki/data-confidence-badge"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { CloudRain, Coins, ShoppingBag, Sparkles, Zap } from "lucide-react"

type MutationMatrixProps = {
  showTitle?: boolean
  afterIntro?: React.ReactNode
}

function sortMutations(list: WikiMutation[], sort: MutationSortOption): WikiMutation[] {
  const copy = [...list]
  if (sort === "chance-asc") {
    return copy.sort((a, b) => a.chancePercent - b.chancePercent)
  }
  return copy.sort((a, b) => b.multiplier - a.multiplier)
}

function StatCell({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="rounded-xl bg-background/80 px-3 py-2.5 text-center ring-1 ring-border/60">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 break-words text-sm font-semibold leading-tight tabular-nums",
          highlight ? "text-secondary-foreground" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  )
}

function MutationCard({ mutation, rank }: { mutation: WikiMutation; rank: number }) {
  const tier = getMutationTier(mutation.multiplier)
  const styles = mutationTierStyles[tier]
  const chanceLabel = mutation.chanceIsEstimate
    ? `≈${formatChance(mutation.chancePercent)}`
    : formatChance(mutation.chancePercent)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <div className="absolute right-3 top-3 z-10">
        <DataConfidenceBadge confidence={mutation.confidence} compact />
      </div>
      <div className={cn("h-1.5 w-full bg-gradient-to-r", styles.bar)} />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ring-1",
              styles.emojiBg
            )}
          >
            <span role="img" aria-hidden>
              {mutation.emoji}
            </span>
          </div>
          <span className="rounded-lg bg-muted/80 px-2 py-1 text-xs font-bold tabular-nums text-muted-foreground">
            #{rank}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground">{mutation.name}</h3>
          {mutation.eventOnly && (
            <span className="inline-flex items-center rounded-full bg-secondary/25 px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground ring-1 ring-secondary/30">
              Event Only
            </span>
          )}
        </div>

        <div className="mb-5">
          <span
            className={cn(
              "inline-flex items-center rounded-xl px-4 py-2 text-2xl font-bold tracking-tight",
              styles.multiplierPill
            )}
          >
            {formatMultiplier(mutation.multiplier)}
          </span>
          <p className="mt-2 text-xs font-medium text-muted-foreground">Harvest multiplier</p>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 min-[400px]:grid-cols-3">
          <StatCell
            label="Chance"
            value={chanceLabel}
          />
          <StatCell label="Trigger" value={mutation.trigger} />
          <StatCell
            label="Price"
            value={formatMutationPrice(mutation)}
            highlight={mutation.eventOnly}
          />
        </div>
      </div>
    </article>
  )
}

export function MutationMatrix({ showTitle = true, afterIntro }: MutationMatrixProps) {
  const [sort, setSort] = useState<MutationSortOption>("multiplier-desc")
  const [eventOnly, setEventOnly] = useState(false)

  const filteredMutations = useMemo(() => {
    const list = wikiMutations.filter(
      (mutation) => !eventOnly || mutation.eventOnly
    )
    return sortMutations(list, sort)
  }, [sort, eventOnly])

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.12,transparent)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        {showTitle && (
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              Mutation Matrix
            </div>
            <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {pageMeta.mutations.h1}
            </h1>
            <div className="mb-4 flex justify-center">
              <LastUpdatedBadge />
            </div>
            <p className="text-pretty text-base text-muted-foreground sm:text-lg">
              {pageMeta.mutations.heroDescription} Browse all {mutationSummary.total}{" "}
              mutations ranked by multiplier and event rarity.{" "}
              <Link href="/calculator" className="text-primary underline-offset-4 hover:underline">
                Test harvest value in the calculator
              </Link>{" "}
              before buying shop sprays.
            </p>
            {afterIntro}
            <div className="mt-6 text-left">
              <DataConfidenceLegend
                lastReviewed={formatGameDataSyncDate(gameDataSyncMeta.lastSyncedAt)}
                summary={`Multipliers & shop prices — weekly sync from ${gameDataSyncMeta.okSourceCount} public lists. Event chance % are estimates.`}
              />
            </div>
          </div>
        )}

        <div className="mb-8 grid grid-cols-3 gap-3 sm:mx-auto sm:max-w-xl">
          {[
            { label: "Total", value: mutationSummary.total, icon: Zap },
            { label: "Shop", value: mutationSummary.purchasable, icon: ShoppingBag },
            { label: "Events", value: mutationSummary.eventOnly, icon: CloudRain },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-2xl border border-border/80 bg-card/90 px-3 py-4 text-center shadow-sm backdrop-blur-sm"
            >
              <item.icon className="mb-2 h-4 w-4 text-primary" />
              <span className="text-2xl font-bold tabular-nums text-foreground">{item.value}</span>
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <Select value={sort} onValueChange={(v) => setSort(v as MutationSortOption)}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border/80 bg-background sm:w-[240px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiplier-desc">Multiplier (highest)</SelectItem>
                <SelectItem value="chance-asc">Event chance (rarest)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant={eventOnly ? "default" : "outline"}
              className={cn(
                "h-11 rounded-xl border-border/80",
                eventOnly && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => setEventOnly((v) => !v)}
            >
              Event only
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">
            Showing {filteredMutations.length} of {mutationSummary.total} mutations
            {eventOnly ? " · shop purchases hidden" : ""}
          </p>
        </div>

        {filteredMutations.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMutations.map((mutation, index) => (
              <MutationCard key={mutation.name} mutation={mutation} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="text-muted-foreground">No mutations match your filters.</p>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-sm text-muted-foreground">
            Six mutations are sold in the Gear Shop; Alien, Farm, and Honeycomb are event-only.
            Stack multipliers with rings and seed level for maximum harvest value.
          </p>
          <Button asChild variant="secondary" className="shrink-0 rounded-xl font-semibold">
            <Link href="/calculator">
              <Coins className="mr-2 h-4 w-4" />
              Open calculator
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
