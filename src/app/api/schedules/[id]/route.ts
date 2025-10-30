import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update schedule
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { time, activity, order } = body

    if (!time || !activity) {
      return NextResponse.json(
        { error: 'Time and activity are required' },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.update({
      where: { id },
      data: {
        time,
        activity,
        order: order ?? 0,
      },
    })

    return NextResponse.json(schedule)
  } catch (error) {
    console.error('Error updating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to update schedule' },
      { status: 500 }
    )
  }
}

// DELETE schedule
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.schedule.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    console.error('Error deleting schedule:', error)
    return NextResponse.json(
      { error: 'Failed to delete schedule' },
      { status: 500 }
    )
  }
}
