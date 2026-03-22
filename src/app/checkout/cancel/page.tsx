import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Cancelled',
}

export default function CheckoutCancelPage() {
  return (
    <div className="px-4 sm:px-8 py-16 text-center max-w-lg mx-auto">
      <h1 className="text-3xl uppercase text-white mb-4">Payment Cancelled</h1>
      <p className="text-white/60 mb-8">
        Your payment was not completed. Your cart has been preserved.
      </p>
      <Link
        href="/cart"
        className="border border-white-13 px-8 py-3 text-sm uppercase text-white hover:bg-white/5"
      >
        Return to Cart
      </Link>
    </div>
  )
}
