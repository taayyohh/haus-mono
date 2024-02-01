import { create } from 'zustand'
import { IProduct } from '@/models/Product'
import Stripe from 'stripe'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type CartItem = {
  haus: IProduct
  stripe: Stripe.Product | undefined
  quantity: number
  size?: ProductSize
}

type CartState = {
  items: CartItem[]
  totalItems: number
  cartTotal: number
  internationalShipping: number
  addProduct: (
    product: {
      haus: IProduct
      stripe: Stripe.Product | undefined
    },
    size?: ProductSize
  ) => void
  removeProduct: (stripeId: string, size?: ProductSize) => void
  incrementProductQuantity: (stripeId: string, size?: ProductSize) => void
  decrementProductQuantity: (stripeId: string, size?: ProductSize) => void
  clearCart: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      totalItems: 0,
      cartTotal: 0,
      internationalShipping: 0,

      addProduct: (product, size = undefined) => {
        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.haus.stripeId === product.haus.stripeId && item.size === size
          )
          let newItems
          if (existingProduct) {
            newItems = state.items.map((item) =>
              item.haus.stripeId === product.haus.stripeId && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          } else {
            newItems = [...state.items, { ...product, quantity: 1, size }]
          }

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems: state.totalItems + 1,
            cartTotal: newTotal,
          }
        })
      },

      removeProduct: (stripeId, size = undefined) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) =>
              !(
                item.haus.stripeId === stripeId &&
                (size === undefined || item.size === size)
              )
          )

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems: state.totalItems - (state.items.length - newItems.length),
            cartTotal: newTotal,
          }
        })
      },

      incrementProductQuantity: (stripeId, size = undefined) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.haus.stripeId === stripeId && (size === undefined || item.size === size)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems: state.totalItems + 1,
            cartTotal: newTotal,
          }
        })
      },

      decrementProductQuantity: (stripeId, size = undefined) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.haus.stripeId === stripeId &&
            (size === undefined || item.size === size) &&
            item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems:
              state.totalItems -
              newItems.filter(
                (item) =>
                  item.haus.stripeId === stripeId &&
                  (size === undefined || item.size === size) &&
                  item.quantity <= 1
              ).length,
            cartTotal: newTotal,
          }
        })
      },

      clearCart: () => {
        set(() => ({
          items: [],
          totalItems: 0,
          cartTotal: 0,
        }))
      },
    }),
    {
      name: 'lucidhaus-cart-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useCartStore
