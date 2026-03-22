'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Album {
  id: string
  title: string
  slug: string
  coverImageUri: string | null
  releaseDate: string | null
  primaryArtist: { name: string }
}

export default function AdminAlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ albums { id title slug coverImageUri releaseDate primaryArtist { name } } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setAlbums(data?.albums || []))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase text-white">Albums</h1>
        <Link
          href="/admin/albums/new"
          className="bg-white text-black px-4 py-2 text-sm uppercase hover:bg-gray-200"
        >
          New Album
        </Link>
      </div>

      <div className="space-y-2">
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/admin/albums/${album.id}`}
            className="flex items-center gap-4 border border-white-13 p-4 hover:bg-white/5"
          >
            {album.coverImageUri && (
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src={album.coverImageUri} alt={album.title} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-white text-sm">{album.title}</div>
              <div className="text-white/40 text-xs">{album.primaryArtist.name}</div>
            </div>
            {album.releaseDate && (
              <div className="text-white/30 text-xs">
                {new Date(album.releaseDate).getFullYear()}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
