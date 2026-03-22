'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { StripeWrapper } from '@/components/stripe/StripeWrapper'
import { PaymentForm } from '@/components/checkout/PaymentForm'
import { useCart } from '@/hooks/useCart'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { authenticated, ready, login, user } = usePrivy()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })

  // Redirect to cart if not authenticated (cart handles login)
  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/cart')
    }
  }, [ready, authenticated, router])

  // Pre-fill email from Privy
  useEffect(() => {
    if (user?.email?.address && !shippingAddress.email) {
      setShippingAddress(s => ({ ...s, email: user.email!.address }))
    }
  }, [user])

  if (cart.items.length === 0) {
    router.push('/cart')
    return <div className="px-4 sm:px-8 py-16 text-center text-white/40">Redirecting...</div>
  }

  if (!ready || !authenticated) {
    return <div className="px-4 sm:px-8 py-16 text-center text-white/40">Loading...</div>
  }

  const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0)
  const shippingAmount = totalItems > 5 ? 10 : 5

  const handleCreatePaymentIntent = async () => {
    setError(null)
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          cartItems: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
          })),
          shippingAddress,
        }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
        return
      }
      setClientSecret(data.clientSecret)
    } catch {
      setError('Failed to create payment. Please try again.')
    }
  }

  const handleSuccess = (paymentIntentId: string) => {
    clearCart()
    router.push(`/checkout/success?payment_intent=${paymentIntentId}`)
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl uppercase text-white mb-8">Checkout</h1>

      {/* Order summary */}
      <div className="border border-white-13 p-6 mb-8">
        <h2 className="text-xs uppercase tracking-widest text-white/50 mb-4">Order Summary</h2>
        {cart.items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm text-white py-2 border-b border-white-13">
            <span>
              {item.productName} x{item.quantity}
              {item.size && <span className="text-white/40 ml-1">({item.size})</span>}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm text-white/60 py-2">
          <span>Shipping</span>
          <span>${shippingAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white text-lg uppercase pt-4 border-t border-white-13">
          <span>Total</span>
          <span>${(cart.total + shippingAmount).toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping address */}
      {!clientSecret && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-white/50">Contact & Shipping</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) => setShippingAddress(s => ({ ...s, firstName: e.target.value }))}
              className="p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) => setShippingAddress(s => ({ ...s, lastName: e.target.value }))}
              className="p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={shippingAddress.email}
            onChange={(e) => setShippingAddress(s => ({ ...s, email: e.target.value }))}
            className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={shippingAddress.street}
            onChange={(e) => setShippingAddress(s => ({ ...s, street: e.target.value }))}
            className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress(s => ({ ...s, city: e.target.value }))}
              className="p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            />
            <input
              type="text"
              placeholder="State"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress(s => ({ ...s, state: e.target.value }))}
              className="p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={shippingAddress.zipCode}
              onChange={(e) => setShippingAddress(s => ({ ...s, zipCode: e.target.value }))}
              className="p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleCreatePaymentIntent}
            className="w-full py-3 bg-white text-black text-sm uppercase font-medium hover:bg-gray-200"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {/* Payment form */}
      {clientSecret && (
        <StripeWrapper clientSecret={clientSecret}>
          <PaymentForm
            clientSecret={clientSecret}
            onSuccess={handleSuccess}
            onError={(err) => setError(err)}
            email={shippingAddress.email}
          />
        </StripeWrapper>
      )}
    </div>
  )
}
