'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { usePrivy } from '@privy-io/react-auth'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()

  let authenticated = false
  let login: (() => void) | undefined
  try {
    const privy = usePrivy()
    authenticated = privy.authenticated
    login = privy.login
  } catch {
    // Privy not available
  }

  if (cart.items.length === 0) {
    return (
      <div className="px-4 sm:px-8 py-16 text-center">
        <h1 className="text-2xl uppercase text-white mb-4">Your Cart</h1>
        <p className="text-white/40 mb-8">Your cart is empty.</p>
        <Link
          href="/shop"
          className="border border-white-13 px-8 py-3 text-sm uppercase text-white hover:bg-white/5"
        >
          Shop
        </Link>
      </div>
    )
  }

  const handleCheckout = () => {
    if (authenticated) {
      router.push('/checkout')
    } else {
      login?.()
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase text-white">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs uppercase text-white/40 hover:text-white"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-4 border border-white-13 p-4">
            {item.productImage && (
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="text-white text-sm uppercase">{item.productName}</div>
              {item.size && <p className="text-white/40 text-xs mt-1">Size: {item.size}</p>}
              <p className="text-white/60 text-sm mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                className="w-8 h-8 border border-white-13 text-white text-sm hover:bg-white/5 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                className="w-8 h-8 border border-white-13 text-white text-sm hover:bg-white/5 flex items-center justify-center"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId, item.size)}
                className="ml-2 text-white/30 hover:text-white text-lg"
                aria-label="Remove"
              >
                &times;
              </button>
            </div>
            <div className="text-white text-sm self-center w-20 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-white-13 pt-6">
        <div className="flex justify-between text-white text-lg uppercase mb-6">
          <span>Total</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/shop"
            className="border border-white-13 px-6 py-3 text-sm uppercase text-white/60 hover:bg-white/5 text-center"
          >
            Continue Shopping
          </Link>
          <button
            onClick={handleCheckout}
            className="flex-1 bg-white text-black py-3 text-sm uppercase text-center font-medium hover:bg-gray-200"
          >
            {authenticated ? 'Checkout' : 'Sign In to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}
