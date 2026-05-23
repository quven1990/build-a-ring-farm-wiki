/** Weather mutation events — source: https://buildaringfarm.net/events/ */
export type WeatherEvent = {
  name: string
  emoji: string
  eventChancePercent: number
  rollChancePercent: number
  multiplier: number
  mutationName: string
  mutationEmoji: string
}

export const weatherEvents: WeatherEvent[] = [
  {
    name: "Rain",
    emoji: "🌧️",
    eventChancePercent: 40,
    rollChancePercent: 8,
    multiplier: 1.5,
    mutationName: "Wet",
    mutationEmoji: "💧",
  },
  {
    name: "Blizzard",
    emoji: "❄️",
    eventChancePercent: 20,
    rollChancePercent: 4,
    multiplier: 1.75,
    mutationName: "Frozen",
    mutationEmoji: "❄️",
  },
  {
    name: "Black Hole",
    emoji: "🌑",
    eventChancePercent: 12,
    rollChancePercent: 3,
    multiplier: 2.25,
    mutationName: "Void",
    mutationEmoji: "🌑",
  },
  {
    name: "Nuclear",
    emoji: "☢️",
    eventChancePercent: 7,
    rollChancePercent: 2,
    multiplier: 3,
    mutationName: "Radioactive",
    mutationEmoji: "☢️",
  },
  {
    name: "Galaxy",
    emoji: "🌌",
    eventChancePercent: 4,
    rollChancePercent: 1,
    multiplier: 5,
    mutationName: "Rainbow",
    mutationEmoji: "🌈",
  },
]

export function formatEventChance(percent: number): string {
  return `${percent}%`
}

export function formatRollChance(percent: number): string {
  return `${percent}%`
}

export function effectiveMutationRate(
  eventChancePercent: number,
  rollChancePercent: number
): number {
  return (eventChancePercent / 100) * (rollChancePercent / 100) * 100
}

export const eventsFaq = [
  {
    question: "Can multiple events happen at the same time?",
    answer:
      "Events operate independently. Each plant receives its mutation roll from whichever event triggered for it. The mutation applied depends on the event that rolled successfully for that specific plant.",
  },
  {
    question: "Does the event chance change based on farm size?",
    answer:
      "Event activation chances are global and do not scale with farm size. However, having more plants means more independent mutation rolls during an active event, increasing the probability of at least one successful mutation.",
  },
  {
    question: "Should I harvest during every event?",
    answer:
      "Yes — even a Rain event with Wet (1.5x) provides bonus income. For high-level crops, waiting for Nuclear (3x) or Galaxy (5x) events maximizes return. The decision depends on your current progression stage.",
  },
  {
    question: "How do 1–3 independent rolls work?",
    answer:
      "When an event activates, each plant receives between 1 and 3 separate mutation rolls. Each roll is independent — one success does not affect other rolls. With 2 rolls at 8% (Rain), the chance of at least one Wet mutation is 15.36% per plant.",
  },
]
