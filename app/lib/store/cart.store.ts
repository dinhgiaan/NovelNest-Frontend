"use client";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
      bookId: string
      title: string
      author: string
      price: number
      quantity: number
      thumbnail: {
            url: string
      }
      slug: string
}

interface CartStore {
      items: CartItem[]
      isOpen: boolean

      // Actions
      addToCart: (book: Omit<CartItem, 'quantity'>) => void
      removeFromCart: (bookId: string) => void
      updateQuantity: (bookId: string, quantity: number) => void
      clearCart: () => void
      toggleCart: () => void
      closeCart: () => void

      // Computed
      getTotalItems: () => number
      getTotalAmount: () => number
      getCartItem: (bookId: string) => CartItem | undefined
}

export const useCartStore = create<CartStore>()(
      persist(
            (set, get) => ({
                  items: [],
                  isOpen: false,

                  addToCart: (book) => {
                        const { items } = get()
                        const existingItem = items.find(item => item.bookId === book.bookId)

                        if (existingItem) {
                              set({
                                    items: items.map(item =>
                                          item.bookId === book.bookId
                                                ? { ...item, quantity: item.quantity + 1 }
                                                : item
                                    )
                              })
                        } else {
                              set({
                                    items: [...items, { ...book, quantity: 1 }]
                              })
                        }
                  },

                  removeFromCart: (bookId) => {
                        set({
                              items: get().items.filter(item => item.bookId !== bookId)
                        })
                  },

                  updateQuantity: (bookId, quantity) => {
                        if (quantity <= 0) {
                              get().removeFromCart(bookId)
                              return
                        }

                        set({
                              items: get().items.map(item =>
                                    item.bookId === bookId
                                          ? { ...item, quantity }
                                          : item
                              )
                        })
                  },

                  clearCart: () => {
                        set({ items: [] })
                  },

                  toggleCart: () => {
                        set({ isOpen: !get().isOpen })
                  },

                  closeCart: () => {
                        set({ isOpen: false })
                  },

                  getTotalItems: () => {
                        return get().items.reduce((total, item) => total + item.quantity, 0)
                  },

                  getTotalAmount: () => {
                        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
                  },

                  getCartItem: (bookId) => {
                        return get().items.find(item => item.bookId === bookId)
                  }
            }),
            {
                  name: 'cart-storage',
            }
      )
)