import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import MintButton from '@/components/MintButton'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IArtist } from '@/models/Artist'
import { IAlbum } from '@/models/Album'
import { useMemo } from 'react'
import { player } from '@/store/mobxPlayer'
import { observer } from 'mobx-react'

const Track = observer(
  ({
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
    const handleTrackClick = () => {
      const currentTrack = {
        artist: artist.name || '',
        audio: getIpfsGateway(token.metadata?.animationUrl || ''),
        image: getIpfsGateway(token.metadata?.image || ''),
        title: token.metadata?.name!,
        trackNumber: Number(token.tokenId),
        token,
        collection,
        album,
      }

      // If the same track is being clicked and it's currently playing, pause it
      if (
        player.queue[player.currentPosition]?.audio === currentTrack.audio &&
        player.isPlaying
      ) {
        console.log('pause')
        player.pause()
      } else {
        if (player.isPlaying) {
          player.pause()
        }

        player.queueFront([currentTrack])
        player.play()
      }
    }

    const isActiveTrack = useMemo(() => {
      return player.queue[player.currentPosition]?.title === token?.metadata?.name
    }, [token?.metadata?.name, player.isPlaying, player.audioElement, player.queue])

    return (
      <li
        key={token.tokenId}
        className={`flex items-center justify-between border-solid border-t border-white-13 px-4 sm:px-8 text-white hover:bg-[#111] ${
          isActiveTrack && 'bg-black'
        }`}
      >
        <div onClick={handleTrackClick} className={'flex cursor-pointer w-full py-5'}>
          <span className={'pr-6'}>{i < 10 ? `0${i}` : i}</span>
          <span>{token.metadata?.name}</span>
        </div>
        {token && collection && <MintButton token={token} collection={collection} />}
      </li>
    )
  }
)

export default Track
