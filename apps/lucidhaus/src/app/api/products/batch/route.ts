import connectDb from '@/modules/auth/utils/db'
import Product, { IProduct } from '@/models/Product'
import { NextRequest, NextResponse } from 'next/server'

export const POST = connectDb(async (req: NextRequest) => {
  const { ids } = await req.json()

  try {
    const products: IProduct[] = await Product.find({
      _id: { $in: ids },
    })
      .sort({ releaseDate: -1 }) // Sort by releaseDate in descending order
      .exec()

    return NextResponse.json(products, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching products by ids' }, { status: 500 })
  }
})
