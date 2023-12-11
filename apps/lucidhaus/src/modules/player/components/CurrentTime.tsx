import React from 'react'
import { player } from '@/store/mobxPlayer'
import { observer } from 'mobx-react'

export const CurrentTime = observer(() => {
  if (!player.currentTime || !player.duration) return null

  return (
    <div className="hidden items-center gap-4 sm:visible sm:flex text-black">
      <div>
        <div className="inline-flex self-start items-center bg-[#1b1b1b] text-white border-white-13 rounded py-2 px-4 uppercase text-sm h-10 gap-2 overflow-hidden whitespace-nowrap">
          {player.currentTime || '0:00'} / {player.duration || '0:00'}
        </div>
      </div>
    </div>
  )
})
