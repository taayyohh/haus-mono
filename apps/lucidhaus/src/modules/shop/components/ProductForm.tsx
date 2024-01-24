'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { stripe } from '@/stripe/stripe-sdk'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Input from '@/components/form/Input'
import TextArea from '@/components/form/TexArea'

interface ProductFormProps {
  // Add any additional props for the component here
}

interface StockItem {
  size: string
  quantity: number
}

export interface ProductFormData {
  name: string
  price: number
  quantity: number
  description: string
  category: string
  imageUri: string
  stripeId: string
  artists: string[]
  stock: StockItem[]
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  quantity: Yup.number().required('Quantity is required'),
  description: Yup.string(),
  category: Yup.string().required('Category is required'),
  imageUri: Yup.string().required('Image is required'),
  stripeId: Yup.string().required('Stripe Id required'),
})

const ProductForm: React.FC<ProductFormProps> = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category: '',
    imageUri: '',
    stripeId: '',
    artists: [],
    stock: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const stripeProduct = await stripe.products.create({
        name: formData.name,
        description: formData.description,
        images: [getIpfsGateway(formData.imageUri)],
        default_price_data: {
          currency: 'USD',
          unit_amount: formData.price * 100,
        },
        statement_descriptor: 'LucidHaus',
        tax_code: 'txcd_99999999', //TODO: make this a field in the form
      })
      const storedProduct = {
        ...formData,
        stripeId: stripeProduct.id,
      }

      const stockItemSchema = Yup.object().shape({
        size: Yup.string().oneOf(['XS', 'S', 'M', 'L', 'XL', 'XXL']).required(),
        quantity: Yup.number().min(0).required(),
      })

      const validationSchema = Yup.object().shape({
        // ...existing fields...
        artists: Yup.array(Yup.string()).optional(),
        stock: Yup.array(stockItemSchema).optional(),
      })

      await validationSchema.validate(storedProduct, { abortEarly: false })

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedProduct),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
      } else {
        console.log('Product created successfully:', data)
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })

        setErrors(validationErrors)
      } else {
        console.error(error)
      }
    }
  }

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const { name, price, quantity, description, category, imageUri } = formData
  console.log('FOR', formData)

  const handleArtistsChange = (selectedArtists: string[]) => {
    setFormData((prev) => ({ ...prev, artists: selectedArtists }))
  }

  const handleAddStockItem = () => {
    setFormData((prev) => ({
      ...prev,
      stock: [...prev.stock, { size: '', quantity: 0 }],
    }))
  }

  const handleRemoveStockItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stock: prev.stock.filter((_, idx) => idx !== index),
    }))
  }

  const handleStockItemChange = (
    index: number,
    field: keyof StockItem,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      stock: prev.stock.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 px-6 pt-8 pb-20 flex flex-col space-y-4 overflow-y-scroll text-white"
    >
      <h2 className="text-right mb-8 border-b pb-2">Create Product</h2>
      <SingleImageUpload handleChange={setFormData} name="imageUri" value={imageUri} />

      <Input
        id="name"
        name="name"
        type="text"
        value={name}
        error={errors.name}
        onChange={handleChange}
        label="Name"
      />

      <Input
        id="price"
        name="price"
        type="number"
        value={price}
        error={errors.price}
        onChange={handleChange}
        label="Price"
      />

      <Input
        id="quantity"
        name="quantity"
        type="number"
        value={quantity}
        error={errors.quantity}
        onChange={handleChange}
        label="Quantity"
      />

      <TextArea
        id="description"
        name="description"
        value={description}
        error={errors.description}
        onChange={handleChange}
        label="Description"
      />

      <Input
        id="category"
        name="category"
        type="text"
        value={category}
        error={errors.category}
        onChange={handleChange}
        label="Category"
      />

      {/* Slug field - consider if this should be a readonly FormInput or keep as is */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="slug" className="text-xs font-medium uppercase">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={slugify(name)}
          readOnly
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        Create
      </button>

      <Notification message={errorMessage} onClose={handleCloseNotification} />
    </form>
  )
}

export default ProductForm
