'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import useSWR from 'swr'
import { IArtist } from '@/models/Artist'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import AsyncSelect from 'react-select/async'
import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { SingleValue } from 'react-select'

interface VideoEditFormProps {
  slug: string
}

interface VideoFormData {
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

const initialFormData: VideoFormData = {
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
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  releaseDate: Yup.date().required('Release date is required'),
  primaryArtist: Yup.string().required('Primary artist is required'),
  collectionAddress: Yup.string().required('Collection address is required'),
  // ... add other fields as necessary
})

const VideoEditForm: React.FC<VideoEditFormProps> = ({ slug }) => {
  const [formData, setFormData] = useState<VideoFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`/api/videos/${slug}`)
        const data = await response.json()
        if (data) {
          setFormData(data)
        }
      } catch (error) {
        console.error('Error fetching video data:', error)
      }
    }

    fetchVideoData()
  }, [slug])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'releaseDate') {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const response = await fetch(`/api/videos/${slug}?`, {
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/videos/${slug}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  // Using useSWR to fetch artists
  const { data: artistsData } = useSWR<{ data: IArtist[] }>('artists', () =>
    fetchArtists()
  )
  const artists = artistsData?.data || []
  const [selectedOption, setSelectedOption] = useState<SingleValue<any>>()

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 pb-20 w-full flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll text-black"
    >
      <h2 className="text-right mb-8 border-b border-white-13 pb-2 text-white">
        Edit Video
      </h2>
      {/* Render fields similar to the ArtistEditForm... */}
      {/* For example: */}
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      {/* And so on for other fields... */}

      <div className="flex flex-col space-y-1">
        <label htmlFor="albums" className="text-xs font-medium uppercase">
          Albums
        </label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={async () =>
            (await fetchAlbums(1, 30)).data.map((album) => ({
              value: album._id,
              label: album.title,
            }))
          }
          className={'text-black'}
          value={selectedOption}
          onChange={(selected: SingleValue<any>) => {
            setFormData((prev) => ({ ...prev, associatedAlbum: selected.value }))
            setSelectedOption(selected)
          }}
        />
        {errors.albums && <span className="error">{errors.albums}</span>}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
      {showNotification && (
        <Notification message={errorMessage} onClose={handleCloseNotification} />
      )}
    </form>
  )
}

export default VideoEditForm
