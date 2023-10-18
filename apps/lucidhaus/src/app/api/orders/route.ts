import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Order, { IOrder } from '@/models/Order'
import orderProtect from '@/modules/auth/utils/protectOrder' // Importing the Order model

// Create a new order
export const POST = connectDb(
  orderProtect(async (req: AuthenticatedRequest) => {
    const {
      user,
      products,
      status,
      totalPrice,
      dateOrdered,
      shippingAddress,
      paymentMethod,
      trackingNumber,
      notes,
    } = await req.json()

    try {
      const order = new Order({
        user,
        products,
        status,
        totalPrice,
        dateOrdered,
        shippingAddress,
        paymentMethod,
        trackingNumber,
        notes,
      })

      await order.save()

      return NextResponse.json({ message: 'Order created successfully' }, { status: 201 })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
    }
  })
)

// Fetch all orders with pagination
export const GET = connectDb(
  protect(async (req) => {
    const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
    const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
    const skip = (page - 1) * limit

    try {
      const orders: IOrder[] = await Order.find().skip(skip).limit(limit).exec()

      return NextResponse.json(orders, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
    }
  })
)
