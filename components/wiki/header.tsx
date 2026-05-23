"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ExternalLink } from "lucide-react"
import { SiteLogo } from "@/components/wiki/site-logo"
import { navItems, siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <SiteLogo size={36} />
          <span className="hidden font-bold text-foreground sm:inline-block">
            Build A Ring Farm
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
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
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex" variant="secondary">
            <a
              href={siteConfig.robloxGameUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Play on Roblox
            </a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-4 pt-8">
                <div className="flex items-center gap-2.5 border-b pb-4">
                  <SiteLogo size={36} />
                  <span className="font-bold text-foreground">
                    Build A Ring Farm
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        navLinkClass,
                        "text-left",
                        isActive(item.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
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
        </div>
      </div>
    </header>
  )
}
