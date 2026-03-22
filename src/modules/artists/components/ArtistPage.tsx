'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { Tabs, Tab } from '@/components/ui/Tabs'
import AlbumCard from '@/modules/albums/components/AlbumCard'

interface ArtistPageProps {
  artist: {
    id: string
    name: string
    slug: string
    bio: string
    heroImage: string
    socialLinks: Record<string, string> | null
  }
  albums: Array<{
    id: string
    slug: string
    title: string
    coverImageUri: string | null
    releaseDate: Date | string | null
    primaryArtist: { name: string; slug: string }
  }>
  epks: Array<{
    id: string
    slug: string
    title: string
    type: string
  }>
}

export default function ArtistPage({ artist, albums, epks }: ArtistPageProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={artist.slug}
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {/* Fixed hero background */}
        <div className="fixed left-0 top-0 -z-10 h-[100vh] w-full overflow-hidden">
          <Image
            src={artist.heroImage}
            alt={artist.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Scrollable content */}
        <div className="relative mt-0 sm:mt-[45vh] min-h-screen bg-[#131313] rounded-t-lg">
          <div className="py-12 px-4 sm:px-6">
            {/* Artist name */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold uppercase text-white">
                {artist.name}
              </h1>
            </div>

            {/* Social links */}
            {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
              <div className="flex gap-4 justify-center py-4 text-sm uppercase">
                {Object.entries(artist.socialLinks).map(([platform, url]) =>
                  url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {platform}
                    </a>
                  ) : null
                )}
              </div>
            )}

            {/* EPKs */}
            {epks.length > 0 && (
              <div className="flex gap-4 justify-center py-4">
                {epks.map((epk) => (
                  <Link
                    key={epk.id}
                    href={`/artists/${artist.slug}/epk/${epk.slug}`}
                    className="border border-white-13 px-6 py-2 text-sm uppercase text-white hover:bg-white/5 transition-colors"
                  >
                    {epk.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Bio */}
            <div className="max-w-3xl mx-auto py-8">
              <Tabs defaultTab="BIO">
                <Tab label="BIO">
                  <div className="text-white text-lg leading-relaxed">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      remarkPlugins={[remarkGfm]}
                    >
                      {artist.bio}
                    </ReactMarkdown>
                  </div>
                </Tab>
              </Tabs>
            </div>

            {/* Discography */}
            {albums.length > 0 && (
              <div className="mt-12">
                <div className="px-2 sm:px-8 uppercase text-lg py-4 text-white">
                  Discography
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 border-t border-white-13">
                  {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
