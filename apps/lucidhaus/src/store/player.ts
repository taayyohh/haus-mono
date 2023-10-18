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

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  setIsPlaying: (is: boolean) => {
    set((state) => ({
      isPlaying: is,
    }))
  },
  addToQueue: (track: PlayerTrack, type: PlayerQueueType) => {
    set((state) => ({
      queue: [{ track, type }, ...state.queue],
      queuedItem: { track, type },
    }))
  },
  addMultipleToQueue: async (tracks: PlayerTrack[], type: PlayerQueueType) => {
    const newQueueItems = tracks.map((track, i) => ({ track, type }))
    const currentState = get()

    // Prepending the new tracks to the front of the queue
    const combinedQueue = [...newQueueItems, ...currentState.queue]

    if (!currentState.isPlaying && tracks.length && currentState.media) {
      const firstTrack = tracks[0]
      currentState.media.src = firstTrack.audio
      currentState.media.load()
      try {
        await currentState.media.play()
        set({ isPlaying: true, queuedItem: { track: firstTrack, type } })
        combinedQueue.shift() // Remove the track that's now playing
      } catch (error) {
        console.error('Playback failed:', error)
      }
    } else {
      // If not playing immediately, then set queuedItem to first track of newQueueItems
      set({ queuedItem: newQueueItems[0] })
    }

    set({ queue: combinedQueue })
  },
  setCurrentMedia: (media: HTMLAudioElement) => {
    media.addEventListener('ended', async () => {
      const { queue } = get()

      if (queue.length) {
        const nextItem = queue[0]
        media.src = nextItem.track.audio
        media.load()
        try {
          await media.play()
          set({
            queue: queue.slice(1),
            queuedItem: nextItem,
          })
        } catch (error) {
          console.error('Playback failed after track end:', error)
        }
      }
    })
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
