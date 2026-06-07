"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  calculateEarnings,
  formatCalculatorMoney,
  formatCalculatorMoneyFull,
  formatCalculatorTime,
  MAX_PLANTS,
  MAX_SEED_LEVEL,
  PLACEMENT_MULTIPLIERS,
  SLIDER_SYNC_MAX,
  type CashMultiplier,
  type RingPlacement,
} from "@/lib/calculator-engine"
import {
  calculatorMutationOptions,
  cashMultiplierOptions,
  ringOptions,
} from "@/lib/calculator-config"
import {
  formatBaseIncome,
  formatGrowTime,
  rarityConfig,
  rarityFilters,
  seeds,
  type RarityFilter,
  type Seed,
} from "@/lib/seeds-data"
import { pageMeta } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Calculator, ChevronDown, ChevronUp, Coins, Sparkles } from "lucide-react"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"

const calculatorSeeds = seeds.filter((s) => (s.baseIncome ?? 0) > 0)

const earningsHighlightClass =
  "font-mono font-bold tabular-nums text-primary transition-all duration-300"

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function LevelControl({
  label,
  value,
  onChange,
  min,
  max,
  sliderCap = SLIDER_SYNC_MAX,
  maxBadge,
  variant = "default",
  disabled,
  tickLabels,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  sliderCap?: number
  maxBadge?: string
  variant?: "default" | "saw" | "sprinkler" | "plant"
  disabled?: boolean
  tickLabels?: [string, string, string, string, string]
}) {
  const sliderValue = Math.min(value, sliderCap)
  const accent =
    variant === "saw"
      ? "text-amber-600 focus-visible:ring-amber-500/30 border-amber-500/40"
      : variant === "sprinkler"
        ? "text-blue-600 focus-visible:ring-blue-500/30 border-blue-500/40"
        : variant === "plant"
          ? "text-primary focus-visible:ring-primary/30 border-primary/40"
          : ""

  const commit = (raw: string, fallback: number) => {
    let v = parseInt(raw, 10)
    if (Number.isNaN(v) || raw === "") v = fallback
    onChange(clamp(v, min, max))
  }

  return (
    <div className={cn("space-y-2", disabled && "opacity-50 pointer-events-none")}>
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
        {maxBadge && (
          <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
            {maxBadge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full shrink-0 sm:w-[88px]">
          <Input
            type="number"
            min={min}
            max={max}
            value={value}
            disabled={disabled}
            onChange={(e) => commit(e.target.value, value)}
            onBlur={(e) => commit(e.target.value, sliderValue)}
            className={cn(
              "h-11 w-full text-center font-mono text-lg font-bold tabular-nums sm:w-[88px]",
              accent
            )}
          />
        </div>
        <Slider
          min={min}
          max={Math.min(max, sliderCap)}
          step={1}
          value={[sliderValue]}
          disabled={disabled}
          onValueChange={([v]) => onChange(v)}
          className={cn(
            "flex-1",
            variant === "saw" && "[&_[data-slot=slider-range]]:bg-amber-500 [&_[data-slot=slider-thumb]]:border-amber-500",
            variant === "sprinkler" &&
              "[&_[data-slot=slider-range]]:bg-blue-500 [&_[data-slot=slider-thumb]]:border-blue-500",
            variant === "plant" &&
              "[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary"
          )}
        />
      </div>
      {tickLabels && (
        <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
          {tickLabels.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function OptionTile({
  selected,
  onClick,
  disabled,
  children,
  className,
  selectedClassName,
}: {
  selected: boolean
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  selectedClassName?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/80 bg-muted/40 p-3 text-center transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        selected && "border-primary/50 bg-primary/10 shadow-sm ring-1 ring-primary/20",
        selectedClassName,
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
    </button>
  )
}

type CalculatorMobileDockProps = {
  visible: boolean
  perPlant: string
  totalEarnings: string
  onScrollToDetails: () => void
}

/** Mobile bottom dock — appears when earnings panel scrolls off screen. */
function CalculatorMobileDock({
  visible,
  perPlant,
  totalEarnings,
  onScrollToDetails,
}: CalculatorMobileDockProps) {
  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Live calculator results"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/25 bg-card/95 shadow-[0_-8px_32px_rgba(0,0,0,0.1)] backdrop-blur supports-[backdrop-filter]:bg-card/90 lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Total earnings
          </p>
          <p className={cn(earningsHighlightClass, "truncate text-xl leading-tight")}>
            {totalEarnings}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Per plant
          </p>
          <p className={cn(earningsHighlightClass, "text-base leading-tight")}>{perPlant}</p>
        </div>
        <button
          type="button"
          onClick={onScrollToDetails}
          className="inline-flex shrink-0 flex-col items-center gap-0.5 rounded-xl border border-border/80 bg-muted/60 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <ChevronUp className="h-4 w-4" aria-hidden />
          Details
        </button>
      </div>
    </div>
  )
}

type CalculationBreakdownTableProps = {
  result: NonNullable<ReturnType<typeof calculateEarnings>>
  ring: RingPlacement
  mutation: (typeof calculatorMutationOptions)[number]
  cashMultiplier: CashMultiplier
  plants: number
}

function CalculationBreakdownTable({
  result,
  ring,
  mutation,
  cashMultiplier,
  plants,
}: CalculationBreakdownTableProps) {
  return (
    <div className="wiki-table-scroll overflow-x-auto rounded-xl border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[8rem]">Factor</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="max-w-[14rem] sm:max-w-none">Seed value (current level)</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCalculatorMoneyFull(result.unitPriceAtLevel)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Level multiplier</TableCell>
            <TableCell className="text-right font-mono text-sm">
              x {result.levelMultiplier.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>After level</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCalculatorMoneyFull(result.unitPriceAtLevel)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cash multiplier (Robux)</TableCell>
            <TableCell className="text-right font-mono text-sm">
              x {cashMultiplier}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>After cash multi</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCalculatorMoneyFull(result.afterCash)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mutation multiplier</TableCell>
            <TableCell className="text-right font-mono text-sm">
              x {mutation.multiplier}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unit value (base x level x cash x mut)</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCalculatorMoneyFull(result.moneyPerUnit)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ring placement</TableCell>
            <TableCell className="text-right font-mono text-sm">
              x {PLACEMENT_MULTIPLIERS[ring]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Saw bonus (floor(saw * 2/3))</TableCell>
            <TableCell className="text-right font-mono text-sm">
              + {result.sawBonus}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Combined multiplier</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {result.combinedMultiplier.toFixed(1)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Per plant / harvest</TableCell>
            <TableCell className="text-right font-mono text-sm font-semibold text-primary">
              {formatCalculatorMoneyFull(result.perPlant)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Plants</TableCell>
            <TableCell className="text-right font-mono text-sm">{plants}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right font-mono text-sm font-semibold text-primary">
              {formatCalculatorMoneyFull(result.totalEarnings)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export function ProfitCalculator() {
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all")
  const [selectedSeedId, setSelectedSeedId] = useState(
    calculatorSeeds.find((s) => s.id === "carrot")?.id ?? calculatorSeeds[0]?.id ?? ""
  )
  const [level, setLevel] = useState(1)
  const [sawLevel, setSawLevel] = useState(1)
  const [sprinklerLevel, setSprinklerLevel] = useState(1)
  const [plants, setPlants] = useState(1)
  const [ring, setRing] = useState<RingPlacement>("inner")
  const [mutationKey, setMutationKey] = useState("none")
  const [cashMultiplier, setCashMultiplier] = useState<CashMultiplier>(1)

  const filteredSeeds = useMemo(() => {
    const list =
      rarityFilter === "all"
        ? calculatorSeeds
        : calculatorSeeds.filter((s) => s.rarity === rarityFilter)
    return [...list].sort((a, b) => a.name.localeCompare(b.name))
  }, [rarityFilter])

  const selectedSeed = useMemo(
    () => calculatorSeeds.find((s) => s.id === selectedSeedId),
    [selectedSeedId]
  )

  const mutation = useMemo(
    () =>
      calculatorMutationOptions.find((m) => m.key === mutationKey) ??
      calculatorMutationOptions[0],
    [mutationKey]
  )

  const levelTicks = useMemo((): [string, string, string, string, string] => {
    const max = MAX_SEED_LEVEL
    return ["1", String(Math.floor(max * 0.25)), String(Math.floor(max * 0.5)), String(Math.floor(max * 0.75)), String(max)]
  }, [])

  const selectSeed = useCallback((seed: Seed) => {
    setSelectedSeedId(seed.id)
    setLevel((prev) => clamp(prev, 1, MAX_SEED_LEVEL))
  }, [])

  const result = useMemo(() => {
    if (!selectedSeed?.baseIncome) return null
    return calculateEarnings({
      baseIncome: selectedSeed.baseIncome,
      seedId: selectedSeed.id,
      level,
      sawLevel,
      sprinklerLevel,
      growTimeSeconds: selectedSeed.growTimeSeconds ?? 5,
      ring,
      mutationMultiplier: mutation.multiplier,
      cashMultiplier,
      plants,
    })
  }, [
    selectedSeed,
    level,
    sawLevel,
    sprinklerLevel,
    ring,
    mutation.multiplier,
    cashMultiplier,
    plants,
  ])

  const ringLabel = ringOptions.find((r) => r.key === ring)?.label ?? ring

  const earningsPanelRef = useRef<HTMLDivElement>(null)
  const [mobileDockVisible, setMobileDockVisible] = useState(false)

  const scrollToEarnings = useCallback(() => {
    earningsPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  useEffect(() => {
    const panel = earningsPanelRef.current
    if (!panel) return

    const mq = window.matchMedia("(max-width: 1023px)")

    const syncDock = (isIntersecting: boolean) => {
      setMobileDockVisible(mq.matches && !isIntersecting)
    }

    const observer = new IntersectionObserver(
      ([entry]) => syncDock(entry.isIntersecting),
      { root: null, rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    )
    observer.observe(panel)

    const onMqChange = () => {
      if (!mq.matches) setMobileDockVisible(false)
    }
    mq.addEventListener("change", onMqChange)

    return () => {
      observer.disconnect()
      mq.removeEventListener("change", onMqChange)
    }
  }, [result, selectedSeedId])

  // Track calculator usage without spamming events on every slider tick.
  const lastTrackedKeyRef = useRef<string>("")
  const trackTimerRef = useRef<number | null>(null)
  useEffect(() => {
    if (!selectedSeed?.baseIncome || !result) return

    const key = JSON.stringify({
      seed: selectedSeed.id,
      level,
      sawLevel,
      sprinklerLevel,
      plants,
      ring,
      mutationKey,
      cashMultiplier,
    })
    if (key === lastTrackedKeyRef.current) return

    if (trackTimerRef.current) window.clearTimeout(trackTimerRef.current)
    trackTimerRef.current = window.setTimeout(() => {
      lastTrackedKeyRef.current = key
      trackPlausibleEvent(PLAUSIBLE_GOALS.calculatorRun, {
        interactive: true,
        props: {
          seed: selectedSeed.id,
          ring,
          mutation: mutationKey,
          plants,
          level,
        },
      })
    }, 600)

    return () => {
      if (trackTimerRef.current) window.clearTimeout(trackTimerRef.current)
    }
  }, [
    selectedSeed,
    result,
    level,
    sawLevel,
    sprinklerLevel,
    plants,
    ring,
    mutationKey,
    cashMultiplier,
  ])

  return (
    <section className="relative py-8 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/0.12,transparent)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            <Calculator className="h-4 w-4" />
            Profit Calculator
          </div>
          <h1 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {pageMeta.calculator.h1}
          </h1>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            {pageMeta.calculator.heroDescription}
          </p>
        </div>

        <div
          className={cn(
            "mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_min(26rem,42%)] lg:items-start lg:gap-8",
            mobileDockVisible && "pb-[5.5rem] lg:pb-0"
          )}
        >
          {/* Configuration — below earnings on mobile */}
          <div className="order-2 overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-sm backdrop-blur-sm lg:order-1">
            <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-secondary/60" />
            <div className="space-y-6 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                Configuration
              </h2>

              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Verified formula
                </p>
                <code className="block break-all rounded-lg bg-background/80 px-3 py-2 font-mono text-xs text-foreground sm:text-sm">
                  unitPrice * 1.25^(Level-1) * Cash * Mutation * Ring * (1 + SawBonus/7)
                </code>
                <p className="mt-2 text-xs text-muted-foreground">
                  Sprinkler = speed only · SawBonus = floor(Saw * 2/3) · Units = Ring * (1 +
                  SawBonus/7)
                </p>
              </div>

              <div>
                <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select seed
                </Label>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {rarityFilters.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRarityFilter(r)}
                      className={cn(
                        "rounded-lg border border-border/80 px-2.5 py-1 text-xs font-semibold capitalize transition-colors",
                        rarityFilter === r
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      )}
                    >
                      {r === "all" ? "All" : rarityConfig[r].label}
                    </button>
                  ))}
                </div>

                <div className="grid max-h-[280px] grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2 overflow-y-auto pr-1">
                  {filteredSeeds.map((seed) => (
                    <button
                      key={seed.id}
                      type="button"
                      onClick={() => selectSeed(seed)}
                      className={cn(
                        "flex flex-col items-center rounded-xl border border-border/80 bg-muted/30 p-3 transition-all duration-200",
                        "hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md",
                        "hover:[&_.seed-emoji]:scale-110",
                        selectedSeedId === seed.id &&
                          "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/25"
                      )}
                    >
                      <span
                        className="seed-emoji mb-1 block text-3xl transition-transform duration-200"
                        role="img"
                        aria-hidden
                      >
                        {seed.emoji}
                      </span>
                      <span className="text-center text-[11px] font-semibold leading-tight text-muted-foreground">
                        {seed.name}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedSeed && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-semibold capitalize",
                        rarityConfig[selectedSeed.rarity].color
                      )}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          selectedSeed.rarity === "common" && "bg-zinc-500",
                          selectedSeed.rarity === "uncommon" && "bg-green-600",
                          selectedSeed.rarity === "rare" && "bg-blue-600",
                          selectedSeed.rarity === "epic" && "bg-purple-600",
                          selectedSeed.rarity === "legendary" && "bg-yellow-600",
                          selectedSeed.rarity === "secret" && "bg-red-600",
                          selectedSeed.rarity === "prismatic" && "bg-pink-600",
                          selectedSeed.rarity === "divine" && "bg-amber-600",
                          selectedSeed.rarity === "exotic" && "bg-orange-600",
                          selectedSeed.rarity === "transcended" &&
                            "bg-gradient-to-r from-red-600 to-purple-600"
                        )}
                      />
                      {selectedSeed.rarity}
                    </span>
                    <span className="rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Base: {formatBaseIncome(selectedSeed.baseIncome)}
                    </span>
                    <span className="rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      Grow: {formatGrowTime(selectedSeed.growTimeSeconds)}
                    </span>
                  </div>
                )}
              </div>

              <LevelControl
                label="Seed level"
                value={level}
                onChange={setLevel}
                min={1}
                max={MAX_SEED_LEVEL}
                maxBadge={`MAX ${MAX_SEED_LEVEL}`}
                disabled={!selectedSeed}
                tickLabels={levelTicks}
              />

              <LevelControl
                label="Saw yield level"
                value={sawLevel}
                onChange={setSawLevel}
                min={1}
                max={9999}
                variant="saw"
                disabled={!selectedSeed}
              />

              <LevelControl
                label="Sprinkler level (speed only)"
                value={sprinklerLevel}
                onChange={setSprinklerLevel}
                min={1}
                max={9999}
                variant="sprinkler"
                disabled={!selectedSeed}
              />

              <div>
                <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Ring placement
                </Label>
                <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
                  {ringOptions.map((opt) => (
                    <OptionTile
                      key={opt.key}
                      selected={ring === opt.key}
                      onClick={() => setRing(opt.key)}
                      disabled={!selectedSeed}
                    >
                      <div className="text-2xl">{opt.emoji}</div>
                      <div className="mt-1 text-sm font-semibold">{opt.label}</div>
                      <div className="font-mono text-xs text-muted-foreground">{opt.multiplier}x</div>
                    </OptionTile>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Mutation
                </Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {calculatorMutationOptions.map((opt) => (
                    <OptionTile
                      key={opt.key}
                      selected={mutationKey === opt.key}
                      onClick={() => setMutationKey(opt.key)}
                      disabled={!selectedSeed}
                      selectedClassName="border-secondary/50 bg-secondary/15 ring-secondary/25"
                    >
                      <div className="text-xl">{opt.emoji}</div>
                      <div className="mt-0.5 text-xs font-semibold">{opt.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {opt.multiplier}x
                      </div>
                    </OptionTile>
                  ))}
                </div>
              </div>

              <LevelControl
                label="Number of plants"
                value={plants}
                onChange={setPlants}
                min={1}
                max={MAX_PLANTS}
                maxBadge={`MAX ${MAX_PLANTS}`}
                variant="plant"
                disabled={!selectedSeed}
              />

              <div>
                <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Cash multiplier
                </Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {cashMultiplierOptions.map((opt) => (
                    <OptionTile
                      key={opt.value}
                      selected={cashMultiplier === opt.value}
                      onClick={() => setCashMultiplier(opt.value as CashMultiplier)}
                      disabled={!selectedSeed}
                      selectedClassName="border-cyan-500/50 bg-cyan-500/10 ring-cyan-500/20"
                    >
                      <div className="text-lg">{opt.emoji}</div>
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{opt.value}x</div>
                    </OptionTile>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Earnings — first on mobile; sticky sidebar on desktop */}
          <div
            id="calculator-earnings"
            ref={earningsPanelRef}
            className="order-1 scroll-mt-20 rounded-2xl border border-border/80 bg-card/95 shadow-sm backdrop-blur-sm lg:order-2 lg:sticky lg:top-[4.5rem] lg:z-10 lg:max-h-[calc(100vh-5rem)] lg:self-start lg:overflow-y-auto"
          >
            <div className="h-1 bg-gradient-to-r from-primary via-secondary/80 to-chart-5/70" />
            <div className="space-y-5 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <Coins className="h-5 w-5 text-primary" aria-hidden />
                Earnings
              </h2>

              {!result || !selectedSeed ? (
                <p className="py-12 text-center text-muted-foreground">Select a seed to calculate</p>
              ) : (
                <>
                  <div className="space-y-4 border-b border-border/60 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Money per unit
                      </p>
                      <p className={cn(earningsHighlightClass, "text-2xl")}>
                        {formatCalculatorMoney(result.moneyPerUnit)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Seed</p>
                        <p className="font-semibold">{selectedSeed.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Level</p>
                        <p className="font-mono font-semibold tabular-nums">{level}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-border/60 pb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Per plant / harvest
                    </p>
                    <p className={cn(earningsHighlightClass, "text-3xl")}>
                      {formatCalculatorMoney(result.perPlant)}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                      <div>
                        <p className="text-muted-foreground">Placement</p>
                        <p className="font-medium">
                          {ringLabel} ({PLACEMENT_MULTIPLIERS[ring]}x)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Saw level</p>
                        <p className="font-mono font-medium tabular-nums">{sawLevel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Saw bonus</p>
                        <p className="font-mono font-medium tabular-nums">+{result.sawBonus}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mutation</p>
                        <p className="font-medium">
                          {mutation.name} ({mutation.multiplier}x)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cash multi</p>
                        <p className="font-medium">
                          {cashMultiplier === 1 ? "None (1x)" : `x${cashMultiplier}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 border-b border-border/60 pb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Total earnings
                    </p>
                    <p className={cn(earningsHighlightClass, "text-2xl sm:text-3xl md:text-4xl")}>
                      {formatCalculatorMoney(result.totalEarnings)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Plants</p>
                        <p className="font-mono font-semibold tabular-nums">{plants}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grow time</p>
                        <p className="font-medium">
                          {formatCalculatorTime(result.growTimeSeconds)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Effective time</p>
                        <p className="font-medium">
                          {formatCalculatorTime(result.effectiveGrowTimeSeconds)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <details className="group rounded-xl border border-border/60 lg:hidden">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-bold text-foreground [&::-webkit-details-marker]:hidden">
                        Calculation breakdown
                        <ChevronDown
                          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                          aria-hidden
                        />
                      </summary>
                      <div className="border-t border-border/60 p-3 pt-0">
                        <CalculationBreakdownTable
                          result={result}
                          ring={ring}
                          mutation={mutation}
                          cashMultiplier={cashMultiplier}
                          plants={plants}
                        />
                      </div>
                    </details>
                    <div className="hidden lg:block">
                      <p className="mb-3 text-sm font-bold text-foreground">Calculation breakdown</p>
                      <CalculationBreakdownTable
                        result={result}
                        ring={ring}
                        mutation={mutation}
                        cashMultiplier={cashMultiplier}
                        plants={plants}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {result && selectedSeed ? (
        <CalculatorMobileDock
          visible={mobileDockVisible}
          perPlant={formatCalculatorMoney(result.perPlant)}
          totalEarnings={formatCalculatorMoney(result.totalEarnings)}
          onScrollToDetails={scrollToEarnings}
        />
      ) : null}
    </section>
  )
}
