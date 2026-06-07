import { buildLlmsTxtBody } from "@/lib/geo-summaries"

/** Dynamic llms.txt — code/mutation counts stay current after sync. */
export const revalidate = 86400

export function GET() {
  const body = buildLlmsTxtBody()
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
