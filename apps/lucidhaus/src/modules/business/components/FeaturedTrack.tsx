'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import slugify from 'slugify'
import Play from '../../../../public/icons/play.svg'
import Pause from '../../../../public/icons/pause.svg'
import MintButton from '@/components/MintButton'
import { useResponsive } from '@/hooks/useResponsive'
import { player, PlayerTrack } from '@/store/player'
import { observer } from 'mobx-react'

export const FeaturedTrack: React.FC<{ track: PlayerTrack }> = observer(({ track }) => {
  const { isMobile } = useResponsive()

  useEffect(() => {
    if (player.isPlaying || (player.audioElement?.src && player.currentTime !== '00:00')) return

    player.queueFront([track])
  }, [player.isPlaying, track])

  const handleClick = React.useCallback(() => {
    if (!!player.audioElement && player.audioElement.src) {
      if (player.isPlaying) {
        player.pause()
      } else {
        player.play()
      }
      return
    }
  }, [player.isPlaying, player.audioElement])

  return (
    <div className="absolute top-0 z-0 grid h-screen w-screen place-items-center ">
      <div className="absolute -z-10 flex w-full max-w-screen-xl justify-center">
        {track && (
          <AnimatePresence>
            <motion.div
              className="relative flex flex-col items-center md:flex-row"
              key={track?.audio}
              variants={{
                closed: {
                  y: 10,
                  opacity: 0,
                },
                open: {
                  y: 0,
                  opacity: 1,
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div
                className={`relative h-72 w-72 min-h-72 min-w-72 overflow-hidden rounded-full border border-white-13 sm:h-96 sm:min-h-96 sm:w-96 sm:min-w-96 cursor-pointer`}
                onClick={handleClick}
              >
                {player.queue[player.currentPosition]?.image && (
                  <Image
                    className={`h-full w-full flex-shrink-0 ${
                      player.isPlaying ? 'animate-spin-slow' : ''
                    }`}
                    src={player.queue[player.currentPosition]?.image}
                    fill
                    priority
                    alt={`Cover Art for ${player.queue[player.currentPosition]?.title}`}
                  />
                )}

                <div className="absolute top-[50%] left-[50%] -mt-[24px] -ml-[24px]">
                  <div className={'flex items-center justify-center h-12 w-12'}>
                    {(player.isPlaying && (
                      <Pause width={48} height={48} fill={'#FFF'} />
                    )) || <Play width={48} height={48} fill={'#FFF'} />}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex max-w-[320px] flex-col gap-2 sm:max-w-[400px] md:ml-8 md:mt-0 md:gap-4 md:pl-8">
                <div className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
                  <Link
                    href={`discography/${
                      player.queue[player.currentPosition]?.album?.slug
                    }`}
                  >
                    {player.queue[player.currentPosition]?.title}
                  </Link>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl text-white">
                  <Link
                    href={`/artists/${slugify(
                      player.queue[player.currentPosition]?.artist || ''
                    ).toLowerCase()}`}
                  >
                    {player.queue[player.currentPosition]?.artist}
                  </Link>
                </div>
                <div className="text-xl">
                  {player.currentTime || '0:00'} / {player.duration || '0:00'}
                </div>
                {!isMobile &&
                  player.queue[player.currentPosition]?.token &&
                  player.queue[player.currentPosition]?.collection && (
                    <MintButton
                      token={player.queue[player.currentPosition]?.token}
                      collection={player.queue[player.currentPosition]?.collection}
                    />
                  )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
})
