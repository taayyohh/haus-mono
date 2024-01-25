import { create } from 'zustand'
import { IProduct } from '@/models/Product'
import Stripe from 'stripe'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = {
  haus: IProduct
  stripe: Stripe.Product | undefined
  quantity: number
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
}

type CartState = {
  items: CartItem[]
  totalItems: number
  cartTotal: number
  addProduct: (product: { haus: IProduct; stripe: Stripe.Product | undefined }) => void
  removeProduct: (stripeId: string) => void
  incrementProductQuantity: (stripeId: string) => void
  decrementProductQuantity: (stripeId: string) => void
  clearCart: () => void
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      totalItems: 0,
      cartTotal: 0,

      addProduct: (product) => {
        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.haus.stripeId === product.haus.stripeId
          )
          let newItems
          if (existingProduct) {
            newItems = state.items.map((item) =>
              item.haus.stripeId === product.haus.stripeId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          } else {
            newItems = [...state.items, { ...product, quantity: 1 }]
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

      removeProduct: (stripeId) => {
        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.haus.stripeId === stripeId
          )
          let newItems
          if (existingProduct && existingProduct.quantity > 1) {
            newItems = state.items.map((item) =>
              item.haus.stripeId === stripeId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          } else {
            newItems = state.items.filter((item) => item.haus.stripeId !== stripeId)
          }

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems: state.totalItems - 1,
            cartTotal: newTotal,
          }
        })
      },

      incrementProductQuantity: (stripeId) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.haus.stripeId === stripeId
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

      decrementProductQuantity: (stripeId) => {
        set((state) => {
          const existingProduct = state.items.find(
            (item) => item.haus.stripeId === stripeId
          )
          if (!existingProduct || existingProduct.quantity <= 1) {
            return state // Do not reduce if quantity is 0 or 1
          }

          const newItems = state.items.map((item) =>
            item.haus.stripeId === stripeId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )

          const newTotal = newItems.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.haus.price * currentValue.quantity
          }, 0)

          return {
            items: newItems,
            totalItems: state.totalItems - 1,
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
