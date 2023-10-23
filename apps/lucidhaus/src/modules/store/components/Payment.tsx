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
import PaymentModal from '@/modules/store/components/PaymentModal'
import { useState } from 'react'
import * as Yup from 'yup'
import { afterPaymentSuccess } from '@/modules/auth/utils/afterPaymentSuccess'
import { usePrivy } from '@privy-io/react-auth'

export default function Payment() {
  const stripe = useStripe()
  const elements = useElements()
  const total = useCartStore((state) => state.cartTotal)
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems)
  const { user } = usePrivy()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const emailValidationSchema = Yup.string()
    .email('Invalid email address')
    .required('Email is required')

  const handlePurchase = async () => {
    if (!stripe || !elements) return null

    try {
      await emailValidationSchema.validate(email)
    } catch (error) {
      setEmailError('Error handling email')
      return
    }

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
      body: JSON.stringify({ price: Math.round(total * 100), email }),
    })
    const paymentIntent: Stripe.PaymentIntent = await stripePayment.json()

    try {
      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect: 'if_required',
        clientSecret: paymentIntent.client_secret as string,
        confirmParams: {
          return_url: config.BASE_URL!,
        },
      })
    } catch (err) {
      console.log('err', err)
      return
    }

    let token
    try {
      const response = await fetch('/api/stripe/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      token = data.token
    } catch (error) {
      console.error('Error:', error)
      throw error // or handle the error as you see fit
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
      },
      // you can also send other data in the body if required
      body: JSON.stringify({
        user,
        email,
        products: items.map((item) => ({
          product: item.haus,
          quantity: item.quantity,
          size: item?.size,
        })),
        status: 'pending',
        totalPrice: total,
        dateOrdered: Date.now(),
        shippingAddress: '',
      }),
    })

    if (response.ok) {
      const data = await response.json()
      // Handle successful response data
      console.log(data)
    } else {
      // Handle errors
      console.error('Error sending token to server:', response.statusText)
    }
  }
  return (
    <div className={'w-full min-w-[100%]  sm:min-w-[400px] mt-8'}>
      <div className={'w-full mx-auto'}>
        <div className={'m-8'} />
        <div className={'text-xs uppercase font-bold mb-2'}>Email Address</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 py-5 border border-white-13 bg-[#1b1b1b] rounded text-white text-sm"
          placeholder="Email Address"
        />
        {emailError && <div className="text-red-500 mt-2">{emailError}</div>}
        <div className={'m-8'} />
        <div className={'w-full'}>
          <div className={'text-xs uppercase font-bold mb-2'}>Shipping Details</div>
          <AddressElement options={{ mode: 'shipping' }} />
        </div>
        <div className={'m-8'} />
        <div className={'text-xs uppercase font-bold mb-2'}>Payment Details</div>
        <PaymentElement options={{ layout: 'accordion' }} />
        <PaymentModal
          handlePurchase={handlePurchase}
          items={items}
          total={total}
          totalItems={totalItems}
          email={email}
        />
      </div>
    </div>
  )
}
