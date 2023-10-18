import Stripe from 'stripe'
import { OnrampSessionResource, stripe } from '@/stripe/stripe-sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { transaction_details } = await req.json()

  const onrampSession = new OnrampSessionResource(stripe).create({
    transaction_details: {
      destination_currency: transaction_details['destination_currency'],
      // destination_exchange_amount: transaction_details['destination_exchange_amount'],
      destination_network: transaction_details['destination_network'],
      source_amount:  transaction_details['source_amount']
    },
  })
  const [session] = await Promise.all([onrampSession])

  return NextResponse.json({ data: session }, { status: 200 })
}
