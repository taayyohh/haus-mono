import Stripe from 'stripe'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { stripe } from '@/stripe/stripe-sdk'

interface FormData {
  name: string
  description: string
  imageUri: string
  price: number
}

export const createStripeProduct = async (
  formData: FormData
): Promise<Stripe.Response<Stripe.Product>> => {
  try {
    return await stripe.products.create({
      name: formData.name,
      description: formData.description,
      images: [getIpfsGateway(formData.imageUri)],
      default_price_data: {
        currency: 'USD',
        unit_amount: formData.price,
      },
      statement_descriptor: 'LucidHaus',
      tax_code: 'txcd_99999999', // Adjust as needed
    })
  } catch (error) {
    console.error('Error creating Stripe product:', error)
    throw error // Rethrow the error for handling by the caller
  }
}
