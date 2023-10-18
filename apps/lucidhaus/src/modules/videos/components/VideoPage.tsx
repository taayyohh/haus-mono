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
import { usePrivyWagmi } from '@privy-io/wagmi-connector'

const VideoPage = ({
  video,
  collection,
  token,
  artist,
}: {
  video: IMusicVideo
  collection: ZoraCreateContractQuery['zoraCreateContract'] | null | undefined
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0] | null | undefined
  artist: IArtist
}) => {
  const { isMobile } = useResponsive()
  const { wallet } = usePrivyWagmi()

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
            <div>{artist?.name}</div>
            <div className={'italic'}>{video.title}</div>
            <div>LH004</div>
          </div>
          <div className={'mt-8'}>
            <DateFormatter date={new Date(video.releaseDate)} />
          </div>
          <div className={'mt-20'}>
            {wallet?.address && token && collection && (
              <MintButton collection={collection} token={token} type={'Video'} />
            )}
          </div>
        </div>
      </div>
      <div className={'flex flex-col self-start w-full'}>
        <div className={'uppercase mt-4 py-2'}>
          <div className={'px-4 sm:px-8'}>Off the album</div>
        </div>
      </div>
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
