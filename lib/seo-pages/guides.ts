import type { GuidePageConfig } from "@/lib/seo-pages/types"

export const guidePages: Record<GuidePageConfig["id"], GuidePageConfig> = {
  "build-a-ring-farm": {
    id: "build-a-ring-farm",
    path: "/build-a-ring-farm",
    metaKey: "build-a-ring-farm",
    schema: "Article",
    toolCta: {
      href: "/seeds",
      label: "Open Seeds Database",
      description: "Compare income, grow time, and roll weights for every crop.",
    },
    whatYouCanDo: [
      "Plan harvest rhythm around weather events instead of random logins",
      "Decide which crops belong on Inner vs Outer ring slots",
      "Run the Big Lion two-crop focus loop after recent community-reported metas",
      "Farm Plant Rush for event currency and Cosmic Spray when you have coin budget",
      "Track when to reinvest roller budget vs stabilize current plots",
      "Cross-link mutations and events before holding crops an extra cycle",
    ],
    blocks: [
      {
        type: "h2",
        id: "farm-efficiency-focus",
        text: "Build A Ring Farm Efficiency — Beyond the Basics",
      },
      {
        type: "p",
        text: "This guide is for players who already know how to plant and harvest. The goal is farm efficiency: more cash per active minute, fewer wasted grows, and smarter use of ring slots. We do not repeat a full game tutorial here — use the beginner guide for first steps, then return when you want to optimize loops, event timing, and reinvestment order. Numbers on this site are community-sourced; confirm edge cases in-game after patches.",
      },
      {
        type: "h2",
        id: "session-rhythm",
        text: "Design a Session Rhythm That Matches Events",
      },
      {
        type: "p",
        text: "Efficient Build A Ring Farm sessions stack three layers: fill every plot, align mature crops with weather, harvest procs on the highest ring first. Rain and Wet are practice windows; Galaxy and Nuclear are payout windows. Keep a short list of which plots are ready before you log in so you do not harvest Inner commons while Outer exotics sit mutated. The events page lists trigger rates — use it as a planning sheet, not background reading.",
      },
      {
        type: "h3",
        text: "Income Per Minute vs Jackpot Harvests",
      },
      {
        type: "p",
        text: "Fast crops on Inner fund the roller and shop. Slow crops on Outer fund breakthroughs when mutations land. Mid-game players often over-index on jackpot pulls and under-index on steady epic income. Divide base income by grow time in the seeds database to compare crops at your play style — active players favor shorter grows, passive players can hold longer Outer timers if events are scheduled.",
      },
      {
        type: "h2",
        id: "resource-reinvestment",
        text: "Reinvestment Order for Sustainable Growth",
      },
      {
        type: "p",
        text: "Reinvest in this order unless the calculator shows a clear exception: fill all plots, upgrade weakest seed on the highest ring tier, raise saw level when Outer and Middle already hold strong crops, then budget mutation sprays. Chasing transcended seeds before Outer is stable usually slows total income. Codes and free packs compress early grind — redeem first, then apply rewards using the progression guide stage that matches your farm.",
      },
      {
        type: "h2",
        id: "offline-and-active",
        text: "Offline Progress vs Active Event Play",
      },
      {
        type: "p",
        text: "Treat offline earnings as supplemental. Active harvests during events still dominate because you choose when mutated crops pay out. Sprinklers shorten grow time but do not change mutation odds — use them to line up more harvests per week, not to replace logging in for Galaxy. This page is designed to help you organize sessions; the game may cap or adjust offline rules without notice.",
      },
      {
        type: "h2",
        id: "big-lion-two-crop",
        text: "Big Lion Two-Crop Focus (Post-Update Community Meta)",
      },
      {
        type: "p",
        text: "After recent updates, many players report that a full farm of mixed crops is no longer the fastest coin path for everyone. An alternative meta centers on the Big Lion pet (Epic rarity): its ability applies a super fertilizer to a random crop about every five minutes. Community guides suggest clearing every plot except your two strongest plants so those buffs cannot land on weak crops. You then level only those two plants and let repeated super fertilizer stacks drive income.",
      },
      {
        type: "h3",
        text: "Why Players Use This Instead of a Full Farm",
      },
      {
        type: "p",
        text: "Big Lion’s cash multiplier is lower than some legendary pets, but targeted super fertilizer can outperform spreading buffs across dozens of low-tier plants. Reports mention roughly six times effective value on the focused pair versus diluting the same procs across the whole field — treat that multiplier as community-sourced until you confirm in your own session. The pet is considered accessible: normal egg rolls, no Robux requirement, often obtainable within a few hours of play according to player reports.",
      },
      {
        type: "h3",
        text: "How This Fits Ring and Reinvestment Advice",
      },
      {
        type: "p",
        text: "This loop is a deliberate exception to “fill every plot” early advice. Use the seeds database to pick your two highest base-income crops for your stage, place them on your best available ring tiers, and pause roller spending on filler commons until the pair is stable. Once income spikes, return to the reinvestment order above for rings, saw, and mutation sprays. If you are already leaderboard-competitive, the focus loop may still help; if you prefer variety or collection goals, keep a standard multi-plot layout instead.",
      },
      {
        type: "h2",
        id: "plant-rush-cosmic-spray",
        text: "Plant Rush Events and Cosmic Spray",
      },
      {
        type: "p",
        text: "Plant Rush is a limited combat-style event separate from weather on the events reference page. Community reports say it is currently the main source of new event currency and the most practical way to obtain Cosmic Spray. The Plant Rush shop shows a timer above the UI so you can plan when the next run starts. Cosmic Spray purchases are reported around twenty-five thousand coins — budget a grind session before you commit.",
      },
      {
        type: "h3",
        text: "Farming Event Coins Efficiently",
      },
      {
        type: "p",
        text: "Join or create a low-population server when you only care about coin yield, not social play. Players report roughly one thousand to fifteen hundred coins per event with one or two people in the instance, though your gear and boss clear speed still matter. Pair Plant Rush sessions with the Big Lion loop: use event coins for sprays and upgrades while your two main crops absorb offline-style fertilizer ticks between runs. Redeem active codes first if any grant fertilizers or coin boosts that shorten the grind.",
      },
      {
        type: "h2",
        id: "full-farm-vs-focus",
        text: "When to Stay on a Full Farm vs Switch to Two Crops",
      },
      {
        type: "p",
        text: "Stay on a full farm if you are still unlocking plots and rings, learning weather timing, or enjoy rolling many seed types. Switch toward the Big Lion two-crop setup when Epic pets are realistic for you, your top two plants are clearly ahead of everything else in the seeds table, and you are willing to remove decorative or low-income plants. Re-evaluate after every patch — developers can change pet abilities, spray pricing, or event rewards without notice.",
      },
      {
        type: "h2",
        id: "pair-with-tools",
        text: "Pair This Guide With On-Site Tools",
      },
      {
        type: "p",
        text: "Open the profit calculator before moving a secret-tier plant to Outer or before deleting plots for the two-crop focus. Scan the mutation matrix when you debate shop sprays vs waiting for weather — Cosmic Spray may appear there once confirmed. Bookmark active codes for sprays that accelerate testing. The wiki index lists every database in one place. Together these tools turn vague advice into checklists you can run every session.",
      },
    ],
  },
  "build-a-ring-guide": {
    id: "build-a-ring-guide",
    path: "/build-a-ring-guide",
    metaKey: "build-a-ring-guide",
    schema: "HowTo",
    whatYouCanDo: [
      "Follow a first-session checklist from plant to first reinvest",
      "Learn which pages to read in order without information overload",
      "Avoid common beginner mistakes on rings and codes",
      "Jump to tools when you need data instead of guessing",
    ],
    howToSteps: [
      { name: "Plant every unlocked plot", text: "Use common seeds with short grow times on available slots. Empty plots earn nothing." },
      { name: "Redeem active codes", text: "Open the codes tool, copy a verified string, paste in-game via Settings → Codes." },
      { name: "Harvest during Rain when possible", text: "Practice event timing so you see how Wet changes payout." },
      { name: "Read the seeds database", text: "Pick your next crop using income and grow time columns, not emoji alone." },
      { name: "Plan rings before rare pulls", text: "Read the best rings guide once you have multiple plot tiers unlocked." },
    ],
    blocks: [
      {
        type: "h2",
        id: "who-this-guide-is-for",
        text: "Build A Ring Beginner Guide — First Hours on Roblox",
      },
      {
        type: "p",
        text: "Welcome if you just opened Build A Ring Farm and want a clear order of operations. This page is only for new players: what to click first, which wiki pages matter on day one, and what to ignore until later. Veterans should open the farm efficiency guide or calculator guide instead — you will not find advanced mutation math here.",
      },
      {
        type: "h2",
        id: "first-session-checklist",
        text: "First Session Checklist",
      },
      {
        type: "p",
        text: "Start on Roblox, plant every slot, redeem any active code from our codes list, complete one harvest cycle, then bank cash for the seed roller or shop. Do not spend hours reorganizing rings before you own more than a handful of plots. Do not trust random websites asking for passwords — only the public code string inside the official game UI is required.",
      },
      {
        type: "h2",
        id: "what-to-read-next",
        text: "What to Read After Your First Harvest",
      },
      {
        type: "p",
        text: "Day two: seeds database for crop comparison. Day three: rings guide for Inner, Middle, Outer basics. Day four: mutations overview when you unlock sprays or see weather change. Keep the FAQ hub open for one-off questions. Use the calculator once you hold a crop worth leveling — guessing harvest value at level 50 wastes currency.",
      },
      {
        type: "h3",
        text: "Mistakes That Slow New Players",
      },
      {
        type: "p",
        text: "Parking fast carrots on Outer, ignoring events while crops are ready, and copying expired codes from old videos are the top three time sinks. Mark codes that fail and try the next active entry. Check the update log when a patch drops — balance changes can shift which commons are best without warning.",
      },
      {
        type: "h2",
        id: "play-on-roblox",
        text: "Play the Game, Use the Site as a Side Panel",
      },
      {
        type: "p",
        text: "buildaring.online is a companion toolkit, not a replacement for playing. Run the game in one window and keep this site in another for codes and tables. Community data can lag patches — if a harvest looks wrong, trust a single in-game test over any table row.",
      },
    ],
  },
  "build-a-ring-codes": {
    id: "build-a-ring-codes",
    path: "/build-a-ring-codes",
    metaKey: "build-a-ring-codes",
    schema: "HowTo",
    toolCta: {
      href: "/codes",
      label: "View Active Codes List",
      description: "Copyable codes with verified, community, and needs-testing labels.",
    },
    whatYouCanDo: [
      "Learn the exact in-game redeem steps with screenshots described in text",
      "Understand verified vs community-reported vs needs-testing labels",
      "Know what to do when a code fails after an update",
      "Jump to the live codes table with one click",
    ],
    howToSteps: [
      { name: "Open Settings in-game", text: "Launch Build A Ring Farm on Roblox and open the Settings menu from the UI." },
      { name: "Find the Codes section", text: "Scroll to Codes — developers sometimes link social milestones for new strings." },
      { name: "Copy from the active list", text: "Use the codes tool on this site; tap Active to copy without typos." },
      { name: "Paste and Redeem", text: "Submit the string, claim rewards, then check inventory for sprays or packs." },
      { name: "Report failures", text: "If a code fails, try the next entry and watch the update log for status changes." },
    ],
    blocks: [
      {
        type: "h2",
        id: "codes-guide-purpose",
        text: "Build A Ring Codes Guide — Redeem Safely and Stay Current",
      },
      {
        type: "p",
        text: "Players search for Build A Ring Farm codes daily because rewards change with visits, likes, and updates. This page explains how redemption works, how we label reliability, and what to do when a string stops working. For the live copyable list, open the active codes tool — it is updated separately from this guide so you always get one-click copy buttons.",
      },
      {
        type: "h2",
        id: "code-labels",
        text: "Verified, Community Reported, and Needs Testing",
      },
      {
        type: "p",
        text: "Verified means multiple recent player reports succeeded. Community reported means likely valid but may vary by region or patch timing. Needs testing is unconfirmed — try early in a session before long grinds. We do not invent codes; every entry is tracked for transparency. Expired codes are removed or noted in the update log when reported consistently.",
      },
      {
        type: "h2",
        id: "expired-codes",
        text: "Handling Expired or Partial Codes",
      },
      {
        type: "p",
        text: "Developers retire codes without announcement. If Redeem fails, do not assume your account is broken — move to the next active string. Avoid third-party sites that ask for login credentials. Legitimate Roblox experiences only need the public code. After major updates, re-check the active list before filming or sharing old codes online.",
      },
      {
        type: "h2",
        id: "reward-timing",
        text: "When to Redeem Rewards for Maximum Value",
      },
      {
        type: "p",
        text: "Sprays and packs help most after you understand mutations and ring placement. Redeem before a play session when you can test items immediately. Time skips are best when crops are mid-grow and an event is approaching — details vary by account progress. This guide helps you organize redemption; exact reward values should be confirmed in-game.",
      },
    ],
  },
  "build-a-ring-calculator": {
    id: "build-a-ring-calculator",
    path: "/build-a-ring-calculator",
    metaKey: "build-a-ring-calculator",
    schema: "WebApplication",
    toolCta: {
      href: "/calculator",
      label: "Launch Profit Calculator",
      description: "Model seed level, rings, mutations, saw, and farm totals.",
    },
    whatYouCanDo: [
      "Learn which inputs map to real in-game levers",
      "Run scenarios before buying sprays or moving crops to Outer",
      "Interpret the step-by-step breakdown table",
      "Know when sprinkler level is excluded from payout math",
    ],
    blocks: [
      {
        type: "h2",
        id: "calculator-guide-intro",
        text: "Build A Ring Calculator Guide — Scenarios, Not Guesswork",
      },
      {
        type: "p",
        text: "The profit calculator on buildaring.online implements the community-verified harvest formula documented on the calculator tool page. This guide explains when to open the tool, how to read outputs, and which mistakes cause mismatches with live harvests. It does not duplicate the interactive UI — launch the calculator to run numbers while reading.",
      },
      {
        type: "h2",
        id: "good-use-cases",
        text: "Best Times to Run a Calculation",
      },
      {
        type: "p",
        text: "Use the calculator before buying expensive mutation sprays, before moving a leveled crop to Outer, and before choosing between two seeds with similar icons. Compare Inner vs Outer on the same seed to see if a long grow is worth the slot. Model total farm output up to sixty plants when you run uniform layouts. Weather RNG is not simulated — test event buffs as separate mutation selections.",
      },
      {
        type: "h2",
        id: "inputs-map",
        text: "How Each Input Maps to Your Farm",
      },
      {
        type: "p",
        text: "Seed level scales unit price for most crops. Saw yield adds bonus units through the documented floor formula. Ring pick sets Inner, Middle, or Outer multipliers. Mutation dropdown applies harvest buffs from None through event-tier tags. Cash multiplier covers Robux boosts you control. Sprinkler level changes grow speed only — it is intentionally excluded from payout math here.",
      },
      {
        type: "h2",
        id: "mismatch-debug",
        text: "If Results Do Not Match In-Game",
      },
      {
        type: "p",
        text: "Check for recent patches, Carrot’s alternate growth curve, or unlisted boosts. Run one controlled harvest with the same seed level and mutation shown in the breakdown. Small rounding differences are normal; large gaps usually mean settings changed in-game. Report consistent drift on community channels so tables can be updated.",
      },
    ],
  },
  "build-a-ring-wiki": {
    id: "build-a-ring-wiki",
    path: "/build-a-ring-wiki",
    metaKey: "build-a-ring-wiki",
    schema: "Article",
    whatYouCanDo: [
      "Jump to any database or tool from one index page",
      "See which resource answers which player question",
      "Find guide articles vs interactive tools quickly",
      "Bookmark a single hub instead of scattered bookmarks",
    ],
    blocks: [
      {
        type: "h2",
        id: "wiki-index",
        text: "Build A Ring Wiki Index — Databases, Tools, and Guides",
      },
      {
        type: "p",
        text: "This page is the directory for buildaring.online. Use it when you know you need information but not which section holds it. Interactive tools live on short routes like /seeds and /calculator. Long-form SEO guides live under /build-a-ring-* paths with unique intros so pages do not repeat the same opening paragraphs.",
      },
      {
        type: "h2",
        id: "databases",
        text: "Data Tables and Reference Pages",
      },
      {
        type: "p",
        text: "Seeds — fifty-one crops with rarity, income, grow time, roll weight. Mutations — multipliers, shop prices, event-only flags. Events — weather activation and per-roll odds. Rings — Inner 7x, Middle 13x, Outer 19x placement notes. Codes — active strings with status labels. Each table is sortable or filterable where the UI allows.",
      },
      {
        type: "h2",
        id: "tools-and-guides",
        text: "Tools vs Written Guides",
      },
      {
        type: "p",
        text: "Calculator tool runs harvest math. Calculator guide explains scenarios. Codes tool copies strings. Codes guide explains redemption and expired handling. Farm guide covers efficiency; beginner guide covers first sessions; tier list framework groups crops by role; best rings guide focuses on unlock order. FAQ exists in both quick (/faq) and long-form (/build-a-ring-faq) formats for different search intents.",
      },
      {
        type: "h2",
        id: "updates",
        text: "Tracking Changes Over Time",
      },
      {
        type: "p",
        text: "The update log summarizes site edits and community-reported game changes. After patches, check codes and mutations first, then seeds if new crops appear. We are not an official wiki — cross-check transcended-tier values and rare procs in-game when stakes are high.",
      },
    ],
  },
  "build-a-ring-faq": {
    id: "build-a-ring-faq",
    path: "/build-a-ring-faq",
    metaKey: "build-a-ring-faq",
    schema: "FAQPage",
    whatYouCanDo: [
      "Find long-tail answers about codes, rings, calculator, and official status",
      "Expand accordion FAQ entries without leaving the page",
      "Jump to specialized guides when a topic needs more depth",
      "Use quick FAQ at /faq for shorter browsing",
    ],
    blocks: [
      {
        type: "h2",
        id: "faq-hub",
        text: "Build A Ring FAQ Hub — Long-Tail Player Questions",
      },
      {
        type: "p",
        text: "Search engines surface many question-style queries: how codes work, whether this site is official, which ring to unlock, why calculator results differ. This hub collects those answers in one scrollable article. For a compact accordion-only view, visit /faq. Answers stay conservative when mechanics are uncertain — verify in-game before large purchases.",
      },
      {
        type: "h2",
        id: "codes-troubleshooting",
        text: "Codes and Account Safety",
      },
      {
        type: "p",
        text: "Codes never require your Roblox password. Paste only into the official game redeem box. Failed codes usually mean expiration, not a ban. Try the next active entry from the codes tool and read the codes guide for label meanings.",
      },
      {
        type: "h2",
        id: "mechanics-questions",
        text: "Mechanics, Rings, and Mutations",
      },
      {
        type: "p",
        text: "Mutations multiply sell price; sources include shop sprays and weather events with separate roll layers. Rings multiply by zone — do not put fast commons on Outer unless testing. Saw level amplifies all zones once crops justify the upgrade. Detailed tables live on mutations, events, and rings pages.",
      },
      {
        type: "h2",
        id: "site-data",
        text: "About Data on buildaring.online",
      },
      {
        type: "p",
        text: "We aggregate community reports into databases and tools. Numbers can lag patches. The calculator uses a documented formula with known exceptions listed on-site. Report consistent errors so pages can be updated — this FAQ is designed to help players organize decisions, not replace playing the game.",
      },
    ],
  },
  "build-a-ring-tier-list": {
    id: "build-a-ring-tier-list",
    path: "/build-a-ring-tier-list",
    metaKey: "build-a-ring-tier-list",
    schema: "Article",
    toolCta: {
      href: "/seeds",
      label: "Browse Full Seed Database",
      description: "Sort and filter all crops with live table data.",
    },
    whatYouCanDo: [
      "Understand tier bands by rarity without a single false meta rank",
      "Match crop roles to early, mid, and late game goals",
      "Jump to seeds table for exact income and grow times",
      "Pair tier thinking with calculator scenarios",
    ],
    blocks: [
      {
        type: "h2",
        id: "tier-list-framework",
        text: "Build A Ring Tier List — Framework by Rarity and Role",
      },
      {
        type: "p",
        text: "Strict S-tier rankings go stale after every patch. This page offers a tier list framework: ten rarity bands, typical roles, and when to prioritize income per minute vs jackpot Outer harvests. Open the seeds database for exact numbers — use this guide to decide which band to farm toward at your stage.",
      },
      {
        type: "h2",
        id: "early-tiers",
        text: "Common Through Rare — Early and Mid Game",
      },
      {
        type: "p",
        text: "Common and uncommon crops fund rollers and first ring upgrades with short grows. Rare and epic tiers introduce longer timers — pair them with Middle ring once unlocked. The best crop is the one you can harvest often while learning events, not the rarest name on the list.",
      },
      {
        type: "h2",
        id: "high-tiers",
        text: "Legendary to Transcended — Late Game Bands",
      },
      {
        type: "p",
        text: "Legendary and secret seeds anchor mid-game Outer experiments. Prismatic through transcended bands push base income higher with much lower roll weights. Chase these when Outer plots already produce strong epic income — otherwise total cash per week drops during the grind.",
      },
      {
        type: "h2",
        id: "use-calculator",
        text: "Turn Tiers Into Personal Rankings",
      },
      {
        type: "p",
        text: "Run the calculator on two crops in the same tier with your real seed level, ring, and mutation. Personal tier lists beat copied YouTube rankings because they include your saw level and play schedule. Check in-game information before selling or sacrificing a leveled plant.",
      },
    ],
  },
  "build-a-ring-best-rings": {
    id: "build-a-ring-best-rings",
    path: "/build-a-ring-best-rings",
    metaKey: "build-a-ring-best-rings",
    schema: "Article",
    toolCta: {
      href: "/rings",
      label: "Rings Reference Page",
      description: "Multiplier table and placement notes.",
    },
    whatYouCanDo: [
      "Compare Inner, Middle, and Outer unlock priority",
      "Learn which crop speeds fit each ring zone",
      "Pair saw upgrades with ring quality",
      "Avoid the most common placement mistakes",
    ],
    blocks: [
      {
        type: "h2",
        id: "best-rings-intro",
        text: "Best Rings in Build A Ring Farm — Unlock and Placement Order",
      },
      {
        type: "p",
        text: "There is no single best ring — there is a best ring for each crop and growth timer. Inner at 7x favors frequent harvests. Middle at 13x bridges legendaries. Outer at 19x maximizes slow high-unit crops when mutations align. This guide orders unlocks and placements; the rings reference page lists exact multipliers and saw synergy.",
      },
      {
        type: "h2",
        id: "unlock-order",
        text: "Recommended Unlock Order",
      },
      {
        type: "p",
        text: "Unlock rings in progression order unless you have a calculator proof to skip. Inner teaches harvest pacing. Middle pays for epic-tier grows. Outer is endgame infrastructure — unlocking it before crops justify 19x leaves slots empty or filled with weak pulls.",
      },
      {
        type: "h2",
        id: "crop-placement",
        text: "Which Crops Belong on Which Ring",
      },
      {
        type: "p",
        text: "Fast commons and uncommons stay Inner for cash flow. Legendaries and strong secrets move to Middle when grow times exceed a few minutes. Exotic and transcended candidates belong on Outer only when base income rewards long waits — especially before Galaxy or Nuclear windows.",
      },
      {
        type: "h2",
        id: "saw-synergy",
        text: "Saw Level With Ring Quality",
      },
      {
        type: "p",
        text: "Saw upgrades multiply every zone. Raising saw while Inner still runs weak plants wastes potential. Fix seed quality per ring tier first, then amplify. Model combinations in the calculator before spending hours moving plants.",
      },
    ],
  },
  "build-a-ring-update-log": {
    id: "build-a-ring-update-log",
    path: "/build-a-ring-update-log",
    metaKey: "build-a-ring-update-log",
    schema: "Article",
    whatYouCanDo: [
      "See when site sections were last reviewed",
      "Track community-reported code and balance changes",
      "Know what to re-check after Roblox patches",
      "Follow changelog entries without Discord",
    ],
    blocks: [
      {
        type: "h2",
        id: "update-log-intro",
        text: "Build A Ring Update Log — Site and Community Changes",
      },
      {
        type: "p",
        text: "This changelog tracks buildaring.online maintenance and community-reported game updates. It is not an official developer patch notes feed — always confirm critical values in-game. Entries are written conservatively when only partial reports exist.",
      },
      {
        type: "h2",
        id: "late-may-2026-sync",
        text: "Late May 2026 — Automated codes sync",
      },
      {
        type: "p",
        text: "Codes: added weekly GitHub Action (scripts/sync-codes.mjs) that scans 10 public lists — Pro Game Guides, Pocket Tactics, Radio Times, GamesRadar+, Destructoid, Beebom, buildaringfarm.net, buildaringfarm.co, buildaringfarmgame.wiki, AllThings.how — and updates /codes without in-game testing. Labels changed to Community sync (2+ sources) or Single source; rewards use scripts/codes-sync-overrides.json when community sources disagree (e.g. 100KVISITS time skip vs cash). Never auto-marked Verified.",
      },
      {
        type: "h2",
        id: "late-may-2026",
        text: "Late May 2026",
      },
      {
        type: "p",
        text: "Site infrastructure: added middleware to 301 all www and HTTP requests to https://buildaring.online (fixes Google Search Console duplicate URL reporting). Fixed cookie-consent API 500 when requests lacked a Referer header. SEO: refreshed /mutations title and meta description for higher CTR, added FAQPage structured data on the mutations page, and strengthened internal links to the profit calculator from home, seeds, rings, and mutations. Home hero now leads with the calculator CTA; popular tools section highlights calculator and mutations matrix first.",
      },
      {
        type: "h2",
        id: "may-2026",
        text: "May 2026",
      },
      {
        type: "p",
        text: "Site: Expanded SEO guide routes, related links module, FAQ structured data, and sitemap coverage for build-a-ring-* pages. Farm efficiency guide: added community-reported Big Lion two-crop focus, Plant Rush / Cosmic Spray notes, and FAQ entries including a third-person Plant Rush workaround (may be patched anytime). Data: Codes list reviewed with verified / community / needs-testing labels. Seeds database holds fifty-one crops across ten rarities. Calculator documents verified formula with Carrot exception noted.",
      },
      {
        type: "h2",
        id: "after-patches",
        text: "What to Re-Check After a Patch",
      },
      {
        type: "p",
        text: "After any Roblox update: codes first, mutations and events second, seeds if new crops are announced, calculator spot-check third. Report repeatable discrepancies so tables can be updated. Extreme edge cases like transcended drops may need multiple player confirmations.",
      },
      {
        type: "h2",
        id: "contribute",
        text: "How Community Reports Help",
      },
      {
        type: "p",
        text: "This page is designed to help players organize what changed and when. Share code failures, new strings, and balance notes in community channels you already use — we mirror confirmed reports into on-site status labels without inventing mechanics.",
      },
    ],
  },
}

export const guidePageList = Object.values(guidePages)
