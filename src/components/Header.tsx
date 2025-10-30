'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { title: 'Beranda', href: '/' },
  { title: 'Aktivitas', href: '/aktivitas' },
  { title: 'Profil', href: '/profil' },
  { title: 'Artikel', href: '/artikel' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Zivana Montessori School</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md",
                isActive(item.href) && "bg-primary/10 text-primary font-bold border-b-2 border-primary"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link href="/pendaftaran">
            <Button>Daftar Sekarang</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="icon">
              <LogIn className="h-4 w-4" />
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container flex flex-col gap-4 py-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md",
                  isActive(item.href) && "bg-primary/10 text-primary font-bold border-l-4 border-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/pendaftaran" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Daftar Sekarang</Button>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Login Admin
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
