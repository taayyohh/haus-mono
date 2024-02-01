import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Product, { IProduct } from '@/models/Product'

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const {
      name,
      price,
      quantity,
      description,
      category,
      imageUri,
      stripeId,
      artists,
      stock,
    } = await req.json()

    try {
      const product = new Product({
        name,
        price,
        quantity,
        description,
        // category,
        imageUri,
        stripeId,
        artists,
        stock,
      })
      await product.save()
      return NextResponse.json(
        { message: 'Product created successfully' },
        { status: 201 }
      )
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 30
  const skip = (page - 1) * limit

  try {
    const products = await Product.find({
      $or: [{ quantity: { $gt: 0 } }, { 'stock.quantity': { $gt: 0 } }],
    })
      .skip(skip)
      .limit(limit)
      .exec()
    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
})
