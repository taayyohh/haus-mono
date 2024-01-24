'use client'

import React, { useState, useEffect } from 'react'
import { Form, generateInitialFields } from 'mobx-zod-form-store'
import { IProduct, zodProductSchema } from '@/models/Product'
import { productFields } from '@/modules/shop/components/admin/product/fields'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const EditProductForm = ({ slug }: { slug: string }) => {
  const { data: initialFields, error } = useSWR<IProduct>(
    `/api/products/${slug}`,
    fetcher
  )

  if (error) return <div>Failed to load product</div>
  if (!initialFields) return <div>Loading...</div>

  const handleSubmit = async (fields: IProduct) => {
    // Prepare product data
    const productToUpdate: IProduct = { ...fields }

    try {
      const response = await fetch(`/api/products/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToUpdate),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log('Product update failed')
      } else {
        console.log('Product updated successfully:', data)
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div>
      {initialFields ? (
        <Form<IProduct>
          validationSchema={zodProductSchema}
          initialFields={initialFields}
          fieldsConfig={productFields}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default EditProductForm
