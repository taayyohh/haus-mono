import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import AlbumCard from '@/modules/albums/components/AlbumCard'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'

export default async function Page() {
  const { data } = await fetchAlbums(1, 30)
  const albums = await Promise.all(
    data?.map(async (album) => {
      const { data: artist } = await fetchArtist(album.primaryArtist)
      return { ...album, artist } as IAlbum & { artist: IArtist }
    })
  )

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto'}>
      {albums && albums.map((album) => <AlbumCard album={album} key={album._id} />)}
    </div>
  )
}
