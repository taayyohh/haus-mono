import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { randomSong } from '@/utils/randomSong'
import HomePage from '@/modules/business/components/Home'

export default async function Page(context: any) {
  const { data: albums } = await fetchAlbums(1, 20)
  const featuredTrack = await randomSong(albums)

  return (
    <div className={'w-full'} style={{ height: 'calc(100vh - 96px)' }}>
      <HomePage track={featuredTrack} />
    </div>
  )
}
