'use client'

import { IProduct } from '@/models/Product'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Stripe from 'stripe'
import useCartStore from '@/store/shop'
import { useResponsive } from '@/hooks/useResponsive'

const ProductPage = ({
  product,
}: {
  product: { haus: IProduct; stripe: Stripe.Product | undefined }
}) => {
  const { isMobile } = useResponsive()
  const addProduct = useCartStore((state) => state.addProduct)

  return (
    <div className={'flex flex-col text-white w-full mx-auto items-center'}>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 w-full'}
        style={isMobile ? { height: '100%' } : { height: 'calc(100vh - 96px)' }}
      >
        <div className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}>
          <Image
            src={getIpfsGateway(product.haus.imageUri[0] || '')}
            alt={`image for ${product.haus.name}`}
            width={700}
            height={700}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className={'flex flex-col px-4 sm:px-6'}>
          <div className={'text-2xl uppercase'}>
            <div>{product.haus.name}</div>
          </div>
          <button
            className={`mt-12 inline-flex self-start justify-center w-full px-6 py-2 border border-white-13 rounded text-white bg-[#1b1b1b] hover:bg-[#111]`}
            style={{ boxShadow: '1px 3px 3px 0px #141418' }}
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/*<div*/}
      {/*  className={'flex flex-col text-white w-full mx-auto items-center'}*/}
      {/*>*/}
      {/*  <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-12 text-center">*/}
      {/*    {product.haus.name}*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    className={*/}
      {/*      'flex flex-col mx-auto w-full gap-12 justify-center items-center'*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <div className={'flex flex-col'}>*/}
      {/*      <div*/}
      {/*        className={'flex rounded-3xl overflow-hidden h-[500px] w:full sm:w-[400px]'}*/}
      {/*      >*/}
      {/*        <Image*/}
      {/*          src={getIpfsGateway(product.haus.imageUri || '')}*/}
      {/*          alt={`image for ${product.haus.name}`}*/}
      {/*          width={400}*/}
      {/*          height={500}*/}
      {/*          style={{ objectFit: 'contain' }}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className={'flex flex-col'}>*/}
      {/*      /!*<div>{product.category}</div>*!/*/}
      {/*      <div>{product.haus.description}</div>*/}
      {/*      <div>{product.haus.price}</div>*/}
      {/*      <div>{product.haus.quantity}</div>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default ProductPage
