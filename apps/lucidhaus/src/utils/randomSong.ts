import { IAlbum } from '@/models/Album'
import { PlayerTrack } from '@/modules/player'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { sdk } from '@/graphql/client'
import { Address } from 'viem'
import { OrderDirection, ZoraCreateToken_OrderBy } from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'

export const randomSong = async (songs: IAlbum[]): Promise<PlayerTrack> => {
  const random = (max: any[]) => Math.floor(Math.random() * max.length)
  const album = songs[random(songs)]

  if (!album) return {} as Promise<PlayerTrack>

  const { zoraCreateContract: collection } = await sdk().zoraCreateContract({
    address: album?.collectionAddress as Address,
  })
  const { zoraCreateTokens: tokens } = await sdk().zoraCreateTokens({
    collectionAddress: album?.collectionAddress as Address,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })
  const { data: artist } = await fetchArtist(album.primaryArtist)
  const song = tokens[random(tokens)]

  return {
    artist: artist.name,
    image: getIpfsGateway(album?.coverImageUri),
    audio: getIpfsGateway(song.metadata?.animationUrl!),
    title: song.metadata?.name!,
    trackNumber: Number(song.tokenId),
    token: song,
    collection: collection,
    album: album,
  }
}
