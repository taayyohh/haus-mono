'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Order {
  id: string
  total: number
  status: string
  shippingAmount: number
  taxAmount: number
  shippingAddress: any
  trackingNumber: string | null
  createdAt: string
  user: { email: string; firstName: string | null; lastName: string | null } | null
  items: { id: string; name: string; quantity: number; price: number; size: string | null }[]
}

const STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED']

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [updating, setUpdating] = useState(false)

  const fetchOrder = () => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ adminOrder(orderId: "${params.id}") { id total status shippingAmount taxAmount shippingAddress trackingNumber createdAt user { email firstName lastName } items { id name quantity price size } } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setOrder(data?.adminOrder))
  }

  useEffect(() => { fetchOrder() }, [params.id])

  const updateStatus = async (status: string) => {
    setUpdating(true)
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `mutation { updateOrderStatus(orderId: "${params.id}", status: "${status}") { id status } }`,
      }),
    })
    setUpdating(false)
    fetchOrder()
  }

  if (!order) return <div className="text-white/40">Loading...</div>

  const address = order.shippingAddress as any

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl uppercase text-white mb-8">Order {order.id.slice(0, 8)}...</h1>

      <div className="space-y-6">
        {/* Status */}
        <div className="border border-white-13 p-6">
          <div className="text-xs uppercase text-white/40 mb-3">Status</div>
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={updating || order.status === s}
                className={`px-4 py-2 text-xs uppercase border ${
                  order.status === s
                    ? 'border-white text-white bg-white/10'
                    : 'border-white-13 text-white/40 hover:text-white hover:bg-white/5'
                } disabled:cursor-not-allowed`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div className="border border-white-13 p-6">
          <div className="text-xs uppercase text-white/40 mb-3">Customer</div>
          <div className="text-white text-sm">{order.user?.email}</div>
          {order.user?.firstName && (
            <div className="text-white/60 text-sm">{order.user.firstName} {order.user.lastName}</div>
          )}
          <div className="text-white/40 text-xs mt-2">{new Date(order.createdAt).toLocaleString()}</div>
        </div>

        {/* Shipping */}
        {address && Object.keys(address).length > 0 && (
          <div className="border border-white-13 p-6">
            <div className="text-xs uppercase text-white/40 mb-3">Shipping Address</div>
            <div className="text-white text-sm">
              {address.street && <div>{address.street}</div>}
              {address.city && <div>{address.city}, {address.state} {address.zipCode}</div>}
              {address.country && <div>{address.country}</div>}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="border border-white-13 p-6">
          <div className="text-xs uppercase text-white/40 mb-3">Items</div>
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b border-white-13 last:border-0 text-sm">
              <span className="text-white">
                {item.name} x{item.quantity}
                {item.size && <span className="text-white/40 ml-1">({item.size})</span>}
              </span>
              <span className="text-white/60">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-4 space-y-1 text-sm">
            <div className="flex justify-between text-white/40">
              <span>Shipping</span>
              <span>${order.shippingAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold uppercase">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
