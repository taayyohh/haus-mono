'use client'

import {
  PaymentElement,
  useElements,
  useStripe,
  AddressElement,
} from '@stripe/react-stripe-js'
import useCartStore from '@/store/shop'
import PaymentModal from '@/modules/shop/components/PaymentModal'
import { useCallback, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { zodShippingAddressSchema } from '@/models/Order'
import { z } from 'zod'
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js'
import { validatePurchaseDetails } from '@/modules/shop/utils/validatePurchaseDetails'
import { createStripePaymentIntent } from '@/modules/shop/utils/createStripePaymentIntent'
import { confirmStripePayment } from '@/modules/shop/utils/confirmStripePayment'
import { sendEmailConfirmation } from '@/modules/shop/utils/sendEmailConfirmation'
import { getSuccessToken } from '@/modules/shop/utils/getSuccessToken'
import { createOrder } from '@/modules/shop/utils/createOrder'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export type addressType = z.infer<typeof zodShippingAddressSchema>

export default function Payment() {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { user, login } = usePrivy()

  const total = useCartStore((state) => state.cartTotal)
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems)
  const clearCart = useCartStore((state) => state.clearCart)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<undefined | string>(undefined)
  const [address, setAddress] = useState<undefined | addressType>(undefined)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const validatePayment = useCallback(async () => {
    if (!user) {
      login()
      return Promise.resolve(false)
    }

    return await validatePurchaseDetails(stripe, elements, email, setEmailError)
  }, [validatePurchaseDetails, stripe, elements, email, setEmailError, user])

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    if (event.complete) {
      setAddress(event.value.address)
      setName(event.value.name)
    }
  }

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true)
      const paymentIntent = await createStripePaymentIntent(total, email)

      const confirmError = await confirmStripePayment(
        stripe,
        elements,
        paymentIntent.client_secret as string
      )

      if (confirmError) {
        toast.error(confirmError?.message || 'There was an error with your purchase.')
        return
      }

      const { token } = await getSuccessToken(email)

      const createOrderResponse = await createOrder(
        {
          privyId: user?.id,
          email,
          name,
          products: items.map((item) => ({
            product: item.haus,
            quantity: item.quantity,
            size: item?.size,
          })),
          status: 'pending',
          totalPrice: total,
          dateOrdered: new Date().toISOString(),
          shippingAddress: address,
        },
        token
      )

      const _email = '<div>' + '<div>' + '</div></div>'


      if (createOrderResponse.ok) {
        const emailConfirmationResponse = await sendEmailConfirmation({
          from: '"LucidHaus" <no-reply@ifthen.club>',
          to: email,
          subject: 'Payment Confirmation',
          html: '<p>Your payment was successful!</p>',
        })

        if (emailConfirmationResponse.ok) {
          setIsPurchasing(false)
          clearCart()
          toast.message('Your purchase was successful!', {
            description: `A confirmation email has been sent to ${email}`,
          })
          router.push(`/me/orders/${createOrderResponse.order._id}`)
        }
      }
    } catch (err) {
      setIsPurchasing(false)
      toast.error('There was an error with your purchase.')
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
          className={`w-full p-4 py-5 border ${
            emailError ? 'border-[#df1b41]' : 'border-white-13'
          }  bg-[#1b1b1b] rounded text-white text-sm`}
          placeholder="Email Address"
        />
        {emailError && <div className="text-[#df1b41] text-sm mt-2">{emailError}</div>}
        <div className={'m-8'} />
        <div className={'w-full'}>
          <div className={'text-xs uppercase font-bold mb-2'}>Shipping Details</div>
          <AddressElement options={{ mode: 'shipping' }} onChange={handleAddressChange} />
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
          name={name}
          address={address}
          validateBeforeOpen={validatePayment}
          isLoading={isPurchasing}
        />
      </div>
    </div>
  )
}
