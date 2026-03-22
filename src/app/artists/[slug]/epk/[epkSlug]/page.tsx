import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EPKPageComponent from '@/modules/epk/components/EPKPage'
import { EPKPageData } from '@/modules/epk/types'
import { Metadata } from 'next'

interface Props {
  params: { slug: string; epkSlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const epk = await prisma.ePK.findUnique({
    where: { slug: params.epkSlug },
    include: { artist: true },
  })

  if (!epk) return { title: 'EPK Not Found' }

  return {
    title: `${epk.title} - ${epk.artist.name}`,
    description: epk.bio.slice(0, 160),
  }
}

export default async function EPKPage({ params }: Props) {
  const epk = await prisma.ePK.findUnique({
    where: { slug: params.epkSlug },
    include: {
      artist: { select: { name: true, slug: true } },
      album: { select: { title: true, slug: true } },
      pressLinks: { orderBy: { sortOrder: 'asc' } },
      photos: { orderBy: { sortOrder: 'asc' } },
      tourGraphics: { orderBy: { sortOrder: 'asc' } },
    },
  })

  if (!epk || !epk.isPublished) {
    notFound()
  }

  // Verify the artist slug matches
  if (epk.artist.slug !== params.slug) {
    notFound()
  }

  const epkData: EPKPageData = {
    id: epk.id,
    title: epk.title,
    slug: epk.slug,
    type: epk.type,
    bio: epk.bio,
    heroVideoSrc: epk.heroVideoSrc,
    heroVideoPoster: epk.heroVideoPoster,
    pressLinks: epk.pressLinks,
    photos: epk.photos,
    tourGraphics: epk.tourGraphics,
    liveVideos: epk.liveVideos as any,
    artist: epk.artist,
    album: epk.album,
  }

  return <EPKPageComponent epk={epkData} />
}
