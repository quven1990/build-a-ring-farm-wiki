import type { UpdateArticle } from "@/lib/updates/types"

export const updatesHubMeta = {
  title: "Build A Ring Farm Updates — Codes & Patch News (2026)",
  h1: "Build A Ring Farm Updates",
  description:
    "Latest Build A Ring Farm codes, patch notes, and wiki updates on buildaring.online — redeem strings, what changed, and links to seeds, calculator, and guides.",
  heroDescription:
    "New codes and community-reported patch news — each update gets its own page so you can bookmark and share.",
  ogTitle: "Build A Ring Farm Updates — Codes & Patch News",
  ogImageAlt: "Build A Ring Farm updates and codes news",
  breadcrumb: "Updates",
  keywords: [
    "build a ring farm update",
    "build a ring farm codes update",
    "build a ring farm update 5",
    "carnival pass",
    "patch notes",
    "250KUSERS",
  ],
} as const

export const updateArticles: UpdateArticle[] = [
  {
    slug: "best-money-method-june-2026",
    publishedAt: "2026-06-10",
    tags: ["patch", "pets"],
    meta: {
      title: "Best Money Method in Build A Ring Farm (June 2026 Guide)",
      h1: "Best Money Method — Build A Ring Farm (June 2026)",
      description:
        "Late-game money loop: transcendent-only plots, Capibara seed luck, Mammoth/Hydra mutation pets, super fertilizer, outer ring first — distilled from community gameplay (June 2026).",
      heroDescription:
        "A tight checklist for mid-to-late players — what to plant, which pets to AFK, and what to skip.",
      ogTitle: "Best Money Method — Build A Ring Farm June 2026",
      ogImageAlt: "Build A Ring Farm late-game money method guide",
      breadcrumb: "Best Money Method",
      keywords: [
        "build a ring farm best money method",
        "build a ring farm money guide",
        "transcendent seeds",
        "capibara pet",
        "mammoth hydra mutation",
        "super fertilizer",
      ],
    },
    whatYouCanDo: [
      "Follow the transcendent-only planting rule once you are past mid game",
      "Stack Capibara pets for seed luck before pulling the lever",
      "AFK with Mammoth or Hydra instead of waiting on the gear shop for Fire",
      "Run super fertilizer on every harvest window and composter between sessions",
      "Model income on the calculator before buying outer-ring value upgrades",
    ],
    blocks: [
      {
        type: "h2",
        id: "tldr",
        text: "TL;DR — Money Loop Checklist",
      },
      {
        type: "p",
        text: "Community creator MistyLemon (June 2026) runs this loop for passive billions while AFK: plant only transcendent crops (Garden Devour / Durian floor or higher), stack Capibara for seed luck, put Mammoth or Hydra on every layer, slap any cheap mutation spray first, level plants, keep super fertilizer active, max soil quality on outer rings, buy Outer Ring before filling inner plots, and ignore contracts if you want efficiency over busywork. Gear shop Fire sprays are too rare to rely on — pets upgrade mutations while you idle.",
      },
      {
        type: "image",
        src: "/images/home-hero-farm.webp",
        alt: "Build A Ring Farm ring layout with crops on inner, middle, and outer plots",
        caption: "Outer ring pays the most — fill it with transcendent seeds first, not legendaries on inner plots.",
      },
      {
        type: "h2",
        id: "transcendent-only",
        text: "1. Transcendent Seeds Only (Late Game)",
      },
      {
        type: "p",
        text: "Once you are far enough in, stop wasting plots on legendaries and below. Open the index and treat Garden Devour and Durian as the floor — anything weaker is not worth leveling. Pull the lever until you land top-tier transcendent seeds; the rarest rolls belong on the outer ring because it pays the highest multiplier, middle second, inner last.",
      },
      {
        type: "h2",
        id: "seed-luck-capibara",
        text: "2. Capibara + Seed Luck on the Lever",
      },
      {
        type: "p",
        text: "A fully upgraded Capibara gives about 59% seed luck. Place Capibara on lower garden layers (or all layers if you have extras) to stack roughly 120% extra luck on the seed roll lever. Pair that with your normal luck upgrades so transcendent pulls become routine instead of a lucky streak.",
      },
      {
        type: "h2",
        id: "mutations-pets",
        text: "3. Mutations: Pets Beat the Gear Shop",
      },
      {
        type: "p",
        text: "Fire is the best harvest multiplier, but Fire spray barely restocks — one creator reported a single Fire spray in ~50 hours. Skip waiting on the gear shop. Apply any cheap mutation first (Frozen spray works) so the plant has a base mutation, then AFK with pets that roll upgrades:",
      },
      {
        type: "h3",
        text: "Mammoth (free — purple eggs)",
      },
      {
        type: "p",
        text: "About 54% chance every 10 minutes to upgrade a plant’s mutation tier. Works while you are offline or tabbed out.",
      },
      {
        type: "h3",
        text: "Hydra (free — same purple egg pool)",
      },
      {
        type: "p",
        text: "Higher upgrade odds plus a stronger earning boost than Mammoth. Prioritize Hydra copies when eggs restock every ~5 minutes.",
      },
      {
        type: "p",
        text: "Result over time: Fire, Cosmic, Alien, and other top tags on transcendent plants without Robux. Paid Kuni pet is slightly faster but optional.",
      },
      {
        type: "image",
        src: "/images/home-hero-farm-2.webp",
        alt: "Build A Ring Farm crops with mutation multipliers stacked on ring plots",
        caption: "Level high-value plants and let Mammoth/Hydra push mutations toward Fire while you AFK.",
      },
      {
        type: "h2",
        id: "level-plants",
        text: "4. Level Plants, Not Random Low-Tier Crops",
      },
      {
        type: "p",
        text: "Example from the video: a Durian at level 78 with Starfall + Cosmic crushes low-tier legendaries. Use the plant upgrade button on transcendent crops only. Rip out leftover legendaries — they drain time and fertilizer.",
      },
      {
        type: "h2",
        id: "fertilizer-composter",
        text: "5. Super Fertilizer + Composter",
      },
      {
        type: "p",
        text: "Super fertilizer (easy from the composter) gives about 6× income for ~15 minutes. Loop: compost → super fertilizer → apply to every ready plot → repeat. Strong fertilizer is the fallback; prismatic is best if you have it. The bottom composter tier also drops mutation sprays — still better odds than staring at an empty gear shop.",
      },
      {
        type: "h2",
        id: "upgrades-rings",
        text: "6. Saw, Sprinkler, Soil Quality, Ring Order",
      },
      {
        type: "p",
        text: "Always push saw yield and sprinkler power. On outer layers, max soil quality for roughly +50% income. Buy and fill the Outer Ring before you finish inner rings — inner plots are the weakest multiplier. Match each ring’s recommended crop value for the +20% garden bonus (late upgrades can cost tens of SX — plan with the calculator).",
      },
      {
        type: "image",
        src: "/images/home-hero-farm-3.webp",
        alt: "Expanded Build A Ring Farm with multiple ring layers and upgraded plots",
        caption: "Soil quality on outer layers and saw/sprinkler upgrades multiply everything you already planted.",
      },
      {
        type: "h2",
        id: "afk-rewards",
        text: "7. AFK Rewards & Admin Abuse",
      },
      {
        type: "p",
        text: "AFK reward tracks were buffed recently — idle time can drop cash and even transcendent seeds. Admin-abuse events (often 2–3× per week around updates) shower seeds, luck, and money; join when safe for your garden. Daily wheel spin (24h) can give tropical packs or time skips.",
      },
      {
        type: "h2",
        id: "bee-event",
        text: "8. Bee / Honey Event",
      },
      {
        type: "p",
        text: "Collect honey tokens during bee events, turn in sets for honey-pot rewards, and cash time skips into instant harvest value. Worth doing whenever the event is live.",
      },
      {
        type: "h2",
        id: "skip-these",
        text: "What to Skip (Creator Take)",
      },
      {
        type: "p",
        text: "Contracts — low ROI for time spent. Carnival premium pass — quests are fine free, premium not game-changing. Robux farm skins — best free skin is ~8% cash; paid skins only ~2% better. Gear shop as primary mutation source — too inconsistent. Impelad Disco Dodo bundle — prismatic proc is nice but overpriced for F2P.",
      },
      {
        type: "h2",
        id: "optional-robux",
        text: "Optional Robux (Not Required)",
      },
      {
        type: "p",
        text: "Pay-to-win shortcuts exist: Dino-style pets with time skips, extra pet slots per layer, Robux seed packs. Polar bear and egg pets cover most earning multipliers for free players. Only spend if the calculator proves a seed beats your current outer-ring setup.",
      },
      {
        type: "h2",
        id: "wiki-links",
        text: "Use With Our Tools",
      },
      {
        type: "p",
        text: "Cross-check seeds on the seeds database, mutation targets on the mutations matrix, ring multipliers on the rings guide, and harvest math on the profit calculator before you rip out a full garden. Redeem active codes first — free fertilizer and skips accelerate this loop.",
      },
      {
        type: "h2",
        id: "source",
        text: "Source",
      },
      {
        type: "p",
        text: "Summary based on MistyLemon’s June 2026 gameplay video “Best Money Method in Build A Ring Farm” (YouTube). Pet percentages, prices, and shop stock change with patches — confirm in-game. buildaring.online is an independent fan wiki, not affiliated with the developer or the creator.",
      },
    ],
    faq: [
      {
        question: "What is the minimum seed tier for late game?",
        answer:
          "Community guidance in this video: do not plant below Garden Devour or Durian once you are far in — focus transcendent crops on the outer ring.",
      },
      {
        question: "How do I get Fire mutations without the gear shop?",
        answer:
          "Apply any cheap spray first, then AFK with Mammoth or Hydra from purple eggs. They upgrade mutation tiers over time; Fire is rare in shop stock but common as a pet-driven end state.",
      },
      {
        question: "Is super fertilizer worth the composter grind?",
        answer:
          "Yes for active income — about 6× harvest value for ~15 minutes per application. Compost regularly so you always have stock.",
      },
      {
        question: "Outer ring or inner ring first?",
        answer:
          "Unlock and fill Outer Ring first. Inner plots pay the least; outer pays the most.",
      },
    ],
  },
  {
    slug: "update-5-carnival-pass",
    publishedAt: "2026-05-29",
    tags: ["patch", "pets"],
    updateLabel: "Update 5",
    meta: {
      title: "Build A Ring Farm Update 5 — Carnival Pass & Event Guide (2026)",
      h1: "Build A Ring Farm Update 5 — Carnival Pass",
      description:
        "Community-reported Update 5 overview: Carnival Pass, Whack-a-Crop, Carnival Spray, new bundles, prize tickets, and limited-time admin events — with links to codes, mutations, and calculator.",
      heroDescription:
        "Update 5 adds a battle-pass-style Carnival event, new plants and crates, and limited-time admin abuse — summarized from player reports, not official patch notes.",
      ogTitle: "Update 5 Carnival Pass — Build A Ring Farm",
      ogImageAlt: "Build A Ring Farm Update 5 Carnival Pass event guide",
      breadcrumb: "Update 5 Carnival",
      keywords: [
        "build a ring farm update 5",
        "carnival pass",
        "whack-a-crop",
        "carnival spray",
        "build a ring farm bundles",
      ],
    },
    whatYouCanDo: [
      "See what Update 5 reportedly adds before spending Robux on passes or bundles",
      "Understand Carnival Pass tracks, prize tickets, and the ~two-week event window",
      "Compare the three reported Robux bundles and when to skip them",
      "Redeem existing active codes, then check mutations and calculator after any balance rumors",
    ],
    blocks: [
      {
        type: "h2",
        id: "update-5-summary",
        text: "What Changed in Update 5 (Community Reports)",
      },
      {
        type: "p",
        text: "Players and community gameplay videos report a major Build A Ring Farm patch — often called Update 5 — centered on a Carnival-themed season. Reported additions include a Carnival Pass (free and premium tracks), Whack-a-Crop minigame, Carnival Spray mutation, prize-ticket spins, four new crate types, two new gears, a new map area, corrupted visual effects, and roughly sixteen new plants. Admin-abuse sessions with a Jester NPC, prize wheel, and tomato-launcher fight also ran during the launch window. This page is not official developer patch notes; we summarize what the community shares so you can plan before spending Robux or fertilizer.",
      },
      {
        type: "h2",
        id: "carnival-pass",
        text: "Carnival Pass — Free vs Premium Track",
      },
      {
        type: "p",
        text: "The Carnival Pass works like a seasonal battle pass. Community reports describe a free reward track and a premium track unlock for about 64 Robux, with optional instant tier skips for Robux. Reported free and premium rewards include strong fertilizer, Carnival Spray, wheat spray, spray crates, fertilizer crates, rainbow spray, prize tickets, and a Carnival seed pack on higher tiers. Hourly and daily quests (play time, compost runs, contracts, fertilizer use, plant upgrades) grant pass XP. Finish quests to claim tier rewards before the event ends — community sources describe a roughly two-week Carnival window, but confirm the in-game timer after you log in.",
      },
      {
        type: "h2",
        id: "prize-tickets-crates",
        text: "Prize Tickets, Crates, and Carnival Spray",
      },
      {
        type: "p",
        text: "Prize tickets are a Carnival currency used on a prize wheel or spin UI. Players report spending tickets for spray crates, fertilizer crates, or long-shot pulls toward a Carnival seed pack — one community video cited about 0.1% odds on the pack, and about 0.5% for carnival-tier fertilizer inside fertilizer crates. Spray crates can reportedly roll Carnival Spray; players describe it as a new shop-tier spray that is weaker than Fire for raw multiplier value — meaning existing Fire-focused farms may stay relevant. Treat every percentage as single-source until our weekly mutations sync and public wikis agree. When Carnival Spray appears in multiple lists, the mutations database on buildaring.online will pick it up automatically.",
      },
      {
        type: "h2",
        id: "whack-a-crop-admin",
        text: "Whack-a-Crop and Admin-Abuse Events",
      },
      {
        type: "p",
        text: "Whack-a-Crop is a reported interactive minigame during Carnival admin sessions: whack crops for score, combo multipliers, and bonus prize tickets. Separate wheel events can trigger prize drops, temporary money boosts (community reports mention up to two-week earning boosts), crop-destruction jokes, or a Jester boss fight using a tomato launcher. Rewards from these sessions vary — sprays, pit trees, gift boxes, and ticket bundles show up in player footage, but nothing is guaranteed every server. If you care about a mature garden, harvest or screenshot before joining destructive event votes on public servers.",
      },
      {
        type: "h2",
        id: "carnival-seed-pack",
        text: "Carnival Seed Pack (Reported Drops)",
      },
      {
        type: "p",
        text: "The Carnival seed pack reportedly opens multiple plants at once. One community showcase pulled Cotton Candy Cactus and Funnel Cake Fern with roughly twenty-five percent odds each on those slots — other rarities fill the rest of the table. Reported base income examples from that footage: Funnel Cake Fern around 900,000 per unit (Secret-tier in the video), Cotton Candy Cactus around 145,000 per unit (Divine-tier in the video). Numbers change with level, ring, and patches — confirm in your own inventory and cross-check the seeds database once sync sources list the new crops.",
      },
      {
        type: "h2",
        id: "robux-bundles",
        text: "Three Robux Bundles (Community Comparison)",
      },
      {
        type: "p",
        text: "Update 5 reportedly ships three optional Robux bundles alongside Carnival Pass. Treat prices and pet abilities as player-reported until you verify in the Roblox shop.",
      },
      {
        type: "h3",
        text: "Disco Bundle (~1,600 Robux, limited stock in reports)",
      },
      {
        type: "p",
        text: "Includes a Disco Dodo pet, Disco farm skin, and Boom Bloom seed. Community footage labels Boom Bloom as Exotic with roughly 2.1M base income per unit — strong, but not top-tier for the price in that review. The Disco Dodo pet reportedly grants about +64% grow speed on floor plants for 25 seconds on a ~131-second cooldown. Impression from one creator: flashy cosmetics, modest earning boost, poor value versus grinding existing pets like the Stafful Griffin.",
      },
      {
        type: "h3",
        text: "Gummy Kingdom Bundle",
      },
      {
        type: "p",
        text: "Includes Gummy Gator pet, candy-themed farm skin, and Jelly Vine seed. Reported Jelly Vine income around 7.6M per unit (Transcended in the video) — slightly above Aurora Lotus in the same showcase. Giant Gummy Gator reportedly offers about 7.6× earning boost and a chance to apply prismatic fertilizer on a cooldown. Community sentiment ranked this bundle highest of the three for plant stats, though still optional if you are free-to-play.",
      },
      {
        type: "h3",
        text: "Captain Popper Pirate Bundle",
      },
      {
        type: "p",
        text: "Includes pirate farm skin, Cannon Fruit seed (~820,000 per unit in one video), and a pirate pet with about 5.4× earning boost plus random plant stage advances on a timer. Reviewers called it the weakest plant stat line of the three bundles. All three skins reportedly add about +6% cash — similar to existing farm skins such as Steampunk.",
      },
      {
        type: "h2",
        id: "should-you-spend",
        text: "Should You Buy the Pass or Bundles?",
      },
      {
        type: "p",
        text: "Free track: worth doing if you already play daily — quests stack fertilizer, tickets, and sprays without premium Robux. Premium track (~64 Robux): only if you will finish enough tiers before the event ends; skip instant tier bundles unless you value time more than coins. Robux bundles: optional cosmetics and convenience; run the profit calculator on any new seed before assuming it beats your current Outer-ring setup. Stafful Griffin and other pre-update pets still dominate mutation proc value in community comparisons — bundles do not automatically replace them.",
      },
      {
        type: "h2",
        id: "codes-and-wiki",
        text: "Codes, Database Sync, and What We Updated",
      },
      {
        type: "p",
        text: "Update 5 did not replace the need to redeem existing active codes — check the codes page for weekly sync status. New redeem strings, if any, will appear there automatically before we mention them here. Seeds and mutations tables update through our community sync jobs when public gaming lists agree on new crops or Carnival Spray stats; until then, use this article for event mechanics and bundle context. After any Roblox patch: redeem codes first, read this page for Carnival timing, then spot-check mutations and events if balance rumors spread.",
      },
      {
        type: "h2",
        id: "sources",
        text: "Sources and Disclaimer",
      },
      {
        type: "p",
        text: "Summary based on community gameplay reporting and auto-generated video captions (May 2026), cross-checked against general wiki patterns — not an official Gamecreates or Roblox announcement. Percentages, pet cooldowns, and income examples can be wrong or outdated after hotfixes. buildaring.online is an independent fan wiki. Confirm prices, rewards, and timers in-game before spending Robux.",
      },
    ],
    faq: [
      {
        question: "Is Carnival Spray better than Fire?",
        answer:
          "Community reports from Update 5 launch describe Carnival Spray as weaker than Fire for multiplier value. Check the mutations page after sync sources list it, and test harvests in-game after any balance patch.",
      },
      {
        question: "How long does the Carnival event last?",
        answer:
          "Players report a roughly two-week window on the in-game Carnival Pass timer. Log in and read the event countdown — extensions or early ends are possible without notice.",
      },
      {
        question: "Are the Update 5 bundles worth it?",
        answer:
          "Optional. Community reviews rank Gummy Kingdom highest for plant stats, Disco as cosmetic-heavy, Pirate as the weakest income line. Free-to-play players can still earn pass rewards and codes without buying bundles.",
      },
      {
        question: "Is this official patch notes?",
        answer:
          "No. This is a fan wiki summary of player-reported Update 5 content. Use in-game notices and the developer Discord for authoritative announcements.",
      },
      {
        question: "Will new plants appear on the seeds database?",
        answer:
          "Yes, once multiple public sources agree on names and stats. Until sync picks them up, treat seed pack results as in-game confirmation only.",
      },
    ],
  },
  {
    slug: "250kusers-code-update-4",
    publishedAt: "2026-05-31",
    tags: ["codes", "patch"],
    featuredCodes: ["250KUSERS"],
    updateLabel: "Update 4",
    meta: {
      title: "Build A Ring Farm Update 4 — 250KUSERS Code (June 2026)",
      h1: "Build A Ring Farm Update 4 — 250KUSERS Code",
      description:
        "250KUSERS is the new Build A Ring Farm redeem code for Update 4 — 3-minute time skip reward, how to redeem, and whether it is worth using before your next harvest.",
      heroDescription:
        "Update 4 adds milestone code 250KUSERS — copy steps, reward details, and what to do after redeeming.",
      ogTitle: "250KUSERS Code — Build A Ring Farm Update 4",
      ogImageAlt: "Build A Ring Farm Update 4 250KUSERS redeem code",
      breadcrumb: "250KUSERS Update 4",
      keywords: [
        "250KUSERS",
        "build a ring farm update 4",
        "build a ring farm codes",
        "time skip code",
      ],
    },
    whatYouCanDo: [
      "Copy 250KUSERS and redeem before it expires",
      "See how the 3-minute time skip fits early vs mid game",
      "Jump to the full active codes list with sync status",
      "Read redemption steps if Settings → Codes is new to you",
    ],
    blocks: [
      {
        type: "h2",
        id: "update-4-summary",
        text: "What Changed in Update 4",
      },
      {
        type: "p",
        text: "Community reports and gaming-media code lists now include 250KUSERS — a milestone redeem string tied to Build A Ring Farm reaching roughly 250,000 players. This is not an official developer patch notes page; we track what players and public code roundups report after each wave. On buildaring.online the code appeared on four of seven synced sources at last check — see the active codes page for current source count and status labels.",
      },
      {
        type: "h2",
        id: "250kusers-code",
        text: "250KUSERS Code and Reward",
      },
      {
        type: "p",
        text: "Code: 250KUSERS. Reported reward: 3-minute Time Skip. Time skips shorten grow timers on active crops — most useful when you already have plants mid-grow and want to harvest sooner, or when you are lining up a weather window. Some players use skips to compress early-session loops; others save them for slow Outer-ring crops. Confirm the exact reward in-game after redeeming — community lists occasionally disagree on skip length or item type.",
      },
      {
        type: "h2",
        id: "how-to-redeem",
        text: "How to Redeem 250KUSERS",
      },
      {
        type: "p",
        text: "Open Build A Ring Farm on Roblox, go to Settings, tap Codes, paste 250KUSERS exactly (no spaces), and submit. Codes never require your Roblox password — only paste into the official in-game box. If redemption fails, the string may have expired or hit a one-time-per-account limit; try the next active code on our codes list. For screenshots and troubleshooting, read the codes guide on this wiki.",
      },
      {
        type: "h2",
        id: "worth-using",
        text: "Is the Time Skip Worth It?",
      },
      {
        type: "p",
        text: "Early game: a 3-minute skip is modest but can pull forward your first few harvests if every plot is growing. Mid game: pair the skip with crops that are close to mature before Rain or Galaxy — mutating a ready harvest beats skipping an empty field. Late game: skips are rarely game-breaking alone; they complement event timing and spray purchases you already planned. Run the profit calculator if you are choosing between spending time vs spending coins on growth boosts.",
      },
      {
        type: "h2",
        id: "other-active-codes",
        text: "Other Active Codes (Same Patch Window)",
      },
      {
        type: "p",
        text: "Update 4 did not remove the rest of the working list. PLANTRUSH, UPDATE1, UPDATE2, THANKYOU, BARF:3, 100KVISITS, and 2KLIKES still appear on multiple public lists — seed packs, sprays, and fertilizers often beat a short skip for brand-new accounts. Redeem every active string once, then spend rewards using the progression guide stage that matches your farm.",
      },
      {
        type: "h2",
        id: "wiki-updates",
        text: "What We Updated on buildaring.online",
      },
      {
        type: "p",
        text: "Weekly codes sync picked up 250KUSERS automatically. This article is the dedicated Update 4 page — bookmark it for share links. The site changelog on the update log lists infrastructure and data reviews separately. After any Roblox patch, re-check codes first, then mutations and events if balance rumors spread.",
      },
    ],
    faq: [
      {
        question: "Is 250KUSERS still working?",
        answer:
          "It appeared on multiple public code lists in late May 2026. Codes expire without notice — redeem in-game and check the active codes page for current sync status.",
      },
      {
        question: "What does 250KUSERS give?",
        answer:
          "Community sources report a 3-minute Time Skip. Confirm in-game after redeeming; never trust third-party sites that ask for your password.",
      },
      {
        question: "Is this official patch notes from the developer?",
        answer:
          "No. buildaring.online is an independent fan wiki. We summarize community and media reports — use Discord or in-game notices for developer announcements.",
      },
    ],
  },
]

export const updateArticleSlugs = updateArticles.map((a) => a.slug)

export function getUpdateArticle(slug: string): UpdateArticle | undefined {
  return updateArticles.find((a) => a.slug === slug)
}

export function getUpdateArticleByCode(code: string): UpdateArticle | undefined {
  const normalized = code.toUpperCase()
  return updateArticles.find((a) =>
    a.featuredCodes?.some((c) => c.toUpperCase() === normalized)
  )
}

/** Newest article first — add entries to the front of updateArticles when publishing. */
export const updateArticlesSorted = [...updateArticles].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt)
)

export function getLatestUpdateArticle(): UpdateArticle | undefined {
  return updateArticlesSorted[0]
}
