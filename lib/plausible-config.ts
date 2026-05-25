export function isPlausibleEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PLAUSIBLE_DISABLED !== "true"
}
