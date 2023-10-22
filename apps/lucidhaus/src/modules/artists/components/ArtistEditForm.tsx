'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import AsyncSelect from 'react-select/async'
import { IAlbum } from '@/models/Album'
import { MultiValue } from 'react-select'

interface ArtistEditFormProps {
  slug: string
}

interface FormData {
  name: string
  bio: string
  albums: string[]
  heroImage: string
  socialLinks: {
    twitter: string
    instagram: string
    zora: string
    futureTape: string
    warpcast: string
  }
  ethereum: {
    walletAddresses: string[]
    ensName: string
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  albums: Yup.array().of(Yup.string()).required('At least one album should be selected'),
  heroImage: Yup.string().required('Image is required'),
  socialLinks: Yup.object().shape({
    twitter: Yup.string().url('Must be a valid URL'),
    instagram: Yup.string().url('Must be a valid URL'),
    zora: Yup.string().url('Must be a valid URL'),
    futureTape: Yup.string().url('Must be a valid URL'),
    warpcast: Yup.string().url('Must be a valid URL'),
  }),
  ethereum: Yup.object().shape({
    walletAddresses: Yup.array().of(Yup.string()),
    ensName: Yup.string(),
  }),
})

const ArtistEditForm: React.FC<ArtistEditFormProps> = ({ slug }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
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
  const [selectedOption, setSelectedOption] = useState<MultiValue<any>>()

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(`/api/artists/${slug}`)
        const data = await response.json()
        if (data) {
          setFormData(data)
          setSelectedOption(
            data.albums.map((album: IAlbum) => ({ value: album._id, label: album.title }))
          )
        }
      } catch (error) {
        console.error('Error fetching artist data:', error)
      }
    }

    fetchArtistData()
  }, [slug])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleNestedChange = (field: string, key: string, value: string | string[]) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: { ...prev[field], [key]: value },
  //   }))
  // }

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

  const { name, heroImage, bio, socialLinks, ethereum } = formData

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
          isMulti
          className={'text-black'}
          value={selectedOption}
          onChange={(selected) => {
            const selectedAlbums = selected ? selected.map((option) => option.value) : []
            setFormData((prev) => ({ ...prev, albums: selectedAlbums }))
            setSelectedOption(selected)
          }}
        />
        {errors.albums && <span className="error">{errors.albums}</span>}
      </div>

      {/** Rest of the form fields for socialLinks, ethereum, etc... **/}

      <div className="mt-8">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 ml-4 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={handleDelete}
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

export default ArtistEditForm
