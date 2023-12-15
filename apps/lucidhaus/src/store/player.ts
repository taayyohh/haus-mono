import { makeAutoObservable } from 'mobx'
import { hhmmss } from '@/modules/player/utils'
import { IAlbum } from '@/models/Album'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'

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

/**
 * Class representing the state and functionality of a music player.
 */
class PlayerStore {
  /**
   * Current playback time of the audio track.
   */
  currentTime: string = ''

  /**
   * Current position or index in the queue of tracks.
   */
  currentPosition: number = 0

  /**
   * Duration of the current track.
   */
  duration: string = ''

  /**
   * Audio element used for playing music.
   */
  audioElement: HTMLAudioElement | undefined = undefined

  /**
   * Indicates whether the music is currently playing.
   */
  isPlaying = false

  /**
   * Queue of tracks to be played.
   */
  queue: PlayerTrack[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  /**
   * Sets the audio element for playback.
   * @param {HTMLAudioElement} audioElement - The audio element.
   */
  setAudioElement(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement
  }

  /**
   * Sets the current time of the audio track.
   * @param {number} currentTime - The current time in seconds.
   */
  setCurrentTime(currentTime: number) {
    this.currentTime = hhmmss(currentTime.toString())
  }

  /**
   * Sets the duration of the audio track.
   * @param {number | undefined} duration - The duration in seconds.
   */
  setDuration(duration: number | undefined) {
    if (!duration) return
    this.duration = hhmmss(duration.toString())
  }

  /**
   * Sets the current position in the queue
   * @param {number} position - The duration in seconds.
   */
  setCurrentPosition(position: number) {
    if (!position) return
    this.currentPosition = position
  }

  /**
   * Plays the audio track.
   */
  play() {
    if (!this.audioElement) return

    this.audioElement.load() // Load the audio element

    const attemptPlay = () => {
      this.audioElement
        ?.play()
        .then(() => {
          this.isPlaying = true
        })
        .catch((error) => {
          console.error('Playback failed:', error)
          this.isPlaying = false
        })
    }

    if (this.audioElement.readyState >= 3) {
      attemptPlay()
    } else {
      const handleCanPlay = () => {
        attemptPlay()
        this.audioElement?.removeEventListener('canplay', handleCanPlay)
      }
      this.audioElement.addEventListener('canplay', handleCanPlay)
    }
  }

  /**
   * Pauses the audio track.
   */
  pause() {
    this.audioElement?.pause()
    this.isPlaying = false
  }

  /**
   * Adds tracks to the end of the queue.
   * @param {PlayerTrack[]} tracks - An array of tracks to be added.
   */
  queueBack(tracks: PlayerTrack[]) {
    this.queue = [...this.queue, ...tracks]
  }

  /**
   * Adds tracks to the front of the queue.
   * @param {PlayerTrack[]} tracks - An array of tracks to be added.
   */
  queueFront(tracks: PlayerTrack[]) {
    this.queue = [...tracks, ...this.queue]
  }

  /**
   * Advances to the next track in the queue.
   */
  next() {
    if (this.currentPosition === this.queue.length - 1) {
      this.currentPosition = 0
    } else {
      this.currentPosition += 1
    }
    this.play() // Play next track after updating position
  }

  /**
   * Moves to the previous track in the queue.
   */
  prev() {
    if (this.currentPosition === 0) {
      this.currentPosition = this.queue.length - 1
    } else {
      this.currentPosition -= 1
    }
    this.play() // Play previous track after updating position
  }
}

export const player = new PlayerStore()
