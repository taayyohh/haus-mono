import AboutPage from '@/modules/business/components/AboutPage'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import WhatPage from '@/modules/business/components/WhatPage'
import config from '@/constants/config'

export const metadata: Metadata = {
  metadataBase: new URL(config.BASE_URL as string),
  title: 'LUCIDHAUS',
  description: 'BUT LIKE WHAT IS THIS? AND WHY IS THIS? AND HOW DO I USE IT??',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'BUT LIKE WHAT IS THIS? AND WHY IS THIS? AND HOW DO I USE IT??',
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
    description: 'BUT LIKE WHAT IS THIS? AND WHY IS THIS? AND HOW DO I USE IT??',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
    ),
  },
}
export default async function Page() {
  return <WhatPage />
}
