import ArtistPage from '@/modules/artists/components/ArtistPage'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'

export default async function Page(context: any) {
  const { data: artist } = await fetchArtist(context.params.slug)

  return <ArtistPage artist={artist} />
}
