'use client'

import React from 'react'
import useSWR from 'swr'
import { Form } from 'mobx-zod-form-store'
import { IOrder } from '@/models/Order'
import { partialOrderFields } from '@/modules/shop/components/admin/order/fields'
import ProductCard from '@/modules/shop/components/ProductCard'
import Modal from '@/components/Modal'
import { z } from 'zod'
import { toast } from 'sonner'
import { sendEmailConfirmation } from '@/modules/shop/utils/sendEmailConfirmation'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const zodPartialOrderSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
})
export type IPartialOrder = z.infer<typeof zodPartialOrderSchema>

const EditOrderForm = ({ orderId }: { orderId: string }) => {
  const { data: order, error, mutate } = useSWR<IOrder>(`/api/orders/${orderId}`, fetcher)
  const initialFields = zodPartialOrderSchema.parse({
    trackingNumber: order?.trackingNumber || '',
    status: order?.status || 'pending',
    notes: order?.notes || '',
  })
  const onSubmit = async (fields: IPartialOrder) => {
    const updatedOrder = { ...order, ...fields, dateShipped: new Date().toISOString() }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      })

      await response.json()

      if (!response.ok) {
        toast.error('Order update failed.')
      } else {
        mutate()
        try {
          if (updatedOrder.status === 'shipped') {
            const emailConfirmationResponse = await sendEmailConfirmation({
              from: '"LucidHaus" <no-reply@ifthen.club>',
              to: updatedOrder.email as string,
              subject: `Hi, ${updatedOrder.name} - your order from LucidHaus has been shipped!`,
              html: '<p>Your Order has shipped!</p>',
            })

            if (emailConfirmationResponse.ok) {
              toast.message(`Order updated and email to ${updatedOrder.email} sent!`)
            }
          }
        } catch (err) {
          console.log('err', err)
        }
      }
    } catch (error) {
      toast.error('Error updating order')
    }
  }

  if (error) return <div>Failed to load order</div>
  if (!order) return <div>Loading...</div>

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

        <Modal
          trigger={
            <div
              className={
                'inline-flex self-start py-2 px-5 border border-white-13 rounded text-sm cursor-pointer hover:bg-[#111]'
              }
            >
              status: {order.status}
            </div>
          }
        >
          <div className={'text-3xl mt-12 font-bold mb-4'}>Update Order</div>
          <Form
            fieldsConfig={partialOrderFields}
            initialFields={initialFields}
            validationSchema={zodPartialOrderSchema}
            onSubmit={onSubmit}
            className={'w-[400px]'}
          />
        </Modal>
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
  )
}

export default EditOrderForm
