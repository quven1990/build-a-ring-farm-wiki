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
      question: "What can I do on buildaring.online?",
      answer:
        "Browse the seed database, mutation matrix, weather events, ring multipliers, active codes, profit calculator, and written guides. Each section is designed for a different planning task — codes for free rewards, calculator for harvest math, seeds for crop comparison.",
    },
    {
      question: "How often is the site updated?",
      answer:
        "Codes and balance-sensitive tables are reviewed when the community reports changes. Check the update log page for a summary of recent edits. Major patches may take a few days to reflect everywhere.",
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
        "An automated job scans public code lists every Monday and updates this page. The banner at the top shows the last sync time and which sources were checked. We never mark codes as in-game verified unless explicitly tested.",
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
  ],
  "build-a-ring-codes": [
    {
      question: "Are expired codes listed here?",
      answer:
        "We focus on active and recently tested strings. The update log notes when community reports suggest a code stopped working. Remove dead codes from your personal list.",
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
}

export function getFaqForPage(pageKey: string): FAQEntry[] {
  return faqByPage[pageKey] ?? globalFaqItems
}
