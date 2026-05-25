import type { CustomProperties } from "@plausible-analytics/tracker"

/** Fire a custom Plausible event (client-only). */
export function trackPlausibleEvent(
  eventName: string,
  options?: { props?: CustomProperties; interactive?: boolean }
) {
  if (typeof window === "undefined") return

  void import("@plausible-analytics/tracker").then(({ track }) => {
    track(eventName, options ?? {})
  })
}
