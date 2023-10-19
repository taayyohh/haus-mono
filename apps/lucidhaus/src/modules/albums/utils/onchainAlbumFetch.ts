import { sdk } from '@/graphql/client'
import { OrderDirection, ZoraCreateToken_OrderBy } from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { Address } from 'viem'
import { IAlbum } from '@/models/Album'

export async function onchainAlbumFetch(album: IAlbum) {
  const { zoraCreateContract: collection } = await sdk().zoraCreateContract({
    address: album.collectionAddress as Address,
  })
  const { zoraCreateTokens: tokens } = await sdk().zoraCreateTokens({
    collectionAddress: album.collectionAddress as Address,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })
  const { data: artist } = await fetchArtist(album.primaryArtist)

  return {
    collection,
    tokens,
    artist,
  }
}
