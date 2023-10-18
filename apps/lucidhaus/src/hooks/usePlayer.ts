import { useRef, useCallback, useEffect } from 'react'
import { PlayerState, PlayerTrack, QueueItem, usePlayerStore } from '@/store/player'
import { hhmmss } from '@/modules/player/utils'

export const usePlayer = () => {
  const audioRef = useRef<null | HTMLAudioElement>(null)
  const {
    media,
    setCurrentMedia,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    setDuration,
    queue,
    currentPosition,
    setCurrentPosition,
    queuedItem,
    clearQueueItem,
  } = usePlayerStore((state: PlayerState) => state)

  const playNextTrack = () => {
    const nextPosition = currentPosition + 1
    if (nextPosition < queue.length) {
      const nextItem = queue[nextPosition]
      if (audioRef.current) {
        audioRef.current.src = nextItem.track.audio
        audioRef.current.play()
        setCurrentPosition(nextPosition)
        setIsPlaying(true)
      }
    } else {
      setIsPlaying(false)
    }
  }

  const handlePlay = async () => {
    await media?.play()
    setIsPlaying(true)
  }

  const handlePause = async () => {
    media?.pause()
    setIsPlaying(false)
  }

  const handleEnded = () => {
    playNextTrack()
  }

  const handleNext = async () => {
    playNextTrack()
  }

  const handlePrev = async () => {
    const prevPosition = currentPosition - 1
    if (prevPosition >= 0 && audioRef.current) {
      const prevItem = queue[prevPosition]
      audioRef.current.src = prevItem.track.audio
      audioRef.current.play()
      setCurrentPosition(prevPosition)
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    const time = hhmmss(Math.floor(audioRef.current?.currentTime || 0).toString())
    setCurrentTime(time)
  }

  const handleOnDurationChange = () => {
    const duration = hhmmss((audioRef.current?.duration || 0).toString())
    setDuration(duration)
  }

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.addEventListener('durationchange', handleOnDurationChange)
      audioElement.addEventListener('timeupdate', handleTimeUpdate)
    }

    // Cleanup on unmount or if audioRef changes.
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('durationchange', handleOnDurationChange)
        audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [audioRef.current])

  useEffect(() => {
    if (queue.length && !!queuedItem) {
      if (queuedItem.type === 'play') {
        if (audioRef.current) {
          audioRef.current.src = queuedItem.track.audio
          audioRef.current.play()
          setIsPlaying(true)
        }
      } else if (queuedItem.type === 'front' && audioRef.current) {
        setCurrentMedia(audioRef.current)
      }
      clearQueueItem()
    }
  }, [queue, queuedItem])

  return {
    audioRef,
    isPlaying,
    queue,
    currentPosition,
    handlePlay,
    handlePause,
    handleNext,
    handlePrev,
    handleTimeUpdate,
    handleEnded,
    handleOnDurationChange,
  }
}
