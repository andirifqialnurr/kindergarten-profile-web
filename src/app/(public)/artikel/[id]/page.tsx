import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

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

async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/articles/${id}`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    const article: Article = await res.json()
    // Hanya tampilkan artikel yang published
    if (!article.published) return null
    return article
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

async function getRelatedArticles(currentId: string, category: string): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/articles`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    const articles: Article[] = await res.json()
    // Filter artikel published dengan kategori sama, exclude artikel saat ini, ambil 2 artikel
    return articles
      .filter(a => a.published && a.category === category && a.id !== currentId)
      .slice(0, 2)
  } catch (error) {
    console.error('Failed to fetch related articles:', error)
    return []
  }
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getArticle(id)
  
  if (!article) {
    notFound()
  }
  
  const relatedArticles = await getRelatedArticles(article.id, article.category)
  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-6 border-b">
        <div className="container">
          <Link href="/artikel">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Artikel
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container max-w-4xl">
          {/* Category Badge */}
          <Badge className="mb-4">{article.category}</Badge>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
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

          <Separator className="mb-8" />

          {/* Featured Image */}
          {article.imageUrl ? (
            <div className="w-full h-96 rounded-lg mb-8 overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-muted rounded-lg mb-8 flex items-center justify-center">
              <span className="text-muted-foreground">Tidak ada gambar</span>
            </div>
          )}

          {/* Content */}
          <Card>
            <CardContent className="prose prose-lg max-w-none pt-6">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </CardContent>
          </Card>

          {/* Share Section */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Bagikan Artikel Ini</h3>
            <div className="flex gap-4">
              <Button variant="outline">Facebook</Button>
              <Button variant="outline">Twitter</Button>
              <Button variant="outline">WhatsApp</Button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedArticle.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {new Date(relatedArticle.publishedAt || relatedArticle.createdAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <Link href={`/artikel/${relatedArticle.id}`}>
                        <Button variant="outline" size="sm">Baca</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
