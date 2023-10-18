import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { PlayerTrack } from '@/store/player'

export function convertToPlayerTracks(
  tokens: ZoraCreateTokenQuery['zoraCreateTokens'],
  collection: ZoraCreateContractQuery['zoraCreateContract'],
  album: IAlbum,
  artist: IArtist
): PlayerTrack[] {
  return tokens.map((token, index) => ({
    artist: artist.name,
    image: token.metadata?.image || '',
    audio: getIpfsGateway(token.metadata?.animationUrl || '') || '', // Assuming animationUrl is the audio file
    title: token.metadata?.name || '',
    trackNumber: Number(token.tokenId),
    album: album,
    collection,
    token,
  }))
}
