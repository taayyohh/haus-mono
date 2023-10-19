import { sdk } from '@/graphql/client'
import { OrderDirection, ZoraCreateToken_OrderBy } from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IMusicVideo } from '@/models/MusicVideo'

export async function onchainVideoFetch(video: IMusicVideo) {
  const sdkInstance = sdk() // Assuming `sdk` returns an instance with methods

  const { zoraCreateContract: collection } = await sdkInstance.zoraCreateContract({
    address: video.collectionAddress,
  })

  const { zoraCreateTokens: tokens } = await sdkInstance.zoraCreateTokens({
    collectionAddress: video.collectionAddress,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })

  const { data: artist } = await fetchArtist(video.primaryArtist)

  return {
    collection,
    tokens,
    artist,
  }
}
