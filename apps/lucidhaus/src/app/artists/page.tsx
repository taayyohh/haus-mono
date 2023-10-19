import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import ArtistsList from '@/modules/artists/components/ArtistsList'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafybeigm23wpntkvhdaqvuaebhwibwoqtdmopz2l4gbr2ri7d64dr6hzwa'
        ),
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'LUCIDHAUS',
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafybeigm23wpntkvhdaqvuaebhwibwoqtdmopz2l4gbr2ri7d64dr6hzwa'
    ),
  },
}
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
