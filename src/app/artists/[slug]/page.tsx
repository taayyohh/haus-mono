import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArtistPage from '@/modules/artists/components/ArtistPage'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = await prisma.artist.findUnique({ where: { slug: params.slug } })
  if (!artist) return { title: 'Artist Not Found' }
  return { title: artist.name }
}

export default async function ArtistDetailPage({ params }: Props) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.slug },
    include: {
      albums: {
        where: { isActive: true },
        include: {
          primaryArtist: { select: { name: true, slug: true } },
          genre: true,
        },
        orderBy: { releaseDate: 'desc' },
      },
      epks: {
        where: { isPublished: true },
        select: { id: true, slug: true, title: true, type: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!artist) notFound()

  return (
    <ArtistPage
      artist={{
        ...artist,
        socialLinks: artist.socialLinks as Record<string, string> | null,
      }}
      albums={artist.albums}
      epks={artist.epks}
    />
  )
}
