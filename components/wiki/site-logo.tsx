import Image from "next/image"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  size?: number
  className?: string
}

const logoSizeClass: Record<number, string> = {
  36: "size-9",
  40: "size-10",
  48: "size-12",
}

export function SiteLogo({ size = 36, className }: SiteLogoProps) {
  return (
    <Image
      src="/images/logo.webp"
      alt="Build A Ring Farm wiki logo"
      width={144}
      height={144}
      className={cn(
        "shrink-0 rounded-full object-cover",
        logoSizeClass[size] ?? "size-9",
        className
      )}
      priority
    />
  )
}
