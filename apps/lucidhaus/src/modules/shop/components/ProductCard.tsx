import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import { IProduct } from '@/models/Product'

export default function ProductCard({
  product,
  quantity,
  size,
  featured,
  url = `/shop/${product.slug}`,
}: {
  product: IProduct
  quantity?: number
  size?: string
  featured?: boolean
  url?: string
}) {
  return (
    <Link
      href={url}
      key={product._id}
      className={`flex flex-col items-center justify-center p-8 border border-l-0 border-t-0 border-white-13 h-full ${
        !featured ? 'hover:bg-[#111]' : ''
      }`}
    >
      <div className={'relative flex h-full w-full'}>
        <Image
          src={`https://ipfs.io/ipfs/${product.imageUri?.[0]}`}
          alt={`Product image of ${product.name}`}
          height={400}
          width={400}
          style={{
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </div>
      {!featured && (
        <div className={'flex flex-col mt-4 w-full'}>
          <div>{product.name}</div>
          <div className={'text-sm'}>{product.price} USD</div>
          <div className={'flex gap-1 text-xs opacity-80 font-bold'}>
            {size && <div>{size}</div>}
            {quantity && <div>({quantity})</div>}
          </div>
        </div>
      )}
    </Link>
  )
}
