import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import AlbumCard from '@/modules/albums/components/AlbumCard'

export const metadata: Metadata = {
  title: 'Discography',
}

export default async function DiscographyPage() {
  const albums = await prisma.album.findMany({
    where: { isActive: true },
    include: {
      primaryArtist: { select: { name: true, slug: true } },
      genre: true,
    },
    orderBy: { releaseDate: 'desc' },
  })

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto border-t border-white-13">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
      {albums.length === 0 && (
        <p className="text-white/40 text-sm text-center py-12">No releases yet.</p>
      )}
    </div>
  )
}
