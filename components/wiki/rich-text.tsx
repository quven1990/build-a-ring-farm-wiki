import Link from "next/link"
import { cn } from "@/lib/utils"

/** Renders markdown-style [label](href) links without nesting <a> inside <p> (invalid HTML). */
export function RichText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <div className={cn("text-pretty leading-relaxed", className)}>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (match) {
          return (
            <Link
              key={i}
              href={match[2]}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {match[1]}
            </Link>
          )
        }
        return part ? <span key={i}>{part}</span> : null
      })}
    </div>
  )
}
