/** Plausible custom events via global `window.plausible` (Shipsolo snippet in root layout). */
export type PlausibleEventProps = Record<string, string | number | boolean>

export function trackPlausibleEvent(
  eventName: string,
  options?: { props?: PlausibleEventProps; interactive?: boolean }
) {
  if (typeof window === "undefined") return
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
