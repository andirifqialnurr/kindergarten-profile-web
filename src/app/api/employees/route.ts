import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}

// POST create new employee
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, imageUrl, level, order } = body

    if (!name || !position || !level) {
      return NextResponse.json(
        { error: 'Name, position, and level are required' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        position,
        imageUrl: imageUrl || null,
        level,
        order: order || 0,
      },
    })

    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
}
