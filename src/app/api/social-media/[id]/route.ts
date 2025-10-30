import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update social media
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { platform, username, url } = body

    if (!platform || !username || !url) {
      return NextResponse.json(
        { error: 'Platform, username, and url are required' },
        { status: 400 }
      )
    }

    const socialMedia = await prisma.socialMedia.update({
      where: { id },
      data: {
        platform,
        username,
        url,
      },
    })

    return NextResponse.json(socialMedia)
  } catch (error) {
    console.error('Error updating social media:', error)
    return NextResponse.json(
      { error: 'Failed to update social media' },
      { status: 500 }
    )
  }
}

// DELETE social media
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.socialMedia.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Social media deleted successfully' })
  } catch (error) {
    console.error('Error deleting social media:', error)
    return NextResponse.json(
      { error: 'Failed to delete social media' },
      { status: 500 }
    )
  }
}
