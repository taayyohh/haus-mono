'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { usePlayerStore } from '@/store/player'

export default function Player() {
  const {
    queue,
    currentPosition,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    next,
    prev,
    setAudioElement,
    setCurrentTime,
    setDuration,
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current)
    }
  }, [setAudioElement])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTimeUpdate = () => setCurrentTime(el.currentTime)
    const onDurationChange = () => setDuration(el.duration)
    const onEnded = () => next()

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('durationchange', onDurationChange)
    el.addEventListener('ended', onEnded)

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('durationchange', onDurationChange)
      el.removeEventListener('ended', onEnded)
    }
  }, [setCurrentTime, setDuration, next])

  const current = queue[currentPosition]

  if (!current) return null

  return (
    <div className="fixed bottom-2 right-0 flex w-full items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        {/* Controls */}
        <div className="inline-flex items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 text-sm h-10 gap-4 shadow">
          <button type="button" onClick={prev} aria-label="Previous track">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
              <rect x="0" y="0" width="2" height="12" />
              <polygon points="12,0 12,12 3,6" />
            </svg>
          </button>
          {isPlaying ? (
            <button type="button" onClick={pause} aria-label="Pause">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <rect x="1" y="0" width="3" height="12" />
                <rect x="8" y="0" width="3" height="12" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={play} aria-label="Play">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <polygon points="0,0 12,6 0,12" />
              </svg>
            </button>
          )}
          <button type="button" onClick={next} aria-label="Next track">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
              <polygon points="0,0 9,6 0,12" />
              <rect x="10" y="0" width="2" height="12" />
            </svg>
          </button>
        </div>

        <audio
          crossOrigin="anonymous"
          preload="auto"
          src={current?.audio}
          ref={audioRef}
        />

        {/* Track title */}
        {current?.title && (
          <Link
            href={`/discography/${current.albumSlug}`}
            className="inline-flex items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 max-w-[150px] sm:max-w-[200px] overflow-hidden whitespace-nowrap"
          >
            {current.title}
          </Link>
        )}

        {/* Artist name (desktop only) */}
        {current?.artist && (
          <Link
            href={`/artists/${current.artistSlug}`}
            className="hidden sm:inline-flex items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 max-w-[200px] overflow-hidden whitespace-nowrap"
          >
            {current.artist}
          </Link>
        )}
      </div>

      {/* Time display (desktop only) */}
      {currentTime && duration && (
        <div className="hidden sm:inline-flex items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 text-sm h-10 whitespace-nowrap">
          {currentTime} / {duration}
        </div>
      )}
    </div>
  )
}
