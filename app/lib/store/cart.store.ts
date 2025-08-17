"use client";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
      bookId: string
      title: string
      author: string
      price: number
      promotionPrice: number
      thumbnail: {
            url: string
      }
      slug: string
}

interface CartStore {
      items: CartItem[]
      isOpen: boolean

      addToCart: (book: CartItem) => void
      removeFromCart: (bookId: string) => void
      clearCart: () => void
      toggleCart: () => void
      closeCart: () => void

      getTotalItems: () => number
      getTotalAmount: () => number
      getCartItem: (bookId: string) => CartItem | undefined
      isInCart: (bookId: string) => boolean
}

const getFinalPrice = (item: CartItem): number => {
      if (item.promotionPrice && item.promotionPrice > 0 && item.promotionPrice < item.price) {
            return item.promotionPrice;
      }
      return item.price;
}

export const useCartStore = create<CartStore>()(
      persist(
            (set, get) => ({
                  items: [],
                  isOpen: false,

                  addToCart: (book) => {
                        set((state) => {
                              const existingItem = state.items.find(item => item.bookId === book.bookId)

                              if (existingItem) {
                                    return state
                              } else {
                                    return {
                                          ...state,
                                          items: [...state.items, book]
                                    }
                              }
                        })
                  },

                  removeFromCart: (bookId) => {
                        set((state) => ({
                              ...state,
                              items: state.items.filter(item => item.bookId !== bookId)
                        }))
                  },

                  clearCart: () => {
                        set((state) => ({
                              ...state,
                              items: []
                        }))
                  },

                  toggleCart: () => {
                        set((state) => ({
                              ...state,
                              isOpen: !state.isOpen
                        }))
                  },

                  closeCart: () => {
                        set((state) => ({
                              ...state,
                              isOpen: false
                        }))
                  },

                  getTotalItems: () => {
                        const state = get()
                        return state.items.length
                  },

                  getTotalAmount: () => {
                        const state = get()
                        return state.items.reduce((total, item) => {
                              const finalPrice = getFinalPrice(item)
                              return total + finalPrice
                        }, 0)
                  },


                  getCartItem: (bookId) => {
                        const state = get()
                        return state.items.find(item => item.bookId === bookId)
                  },

                  isInCart: (bookId) => {
                        const state = get()
                        return state.items.some(item => item.bookId === bookId)
                  }
            }),
            {
                  name: 'cart-storage',
                  partialize: (state) => ({
                        items: state.items,
                        isOpen: state.isOpen
                  })
            }
      )
)
