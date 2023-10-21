'use client'

import DateFormatter from '@/components/DateFormatter'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'

export default function AlbumCard({ album }: { album: IAlbum & { artist: IArtist } }) {
  return (
    <>
      <Link
        href={`/discography/${album.slug}`}
        key={album.slug}
        className={
          'flex flex-col items-center justify-center p-8 border border-l-0 border-t-0 hover:bg-[#111] border-white-13 h-full'
        }
      >
        <div
          className={
            'relative flex flex-col w-full h-full max-w-[500px] rounded overflow-hidden'
          }
        >
          <div className={'flex flex-col text-sm mb-4 text-white'}>
            <div className={'uppercase'}>{album?.artist?.name}</div>
            <div className={'italic'}>{album.title}</div>
            {album.releaseDate && <DateFormatter date={new Date(album.releaseDate)} />}
          </div>
          <Image
            src={getIpfsGateway(album.coverImageUri || '')}
            alt={`image for ${album.title}`}
            style={{ objectFit: 'cover' }}
            height={500}
            width={500}
          />
        </div>
      </Link>
    </>
  )
}
