'use client'

import { FeaturedTrack } from '@/modules/business/components/FeaturedTrack'
import { PlayerTrack } from '@/store/player'

const HomePage = ({ track }: { track: PlayerTrack }) => {
  return (
    <>
      <FeaturedTrack track={track} />
    </>
  )
}

export default HomePage
