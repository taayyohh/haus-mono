import { prisma } from '@/lib/prisma'
import { ipfsUrl } from '@/lib/ipfs'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos',
}

export default async function VideosPage() {
  const videos = await prisma.musicVideo.findMany({
    where: { isActive: true },
    include: { primaryArtist: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-2xl uppercase tracking-widest text-white/40 py-8">Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white-13 pt-8">
        {videos.map((video) => (
          <div key={video.id} className="border border-white-13 overflow-hidden group">
            <div className="aspect-video bg-black">
              <video
                src={`${ipfsUrl(video.videoUri)}#t=0.5`}
                poster={video.thumbnailUri ? ipfsUrl(video.thumbnailUri) : undefined}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-white text-sm uppercase">{video.title}</h2>
                <Link
                  href={`/artists/${video.primaryArtist.slug}`}
                  className="text-white/40 text-xs hover:text-white transition-colors"
                >
                  {video.primaryArtist.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="text-white/40 text-sm col-span-full py-12 text-center">
            No videos yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  )
}
