"use client"

import dynamic from "next/dynamic"
import { LazyOnView } from "@/components/wiki/lazy-on-view"
import type { AdsensePlacement } from "@/lib/adsense-config"
import { cn } from "@/lib/utils"

const AdsenseAd = dynamic(
  () => import("@/components/wiki/adsense-ad").then((m) => ({ default: m.AdsenseAd })),
  { ssr: false }
)

type LazyAdsenseAdProps = {
  placement: AdsensePlacement
  className?: string
}

const AD_SLOT_MIN_HEIGHT = 250

/** Defers ad script + slot until near viewport — protects LCP/FCP/INP. */
export function LazyAdsenseAd({ placement, className }: LazyAdsenseAdProps) {
  return (
    <LazyOnView
      minHeight={AD_SLOT_MIN_HEIGHT}
      fallback={
        <aside
          className={cn(
            "my-8 rounded-lg border border-border/60 bg-muted/20 px-3 py-4",
            className
          )}
          style={{ minHeight: AD_SLOT_MIN_HEIGHT }}
          aria-hidden
        />
      }
    >
      <AdsenseAd placement={placement} className={className} />
    </LazyOnView>
  )
}
