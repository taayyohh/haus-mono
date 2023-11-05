import { IMusicVideo } from '@/models/MusicVideo'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { sdk } from '@/graphql/client'
import { Address } from 'viem'
import {
  OrderDirection,
  ZoraCreateContractQuery,
  ZoraCreateToken_OrderBy,
  ZoraCreateTokenQuery,
} from '@/graphql/sdk.generated'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IArtist } from '@/models/Artist'

export interface PlayerVideo {
  artist: IArtist
  image: string
  audio: string
  title: string
  trackNumber: number
  video: IMusicVideo
  collection: ZoraCreateContractQuery['zoraCreateContract']
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
}
export const randomVideo = async (videos: IMusicVideo[]): Promise<PlayerVideo> => {
  const random = (max: any[]) => Math.floor(Math.random() * max.length)
  const video = videos[random(videos)]

  if (!video) return {} as Promise<PlayerVideo>

  const { zoraCreateContract: collection } = await sdk().zoraCreateContract({
    address: video.collectionAddress as Address,
  })
  const { zoraCreateTokens: tokens } = await sdk().zoraCreateTokens({
    collectionAddress: video?.collectionAddress as Address,
    perPage: 20,
    offset: 0,
    orderBy: ZoraCreateToken_OrderBy.Id,
    orderDirection: OrderDirection.Asc,
  })
  const { data: artist } = await fetchArtist(video.primaryArtist)
  const album = tokens[random(tokens)]

  return {
    artist: artist,
    image: getIpfsGateway(video?.thumbnailUri || ''),
    audio: getIpfsGateway(album.metadata?.animationUrl || ''),
    title: album.metadata?.name!,
    trackNumber: Number(album.tokenId),
    token: album,
    collection: collection,
    video: video,
  }
}
