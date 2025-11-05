'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import FormFieldsManager from '@/components/FormFieldsManager'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

const DEFAULT_WHATSAPP_TEMPLATE = `*PENDAFTARAN BARU - Zivana Montessori School*

*Nama Anak:* {childName}
*Nama Orang Tua:* {parentName}
*Email:* {email}
*Nomor Telepon:* {phone}
{address}
{message}

Terima kasih telah mendaftar di Zivana Montessori School!`

const DEFAULT_WHATSAPP_NUMBER = '6281234567890'

export default function PengaturanPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // WhatsApp Settings
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER)
  const [whatsappTemplate, setWhatsappTemplate] = useState(DEFAULT_WHATSAPP_TEMPLATE)
  
  // Preview
  const [previewData, setPreviewData] = useState({
    childName: 'Budi Santoso',
    parentName: 'Ibu Siti Rahayu',
    email: 'siti@email.com',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 123, Jakarta',
    message: 'Saya ingin bertanya tentang program untuk usia 3 tahun'
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings')
      if (!res.ok) {
        console.error('Failed to fetch settings:', res.status)
        throw new Error('Failed to fetch')
      }
      
      const settings = await res.json()
      console.log('Fetched settings:', settings)
      
      if (settings.whatsapp_number) {
        setWhatsappNumber(settings.whatsapp_number.value)
        console.log('WhatsApp Number loaded:', settings.whatsapp_number.value)
      }
      if (settings.whatsapp_template) {
        setWhatsappTemplate(settings.whatsapp_template.value)
        console.log('WhatsApp Template loaded:', settings.whatsapp_template.value)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Gagal memuat pengaturan')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      console.log('Saving WhatsApp Number:', whatsappNumber)
      console.log('Saving WhatsApp Template:', whatsappTemplate)
      
      // Save WhatsApp number
      const res1 = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'whatsapp_number',
          value: whatsappNumber,
          description: 'Nomor WhatsApp sekolah untuk menerima pendaftaran'
        })
      })
      
      if (!res1.ok) {
        const errorData = await res1.json()
        console.error('Failed to save WhatsApp number:', errorData)
        throw new Error('Failed to save WhatsApp number')
      }
      
      const savedNumber = await res1.json()
      console.log('WhatsApp number saved:', savedNumber)
      
      // Save WhatsApp template
      const res2 = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'whatsapp_template',
          value: whatsappTemplate,
          description: 'Template pesan WhatsApp untuk pendaftaran'
        })
      })
      
      if (!res2.ok) {
        const errorData = await res2.json()
        console.error('Failed to save WhatsApp template:', errorData)
        throw new Error('Failed to save WhatsApp template')
      }
      
      const savedTemplate = await res2.json()
      console.log('WhatsApp template saved:', savedTemplate)
      
      toast.success('Pengaturan berhasil disimpan')
      
      // Refresh data dari database
      await fetchSettings()
    } catch (error) {
      toast.error('Gagal menyimpan pengaturan')
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setWhatsappNumber(DEFAULT_WHATSAPP_NUMBER)
    setWhatsappTemplate(DEFAULT_WHATSAPP_TEMPLATE)
    toast.info('Template direset ke default')
  }

  const generatePreview = () => {
    let preview = whatsappTemplate
    
    // Replace placeholders (gunakan replaceAll untuk semua kemunculan)
    preview = preview.replaceAll('{childName}', previewData.childName)
    preview = preview.replaceAll('{parentName}', previewData.parentName)
    preview = preview.replaceAll('{email}', previewData.email)
    preview = preview.replaceAll('{phone}', previewData.phone)
    
    // Handle optional fields
    if (previewData.address) {
      preview = preview.replaceAll('{address}', `*Alamat:* ${previewData.address}`)
    } else {
      preview = preview.replaceAll('{address}', '')
    }
    
    if (previewData.message) {
      preview = preview.replaceAll('{message}', `*Pesan:* ${previewData.message}`)
    } else {
      preview = preview.replaceAll('{message}', '')
    }
    
    return preview
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan website dan integrasi
        </p>
      </div>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="form">Form Pendaftaran</TabsTrigger>
          <TabsTrigger value="general">Umum</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan WhatsApp</CardTitle>
              <CardDescription>
                Atur nomor WhatsApp dan template pesan untuk form pendaftaran
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* WhatsApp Number */}
              <div className="space-y-2">
                <Label htmlFor="wa-number">Nomor WhatsApp Sekolah</Label>
                <Input
                  id="wa-number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="6281234567890"
                />
                <p className="text-xs text-muted-foreground">
                  Format: 62xxx (tanpa tanda + atau spasi)
                </p>
              </div>

              {/* Template Message */}
              <div className="space-y-2">
                <Label htmlFor="wa-template">Template Pesan WhatsApp</Label>
                <Textarea
                  id="wa-template"
                  value={whatsappTemplate}
                  onChange={(e) => setWhatsappTemplate(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <Alert>
                  <AlertTitle>Placeholder yang Tersedia:</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                      <li><code>{'{childName}'}</code> - Nama anak</li>
                      <li><code>{'{parentName}'}</code> - Nama orang tua</li>
                      <li><code>{'{email}'}</code> - Email</li>
                      <li><code>{'{phone}'}</code> - Nomor telepon</li>
                      <li><code>{'{address}'}</code> - Alamat (opsional)</li>
                      <li><code>{'{message}'}</code> - Pesan tambahan (opsional)</li>
                    </ul>
                    <p className="text-xs mt-2">
                      Gunakan <strong>*teks*</strong> untuk bold di WhatsApp
                    </p>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Pengaturan
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset ke Default
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Pesan</CardTitle>
              <CardDescription>
                Lihat bagaimana pesan akan tampil di WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preview Data Inputs */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Data Preview (untuk testing):</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Nama Anak"
                      value={previewData.childName}
                      onChange={(e) => setPreviewData({...previewData, childName: e.target.value})}
                    />
                    <Input
                      placeholder="Nama Orang Tua"
                      value={previewData.parentName}
                      onChange={(e) => setPreviewData({...previewData, parentName: e.target.value})}
                    />
                    <Input
                      placeholder="Email"
                      value={previewData.email}
                      onChange={(e) => setPreviewData({...previewData, email: e.target.value})}
                    />
                    <Input
                      placeholder="Nomor Telepon"
                      value={previewData.phone}
                      onChange={(e) => setPreviewData({...previewData, phone: e.target.value})}
                    />
                    <Input
                      placeholder="Alamat"
                      value={previewData.address}
                      onChange={(e) => setPreviewData({...previewData, address: e.target.value})}
                    />
                    <Textarea
                      placeholder="Pesan"
                      value={previewData.message}
                      onChange={(e) => setPreviewData({...previewData, message: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Preview Result */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Hasil Pesan:</h4>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <pre className="whitespace-pre-wrap text-xs font-mono text-green-900 dark:text-green-100">
                      {generatePreview()}
                    </pre>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const encodedMessage = encodeURIComponent(generatePreview())
                      const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
                      window.open(url, '_blank')
                    }}
                  >
                    Test Kirim ke WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <FormFieldsManager />
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Pengaturan umum website (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fitur pengaturan umum akan ditambahkan di versi mendatang.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
