import { IArtist } from '@/models/Artist'
import Link from 'next/link'

export default function ArtistEditList({ artists }: { artists: IArtist[] }) {
  return (
    <div className={'flex flex-col'}>
      <div className={'flex-flex-col'}>
        {artists?.map((artist) => (
          <div key={artist._id}>
            <Link href={`/admin/artists/edit/${artist.slug}`}>{artist.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
