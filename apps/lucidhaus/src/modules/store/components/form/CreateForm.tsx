'use client'

import React from 'react'
import { z, ZodSchema } from 'zod'
import { Form, FormFieldType } from 'mobx-zod-form-store'
import { IProduct, StockSize } from '@/models/Product'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import { createStripeProduct } from '@/modules/store'

const stockItemSchema = z.object({
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  quantity: z.number().min(0),
})

const productSchema: ZodSchema<IProduct> = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string(),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().min(10, 'Description is required'),
  imageUri: z.array(z.string()),
  stripeId: z.string(),
  artists: z.array(z.string()),
  quantity: z.number().min(0).optional(),
  stock: z.array(stockItemSchema).optional(),
})

const ProductForm = () => {
  const loadArtists = async () => {
    return (await fetchArtists(1, 30)).data.map((artist) => ({
      value: artist._id,
      label: artist.name,
    }))
  }

  const fieldsConfig = [
    {
      name: 'name',
      type: FormFieldType.Text,
      placeholder: 'Product Name',
    },
    {
      name: 'price',
      type: FormFieldType.Number,
      placeholder: 'Price',
    },
    {
      name: 'description',
      type: FormFieldType.TextArea,
      placeholder: 'Description',
    },
    {
      name: 'artists',
      type: FormFieldType.MultiSelect,
      loadOptions: loadArtists,
    },
    {
      name: 'quantity',
      type: FormFieldType.Number,
      placeholder: 'Quantity',
    },
    {
      name: 'stock',
      type: FormFieldType.MultiItem,
      fields: [
        {
          name: 'size',
          type: 'select' as 'select',
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          defaultValue: 'M',
        },
        { name: 'quantity', type: 'number' as 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'imageUri',
      type: FormFieldType.ImageUpload,
    },
  ]

  const initialFields = {
    name: 'This Cool Vinyl',
    slug: '',
    price: 20,
    description: 'This is the best thing we have ever done',
    imageUri: [
      'ipfs://bafybeiexxear7grtdaczeaviyvxliwnesiccmjcdulpo74xqka5acrc3x4/download-1.jpg',
      'ipfs://bafybeidab6ezemqjn5dnvb6iixl7hlndkcjysfabgf5lynv3jadw5eqnmy/download.jpg',
      'ipfs://bafybeidzybus5kwvn2oenjl6mdlpl7bupdzunvjw4gfxiuorc2ctmyh7yy/new.png',
    ],
    stripeId: '',
    artists: ['652315460221ca921c70e24e', '6534127e0a257e46da0eeca0'],
    quantity: 3,
    stock: [
      {
        size: 'M' as StockSize,
        quantity: 21,
      },
      {
        size: 'M' as StockSize,
        quantity: 40,
      },
    ],
  }

  const handleSubmit = async (fields: IProduct) => {
    // Creating a Stripe product
    const stripeProduct = await createStripeProduct({
      name: fields.name,
      description: fields.description,
      imageUri: fields.imageUri[0],
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
      validationSchema={productSchema}
      initialFields={initialFields}
      fieldsConfig={fieldsConfig}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    />
  )
}

export default ProductForm
