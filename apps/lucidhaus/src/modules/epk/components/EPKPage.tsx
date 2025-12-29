'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, Tab } from '@/components/Tabs'
import EPKHero from './EPKHero'
import EPKBio from './EPKBio'
import PressLinks from './PressLinks'
import PressPhotos from './PressPhotos'
import { EPKData } from '../types'

interface EPKPageProps {
  slug: string
}

// Hardcoded EPK data for Nappy Nina
const NAPPY_NINA_EPK: EPKData = {
  bio: `Oakland-born writer, emcee, and producer Nappy Nina cut her teeth in the Bay Area scene before uprooting to Brooklyn, where she released her 2019 debut album 'The Tree Act' to much acclaim. She appears on Yaeji, Quelle Chris, and Son Lux's music, she boasts an impressive track record as a feature - and her characteristic breezy flow has led her to conquer stages worldwide in her own right.`,
  pressLinks: [
    {
      outlet: 'Le Guess Who',
      url: 'https://leguesswho.com/lineup/nappy-nina',
      description: 'Festival feature',
    },
    {
      outlet: 'KQED',
      url: 'https://www.kqed.org/arts/13923186/best-of-musicians-to-know-nappy-nina',
      description: 'Best of Musicians to Know',
    },
    {
      outlet: 'Wax Poetics',
      url: 'https://magazine.waxpoetics.com/connections/women-in-music-artists-and-writers/article/nappy-nina/',
      description: 'Women in Music',
    },
    {
      outlet: 'Finals',
      url: 'https://finals.blog/posts/And-Now-For-Something-Completely-Different:-QandA-with-Nappy-Nina',
      description: 'Interview',
    },
  ],
  photos: [
    { src: '/nina-epk-assets/nina-9.jpg', alt: 'Nappy Nina Press Photo 1' },
    { src: '/nina-epk-assets/nina-20.jpg', alt: 'Nappy Nina Press Photo 2' },
    { src: '/nina-epk-assets/nina-29.jpg', alt: 'Nappy Nina Press Photo 3' },
    { src: '/nina-epk-assets/nina-35.jpg', alt: 'Nappy Nina Press Photo 4' },
  ],
  tourGraphics: [
    {
      src: '/nina-epk-assets/Nappy-Nina-Tour-Poster-12x18-2.jpg',
      title: 'Tour Poster',
    },
    {
      src: '/nina-epk-assets/NappyNina_EuroTour_2025_4x5.png',
      title: 'Euro Tour 2025',
    },
  ],
  video: {
    src: '/nina-epk-assets/NINA-n-SWARV-in-PARIS_edit1.mp4',
    poster: '/nina-epk-assets/nina-20.jpg',
  },
}

export default function EPKPage({ slug }: EPKPageProps) {
  // For now, only support nappy-nina
  if (slug !== 'nappy-nina') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#131313] text-white">
        <p>EPK not found for this artist.</p>
      </div>
    )
  }

  const epkData = NAPPY_NINA_EPK

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
          <EPKHero video={epkData.video} artistName="Nappy Nina" />
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full sm:w-11/12 text-white">
          {/* Artist Name */}
          <div className="py-12 text-center text-4xl sm:text-6xl font-bold uppercase">
            Nappy Nina
          </div>

          {/* Tabbed Content */}
          <div className="mx-auto mb-20 w-11/12">
            <Tabs defaultTab="RECORDED">
              <Tab label="RECORDED">
                <div className="space-y-12">
                  {/* Bio Section */}
                  <div>
                    <EPKBio bio={epkData.bio} />
                  </div>

                  {/* Press Links Section */}
                  <div>
                    <h3 className="text-xl uppercase mb-6 text-center">Press</h3>
                    <PressLinks links={epkData.pressLinks} />
                  </div>
                </div>
              </Tab>

              <Tab label="PRESS PHOTOS">
                <div>
                  <PressPhotos photos={epkData.photos} />
                </div>
              </Tab>

              <Tab label="TOUR">
                <div>
                  <PressPhotos tourGraphics={epkData.tourGraphics} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
