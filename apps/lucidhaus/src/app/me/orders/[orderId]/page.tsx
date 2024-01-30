import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import React from 'react'
import { fetchUserOrder } from '@/modules/shop/utils/fetchUserOrder'
import { fetchBatchProducts } from '@/modules/shop/utils/fetchBatchProducts'
import ProductCard from '@/modules/shop/components/ProductCard'

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
        <div>
          {' '}
          <div className={'flex flex-col'}>
            <div className={'flex gap-2 text-sm items-center'}>
              <span className="text-lg">Order #:</span>
              <span className="text-sm font-light">{order._id}</span>
            </div>
            <div className={'text-2xl'}>{order.name}</div>
            <div className={'text-md'}>{order.email}</div>
            <div className="flex flex-col mt-4 gap-2">
              {order.shippingAddress && (
                <div>
                  <div>
                    {order.shippingAddress.line1},{' '}
                    {order.shippingAddress.line2 && (
                      <span>{order.shippingAddress.line2}</span>
                    )}
                  </div>

                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postal_code}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                </div>
              )}
            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <div className={'text-2xl py-3'}>
              {order.totalPrice} <span className={'text-xs'}>USD</span>
            </div>
            {order.trackingNumber && (
              <div
                className={'inline-flex self-start py-2 px-5 rounded text-sm bg-[#1b1b1b]'}
              >
                tracking number: #{order.trackingNumber}
              </div>
            )}
            {order.notes && (
              <div
                className={
                  'flex flex-col self-start py-2 px-5 rounded text-sm bg-[#1b1b1b] sm:max-w-[300px]'
                }
              >
                <div>notes:</div>
                <div>#{order.notes}</div>
              </div>
            )}
          </div>
          <div className={'text-3xl mt-12'}>Products</div>
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-solid border-t border-white-13'
            }
          >
            {order?.products &&
              order.products.map((product) => (
                <div key={product.product._id}>
                  <ProductCard product={product.product} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
