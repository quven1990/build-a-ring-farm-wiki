"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ThirdPartyScripts } from "@/components/wiki/third-party-scripts"
import { cn } from "@/lib/utils"
import { COOKIE_CONSENT_COOKIE, type CookieConsentValue } from "@/lib/cookie-consent"
import { PLAUSIBLE_GOALS, trackPlausibleEvent } from "@/lib/plausible-events"

function readConsentCookie(): CookieConsentValue | null {
  if (typeof document === "undefined") return null
  const match = document.cookie
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${COOKIE_CONSENT_COOKIE}=`))

  if (!match) return null
  const value = decodeURIComponent(match.split("=").slice(1).join("="))
  return value === "accepted" || value === "rejected" ? value : null
}

export function ClientConsentScripts() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const bannerViewTracked = useRef(false)

  useEffect(() => {
    setConsent(readConsentCookie())
  }, [])

  const enabled = consent === "accepted"
  const showBanner = useMemo(() => consent === null, [consent])

  useEffect(() => {
    if (!showBanner || bannerViewTracked.current) return
    bannerViewTracked.current = true
    trackPlausibleEvent(PLAUSIBLE_GOALS.cookieBannerView, { interactive: false })
  }, [showBanner])

  const handleConsent = useCallback(async (value: CookieConsentValue) => {
    if (submitting) return
    setSubmitting(true)
    trackPlausibleEvent(
      value === "accepted"
        ? PLAUSIBLE_GOALS.cookieConsentAccept
        : PLAUSIBLE_GOALS.cookieConsentReject,
      { props: { choice: value }, interactive: true }
    )
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
      <ThirdPartyScripts enabled={enabled} />

      {showBanner && (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          )}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="container mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-muted-foreground">
              We use cookies and similar technologies for analytics and advertising. You can manage
              preferences in our{" "}
              <Link
                href="/cookie-policy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:justify-end">
              <button
                type="button"
                disabled={submitting}
                className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                onClick={() => handleConsent("rejected")}
              >
                Reject
              </button>
              <button
                type="button"
                disabled={submitting}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                onClick={() => handleConsent("accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
