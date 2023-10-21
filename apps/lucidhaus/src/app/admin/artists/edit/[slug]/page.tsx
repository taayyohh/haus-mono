import ArtistEditForm from '@/modules/artists/components/ArtistEditForm'

export default async function Page(context: any) {
  return <ArtistEditForm slug={context.params.slug} />
}
