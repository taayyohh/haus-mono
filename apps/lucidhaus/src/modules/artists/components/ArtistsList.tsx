'use client'

import { IArtist } from '@/models/Artist'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export default function ArtistsList({ artists }: { artists: IArtist[] }) {
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  return (
    <div className="relative">
      {currentImage && (
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <Image
            src={getIpfsGateway(currentImage)}
            alt={`${currentImage} background`}
            style={{ objectFit: 'cover' }}
            fill
          />
        </div>
      )}
      <div className="flex flex-col w-full mx-auto mt-12 z-10">
        {artists.map((artist) => (
          <Link href={`/artists/${artist.slug}`} key={artist._id} prefetch={false}>
            <div
              className="relative uppercase px-4 text-4xl md:text-7xl lg:text-8xl font-bold hover:text-black hover:bg-white"
              key={artist.slug}
              onMouseEnter={() => setCurrentImage(artist.heroImage)}
              onMouseLeave={() => setCurrentImage(null)}
            >
              {artist.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
