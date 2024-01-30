import { stripe } from '@/stripe/stripe-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

const endpointSecret =
  'whsec_445bad25788844a964e230cf49c75736c3f251249b117d1db0ff8bed4aaa05ad'

export async function POST(req: NextRequest) {
  const requestHeaders = headers()

  const sig = requestHeaders.get('stripe-signature')
  let event

  if (!sig) return

  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, endpointSecret)

    switch (event.type) {
      case 'customer.created':
        return await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: event,
          }),
        })
      case 'product.created':
        return NextResponse.json({
          status: 200,
        })

      default:
        return NextResponse.json({
          status: 200,
        })
    }
  } catch (err: any) {

    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
