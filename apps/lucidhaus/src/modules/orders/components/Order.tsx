'use client'

import useSWR from 'swr'
import { IOrder } from '@/models/Order'
import React from 'react'
import ProductCard from '@/modules/shop/components/ProductCard'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface OrderProps {
  orderId: string
  initialData: IOrder
}

function Order({ orderId, initialData }: OrderProps) {
  const { data: order, error } = useSWR<IOrder>(`/api/orders/user/${orderId}`, fetcher, {
    fallbackData: initialData,
  })

  if (error) return <div>Failed to load order</div>
  if (!order) return <div>Loading...</div>

  console.log('or', order)

  return (
    <div className="flex flex-col gap-4">
      {order && (
        <div>
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
                className={
                  'inline-flex self-start py-2 px-5 rounded text-sm bg-[#1b1b1b]'
                }
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
          <div className={'text-2xl mt-12 pb-1 mb-3'}>Products</div>
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-solid border-t border-white-13'
            }
          >
            {order?.products &&
              order.products.map((product, i) => (
                <div key={`${product.product._id}-${i}`}>
                  <ProductCard
                    product={product.product}
                    quantity={product.quantity}
                    size={product.size}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
