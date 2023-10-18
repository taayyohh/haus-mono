'use client'

import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { useResponsive } from '@/hooks/useResponsive'
import Track from '@/modules/albums/components/Track'
import DateFormatter from '@/components/DateFormatter'
import { useMemo } from 'react'
import MintBatchButton from '@/components/MintBatchButton'
import Link from 'next/link'
import Play from '../../../../public/icons/play.svg'
import { convertToPlayerTracks } from '@/utils/convertToPlayerTracks'
import { PlayerState, usePlayerStore } from '@/store/player'

const AlbumPage = ({
  album,
  collection,
  tokens,
  artist,
}: {
  album: IAlbum
  collection: ZoraCreateContractQuery['zoraCreateContract'] | null | undefined
  tokens: ZoraCreateTokenQuery['zoraCreateTokens'] | null | undefined
  artist: IArtist
}) => {
  const { isMobile } = useResponsive()
  const { wallet: activeWallet } = usePrivyWagmi()
  const userAddress = activeWallet?.address as `0x${string}`
  const currentTime = Math.floor(Date.now() / 1000)
  const sortedTokens = useMemo(() => {
    if (Array.isArray(tokens)) {
      return [...tokens]
        .filter(
          (token) =>
            token?.salesStrategies &&
            token?.salesStrategies[0] &&
            token?.salesStrategies[0].fixedPrice &&
            Number(token?.salesStrategies[0].fixedPrice.saleEnd) > currentTime
        )
        .sort((a, b) => Number(a.tokenId) - Number(b.tokenId))
    }
    return []
  }, [tokens])

  const addMultipleToQueue = usePlayerStore(
    (state: PlayerState) => state.addMultipleToQueue
  )
  const media = usePlayerStore((state: PlayerState) => state.media)

  const handlePlayAlbum = () => {
    if (!tokens) return

    addMultipleToQueue(convertToPlayerTracks(tokens, collection, album, artist), 'play')
  }

  return (
    <div className={'flex flex-col text-white w-full mx-auto items-center'}>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 w-full'}
        style={isMobile ? { height: '100%' } : { height: 'calc(100vh - 96px)' }}
      >
        <div className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}>
          <Image
            src={getIpfsGateway(album.coverImageUri || '')}
            alt={`image for ${album.title}`}
            width={700}
            height={700}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className={'flex flex-col px-4 sm:px-6'}>
          <div className={'text-2xl uppercase'}>
            <div>
              <Link href={`/artists/${artist.slug}`}>{artist?.name}</Link>
            </div>
            <div className={'italic'}>{album.title}</div>
            <div>LH004</div>
          </div>
          <div className={'mt-8'}>
            <DateFormatter date={new Date(album.releaseDate)} />
          </div>
          {userAddress && (
            <div className={'mt-20'}>
              <MintBatchButton tokens={sortedTokens} collection={collection} />
            </div>
          )}
          <div
            onClick={handlePlayAlbum}
            className={
              'flex items-center justify-center gap-4 text-white border-solid border-t border-b py-2 mt-12'
            }
          >
            <Play fill={'#fff'} width={12} />
            Play
          </div>
        </div>
      </div>
      <div className={'flex flex-col self-start w-full mt-4'}>
        <div className={'uppercase mt-4 py-2'}>
          <div className={'px-4 sm:px-8 text-white text-sm'}>Tracklist</div>
        </div>
        <ul>
          {sortedTokens &&
            collection &&
            album &&
            artist &&
            sortedTokens.map((token, i) => (
              <Track
                album={album}
                key={token.tokenId}
                token={token}
                collection={collection}
                artist={artist}
                i={i + 1}
              />
            ))}
        </ul>
      </div>
      <div
        className={
          'relative overflow-hidden mt-24 flex flex-col w-full h-[500px] blur opacity-40'
        }
      >
        <Image
          src={getIpfsGateway(album.coverImageUri || '')}
          alt={`image for ${album.title}`}
          style={{ objectFit: 'cover' }}
          fill
        />
      </div>
    </div>
  )
}

export default AlbumPage
