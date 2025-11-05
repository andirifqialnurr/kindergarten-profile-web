'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Loader2 } from 'lucide-react'
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

export default function PendaftaranPage() {
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890')
  const [whatsappTemplate, setWhatsappTemplate] = useState('')

  useEffect(() => {
    fetchConfiguration()
  }, [])

  const fetchConfiguration = async () => {
    try {
      setLoading(true)
      
      // Fetch form fields
      const fieldsRes = await fetch('/api/form-fields')
      if (fieldsRes.ok) {
        const fields = await fieldsRes.json()
        const enabledFields = fields.filter((f: FormField) => f.enabled)
        setFormFields(enabledFields)
        
        // Initialize form data
        const initialData: Record<string, string> = {}
        enabledFields.forEach((field: FormField) => {
          initialData[field.fieldName] = ''
        })
        setFormData(initialData)
      }
      
      // Fetch WhatsApp settings
      const settingsRes = await fetch('/api/settings')
      if (settingsRes.ok) {
        const settings = await settingsRes.json()
        if (settings.whatsapp_number) {
          setWhatsappNumber(settings.whatsapp_number.value)
        }
        if (settings.whatsapp_template) {
          setWhatsappTemplate(settings.whatsapp_template.value)
        }
      }
    } catch (error) {
      console.error('Error fetching configuration:', error)
      toast.error('Gagal memuat form. Silakan refresh halaman.')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    formFields.forEach(field => {
      if (field.required && !formData[field.fieldName]?.trim()) {
        newErrors[field.fieldName] = `${field.label} harus diisi`
      }
      
      // Validate email
      if (field.fieldType === 'email' && formData[field.fieldName]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.fieldName])) {
          newErrors[field.fieldName] = 'Email tidak valid'
        }
      }
      
      // Validate phone
      if (field.fieldType === 'tel' && formData[field.fieldName]) {
        if (formData[field.fieldName].length < 10) {
          newErrors[field.fieldName] = 'Nomor telepon minimal 10 digit'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Mohon lengkapi form dengan benar')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Generate WhatsApp message
      let message = whatsappTemplate || '*PENDAFTARAN BARU - Zivana Montessori School*\n\n'
      
      formFields.forEach(field => {
        const value = formData[field.fieldName] || ''
        const placeholder = `{${field.fieldName}}`
        
        if (message.includes(placeholder)) {
          // Replace placeholder
          message = message.replaceAll(placeholder, value || '-')
        } else if (value) {
          // Add field if not in template
          message += `*${field.label}:* ${value}\n`
        }
      })
      
      message += '\n\nTerima kasih telah mendaftar di Zivana Montessori School!'
      
      // Open WhatsApp
      const encodedMessage = encodeURIComponent(message.trim())
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
      
      setIsSuccess(true)
      
      // Reset form
      const resetData: Record<string, string> = {}
      formFields.forEach(field => {
        resetData[field.fieldName] = ''
      })
      setFormData(resetData)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    // Clear error when user types
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="bg-muted py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pendaftaran</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Daftarkan anak Anda sekarang dan berikan pendidikan terbaik sejak dini
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pendaftaran</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Daftarkan anak Anda sekarang dan berikan pendidikan terbaik sejak dini
          </p>
        </div>
      </section>

      {/* Instructions Banner */}
      <section className="py-8 bg-blue-50 dark:bg-blue-950">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              Cara Pendaftaran:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
              <li>Isi formulir pendaftaran di bawah ini dengan lengkap</li>
              <li>Klik tombol &quot;Kirim Pendaftaran&quot;</li>
              <li>Anda akan diarahkan ke WhatsApp untuk berkomunikasi dengan admin kami</li>
              <li>Tim kami akan menghubungi Anda untuk proses selanjutnya</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container max-w-2xl">
          {isSuccess ? (
            <Card className="border-green-500">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Pendaftaran Berhasil!</CardTitle>
                <CardDescription className="text-base">
                  Terima kasih telah mendaftar. Silakan lanjutkan percakapan melalui WhatsApp 
                  dengan admin kami untuk proses selanjutnya.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => setIsSuccess(false)}>
                  Daftar Lagi
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Formulir Pendaftaran</CardTitle>
                <CardDescription>
                  Mohon isi data dengan lengkap dan benar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  {formFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.fieldName}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      
                      {field.fieldType === 'textarea' ? (
                        <Textarea
                          id={field.fieldName}
                          value={formData[field.fieldName] || ''}
                          onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                          placeholder={field.placeholder || ''}
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={field.fieldName}
                          type={field.fieldType}
                          value={formData[field.fieldName] || ''}
                          onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                          placeholder={field.placeholder || ''}
                        />
                      )}
                      
                      {errors[field.fieldName] && (
                        <p className="text-sm text-red-500">{errors[field.fieldName]}</p>
                      )}
                    </div>
                  ))}

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Kirim Pendaftaran'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Syarat Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Usia minimal 2.5 tahun</li>
                  <li>Fotokopi Akta Kelahiran</li>
                  <li>Fotokopi KK</li>
                  <li>Pas foto 3x4 (2 lembar)</li>
                  <li>Fotokopi KTP orang tua</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biaya Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Formulir:</strong> Rp 100.000</li>
                  <li><strong>Uang Pangkal:</strong> Rp 5.000.000</li>
                  <li><strong>SPP/Bulan:</strong> Rp 1.500.000</li>
                  <li className="pt-2 text-xs">
                    *Hubungi admin untuk informasi detail dan promo yang sedang berlaku
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
