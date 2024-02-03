'use client'

import useSWR from 'swr'
import { IOrder } from '@/models/Order'
import Link from 'next/link'
import React from 'react'
import { authGetFetcher } from '@/utils/authGetFetcher'

function Orders({ initialData }: { initialData: IOrder[] }) {
  const { data: orders, error } = useSWR<IOrder[]>('/api/orders/user', authGetFetcher, {
    fallbackData: initialData,
  })

  if (error) return <div>Failed to load orders</div>
  if (!Array.isArray(orders)) return <div>No orders found</div>
  if (!orders) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-4">
      {orders &&
        orders?.map((order) => (
          <div key={order._id} className={'flex flex-col border rounded border-white-13'}>
            <Link href={`/me/orders/${order._id}`} className="p-4">
              <div>orderId: #{order._id}</div>
              <div>
                <div>{order.name}</div>
                <div>{order.email}</div>
                <div>{order.status}</div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Orders
