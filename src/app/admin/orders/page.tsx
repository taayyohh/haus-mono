'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  user: { email: string; firstName: string | null; lastName: string | null } | null
  items: { id: string; name: string; quantity: number; price: number; size: string | null }[]
}

const STATUS_OPTIONS = ['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const statusArg = statusFilter !== 'ALL' ? `status: "${statusFilter}"` : ''
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ adminOrders(limit: 50 ${statusArg}) { id total status createdAt user { email firstName lastName } items { id name quantity price size } } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setOrders(data?.adminOrders || []))
  }, [statusFilter])

  return (
    <div>
      <h1 className="text-2xl uppercase text-white mb-8">Orders</h1>

      <div className="flex gap-2 mb-6">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 text-xs uppercase ${
              statusFilter === s ? 'border border-white-13 text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="flex items-center justify-between border border-white-13 p-4 hover:bg-white/5"
          >
            <div>
              <div className="text-white text-sm">{order.user?.email || 'Unknown'}</div>
              <div className="text-white/40 text-xs">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''} &middot; {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">${order.total.toFixed(2)}</span>
              <span className={`text-xs uppercase px-2 py-1 ${
                order.status === 'DELIVERED' ? 'text-green-400' :
                order.status === 'PROCESSING' ? 'text-yellow-400' :
                order.status === 'CANCELED' ? 'text-red-400' :
                order.status === 'SHIPPED' ? 'text-blue-400' :
                'text-white/40'
              }`}>
                {order.status}
              </span>
            </div>
          </Link>
        ))}
        {orders.length === 0 && (
          <p className="text-white/40 text-sm py-8 text-center">No orders found.</p>
        )}
      </div>
    </div>
  )
}
