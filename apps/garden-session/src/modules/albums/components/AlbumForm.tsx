'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { IGenre } from '@/models/Genre'
import { IArtist } from '@/models/Artist'
import useSWR from 'swr'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import { fetchGenres } from '@/modules/albums/utils/fetchGenres'
export interface AlbumFormData {
  title: string
  releaseDate: Date
  genre: IGenre
  coverImageUri: string
  tracks: {
    title: string
    duration: number
    tokenId: string
  }[]
  artists: string[]
  primaryArtist: string
  collectionAddress: string
  label: string
  producers: string[]
  mixers: string[]
  masteringEngineers: string[]
  recordingEngineers: string[]
  studios: string[]
  additionalMusicians: string[]
  albumNotes: string
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  releaseDate: Yup.date().required('Release date is required'),
  genre: Yup.string().required('Genre is required'),
  coverImageUri: Yup.string().required('Cover image is required'),
  primaryArtist: Yup.string().required('Primary artist is required'),
  artists: Yup.array().of(Yup.string()),
  collectionAddress: Yup.string().required('Collection address is required'),
  label: Yup.string(),
  producers: Yup.array().of(Yup.string()),
  mixers: Yup.array().of(Yup.string()),
  masteringEngineers: Yup.array().of(Yup.string()),
  recordingEngineers: Yup.array().of(Yup.string()),
  studios: Yup.array().of(Yup.string()),
  additionalMusicians: Yup.array().of(Yup.string()),
  albumNotes: Yup.string().required('Album notes are required'),
})

const AlbumForm = () => {
  const [formData, setFormData] = useState<AlbumFormData>({
    title: '',
    releaseDate: new Date(),
    genre: [] as unknown as IGenre,
    coverImageUri: '',
    tracks: [],
    primaryArtist: '',
    artists: [],
    collectionAddress: '',
    label: '',
    producers: [],
    mixers: [],
    masteringEngineers: [],
    recordingEngineers: [],
    studios: [],
    additionalMusicians: [],
    albumNotes: '',
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
      const response = await fetch('/api/albums', {
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

  // Using useSWR to fetch genres
  const { data: genresData } = useSWR<{ data: IGenre[] }>(
    'genres',
    async () => await fetchGenres()
  )
  const genres = genresData?.data || []
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
      <h2 className="text-right mb-8 border-b pb-2">Create a New Album</h2>
      <SingleImageUpload
        handleChange={setFormData}
        name="coverImageUri"
        value={formData.coverImageUri}
      />
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
      <label htmlFor="genre" className="text-xs font-medium uppercase">
        Genre
      </label>
      <select
        id="genre"
        name="genre"
        value={formData.genre.name}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.genre ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Select a genre</option>
        {genres?.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
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
          <option key={artist.id} value={artist._id}>
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
      <label htmlFor="albumNotes" className="text-xs font-medium uppercase">
        Album Notes
      </label>
      <textarea
        id="albumNotes"
        name="albumNotes"
        value={formData.albumNotes}
        onChange={handleChange}
        className={`p-3 border-b bg-transparent focus:outline-none ${
          errors.albumNotes ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {/* You can continue adding fields for tracks, artists, producers, etc. in a similar manner */}
      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        Create Album
      </button>
      <Notification
        message={errorMessage}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  )
}
export default AlbumForm
