import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Order, { IOrder } from '@/models/Order'
import Product from '@/models/Product'
import orderProtect from '@/modules/auth/utils/protectOrderAdmin'

export const POST = connectDb(
  orderProtect(async (req: AuthenticatedRequest) => {
    const {
      privyId,
      name,
      email,
      products, // Assume this is an array of objects with { id, quantity, size? }
      status,
      totalPrice,
      dateOrdered,
      shippingAddress,
    } = await req.json()

    try {
      // Decrement product quantities
      for (let orderedProduct of products) {
        const dbProduct = await Product.findById(orderedProduct.product._id)

        if (!dbProduct) {
          return NextResponse.json(
            { error: `Product ${orderedProduct._id} not found` },
            { status: 400 }
          )
        }

        if (orderedProduct.size) {
          // Product has sizes and uses the stock array
          const stockItem = dbProduct.stock?.find(
            (stockItem: { size: string }) => stockItem.size === orderedProduct.size
          )

          if (!stockItem) {
            return NextResponse.json(
              {
                error: `Size ${orderedProduct.size} not available for product ${dbProduct.name}`,
              },
              { status: 400 }
            )
          }

          if (stockItem.quantity < orderedProduct.quantity) {
            return NextResponse.json(
              {
                error: `Not enough stock for product ${dbProduct.name} size ${orderedProduct.size}`,
              },
              { status: 400 }
            )
          }

          stockItem.quantity -= orderedProduct.quantity
        } else if (typeof dbProduct.quantity === 'number') {
          // Product has a direct quantity
          if (dbProduct.quantity < orderedProduct.quantity) {
            return NextResponse.json(
              { error: `Not enough stock for product ${dbProduct.name}` },
              { status: 400 }
            )
          }
          dbProduct.quantity -= orderedProduct.quantity
        } else {
          return NextResponse.json(
            { error: `Invalid product quantity structure for ${dbProduct.name}` },
            { status: 400 }
          )
        }

        await dbProduct.save()
      }

      const order = new Order({
        name,
        privyId,
        email,
        products,
        status,
        totalPrice,
        dateOrdered,
        shippingAddress,
      })

      await order.save()

      return NextResponse.json({ ok: true, order }, { status: 201 })
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
