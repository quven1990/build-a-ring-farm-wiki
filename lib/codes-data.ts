export type CodeStatus = "verified" | "community" | "needs-testing"

export type LastCheckedDate = {
  year: number
  month: number
}

/** English month + year, e.g. May 2026 for 2026-05 */
export function formatLastCheckedDate({ year, month }: LastCheckedDate): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1))
}

export const defaultLastChecked: LastCheckedDate = { year: 2026, month: 5 }

export type WikiCode = {
  code: string
  reward: string
  status: CodeStatus
  lastChecked: LastCheckedDate
}

export const wikiCodes: WikiCode[] = [
  { code: "UPDATE2", reward: "Tropical Seed Pack", status: "community", lastChecked: defaultLastChecked },
  { code: "THANKYOU", reward: "Autumn Spray", status: "community", lastChecked: defaultLastChecked },
  { code: "BARF:3", reward: "Acid Spray", status: "community", lastChecked: defaultLastChecked },
  { code: "100KVISITS", reward: "5-Minute Time Skip", status: "needs-testing", lastChecked: defaultLastChecked },
  { code: "2KLIKES", reward: "Tropical Seed Pack", status: "needs-testing", lastChecked: defaultLastChecked },
  { code: "UPDATE1", reward: "Powerful Fertilizer x3", status: "needs-testing", lastChecked: defaultLastChecked },
]
