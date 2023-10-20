import DateFormatter from '@/components/DateFormatter'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import { IMusicVideo } from '@/models/MusicVideo'
import { IArtist } from '@/models/Artist'

export default function VideoCard({
  video,
}: {
  video: IMusicVideo & { artist: IArtist }
}) {
  return (
    <div>
      <Link
        href={`/videos/${video.slug}`}
        key={video.slug}
        className={
          'flex flex-col items-center justify-center p-8 border border-l-0 border-t-0 border-white-13 h-full'
        }
      >
        <div
          className={
            'relative flex flex-col w-full h-full max-w-[500px] rounded overflow-hidden'
          }
        >
          <div className={'flex flex-col text-sm mb-4 text-white'}>
            <div className={'uppercase'}>{video.artist?.name}</div>
            <div className={'italic'}>{video.title}</div>
            {video.releaseDate && <DateFormatter date={new Date(video.releaseDate)} />}
          </div>
          <Image
            src={getIpfsGateway(video.thumbnailUri || '')}
            alt={`image for ${video.title}`}
            style={{ objectFit: 'cover' }}
            height={500}
            width={500}
            className={'my-auto'}
          />
        </div>
      </Link>
    </div>
  )
}
