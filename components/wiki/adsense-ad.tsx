"use client"

import { useEffect, useRef } from "react"
import { ADSENSE_CLIENT_ID, getAdsenseSlot, type AdsensePlacement } from "@/lib/adsense-config"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

type AdsenseAdProps = {
  placement: AdsensePlacement
  className?: string
}

/**
 * Responsive display ad unit. Set NEXT_PUBLIC_ADSENSE_SLOT_* in env after creating units in AdSense.
 */
export function AdsenseAd({ placement, className }: AdsenseAdProps) {
  const slot = getAdsenseSlot(placement)
  const pushed = useRef(false)

  useEffect(() => {
    if (!slot || pushed.current) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // Script may not be loaded yet on first paint
    }
  }, [slot])

  if (!slot) return null

  return (
    <aside
      className={cn(
        "my-8 rounded-lg border border-border/60 bg-muted/20 px-3 py-4",
        className
      )}
      aria-label="Advertisement"
    >
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Advertisement
      </p>
      <ins
        className="adsbygoogle block min-h-[90px] w-full text-center"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
