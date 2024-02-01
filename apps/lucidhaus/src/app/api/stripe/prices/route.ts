import { stripe } from '@/stripe/stripe-sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const prices = await stripe.prices.list({
      product: productId,
    })

    return NextResponse.json(prices, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching Stripe prices:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
