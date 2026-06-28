"use client"

import { useEffect, useState } from "react"
import { LazyToaster } from "@/components/wiki/lazy-toaster"
import { ClientConsentScripts } from "@/components/wiki/client-consent-scripts"
import { GoogleAnalytics } from "@/components/wiki/google-analytics"
import { DeferredAnalytics } from "@/components/wiki/deferred-analytics"
import { RcrWrapperCleanup } from "@/components/wiki/rcr-wrapper-cleanup"
import { scheduleIdle } from "@/lib/schedule-idle"

/**
 * Mount consent shell + GA right after hydration so fast-bouncing visitors are
 * still counted; Plausible/Clarity/Ahrefs stay idle-deferred to protect CWV.
 */
export function DeferredClientShell() {
  const [phase, setPhase] = useState<"off" | "shell" | "analytics">("off")

  useEffect(() => {
    setPhase("shell")
    scheduleIdle(() => setPhase("analytics"), 3000)
  }, [])

  if (phase === "off") return null

  return (
    <>
      <RcrWrapperCleanup />
      <GoogleAnalytics />
      <LazyToaster />
      <ClientConsentScripts />
      {phase === "analytics" ? <DeferredAnalytics /> : null}
    </>
  )
}
