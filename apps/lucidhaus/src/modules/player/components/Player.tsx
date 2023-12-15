'use client'

import Link from 'next/link'
import { CurrentTime } from './CurrentTime'
import slugify from 'slugify'
import Play from 'public/icons/play.svg'
import Pause from 'public/icons/pause.svg'
import Next from 'public/icons/nextStop.svg'
import Prev from 'public/icons/backStep.svg'
import React, { useEffect, useRef } from 'react'
import MintButton from '@/components/MintButton'
import { useResponsive } from '@/hooks/useResponsive'
import { player } from '@/store/player'
import { observer } from 'mobx-react'

export const Player = observer(() => {
  const {
    pause,
    play,
    prev,
    next,
    isPlaying,
    currentPosition,
    setCurrentTime,
    setDuration,
    queue,
  } = player
  const { isMobile } = useResponsive()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      player.setAudioElement(audioRef.current)
    }
  }, [audioRef])

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    }

    const handleAudioEnded = () => {
      next()
    }

    const audioElem = audioRef.current
    audioElem?.addEventListener('timeupdate', handleTimeUpdate)
    audioElem?.addEventListener('durationchange', handleDurationChange)
    audioElem?.addEventListener('ended', handleAudioEnded)

    return () => {
      audioElem?.removeEventListener('timeupdate', handleTimeUpdate)
      audioElem?.removeEventListener('durationchange', handleDurationChange)
      audioElem?.removeEventListener('ended', handleAudioEnded)
    }
  }, [audioRef, setCurrentTime, setDuration])

  return (
    <div className="fixed bottom-2 right-0 flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div>
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-4 shadow max-w-[200px] overflow-hidden whitespace-nowrap">
            <button type="button" onClick={() => prev()}>
              <Prev fill={'#FFF'} />
            </button>
            {isPlaying ? (
              <button type="button" onClick={() => pause()}>
                <Pause fill={'#FFF'} />
              </button>
            ) : (
              <button type="button" onClick={() => play()}>
                <Play fill={'#FFF'} />
              </button>
            )}
            <button type="button" onClick={() => next()}>
              <Next fill={'#FFF'} />
            </button>
          </div>
          <audio
            crossOrigin="anonymous"
            preload={'auto'}
            src={queue[currentPosition]?.audio}
            ref={audioRef}
          />
        </div>

        {queue[currentPosition]?.title && (
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 max-w-[150px] sm:max-w-[200px] overflow-hidden whitespace-nowrap">
            <Link href={`/discography/${queue[currentPosition]?.album.slug}`}>
              <div>{queue[currentPosition]?.title}</div>
            </Link>
          </div>
        )}
        {!isMobile && queue[currentPosition]?.artist && (
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 max-w-[200px] overflow-hidden whitespace-nowrap">
            <Link
              href={`/artists/${slugify(queue[currentPosition]?.artist).toLowerCase()}`}
            >
              {queue[currentPosition]?.artist}
            </Link>
          </div>
        )}

        {queue[currentPosition]?.token && queue[currentPosition]?.collection && (
          <MintButton
            token={queue[currentPosition]?.token}
            collection={queue[currentPosition]?.collection}
            clean={true}
          />
        )}
      </div>
      <CurrentTime />
    </div>
  )
})

export default Player
