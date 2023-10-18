import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import ArtistsList from '@/modules/artists/components/ArtistsList'

export default async function Page() {
  const { data: artists } = await fetchArtists(1, 10)
  return (
    <div>
      <div className={'flex flex-col w-full mx-auto'}>
        {artists && <ArtistsList artists={artists} />}
      </div>
    </div>
  )
}
