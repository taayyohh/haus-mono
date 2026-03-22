'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Artist {
  id: string
  name: string
  slug: string
  heroImage: string
  isActive: boolean
}

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ artists { id name slug heroImage isActive } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setArtists(data?.artists || []))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase text-white">Artists</h1>
        <Link
          href="/admin/artists/new"
          className="bg-white text-black px-4 py-2 text-sm uppercase hover:bg-gray-200"
        >
          New Artist
        </Link>
      </div>

      <div className="space-y-2">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/admin/artists/${artist.id}`}
            className="flex items-center gap-4 border border-white-13 p-4 hover:bg-white/5"
          >
            <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
              <Image src={artist.heroImage} alt={artist.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm uppercase">{artist.name}</div>
              <div className="text-white/40 text-xs">/{artist.slug}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
