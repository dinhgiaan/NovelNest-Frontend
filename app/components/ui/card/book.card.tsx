"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Heart } from "lucide-react"
import convertPriceToVND from "../../../utils/convert.price"
import Button from "../button"
import formatDate from "@/app/utils/format.date"

interface BookCardProps {
      book: IBook
      variant?: "default" | "purchased" | "detail" | "white_lists"
      isPurchased?: boolean
      onAddToCart?: (book: IBook) => void
      onBuyNow?: (book: IBook) => void
      onPreview?: (book: IBook) => void
      onRemoveFromWishlist?: (book: IBook) => void
      showActions?: boolean
      showRating?: boolean
      showSold?: boolean
      showPrice?: boolean
      showPurchaseDate?: boolean
      className?: string
}

const BookCard = ({
      book,
      variant = "default",
      isPurchased = false,
      onAddToCart,
      onBuyNow,
      onRemoveFromWishlist,
      showActions = true,
      showRating = true,
      showSold = true,
      showPrice = true,
      showPurchaseDate = false,
      className = "",
}: BookCardProps) => {
      const calculateDiscountPercent = (originalPrice: number, promotionPrice: number) => {
            return Math.round(((originalPrice - promotionPrice) / originalPrice) * 100)
      }

      const optimizeCloudinaryUrl = (url: string) => {
            if (!url.includes("res.cloudinary.com")) return url
            return url.replace("/upload/", "/upload/f_auto,q_auto/")
      }

      const hasPromotion = book.promotionPrice && book.promotionPrice > 0 && book.promotionPrice < book.price

      const finalPrice = hasPromotion ? book.promotionPrice : book.price

      const discountPercent = hasPromotion
            ? calculateDiscountPercent(book.price, book.promotionPrice!)
            : (book.discountPercent || 0)

      const renderDiscountBadge = () => {
            if (!discountPercent || discountPercent <= 0) return null
            return (
                  <div className="absolute top-2 left-2 z-10">
                        <div className="relative">
                              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                                    GIẢM {discountPercent}%
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full"></div>
                        </div>
                  </div>
            )
      }

      const renderTitle = () => {
            if (variant === "default" || variant === "white_lists" || variant === "purchased")
                  return (
                        <div className="truncate text-sm">
                              <span>{book.title}</span>
                        </div>
                  )
      }

      const renderHeartIcon = () => {
            if (variant !== "white_lists") return null
            return (
                  <div className="absolute top-2 right-2 z-10">
                        <button
                              onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onRemoveFromWishlist?.(book)
                              }}
                              className="group p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                              title="Xóa khỏi danh sách yêu thích"
                        >
                              <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:text-red-600 group-hover:fill-red-600 transition-colors duration-200" />
                        </button>
                  </div>
            )
      }

      const renderRatingAndSold = () => {
            if (!showRating && variant !== "detail") return null

            if (variant === "detail") {
                  return (
                        <div className="flex justify-around pt-4">
                              <div className="flex space-x-1 lg:space-x-2 items-center">
                                    <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                                <Star
                                                      key={i}
                                                      className={`${i < Math.floor(book.rating!)
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                                                            }`}
                                                      size={14}
                                                />
                                          ))}
                                    </div>
                                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 pt-0.5">{book?.rating?.toFixed(1)}</span>
                              </div>
                              <div>
                                    <span className="text-[#aaa] text-xs">{book.sold} lượt bán</span>
                              </div>
                        </div>
                  )
            }

            const ratingValue = Number(book.rating) || 0

            return (
                  <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {showRating && (
                              <div className="flex items-center">
                                    <Star className="fill-yellow-400 text-yellow-400" size={13} />
                                    <span className="ml-1">{ratingValue.toFixed(1)}</span>
                              </div>
                        )}

                        {showSold && (
                              <span className="text-[#aaa] text-xs">{book.sold} lượt bán</span>
                        )}
                  </div>
            )
      }


      const renderPrice = () => {
            if (!showPrice || !book.price) return null
            return (
                  <div className="mt-2">
                        {hasPromotion ? (
                              <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs line-through ">
                                          {convertPriceToVND(book.price) || "Không rõ"}
                                    </span>
                                    <span className="text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold">
                                          {convertPriceToVND(finalPrice) || "Không rõ"}
                                    </span>
                              </div>
                        ) : (
                              <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs cursor-default">
                                          ㅤ
                                    </span>
                                    <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
                                          {convertPriceToVND(book.price) || "Không rõ"}
                                    </span>
                              </div>
                        )}
                  </div>
            )
      }

      const renderPurchaseDate = () => {
            if (!showPurchaseDate || !book.purchaseDate) return null
            return (
                  <p className="text-xs text-[#aaa] mb-1">
                        Mua vào: {formatDate(book.purchaseDate) || "Không rõ"}
                  </p>
            )
      }

      const renderActions = () => {
            if (!showActions) return null
            switch (variant) {
                  case "purchased":
                        return (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100">
                                    <Link href={`/books/detail/${book.slug}`}>
                                          <Button variant="blue" size="sm">
                                                Xem chi tiết
                                          </Button>
                                    </Link>
                              </div>
                        )
                  case "detail":
                        if (isPurchased) {
                              return null
                        }
                        return (
                              <div className="flex gap-3 justify-center mt-4 px-2">
                                    <Button
                                          variant="blue"
                                          size="sm"
                                          onClick={() => onAddToCart?.(book)}
                                          className="flex items-center"
                                    >
                                          <ShoppingCart className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">Thêm</span>
                                          <span className="sm:hidden">Giỏ</span>
                                    </Button>
                                    <Button variant="green" size="sm" onClick={() => onBuyNow?.(book)}>
                                          Mua ngay
                                    </Button>
                              </div>
                        )
                  case "white_lists":
                        if (isPurchased) {
                              return (
                                    <div className="mt-auto">
                                          <Link href={`/books/read/${book.slug}`}>
                                                <Button variant="green" size="sm" className="w-full">
                                                      Đọc sách
                                                </Button>
                                          </Link>
                                    </div>
                              )
                        }
                        return (
                              <div className="flex gap-2 mt-auto w-full">
                                    <Button
                                          variant="blue"
                                          size="sm"
                                          onClick={() => onAddToCart?.(book)}
                                          className="flex-1 flex items-center justify-center whitespace-nowrap"
                                    >
                                          <span className="hidden sm:inline">Thêm</span>
                                          <span className="sm:hidden">Giỏ</span>
                                    </Button>
                                    <Button variant="purple" size="sm" onClick={() => onBuyNow?.(book)} className="flex-1 whitespace-nowrap">
                                          Mua
                                    </Button>
                              </div>
                        )
                  default:
                        if (isPurchased) {
                              return (
                                    <div className="mt-auto">
                                          <Link href={`/books/read/${book.slug}`}>
                                                <Button variant="green" size="sm" className="w-full">
                                                      Đọc sách
                                                </Button>
                                          </Link>
                                    </div>
                              )
                        }
                        return (
                              <div className="flex gap-2 mt-auto w-full">
                                    <Button
                                          variant="blue"
                                          size="sm"
                                          onClick={() => onAddToCart?.(book)}
                                          className="flex-1 flex items-center justify-center whitespace-nowrap"
                                    >
                                          <ShoppingCart className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">Thêm</span>
                                          <span className="sm:hidden">Giỏ</span>
                                    </Button>
                                    <Button variant="purple" size="sm" onClick={() => onBuyNow?.(book)} className="flex-1 whitespace-nowrap">
                                          Mua ngay
                                    </Button>
                              </div>
                        )
            }
      }

      const getImageContainerStyles = () => {
            switch (variant) {
                  case "purchased":
                        return "relative aspect-[2/3] w-full"
                  case "detail":
                        return "relative aspect-[2/3] w-full"
                  case "white_lists":
                        return "relative aspect-[2/3] w-full"
                  default:
                        return "relative aspect-[2/3] w-full"
            }
      }

      const getCardContainerStyles = () => {
            const shimmerBase =
                  "relative before:absolute before:inset-0 before:z-10 before:pointer-events-none before:opacity-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:opacity-100 hover:before:animate-[shimmer_1s_ease-in-out] hover:before:translate-x-[100%] dark:hover:before:via-white/10"
            switch (variant) {
                  case "purchased":
                        return `group relative bg-white dark:bg-gray-800 rounded-sm shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-700 ${shimmerBase}`
                  case "detail":
                        return `bg-[#f7f3f3] dark:bg-gray-800 rounded-md shadow-md overflow-hidden max-w-[245px] ${shimmerBase}`
                  case "white_lists":
                        return `group relative bg-white dark:bg-gray-800 rounded-sm overflow-hidden shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02] flex flex-col border border-red-100 dark:border-red-900/30 ${shimmerBase}`

                  default:
                        return `group relative bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg flex flex-col ${shimmerBase}`
            }
      }

      return (
            <div className={`${getCardContainerStyles()} ${className}`}>
                  {variant === "detail" ? (
                        <div className={`${getImageContainerStyles()} overflow-hidden`}>
                              <Image
                                    src={optimizeCloudinaryUrl(book?.thumbnail?.url || "/placeholder-book.jpg")}
                                    alt={book.title || "Đây là thumbnail của sách"}
                                    fill
                                    className="object-contain rounded-t-lg"
                                    priority
                                    quality={85}
                                    sizes="(max-width: 640px) 95vw, (max-width: 768px) 60vw, 280px"
                              />
                        </div>
                  ) : (
                        <Link href={`/books/detail/${book.slug}`} className="block">
                              <div className={`${getImageContainerStyles()} overflow-hidden bg-gray-100 dark:bg-gray-700`}>
                                    {variant !== "white_lists" && renderDiscountBadge()}
                                    {renderHeartIcon()}
                                    <Image
                                          src={optimizeCloudinaryUrl(book?.thumbnail?.url || "/placeholder-book.jpg")}
                                          alt={book.title || "Đây là thumbnail của sách"}
                                          fill
                                          className="object-contain"
                                          priority
                                          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 18vw, 15vw"
                                    />
                                    {variant === "purchased" && renderActions()}
                              </div>
                        </Link>
                  )}
                  <div className={`flex flex-col flex-1 ${variant === "detail" ? "pb-4" : "p-3"}`}>
                        {renderTitle()}
                        {renderPurchaseDate()}
                        {renderPrice()}
                        {renderRatingAndSold()}
                        {variant !== "purchased" && <div className="mt-auto pt-2">{renderActions()}</div>}
                  </div>
            </div>
      )
}

export default BookCard;
