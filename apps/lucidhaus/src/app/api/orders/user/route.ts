import { authenticateUser } from '@/modules/auth/utils/authenticateUser'
import connectDb from '@/modules/auth/utils/db'
import Order from '@/models/Order'
import { NextResponse, NextRequest } from 'next/server'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'

export const GET = connectDb(
  authenticateUser(async (req: AuthenticatedRequest) => {
    const privyId = req.user?.privyId
    const pageParam = req.nextUrl.searchParams.get('page')
    const limitParam = req.nextUrl.searchParams.get('limit')

    const page = pageParam ? parseInt(pageParam, 10) : 1
    const limit = limitParam ? parseInt(limitParam, 10) : 10

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Invalid page number' }, { status: 400 })
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: 'Invalid limit' }, { status: 400 })
    }

    try {
      const orders = await Order.find({ privyId })
        .limit(limit)
        .skip((page - 1) * limit)

      if (!orders || orders.length === 0) {
        return NextResponse.json({ error: 'No orders found' }, { status: 404 })
      }

      return NextResponse.json(orders, { status: 200 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
    }
  })
)
