import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Target, Eye, Award as AwardIcon } from 'lucide-react'

type Employee = {
  id: string
  name: string
  position: string
  imageUrl: string | null
  level: string
  order: number
}

type Award = {
  id: string
  title: string
  imageUrl: string
  year: number | null
  order: number
  createdAt: string
}

async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/employees`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    return []
  }
}

async function getAwards(): Promise<Award[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/awards`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch awards:', error)
    return []
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    PIMPINAN: 'Pimpinan Sekolah',
    TENAGA_PENDIDIK: 'Tenaga Pendidik',
    TENAGA_KEPENDIDIKAN: 'Tenaga Kependidikan',
    TENAGA_OPERASIONAL: 'Tenaga Operasional'
  }
  return labels[level] || level
}

export default async function ProfilPage() {
  const employees = await getEmployees()
  const awards = await getAwards()
  
  // Group employees by level
  const pimpinan = employees.filter(e => e.level === 'PIMPINAN')
  const pendidik = employees.filter(e => e.level === 'TENAGA_PENDIDIK')
  const kependidikan = employees.filter(e => e.level === 'TENAGA_KEPENDIDIKAN')
  const operasional = employees.filter(e => e.level === 'TENAGA_OPERASIONAL')
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Sekolah</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Mengenal lebih dekat Zivana Montessori School dan tim pengajar kami
          </p>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Sejarah Singkat</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                Zivana Montessori School didirikan pada tahun 2015 dengan visi untuk memberikan 
                pendidikan berkualitas tinggi berbasis metode Montessori kepada anak-anak usia dini 
                di Indonesia. Berawal dari sebuah rumah sederhana dengan hanya 15 murid, kini kami 
                telah berkembang menjadi salah satu taman kanak-kanak Montessori terkemuka.
              </p>
              <p className="text-muted-foreground mb-4">
                Nama &quot;Zivana&quot; berasal dari bahasa Sanskrit yang berarti &quot;penuh kehidupan&quot; dan 
                &quot;bersinar&quot;, mencerminkan komitmen kami untuk membantu setiap anak mengembangkan 
                potensi mereka dan bersinar dengan kemampuan unik mereka masing-masing.
              </p>
              <p className="text-muted-foreground">
                Dengan pengalaman lebih dari 8 tahun dalam dunia pendidikan anak usia dini, kami 
                telah membantu ratusan anak mengembangkan fondasi yang kuat untuk kesuksesan 
                akademik dan sosial mereka di masa depan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Visi Misi Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Visi */}
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi lembaga pendidikan anak usia dini terdepan yang menghasilkan generasi 
                  mandiri, kreatif, dan berkarakter kuat melalui pendekatan Montessori yang holistik 
                  dan humanis.
                </p>
              </CardContent>
            </Card>

            {/* Misi */}
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Menerapkan metode Montessori secara autentik dan konsisten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Mengembangkan potensi unik setiap anak secara optimal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Menciptakan lingkungan belajar yang aman, nyaman, dan inspiratif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Membangun kemitraan yang kuat dengan orang tua</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Tim Karyawan Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Tim Kami</h2>

          {employees.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Belum ada data karyawan.</p>
            </div>
          ) : (
            <>
              {/* Pimpinan Sekolah */}
              {pimpinan.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Pimpinan Sekolah</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pimpinan.map((emp) => (
                      <Card key={emp.id}>
                        <CardHeader className="text-center">
                          <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-3xl font-bold text-primary">{getInitials(emp.name)}</span>
                          </div>
                          <CardTitle>{emp.name}</CardTitle>
                          <Badge className="w-fit mx-auto mt-2">{emp.position}</Badge>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Tenaga Pendidik */}
              {pendidik.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Tenaga Pendidik</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pendidik.map((emp) => (
                      <Card key={emp.id}>
                        <CardHeader className="text-center">
                          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">{getInitials(emp.name)}</span>
                          </div>
                          <CardTitle className="text-lg">{emp.name}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-2">{emp.position}</p>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Tenaga Kependidikan */}
              {kependidikan.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Tenaga Kependidikan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kependidikan.map((emp) => (
                      <Card key={emp.id}>
                        <CardHeader className="text-center">
                          <div className="w-20 h-20 bg-secondary/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl font-bold text-secondary-foreground">{getInitials(emp.name)}</span>
                          </div>
                          <CardTitle className="text-lg">{emp.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{emp.position}</p>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Tenaga Operasional */}
              {operasional.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6">Tenaga Operasional</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {operasional.map((emp) => (
                      <Card key={emp.id}>
                        <CardHeader className="text-center">
                          <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl font-bold">{getInitials(emp.name)}</span>
                          </div>
                          <CardTitle className="text-lg">{emp.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">{emp.position}</p>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Penghargaan Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Penghargaan Kami</h2>
          
          {awards.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Belum ada data penghargaan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {awards.map((award) => (
                <Card key={award.id} className="text-center border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    {award.imageUrl ? (
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                        <img 
                          src={award.imageUrl} 
                          alt={award.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <AwardIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    )}
                    {award.year && <Badge className="w-fit mx-auto mb-2">{award.year}</Badge>}
                    <CardTitle className="text-lg">{award.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
