import Link from 'next/link'
import { CurrentTime } from './CurrentTime'
import slugify from 'slugify'
import Play from '../../../../public/icons/play.svg'
import Pause from '../../../../public/icons/pause.svg'
import Next from '../../../../public/icons/nextStop.svg'
import Prev from '../../../../public/icons/backStep.svg'
import { IAlbum } from '@/models/Album'
import React from 'react'
import { PlayerState, QueueItem, usePlayerStore } from '@/store/player'
import { hhmmss } from '@/modules/player/utils'

export interface PlayerTrack {
  artist: string
  image: string
  audio: string
  title: string
  trackNumber: number
  release: IAlbum
  collection?: any
  token?: any
}

export const Player = () => {
  const audioRef = React.useRef<null | HTMLAudioElement>(null)
  const {
    media,
    setCurrentMedia,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    setDuration,
    queue,
    currentPosition,
    setCurrentPosition,
    queuedItem,
  } = usePlayerStore((state: PlayerState) => state)

  const handleQueueAndPlay = React.useCallback(
    async (track: PlayerTrack) => {
      if (!audioRef.current) return

      setCurrentMedia(audioRef.current)
      try {
        await handlePlay()
      } catch (error) {
        setIsPlaying(false)
        console.log('err', error)
      }
    },
    [audioRef, media, setCurrentMedia]
  )

  const handleQueueFront = React.useCallback(async () => {
    if (!audioRef.current) return

    setCurrentMedia(audioRef.current)
  }, [audioRef, media, setCurrentMedia])

  const handleQueueItem = (queuedItem: QueueItem) => {
    switch (queuedItem.type) {
      case 'play':
        return handleQueueAndPlay(queuedItem.track)
      case 'front':
        return handleQueueFront()
      case 'back':
        return null
    }
  }

  React.useEffect(() => {
    if (queue.length && !!queuedItem) handleQueueItem(queuedItem)
  }, [queue, queuedItem])

  const handlePlay = async () => {
    await media?.play()
    setIsPlaying(true)
  }

  const handlePause = async () => {
    media?.pause()
    setIsPlaying(false)
  }

  const handleNext = async () => {
    media?.pause()
    setIsPlaying(false)
    setCurrentPosition(queue.length - 1 > currentPosition ? currentPosition + 1 : 0)
  }

  const handlePrev = async () => {
    media?.pause()
    setIsPlaying(false)
    setCurrentPosition(currentPosition > 1 ? currentPosition - 1 : queue.length - 1)
  }

  const handleTimeUpdate = () => {
    // @ts-ignore
    const time = hhmmss(Math.floor(media.currentTime).toString())
    setCurrentTime(time)
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  const handleOnDurationChange = () => {
    // @ts-ignore
    setDuration(hhmmss(media?.duration.toString()))
  }

  return (
    <div className="fixed bottom-2 right-0 flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-4 ">
        <div>
          <div className="inline-flex text-black h-10 items-center gap-2 self-start rounded border bg-white p-2 shadow">
            <button
              type="button"
              onClick={queue.length > 0 ? () => handlePrev() : () => {}}
            >
              <Prev />
            </button>
            {(isPlaying && (
              <button
                type="button"
                onClick={queue.length > 0 ? () => handlePause() : () => {}}
              >
                <Pause />
              </button>
            )) || (
              <button
                type="button"
                onClick={queue.length > 0 ? () => handlePlay() : () => {}}
              >
                <Play />
              </button>
            )}
            <button
              type="button"
              onClick={queue.length > 0 ? () => handleNext() : () => {}}
            >
              <Next />
            </button>
          </div>
          <audio
            crossOrigin="anonymous"
            preload={'auto'}
            src={queue[currentPosition]?.track.audio}
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onDurationChange={handleOnDurationChange}
          />
        </div>

        {queue[currentPosition]?.track.artist && queue[currentPosition]?.track.title && (
          <div className="inline-flex h-10 items-center gap-2 self-start rounded border bg-white p-2 shadow text-black">
            <div>{queue[currentPosition]?.track.title}</div>
            <div>
              <Link
                href={`/artists/${slugify(
                  queue[currentPosition]?.track.artist
                ).toLowerCase()}`}
              >
                {queue[currentPosition]?.track.artist}
              </Link>
            </div>
          </div>
        )}
      </div>

      <CurrentTime />
    </div>
  )
}
