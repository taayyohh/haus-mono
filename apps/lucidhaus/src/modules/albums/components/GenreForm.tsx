'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import slugify from 'slugify'

interface GenreFormProps {
  initialData?: GenreFormData
  mode?: 'create' | 'edit'
  onDelete?: () => void
}

export interface GenreFormData {
  name: string
  description?: string
  _id: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Genre name is required'),
  description: Yup.string(),
})

const GenreForm = ({ initialData, mode = 'create', onDelete }: GenreFormProps) => {
  const [formData, setFormData] = useState<GenreFormData>(
    initialData || {
      name: '',
      description: '',
      _id: '',
    }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleDeleteGenre = async () => {
    const endpoint = `/api/genre/${slugify(initialData?.name || '', {
      lower: true,
    })}?id=${initialData?._id}`
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error)
      }
      if (onDelete) onDelete() // Call the onDelete callback if provided
    } catch (error: any) {
      setErrorMessage(error.message || 'Error deleting genre')
      setShowNotification(true)
    }
  }

  const handleDelete = () => {
    // You can add a confirmation dialog here if you want
    if (window.confirm('Are you sure you want to delete this genre?')) {
      handleDeleteGenre()
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const endpoint =
      mode === 'create'
        ? '/api/genre'
        : `/api/genre/${slugify(initialData?.name || '', { lower: true })}?id=${
            initialData?._id
          }` // Assuming name is unique and used as an identifier
    const method = mode === 'create' ? 'POST' : 'PUT'

    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
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
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 pb-20 w-full flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll text-white"
    >
      <h2 className="text-right mb-8 border-b pb-2">
        {mode === 'create' ? 'Create a New Genre' : 'Edit Genre'}
      </h2>
      <label htmlFor="name" className="text-xs font-medium uppercase">
        Genre Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <label htmlFor="description" className="text-xs font-medium uppercase">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.description ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        {mode === 'create' ? 'Create Genre' : 'Update Genre'}
      </button>
      {mode === 'edit' && (
        <button
          type="button"
          onClick={handleDelete}
          className="p-3 mt-4 bg-red-500 hover:bg-red-600 text-xs text-white uppercase font-bold focus:outline-none"
        >
          Delete Genre
        </button>
      )}
      <Notification
        message={errorMessage}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  )
}

export default GenreForm
