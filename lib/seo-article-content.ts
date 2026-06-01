export type SeoPageKey =
  | "home"
  | "seeds"
  | "mutations"
  | "events"
  | "rings"
  | "calculator"
  | "codes"
  | "progression"
  | "faq"

export type SeoBlock =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }

export const seoArticles: Record<SeoPageKey, SeoBlock[]> = {
  home: [
    {
      type: "h2",
      id: "toolkit-sections",
      text: "What Each Section on buildaring.online Does",
    },
    {
      type: "p",
      text: "Use the [wiki index](/build-a-ring-wiki) when you are unsure where to click. Databases: [seeds](/seeds), [mutations](/mutations), [events](/events), [rings](/rings). Tools: [active codes](/codes), [profit calculator](/calculator). Written guides: [beginner](/build-a-ring-guide), [farm efficiency](/build-a-ring-farm), [codes help](/build-a-ring-codes), [tier list framework](/build-a-ring-tier-list), [best rings](/build-a-ring-best-rings), [FAQ hub](/build-a-ring-faq), and [update log](/build-a-ring-update-log). Each URL has unique metadata and intros — we avoid copying the same “what is the game” block on every page.",
    },
    {
      type: "h2",
      id: "verified-data",
      text: "Verified Tools vs Community Tables",
    },
    {
      type: "p",
      text: "The calculator follows a documented community formula with listed exceptions. Codes use verified, community-reported, and needs-testing labels. Seed and mutation tables aggregate player reports — check in-game before irreversible purchases, especially transcended-tier crops and rare event mutations.",
    },
    {
      type: "h2",
      id: "recommended-paths",
      text: "Recommended Paths by Player Type",
    },
    {
      type: "p",
      text: "Daily players: start at [codes](/codes) and [events](/events). Optimizers: [profit calculator](/calculator), [mutations list](/mutations), and [farm guide](/build-a-ring-farm). New accounts: [beginner guide](/build-a-ring-guide) then [progression](/progression). This home page stays a navigation hub; deep mechanics live on dedicated routes to keep duplicate content low.",
    },
    {
      type: "h2",
      id: "staying-updated",
      text: "Updates and Patch Days",
    },
    {
      type: "p",
      text: "After Roblox patches, read the [update log](/build-a-ring-update-log), refresh codes, then spot-check mutations. We are an unofficial fan toolkit — not affiliated with Roblox or the game developers.",
    },
  ],
  seeds: [
    {
      type: "h2",
      id: "seed-database-overview",
      text: "Complete Build A Ring Farm Seeds Database",
    },
    {
      type: "p",
      text: "Seeds are the foundation of every Build A Ring Farm economy. Each crop has a rarity tier, base income per unit at level one, grow time in seconds, roll weight from the gacha-style rolling system, and sometimes a seed shop cost. Understanding those four numbers tells you whether a plant belongs on your Inner ring for fast turnover or on the Outer ring for a single massive harvest. This page lists every documented seed in the game so you can filter by rarity, sort by income or growth speed, and pick targets that match your current cash and patience.",
    },
    {
      type: "h2",
      id: "rarity-tiers",
      text: "Understanding Rarity Tiers in Build A Ring Farm",
    },
    {
      type: "p",
      text: "Build A Ring Farm uses ten rarity bands from Common through Transcended. Common and Uncommon seeds fund the first hours of play with short grow times and predictable income. Rare and Epic crops introduce higher unit prices and slightly longer waits, making ring placement more important. Legendary and Secret seeds are where most mid-game players park their best plots. Prismatic, Divine, Exotic, and Transcended tiers push base income into another league entirely — but roll weights shrink, so you may play for days before seeing one in the roller. When comparing seeds, always weigh income per second (base income divided by grow time) against how often you can realistically harvest during active play.",
    },
    {
      type: "h3",
      text: "Roll Weights and Farming Strategy",
    },
    {
      type: "p",
      text: "Roll weight determines how often a seed appears when you use the rolling mechanic. Lower weight means rarer pulls. A common mistake in Build A Ring Farm is chasing a transcended seed before your farm can fill Outer ring slots with strong epic-tier plants — you earn less total cash during the grind than if you stabilized a full plot of solid rares first. Use the sort tools on this page to find the fastest-growing crops when you need quick cash, or the highest base income when you are optimizing for mutation procs during long weather events.",
    },
    {
      type: "h2",
      id: "pairing-seeds-with-rings",
      text: "Pairing Seeds With Rings and Mutations",
    },
    {
      type: "p",
      text: "After you choose seeds, pair them with Build A Ring Farm ring multipliers and mutation plans. Fast common crops rarely belong on the Outer 19x ring unless you are testing; secret-tier plants with long grow times should almost always sit on Outer with your best saw level and a mutation spray or event buff active. Cross-reference the mutations page for multipliers and the calculator to simulate level 50 or level 100 unit prices before you move a expensive plant off Inner. The goal is not to own the rarest seed icon — it is to maximize total harvest value per real-world minute you play.",
    },
  ],
  mutations: [
    {
      type: "h2",
      id: "mutation-system",
      text: "How Mutations Work in Build A Ring Farm",
    },
    {
      type: "p",
      text: "Mutations multiply the sell value of harvested crops. In Build A Ring Farm you can obtain them from Gear Shop sprays — Wet through Rainbow at listed prices — or from weather events that roll free procs such as Frozen, Void, Radioactive, and Rainbow during Galaxy. Event-only mutations including Alien, Farm, and Honeycomb never appear in the shop; they require specific world events or rare rolls. Each mutation displays a harvest multiplier, a trigger source, and sometimes a per-roll percentage. Stacking mutation value with the correct ring and seed level is how late-game players turn a normal harvest into a balance-shifting payout.",
    },
    {
      type: "h2",
      id: "shop-vs-event",
      text: "Gear Shop Mutations vs Event-Only Buffs",
    },
    {
      type: "p",
      text: "Purchasable mutations in Build A Ring Farm range from Wet at 1.5x up to Rainbow at 5x with billion-trillion level pricing on the top sprays. They are reliable: you pay once, apply the logic of the shop, and harvest on your schedule. Event mutations are unpredictable but free aside from the opportunity cost of waiting. Rain and Wet appear often; Galaxy and Rainbow are rare but powerful. Honeycomb at 6.5x sits at the top of the table with a tiny event proc rate, making it a trophy buff more than a planning baseline. Mark event-only rows in our matrix so you do not save currency for a spray that cannot be bought.",
    },
    {
      type: "h3",
      text: "Choosing the Right Mutation for Your Stage",
    },
    {
      type: "p",
      text: "Early Build A Ring Farm players should not bankrupt themselves for Rainbow. Wet and Frozen boosts appear frequently enough to learn the timing rhythm. Mid-game players pick one or two shop mutations that match their main seed tier and upgrade saw level so the ring multiplier amplifies a larger base unit price. Endgame players chase event windows — Nuclear, Galaxy, and rare Honeycomb procs — while running Outer ring layouts filled with secret or exotic seeds. Use the calculator on this site to compare 3x Radioactive versus 5x Rainbow on your actual planted crops before you wait an extra hour for perfect weather.",
    },
    {
      type: "h2",
      id: "mutation-matrix",
      text: "Using the Mutation Matrix on This Page",
    },
    {
      type: "p",
      text: "The interactive matrix above sorts Build A Ring Farm mutations by multiplier or event rarity, filters event-only entries, and links to weather details on the events page. When a new patch drops, compare shop prices and proc rates here first, then validate in-game with a single test harvest. Mutations are the highest-leverage free mechanic in the game — mastering them separates players who plateau at epic-tier income from players who break into transcended farming loops within a week of focused play.",
    },
  ],
  events: [
    {
      type: "h2",
      id: "weather-events",
      text: "Weather Events in Build A Ring Farm Explained",
    },
    {
      type: "p",
      text: "Weather events are timed world states that give each planted crop independent rolls for a linked mutation. Build A Ring Farm runs a two-layer system: first the event must activate (for example Rain at forty percent base chance), then each plant receives one to three rolls at the listed per-roll rate (Rain applies Wet at eight percent per roll). Those layers multiply into an effective proc chance that is much lower for Galaxy and Rainbow than for Rain and Wet. Events cost no Robux directly, which makes them the best return on time for players who can log in when the sky changes.",
    },
    {
      type: "h2",
      id: "event-priority",
      text: "Which Build A Ring Farm Events Matter Most",
    },
    {
      type: "p",
      text: "Rain is the workhorse: it fires often and applies Wet at 1.5x, ideal for learning harvest timing. Blizzard adds Frozen at 1.75x with a twenty percent activation rate. Black Hole and Void at 2.25x reward players who keep every plot full because each plant rolls separately. Nuclear at 3x and Galaxy at 5x are the premium windows — log in, clear other tasks, and harvest everything that procs. The table and cards on this page list exact percentages; use them to decide whether a long-growing exotic seed is worth holding one more cycle for Galaxy instead of cashing out during Rain.",
    },
    {
      type: "h3",
      text: "Independent Rolls and Large Farms",
    },
    {
      type: "p",
      text: "Independent rolls mean one plant hitting Void does not reduce odds for neighboring plants. With twenty plots at three percent per roll during Black Hole, the chance of at least one success is roughly forty-six percent even though each individual plot is unlikely to proc. That is why veteran Build A Ring Farm players fill every slot before a rare event: more rolls equals more expected mutations per event cycle. Pair this mechanic with Outer ring placement and a healthy saw level so successful procs pay on the highest multipliers.",
    },
    {
      type: "h2",
      id: "harvest-timing",
      text: "Harvest Timing During Build A Ring Farm Events",
    },
    {
      type: "p",
      text: "Always harvest during an active event if crops are ready — even Wet beats none. For slow crops, plan planting schedules backward from average event frequency so peak maturity overlaps Nuclear or Galaxy when possible. Sprinklers only affect grow speed, not mutation odds, so they help you line up more harvests per session without changing event math. Read the progression and calculator pages next to turn event luck into predictable income targets instead of occasional spikes.",
    },
  ],
  rings: [
    {
      type: "h2",
      id: "ring-layout",
      text: "Build A Ring Farm Ring Layout Basics",
    },
    {
      type: "p",
      text: "Rings are concentric planting zones with fixed harvest multipliers. Build A Ring Farm uses Inner at 7x, Middle at 13x, and Outer at 19x before saw bonuses apply. The saw adds extra effective units through floor(saw level × 2/3) divided into the combined multiplier, so ring choice and saw upgrades scale together. New players often spread random seeds across rings; optimized players treat Inner as a cash-flow lane for quick crops and Outer as a vault for slow, high unit-price plants.",
    },
    {
      type: "h2",
      id: "placement-strategy",
      text: "Placement Strategy for Maximum Profit",
    },
    {
      type: "p",
      text: "Place common and uncommon seeds on Inner when you need frequent harvests to fund rolls and shop purchases. Move epic and legendary crops to Middle once grow times exceed a few minutes. Reserve Outer for secret, exotic, and transcended seeds where base income per unit is high enough to justify long waits. When you unlock a better seed, swap the weakest plant on the highest ring tier first — upgrading Outer income moves the needle more than replacing a common on Inner. Build A Ring Farm rewards patience on the outside of the circle and activity on the inside.",
    },
    {
      type: "h3",
      text: "Saw Level Synergy With Rings",
    },
    {
      type: "p",
      text: "Saw yield level increases the effective multiplier on every ring simultaneously. That means late-game investment into saw upgrades benefits all three zones, but only if those zones hold worthwhile crops. Do not max saw while Inner still runs low-tier plants — fix seed quality first, then amplify with saw. The calculator page models ring and saw together; run your planned layout there before spending hours growing the wrong crop on Outer.",
    },
    {
      type: "h2",
      id: "common-mistakes",
      text: "Common Ring Mistakes in Build A Ring Farm",
    },
    {
      type: "p",
      text: "The most expensive mistake is parking a fast-turnover carrot on Outer because it was your first pull. The second is ignoring Middle entirely — 13x is a strong multiplier for legendary-tier plants that are not quite endgame. The third is harvesting during events without considering which ring holds ready crops; prioritize Outer and Middle procs before Inner unless you need instant cash. Review mutations and events pages whenever you reorganize plots so multipliers stack on the right ring at the right time.",
    },
  ],
  calculator: [
    {
      type: "h2",
      id: "calculator-overview",
      text: "Build A Ring Farm Calculator — Verified Formula",
    },
    {
      type: "p",
      text: "This Build A Ring Farm calculator implements the community-verified earnings formula: unit price scales with seed level at 1.25^(level−1) for most crops, then multiplies cash boosts, mutation multipliers, ring placement, and saw bonus units. Sprinkler level only changes grow speed in-game; it does not enter the payout math shown here. Use the tool to compare Inner versus Outer on the same seed, test whether Radioactive beats waiting for Galaxy, or estimate total session income across up to sixty plants.",
    },
    {
      type: "h2",
      id: "inputs-explained",
      text: "Understanding Each Calculator Input",
    },
    {
      type: "p",
      text: "Select any seed from the full database with rarity filters. Seed level raises unit price exponentially — small gains at low levels, massive gains at level 100. Saw yield level adds floor(saw × 2/3) bonus units on top of ring multipliers. Pick Inner, Middle, or Outer ring placement. Choose a mutation from None through Honeycomb. Set plant count up to sixty for total farm output. Cash multiplier covers Robux boosts from 1x through 12x. Together these fields mirror what you can control in a real Build A Ring Farm session except weather RNG.",
    },
    {
      type: "h3",
      text: "When to Trust the Breakdown Table",
    },
    {
      type: "p",
      text: "The breakdown table shows each multiplication step — after level, after cash, after mutation, ring factor, saw bonus, per-plant total, and farm total. If your in-game harvest differs, check for unmodeled bonuses, offline caps, or recent patches. Carrot uses a 1.1 growth curve instead of 1.25 in the data; the calculator respects that exception. Re-run scenarios whenever you unlock a new mutation spray or move a seed to Outer.",
    },
    {
      type: "h2",
      id: "planning-upgrades",
      text: "Planning Upgrades With the Calculator",
    },
    {
      type: "p",
      text: "Before buying an expensive Rainbow spray or a transcended seed, model three setups: current layout, best realistic mutation, and dream event proc. If the dream setup only adds ten percent over a shop mutation you already own, wait for Galaxy instead of overspending. Build A Ring Farm progression is optimization under uncertainty — this calculator removes guesswork from the parts you can control so you spend currency on upgrades with the highest expected return.",
    },
  ],
  codes: [
    {
      type: "h2",
      id: "redeem-codes",
      text: "Build A Ring Farm Codes and How to Redeem",
    },
    {
      type: "p",
      text: "Redeem codes distribute free sprays, seed packs, fertilizers, and time skips in Build A Ring Farm. This page is the live copy list with weekly sync status — for redemption steps and label meanings, use the [codes redemption guide](/build-a-ring-codes). Tap Active on any card to copy, then paste in-game before the offer ends.",
    },
    {
      type: "h2",
      id: "code-status",
      text: "Verified vs Community-Reported Codes",
    },
    {
      type: "p",
      text: "We label each Build A Ring Farm code as verified, community reported, or needs testing. Verified entries worked for multiple players recently. Community reported codes likely work but may vary by region or patch. Needs testing means the reward is plausible but unconfirmed — try them early in a session before you grind upgrades. Never share account passwords for fake code sites; legitimate Roblox experiences only need the public string inside the official game UI.",
    },
    {
      type: "h3",
      text: "Maximizing Rewards From Free Codes",
    },
    {
      type: "p",
      text: "Use code rewards to skip slow early progression. Sprays and packs accelerate mutation testing; time skips help you align harvests with weather events. After redeeming, read the mutations page to apply new items correctly and the seeds page if you receive unfamiliar crops. Codes will not replace solid ring placement, but they compress hours of grinding into minutes when timed around an active Galaxy or Nuclear window.",
    },
    {
      type: "h2",
      id: "stay-current",
      text: "Keeping Your Build A Ring Farm Codes List Current",
    },
    {
      type: "p",
      text: "Bookmark this page and check after every announced update or social milestone. When a code fails, report it so we can mark it expired. Pair fresh codes with the progression guide to know which reward helps your current stage — a tropical pack matters more to mid-game players than to someone still filling Inner plots with commons. Free resources are the fastest bridge between beginner and competitive Build A Ring Farm income.",
    },
  ],
  progression: [
    {
      type: "h2",
      id: "early-game",
      text: "Early Game Build A Ring Farm Progression",
    },
    {
      type: "p",
      text: "Your first goal in Build A Ring Farm is constant planting on every unlocked plot. Common seeds with short grow times fund the initial roller and basic upgrades. Keep Inner filled, reinvest every harvest into more slots or better seeds, and redeem any active codes for sprays or packs. Do not chase transcended crops yet — stability beats lottery pulls. Learn to harvest during Rain for Wet procs so you feel how mutations change payout before you invest millions in shop sprays.",
    },
    {
      type: "h2",
      id: "mid-game",
      text: "Mid Game: Rings, Rares, and Calculator Planning",
    },
    {
      type: "p",
      text: "Mid-game Build A Ring Farm revolves around epic and legendary seeds, Middle ring usage, and your first purposeful mutation purchases. Unlock saw levels steadily because they amplify every ring. Use the calculator to compare rolling budget versus expected income from a fixed legendary on Outer. Start tracking weather events and hold one long-growing crop for Galaxy or Nuclear when possible. Replace weakest plants tier by tier instead of reorganizing the entire farm daily.",
    },
    {
      type: "h3",
      text: "Offline Earnings and Session Rhythm",
    },
    {
      type: "p",
      text: "Build A Ring Farm advertises offline progress; treat offline income as a bonus, not your primary strategy. Active sessions during events still outperform passive accumulation because you choose when to harvest mutated crops. Log in for short bursts to plant, log in for event windows to harvest, and use sprinklers to shrink downtime between those bursts. The progression curve smooths once Outer holds one or two strong secret-tier plants feeding your roller budget.",
    },
    {
      type: "h2",
      id: "late-game",
      text: "Late Game Optimization in Build A Ring Farm",
    },
    {
      type: "p",
      text: "Late-game players optimize event timing, Honeycomb and Rainbow procs, max saw level, and full Outer plots of exotic or transcended seeds. Every harvest should consider mutation status, ring tier, and whether reinvesting cash into the next seed tier beats waiting for a perfect event. Cross-link the [seeds](/seeds), [mutations](/mutations), [events](/events), [rings](/rings), and [calculator](/calculator) pages whenever you change layout — Build A Ring Farm endgame is a spreadsheet disguised as a cozy farm sim, and that depth is why the community keeps playing.",
    },
  ],
  faq: [
    {
      type: "h2",
      id: "quick-faq-purpose",
      text: "Quick FAQ vs FAQ Hub",
    },
    {
      type: "p",
      text: "This page uses a short accordion for fast answers. For longer troubleshooting and policy notes, open the [FAQ hub](/build-a-ring-faq). Mechanics deep dives live on [mutations](/mutations), [rings](/rings), and [events](/events) — not duplicated here.",
    },
    {
      type: "h2",
      id: "when-to-use-wiki",
      text: "When to Leave FAQ for Other Pages",
    },
    {
      type: "p",
      text: "Code strings change often — use [active codes](/codes) and the [codes guide](/build-a-ring-codes). Harvest math questions belong on the [calculator](/calculator). Crop comparisons belong in the [seeds database](/seeds). This structure keeps duplicate content low across buildaring.online.",
    },
  ],
}
