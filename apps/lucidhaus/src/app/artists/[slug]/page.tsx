import ArtistPage from '@/modules/artists/components/ArtistPage'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'


export const dynamic = 'force-dynamic'
export default async function Page(context: any) {
  const { data: artist } = await fetchArtist(context.params.slug)

  return <ArtistPage artist={artist} />
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
    title: `${artist.name} - LUCIDHAUS`,
    description: artist.bio || 'Timeless, post-genre, Black music.',
    openGraph: {
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
