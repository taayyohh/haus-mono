'use client'

import React from 'react'
import { Form, generateInitialFields } from 'mobx-zod-form-store'
import { IProduct, zodProductSchema } from '@/models/Product'
import { createStripeProduct } from '@/modules/shop'
import { productFields } from '@/modules/shop/components/admin/product/fields'

const EditProductForm = () => {
  const handleSubmit = async (fields: IProduct) => {
    // Creating a Stripe product
    const stripeProduct = await createStripeProduct({
      name: fields.name,
      description: fields.description,
      imageUri: fields.imageUri,
      price: fields.price * 100,
    })

    // Preparing the product data
    const product: IProduct = { ...fields, stripeId: stripeProduct.id }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    const data = await response.json()

    if (!response.ok) {
      console.log('failed')
    } else {
      console.log('Product created successfully:', data)
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

export default EditProductForm
