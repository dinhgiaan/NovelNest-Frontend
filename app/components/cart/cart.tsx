"use client";
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import convertPriceToVND from '../../utils/convert.price'
import { X, Trash2 } from 'lucide-react'
import { Drawer, IconButton, Button } from '@mui/material'
import { CartItem, useCartStore } from '@/app/lib/store/cart.store'
import { AuthContext } from '@/app/context/auth.context'
import toast from 'react-hot-toast'

const Cart = () => {
      const [mounted, setMounted] = useState(false)
      const [isProcessingPayment, setIsProcessingPayment] = useState(false)
      const {
            items,
            isOpen,
            closeCart,
            removeFromCart,
            getTotalAmount,
            getTotalItems,
            clearCart
      } = useCartStore()
      const { userInfo } = useContext(AuthContext)

      useEffect(() => {
            setMounted(true)
      }, [])

      const getFinalPrice = (item: CartItem) => {
            if (item.promotionPrice && item.promotionPrice > 0 && item.promotionPrice < item.price) {
                  return item.promotionPrice;
            }
            return item.price;
      }

      const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT
      if (!paymentUrl) {
            toast.error('Lỗi cấu hình: Không tìm thấy URL thanh toán')
            return
      }

      const handleCheckout = async () => {
            if (items.length === 0) {
                  toast.error('Giỏ hàng trống')
                  return
            }

            if (!userInfo?.user?._id) {
                  toast.error('Vui lòng đăng nhập để thanh toán', {
                        duration: 4000,
                  })
                  return
            }

            setIsProcessingPayment(true)

            try {
                  const itemsForPayment = items.map(item => ({
                        ...item,
                        quantity: 1,
                        price: getFinalPrice(item)
                  }));

                  const response = await fetch(paymentUrl, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                              items: itemsForPayment,
                              userId: userInfo.user._id
                        })
                  })

                  if (!response.ok) {
                        const errorData = await response.json()
                        throw new Error(errorData.message || 'Server không phản hồi')
                  }

                  const result = await response.json()

                  if (result.success && result.checkoutUrl) {
                        closeCart()
                        window.location.href = result.checkoutUrl
                  } else {
                        throw new Error(result.message || 'Không nhận được link thanh toán')
                  }
            } catch (error) {
                  if (error instanceof Error) {
                        if (error.message.includes('đã mua')) {
                              toast.error(error.message, { duration: 5000 })
                        } else if (error.message.includes('không khớp')) {
                              toast.error('Giá sách đã thay đổi, vui lòng làm mới trang', {
                                    duration: 5000,
                                    style: {
                                          background: '#FEF2F2',
                                          border: '1px solid #FECACA',
                                          color: '#DC2626',
                                    }
                              })
                              setTimeout(() => {
                                    window.location.reload()
                              }, 3000)
                        } else if (error.message.includes('không tìm thấy')) {
                              toast.error('Một số sách không còn tồn tại')
                        } else {
                              toast.error(error.message || 'Có lỗi xảy ra khi tạo link thanh toán')
                        }
                  } else {
                        toast.error('Có lỗi xảy ra khi tạo link thanh toán')
                  }
            } finally {
                  setIsProcessingPayment(false)
            }
      }

      const handleRemoveItem = (item: CartItem) => {
            removeFromCart(item.bookId)
            toast.success(`Đã xóa "${item.title}" khỏi giỏ hàng`, {
                  duration: 3000
            })
      }

      const handleClearCart = () => {
            if (items.length === 0) return

            clearCart()
            toast.success('Đã xóa tất cả sách khỏi giỏ hàng', {
                  duration: 3000
            })
      }

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
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center space-x-2">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                          Giỏ hàng
                                    </h2>
                              </div>
                              <IconButton onClick={closeCart} size="small">
                                    <X className="w-5 h-5" />
                              </IconButton>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                              {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                                Giỏ hàng trống
                                          </h3>
                                          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                                                Hãy thêm một vài cuốn sách yêu thích
                                          </p>
                                          <Link
                                                href="/books"
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                onClick={closeCart}
                                          >
                                                Tiếp tục mua sắm
                                          </Link>
                                    </div>
                              ) : (
                                    <div className="space-y-4">
                                          {items.map((item) => {
                                                const finalPrice = getFinalPrice(item);
                                                const hasPromotion = item.promotionPrice && item.promotionPrice > 0 && item.promotionPrice < item.price;

                                                return (
                                                      <div key={item.bookId} className="flex space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                                            <Link
                                                                  href={`/books/detail/${item.slug}`}
                                                                  onClick={closeCart}
                                                                  className="flex-shrink-0"
                                                            >
                                                                  <div className="relative w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden shadow-sm">
                                                                        <Image
                                                                              src={item.thumbnail.url || '/placeholder-book.jpg'}
                                                                              alt={item.title}
                                                                              fill
                                                                              className="object-cover hover:scale-105 transition-transform"
                                                                              sizes="64px"
                                                                              onError={(e) => {
                                                                                    const target = e.target as HTMLImageElement;
                                                                                    target.src = '/placeholder-book.jpg';
                                                                              }}
                                                                        />
                                                                  </div>
                                                            </Link>

                                                            <div className="flex-1 min-w-0">
                                                                  <Link
                                                                        href={`/books/detail/${item.slug}`}
                                                                        onClick={closeCart}
                                                                        className="block"
                                                                  >
                                                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                                                                              {item.title}
                                                                        </h3>
                                                                  </Link>
                                                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                        {item.author}
                                                                  </p>
                                                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                        Sách điện tử • Số lượng: 1
                                                                  </p>
                                                                  <div className="flex items-center justify-between mt-2">
                                                                        <div className="flex flex-col">
                                                                              {hasPromotion ? (
                                                                                    <div className="flex flex-col gap-1">
                                                                                          <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                                                                                {convertPriceToVND(item.price)}
                                                                                          </p>
                                                                                          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                                                                                                {convertPriceToVND(finalPrice)}
                                                                                          </p>
                                                                                    </div>
                                                                              ) : (
                                                                                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                                                                          {convertPriceToVND(finalPrice)}
                                                                                    </p>
                                                                              )}
                                                                        </div>

                                                                        <button
                                                                              onClick={() => handleRemoveItem(item)}
                                                                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                                                              title="Xóa khỏi giỏ hàng"
                                                                              disabled={isProcessingPayment}
                                                                        >
                                                                              <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                );
                                          })}

                                          {items.length > 1 && (
                                                <button
                                                      onClick={handleClearCart}
                                                      disabled={isProcessingPayment}
                                                      className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                      Xóa tất cả
                                                </button>
                                          )}
                                    </div>
                              )}
                        </div>

                        {items.length > 0 && (
                              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex justify-between items-center">
                                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Tổng cộng:
                                          </span>
                                          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                                {convertPriceToVND(getTotalAmount())}
                                          </span>
                                    </div>

                                    {!userInfo?.user?._id && (
                                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                Cần đăng nhập để thanh toán
                                          </p>
                                    )}

                                    <Button
                                          variant="contained"
                                          fullWidth
                                          size="large"
                                          onClick={handleCheckout}
                                          disabled={isProcessingPayment || !userInfo?.user?._id}
                                          sx={{
                                                backgroundColor: userInfo?.user?._id ? '#059669' : '#6B7280',
                                                '&:hover': {
                                                      backgroundColor: userInfo?.user?._id ? '#047857' : '#4B5563'
                                                },
                                                '&:disabled': { backgroundColor: '#9CA3AF' },
                                                py: 1.5,
                                                fontSize: '1rem',
                                                fontWeight: 600
                                          }}
                                    >
                                          {isProcessingPayment
                                                ? (
                                                      <div className="flex items-center space-x-2">
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            <span>Đang xử lý...</span>
                                                      </div>
                                                )
                                                : !userInfo?.user?._id
                                                      ? `Đăng nhập để thanh toán`
                                                      : `Thanh toán ${getTotalItems()} cuốn sách`
                                          }
                                    </Button>

                                    {userInfo?.user?._id && (
                                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                Bạn sẽ được chuyển đến trang thanh toán PayOS
                                          </p>
                                    )}
                              </div>
                        )}
                  </div>
            </Drawer>
      )
}

export default Cart;
