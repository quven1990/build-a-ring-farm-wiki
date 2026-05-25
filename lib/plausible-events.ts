type PlausibleProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: PlausibleProps }
    ) => void
  }
}

/** Fire a custom Plausible event (client-only; requires head snippet). */
export function trackPlausibleEvent(
  eventName: string,
  options?: { props?: PlausibleProps }
) {
  if (typeof window === "undefined") return
  window.plausible?.(eventName, options)
}
