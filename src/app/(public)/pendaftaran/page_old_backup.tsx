'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Loader2 } from 'lucide-react'

const formSchema = z.object({
  childName: z.string().min(2, 'Nama anak minimal 2 karakter'),
  parentName: z.string().min(2, 'Nama orang tua minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  address: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function PendaftaranPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890')
  const [whatsappTemplate, setWhatsappTemplate] = useState('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: '',
      parentName: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    },
  })

  // Fetch settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        if (!res.ok) return
        
        const settings = await res.json()
        
        if (settings.whatsapp_number) {
          setWhatsappNumber(settings.whatsapp_number.value)
        }
        if (settings.whatsapp_template) {
          setWhatsappTemplate(settings.whatsapp_template.value)
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    
    fetchSettings()
  }, [])

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    
    try {
      // Simpan ke database (opsional)
      // await fetch('/api/registrations', {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      // })

      // Buat pesan WhatsApp menggunakan template dari database
      let whatsappMessage = whatsappTemplate || `
*PENDAFTARAN BARU - Zivana Montessori School*

*Nama Anak:* ${values.childName}
*Nama Orang Tua:* ${values.parentName}
*Email:* ${values.email}
*Nomor Telepon:* ${values.phone}
${values.address ? `*Alamat:* ${values.address}` : ''}
${values.message ? `*Pesan:* ${values.message}` : ''}

Terima kasih telah mendaftar di Zivana Montessori School!
      `.trim()

      // Replace placeholders dengan data form (gunakan replaceAll untuk semua kemunculan)
      whatsappMessage = whatsappMessage
        .replaceAll('{childName}', values.childName)
        .replaceAll('{parentName}', values.parentName)
        .replaceAll('{email}', values.email)
        .replaceAll('{phone}', values.phone)
        .replaceAll('{address}', values.address ? `*Alamat:* ${values.address}` : '')
        .replaceAll('{message}', values.message ? `*Pesan:* ${values.message}` : '')
        .trim()

      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      // Redirect ke WhatsApp
      window.open(whatsappUrl, '_blank')
      
      setIsSuccess(true)
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Nama Anak */}
                    <FormField
                      control={form.control}
                      name="childName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Anak *</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama lengkap anak" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nama Orang Tua */}
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Orang Tua *</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama lengkap orang tua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contoh@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nomor Telepon */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon/WhatsApp *</FormLabel>
                          <FormControl>
                            <Input placeholder="08123456789" {...field} />
                          </FormControl>
                          <FormDescription>
                            Nomor yang dapat dihubungi via WhatsApp
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Alamat */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Masukkan alamat lengkap (opsional)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pesan */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan/Pertanyaan</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ada pertanyaan atau informasi tambahan? (opsional)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                </Form>
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
