import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update employee
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, position, imageUrl, level, order } = body

    if (!name || !position || !level) {
      return NextResponse.json(
        { error: 'Name, position, and level are required' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        name,
        position,
        imageUrl: imageUrl || null,
        level,
        order: order ?? 0,
      },
    })

    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error updating employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
}

// DELETE employee
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.employee.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('Error deleting employee:', error)
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    )
  }
}
