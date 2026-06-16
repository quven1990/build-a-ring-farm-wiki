/** Plausible custom events via global `window.plausible` (Shipsolo snippet in root layout). */
export type PlausibleEventProps = Record<string, string | number | boolean>

export type PlayOnRobloxLocation = "header-compact" | "header" | "mobile-menu" | "hero"
export type CodeCopySource = "hero" | "home-preview" | "codes"
export type NavLocation = "header" | "mobile-menu"

/** Register matching names as Goals in Plausible → Site settings → Goals → Add custom event. */
export const PLAUSIBLE_GOALS = {
  codeCopy: "Code Copy",
  calculatorRun: "Calculator Run",
  calculatorInteraction: "Calculator Interaction",
  playOnRoblox: "Play on Roblox",
  ctaClick: "CTA Click",
  navClick: "Nav Click",
  relatedGuideClick: "Related Guide Click",
  databaseFilter: "Database Filter",
  /** First-time banner render (no consent cookie yet). */
  cookieBannerView: "Cookie Banner View",
  cookieConsentAccept: "Cookie Consent Accept",
  cookieConsentReject: "Cookie Consent Reject",
  pageShare: "Page Share",
} as const

export function trackCodeCopy(code: string, source: CodeCopySource) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.codeCopy, {
    props: { code, source },
    interactive: true,
  })
}

export function trackPlayOnRoblox(location: PlayOnRobloxLocation) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.playOnRoblox, {
    props: { location },
    interactive: true,
  })
}

export function trackCtaClick(source: string, destination: string, label?: string) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.ctaClick, {
    props: {
      source,
      destination,
      ...(label ? { label } : {}),
    },
    interactive: true,
  })
}

export function trackNavClick(location: NavLocation, destination: string) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.navClick, {
    props: { location, destination },
    interactive: true,
  })
}

export function trackRelatedGuideClick(fromPage: string, toHref: string) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.relatedGuideClick, {
    props: { fromPage, toHref },
    interactive: true,
  })
}

export function trackDatabaseFilter(
  page: string,
  filter: string,
  value: string | number | boolean
) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.databaseFilter, {
    props: { page, filter, value: String(value) },
    interactive: true,
  })
}

export function trackCalculatorInteraction(action: string) {
  trackPlausibleEvent(PLAUSIBLE_GOALS.calculatorInteraction, {
    props: { action },
    interactive: true,
  })
}

export function trackPlausibleEvent(
  eventName: string,
  options?: { props?: PlausibleEventProps; interactive?: boolean }
) {
  if (typeof window === "undefined") return

  const run = () => {
    const plausible = (
      window as unknown as {
        plausible?: (
          name: string,
          opts?: { props?: PlausibleEventProps; interactive?: boolean }
        ) => void
      }
    ).plausible
    if (typeof plausible !== "function") return

    const interactive = options?.interactive
    const props = options?.props
    if (props === undefined && interactive === undefined) {
      plausible(eventName)
      return
    }
    plausible(eventName, {
      ...(props ? { props } : {}),
      ...(typeof interactive === "boolean" ? { interactive } : {}),
    })
  }

  if (options?.interactive) {
    const schedule =
      typeof requestIdleCallback === "function"
        ? (cb: () => void) => requestIdleCallback(cb, { timeout: 2000 })
        : (cb: () => void) => setTimeout(cb, 1)
    schedule(run)
    return
  }

  run()
}
