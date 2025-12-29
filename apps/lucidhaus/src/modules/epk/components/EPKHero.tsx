'use client'

import { EPKVideo } from '../types'

interface EPKHeroProps {
  video?: EPKVideo
  artistName: string
}

export default function EPKHero({ video, artistName }: EPKHeroProps) {
  if (!video) return null

  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <video
        src={video.src}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase opacity-80">
          {artistName}
        </h2>
      </div>
    </div>
  )
}
