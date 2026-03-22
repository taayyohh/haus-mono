import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AlbumPageComponent from '@/modules/albums/components/AlbumPage'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await prisma.album.findUnique({
    where: { slug: params.slug },
    include: { primaryArtist: { select: { name: true } } },
  })
  if (!album) return { title: 'Album Not Found' }
  return { title: `${album.title} - ${album.primaryArtist.name}` }
}

export default async function AlbumDetailPage({ params }: Props) {
  const album = await prisma.album.findUnique({
    where: { slug: params.slug },
    include: {
      primaryArtist: { select: { name: true, slug: true } },
      genre: { select: { name: true } },
      tracks: { orderBy: { trackNumber: 'asc' } },
    },
  })

  if (!album || !album.isActive) notFound()

  return <AlbumPageComponent album={album} />
}
