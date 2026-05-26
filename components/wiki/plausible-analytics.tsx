"use client"

import { useEffect } from "react"
import { getPlausibleInitConfig } from "@/lib/plausible-config"

/**
 * Plausible Analytics (@plausible-analytics/tracker).
 * Dynamic import avoids SSR "location is not defined" from the tracker bundle.
 */
export function PlausibleAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return
    const config = getPlausibleInitConfig()
    if (!config) return

    void import("@plausible-analytics/tracker").then(({ init }) => {
      try {
        init(config)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("can only be called once")
        ) {
          return
        }
        throw error
      }
    })
  }, [enabled])

  return null
}
