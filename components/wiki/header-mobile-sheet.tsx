"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ExternalLink } from "lucide-react"
import { SiteLogo } from "@/components/wiki/site-logo"
import { navItems, siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const navLinkClass =
  "block w-full rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"

type HeaderMobileSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isActive: (href: string) => boolean
}

/** Client-only mobile nav — avoids Radix Dialog mutating <body> during SSR hydration. */
export function HeaderMobileSheet({
  open,
  onOpenChange,
  isActive,
}: HeaderMobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName="z-[100]"
        className="z-[100] w-[280px] overflow-y-auto sm:w-[350px]"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex flex-col gap-4 pt-8">
          <div className="flex items-center gap-2.5 border-b pb-4">
            <SiteLogo size={36} />
            <span className="font-bold text-foreground">Build A Ring Farm</span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    navLinkClass,
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <Button asChild className="mt-4" variant="secondary">
            <a
              href={siteConfig.robloxGameUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Play on Roblox
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
