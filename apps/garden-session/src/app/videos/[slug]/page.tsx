import VideoPage from '@/modules/videos/components/VideoPage'
import { sdk } from '@/graphql/client'
import { Address } from 'viem'
import { OrderDirection, ZoraCreateToken_OrderBy } from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { fetchVideo } from '@/modules/videos/utils/fetchVideo'

export default async function Page(context: any) {
  const { data: video } = await fetchVideo(context.params.slug)

  const { zoraCreateContract: collection } = await sdk().zoraCreateContract({
    address: video.collectionAddress as Address,
  })
  const { zoraCreateTokens: tokens } = await sdk().zoraCreateTokens({
    collectionAddress: video.collectionAddress as Address,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })
  const { data: artist } = await fetchArtist(video.primaryArtist)

  return (
    <VideoPage
      video={video}
      collection={collection}
      token={tokens?.[0]}
      artist={artist}
    />
  )
}
