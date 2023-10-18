'use client'

import { ReactElement } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from '@/constants/config'
import useCartStore from '@/store/shop'

export function CheckoutForm({ children }: { children: ReactElement }) {
  const stripePromise = loadStripe(config.stripePublic as string)
  const total = useCartStore((state) => state.cartTotal)

  if (!total) return null

  const options: StripeElementsOptions = {
    mode: 'payment' as 'payment',
    currency: 'usd',
    amount: total * 100, // usd represented in cents
    appearance: {
      theme: 'stripe' as 'stripe',
      labels: 'floating' as 'floating',
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
