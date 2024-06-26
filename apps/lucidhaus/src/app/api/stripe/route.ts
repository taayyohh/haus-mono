import { stripe } from '@/stripe/stripe-sdk'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { price, email } = await req.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: email,
  })
  return NextResponse.json({ ...paymentIntent }, { status: 200 })
}
