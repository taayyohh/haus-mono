import { authenticateUser } from '@/modules/auth/utils/authenticateUser'
import connectDb from '@/modules/auth/utils/db'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'

export const GET = connectDb(
  authenticateUser(async (req: AuthenticatedRequest) => {
    const orderId = req.nextUrl.pathname.split('/')[4]

    try {
      const order = await Order.findById(orderId)
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      if (req.user?.privyId !== order.privyId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      return NextResponse.json(order, { status: 200 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error fetching order' }, { status: 500 })
    }
  })
)
