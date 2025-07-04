"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import convertPriceToVND from '../../utils/convert.price'
import { X, Plus, Minus, Trash2, Focus } from 'lucide-react'
import { Drawer, IconButton, Button } from '@mui/material'
import { useCartStore } from '@/app/lib/store/cart.store'

const Cart = () => {
      const [mounted, setMounted] = useState(false)
      const {
            items,
            isOpen,
            closeCart,
            updateQuantity,
            removeFromCart,
            getTotalAmount,
            getTotalItems,
            clearCart
      } = useCartStore()

      useEffect(() => {
            setMounted(true)
      }, [])

      const handleCheckout = () => {
            if (items.length === 0) return
            closeCart()
            console.log('Proceed to checkout with items:', items)
      }

      const handleQuantityChange = (bookId: string, newQuantity: number) => {
            updateQuantity(bookId, newQuantity)
      }

      // Don't render anything until mounted to avoid hydration mismatch
      if (!mounted) {
            return null
      }

      return (
            <Drawer
                  anchor="right"
                  open={isOpen}
                  onClose={closeCart}
                  sx={{
                        '& .MuiDrawer-paper': {
                              width: { xs: '100%', sm: 400 },
                              maxWidth: '100vw'
                        }
                  }}
            >
                  <div className="h-full flex flex-col bg-white dark:bg-gray-900">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center space-x-2">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                          Giỏ hàng ({getTotalItems()})
                                    </h2>
                              </div>
                              <IconButton onClick={closeCart} size="small">
                                    <X className="w-5 h-5" />
                              </IconButton>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                              {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                          <Focus size={100} className='dark:text-white text-black' />
                                          <p className="text-gray-300 dark:text-gray-400 mb-2">
                                                Giỏ hàng của bạn đang trống
                                          </p>
                                          <Link
                                                href="/books"
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                                onClick={closeCart}
                                          >
                                                Tiếp tục mua sắm
                                          </Link>
                                    </div>
                              ) : (
                                    <div className="space-y-4">
                                          {items.map((item) => (
                                                <div key={item.bookId} className="flex space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                      <Link
                                                            href={`/books/detail/${item.slug}`}
                                                            onClick={closeCart}
                                                            className="flex-shrink-0"
                                                      >
                                                            <div className="relative w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                                                  <Image
                                                                        src={item.thumbnail.url || '/placeholder-book.jpg'}
                                                                        alt={item.title}
                                                                        fill
                                                                        className="object-cover"
                                                                        sizes="64px"
                                                                  />
                                                            </div>
                                                      </Link>

                                                      <div className="flex-1 min-w-0">
                                                            <Link
                                                                  href={`/books/detail/${item.slug}`}
                                                                  onClick={closeCart}
                                                                  className="block"
                                                            >
                                                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600">
                                                                        {item.title}
                                                                  </h3>
                                                            </Link>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                  {item.author}
                                                            </p>
                                                            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                                                                  {convertPriceToVND(item.price)}
                                                            </p>

                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center justify-between mt-2">
                                                                  <div className="flex items-center space-x-2">
                                                                        <button
                                                                              onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                                                                              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                                                              disabled={item.quantity <= 1}
                                                                        >
                                                                              <Minus className="w-3 h-3" />
                                                                        </button>
                                                                        <span className="text-sm font-medium min-w-[20px] text-center">
                                                                              {item.quantity}
                                                                        </span>
                                                                        <button
                                                                              onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                                                                              className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                                                        >
                                                                              <Plus className="w-3 h-3" />
                                                                        </button>
                                                                  </div>

                                                                  <button
                                                                        onClick={() => removeFromCart(item.bookId)}
                                                                        className="text-red-500 hover:text-red-700 p-1"
                                                                  >
                                                                        <Trash2 className="w-4 h-4" />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}

                                          {/* Clear Cart Button */}
                                          {items.length > 0 && (
                                                <button
                                                      onClick={clearCart}
                                                      className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
                                                >
                                                      Xóa tất cả
                                                </button>
                                          )}
                                    </div>
                              )}
                        </div>

                        {/* Footer - Checkout */}
                        {items.length > 0 && (
                              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tổng cộng:
                                          </span>
                                          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                                {convertPriceToVND(getTotalAmount())}
                                          </span>
                                    </div>
                                    <Button
                                          variant="contained"
                                          fullWidth
                                          size="large"
                                          onClick={handleCheckout}
                                          sx={{
                                                backgroundColor: '#059669',
                                                '&:hover': { backgroundColor: '#047857' },
                                                py: 1.5,
                                                fontSize: '1rem',
                                                fontWeight: 600
                                          }}
                                    >
                                          Thanh toán ({getTotalItems()} sản phẩm)
                                    </Button>
                              </div>
                        )}
                  </div>
            </Drawer>
      )
}

export default Cart