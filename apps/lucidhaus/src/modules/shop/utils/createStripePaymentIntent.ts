import Stripe from 'stripe'

export async function createStripePaymentIntent(
  total: number,
  email: string
): Promise<Stripe.PaymentIntent> {
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ price: Math.round(total * 100), email }),
  })
  return await response.json()
}
