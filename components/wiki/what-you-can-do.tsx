import { CheckCircle2 } from "lucide-react"

type WhatYouCanDoProps = {
  items: string[]
}

export function WhatYouCanDo({ items }: WhatYouCanDoProps) {
  if (!items.length) return null

  return (
    <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5">
      <h2 className="mb-3 text-lg font-semibold text-foreground">What you can do on this page</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted-foreground sm:text-base">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
