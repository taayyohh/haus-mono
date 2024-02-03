import { Metadata } from 'next'
import ArtistPage from '@/modules/artists/components/ArtistPage'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { fetchBatchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { fetchBlogsByArtist } from '@/modules/blog/utils/fetchBlogPostByArtist'
import { onchainBlogFetch } from '@/modules/blog/utils/onchainBlogFetch'

export default async function Page(context: any) {
  const { data: artist } = await fetchArtist(context.params.slug)
  const { data: albums } = await fetchBatchAlbums(artist.albums)
  const { data: posts } = await fetchBlogsByArtist(artist._id)
  const { collection, tokens } = await onchainBlogFetch(posts[0]) //TODO: change this

  return (
    <ArtistPage
      artist={artist}
      albums={albums}
      blog={{ post: posts[0], collection, tokens }}
    />
  )
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data: artist } = await fetchArtist(params.slug)

  return {
    metadataBase: new URL('https://lucid.haus'),
    title: `${artist.name} - LUCIDHAUS`,
    description: artist.bio || 'Timeless, post-genre, Black music.',
    openGraph: {
      title: `${artist.name} - LUCIDHAUS`,
      description: artist.bio || 'Timeless, post-genre, Black music.',
      images: [
        {
          url: getIpfsGateway(artist.heroImage),
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} - LUCIDHAUS`,
      description: 'Timeless, post-genre, Black music.',
      site: '@lucidhaus',
      creator: '@lucidhaus',
      images: getIpfsGateway(artist.heroImage),
    },
  }
}
