import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET images for a program
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const images = await prisma.image.findMany({
      where: { programId: id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

// POST add image to program
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { url, caption } = body

    if (!url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    const image = await prisma.image.create({
      data: {
        url,
        caption: caption || '',
        programId: id,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error adding image:', error)
    return NextResponse.json(
      { error: 'Failed to add image' },
      { status: 500 }
    )
  }
}
