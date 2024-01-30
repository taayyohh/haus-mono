'use client'

import React from 'react'
import { Form, generateInitialFields } from 'mobx-zod-form-store'
import { IProduct, zodProductSchema } from '@/models/Product'
import { createStripeProduct } from '@/modules/shop'
import { productFields } from '@/modules/shop/components/admin/product/fields'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { toast } from 'sonner'

const CreateProductForm = () => {
  const handleSubmit = async (fields: IProduct) => {
    // Creating a Stripe product
    const response = await fetch('/api/stripe/product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fields.name,
        description: fields.description,
        imageUri: [getIpfsGateway(fields.imageUri[0])],
        price: fields.price,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create product')
    }

    const stripeProduct = await response.json()

    // Preparing the product data
    const product: IProduct = { ...fields, stripeId: stripeProduct.id }

    const createdProduct = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    const data = await createdProduct.json()

    if (!createdProduct.ok) {
      console.log('failed')
    } else {
      console.log('Product created successfully:', data)
      toast.message(`${product.name} created successfully`)
    }
  }

  return (
    <Form<IProduct>
      validationSchema={zodProductSchema}
      initialFields={generateInitialFields(productFields)}
      fieldsConfig={productFields}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    />
  )
}

export default CreateProductForm
