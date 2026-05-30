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
 * Ad markup is mounted imperatively so Google-injected iframes are never reconciled by React.
 */
export function AdsenseAd({ placement, className }: AdsenseAdProps) {
  const slot = getAdsenseSlot(placement)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!slot || !container) return

    const ins = document.createElement("ins")
    ins.className = "adsbygoogle block min-h-[90px] w-full text-center"
    ins.style.display = "block"
    ins.setAttribute("data-ad-client", ADSENSE_CLIENT_ID)
    ins.setAttribute("data-ad-slot", slot)
    ins.setAttribute("data-ad-format", "auto")
    ins.setAttribute("data-full-width-responsive", "true")
    container.appendChild(ins)

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Script may not be loaded yet on first paint
    }

    return () => {
      container.replaceChildren()
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
      <div ref={containerRef} className="min-h-[90px] w-full text-center" />
    </aside>
  )
}
