import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all awards
export async function GET() {
  try {
    const awards = await prisma.award.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(awards)
  } catch (error) {
    console.error('Error fetching awards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    )
  }
}

// POST create new award
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, imageUrl, year, order } = body

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      )
    }

    const award = await prisma.award.create({
      data: {
        title,
        imageUrl,
        year: year || null,
        order: order || 0,
      },
    })

    return NextResponse.json(award, { status: 201 })
  } catch (error) {
    console.error('Error creating award:', error)
    return NextResponse.json(
      { error: 'Failed to create award' },
      { status: 500 }
    )
  }
}
