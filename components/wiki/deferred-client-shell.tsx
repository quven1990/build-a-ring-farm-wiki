"use client"

import { useEffect, useState } from "react"
import { LazyToaster } from "@/components/wiki/lazy-toaster"
import { ClientConsentScripts } from "@/components/wiki/client-consent-scripts"
import { GoogleAnalytics } from "@/components/wiki/google-analytics"
import { DeferredAnalytics } from "@/components/wiki/deferred-analytics"
import { scheduleIdle } from "@/lib/schedule-idle"

/** Mount shell (GA + consent) right after hydration; Plausible/Clarity stay idle-deferred. */
export function DeferredClientShell() {
  const [phase, setPhase] = useState<"off" | "shell" | "analytics">("off")

  useEffect(() => {
    setPhase("shell")
    scheduleIdle(() => setPhase("analytics"), 3000)
  }, [])

  if (phase === "off") return null

  return (
    <>
      <GoogleAnalytics />
      <LazyToaster />
      <ClientConsentScripts />
      {phase === "analytics" ? <DeferredAnalytics /> : null}
    </>
  )
}
