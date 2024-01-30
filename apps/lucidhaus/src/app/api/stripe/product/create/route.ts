// pages/api/create-stripe-product.js

import { stripe } from '@/stripe/stripe-sdk'
import { NextRequest, NextResponse } from 'next/server'

interface FormData {
  name: string
  description: string
  imageUri: string[]
  price: number
}

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.json()

    const product = await stripe.products.create({
      name: formData.name,
      description: formData.description,
      images: formData.imageUri,
      default_price_data: {
        currency: 'USD',
        unit_amount: formData.price * 100, // Convert to cents
      },
      statement_descriptor: 'LucidHaus',
      tax_code: 'txcd_99999999', // Adjust as needed
    })

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('Error creating Stripe product:', error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
