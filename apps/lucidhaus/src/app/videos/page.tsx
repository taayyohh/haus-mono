import { fetchVideos } from '@/modules/videos/utils/fetchVideos'
import VideoCard from '@/modules/videos/components/VideoCard'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IMusicVideo } from '@/models/MusicVideo'
import { IArtist } from '@/models/Artist'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'Timeless, post-genre, Black music.',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
       width: 1200,
          height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'LUCIDHAUS',
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
    ),
  },
}
export default async function Page() {
  const { data } = await fetchVideos(1, 20)
  const videos = await Promise.all(
    data?.map(async (video) => {
      const { data: artist } = await fetchArtist(video.primaryArtist)
      return { ...video, artist } as IMusicVideo & { artist: IArtist }
    })
  )

  return (
    <div>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto justify-center border-t border-white-13'
        }
      >
        {videos && videos.map((video) => <VideoCard video={video} key={video._id} />)}
      </div>
    </div>
  )
}
