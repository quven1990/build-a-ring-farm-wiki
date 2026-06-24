"use client"

import { useLayoutEffect, useState } from "react"
import Script from "next/script"
import {
  COOKIE_CONSENT_COOKIE,
  isValidCookieConsentValue,
} from "@/lib/cookie-consent"

const GA_ID = "G-CLMPPNFBGN"

function hasRejectedConsent(): boolean {
  if (typeof document === "undefined") return false
  const match = document.cookie
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${COOKIE_CONSENT_COOKIE}=`))
  if (!match) return false
  const value = decodeURIComponent(match.split("=").slice(1).join("="))
  return isValidCookieConsentValue(value) && value === "rejected"
}

/**
 * Loads GA after idle defer (with Plausible/Clarity) — skipped when user chose Reject.
 */
export function GoogleAnalytics() {
  const [blocked, setBlocked] = useState(false)

  useLayoutEffect(() => {
    if (hasRejectedConsent()) setBlocked(true)
  }, [])

  if (blocked) return null

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
    </>
  )
}
