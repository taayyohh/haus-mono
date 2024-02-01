import { authenticateUser } from '@/modules/auth/utils/authenticateUser'
import connectDb from '@/modules/auth/utils/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'

export const GET = connectDb(
  authenticateUser(async (req: AuthenticatedRequest) => {
    const privyId = req.user?.privyId
    const pageParam = req.nextUrl.searchParams.get('page')
    const limitParam = req.nextUrl.searchParams.get('limit')

    const page = pageParam ? parseInt(pageParam, 10) : 1
    const limit = limitParam ? parseInt(limitParam, 10) : 10

    try {
      const orders = await Order.find({ privyId })
        .limit(limit)
        .skip((page - 1) * limit)

      return NextResponse.json(orders, { status: 200 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
    }
  })
)
