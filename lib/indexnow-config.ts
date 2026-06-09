import { siteConfig } from "@/lib/site-config"

/** IndexNow API key — must match `public/{key}.txt` hosted at site root. */
export const indexNowKey = "0952a95079fc4202a3e4e31cc73d59c7"

export const indexNowHost = new URL(siteConfig.url).hostname

export function indexNowKeyLocation(origin = siteConfig.url): string {
  const base = origin.replace(/\/$/, "")
  return `${base}/${indexNowKey}.txt`
}
