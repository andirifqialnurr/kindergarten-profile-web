import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all social media
export async function GET() {
  try {
    const socialMedia = await prisma.socialMedia.findMany({
      orderBy: {
        platform: 'asc',
      },
    })

    return NextResponse.json(socialMedia)
  } catch (error) {
    console.error('Error fetching social media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    )
  }
}

// POST create new social media
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { platform, username, url } = body

    if (!platform || !username || !url) {
      return NextResponse.json(
        { error: 'Platform, username, and url are required' },
        { status: 400 }
      )
    }

    const socialMedia = await prisma.socialMedia.create({
      data: {
        platform,
        username,
        url,
      },
    })

    return NextResponse.json(socialMedia, { status: 201 })
  } catch (error) {
    console.error('Error creating social media:', error)
    return NextResponse.json(
      { error: 'Failed to create social media' },
      { status: 500 }
    )
  }
}
