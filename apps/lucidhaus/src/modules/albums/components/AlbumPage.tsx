'use client'

import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { useResponsive } from '@/hooks/useResponsive'
import Track from '@/modules/albums/components/Track'
import DateFormatter from '@/components/DateFormatter'
import { useMemo } from 'react'
import MintBatchButton from '@/components/MintBatchButton'
import Link from 'next/link'
import Play from '../../../../public/icons/play.svg'
import { convertToPlayerTracks } from '@/utils/convertToPlayerTracks'
import { MintComment, MintCommentSchema } from '@/modules/comments/MintCommentSchema'
import Comments from '@/modules/comments/Comments'
import { player } from '@/store/mobxPlayer'
import { observer } from 'mobx-react'

const AlbumPage = observer(
  ({
    album,
    collection,
    tokens,
    artist,
    comments,
    commentTotal,
  }: {
    album: IAlbum
    collection: ZoraCreateContractQuery['zoraCreateContract'] | null | undefined
    tokens: ZoraCreateTokenQuery['zoraCreateTokens'] | null | undefined
    artist: IArtist
    comments: MintComment[]
    commentTotal: number
  }) => {
    const { isMobile } = useResponsive()
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

    const handlePlayAlbum = () => {
      if (!tokens) return

      if (player.isPlaying) player.pause()
      player.queueFront(convertToPlayerTracks(tokens, collection, album, artist))
      player.currentPosition = 0
      player.play()
    }

    const totalMints = useMemo(() => {
      return tokens?.reduce((sum, item) => sum + parseInt(item.totalMinted, 10), 0)
    }, [tokens])

    return (
      <div className={'flex flex-col text-white w-full mx-auto items-center'}>
        <div
          className={'grid grid-cols-1 sm:grid-cols-2 w-full'}
          style={isMobile ? { height: '100%' } : { height: 'calc(100vh - 96px)' }}
        >
          <div
            className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}
          >
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
            <div className={'flex flex-col gap-2 mt-8'}>
              <DateFormatter date={new Date(album.releaseDate)} />
              <div className={'italic'}>
                {Number(totalMints) > 1 ? `${totalMints} mints` : `${totalMints} mint`}
              </div>
            </div>
            <div className={'mt-20'}>
              <MintBatchButton tokens={sortedTokens} collection={collection} />
            </div>
            <div
              onClick={handlePlayAlbum}
              className={`flex items-center justify-center gap-4 text-white border-solid border-t border-white-13 hover:bg-[#111] border-b py-2 mt-12 cursor-pointer`}
            >
              <Play fill={'#fff'} width={12} /> Play
            </div>
            <Comments comments={comments} commentTotal={commentTotal} />
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
)

export default AlbumPage
