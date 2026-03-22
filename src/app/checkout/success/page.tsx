import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="px-4 sm:px-8 py-16 text-center max-w-lg mx-auto">
      <h1 className="text-3xl uppercase text-white mb-4">Order Confirmed</h1>
      <p className="text-white/60 mb-8">
        Thank you for your purchase. You will receive a confirmation email shortly.
      </p>
      <Link
        href="/shop"
        className="border border-white-13 px-8 py-3 text-sm uppercase text-white hover:bg-white/5"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
