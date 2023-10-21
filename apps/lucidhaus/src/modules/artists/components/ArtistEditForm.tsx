'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { IGenre } from '@/models/Genre'

interface ArtistEditFormProps {
  slug: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  heroImage: Yup.string().required('Image is required'),
})

const ArtistEditForm: React.FC<ArtistEditFormProps> = ({ slug }) => {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(`/api/artists/${slug}`)
        const data = await response.json()
        if (data) {
          setFormData(data)
        }
      } catch (error) {
        console.error('Error fetching artist data:', error)
      }
    }

    fetchArtistData()
  }, [slug])

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const response = await fetch(`/api/artists/${slug}`, {
        method: 'PUT',
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
        console.log('Artist updated successfully:', data)
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/artists/${slug}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
      } else {
        console.log('Artist deleted successfully:', data)
        // Handle successful deletion (e.g., redirect to another page or show a success message)
      }
    } catch (error) {
      console.error(error)
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
      <h2 className="text-right mb-8 border-b pb-2">Edit Artist</h2>

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

      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="p-3 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
        >
          Update Artist
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="p-3 bg-red-600 hover:bg-red-700 text-xs text-white uppercase font-bold focus:outline-none"
        >
          Delete Artist
        </button>
      </div>

      <Notification message={errorMessage} onClose={handleCloseNotification} />
    </form>
  )
}

export default ArtistEditForm
