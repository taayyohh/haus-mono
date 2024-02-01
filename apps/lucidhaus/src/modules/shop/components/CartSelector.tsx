import { CartQuantitySelector } from '@/modules/shop/components/CartQuantitySelector'
import useCartStore, { CartItem } from '@/store/shop'
import { combinedProduct } from '@/modules/shop/components/ProductPage'

export const CartSelector = ({
  cart,
  product,
}: {
  cart: CartItem[]
  product: combinedProduct
}) => {
  const addProduct = useCartStore((state) => state.addProduct)
  console.log('HI')

  return (
    <>
      {(cart.length === 0 && (
        <button
          className={`w-full px-6 py-2 border border-white-13 rounded text-white bg-[#1b1b1b] hover:bg-[#111]`}
          style={{ boxShadow: '1px 3px 3px 0px #141418' }}
          onClick={() => addProduct(product)}
        >
          Add to Cart
        </button>
      )) || (
        <div className="px-6 py-2 rounded text-white bg-[#1b1b1b]">
          <CartQuantitySelector cartItem={cart[0]} />
        </div>
      )}
    </>
  )
}
