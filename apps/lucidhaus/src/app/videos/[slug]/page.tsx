import VideoPage from '@/modules/videos/components/VideoPage'
import { fetchVideo } from '@/modules/videos/utils/fetchVideo'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { onchainVideoFetch } from '@/modules/videos/utils/onchainVideoFetch'

export default async function Page(context: any) {
  const { data: video } = await fetchVideo(context.params.slug)
  const { collection, tokens, artist } = await onchainVideoFetch(video)

  return (
    <VideoPage
      video={video}
      collection={collection}
      token={tokens?.[0]}
      artist={artist}
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
      images: [
        {
          url: getIpfsGateway(video.thumbnailUri),
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `LUCIDHAUS - ${video.title}`,
      description: 'Timeless, post-genre, Black music.',
      site: '@lucidhaus',
      creator: '@lucidhaus',
      images: getIpfsGateway(video.thumbnailUri),
    },
  }
}
