import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import ArtistsList from '@/modules/artists/components/ArtistsList'

export const metadata: Metadata = {
  title: 'Artists',
}

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, heroImage: true },
  })

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <ArtistsList artists={artists} />
    </div>
  )
}
