import { prisma } from '@/lib/prisma'
import FeaturedTrack from '@/modules/business/components/FeaturedTrack'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Get a random track with audio from the catalog
  const tracks = await prisma.track.findMany({
    where: { audioUrl: { not: null } },
    include: {
      album: {
        include: {
          primaryArtist: { select: { name: true, slug: true } },
        },
      },
    },
    take: 50,
  })

  if (tracks.length === 0) {
    return (
      <div className="grid h-[calc(100vh-96px)] w-full place-items-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-light tracking-[0.2em] uppercase text-white mb-6">
            Lucid Haus
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-widest">
            Independent Music Label
          </p>
        </div>
      </div>
    )
  }

  // Pick a random track
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]

  const featuredTrack = {
    artist: randomTrack.album.primaryArtist.name,
    artistSlug: randomTrack.album.primaryArtist.slug,
    title: randomTrack.title,
    trackNumber: randomTrack.trackNumber,
    audio: randomTrack.audioUrl!,
    image: randomTrack.album.coverImageUri || '',
    albumSlug: randomTrack.album.slug,
  }

  return <FeaturedTrack track={featuredTrack} />
}
