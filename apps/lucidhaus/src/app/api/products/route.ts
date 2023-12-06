import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest, verifyToken } from '@/modules/auth/utils/verifyToken'
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
        category,
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
      console.log('err', err)
      return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const products: IProduct[] = await Product.find({}).skip(skip).limit(limit).exec()
    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
})
