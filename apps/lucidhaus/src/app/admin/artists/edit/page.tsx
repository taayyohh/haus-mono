import ArtistEditList from '@/modules/artists/components/ArtistEditList'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'

export default async function Page(context: any) {
  const { data: artists } = await fetchArtists()

  return <ArtistEditList artists={artists} />
}
