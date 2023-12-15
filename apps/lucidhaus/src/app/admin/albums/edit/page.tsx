import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import AlbumEditList from '@/modules/albums/components/AlbumEditList'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'

export default async function Page(context: any) {
  const { data } = await fetchAlbums()
  const albums = await Promise.all(
    data?.map(async (album) => {
      const { data: artist } = await fetchArtist(album.primaryArtist)
      return { ...album, artist } as IAlbum & { artist: IArtist }
    })
  )

  return <AlbumEditList albums={albums} />
}
