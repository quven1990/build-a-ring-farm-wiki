"use client"

import { useEffect, useState } from "react"
import { LazyToaster } from "@/components/wiki/lazy-toaster"
import { ClientConsentScripts } from "@/components/wiki/client-consent-scripts"
import { GoogleAnalytics } from "@/components/wiki/google-analytics"
import { DeferredAnalytics } from "@/components/wiki/deferred-analytics"
import { RcrWrapperCleanup } from "@/components/wiki/rcr-wrapper-cleanup"
import { scheduleIdle } from "@/lib/schedule-idle"

/** Mount consent shell after hydration; GA + Plausible/Clarity load after 3s idle. */
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
      <LazyToaster />
      <ClientConsentScripts />
      {phase === "analytics" ? (
        <>
          <GoogleAnalytics />
          <DeferredAnalytics />
        </>
      ) : null}
    </>
  )
}
