'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  BookOpen, 
  Newspaper, 
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Aktivitas Sekolah',
    href: '/dashboard/aktivitas',
    icon: BookOpen,
  },
  {
    title: 'Artikel & Berita',
    href: '/dashboard/artikel',
    icon: Newspaper,
  },
  {
    title: 'Manajemen',
    href: '/dashboard/manajemen',
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [adminName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminName') || 'Admin'
    }
    return 'Admin'
  })
  const [adminEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminEmail') || 'admin@zivana.com'
    }
    return 'admin@zivana.com'
  })

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminName')
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-card border-r transition-all duration-300 lg:translate-x-0',
          isMinimized ? 'w-16' : 'w-64',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isMinimized && <h2 className="text-lg font-semibold">Admin Panel</h2>}
          <Button
            variant="ghost"
            size="icon"
            className="lg:flex hidden"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex flex-col gap-2 p-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full gap-3',
                    isMinimized ? 'justify-center px-2' : 'justify-start',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  title={isMinimized ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isMinimized && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-2 border-t">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={cn(
                'w-full gap-3',
                isMinimized ? 'justify-center px-2' : 'justify-start'
              )}
              title={isMinimized ? 'Kembali ke Website' : undefined}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isMinimized && <span>Kembali ke Website</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={cn(
        'flex-1 transition-all duration-300',
        isMinimized ? 'lg:ml-16' : 'lg:ml-64'
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              Zivana Montessori School
            </h1>
          </div>

          {/* Admin Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block text-left" suppressHydrationWarning>
                  <p className="text-sm font-medium" suppressHydrationWarning>{adminName}</p>
                  <p className="text-xs text-muted-foreground" suppressHydrationWarning>{adminEmail}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
