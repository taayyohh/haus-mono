'use client'

import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IMusicVideo } from '@/models/MusicVideo'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { IArtist } from '@/models/Artist'
import Image from 'next/image'
import DateFormatter from '@/components/DateFormatter'
import { useResponsive } from '@/hooks/useResponsive'
import '@vidstack/react/player/styles/base.css'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import MintButton from '@/components/MintButton'
import Link from 'next/link'
import { IAlbum } from '@/models/Album'
import AlbumCard from '@/modules/albums/components/AlbumCard'
import Comments from '@/modules/comments/Comments'
import { MintComment } from '@/modules/comments/MintCommentSchema'

const VideoPage = ({
  video,
  collection,
  token,
  artist,
  album,
  comments,
  commentTotal,
}: {
  video: IMusicVideo
  collection: ZoraCreateContractQuery['zoraCreateContract'] | null | undefined
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0] | null | undefined
  artist: IArtist
  album: IAlbum
  comments: MintComment[]
  commentTotal: number
}) => {
  const { isMobile } = useResponsive()

  return (
    <div className={'flex flex-col text-white w-full mx-auto items-center'}>
      <div
        className={'grid grid-cols-1 md:grid-cols-2 w-full'}
        style={isMobile ? { height: '100%' } : { height: 'calc(100vh - 96px)' }}
      >
        <div className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}>
          <MediaPlayer
            title={`${token?.metadata?.name}`}
            src={{
              src: getIpfsGateway(token?.metadata?.animationUrl || ''),
              type: 'video/mp4',
            }}
            controls={true}
            poster={getIpfsGateway(video.thumbnailUri)}
          >
            <MediaProvider />
          </MediaPlayer>
        </div>
        <div className={'flex flex-col px-4 sm:px-6'}>
          <div className={'text-2xl uppercase'}>
            <div>
              <Link href={`/artists/${artist.slug}`}>{artist?.name}</Link>
            </div>
            <div className={'italic'}>{video.title}</div>
            <div>LH004</div>
          </div>
          <div className={'flex flex-col gap-2 mt-8'}>
            <DateFormatter date={new Date(video.releaseDate)} />
            <div className={'italic'}>
              {Number(token?.totalMinted) > 1
                ? `${token?.totalMinted} mints`
                : `${token?.totalMinted} mint`}
            </div>
          </div>
          <div className={'mt-20'}>
            {token && collection && (
              <MintButton collection={collection} token={token} type={'Video'} />
            )}
          </div>
          <Comments comments={comments} commentTotal={commentTotal} />
        </div>
      </div>
      {album && (
        <div className={'flex flex-col self-start w-full'}>
          <div className={'uppercase mt-4 py-2'}>
            <div className={'px-4 sm:px-8'}>Off the album</div>
          </div>
          <AlbumCard
            album={{ ...album, artist } as IAlbum & { artist: IArtist }}
            link={`/discography/${album.slug}`}
          />
        </div>
      )}

      <div
        className={
          'relative overflow-hidden mt-24 flex flex-col w-full h-[500px] blur opacity-40'
        }
      >
        <Image
          src={getIpfsGateway(video.thumbnailUri || '')}
          alt={`image for ${video.title}`}
          style={{ objectFit: 'cover' }}
          fill
        />
      </div>
    </div>
  )
}

export default VideoPage
