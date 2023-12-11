'use client'

import Link from 'next/link'
import { CurrentTime } from './CurrentTime'
import slugify from 'slugify'
import Play from 'public/icons/play.svg'
import Pause from 'public/icons/pause.svg'
import Next from 'public/icons/nextStop.svg'
import Prev from 'public/icons/backStep.svg'
import React, { useEffect } from 'react'
import MintButton from '@/components/MintButton'
import { useResponsive } from '@/hooks/useResponsive'
import { player } from '@/store/mobxPlayer'
import { observer } from 'mobx-react'

export const Player = observer(() => {
  const { isMobile } = useResponsive()
  const audioRef = React.useRef<null | HTMLAudioElement>(null)

  const handlePlay = () => {
    if (!audioRef.current) return

    player.play()
  }

  const handlePause = () => {
    if (!audioRef.current) return
    player.pause()
  }
  const handlePrev = () => {
    handlePause()
    player.prev()
    try {
      handlePlay()
    } catch (error) {
      console.error('Playback failed after track end:', error)
    }
  }
  const handleNext = () => {
    handlePause()
    player.next()
    try {
      handlePlay()
    } catch (error) {
      console.error('Playback failed after track end:', error)
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    player.setCurrentTime(audioRef.current.currentTime)
  }
  const handleOnDurationChange = () => {
    if (!audioRef.current) return

    player.setDuration(player?.audioElement?.duration)
  }
  const handleEnded = () => {
    if (player.currentPosition === player.queue.length - 1) {
      return
    }

    if (!audioRef.current) return
    handleNext()
  }

  useEffect(() => {
    if (!audioRef.current) return
    player.setAudioElement(audioRef.current)
  }, [audioRef.current])

  useEffect(() => {
    if (!player?.audioElement) return

    const handleAudioEnded = async () => {
      handleNext()
    }

    player?.audioElement.addEventListener('ended', handleAudioEnded)

    return () => {
      player?.audioElement?.removeEventListener('ended', handleAudioEnded)
    }
  }, [])

  return (
    <div className="fixed bottom-2 right-0 flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div>
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-4 shadow max-w-[200px] overflow-hidden whitespace-nowrap">
            <button
              type="button"
              onClick={player.queue.length > 1 ? () => handlePrev() : () => {}}
            >
              <Prev fill={'#FFF'} />
            </button>
            {(player.isPlaying && (
              <button
                type="button"
                onClick={player.queue.length > 0 ? () => handlePause() : () => {}}
              >
                <Pause fill={'#FFF'} />
              </button>
            )) || (
              <button
                type="button"
                onClick={player.queue.length > 0 ? () => handlePlay() : () => {}}
              >
                <Play fill={'#FFF'} />
              </button>
            )}
            <button
              type="button"
              onClick={player.queue.length > 1 ? () => handleNext() : () => {}}
            >
              <Next fill={'#FFF'} />
            </button>
          </div>
          <audio
            crossOrigin="anonymous"
            preload={'auto'}
            src={player.queue[player.currentPosition]?.audio}
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onDurationChange={handleOnDurationChange}
          />
        </div>

        {player.queue[player.currentPosition]?.title && (
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 max-w-[150px] sm:max-w-[200px] overflow-hidden whitespace-nowrap">
            <Link
              href={`/discography/${player.queue[player.currentPosition]?.album.slug}`}
            >
              <div>{player.queue[player.currentPosition]?.title}</div>
            </Link>
          </div>
        )}
        {!isMobile && player.queue[player.currentPosition]?.artist && (
          <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 max-w-[200px] overflow-hidden whitespace-nowrap">
            <Link
              href={`/artists/${slugify(
                player.queue[player.currentPosition]?.artist
              ).toLowerCase()}`}
            >
              {player.queue[player.currentPosition]?.artist}
            </Link>
          </div>
        )}

        {player.queue[player.currentPosition]?.token &&
          player.queue[player.currentPosition]?.collection && (
            <MintButton
              token={player.queue[player.currentPosition]?.token}
              collection={player.queue[player.currentPosition]?.collection}
              clean={true}
            />
          )}
      </div>

      <CurrentTime />
    </div>
  )
})
