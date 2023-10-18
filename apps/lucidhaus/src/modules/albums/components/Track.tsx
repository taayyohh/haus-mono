import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import MintButton from '@/components/MintButton'
import { usePlayerStore } from '@/store/player'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IArtist } from '@/models/Artist'
import { IAlbum } from '@/models/Album'

const Track = ({
  album,
  token,
  collection,
  artist,
  i,
}: {
  album: IAlbum
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  artist: IArtist
  collection: ZoraCreateContractQuery['zoraCreateContract']
  i: number
}) => {
  const addtoQueue = usePlayerStore((state) => state.addToQueue)

  return (
    <li
      key={token.tokenId}
      className={
        'flex items-center justify-between py-2 border-solid border-t px-4 sm:px-8 text-white hover:bg-white hover:text-black'
      }
      onClick={() =>
        addtoQueue(
          {
            artist: artist.name || '',
            audio: getIpfsGateway(token.metadata?.animationUrl!),
            image: getIpfsGateway(token.metadata?.image!),
            title: token.metadata?.name!,
            trackNumber: Number(token.tokenId),
            token,
            collection,
            release: album
          },
          'play'
        )
      }
    >
      <div>
        <span className={'pr-6'}>{i < 10 ? `0${i}` : i}</span> {token.metadata?.name}
      </div>
      <MintButton token={token} collection={collection} />
    </li>
  )
}

export default Track
