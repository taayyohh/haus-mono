import { CheckoutForm } from '@/modules/store/components/CheckoutForm'
import Cart from '@/modules/store/components/Cart'
import Payment from '@/modules/store/components/Payment'
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
