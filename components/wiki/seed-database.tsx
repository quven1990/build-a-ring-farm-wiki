"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
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
  formatBaseIncome,
  formatCompactNumber,
  formatGameDataSyncDate,
  formatGrowTime,
  formatRollChance,
  rarityConfig,
  rarityFilters,
  seeds,
  seedsDataMeta,
  resolveSeedConfidence,
  type RarityFilter,
  type Seed,
  type SortOption,
} from "@/lib/seeds-data"
import { DataConfidenceBadge, DataConfidenceLegend } from "@/components/wiki/data-confidence-badge"
import { LastUpdatedBadge } from "@/components/wiki/last-updated-badge"
import { pageMeta } from "@/lib/site-config"
import { Calculator, Search } from "lucide-react"

type SeedDatabaseProps = {
  showTitle?: boolean
}

function matchesSearch(seed: Seed, query: string) {
  if (!query) return true
  const haystack = `${seed.name} ${seed.id} ${seed.rarity} ${seed.source}`.toLowerCase()
  return haystack.includes(query)
}

function sortSeeds(list: Seed[], sort: SortOption): Seed[] {
  const copy = [...list]
  switch (sort) {
    case "rarest":
      return copy.sort((a, b) => {
        const rollA = a.rollWeight <= 0 ? Number.POSITIVE_INFINITY : a.rollWeight
        const rollB = b.rollWeight <= 0 ? Number.POSITIVE_INFINITY : b.rollWeight
        return rollA - rollB
      })
    case "highest-value":
      return copy.sort(
        (a, b) => (b.baseIncome ?? 0) - (a.baseIncome ?? 0)
      )
    case "fastest-growth":
      return copy.sort((a, b) => {
        const growA = a.growTimeSeconds ?? Number.POSITIVE_INFINITY
        const growB = b.growTimeSeconds ?? Number.POSITIVE_INFINITY
        return growA - growB
      })
    case "most-expensive":
      return copy.sort((a, b) => (b.seedCost ?? 0) - (a.seedCost ?? 0))
    default:
      return copy
  }
}

function SeedCard({ seed }: { seed: Seed }) {
  const config = rarityConfig[seed.rarity]
  const confidence = resolveSeedConfidence(seed)

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm ring-1 ring-black/[0.03] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md",
        "border-t-[3px]",
        config.borderClass
      )}
    >
      <div className="absolute right-3 top-3">
        <DataConfidenceBadge confidence={confidence} compact />
      </div>
      <span
        className="mb-3 block text-5xl leading-none drop-shadow-md"
        role="img"
        aria-hidden
      >
        {seed.emoji}
      </span>
      <h3 className="text-lg font-semibold text-foreground">{seed.name}</h3>
      <span
        className={cn(
          "mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium capitalize",
          config.color
        )}
      >
        {seed.rarity}
      </span>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-foreground">Base Income</dt>
          <dd className={cn("font-semibold tabular-nums", config.color)}>
            {formatBaseIncome(seed.baseIncome)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-foreground">Grow Time</dt>
          <dd className={cn("font-semibold tabular-nums", config.color)}>
            {formatGrowTime(seed.growTimeSeconds)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-foreground">Roll Chance</dt>
          <dd className={cn("font-semibold tabular-nums", config.color)}>
            {formatRollChance(seed.rollWeight)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-foreground">Seed Cost</dt>
          <dd className={cn("font-semibold tabular-nums", config.color)}>
            {formatCompactNumber(seed.seedCost)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-3 text-sm">
        <span className="text-muted-foreground">Source </span>
        <span className="font-medium text-foreground">{seed.source}</span>
        {seed.notes ? (
          <p className="mt-2 text-left text-xs text-muted-foreground">{seed.notes}</p>
        ) : null}
      </div>
    </article>
  )
}

export function SeedDatabase({ showTitle = true }: SeedDatabaseProps) {
  const [rarity, setRarity] = useState<RarityFilter>("all")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SortOption>("default")

  const filteredSeeds = useMemo(() => {
    const query = search.trim().toLowerCase()
    let list = seeds.filter((seed) => {
      const matchesRarity = rarity === "all" || seed.rarity === rarity
      return matchesRarity && matchesSearch(seed, query)
    })
    list = sortSeeds(list, sort)
    return list
  }, [rarity, search, sort])

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.1,transparent)]"
        aria-hidden
      />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {pageMeta.seeds.h1}
          </h1>
          <div className="mb-4 flex justify-center">
            <LastUpdatedBadge />
          </div>
          <p className="text-pretty text-muted-foreground sm:text-lg">
            {pageMeta.seeds.heroDescription}
          </p>
          <div className="mt-6">
            <DataConfidenceLegend
              lastReviewed={formatGameDataSyncDate(seedsDataMeta.lastSyncedAt)}
              summary={`${seeds.length} crops — weekly sync from ${seedsDataMeta.sourceCount} public gaming lists (never auto-verified).`}
            />
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search seeds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-xl border-border/80 bg-background pl-10"
              aria-label="Search seeds"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              {rarityFilters.map((filter) => {
                const isActive = rarity === filter
                const label =
                  filter === "all"
                    ? "All"
                    : rarityConfig[filter].label
                const tabClass =
                  filter === "all"
                    ? "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    : rarityConfig[filter].tabClass

                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isActive}
                    {...(isActive ? { "data-active": "true" as const } : {})}
                    onClick={() => setRarity(filter)}
                    className={cn(
                      "rounded-lg border border-border/80 bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      tabClass
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="h-10 w-full max-w-xs rounded-xl border-border/80 bg-background">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort by...</SelectItem>
                <SelectItem value="rarest">Rarest</SelectItem>
                <SelectItem value="highest-value">Highest Value</SelectItem>
                <SelectItem value="fastest-growth">Fastest Growth</SelectItem>
                <SelectItem value="most-expensive">Most Expensive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Showing {filteredSeeds.length} of {seeds.length} seeds
          </p>
        </div>

        {filteredSeeds.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredSeeds.map((seed) => (
              <SeedCard key={seed.id} seed={seed} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            No seeds found matching your search.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-sm text-muted-foreground">
            Picked a seed? Run the profit calculator with your ring tier, mutation, and plant count to see exact harvest earnings before you reorganize plots.
          </p>
          <Button asChild variant="secondary" className="shrink-0 rounded-xl font-semibold">
            <Link href="/calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Open calculator
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
