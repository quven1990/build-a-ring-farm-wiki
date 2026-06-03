"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { HeroLcpFallback } from "@/components/wiki/hero-lcp-fallback"
import { scheduleIdle } from "@/lib/schedule-idle"

const HeroCarousel = dynamic(
  () => import("@/components/wiki/hero-carousel").then((m) => ({ default: m.HeroCarousel })),
  { ssr: false }
)

/** Loads Embla carousel after idle so LCP stays on the static hero image. */
export function HeroCarouselDeferred() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    scheduleIdle(() => setReady(true), 2500)
  }, [])

  return ready ? <HeroCarousel /> : <HeroLcpFallback />
}
