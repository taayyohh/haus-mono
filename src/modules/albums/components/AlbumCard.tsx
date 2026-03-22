'use client'

import Link from 'next/link'
import Image from 'next/image'

interface AlbumCardProps {
  album: {
    slug: string
    title: string
    coverImageUri?: string | null
    releaseDate?: Date | string | null
    primaryArtist: {
      name: string
      slug: string
    }
  }
  link?: string
}

function formatDate(date: Date | string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function AlbumCard({ album, link }: AlbumCardProps) {
  const href = link || `/discography/${album.slug}`

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-8 border border-l-0 border-t-0 border-white-13 hover:bg-[#111] hover:text-white text-white h-full"
    >
      <div className="relative flex flex-col w-full h-full max-w-[500px] rounded overflow-hidden">
        <div className="flex flex-col text-sm mb-4">
          <div className="uppercase">{album.primaryArtist.name}</div>
          <div className="italic">{album.title}</div>
          {album.releaseDate && (
            <div className="text-white/40 text-xs mt-1">
              {formatDate(album.releaseDate)}
            </div>
          )}
        </div>
        {album.coverImageUri && (
          <Image
            src={album.coverImageUri}
            alt={`Cover art for ${album.title}`}
            height={500}
            width={500}
            className="w-full"
          />
        )}
      </div>
    </Link>
  )
}
