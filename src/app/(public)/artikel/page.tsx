import Link from 'next/link'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User } from 'lucide-react'

type Article = {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  imageUrl: string | null
  category: string
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

async function getPublishedArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/articles`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const articles: Article[] = await res.json()
    // Filter hanya artikel yang published
    return articles.filter(article => article.published)
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }
}

export default async function ArtikelPage() {
  const articles = await getPublishedArticles()
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artikel & Berita</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Informasi terkini seputar pendidikan anak, kegiatan sekolah, dan tips untuk orang tua
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container">
          {articles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Belum ada artikel yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="flex flex-col">
                  <CardHeader>
                    {/* Image Placeholder or Real Image */}
                    {article.imageUrl ? (
                      <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Tidak ada gambar</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                    
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    
                    <CardDescription className="line-clamp-3 mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="mt-auto flex-col items-start gap-4">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground w-full">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    
                    <Link href={`/artikel/${article.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
