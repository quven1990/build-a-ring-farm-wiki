/**
 * Public gaming-media pages for scripts/sync-game-data.mjs.
 * No competitor wiki domains — same policy as codes sync.
 */
export const GAME_DATA_SOURCES = [
  {
    id: "pgg-seeds",
    name: "Pro Game Guides — Seeds Index",
    url: "https://progameguides.com/roblox/all-build-a-ring-farm-seeds/",
    kinds: ["seeds-structured"],
  },
  {
    id: "pgg-mutations",
    name: "Pro Game Guides — Mutations Guide",
    url: "https://progameguides.com/roblox/build-a-ring-farm-mutations-multipliers-how-to-get/",
    kinds: ["mutations-structured"],
  },
  {
    id: "gamerant-codes",
    name: "Game Rant — Codes",
    url: "https://gamerant.com/build-a-ring-farm-codes-roblox/",
    kinds: ["prose"],
  },
  {
    id: "beebom-codes",
    name: "Beebom — Codes",
    url: "https://beebom.com/build-a-ring-farm-codes/",
    kinds: ["prose"],
  },
  {
    id: "techtimes-codes",
    name: "Tech Times — Codes",
    url: "https://www.techtimes.com/articles/316716/20260516/roblox-build-ring-farm-codes-may-20226-expand-your-farm-grow-crops-reap-rewards.htm",
    kinds: ["prose"],
  },
]
