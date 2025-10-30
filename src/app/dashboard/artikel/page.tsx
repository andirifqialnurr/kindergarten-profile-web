'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash, Eye, Loader2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

type Article = {
  id: string
  title: string
  content: string
  author: string
  imageUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function ArtikelDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    imageUrl: '',
    published: false,
  })

  // Fetch articles
  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/articles')
      if (!response.ok) throw new Error('Failed to fetch articles')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      toast.error('Gagal memuat data artikel')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  // Add article
  const handleAddArticle = async () => {
    if (!formData.title || !formData.content || !formData.author) {
      toast.error('Judul, konten, dan penulis harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create article')

      toast.success('Artikel berhasil ditambahkan')
      setIsAddModalOpen(false)
      setFormData({ title: '', content: '', author: '', imageUrl: '', published: false })
      fetchArticles()
    } catch (error) {
      toast.error('Gagal menambahkan artikel')
    } finally {
      setSubmitting(false)
    }
  }

  // Edit article
  const handleEditArticle = async () => {
    if (!selectedArticle || !formData.title || !formData.content || !formData.author) {
      toast.error('Judul, konten, dan penulis harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update article')

      toast.success('Artikel berhasil diupdate')
      setIsEditModalOpen(false)
      setSelectedArticle(null)
      setFormData({ title: '', content: '', author: '', imageUrl: '', published: false })
      fetchArticles()
    } catch (error) {
      toast.error('Gagal mengupdate artikel')
    } finally {
      setSubmitting(false)
    }
  }

  // Delete article
  const handleDeleteArticle = async () => {
    if (!selectedArticle) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete article')

      toast.success('Artikel berhasil dihapus')
      setIsDeleteDialogOpen(false)
      setSelectedArticle(null)
      fetchArticles()
    } catch (error) {
      toast.error('Gagal menghapus artikel')
    } finally {
      setSubmitting(false)
    }
  }

  // Open edit modal
  const openEditModal = (article: Article) => {
    setSelectedArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      author: article.author,
      imageUrl: article.imageUrl || '',
      published: article.published,
    })
    setIsEditModalOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (article: Article) => {
    setSelectedArticle(article)
    setIsDeleteDialogOpen(true)
  }

  // Open view modal
  const openViewModal = (article: Article) => {
    setSelectedArticle(article)
    setIsViewModalOpen(true)
  }

  // Calculate stats
  const publishedCount = articles.filter(a => a.published).length
  const draftCount = articles.filter(a => !a.published).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Artikel & Berita</h2>
        <p className="text-muted-foreground">
          Kelola artikel dan berita sekolah
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Artikel</CardTitle>
              <CardDescription>
                Semua artikel dan berita yang telah dibuat
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Artikel Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada artikel. Buat artikel pertama Anda!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-md">
                      {article.title}
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      {article.published ? (
                        <Badge variant="default">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Lihat"
                          onClick={() => openViewModal(article)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Edit"
                          onClick={() => openEditModal(article)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Hapus"
                          onClick={() => openDeleteDialog(article)}
                        >
                          <Trash className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
            <p className="text-xs text-muted-foreground">Total artikel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
            <p className="text-xs text-muted-foreground">
              {articles.length > 0 ? Math.round((publishedCount / articles.length) * 100) : 0}% dari total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}</div>
            <p className="text-xs text-muted-foreground">Menunggu publish</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Article Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Buat Artikel Baru</DialogTitle>
            <DialogDescription>
              Isi informasi artikel yang ingin dipublikasikan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="add-title">Judul Artikel</Label>
              <Input
                id="add-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Manfaat Metode Montessori untuk Anak"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-author">Penulis</Label>
              <Input
                id="add-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Nama penulis"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-imageUrl">URL Gambar (opsional)</Label>
              <Input
                id="add-imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-content">Konten Artikel</Label>
              <Textarea
                id="add-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis konten artikel di sini..."
                rows={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="add-published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="add-published" className="cursor-pointer">
                Publish artikel sekarang
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddModalOpen(false)
                setFormData({ title: '', content: '', author: '', imageUrl: '', published: false })
              }}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleAddArticle} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Buat Artikel'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Article Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Artikel</DialogTitle>
            <DialogDescription>
              Ubah informasi artikel
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-title">Judul Artikel</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Manfaat Metode Montessori untuk Anak"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-author">Penulis</Label>
              <Input
                id="edit-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Nama penulis"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-imageUrl">URL Gambar (opsional)</Label>
              <Input
                id="edit-imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-content">Konten Artikel</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis konten artikel di sini..."
                rows={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="edit-published" className="cursor-pointer">
                Publish artikel
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditModalOpen(false)
                setSelectedArticle(null)
                setFormData({ title: '', content: '', author: '', imageUrl: '', published: false })
              }}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleEditArticle} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Article Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
            <DialogDescription>
              Oleh {selectedArticle?.author} • {selectedArticle && new Date(selectedArticle.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedArticle?.imageUrl && (
              <div className="rounded-lg overflow-hidden border">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            )}
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-sm">
                {selectedArticle?.content}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              {selectedArticle?.published ? (
                <Badge variant="default">Published</Badge>
              ) : (
                <Badge variant="secondary">Draft</Badge>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsViewModalOpen(false)
                setSelectedArticle(null)
              }}
            >
              Tutup
            </Button>
            <Button onClick={() => {
              setIsViewModalOpen(false)
              if (selectedArticle) openEditModal(selectedArticle)
            }}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Artikel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Artikel &quot;{selectedArticle?.title}&quot; akan dihapus permanen. 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteArticle}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus Artikel'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
