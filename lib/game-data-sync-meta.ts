import syncState from "./game-data-sync-state.json"

export const gameDataSyncMeta = {
  lastSyncedAt: syncState.lastSyncedAt,
  sourceCount: syncState.sources?.length ?? 0,
  okSourceCount: syncState.sourceResults?.filter((s: { ok: boolean }) => s.ok).length ?? 0,
} as const

export function formatGameDataSyncDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}
