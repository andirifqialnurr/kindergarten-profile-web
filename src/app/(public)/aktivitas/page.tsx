import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BookOpen, Clock } from 'lucide-react'

type Program = {
  id: string
  name: string
  description: string
  schedule: string | null
  imageUrl: string | null
}

type Schedule = {
  id: string
  time: string
  activity: string
  order: number
}

async function getPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/programs`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch programs:', error)
    return []
  }
}

async function getSchedules(): Promise<Schedule[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/schedules`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch schedules:', error)
    return []
  }
}

export default async function AktivitasPage() {
  const programs = await getPrograms()
  const schedules = await getSchedules()
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aktivitas Sekolah</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Berbagai program dan kegiatan yang dirancang untuk mengembangkan 
            potensi anak secara optimal melalui metode Montessori
          </p>
        </div>
      </section>

      {/* Kurikulum Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Kurikulum Montessori</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                Kami menerapkan kurikulum Montessori yang berfokus pada pembelajaran mandiri 
                dan eksplorasi. Metode ini mengembangkan kemandirian, kreativitas, dan rasa 
                ingin tahu anak melalui pengalaman langsung dengan material pembelajaran yang 
                dirancang khusus.
              </p>
              <p className="text-muted-foreground">
                Kurikulum kami mencakup lima area pembelajaran utama: Practical Life, Sensorial, 
                Language, Mathematics, dan Cultural Studies. Setiap area dirancang untuk 
                membangun fondasi kuat bagi perkembangan akademik dan sosial anak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Program Pembelajaran Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Program Pembelajaran Unggulan</h2>
          
          {programs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Belum ada program pembelajaran yang tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{program.name}</CardTitle>
                    {program.schedule && (
                      <Badge className="w-fit mt-2">{program.schedule}</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {program.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Jadwal Sekolah Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Jadwal Sekolah</h2>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Jadwal Harian
                </CardTitle>
                <CardDescription>
                  Rundown kegiatan sekolah dari awal hingga akhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                {schedules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Belum ada jadwal tersedia
                  </div>
                ) : (
                  <div className="space-y-4">
                    {schedules.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                        <div className="min-w-[140px] font-semibold text-primary">
                          {item.time}
                        </div>
                        <div className="text-muted-foreground">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Catatan:</strong> Jadwal dapat disesuaikan tergantung pada kegiatan khusus 
                atau acara sekolah. Orang tua akan diberitahu sebelumnya jika ada perubahan jadwal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
