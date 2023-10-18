import { stripe } from '@/stripe/stripe-sdk'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { metadata } = await req.json()

  const customer = await stripe.customers.create({
    metadata,
  })

  return NextResponse.json({ ...customer }, { status: 200 })
}
