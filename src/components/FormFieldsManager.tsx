'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, Edit, GripVertical, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

type FormField = {
  id: string
  fieldName: string
  label: string
  placeholder: string | null
  fieldType: string
  required: boolean
  enabled: boolean
  order: number
}

export default function FormFieldsManager() {
  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState<FormField[]>([])
  const [editModal, setEditModal] = useState(false)
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    label: '',
    placeholder: '',
    fieldType: 'text',
    required: true,
    enabled: true,
  })

  useEffect(() => {
    fetchFields()
  }, [])

  const fetchFields = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/form-fields')
      if (!res.ok) throw new Error('Failed to fetch')
      
      const data = await res.json()
      setFields(data)
    } catch (error) {
      console.error('Error fetching form fields:', error)
      toast.error('Gagal memuat field form')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (field: FormField) => {
    setSelectedField(field)
    setFormData({
      label: field.label,
      placeholder: field.placeholder || '',
      fieldType: field.fieldType,
      required: field.required,
      enabled: field.enabled,
    })
    setEditModal(true)
  }

  const handleUpdate = async () => {
    if (!selectedField) return
    
    try {
      setSubmitting(true)
      
      const res = await fetch(`/api/form-fields/${selectedField.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: selectedField.order
        })
      })
      
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success('Field berhasil diupdate')
      setEditModal(false)
      fetchFields()
      
      // Update WhatsApp template placeholder guide
      updateWhatsAppTemplate()
    } catch (error) {
      console.error('Error updating field:', error)
      toast.error('Gagal mengupdate field')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleEnabled = async (field: FormField) => {
    try {
      const res = await fetch(`/api/form-fields/${field.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...field,
          enabled: !field.enabled
        })
      })
      
      if (!res.ok) throw new Error('Failed to toggle')
      
      toast.success(`Field ${!field.enabled ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchFields()
      updateWhatsAppTemplate()
    } catch (error) {
      console.error('Error toggling field:', error)
      toast.error('Gagal mengubah status field')
    }
  }

  const updateWhatsAppTemplate = async () => {
    // Auto-generate template berdasarkan enabled fields
    const enabledFields = fields.filter(f => f.enabled)
    let template = '*PENDAFTARAN BARU - Zivana Montessori School*\n\n'
    
    enabledFields.forEach(field => {
      const placeholder = `{${field.fieldName}}`
      template += `*${field.label}:* ${placeholder}\n`
    })
    
    template += '\nTerima kasih telah mendaftar di Zivana Montessori School!'
    
    // Save to settings
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: 'whatsapp_template',
        value: template,
        description: 'Template pesan WhatsApp (auto-generated)'
      })
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Kelola Field Form Pendaftaran</CardTitle>
          <CardDescription>
            Atur field yang ditampilkan di form pendaftaran. Template WhatsApp akan otomatis menyesuaikan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Field Name</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{field.fieldName}</TableCell>
                  <TableCell className="font-medium">{field.label}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{field.fieldType}</code>
                  </TableCell>
                  <TableCell>
                    {field.required ? (
                      <span className="text-xs text-red-600 font-medium">Required</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Optional</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEnabled(field)}
                    >
                      {field.enabled ? (
                        <>
                          <Eye className="h-4 w-4 mr-1 text-green-600" />
                          <span className="text-xs text-green-600">Aktif</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Nonaktif</span>
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(field)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Field: {selectedField?.fieldName}</DialogTitle>
            <DialogDescription>
              Ubah konfigurasi field form pendaftaran
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="Label yang ditampilkan di form"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={formData.placeholder}
                onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                placeholder="Teks placeholder (opsional)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fieldType">Tipe Input</Label>
              <Select
                value={formData.fieldType}
                onValueChange={(value) => setFormData({ ...formData, fieldType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="tel">Telepon</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="required">Field Wajib Diisi?</Label>
              <Switch
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled">Tampilkan di Form?</Label>
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModal(false)} disabled={submitting}>
              Batal
            </Button>
            <Button onClick={handleUpdate} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
