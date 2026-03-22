'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export interface LocalCartItem {
  productId: string;
  quantity: number;
  price: number;
  size: string | null;
  productName: string;
  productImage: string;
}

export interface Cart {
  items: LocalCartItem[];
  total: number;
}

const CART_STORAGE_KEY = 'lucidhaus_cart';

export function useCart() {
  const [localCart, setLocalCart] = useLocalStorage<LocalCartItem[]>(CART_STORAGE_KEY, []);

  const addToCart = useCallback((item: {
    productId: string;
    quantity: number;
    price: number;
    size: string | null;
    productName: string;
    productImage: string;
  }) => {
    setLocalCart(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, [setLocalCart]);

  const removeFromCart = useCallback((productId: string, size: string | null) => {
    setLocalCart(prev => prev.filter(
      i => !(i.productId === productId && i.size === size)
    ));
  }, [setLocalCart]);

  const updateQuantity = useCallback((productId: string, size: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setLocalCart(prev =>
      prev.map(i =>
        i.productId === productId && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  }, [setLocalCart, removeFromCart]);

  const clearCart = useCallback(() => {
    setLocalCart([]);
  }, [setLocalCart]);

  const cart = useMemo((): Cart => ({
    items: localCart,
    total: localCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }), [localCart]);

  const itemCount = useMemo(() => {
    return localCart.reduce((sum, item) => sum + item.quantity, 0);
  }, [localCart]);

  return { cart, itemCount, addToCart, removeFromCart, updateQuantity, clearCart };
}
