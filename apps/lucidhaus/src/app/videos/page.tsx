import { fetchVideos } from '@/modules/videos/utils/fetchVideos'
import VideoCard from '@/modules/videos/components/VideoCard'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IMusicVideo } from '@/models/MusicVideo'
import { IArtist } from '@/models/Artist'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { randomVideo } from '@/utils/randomVideo'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import MintButton from '@/components/MintButton'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lucid.haus'),
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
  const featuredVideo = await randomVideo(data)

  return (
    <div>
      <div className={'border-t border-white-13'}>
        <div
          className={
            'my-3 sm:mb-0 relative flex flex-col gap-2 items-center justify-center w-full sm:w-3/5 mx-auto py-8 min-h-[auto] sm:min-h-[740px]'
          }
        >
          <MediaPlayer
            title={`${featuredVideo.title}`}
            src={{
              src: getIpfsGateway(featuredVideo?.token?.metadata?.animationUrl || ''),
              type: 'video/mp4',
            }}
            controls={true}
            poster={getIpfsGateway(featuredVideo.image)}
          >
            <MediaProvider />
          </MediaPlayer>
          <div className={'self-start flex flex-col text-sm pl-4 sm:pl-0'}>
            <div className={'uppercase'}>
              <Link href={`/artists/${featuredVideo.artist.slug}`}>
                {featuredVideo.artist.name}
              </Link>
            </div>
            <div>
              <Link href={`/videos/${featuredVideo.video.slug}`}>
                {featuredVideo.title}
              </Link>
            </div>
            <em>{featuredVideo.token.totalMinted} mints</em>
            <div className={'mt-2'}>
              <MintButton
                token={featuredVideo?.token}
                collection={featuredVideo?.collection}
              />
            </div>
          </div>
        </div>
      </div>
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
