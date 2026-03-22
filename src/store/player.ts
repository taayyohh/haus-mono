import { create } from 'zustand'

export interface PlayerTrack {
  artist: string
  artistSlug: string
  title: string
  trackNumber: number
  audio: string
  image: string
  albumSlug: string
}

interface PlayerState {
  queue: PlayerTrack[]
  currentPosition: number
  isPlaying: boolean
  currentTime: string
  duration: string
  audioElement: HTMLAudioElement | null

  setAudioElement: (el: HTMLAudioElement) => void
  setCurrentTime: (seconds: number) => void
  setDuration: (seconds: number) => void
  play: () => void
  pause: () => void
  next: () => void
  prev: () => void
  queueFront: (tracks: PlayerTrack[]) => void
  queueBack: (tracks: PlayerTrack[]) => void
  playTrackAt: (position: number) => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentPosition: 0,
  isPlaying: false,
  currentTime: '',
  duration: '',
  audioElement: null,

  setAudioElement: (el) => set({ audioElement: el }),

  setCurrentTime: (seconds) => set({ currentTime: formatTime(seconds) }),

  setDuration: (seconds) => set({ duration: formatTime(seconds) }),

  play: () => {
    const { audioElement, isPlaying } = get()
    if (!audioElement) return

    // Only load() when source changed (not on resume)
    if (audioElement.paused && audioElement.currentTime > 0 && audioElement.src) {
      // Resuming — just play without reloading
      audioElement.play()
        .then(() => set({ isPlaying: true }))
        .catch(() => set({ isPlaying: false }))
      return
    }

    audioElement.load()

    const attemptPlay = () => {
      audioElement.play()
        .then(() => set({ isPlaying: true }))
        .catch(() => set({ isPlaying: false }))
    }

    if (audioElement.readyState >= 3) {
      attemptPlay()
    } else {
      const handleCanPlay = () => {
        attemptPlay()
        audioElement.removeEventListener('canplay', handleCanPlay)
      }
      audioElement.addEventListener('canplay', handleCanPlay)
    }
  },

  pause: () => {
    get().audioElement?.pause()
    set({ isPlaying: false })
  },

  queueFront: (tracks) => {
    set((state) => ({
      queue: [...tracks, ...state.queue],
      currentPosition: 0,
    }))
  },

  queueBack: (tracks) => {
    set((state) => ({ queue: [...state.queue, ...tracks] }))
  },

  next: () => {
    const { queue, currentPosition } = get()
    if (queue.length === 0) return
    const nextPos = currentPosition >= queue.length - 1 ? 0 : currentPosition + 1
    set({ currentPosition: nextPos })
    // Defer play to allow audio src to update
    setTimeout(() => get().play(), 0)
  },

  prev: () => {
    const { queue, currentPosition } = get()
    if (queue.length === 0) return
    const prevPos = currentPosition <= 0 ? queue.length - 1 : currentPosition - 1
    set({ currentPosition: prevPos })
    setTimeout(() => get().play(), 0)
  },

  playTrackAt: (position) => {
    set({ currentPosition: position })
    setTimeout(() => get().play(), 0)
  },
}))
