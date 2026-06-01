"use client"

import Script from "next/script"
import { ADSENSE_CLIENT_ID, isAdsenseSlotConfigured } from "@/lib/adsense-config"

const GA_ID = "G-CLMPPNFBGN"

/** Loaded after hydration — avoids head script SSR/client mismatch. */
export function ThirdPartyScripts({ enabled }: { enabled: boolean }) {
  if (!enabled) return null
  const adsenseEnabled =
    isAdsenseSlotConfigured("home") || isAdsenseSlotConfigured("article")
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      {adsenseEnabled && (
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
    </>
  )
}
