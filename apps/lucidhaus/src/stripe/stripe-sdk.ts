import Stripe from 'stripe'
import config from '@/constants/config'
const stripe = new Stripe('sk_test_51MAOseLAzMApt5jmaHh8GtdWS8w9xaipmOUi40fcgQn4Xh6495WeG7yGExroIaW6p9zrw8hSAAAU2UGzok3F0AB400RdYUkDYo' as string, {
  apiVersion: '2022-11-15',
})

console.log('conf', config.stripeSecret)
export const OnrampSessionResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: 'crypto/onramp_sessions',
  }),
});

export { stripe }
