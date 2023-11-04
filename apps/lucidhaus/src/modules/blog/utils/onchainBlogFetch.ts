import { sdk } from '@/graphql/client'
import {
  OrderDirection,
  ZoraCreateContractQuery,
  ZoraCreateToken_OrderBy,
  ZoraCreateTokenQuery,
} from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IMusicVideo } from '@/models/MusicVideo'
import { fetchAlbum } from '@/modules/albums/utils/fetchAlbum'
import { fetchBatchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { IBlogPost } from '@/models/Blog'
import { IArtist } from '@/models/Artist'

export async function onchainBlogFetch(blogPost: IBlogPost) {
  const sdkInstance = sdk()

  if (!blogPost)
    return {
      collection: {} as ZoraCreateContractQuery['zoraCreateContract'],
      tokens: [] as ZoraCreateTokenQuery['zoraCreateTokens'],
      artist: {} as IArtist,
    }

  const { zoraCreateContract: collection } = await sdkInstance.zoraCreateContract({
    address: blogPost.collectionAddress,
  })

  const { zoraCreateTokens: tokens } = await sdkInstance.zoraCreateTokens({
    collectionAddress: blogPost.collectionAddress,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })

  const { data: artist } = await fetchArtist(blogPost.primaryArtist)

  return {
    collection,
    tokens,
    artist,
  }
}
