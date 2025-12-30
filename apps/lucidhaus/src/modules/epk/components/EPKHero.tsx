'use client'

import { EPKVideo } from '../types'

interface EPKHeroProps {
  video?: EPKVideo
  artistName: string
}

export default function EPKHero({ video, artistName }: EPKHeroProps) {
  if (!video) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop: 16:9 aspect ratio, Mobile: taller ratio to show full video */}
      <div className="aspect-video sm:aspect-video aspect-[9/16] sm:aspect-video max-h-[70vh] sm:max-h-none">
        <video
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-8">
        <h2 className="text-white text-xl sm:text-4xl font-bold uppercase opacity-80">
          {artistName}
        </h2>
      </div>
    </div>
  )
}
