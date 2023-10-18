import AlbumPage from '@/modules/albums/components/AlbumPage'
import { fetchAlbum } from '@/modules/albums/utils/fetchAlbum'
import { sdk } from '@/graphql/client'
import { Address } from 'viem'
import { OrderDirection, ZoraCreateToken_OrderBy } from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'

export default async function Page(context: any) {
  const { data: album } = await fetchAlbum(context.params.slug)
  if(!album.collectionAddress) return

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
  return (
    <AlbumPage album={album} collection={collection} tokens={tokens} artist={artist} />
  )
}
