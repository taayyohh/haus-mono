'use client'

import { PlayerTrack } from '@/modules/player'
import { FeaturedTrack } from '@/modules/business/components/FeaturedTrack'

const HomePage = ({ track }: { track: PlayerTrack }) => {
  return (
    <>
      <FeaturedTrack track={track} />
    </>
  )
}

export default HomePage
