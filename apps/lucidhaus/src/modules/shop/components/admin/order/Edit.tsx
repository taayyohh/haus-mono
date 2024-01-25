'use client'

import React from 'react'
import useSWR from 'swr'
import { Form, generateInitialFields } from 'mobx-zod-form-store'
import { IOrder, zodOrderSchema } from '@/models/Order'
import { orderFields } from '@/modules/shop/components/admin/order/fields'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const EditOrderForm = ({ orderId }: { orderId: string }) => {
  const { data: initialFields, error } = useSWR<IOrder>(`/api/orders/${orderId}`, fetcher)

  if (error) return <div>Failed to load order</div>
  if (!initialFields) return <div>Loading...</div>

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

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex flex-col'}>
        <div className={'text-2xl'}>{initialFields.name}</div>
        <div className={'text-md'}>{initialFields.email}</div>
      </div>
      <div className={'flex flex-col gap-4'}>
        <div>
          {initialFields.totalPrice} <span className={'text-xs'}>USD</span>
        </div>
        <div className={'inline-flex self-start py-2 px-5 border border-white-13 rounded text-sm'}>
          status: {initialFields.status}
        </div>
      </div>

      {/*{initialFields ? (*/}
      {/*  <Form<IOrder>*/}
      {/*    validationSchema={zodOrderSchema}*/}
      {/*    initialFields={initialFields}*/}
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
