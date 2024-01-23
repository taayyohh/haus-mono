'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { IArtist } from '@/models/Artist'
import useSWR from 'swr'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'

interface VideoFormProps {}

export interface VideoFormData {
  title: string
  releaseDate: Date
  song: string
  primaryArtist: string
  artists: string[]
  videoUri: string
  thumbnailUri: string
  director: string
  producers: string[]
  cinematographers: string[]
  choreographers: string[]
  videoEditors: string[]
  productionCompany: string
  locations: string[]
  cameoAppearances: string[]
  collectionAddress: string
  videoNotes: string
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  releaseDate: Yup.date().required('Release date is required'),
  primaryArtist: Yup.string().required('Primary artist is required'),
  collectionAddress: Yup.string().required('Collection address required'),
})

const VideoForm: React.FC<VideoFormProps> = () => {
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    releaseDate: new Date(),
    song: '',
    primaryArtist: '',
    artists: [],
    videoUri: '',
    thumbnailUri: '',
    director: '',
    producers: [],
    cinematographers: [],
    choreographers: [],
    videoEditors: [],
    productionCompany: '',
    locations: [],
    cameoAppearances: [],
    collectionAddress: '',
    videoNotes: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'releaseDate') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: new Date(value),
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const response = await fetch('/api/videos', {
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
      <h2 className="text-right mb-8 border-b pb-2">Create a New Music Video</h2>
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
      <label htmlFor="releaseDate" className="text-xs font-medium uppercase">
        Release Date
      </label>
      <input
        type="date"
        id="releaseDate"
        name="releaseDate"
        value={formData.releaseDate.toISOString().split('T')[0]}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.releaseDate ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      <label htmlFor="primaryArtist" className="text-xs font-medium uppercase">
        Primary Artist
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
        <option value="">Select a primary artist</option>
        {artists?.map((artist) => (
          <option key={artist._id} value={artist._id}>
            {artist.name}
          </option>
        ))}
      </select>
      <label htmlFor="title" className="text-xs font-medium uppercase">
        Video Thumbnail
      </label>
      <SingleImageUpload
        handleChange={setFormData}
        name="thumbnailUri"
        value={formData.thumbnailUri}
      />
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
      {/* You can continue adding fields for producers, cinematographers, etc. in a similar manner */}
      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        Create Music Video
      </button>
      <Notification message={errorMessage} onClose={handleCloseNotification} />
    </form>
  )
}

export default VideoForm
