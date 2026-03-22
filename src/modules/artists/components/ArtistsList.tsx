'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Artist {
  id: string
  name: string
  slug: string
  heroImage: string
}

interface ArtistsListProps {
  artists: Artist[]
}

export default function ArtistsList({ artists }: ArtistsListProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  return (
    <div className="relative px-4">
      {/* Fixed background image on hover */}
      {hoveredImage && (
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <Image
            src={hoveredImage}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Artist names */}
      <div className="flex flex-col z-10">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.slug}`}
            onMouseEnter={() => setHoveredImage(artist.heroImage)}
            onMouseLeave={() => setHoveredImage(null)}
            className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase text-white hover:text-black hover:bg-white transition-colors py-2"
          >
            {artist.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
