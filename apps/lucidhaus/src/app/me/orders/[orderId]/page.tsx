import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import React from 'react'
import { fetchUserOrder } from '@/modules/shop/utils/fetchUserOrder'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'Timeless, post-genre, Black music.',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'LUCIDHAUS',
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
    ),
  },
}
export default async function Page(context: any) {
  const { data: order } = await fetchUserOrder(context.params.orderId)

  return (
    <div className="flex flex-col gap-4">
      {order && (
        <div key={order._id} className={'flex flex-col border rounded border-white-13'}>
          <Link href={`/me/orders/${order._id}`} className="p-4">
            <div>Id:{order._id}</div>
            <div>{order.email}</div>
            <div>{order.status}</div>
          </Link>
        </div>
      )}
    </div>
  )
}
