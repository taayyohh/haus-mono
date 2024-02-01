import { ShoppingCart } from '@phosphor-icons/react'
import { IStock } from '@/models/Product'
import { CartStockQuantitySelector } from '@/modules/shop/components/CartStockQuantitySelector'
import useCartStore, { CartItem } from '@/store/shop'
import { combinedProduct } from '@/modules/shop/components/ProductPage'

export const CartStockSelector = ({
  cart,
  product,
}: {
  cart: CartItem[]
  product: combinedProduct
}) => {
  const addProduct = useCartStore((state) => state.addProduct)

  const StockItem = ({ stock }: { stock: IStock }) => {
    const cartItem = cart.filter((product) => product.size === stock.size)?.[0]
    const stockInCart = !!cartItem

    return (
      <div key={stock._id} className={'grid grid-cols-2 justify-around gap-3'}>
        <div className={'flex items-center justify-center'}>
          <div>{stock.size}</div>
        </div>
        <div className={'flex items-center justify-center'}>
          {!stockInCart ? (
            <div
              className={
                'inline-flex self-start text-xs border border-white-13 py-1 px-3 rounded cursor-pointer bg-[#1b1b1b] hover:bg-[#111]'
              }
              onClick={() => addProduct(product, stock.size)}
            >
              <ShoppingCart />
            </div>
          ) : (
            <CartStockQuantitySelector cartItem={cartItem} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={'flex flex-col border border-white-13 p-4 gap-2 w-full rounded'}>
      {product?.haus?.stock?.map((stock: IStock, i) => (
        <StockItem key={stock._id} stock={stock} />
      ))}
    </div>
  )
}
