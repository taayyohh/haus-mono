import { makeAutoObservable } from 'mobx'
import { IAlbum } from '@/models/Album'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { hhmmss } from '@/modules/player/utils'

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

class PlayerStore {
  currentTime: string = ''
  currentPosition: number = 0
  duration: string = ''
  audioElement: HTMLAudioElement | undefined = undefined
  isPlaying = false
  queue: PlayerTrack[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setAudioElement(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement
  }

  get audioSource() {
    return this.audioElement ? this.audioElement.src : ''
  }
  setCurrentTime(currentTime: number) {
    this.currentTime = hhmmss(currentTime.toString())
  }
  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying
  }
  setDuration(duration: number | undefined) {
    if (!duration) return
    this.duration = hhmmss(duration.toString())
  }

  play() {
    if (!this.audioElement) return
    player.audioElement?.load()

    const attemptPlay = () => {
      this?.audioElement
        ?.play()
        .then(() => {
          this.setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Playback failed:', error)
          this.setIsPlaying(false)
        })
    }

    if (this.audioElement.readyState >= 3) {
      attemptPlay()
    } else {
      const handleCanPlay = () => {
        attemptPlay()
        this?.audioElement?.removeEventListener('canplay', handleCanPlay)
      }
      this.audioElement.addEventListener('canplay', handleCanPlay)
    }
  }

  pause() {
    this.audioElement?.pause()
    this.setIsPlaying(false)
  }
  queueBack(tracks: PlayerTrack[]) {
    this.queue = [...this.queue, ...tracks]
  }
  queueFront(tracks: PlayerTrack[]) {
    this.queue = [...tracks, ...this.queue]
  }
  next() {
    if (this.currentPosition === this.queue.length - 1) {
      this.currentPosition = 0
    } else {
      this.currentPosition = this.currentPosition + 1
    }
  }
  prev() {
    if (this.currentPosition === 0) {
      this.currentPosition = this.queue.length - 1
    } else {
      this.currentPosition = this.currentPosition - 1
    }
  }
}

export const player = new PlayerStore()
