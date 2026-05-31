/**
 * Public pages scanned by scripts/sync-codes.mjs — no login required.
 *
 * Tier notes (for humans; all sources count equally in consensus math):
 * - Tier A: major gaming media (PGG, Pocket Tactics, Radio Times, GamesRadar+, Destructoid, Beebom)
 * - Tier B: game-specific wikis (buildaringfarm.net, buildaringfarm.co, buildaringfarmgame.wiki)
 * - Tier C: codes aggregators (AllThings.how)
 *
 * Official Gamecreates Discord #game-codes is the true source but requires login — not scraped.
 */
export const CODE_SYNC_SOURCES = [
  // Tier A — major Roblox / gaming media
  {
    id: "progameguides",
    name: "Pro Game Guides",
    url: "https://progameguides.com/roblox/build-a-ring-farm-codes/",
  },
  {
    id: "pockettactics",
    name: "Pocket Tactics",
    url: "https://www.pockettactics.com/build-a-ring-farm-codes",
  },
  {
    id: "radiotimes",
    name: "Radio Times",
    url: "https://www.radiotimes.com/technology/gaming/roblox-build-a-ring-farm-codes/",
  },
  {
    id: "gamesradar",
    name: "GamesRadar+",
    url: "https://www.gamesradar.com/games/simulation/build-a-ring-farm-codes/",
  },
  {
    id: "destructoid",
    name: "Destructoid",
    url: "https://www.destructoid.com/build-a-ring-farm-codes/",
  },
  {
    id: "beebom",
    name: "Beebom",
    url: "https://beebom.com/build-a-ring-farm-codes/",
  },
  // Tier B — game-focused wikis / guides
  {
    id: "buildaringfarm-net",
    name: "buildaringfarm.net",
    url: "https://buildaringfarm.net/codes/",
  },
  {
    id: "buildaringfarm-co",
    name: "buildaringfarm.co",
    url: "https://buildaringfarm.co/codes/",
  },
  {
    id: "buildaringfarmgame-wiki",
    name: "buildaringfarmgame.wiki",
    url: "https://buildaringfarmgame.wiki/",
  },
  // Tier C — codes specialists
  {
    id: "allthings",
    name: "AllThings.how",
    url: "https://allthings.how/build-a-ring-farm-codes-latest-working-list/",
  },
]
