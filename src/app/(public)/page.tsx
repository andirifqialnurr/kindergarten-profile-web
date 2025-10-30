import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Trophy, Heart, Star, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-accent py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Selamat Datang di <span className="text-primary">Zivana Montessori School</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Taman Kanak-kanak dengan Metode Montessori yang Mengutamakan 
              Perkembangan Anak Secara Holistik dan Menyenangkan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pendaftaran">
                <Button size="lg" className="w-full sm:w-auto">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/profil">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih Zivana Montessori?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami menawarkan pendidikan berkualitas dengan pendekatan yang unik 
              dan disesuaikan dengan kebutuhan setiap anak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Keunggulan 1 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Kurikulum Montessori</CardTitle>
                <CardDescription>
                  Metode pembelajaran yang terbukti efektif mengembangkan 
                  kemandirian dan kreativitas anak
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Keunggulan 2 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Guru Berpengalaman</CardTitle>
                <CardDescription>
                  Tim pengajar tersertifikasi dan berpengalaman dalam 
                  pendidikan anak usia dini
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Keunggulan 3 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Berprestasi</CardTitle>
                <CardDescription>
                  Berbagai penghargaan dan prestasi yang telah diraih 
                  oleh sekolah dan siswa-siswi kami
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Keunggulan 4 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Lingkungan Nyaman</CardTitle>
                <CardDescription>
                  Fasilitas lengkap dan lingkungan belajar yang aman, 
                  nyaman, dan kondusif untuk anak
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Keunggulan 5 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Program Unggulan</CardTitle>
                <CardDescription>
                  Beragam program ekstrakurikuler dan kegiatan yang 
                  mengembangkan bakat dan minat anak
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Keunggulan 6 */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Kelas Kecil</CardTitle>
                <CardDescription>
                  Rasio guru dan murid yang ideal untuk pembelajaran 
                  yang lebih personal dan efektif
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memberikan Pendidikan Terbaik untuk Anak Anda?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Daftarkan anak Anda sekarang dan jadilah bagian dari keluarga besar 
              Zivana Montessori School. Proses pendaftaran mudah dan cepat!
            </p>
            <Link href="/pendaftaran">
              <Button size="lg" variant="secondary" className="font-semibold">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Program Unggulan Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai aktivitas dan program yang dirancang khusus untuk 
              mengembangkan potensi anak secara optimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sensorial Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Program pembelajaran melalui panca indera yang membantu 
                  anak mengeksplorasi dunia di sekitarnya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practical Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kegiatan praktis sehari-hari yang mengajarkan kemandirian 
                  dan keterampilan hidup dasar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Arts & Crafts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kegiatan seni dan kerajinan untuk mengembangkan kreativitas 
                  dan kemampuan motorik halus anak.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/aktivitas">
              <Button variant="outline">
                Lihat Semua Program
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
