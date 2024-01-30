import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'

// Fetch an order by ID
export const GET = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const orderId = req.nextUrl.pathname.split('/')[3]

    try {
      const order = await Order.findById(orderId).populate('products.product')
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
      return NextResponse.json(order, { status: 200 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error fetching order' }, { status: 500 })
    }
  })
)

// Update an order by ID
export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const orderId = req.nextUrl.pathname.split('/')[3]
    const updatedData = await req.json()

    try {
      const order = await Order.findByIdAndUpdate(orderId, updatedData, { new: true })

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      return NextResponse.json(order, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating order' }, { status: 500 })
    }
  })
)

// Delete an order by ID
export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const orderId = req.nextUrl.pathname.split('/')[3]

    try {
      const order = await Order.findByIdAndDelete(orderId)

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting order' }, { status: 500 })
    }
  })
)
