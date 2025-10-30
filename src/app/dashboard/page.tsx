'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  FileText, 
  BookOpen, 
  Eye,
  MousePointerClick
} from 'lucide-react'

// Mock data - nanti akan diambil dari database/API
const stats = [
  {
    title: 'Total Pengunjung',
    value: '2,543',
    change: '+12.5%',
    icon: Eye,
    color: 'text-blue-600',
  },
  {
    title: 'Pendaftaran Baru',
    value: '43',
    change: '+8.2%',
    icon: Users,
    color: 'text-green-600',
  },
  {
    title: 'Artikel Published',
    value: '28',
    change: '+4',
    icon: FileText,
    color: 'text-purple-600',
  },
  {
    title: 'Program Aktif',
    value: '12',
    change: '+2',
    icon: BookOpen,
    color: 'text-orange-600',
  },
]

const recentActivity = [
  {
    action: 'Artikel baru dipublish',
    detail: 'Manfaat Metode Montessori untuk Perkembangan Anak',
    time: '2 jam yang lalu',
  },
  {
    action: 'Pendaftaran baru',
    detail: 'Sarah Johnson mendaftarkan anaknya',
    time: '5 jam yang lalu',
  },
  {
    action: 'Program diupdate',
    detail: 'Sensorial Learning - jadwal diperbarui',
    time: '1 hari yang lalu',
  },
  {
    action: 'Karyawan ditambahkan',
    detail: 'Ibu Dewi Lestari - Tenaga Pendidik',
    time: '2 hari yang lalu',
  },
]

const topPages = [
  { page: '/aktivitas', views: 1234, percentage: 35 },
  { page: '/profil', views: 987, percentage: 28 },
  { page: '/pendaftaran', views: 654, percentage: 18 },
  { page: '/artikel', views: 432, percentage: 12 },
  { page: '/', views: 234, percentage: 7 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang di admin panel Zivana Montessori School
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> dari bulan lalu
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Update terkini dari website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Halaman Terpopuler</CardTitle>
            <CardDescription>
              Halaman dengan pengunjung terbanyak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{page.page}</span>
                    <span className="text-muted-foreground">{page.views} views</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Traffic</CardTitle>
          <CardDescription>
            Statistik pengunjung website bulan ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">12,543</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">8,234</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <MousePointerClick className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Click Through Rate</p>
                <p className="text-2xl font-bold">24.5%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
