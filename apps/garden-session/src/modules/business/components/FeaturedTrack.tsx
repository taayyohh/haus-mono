import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePlayerStore } from '@/store/player'
import { PlayerTrack } from '@/modules/player'
import slugify from 'slugify'
import Play from '../../../../public/icons/play.svg'
import Pause from '../../../../public/icons/pause.svg'
import MintButton from '@/components/MintButton'
export const FeaturedTrack: React.FC<{ track: PlayerTrack }> = ({ track }) => {
  const { isPlaying, media, duration, currentTime, addToQueue, setIsPlaying } =
    usePlayerStore()

  const handleClick = React.useCallback(() => {
    if (!!media && media.src) {
      if (isPlaying) {
        media.pause()
        setIsPlaying(false)
      } else {
        media.play()
        setIsPlaying(true)
      }
      return
    }
    addToQueue(track, 'play')
  }, [isPlaying, media])

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
                className={`relative h-72 w-72 min-h-72 min-w-72 overflow-hidden rounded-full border sm:h-96 sm:min-h-96 sm:w-96 sm:min-w-96 cursor-pointer`}
                onClick={handleClick}
              >
                {track?.image && (
                  <Image
                    className={`h-full w-full flex-shrink-0 ${
                      isPlaying ? 'animate-spin-slow' : ''
                    }`}
                    src={track?.image}
                    fill
                    priority
                    alt={`Cover Art for ${track.title}`}
                  />
                )}

                <div className="absolute top-[50%] left-[50%] -mt-[24px] -ml-[24px]">
                  <div className={'flex items-center justify-center h-12 w-12'}>
                    {(isPlaying && <Pause width={48} height={48} />) || (
                      <Play width={48} height={48} />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex max-w-[320px] flex-col gap-2 sm:max-w-[400px] md:ml-8 md:mt-0 md:gap-4 md:pl-8">
                <div className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
                  <Link href={`discography/${track?.release?.slug}`}>{track?.title}</Link>
                </div>
                <div className="text-3xlsm:text-4xl md:text-5xl text-white">
                  <Link href={`/artists/${slugify(track?.artist || '').toLowerCase()}`}>
                    {track?.artist}
                  </Link>
                </div>
                <div className="text-xl">
                  {currentTime || '0:00'} / {duration || '0:00'}
                </div>
                {isPlaying && track.token && track.collection && (
                  <MintButton token={track.token} collection={track.collection} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="fixed bottom-5 animate-bounce">{/*<BsArrowDown size={24} />*/}</div>
    </div>
  )
}