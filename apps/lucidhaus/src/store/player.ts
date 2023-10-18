import { create } from 'zustand'
import { IAlbum } from '@/models/Album'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'

export type PlayerQueueType = 'play' | 'front' | 'back'

export interface PlayerTrack {
  artist: string
  image: string
  audio: string
  title: string
  trackNumber: number
  album: IAlbum
  collection: ZoraCreateContractQuery['zoraCreateContract']
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
}

export interface QueueItem {
  track: PlayerTrack
  type: PlayerQueueType
}

export interface PlayerState {
  queuedItem: QueueItem | null
  addToQueue: (track: PlayerTrack, type: PlayerQueueType) => void
  addMultipleToQueue: (tracks: PlayerTrack[], type: PlayerQueueType) => void
  media: HTMLAudioElement | undefined
  setCurrentMedia: (media: HTMLAudioElement) => void
  isPlaying: boolean
  setIsPlaying: (is: boolean) => void
  duration: string
  setDuration: (duration: string) => void
  currentTime: string
  setCurrentTime: (duration: string) => void
  queue: QueueItem[]
  clearQueueItem: () => void
  currentPosition: number
  setCurrentPosition: (position: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  setIsPlaying: (is: boolean) => {
    set({
      isPlaying: is,
    })
  },
  addToQueue: (track: PlayerTrack, type: PlayerQueueType) => {
    set((state) => ({
      queue: [{ track, type }, ...state.queue],
      queuedItem: { track, type },
    }))
  },
  addMultipleToQueue: (tracks: PlayerTrack[], type: PlayerQueueType) => {
    const newQueueItems = tracks.map((track) => ({ track, type }))
    set((state) => {
      const combinedQueue = [...newQueueItems, ...state.queue]

      return {
        queue: combinedQueue,
        queuedItem: newQueueItems[0],
      }
    })
  },
  setCurrentMedia: (media: HTMLAudioElement) => {
    set({ media })
  },
  media: undefined,
  duration: '',
  setDuration: (duration: string) => set({ duration }),
  currentTime: '',
  setCurrentTime: (currentTime: string) => set({ currentTime }),
  queue: [],
  queuedItem: null,
  clearQueueItem: () => set({ queuedItem: null }),
  currentPosition: 0,
  setCurrentPosition: (currentPosition: number) => set({ currentPosition }),
}))
