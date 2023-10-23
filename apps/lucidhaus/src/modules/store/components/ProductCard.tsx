import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import { IProduct } from '@/models/Product'

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      key={product._id}
      className={
        'flex flex-col items-center justify-center p-8 border border-l-0 border-t-0 border-white-13 h-full hover:bg-[#111]'
      }
    >
      <div className={'relative flex h-full w-full'}>
        <Image
          src={getIpfsGateway(product.imageUri)}
          alt={`Product image of ${product.name}`}
          height={400}
          width={400}
          style={{
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </div>
      <div className={'flex flex-col mt-4'}>
        <div>{product.name}</div>
        <div className={'text-sm'}>{product.price} USD</div>
      </div>
    </Link>
  )
}
