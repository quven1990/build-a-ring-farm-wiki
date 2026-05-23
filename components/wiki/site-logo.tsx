import Image from "next/image"
import { cn } from "@/lib/utils"

type SiteLogoProps = {
  size?: number
  className?: string
}

export function SiteLogo({ size = 36, className }: SiteLogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Build A Ring Farm wiki logo"
      width={453}
      height={453}
      className={cn("shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
      priority
    />
  )
}
