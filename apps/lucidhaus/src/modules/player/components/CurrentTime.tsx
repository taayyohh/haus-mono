import React from 'react'
import { player } from '@/store/player'
import { observer } from 'mobx-react'

export const CurrentTime = observer(() => {
  const { currentTime, duration } = player
  if (!currentTime || !duration) return null

  return (
    <div className="hidden items-center gap-4 sm:visible sm:flex text-black">
      <div>
        <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 overflow-hidden whitespace-nowrap">
          {currentTime || '0:00'} / {duration || '0:00'}
        </div>
      </div>
    </div>
  )
})
