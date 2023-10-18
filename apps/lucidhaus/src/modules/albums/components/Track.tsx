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
  const { addToQueue, media, setIsPlaying, isPlaying, queuedItem } = usePlayerStore(
    (state) => ({
      addToQueue: state.addToQueue,
      media: state.media,
      setIsPlaying: state.setIsPlaying,
      isPlaying: state.isPlaying,
      queuedItem: state.queuedItem,
    })
  )

  const handleTrackClick = () => {
    const currentTrack = {
      artist: artist.name || '',
      audio: getIpfsGateway(token.metadata?.animationUrl!),
      image: getIpfsGateway(token.metadata?.image!),
      title: token.metadata?.name!,
      trackNumber: Number(token.tokenId),
      token,
      collection,
      release: album,
    }

    // If the same track is being clicked and it's currently playing, pause it
    if (queuedItem?.track.audio === currentTrack.audio && isPlaying) {
      if (media) media.pause()
      setIsPlaying(false)
    } else {
      // Else, add the track to queue and play
      addToQueue(currentTrack, 'play')
      if (media) media.play()
    }
  }

  return (
    <li
      key={token.tokenId}
      className={
        'flex items-center justify-between py-2 border-solid border-t px-4 sm:px-8 text-white hover:bg-white hover:text-black'
      }
      onClick={handleTrackClick}
    >
      <div>
        <span className={'pr-6'}>{i < 10 ? `0${i}` : i}</span> {token.metadata?.name}
      </div>
      <MintButton token={token} collection={collection} />
    </li>
  )
}

export default Track
