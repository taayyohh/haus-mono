'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import useSWR from 'swr'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import { IArtist } from '@/models/Artist'

interface BlogFormProps {}

export interface BlogFormData {
  title: string
  description: string
  publishedDate: Date
  thumbnailUri: string
  primaryArtist: string
  collectionAddress: string
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Content is required'),
  publishedDate: Yup.date().required('Published date is required'),
  thumbnailUri: Yup.string().required('Thumbnail is required'),
  primaryArtist: Yup.string().required('Author is required'),
  collectionAddress: Yup.string().required('Collection Address is required'),
})

const BlogForm: React.FC<BlogFormProps> = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    description: '',
    publishedDate: new Date(),
    thumbnailUri: '',
    primaryArtist: '',
    collectionAddress: '',
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
      await validationSchema.validate(formData, { abortEarly: false })
      const response = await fetch('/api/blog', {
        method: 'POST',
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

  // Using useSWR to fetch artists
  const { data: artistsData } = useSWR<{ data: IArtist[] }>('artists', () =>
    fetchArtists()
  )
  const artists = artistsData?.data || []

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 pb-20 w-full flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll text-white"
    >
      <h2 className="text-right mb-8 border-b pb-2">Create a New Blog Post</h2>
      <label htmlFor="title" className="text-xs font-medium uppercase">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.title ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <label htmlFor="description" className="text-xs font-medium uppercase">
        Content
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
      <label htmlFor="publishedDate" className="text-xs font-medium uppercase">
        Published Date
      </label>
      <input
        type="date"
        id="publishedDate"
        name="publishedDate"
        value={formData.publishedDate.toISOString().split('T')[0]}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.publishedDate ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <label htmlFor="thumbnailUri" className="text-xs font-medium uppercase">
        Thumbnail Image
      </label>
      <SingleImageUpload
        handleChange={setFormData}
        name="thumbnailUri"
        value={formData.thumbnailUri}
      />
      <label htmlFor="primaryArtist" className="text-xs font-medium uppercase">
        Author
      </label>
      <select
        id="primaryArtist"
        name="primaryArtist"
        value={formData.primaryArtist}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.primaryArtist ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Select an primaryArtist</option>
        {artists?.map((artist) => (
          <option key={artist._id} value={artist._id}>
            {artist.name}
          </option>
        ))}
      </select>
      <label htmlFor="collectionAddress" className="text-xs font-medium uppercase">
        Collection Address
      </label>
      <input
        type="text"
        id="collectionAddress"
        name="collectionAddress"
        value={formData.collectionAddress}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.collectionAddress ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        Publish Blog Post
      </button>
      <Notification message={errorMessage} onClose={handleCloseNotification} />
    </form>
  )
}

export default BlogForm
