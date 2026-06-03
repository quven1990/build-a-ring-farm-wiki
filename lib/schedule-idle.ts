/** Run work after the browser is idle — keeps click handlers off the INP critical path. */
export function scheduleIdle(task: () => void, timeoutMs = 2000): void {
  if (typeof window === "undefined") return
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => task(), { timeout: timeoutMs })
    return
  }
  globalThis.setTimeout(task, 1)
}
