'use client'

import React from 'react'
import useSWR from 'swr'
import { Form, generateInitialFields } from 'mobx-zod-form-store'
import { IOrder, zodOrderSchema } from '@/models/Order'
import { orderFields } from '@/modules/shop/components/admin/order/fields'
import { IProduct } from '@/models/Product'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const EditOrderForm = ({ orderId }: { orderId: string }) => {
  const { data: order, error } = useSWR<IOrder>(`/api/orders/${orderId}`, fetcher)

  if (error) return <div>Failed to load order</div>
  if (!order) return <div>Loading...</div>

  const handleSubmit = async (fields: IOrder) => {
    // Prepare order data
    const orderToUpdate: IOrder = { ...fields }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderToUpdate),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log('Order update failed')
      } else {
        console.log('Order updated successfully:', data)
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  console.log('or', order)

  return (
    <div className={'flex flex-col gap-2'}>
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
        <div
          className={
            'inline-flex self-start py-2 px-5 border border-white-13 rounded text-sm'
          }
        >
          status: {order.status}
        </div>
      </div>

      {/*{order ? (*/}
      {/*  <Form<IOrder>*/}
      {/*    validationSchema={zodOrderSchema}*/}
      {/*    order={order}*/}
      {/*    fieldsConfig={orderFields}*/}
      {/*    onSubmit={handleSubmit}*/}
      {/*    className="flex flex-col gap-2"*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <p>Loading...</p>*/}
      {/*)}*/}
    </div>
  )
}

export default EditOrderForm
