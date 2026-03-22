'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePlayerStore, PlayerTrack } from '@/store/player'

interface Track {
  id: string
  title: string
  duration: number | null
  trackNumber: number
  featuredArtists: string[]
  audioUrl: string | null
}

interface AlbumPageProps {
  album: {
    id: string
    title: string
    slug: string
    coverImageUri: string | null
    releaseDate: Date | string | null
    label: string | null
    catalogNumber: string | null
    albumNotes: string | null
    producers: string[]
    primaryArtist: { name: string; slug: string }
    genre: { name: string } | null
    tracks: Track[]
  }
}

function formatDuration(seconds: number | null) {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function padTrackNumber(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export default function AlbumPage({ album }: AlbumPageProps) {
  const { queueFront, play, queue, currentPosition, isPlaying } = usePlayerStore()

  const toPlayerTracks = (tracks: Track[]): PlayerTrack[] =>
    tracks
      .filter(t => t.audioUrl)
      .map(t => ({
        artist: album.primaryArtist.name,
        artistSlug: album.primaryArtist.slug,
        title: t.title,
        trackNumber: t.trackNumber,
        audio: t.audioUrl!,
        image: album.coverImageUri || '',
        albumSlug: album.slug,
      }))

  const handlePlayAlbum = () => {
    const tracks = toPlayerTracks(album.tracks)
    if (tracks.length === 0) return
    queueFront(tracks)
    setTimeout(() => play(), 50)
  }

  const handlePlayTrack = (track: Track) => {
    if (!track.audioUrl) return
    const playerTrack = toPlayerTracks([track])
    queueFront(playerTrack)
    setTimeout(() => play(), 50)
  }

  const isTrackActive = (track: Track) => {
    const current = queue[currentPosition]
    return current && current.title === track.title && current.albumSlug === album.slug && isPlaying
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 w-full"
        style={{ minHeight: 'calc(100vh - 96px)' }}
      >
        {/* Left: Album cover */}
        <div className="mb-6 sm:mb-0 relative flex h-full items-center justify-center p-8">
          {album.coverImageUri && (
            <Image
              src={album.coverImageUri}
              alt={`Cover art for ${album.title}`}
              width={700}
              height={700}
              className="object-contain max-h-[80vh]"
              priority
            />
          )}
        </div>

        {/* Right: Album info */}
        <div className="flex flex-col px-4 sm:px-6 py-8">
          <Link
            href={`/artists/${album.primaryArtist.slug}`}
            className="text-2xl uppercase text-white hover:text-white/80 transition-colors"
          >
            {album.primaryArtist.name}
          </Link>
          <div className="italic text-white/80 text-lg">{album.title}</div>

          <div className="flex gap-4 mt-2 text-xs text-white/40 uppercase">
            {album.releaseDate && (
              <span>{new Date(album.releaseDate).getFullYear()}</span>
            )}
            {album.genre && <span>{album.genre.name}</span>}
            {album.label && <span>{album.label}</span>}
            {album.catalogNumber && <span>{album.catalogNumber}</span>}
          </div>

          {/* Play album button */}
          {album.tracks.some(t => t.audioUrl) && (
            <button
              onClick={handlePlayAlbum}
              className="flex items-center gap-2 mt-6 border-t border-b border-white-13 py-4 px-4 sm:px-8 text-white hover:bg-[#111] cursor-pointer w-full text-sm uppercase"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <polygon points="0,0 12,6 0,12" />
              </svg>
              Play
            </button>
          )}

          {/* Tracklist */}
          {album.tracks.length > 0 && (
            <div className="flex flex-col self-start w-full mt-8">
              <div className="uppercase py-2">
                <div className="px-4 sm:px-8 text-white text-sm">Tracklist</div>
              </div>
              <ul>
                {album.tracks.map((track) => (
                  <li
                    key={track.id}
                    className={`flex items-center justify-between border-t border-white-13 px-4 sm:px-8 text-white hover:bg-[#111] cursor-pointer ${
                      isTrackActive(track) ? 'bg-black' : ''
                    }`}
                    onClick={() => handlePlayTrack(track)}
                  >
                    <div className="flex w-full py-5">
                      <span className="pr-6 text-white/40">
                        {padTrackNumber(track.trackNumber)}
                      </span>
                      <span>{track.title}</span>
                      {track.featuredArtists.length > 0 && (
                        <span className="text-white/40 ml-2 text-sm">
                          ft. {track.featuredArtists.join(', ')}
                        </span>
                      )}
                    </div>
                    {track.duration && (
                      <span className="text-white/30 text-sm">
                        {formatDuration(track.duration)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Credits */}
          {album.producers.length > 0 && (
            <div className="mt-8 text-sm text-white/40">
              <span className="uppercase">Produced by </span>
              <span className="text-white/60">{album.producers.join(', ')}</span>
            </div>
          )}

          {album.albumNotes && (
            <div className="mt-8 text-sm text-white/60 whitespace-pre-line">
              {album.albumNotes}
            </div>
          )}
        </div>
      </div>

      {/* Blur footer effect */}
      {album.coverImageUri && (
        <div className="relative mt-24 h-[500px] overflow-hidden">
          <Image
            src={album.coverImageUri}
            alt=""
            fill
            className="object-cover blur-3xl opacity-20"
          />
        </div>
      )}
    </>
  )
}
