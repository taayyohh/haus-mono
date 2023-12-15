import Link from 'next/link'
import { IAlbum } from '@/models/Album'
import AlbumCard from '@/modules/albums/components/AlbumCard'
import { IArtist } from '@/models/Artist'

export default function AlbumEditList({
  albums,
}: {
  albums: (IAlbum & { artist: IArtist })[]
}) {
  return (
    <div className={'flex flex-col'}>
      <div className={'grid grid-cols-1 sm:grid-cols-4'}>
        {albums?.map((album) => (
          <div key={album._id}>
            <AlbumCard album={album} link={`/admin/albums/edit/${album.slug}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
