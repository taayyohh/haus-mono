import VideoPage from '@/modules/videos/components/VideoPage'
import { fetchVideo } from '@/modules/videos/utils/fetchVideo'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { onchainVideoFetch } from '@/modules/videos/utils/onchainVideoFetch'
import { fetchBatchAlbums } from '@/modules/albums/utils/fetchAlbums'

export default async function Page(context: any) {
  const { data: video } = await fetchVideo(context.params.slug)
  const { collection, tokens, artist } = await onchainVideoFetch(video)
  const { data: albums } = await fetchBatchAlbums([video.associatedAlbum])

  return (
    <VideoPage
      video={video}
      collection={collection}
      token={tokens?.[0]}
      artist={artist}
      album={albums[0]}
    />
  )
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data: video } = await fetchVideo(params.slug)
  const { collection, tokens, artist } = await onchainVideoFetch(video)

  return {
    title: `LUCIDHAUS - ${video.title}`,
    description:
      collection?.metadata?.description || 'Timeless, post-genre, Black music.',
    openGraph: {
      title: `LUCIDHAUS - ${video.title}`,
      description:
        collection?.metadata?.description || 'Timeless, post-genre, Black music.',
      images: [
        {
          url: getIpfsGateway(video.thumbnailUri),
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `LUCIDHAUS - ${video.title}`,
      description:
        collection?.metadata?.description || 'Timeless, post-genre, Black music.',
      card: 'summary_large_image',
      site: '@lucidhaus',
      creator: '@lucidhaus',
      images: getIpfsGateway(video.thumbnailUri),
    },
  }
}
