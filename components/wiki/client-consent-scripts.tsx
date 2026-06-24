"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { ThirdPartyScripts } from "@/components/wiki/third-party-scripts"
import { cn } from "@/lib/utils"
import {
  COOKIE_CONSENT_COOKIE,
  isValidCookieConsentValue,
  type CookieConsentValue,
} from "@/lib/cookie-consent"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"
import { scheduleIdle } from "@/lib/schedule-idle"

function readConsentCookie(): CookieConsentValue | null {
  if (typeof document === "undefined") return null
  const match = document.cookie
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${COOKIE_CONSENT_COOKIE}=`))

  if (!match) return null
  const value = decodeURIComponent(match.split("=").slice(1).join("="))
  return isValidCookieConsentValue(value) ? value : null
}

export function ClientConsentScripts() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const [ready, setReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const bannerViewTracked = useRef(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setConsent(readConsentCookie())
    setReady(true)
  }, [])

  const enabled = consent === "accepted"
  const showBanner = ready && consent === null

  useEffect(() => {
    if (!showBanner || bannerViewTracked.current) return
    bannerViewTracked.current = true
    scheduleIdle(() => {
      trackPlausibleEvent(PLAUSIBLE_GOALS.cookieBannerView, { interactive: false })
    })
  }, [showBanner])

  useEffect(() => {
    const body = document.body
    const root = document.documentElement

    if (!showBanner) {
      body.style.removeProperty("padding-bottom")
      body.removeAttribute("data-cookie-banner")
      root.style.removeProperty("--cookie-banner-height")
      return
    }

    body.setAttribute("data-cookie-banner", "open")
    const banner = bannerRef.current
    if (!banner) return

    const syncPadding = () => {
      const height = `${banner.offsetHeight}px`
      body.style.paddingBottom = height
      root.style.setProperty("--cookie-banner-height", height)
    }

    syncPadding()
    const observer = new ResizeObserver(syncPadding)
    observer.observe(banner)

    return () => {
      observer.disconnect()
      body.style.removeProperty("padding-bottom")
      body.removeAttribute("data-cookie-banner")
      root.style.removeProperty("--cookie-banner-height")
    }
  }, [showBanner])

  const handleConsent = useCallback(async (value: CookieConsentValue) => {
    if (submitting) return
    setSubmitting(true)
    scheduleIdle(() => {
      trackPlausibleEvent(
        value === "accepted"
          ? PLAUSIBLE_GOALS.cookieConsentAccept
          : PLAUSIBLE_GOALS.cookieConsentReject,
        { props: { choice: value }, interactive: true }
      )
    })
    try {
      await fetch(`/api/cookie-consent?value=${value}`, {
        credentials: "same-origin",
        redirect: "manual",
      })
      setConsent(value)
    } catch {
      setConsent(value)
    } finally {
      setSubmitting(false)
    }
  }, [submitting])

  return (
    <>
      {enabled ? <ThirdPartyScripts enabled /> : null}

      {showBanner ? (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-40 bg-black/10"
            aria-hidden
          />
          <div
            ref={bannerRef}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 border-t border-primary/25 bg-background pb-[max(0px,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.12)]"
            )}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
          >
            <div className="container mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
              <div className="min-w-0 space-y-1.5">
                <p
                  id="cookie-consent-title"
                  className="text-base font-semibold text-foreground sm:text-sm"
                >
                  Tap Accept or Reject to dismiss this notice and keep browsing
                </p>
                <p id="cookie-consent-desc" className="text-sm text-muted-foreground">
                  We use cookies for analytics and ads. See our{" "}
                  <Link
                    href="/cookie-policy"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex w-full shrink-0 gap-2 sm:w-auto sm:gap-3">
                <button
                  type="button"
                  disabled={submitting}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-border bg-background px-4 text-base font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-60 sm:h-10 sm:min-w-[9.5rem] sm:flex-none sm:text-sm"
                  onClick={() => handleConsent("rejected")}
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60 sm:h-10 sm:min-w-[9.5rem] sm:flex-none sm:text-sm"
                  onClick={() => handleConsent("accepted")}
                >
                  <Cookie className="h-4 w-4" aria-hidden />
                  Accept
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
