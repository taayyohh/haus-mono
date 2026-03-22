'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, Tab } from '@/components/ui/Tabs'
import EPKHero from './EPKHero'
import EPKBio from './EPKBio'
import PressLinks from './PressLinks'
import PressPhotos from './PressPhotos'
import LiveVideos from './LiveVideos'
import { EPKPageData } from '../types'

interface EPKPageProps {
  epk: EPKPageData
}

export default function EPKPageComponent({ epk }: EPKPageProps) {
  const liveVideos = (epk.liveVideos || []) as Array<{ youtubeId: string; title: string }>

  return (
    <AnimatePresence>
      <motion.div
        variants={{
          closed: { y: 0, opacity: 0 },
          open: { y: 0, opacity: 1 },
        }}
        initial="closed"
        animate="open"
        exit="closed"
        className="min-h-screen bg-[#131313]"
      >
        {/* Hero Video Section */}
        <div className="w-full">
          <EPKHero
            videoSrc={epk.heroVideoSrc}
            videoPoster={epk.heroVideoPoster}
            artistName={epk.artist.name}
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full sm:w-11/12 text-white">
          {/* Title */}
          <div className="py-12 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold uppercase">
              {epk.artist.name}
            </h1>
            {epk.album && (
              <p className="text-white/60 text-sm uppercase tracking-widest mt-4">
                {epk.album.title}
              </p>
            )}
          </div>

          {/* Tabbed Content */}
          <div className="mx-auto mb-20 w-11/12">
            <Tabs defaultTab="INFO">
              <Tab label="INFO">
                <div className="space-y-12">
                  <div>
                    <EPKBio bio={epk.bio} />
                  </div>

                  {epk.pressLinks.length > 0 && (
                    <div>
                      <h3 className="text-xl uppercase mb-6 text-center">Press</h3>
                      <PressLinks links={epk.pressLinks} />
                    </div>
                  )}

                  {liveVideos.length > 0 && (
                    <div>
                      <h3 className="text-xl uppercase mb-6 text-center">Live</h3>
                      <LiveVideos videos={liveVideos} />
                    </div>
                  )}
                </div>
              </Tab>

              {epk.photos.length > 0 && (
                <Tab label="PRESS PHOTOS">
                  <PressPhotos photos={epk.photos} />
                </Tab>
              )}

              {epk.tourGraphics.length > 0 && (
                <Tab label="TOUR">
                  <PressPhotos tourGraphics={epk.tourGraphics} />
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
