"use client"

import Script from "next/script"
import { ADSENSE_CLIENT_ID, isAdsenseSlotConfigured } from "@/lib/adsense-config"

/** AdSense only — GA is loaded separately on page open via GoogleAnalytics. */
export function ThirdPartyScripts({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  const adsenseEnabled =
    isAdsenseSlotConfigured("home") || isAdsenseSlotConfigured("article")
  if (!adsenseEnabled) return null

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}
