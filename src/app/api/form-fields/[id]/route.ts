import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const field = await prisma.formField.findUnique({
      where: { id }
    })

    if (!field) {
      return NextResponse.json({ error: 'Form field not found' }, { status: 404 })
    }

    return NextResponse.json(field)
  } catch (error) {
    console.error('Error fetching form field:', error)
    return NextResponse.json({ error: 'Failed to fetch form field' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { label, placeholder, fieldType, required, enabled, order, options } = body

    const field = await prisma.formField.update({
      where: { id },
      data: {
        label,
        placeholder,
        fieldType,
        required,
        enabled,
        order,
        options
      }
    })

    return NextResponse.json(field)
  } catch (error) {
    console.error('Error updating form field:', error)
    return NextResponse.json({ error: 'Failed to update form field' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.formField.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Form field deleted' })
  } catch (error) {
    console.error('Error deleting form field:', error)
    return NextResponse.json({ error: 'Failed to delete form field' }, { status: 500 })
  }
}
