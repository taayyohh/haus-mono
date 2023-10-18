import React from 'react'
import { PlayerState, usePlayerStore } from '@/store/player'

export const CurrentTime = () => {
  const duration = usePlayerStore((state: PlayerState) => state.duration)
  const currentTime = usePlayerStore((state: PlayerState) => state.currentTime)

  if (!currentTime || !duration) return null

  return (
    <div className="hidden items-center gap-4 sm:visible sm:flex text-black">
      <div>
        <div className="inline-flex h-10 items-center gap-2 self-start rounded border bg-white p-2 shadow">
          {currentTime || '0:00'} / {duration || '0:00'}
        </div>
      </div>
    </div>
  )
}
