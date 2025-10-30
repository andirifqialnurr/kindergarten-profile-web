import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all schedules
export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    )
  }
}

// POST create new schedule
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { time, activity, order } = body

    if (!time || !activity) {
      return NextResponse.json(
        { error: 'Time and activity are required' },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.create({
      data: {
        time,
        activity,
        order: order || 0,
      },
    })

    return NextResponse.json(schedule, { status: 201 })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    )
  }
}
