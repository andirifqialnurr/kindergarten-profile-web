'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash, Image as ImageIcon, Loader2 } from 'lucide-react'
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
import { toast } from 'sonner'

type Program = {
  id: string
  name: string
  description: string
  images: { id: string }[]
  createdAt: string
  updatedAt: string
}

export default function AktivitasDashboardPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const [imageFormData, setImageFormData] = useState({
    url: '',
    caption: '',
  })

  // Fetch programs
  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/programs')
      if (!response.ok) throw new Error('Failed to fetch programs')
      const data = await response.json()
      setPrograms(data)
    } catch (error) {
      toast.error('Gagal memuat data program')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  // Add program
  const handleAddProgram = async () => {
    if (!formData.name || !formData.description) {
      toast.error('Nama dan deskripsi harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create program')

      toast.success('Program berhasil ditambahkan')
      setIsAddModalOpen(false)
      setFormData({ name: '', description: '' })
      fetchPrograms()
    } catch (error) {
      toast.error('Gagal menambahkan program')
    } finally {
      setSubmitting(false)
    }
  }

  // Edit program
  const handleEditProgram = async () => {
    if (!selectedProgram || !formData.name || !formData.description) {
      toast.error('Nama dan deskripsi harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`/api/programs/${selectedProgram.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update program')

      toast.success('Program berhasil diupdate')
      setIsEditModalOpen(false)
      setSelectedProgram(null)
      setFormData({ name: '', description: '' })
      fetchPrograms()
    } catch (error) {
      toast.error('Gagal mengupdate program')
    } finally {
      setSubmitting(false)
    }
  }

  // Delete program
  const handleDeleteProgram = async () => {
    if (!selectedProgram) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/programs/${selectedProgram.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete program')

      toast.success('Program berhasil dihapus')
      setIsDeleteDialogOpen(false)
      setSelectedProgram(null)
      fetchPrograms()
    } catch (error) {
      toast.error('Gagal menghapus program')
    } finally {
      setSubmitting(false)
    }
  }

  // Add image to program
  const handleAddImage = async () => {
    if (!selectedProgram || !imageFormData.url) {
      toast.error('URL gambar harus diisi')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`/api/programs/${selectedProgram.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageFormData),
      })

      if (!response.ok) throw new Error('Failed to add image')

      toast.success('Foto berhasil ditambahkan')
      setImageFormData({ url: '', caption: '' })
      fetchPrograms()
    } catch (error) {
      toast.error('Gagal menambahkan foto')
    } finally {
      setSubmitting(false)
    }
  }

  // Open edit modal
  const openEditModal = (program: Program) => {
    setSelectedProgram(program)
    setFormData({
      name: program.name,
      description: program.description,
    })
    setIsEditModalOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (program: Program) => {
    setSelectedProgram(program)
    setIsDeleteDialogOpen(true)
  }

  // Open image modal
  const openImageModal = (program: Program) => {
    setSelectedProgram(program)
    setIsImageModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Aktivitas Sekolah</h2>
        <p className="text-muted-foreground">
          Kelola program sekolah dan dokumentasi kegiatan
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Program Sekolah</CardTitle>
              <CardDescription>
                Daftar program pembelajaran yang tersedia
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Program
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada program. Tambahkan program pertama Anda!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Program</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Dokumentasi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">
                      {program.name}
                    </TableCell>
                    <TableCell className="max-w-md text-muted-foreground">
                      {program.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {program.images.length} foto
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Kelola Foto"
                          onClick={() => openImageModal(program)}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Edit"
                          onClick={() => openEditModal(program)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Hapus"
                          onClick={() => openDeleteDialog(program)}
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

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
            <p className="text-xs text-muted-foreground">Program aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Dokumentasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((acc, p) => acc + p.images.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Foto kegiatan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Update Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.length > 0 
                ? new Date(programs[0].updatedAt).toLocaleDateString('id-ID')
                : '-'
              }
            </div>
            <p className="text-xs text-muted-foreground">Terakhir diubah</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Program Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Program Baru</DialogTitle>
            <DialogDescription>
              Isi informasi program pembelajaran yang ingin ditambahkan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="add-name">Nama Program</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Sensorial Learning"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="add-description">Deskripsi</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan tentang program ini..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleAddProgram} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Tambah Program'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Program Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>
              Ubah informasi program pembelajaran
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-name">Nama Program</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Sensorial Learning"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan tentang program ini..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditModalOpen(false)
                setSelectedProgram(null)
                setFormData({ name: '', description: '' })
              }}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleEditProgram} disabled={submitting}>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Program &quot;{selectedProgram?.name}&quot; akan dihapus permanen. 
              Semua foto yang terkait juga akan dihapus. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProgram}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus Program'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Manage Images Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kelola Foto - {selectedProgram?.name}</DialogTitle>
            <DialogDescription>
              Tambahkan foto dokumentasi untuk program ini
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium">Tambah Foto Baru</h4>
              <div className="space-y-1">
                <Label htmlFor="image-url">URL Gambar</Label>
                <Input
                  id="image-url"
                  value={imageFormData.url}
                  onChange={(e) => setImageFormData({ ...imageFormData, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="image-caption">Caption (opsional)</Label>
                <Input
                  id="image-caption"
                  value={imageFormData.caption}
                  onChange={(e) => setImageFormData({ ...imageFormData, caption: e.target.value })}
                  placeholder="Deskripsi foto..."
                />
              </div>
              <Button onClick={handleAddImage} disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menambahkan...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Foto
                  </>
                )}
              </Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">
                Foto yang Ada ({selectedProgram?.images.length || 0})
              </h4>
              {selectedProgram && selectedProgram.images.length > 0 ? (
                <div className="text-sm text-muted-foreground">
                  {selectedProgram.images.length} foto tersimpan
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Belum ada foto untuk program ini
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsImageModalOpen(false)
                setSelectedProgram(null)
                setImageFormData({ url: '', caption: '' })
              }}
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            Tips Manajemen Dokumentasi
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 dark:text-blue-200">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Gunakan foto dengan resolusi tinggi untuk tampilan yang optimal</li>
            <li>Berikan caption yang deskriptif untuk setiap foto</li>
            <li>Kelompokkan foto berdasarkan program untuk memudahkan navigasi</li>
            <li>Update dokumentasi secara berkala untuk konten yang fresh</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
