'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { usePlayerStore } from '@/store/player'

interface FeaturedTrackData {
  artist: string
  artistSlug: string
  title: string
  trackNumber: number
  audio: string
  image: string
  albumSlug: string
}

export default function FeaturedTrack({ track }: { track: FeaturedTrackData }) {
  const { queue, currentPosition, isPlaying, currentTime, duration, queueFront, play, pause } = usePlayerStore()

  useEffect(() => {
    if (isPlaying || queue.length > 0) return
    queueFront([track])
  }, [track, isPlaying, queue.length, queueFront])

  const current = queue[currentPosition]

  const handleClick = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return (
    <div className="grid h-[calc(100vh-96px)] w-full place-items-center">
      <AnimatePresence>
        <motion.div
          className="relative flex flex-col items-center md:flex-row"
          key={track.audio}
          variants={{
            closed: { y: 10, opacity: 0 },
            open: { y: 0, opacity: 1 },
          }}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Album art — circular, spins when playing */}
          <div
            className="relative h-72 w-72 min-h-72 min-w-72 overflow-hidden rounded-full border border-white-13 sm:h-96 sm:min-h-96 sm:w-96 sm:min-w-96 cursor-pointer"
            onClick={handleClick}
          >
            {(current?.image || track.image) && (
              <Image
                className={`h-full w-full flex-shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}
                src={current?.image || track.image}
                fill
                priority
                alt={`Cover art for ${current?.title || track.title}`}
              />
            )}

            {/* Play/pause overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-center h-12 w-12">
                {isPlaying ? (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
                    <rect x="12" y="8" width="8" height="32" />
                    <rect x="28" y="8" width="8" height="32" />
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
                    <polygon points="14,8 40,24 14,40" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Track info */}
          <div className="mt-4 flex max-w-[320px] flex-col gap-2 sm:max-w-[400px] md:ml-8 md:mt-0 md:gap-4 md:pl-8">
            <div className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
              <Link href={`/discography/${current?.albumSlug || track.albumSlug}`}>
                {current?.title || track.title}
              </Link>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl text-white/80">
              <Link href={`/artists/${current?.artistSlug || track.artistSlug}`}>
                {current?.artist || track.artist}
              </Link>
            </div>
            <div className="text-xl text-white/40">
              {currentTime || '00:00'} / {duration || '00:00'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
