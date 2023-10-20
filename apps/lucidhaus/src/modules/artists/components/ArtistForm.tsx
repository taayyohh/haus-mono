'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { IGenre } from '@/models/Genre' // Adjust path if needed

interface ArtistFormProps {
  // Add any additional props for the component here
}

export interface ArtistFormData {
  name: string
  bio: string
  genre: string
  albums: string[]
  heroImage: string
  socialLinks: {
    twitter?: string
    instagram?: string
    zora?: string
    futureTape?: string
    warpcast?: string
  }
  ethereum: {
    walletAddresses: string[]
    ensName: string
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  heroImage: Yup.string().required('Image is required'),
})

const ArtistForm: React.FC<ArtistFormProps> = () => {
  const [formData, setFormData] = useState<ArtistFormData>({
    name: '',
    bio: '',
    genre: '',
    albums: [],
    heroImage: '',
    socialLinks: {
      twitter: '',
      instagram: '',
      zora: '',
      futureTape: '',
      warpcast: '',
    },
    ethereum: {
      walletAddresses: [],
      ensName: '',
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // You can update the nested properties like socialLinks or ethereum accordingly here
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

    console.log(formData)
    try {
      await validationSchema.validate(formData, { abortEarly: false })

      const response = await fetch('/api/artists', {
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
      } else {
        console.log('Artist created successfully:', data)
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

  const { name, heroImage, bio } = formData

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full space-y-4 max-h-[70vh] overflow-y-scroll text-white"
    >
      <h2 className="text-right mb-8 border-b pb-2">Create a New Artist</h2>
      <div className="flex flex-col space-y-1">
        <SingleImageUpload
          handleChange={setFormData}
          name="heroImage"
          value={heroImage}
        />

        <label htmlFor="name" className="text-xs font-medium uppercase">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="bio" className="text-xs font-medium uppercase">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.bio ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.bio && <span className="error">{errors.bio}</span>}
      </div>

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
        Create Artist
      </button>
      <Notification message={errorMessage} onClose={handleCloseNotification} />
    </form>
  )
}

export default ArtistForm
