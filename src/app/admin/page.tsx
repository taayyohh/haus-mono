'use client'

import { useEffect, useState } from 'react'

interface Metrics {
  totalOrders: number
  totalRevenue: number
  artistCount: number
  albumCount: number
  pendingOrders: number
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ adminMetrics { totalOrders totalRevenue artistCount albumCount pendingOrders } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setMetrics(data?.adminMetrics))
      .catch(() => {})
  }, [])

  const cards = metrics ? [
    { label: 'Total Orders', value: metrics.totalOrders },
    { label: 'Revenue', value: `$${metrics.totalRevenue.toFixed(2)}` },
    { label: 'Artists', value: metrics.artistCount },
    { label: 'Albums', value: metrics.albumCount },
    { label: 'Pending Orders', value: metrics.pendingOrders },
  ] : []

  return (
    <div>
      <h1 className="text-2xl uppercase text-white mb-8">Dashboard</h1>

      {!metrics ? (
        <p className="text-white/40">Loading metrics...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="border border-white-13 p-6">
              <div className="text-xs uppercase text-white/40 mb-2">{card.label}</div>
              <div className="text-2xl text-white font-bold">{card.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
