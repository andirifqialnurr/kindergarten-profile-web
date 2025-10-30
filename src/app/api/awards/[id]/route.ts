import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update award
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, imageUrl, year, order } = body

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      )
    }

    const award = await prisma.award.update({
      where: { id },
      data: {
        title,
        imageUrl,
        year: year || null,
        order: order ?? 0,
      },
    })

    return NextResponse.json(award)
  } catch (error) {
    console.error('Error updating award:', error)
    return NextResponse.json(
      { error: 'Failed to update award' },
      { status: 500 }
    )
  }
}

// DELETE award
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.award.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Award deleted successfully' })
  } catch (error) {
    console.error('Error deleting award:', error)
    return NextResponse.json(
      { error: 'Failed to delete award' },
      { status: 500 }
    )
  }
}
