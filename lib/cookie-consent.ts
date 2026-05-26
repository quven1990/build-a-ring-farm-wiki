export const COOKIE_CONSENT_COOKIE = "barw_cookie_consent_v1"

export type CookieConsentValue = "accepted" | "rejected"

export function isValidCookieConsentValue(value: string | null): value is CookieConsentValue {
  return value === "accepted" || value === "rejected"
}

