import React from 'react'
import Link from 'next/link'
import { fetchOrders } from '@/modules/shop'

export default async function Page() {
  const { data: orders } = await fetchOrders()

  return (
    <div>
      <h2 className="text-right mb-8 border-b pb-2">Manage | Orders</h2>
      <div className={'flex flex-col gap-6'}>
        {orders &&
          orders.map((order) => (
            <div key={order._id} className={'flex flex-col border rounded border-white-13'}>
              <Link href={`/admin/orders/${order._id}`} className='p-4'>
                <div>Id:{order._id}</div>
                <div>{order.email}</div>
                <div>{order.status}</div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
