import ProductPage from '@/modules/shop/components/ProductPage'
import { fetchProduct } from '@/modules/shop/utils/fetchProduct'
import { stripe } from '@/stripe/stripe-sdk'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { fetchStripePrices } from '@/modules/shop/utils/fetchStripePrices'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Page(context: any) {
  const { data: product } = await fetchProduct(context.params.slug)
  const stripeProduct = product.stripeId
    ? await stripe.products.retrieve(product.stripeId)
    : undefined

  return <ProductPage product={{ haus: product, stripe: stripeProduct }} />
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data: product } = await fetchProduct(params.slug)

  return {
    metadataBase: new URL('https://www.lucid.haus'),
    title: `LUCIDHAUS - ${product.name}`,
    description: product.description || 'Timeless, post-genre, Black music.',
    openGraph: {
      title: `LUCIDHAUS - ${product.name}`,
      description: product.description || 'Timeless, post-genre, Black music.',
      images: [
        {
          url: getIpfsGateway(product.imageUri?.[0]),
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `LUCIDHAUS - ${product.name}`,
      description: 'Timeless, post-genre, Black music.',
      site: '@lucidhaus',
      creator: '@lucidhaus',
      images: getIpfsGateway(product.imageUri?.[0]),
    },
  }
}
