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

      addToCart: (book: Omit<CartItem, 'quantity'>) => void
      removeFromCart: (bookId: string) => void
      updateQuantity: (bookId: string, quantity: number) => void
      clearCart: () => void
      toggleCart: () => void
      closeCart: () => void

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
                        set((state) => {
                              const existingItem = state.items.find(item => item.bookId === book.bookId)

                              if (existingItem) {
                                    return {
                                          ...state,
                                          items: state.items.map(item =>
                                                item.bookId === book.bookId
                                                      ? { ...item, quantity: item.quantity + 1 }
                                                      : item
                                          )
                                    }
                              } else {
                                    return {
                                          ...state,
                                          items: [...state.items, { ...book, quantity: 1 }]
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

                  updateQuantity: (bookId, quantity) => {
                        set((state) => {
                              if (quantity <= 0) {
                                    return {
                                          ...state,
                                          items: state.items.filter(item => item.bookId !== bookId)
                                    }
                              }

                              return {
                                    ...state,
                                    items: state.items.map(item =>
                                          item.bookId === bookId
                                                ? { ...item, quantity }
                                                : item
                                    )
                              }
                        })
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
                        return state.items.reduce((total, item) => total + item.quantity, 0)
                  },

                  getTotalAmount: () => {
                        const state = get()
                        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
                  },

                  getCartItem: (bookId) => {
                        const state = get()
                        return state.items.find(item => item.bookId === bookId)
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
