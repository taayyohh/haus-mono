import { stripe } from '@/stripe/stripe-sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Fetch the prices associated with the product
    const prices = await stripe.prices.list({
      product: productId,
    })

    console.log('OPRA', prices)

    // Return the prices
    return NextResponse.json(prices, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching Stripe prices:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
