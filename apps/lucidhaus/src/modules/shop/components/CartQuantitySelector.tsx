import useCartStore, { CartItem } from '@/store/shop'
import { useCallback } from 'react'

export const CartQuantitySelector = ({ cartItem }: { cartItem: CartItem }) => {
  const remove = useCartStore((state) => state.removeProduct)
  const increment = useCartStore((state) => state.incrementProductQuantity)
  const decrement = useCartStore((state) => state.decrementProductQuantity)
  const lastItemInCart = cartItem.quantity <= 1
  const hasSupply = cartItem.quantity < (cartItem.haus.quantity || 0)

  const handleDecrement = useCallback(() => {
    if (!lastItemInCart) {
      decrement(cartItem.haus.stripeId!)
    } else {
      handleRemove()
    }
  }, [cartItem.quantity])

  const handleIncrement = useCallback(() => {
    if (hasSupply) increment(cartItem.haus.stripeId!)
  }, [cartItem.quantity])

  const handleRemove = useCallback(() => {
    remove(cartItem.haus.stripeId!)
  }, [cartItem.quantity])

  return (
    <div className={'grid grid-cols-3 gap-2'}>
      <button onClick={handleDecrement}>-</button>
      <button>{cartItem.quantity}</button>
      <button onClick={handleIncrement} className={!hasSupply ? 'opacity-30' : ''}>
        +
      </button>
    </div>
  )
}
