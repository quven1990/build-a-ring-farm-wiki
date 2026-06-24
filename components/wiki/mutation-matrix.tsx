"use client"

import { useMemo, useState } from "react"
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
import { TrackedLink } from "@/components/wiki/tracked-link"
import { trackDatabaseFilter } from "@/lib/plausible-events"
import { Coins } from "lucide-react"

type MutationMatrixProps = {
  showTitle?: boolean
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
  className,
}: {
  label: string
  value: string
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-muted/40 px-3 py-2.5 ring-1 ring-border/50 sm:rounded-xl sm:bg-background/80 sm:ring-border/60",
        className
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-sm font-semibold leading-snug break-words",
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:border-primary/25 hover:shadow-md sm:hover:-translate-y-0.5">
      <div className={cn("h-1.5 w-full shrink-0 bg-gradient-to-r", styles.bar)} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ring-1 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl",
              styles.emojiBg
            )}
          >
            <span role="img" aria-hidden>
              {mutation.emoji}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="min-w-0 text-base font-bold leading-tight tracking-tight text-foreground sm:text-lg">
                {mutation.name}
              </h3>
              <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-bold tabular-nums text-muted-foreground">
                #{rank}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center rounded-lg px-2.5 py-1 text-base font-bold tracking-tight sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-xl",
                  styles.multiplierPill
                )}
              >
                {formatMultiplier(mutation.multiplier)}
              </span>
              {mutation.eventOnly ? (
                <span className="inline-flex items-center rounded-full bg-secondary/25 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground ring-1 ring-secondary/30 sm:text-[11px]">
                  Event only
                </span>
              ) : null}
              <DataConfidenceBadge confidence={mutation.confidence} compact />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-3">
          <StatCell label="Chance" value={chanceLabel} />
          <StatCell
            label="Price"
            value={formatMutationPrice(mutation)}
            highlight={mutation.eventOnly}
          />
          <StatCell
            label="Trigger"
            value={mutation.trigger}
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </div>
    </article>
  )
}

export function MutationMatrix({ showTitle = true }: MutationMatrixProps) {
  const [sort, setSort] = useState<MutationSortOption>("multiplier-desc")
  const [eventOnly, setEventOnly] = useState(false)

  const filteredMutations = useMemo(() => {
    const list = wikiMutations.filter(
      (mutation) => !eventOnly || mutation.eventOnly
    )
    return sortMutations(list, sort)
  }, [sort, eventOnly])

  return (
    <section className="notranslate relative overflow-hidden py-6 sm:py-10" translate="no">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.12,transparent)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        {showTitle && (
          <div className="mx-auto mb-5 max-w-2xl text-center sm:mb-6">
            <h1 className="mb-2 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {pageMeta.mutations.h1}
            </h1>
            <div className="mb-3 flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:flex-wrap sm:gap-2">
              <LastUpdatedBadge />
              <span className="text-xs text-muted-foreground sm:text-sm">
                {mutationSummary.total} mutations · {mutationSummary.purchasable} shop ·{" "}
                {mutationSummary.eventOnly} event-only
              </span>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {pageMeta.mutations.heroDescription}
            </p>
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v as MutationSortOption)
                trackDatabaseFilter("mutations", "sort", v)
              }}
            >
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
              onClick={() => {
                setEventOnly((v) => {
                  trackDatabaseFilter("mutations", "event-only", !v)
                  return !v
                })
              }}
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

        <div className="mt-6">
          <DataConfidenceLegend
            lastReviewed={formatGameDataSyncDate(gameDataSyncMeta.lastSyncedAt)}
            summary={`Multipliers & shop prices — weekly sync from ${gameDataSyncMeta.okSourceCount} public lists. Event chance % are estimates.`}
          />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-sm text-muted-foreground">
            Six mutations are sold in the Gear Shop; Alien, Farm, and Honeycomb are event-only.
            Stack multipliers with rings and seed level for maximum harvest value.
          </p>
          <Button asChild variant="secondary" className="shrink-0 rounded-xl font-semibold">
            <TrackedLink
              href="/calculator"
              tracking={{ kind: "cta", source: "mutations-matrix", label: "open-calculator" }}
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
