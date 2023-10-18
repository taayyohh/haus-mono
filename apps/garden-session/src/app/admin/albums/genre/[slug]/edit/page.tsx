import GenreForm from '@/modules/albums/components/GenreForm'
import { fetchGenre } from '@/modules/albums/utils/fetchGenre'

export default async function Page(context: any) {
  const slug = context.params.slug
  const { data: genre } = await fetchGenre(slug)
  return (
    <GenreForm
      initialData={{ _id: genre._id, name: genre.name, description: genre.description }}
      mode={'edit'}
    />
  )
}
