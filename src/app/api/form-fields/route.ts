import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Default form fields
const DEFAULT_FIELDS = [
  {
    fieldName: 'childName',
    label: 'Nama Anak',
    placeholder: 'Masukkan nama lengkap anak',
    fieldType: 'text',
    required: true,
    enabled: true,
    order: 1
  },
  {
    fieldName: 'parentName',
    label: 'Nama Orang Tua',
    placeholder: 'Masukkan nama lengkap orang tua',
    fieldType: 'text',
    required: true,
    enabled: true,
    order: 2
  },
  {
    fieldName: 'email',
    label: 'Email',
    placeholder: 'contoh@email.com',
    fieldType: 'email',
    required: true,
    enabled: true,
    order: 3
  },
  {
    fieldName: 'phone',
    label: 'Nomor Telepon/WhatsApp',
    placeholder: '08123456789',
    fieldType: 'tel',
    required: true,
    enabled: true,
    order: 4
  },
  {
    fieldName: 'address',
    label: 'Alamat',
    placeholder: 'Masukkan alamat lengkap (opsional)',
    fieldType: 'textarea',
    required: false,
    enabled: true,
    order: 5
  },
  {
    fieldName: 'message',
    label: 'Pesan/Pertanyaan',
    placeholder: 'Ada pertanyaan atau informasi tambahan? (opsional)',
    fieldType: 'textarea',
    required: false,
    enabled: true,
    order: 6
  }
]

export async function GET() {
  try {
    let fields = await prisma.formField.findMany({
      orderBy: { order: 'asc' }
    })

    // Initialize dengan default fields jika belum ada
    if (fields.length === 0) {
      await prisma.formField.createMany({
        data: DEFAULT_FIELDS
      })
      fields = await prisma.formField.findMany({
        orderBy: { order: 'asc' }
      })
    }

    return NextResponse.json(fields)
  } catch (error) {
    console.error('Error fetching form fields:', error)
    return NextResponse.json({ error: 'Failed to fetch form fields' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fieldName, label, placeholder, fieldType, required, enabled, order, options } = body

    if (!fieldName || !label || !fieldType) {
      return NextResponse.json(
        { error: 'fieldName, label, and fieldType are required' },
        { status: 400 }
      )
    }

    const field = await prisma.formField.create({
      data: {
        fieldName,
        label,
        placeholder,
        fieldType,
        required: required ?? true,
        enabled: enabled ?? true,
        order: order ?? 0,
        options
      }
    })

    return NextResponse.json(field)
  } catch (error) {
    console.error('Error creating form field:', error)
    return NextResponse.json({ error: 'Failed to create form field' }, { status: 500 })
  }
}
