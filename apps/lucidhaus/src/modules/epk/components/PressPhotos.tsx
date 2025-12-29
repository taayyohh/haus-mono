'use client'

import Image from 'next/image'
import { EPKPhoto, EPKTourGraphic } from '../types'

interface PressPhotosProps {
  photos?: EPKPhoto[]
  tourGraphics?: EPKTourGraphic[]
}

export default function PressPhotos({ photos = [], tourGraphics = [] }: PressPhotosProps) {
  const handleDownload = (src: string, filename: string) => {
    const link = document.createElement('a')
    link.href = src
    link.download = filename
    link.click()
  }

  const allImages = [
    ...photos.map(p => ({ ...p, type: 'photo' as const })),
    ...tourGraphics.map(g => ({ src: g.src, alt: g.title, type: 'graphic' as const }))
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {allImages.map((image, index) => (
        <div
          key={index}
          className="relative group border border-white-13 overflow-hidden aspect-square"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <button
              onClick={() => {
                const filename = image.src.split('/').pop() || 'download.jpg'
                handleDownload(image.src, filename)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-6 py-2 uppercase text-sm font-medium hover:bg-gray-200"
            >
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
