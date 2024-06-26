import { CheckoutForm } from '@/modules/shop/components/CheckoutForm'
import Cart from '@/modules/shop/components/Cart'
import Payment from '@/modules/shop/components/Payment'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import config from '@/constants/config'

export const metadata: Metadata = {
  metadataBase: new URL(config.BASE_URL as string),
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
export default async function Page(context: any) {
  return (
    <CheckoutForm>
      <div className={'flex flex-col md:flex-row gap-12 px-4 sm:px-8'}>
        <div className={'w-full'}>
          <Cart />
        </div>
        <div className={'w-full'}>
          <Payment />
        </div>

      </div>
    </CheckoutForm>
  )
}
