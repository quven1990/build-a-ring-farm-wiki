import { Header } from "@/components/wiki/header"
import { Footer } from "@/components/wiki/footer"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-w-0">{children}</main>
      <Footer />
    </div>
  )
}
