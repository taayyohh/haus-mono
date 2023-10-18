'use client'

import {
  PaymentElement,
  useElements,
  useStripe,
  AddressElement,
} from '@stripe/react-stripe-js'
import useCartStore from '@/store/shop'
import Stripe from 'stripe'
import config from '@/constants/config'

export default function Payment() {
  const stripe = useStripe()
  const elements = useElements()
  const total = useCartStore((state) => state.cartTotal)

  const handlePurchase = async () => {
    if (!stripe || !elements) return null
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      // Show error to your customer
      console.log(submitError.message)
      return
    }

    const stripePayment = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: Math.round(total * 100) }),
    })
    const paymentIntent: Stripe.PaymentIntent = await stripePayment.json()

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: paymentIntent.client_secret as string,
      confirmParams: {
        return_url: config.BASE_URL!,
      },
    })
  }
  return (
    <div className={'w-full min-w-[400px] mt-8'}>
      <div className={'w-full mx-auto'}>
        <div className={'w-full'}>
          <div className={'text-xs uppercase font-bold mb-2'}>Shipping Details</div>
          <AddressElement options={{ mode: 'shipping'}} />
        </div>
        <div className={'m-8'} />
        <div className={'text-xs uppercase font-bold mb-2'}>Payment Details</div>
        <PaymentElement />
        <button
          onClick={handlePurchase}
          className={
            'px-6 py-4 flex items-center justify-center border border-black bg-white text-black rounded w-full mt-4 mb-8'
          }
        >
          Purchase
        </button>
      </div>
    </div>
  )
}
