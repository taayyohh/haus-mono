import config from '@/constants/config'
import { StripeElements, Stripe, StripeError } from '@stripe/stripe-js'

export async function confirmStripePayment(
  stripe: Stripe | null,
  elements: StripeElements | null,
  clientSecret: string | null
): Promise<StripeError | null> {
  if (!stripe || !elements || !clientSecret) return null

  try {
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      clientSecret: clientSecret,
      confirmParams: {
        return_url: config.BASE_URL!,
      },
    })

    return error || null
  } catch (err) {
    console.error(err)
    return null
  }
}
