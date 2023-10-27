import Me from '@/modules/auth/components/Me'
import { fetchOnrampSession } from '@/modules/store/utils/fetchOnrampSession'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { loadStripeOnramp } from '@stripe/crypto'
import config from '@/constants/config'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'Timeless, post-genre, Black music.',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
       width: 1200,
          height: 630,
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
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
    ),
  },
}
export default async function Page() {
  const { data: onramp } = await fetchOnrampSession()
  const stripeOnrampPromise = loadStripeOnramp(config.stripePublic!)


  return <Me onramp={onramp} stripePromise={stripeOnrampPromise} />
}
