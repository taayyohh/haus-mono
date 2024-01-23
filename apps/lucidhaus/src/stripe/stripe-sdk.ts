import Stripe from 'stripe'
import config from '@/constants/config'
const stripe = new Stripe(config.stripeSecret as string, {
  apiVersion: '2022-11-15',
})

export const OnrampSessionResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: 'crypto/onramp_sessions',
  }),
});

export { stripe }
