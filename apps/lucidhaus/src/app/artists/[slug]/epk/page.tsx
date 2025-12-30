import { Metadata } from 'next'
import EPKPage from '@/modules/epk/components/EPKPage'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { fetchBatchAlbums } from '@/modules/albums/utils/fetchAlbums'

export default async function Page(context: any) {
  const slug = context.params.slug

  // Fetch artist and albums data
  const { data: artist } = await fetchArtist(slug)
  const { data: albums } = await fetchBatchAlbums(artist.albums)

  // Render EPK page directly (no password protection)
  return <EPKPage slug={slug} artist={artist} albums={albums} />
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artistName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${artistName} - EPK | LUCIDHAUS`,
    description: `Electronic Press Kit for ${artistName}`,
    robots: {
      index: false,
      follow: false,
    },
  }
}
