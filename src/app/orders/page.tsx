'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'

interface Order {
  id: string
  total: number
  status: string
  shippingAmount: number
  createdAt: string
  items: { id: string; name: string; quantity: number; price: number; size: string | null }[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  let authenticated = false
  let ready = false
  let login: (() => void) | undefined
  try {
    const privy = usePrivy()
    authenticated = privy.authenticated
    ready = privy.ready
    login = privy.login
  } catch {}

  useEffect(() => {
    if (ready && !authenticated) {
      login?.()
      return
    }
    if (!authenticated) return

    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ userOrders { id total status shippingAmount createdAt items { id name quantity price size } } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => { setOrders(data?.userOrders || []); setLoading(false); })
      .catch(() => setLoading(false))
  }, [authenticated, ready])

  if (!ready || loading) {
    return <div className="px-4 sm:px-8 py-16 text-center text-white/40">Loading...</div>
  }

  if (!authenticated) {
    return (
      <div className="px-4 sm:px-8 py-16 text-center">
        <h1 className="text-2xl uppercase text-white mb-4">Your Orders</h1>
        <p className="text-white/40 mb-8">Sign in to view your orders.</p>
        <button onClick={() => login?.()} className="bg-white text-black px-8 py-3 text-sm uppercase hover:bg-gray-200">
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-8 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl uppercase text-white mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-white/40 text-sm">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-white-13 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-white text-sm">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </div>
                  <div className="text-white/40 text-xs mt-1">Order {order.id.slice(0, 8)}...</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm">${order.total.toFixed(2)}</span>
                  <span className={`text-xs uppercase px-2 py-1 ${
                    order.status === 'DELIVERED' ? 'text-green-400' :
                    order.status === 'SHIPPED' ? 'text-blue-400' :
                    order.status === 'PROCESSING' ? 'text-yellow-400' :
                    order.status === 'CANCELED' ? 'text-red-400' :
                    'text-white/40'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-white-13 pt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-white/80">
                      {item.name} x{item.quantity}
                      {item.size && <span className="text-white/40 ml-1">({item.size})</span>}
                    </span>
                    <span className="text-white/40">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
