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
  /** Newly added or recently changed code. Used for display ordering. */
  isNew?: boolean
}

export const wikiCodes: WikiCode[] = [
  {
    code: "PLANTRUSH",
    reward: "Plant Rush Boss Box x1",
    status: "needs-testing",
    lastChecked: defaultLastChecked,
    isNew: true,
  },
  { code: "UPDATE2", reward: "Tropical Seed Pack x1", status: "community", lastChecked: defaultLastChecked },
  { code: "THANKYOU", reward: "Autumn Spray x1", status: "community", lastChecked: defaultLastChecked },
  { code: "BARF:3", reward: "Acid Spray x1", status: "community", lastChecked: defaultLastChecked },
  { code: "2KLIKES", reward: "Tropical Seed Pack", status: "needs-testing", lastChecked: defaultLastChecked },
  { code: "UPDATE1", reward: "Strong Fertilizer x3", status: "needs-testing", lastChecked: defaultLastChecked },
  { code: "100KVISITS", reward: "5-minute Time Skip", status: "needs-testing", lastChecked: defaultLastChecked },
]

/** Display ordering: new codes first, then keep the existing list order. */
export const wikiCodesSorted = [...wikiCodes].sort((a, b) => {
  const aNew = a.isNew ? 1 : 0
  const bNew = b.isNew ? 1 : 0
  return bNew - aNew
})
