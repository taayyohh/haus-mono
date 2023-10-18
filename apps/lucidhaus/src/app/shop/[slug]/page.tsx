import ProductPage from '@/modules/store/components/ProductPage'
import { fetchProduct } from '@/modules/store/utils/fetchProduct'
import { stripe } from '@/stripe/stripe-sdk'

export default async function Page(context: any) {
  const { data: product } = await fetchProduct(context.params.slug)
  const stripeProduct = await stripe.products.retrieve(product.stripeId)

  return <ProductPage product={{ haus: product, stripe: stripeProduct }} />
}
