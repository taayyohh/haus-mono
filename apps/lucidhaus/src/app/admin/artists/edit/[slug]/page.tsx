import ArtistEditForm from '@/modules/artists/components/ArtistEditForm'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'

export default async function Page(context: any) {
  const { data: artist } = await fetchArtist(context.params.slug)

  // return <ArtistEditForm slug={context.params.slug} artist={artist} />
  return null
}
