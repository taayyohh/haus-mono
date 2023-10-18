import Link from 'next/link'
import { CurrentTime } from './CurrentTime'
import slugify from 'slugify'
import { usePlayer } from '@/hooks/usePlayer'
import Play from '../../../../public/icons/play.svg'
import Pause from '../../../../public/icons/pause.svg'
import Next from '../../../../public/icons/nextStop.svg'
import Prev from '../../../../public/icons/backStep.svg'
import { IAlbum } from '@/models/Album'

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
  const {
    audioRef,
    isPlaying,
    queue,
    currentPosition,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
    handleTimeUpdate,
    handleEnded,
    handleOnDurationChange,
  } = usePlayer()

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
              <Link href={`/artists/${slugify(queue[currentPosition]?.track.artist).toLowerCase()}`}>
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
