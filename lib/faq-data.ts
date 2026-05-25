export type FAQEntry = {
  question: string
  answer: string
}

export const globalFaqItems: FAQEntry[] = [
  {
    question: "Are the codes on this wiki verified?",
    answer:
      'We label codes in three tiers: "Verified" means confirmed by multiple sources; "Community Reported" means player-submitted and may expire; "Needs Testing" is unconfirmed. Codes can break after updates — always check in-game.',
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
        "More independent rolls mean more expected procs. Fill every unlocked slot when Black Hole, Galaxy, or similar events are active if your crops are mature.",
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
