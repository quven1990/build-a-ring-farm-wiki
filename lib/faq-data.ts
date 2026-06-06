export type FAQEntry = {
  question: string
  answer: string
}

export const globalFaqItems: FAQEntry[] = [
  {
    question: "Are the codes on this wiki verified?",
    answer:
      'We sync codes weekly from public community lists (Destructoid, Beebom, GamesRadar+, and others). "Community sync" means the code appeared on multiple sources — not that we played the game to test it. Codes can expire anytime; always redeem in-game.',
  },
  {
    question: "Is this the official Build A Ring Farm website?",
    answer:
      "No. buildaring.online is an independent fan-made toolkit, not affiliated with Roblox Corporation or the game developers. Use in-game values as the final source of truth.",
  },
]

export const faqByPage: Record<string, FAQEntry[]> = {
  home: [
    {
      question: "What is Build A Ring Farm?",
      answer:
        "Build A Ring Farm is a Roblox farming game with circular ring plots, seed rollers, weather events, and mutation multipliers. Players grow crops on Inner, Middle, and Outer rings to scale income. This wiki documents community-reported numbers to help you plan — not replace the in-game tutorial.",
    },
    {
      question: "Where are the latest Build A Ring Farm codes?",
      answer:
        "The working codes table at the top of this page lists active redeem strings with copy buttons. For the full list and sync details, open the codes page. Redeem in Settings → Codes inside Roblox.",
    },
    {
      question: "How do mutations work in Build A Ring Farm?",
      answer:
        "Mutations multiply sell value on harvested crops. Some are bought in the Gear Shop (Wet through Rainbow); others proc from weather events (Alien, Farm, Honeycomb). See the mutations summary table on this page or the full matrix for every multiplier and trigger.",
    },
    {
      question: "How many seeds are in the game?",
      answer:
        "Our database tracks 51 crops across ten rarities with base income, grow time, and roll weights. The seeds summary on this page highlights beginner and endgame examples — open the seeds database for the complete sortable list.",
    },
    {
      question: "What is the best early-game farm layout?",
      answer:
        "Fill every plot with fast crops on Inner ring first, redeem codes for sprays and packs, then expand to Middle when epics are affordable. Keep paths short for quick harvests. The farm layout section on this page outlines early, mid, and late goals — read the full farm efficiency guide for event timing.",
    },
    {
      question: "Which ring should I use first?",
      answer:
        "Inner (Base) ring has the lowest multiplier but fastest turnover. Middle and Outer pay more per harvest but suit slower, higher-income crops. Community-reported multipliers are 7x / 13x / 19x — confirm in-game after patches and model setups in the profit calculator.",
    },
    {
      question: "Is buildaring.online official?",
      answer:
        "No. buildaring.online is an independent fan-made wiki and toolkit, not affiliated with Roblox Corporation or the game developers. Always confirm rewards and prices in-game.",
    },
    {
      question: "How do I use the Build A Ring Farm calculator?",
      answer:
        "Pick seed, level, ring tier, mutation, plant count, and cash multiplier on the calculator page. It uses a documented community formula with listed exceptions — run a test harvest in-game if a patch just dropped.",
    },
    {
      question: "What causes big income spikes?",
      answer:
        "Stacking a high mutation on Outer ring during Galaxy, Nuclear, or similar events, plus leveling the right seed. Codes and free packs compress early grind but do not replace ring placement. Check the events page before holding crops an extra cycle.",
    },
    {
      question: "How often is this wiki updated?",
      answer:
        "Codes sync weekly from public gaming lists. Seeds and mutations tables refresh on community sync jobs. See the update log for site changes; balance patches may take a few days to appear everywhere.",
    },
  ],
  seeds: [
    {
      question: "How should I sort seeds on this page?",
      answer:
        "Sort by income per grow time when you need session cash, or by base income when you are holding crops for event mutations. Roll weight matters if you are budgeting the seed roller.",
    },
    {
      question: "Do all seeds use the same level scaling?",
      answer:
        "Most crops use the standard level curve in our calculator. Carrot is a documented exception. Confirm unusual harvests in-game after patches.",
    },
  ],
  codes: [
    {
      question: "How often are codes updated?",
      answer:
        "An automated job refreshes this list every Monday from major gaming-media code roundups. We do not play-test every string — always redeem in-game to confirm.",
    },
    {
      question: "Where do I paste Build A Ring Farm codes?",
      answer:
        "Open the in-game Settings menu, find the Codes section, paste the string, and tap Redeem. Use only codes listed on trusted community pages — never enter account passwords on third-party sites.",
    },
    {
      question: "Why did my code stop working?",
      answer:
        "Developers retire codes after milestones or updates without notice. Try newer strings from the active list and mark failed codes in community channels so others avoid wasting time.",
    },
  ],
  mutations: [
    {
      question: "How many mutations are in Build A Ring Farm?",
      answer:
        "Nine total: six purchasable from the Gear Shop (Wet through Rainbow) and three event-only entries (Alien, Farm, Honeycomb). The matrix on this page lists every multiplier, trigger, and shop price.",
    },
    {
      question: "What is the highest mutation multiplier?",
      answer:
        "Honeycomb at 6.5x is the top event-only proc. Rainbow at 5x is the strongest shop spray. Wet at 1.5x is the most common free boost from Rain — stack any mutation with ring and seed level for final harvest value.",
    },
    {
      question: "Should I buy Rainbow or wait for event mutations?",
      answer:
        "Rainbow is reliable but expensive. Event procs are free but unpredictable. Run the profit calculator with your actual seed and ring before spending billions on sprays — sometimes a 3x event buff on Outer beats a 5x spray on Inner.",
    },
    {
      question: "Which mutations are event-only?",
      answer:
        "Alien, Farm, and Honeycomb cannot be bought in the Gear Shop. They require specific weather or world events. Filter the matrix to event-only rows and read the events page for trigger rates.",
    },
  ],
  calculator: [
    {
      question: "Does the calculator include sprinkler payout bonus?",
      answer:
        "No. Sprinkler level affects grow speed in-game, not the harvest formula modeled here. Use it to plan timing, not per-plant cash.",
    },
    {
      question: "Why does my in-game result differ slightly?",
      answer:
        "Recent patches, unlisted boosts, or rounding in the UI can shift results. Use the breakdown table to see each multiplier step, then verify one test harvest.",
    },
  ],
  rings: [
    {
      question: "What are the ring multipliers in Build A Ring Farm?",
      answer:
        "Community-reported values: Inner (Base) 7x, Middle 13x, Outer 19x. These multiply harvest value on top of seed level and mutations. Confirm in-game after patches.",
    },
    {
      question: "Should I put my best seed on the Outer Ring?",
      answer:
        "Only when base income and grow time justify the wait. Fast commons belong on Inner for cash flow; slow high-unit secrets and exotics belong on Outer when you can harvest during events.",
    },
    {
      question: "When should I upgrade to the Middle Ring?",
      answer:
        "Upgrade when you regularly plant epic or legendary crops and Inner income funds the unlock. Middle is often the best cost-to-benefit jump before chasing Outer.",
    },
    {
      question: "How do rings work with the profit calculator?",
      answer:
        "Pick Inner, Middle, or Outer in the calculator to model the same multiplier you use in-game. Compare rings before moving a leveled plant — a 19x Outer only wins if the crop earns enough per harvest.",
    },
  ],
  events: [
    {
      question: "How often do weather events happen?",
      answer:
        "Events typically roll every 10–15 minutes on a server. The countdown shows at the top of the screen, but the event name is hidden until it starts — plan mature crops ahead of time.",
    },
    {
      question: "Can I get mutations while offline?",
      answer:
        "Weather procs generally require you to be online when the event runs and crops are ready. Shop sprays are the reliable way to apply a chosen mutation without waiting for RNG.",
    },
    {
      question: "Which event should I wait for?",
      answer:
        "Galaxy (Rainbow), Nuclear (Radioactive), and Queen Bee (Honeycomb) are the highest-value targets for ready Outer crops. Rain (Wet) is a good practice event when you are still learning timing.",
    },
    {
      question: "Where are event trigger rates listed?",
      answer:
        "This page lists activation rates and per-roll odds. Pair it with the mutations matrix for multipliers and the farm guide for session rhythm.",
    },
  ],
  progression: [
    {
      question: "What should I upgrade first in Build A Ring Farm?",
      answer:
        "Fill every plot, redeem active codes, then upgrade your weakest seed on the best ring you own before chasing rare rollers. Saw level helps most when Middle and Outer already hold strong crops.",
    },
    {
      question: "When is mid-game in Build A Ring Farm?",
      answer:
        "Mid-game usually means epic or legendary seeds on Middle ring, purposeful mutation buys, and using the calculator before large spends. You are past tutorial but not yet full Outer optimization.",
    },
    {
      question: "Is offline farming enough for late game?",
      answer:
        "Offline income is supplemental. Active harvests during Galaxy, Nuclear, or similar events still dominate because you choose when mutated crops pay out.",
    },
    {
      question: "How do codes fit into progression?",
      answer:
        "Redeem codes early for sprays, packs, and time skips — they compress grind but do not replace ring placement. Use the active codes list, then read this page for what to upgrade next.",
    },
  ],
  faq: globalFaqItems.concat([
    {
      question: "What is Build A Ring Farm?",
      answer:
        "Build A Ring Farm is a Roblox farming simulator with circular ring plots, mutations, and many seed rarities. This site documents community-reported numbers to help you plan upgrades — not replace the game tutorial.",
    },
    {
      question: "What is the best seed?",
      answer:
        "It depends on your stage and ring layout. Early players want fast commons; mid-game players stabilize epics on Middle; endgame players optimize Outer with slow high-income crops. Use the tier list framework and calculator instead of one fixed answer.",
    },
    {
      question: "How do mutations work?",
      answer:
        "Mutations multiply sell value. Some come from the Gear Shop, others from weather events with separate roll layers. See the mutations matrix for multipliers and event-only tags.",
    },
    {
      question: "Which ring is best?",
      answer:
        "Outer pays the highest multiplier but slow crops belong there only when base income justifies the wait. Inner funds frequent harvests. Compare setups in the best rings guide and calculator.",
    },
    {
      question: "How do I use the earnings calculator?",
      answer:
        "Pick seed, levels, ring, mutation, plant count, and cash multiplier. Read the calculator guide page for scenario examples before large purchases.",
    },
  ]),
  "build-a-ring-farm": [
    {
      question: "Should I always harvest during Rain?",
      answer:
        "If crops are ready, harvesting during any active event usually beats harvesting with no buff. Wet from Rain is a reliable early boost to practice timing.",
    },
    {
      question: "How many plots should I fill before rare events?",
      answer:
        "More independent rolls mean more expected procs. Fill every unlocked slot when Black Hole, Galaxy, or similar events are active if your crops are mature — unless you are deliberately running the Big Lion two-crop focus described in the farm guide.",
    },
    {
      question: "Should I clear my farm for the Big Lion two-crop method?",
      answer:
        "Only if you already own Big Lion (or plan to roll Epic pets soon) and two plants clearly outperform everything else. Remove other crops so super fertilizer cannot proc on weak plants, then level only those two. This trades variety for focused buffs; confirm pet ability text in-game after patches.",
    },
    {
      question: "How do I get Cosmic Spray and Plant Rush coins?",
      answer:
        "Community reports point to Plant Rush events as the main source of event currency and Cosmic Spray. The shop timer shows when the next run starts. Cosmic Spray is reported around 25,000 coins — farm low-population servers for roughly 1,000–1,500 coins per event according to players, then buy when you can afford it.",
    },
    {
      question: "Is there a third-person workaround for Plant Rush?",
      answer:
        "Some players report a community glitch (not official, may break or violate Roblox rules): equip a gun, open the gear shop and interact with it, when the menu appears without a mouse cursor navigate to Restock and confirm, then exit — Plant Rush may run in third person with wider hits and easier AFK clears. We document this only because players ask; it can be patched without warning. Prefer normal first-person play when possible.",
    },
  ],
  "build-a-ring-guide": [
    {
      question: "What should a brand-new player do first?",
      answer:
        "Plant every slot, redeem any active codes, harvest on a schedule, and read the seeds database for your next upgrade. Avoid chasing transcended crops before your rings are organized.",
    },
    {
      question: "Where do I redeem codes as a beginner?",
      answer:
        "Open in-game Settings, find Codes, paste a string from the active codes list, and tap Redeem. For step-by-step help and label meanings, use the codes redemption guide.",
    },
    {
      question: "How does the seed roller work?",
      answer:
        "Pull the lever at your base to roll a seed on the pedestal — you can buy or reroll. Luck upgrades improve rare odds over time. Compare results in the seeds database before spending your budget.",
    },
    {
      question: "What should I read after the beginner guide?",
      answer:
        "Follow the progression page for upgrade order, the farm guide for efficiency, and the calculator when you are choosing between ring unlocks or mutation sprays.",
    },
  ],
  "build-a-ring-codes": [
    {
      question: "Where is the copy-paste codes list?",
      answer:
        "Use the active codes page on this site for one-click copy buttons and weekly sync status. This guide explains how to redeem and read labels — it does not duplicate the full list.",
    },
    {
      question: "Are expired codes listed here?",
      answer:
        "Expired strings are removed from the active list when community reports pile up. The update log notes site changes; the active tool may show recently dropped codes separately.",
    },
    {
      question: "What does community sync mean on codes?",
      answer:
        "The code appeared on multiple public gaming lists in our weekly sync — we do not play-test every string. Always redeem in-game to confirm rewards.",
    },
    {
      question: "Why did my code fail after an update?",
      answer:
        "Developers retire codes without notice. Try the next active string, rejoin a server if needed, and never enter passwords on fake code sites — only the official Roblox game UI.",
    },
  ],
  "build-a-ring-calculator": [
    {
      question: "Can I model a full 60-plant farm?",
      answer:
        "Yes. Set plant count up to sixty with the same per-plant settings to estimate total session output. For mixed farms, run separate scenarios per crop type.",
    },
  ],
  "build-a-ring-tier-list": [
    {
      question: "Is this an official tier list ranking?",
      answer:
        "No. It is a framework by rarity and role so you can compare crops. Meta shifts after patches — validate pulls and income in-game.",
    },
  ],
  "build-a-ring-best-rings": [
    {
      question: "Should I unlock Outer before Middle?",
      answer:
        "Usually unlock rings in order so each tier has crops worth the multiplier. Middle is strong for legendaries before you can fill Outer with secrets.",
    },
  ],
  "build-a-ring-beginner-mistakes": [
    {
      question: "What is the biggest beginner mistake in Build A Ring Farm?",
      answer:
        "Skipping active codes and bad ring placement — redeem every working string first, keep fast crops on Inner, and save Outer for slow high-income plants.",
    },
    {
      question: "Should I buy Rainbow spray early?",
      answer:
        "Only after the profit calculator shows positive ROI for your seed level and ring. Free weather procs often beat expensive shop sprays on weak plots.",
    },
    {
      question: "Where do I find codes that actually work?",
      answer:
        "Use the active codes page — synced weekly from public gaming lists. For major drops like 250KUSERS, read the updates hub article for context.",
    },
  ],
}

export function getFaqForPage(pageKey: string): FAQEntry[] {
  return faqByPage[pageKey] ?? globalFaqItems
}
