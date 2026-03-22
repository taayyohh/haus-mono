import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductDetail from '@/modules/shop/components/ProductDetail'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!product) return { title: 'Product Not Found' }
  return { title: product.name }
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { stock: true },
  })

  if (!product || !product.isActive) notFound()

  return <ProductDetail product={product} />
}
