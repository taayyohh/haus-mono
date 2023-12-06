import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const slug = req.nextUrl.pathname.split('/')[3]

  try {
    const product = await Product.findOne({ slug })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const productId = req.nextUrl.searchParams.get('id')

    // Retrieve all product fields from the request body
    const {
      name,
      price,
      description,
      category,
      imageUri,
      stripeId,
      artists,
      quantity,
      stock,
    } = await req.json()

    try {
      const updateData = {
        ...(name && { name }),
        ...(price && { price }),
        ...(description && { description }),
        ...(category && { category }),
        ...(imageUri && { imageUri }),
        ...(stripeId && { stripeId }),
        ...(artists && { artists }),
        ...(quantity !== undefined && { quantity }), // Check for undefined as quantity can be 0
        ...(stock && { stock }),
      }

      const product = await Product.findByIdAndUpdate(productId, updateData, {
        new: true,
      })

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json(product, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const productId = req.nextUrl.searchParams.get('id')

    try {
      const product = await Product.findByIdAndDelete(productId)

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
  })
)
