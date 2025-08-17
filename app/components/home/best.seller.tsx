"use client"

import { useMemo, memo, useCallback, Suspense } from "react"
import Image from "next/image"
import { Rating } from "@mui/material"
import Link from "next/link"
import ErrorAPI from "../error.api"
import { useBooksSold } from "@/app/hooks/use.sold"


const BestSellerSkeleton = memo(() => (
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
            <div className="mb-8 text-center">
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl w-48 mx-auto mb-4 animate-pulse" />
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-96 mx-auto animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6">
                  {[...Array(3)].map((_, i) => (
                        <div key={i} className={`${i === 1 ? 'w-44 sm:w-48' : 'w-36 sm:w-40'} 
                                    bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 
                                    rounded-xl animate-pulse`}
                              style={{ height: i === 1 ? '320px' : '280px', animationDelay: `${i * 100}ms` }} />
                  ))}
            </div>
      </div>
))

BestSellerSkeleton.displayName = 'BestSellerSkeleton'

const BestSeller = () => {
      const { data, error, isLoading } = useBooksSold({
            limit: 50,
      })

      const processedBooks = useMemo(() => {
            if (!data?.data || !Array.isArray(data.data)) return []

            const topBooks = [...data.data]
                  .sort((a, b) => {
                        const aSold = a.sold ?? 0
                        const bSold = b.sold ?? 0
                        return bSold - aSold
                  })
                  .slice(0, 3)

            if (topBooks.length < 3) return topBooks

            return [topBooks[1], topBooks[0], topBooks[2]]
      }, [data])

      if (error) return <ErrorAPI />
      if (isLoading) return <BestSellerSkeleton />
      if (processedBooks.length === 0) {
            return (
                  <div className="w-full max-w-6xl mx-auto px-4 py-6 text-center">
                        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-12">
                              <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                                    Chưa có sách bestseller
                              </p>
                              <p className="text-gray-500 dark:text-gray-500 mt-2">
                                    Bestsellers sẽ được cập nhật sớm
                              </p>
                        </div>
                  </div>
            )
      }

      return (
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                  <div className="mb-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 
            dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
                              Bestsellers
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-md">
                              Khám phá những cuốn sách bán chạy nhất được yêu thích bởi hàng ngàn độc giả
                        </p>
                        <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mt-3"></div>
                  </div>

                  <div className="relative">
                        <div className="relative flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 py-4">
                              {processedBooks.map((book, index) => (
                                    <Suspense key={book.slug} fallback={<div className="w-36 h-64 bg-gray-200 animate-pulse rounded-xl" />}>
                                          <BookCard
                                                book={book}
                                                position={index === 1 ? 'first' : index === 0 ? 'second' : 'third'}
                                                rank={index === 1 ? 1 : index === 0 ? 2 : 3}
                                          />
                                    </Suspense>
                              ))}
                        </div>
                  </div>
            </div>
      )
}

interface BookCardProps {
      book: IBook
      position: 'first' | 'second' | 'third'
      rank: number
}

const BookCard = memo(({ book, position, rank }: BookCardProps) => {
      const isFirst = position === 'first'

      const rankConfig = useMemo(() => {
            const configs = {
                  1: {
                        border: 'border-yellow-400/50',
                        badge: 'from-yellow-400 to-orange-500',
                        shadow: 'shadow-yellow-100/50 dark:shadow-yellow-900/50'
                  },
                  2: {
                        border: 'border-gray-400/50',
                        badge: 'from-gray-400 to-gray-600',
                        shadow: 'shadow-gray-100/50 dark:shadow-gray-900/50'
                  },
                  3: {
                        border: 'border-amber-600/50',
                        badge: 'from-amber-600 to-orange-700',
                        shadow: 'shadow-amber-100/50 dark:shadow-amber-900/50'
                  }
            }
            return configs[rank as keyof typeof configs] || configs[3]
      }, [rank])

      const handleCardClick = useCallback((e: React.MouseEvent) => {
            console.log(e)
      }, [book.slug, book.title, rank])

      return (
            <Link
                  href={`/books/detail/${book.slug}`}
                  className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
                  onClick={handleCardClick}
                  prefetch={isFirst}
            >
                  <div className="relative">
                        <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 z-20 
                                    bg-gradient-to-r ${rankConfig.badge} text-white px-4 py-1 rounded-full 
                                    shadow-lg flex items-center gap-1 text-xs font-bold
                                    hover:scale-110 transition-transform duration-200`}>
                              <span>#{rank}</span>
                        </div>

                        <div className={`
                              relative overflow-hidden rounded-xl transition-all duration-300 will-change-transform
                              ${isFirst
                                    ? `w-44 sm:w-48 bg-gradient-to-br from-white via-yellow-50 to-orange-50 
                                       dark:from-gray-800 dark:via-yellow-900/20 dark:to-orange-900/20 
                                       border-2 ${rankConfig.border} shadow-xl ${rankConfig.shadow}
                                       hover:shadow-2xl hover:scale-105 hover:-translate-y-2`
                                    : `w-36 sm:w-40 bg-white/90 dark:bg-gray-800/90 border ${rankConfig.border} 
                                       shadow-lg ${rankConfig.shadow} hover:shadow-xl hover:scale-105 hover:-translate-y-1`
                              }
                        `}>
                              <div className="relative overflow-hidden">
                                    <div className="relative w-full aspect-[3/4]">
                                          <Image
                                                src={book.thumbnail?.url || "/placeholder.svg?height=200&width=150"}
                                                alt={`${book.title} - Bestseller #${rank}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes={isFirst ? "(max-width: 640px) 176px, 192px" : "(max-width: 640px) 144px, 160px"}
                                                priority={isFirst}
                                                quality={isFirst ? 95 : 85}
                                                placeholder="blur"
                                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                          />

                                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                          <div className="absolute bottom-0 left-0 right-0 p-2 text-white 
                                                transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <div className="text-center">
                                                      <p className="text-xs font-medium">{(book.sold ?? 0).toLocaleString()} đã bán</p>
                                                      <p className="text-xs">{book.rating?.toFixed(1) ?? 'N/A'} ⭐</p>
                                                </div>
                                          </div>

                                          {isFirst && (
                                                <div className="absolute top-2 -right-8 bg-gradient-to-r from-red-500 to-pink-500 
                                                      text-white text-xs font-bold py-1 px-8 transform rotate-45 shadow-md z-10">
                                                      HOT
                                                </div>
                                          )}
                                    </div>
                              </div>

                              <div className="p-3">
                                    <h3 className="font-bold dark:text-white text-gray-900 mb-1 line-clamp-2 
                                          leading-tight text-sm min-h-[2.5rem] flex items-start">
                                          {book.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 mb-2 truncate text-xs">
                                          {book.author}
                                    </p>

                                    <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-1">
                                                <Rating
                                                      value={book.rating ?? 0}
                                                      precision={0.5}
                                                      size="small"
                                                      readOnly
                                                      sx={{
                                                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                            '& .MuiRating-icon': {
                                                                  fontSize: 'inherit'
                                                            }
                                                      }}
                                                />
                                                <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
                                                      ({book.rating?.toFixed(1) ?? 'N/A'})
                                                </span>
                                          </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                          <span>{(book.sold ?? 0).toLocaleString()} lượt bán</span>
                                          <span className={`px-1.5 py-0.5 rounded-full text-white font-medium 
                                                bg-gradient-to-r ${rankConfig.badge} text-xs shadow-sm`}>
                                                #{rank}
                                          </span>
                                    </div>

                                    {isFirst && (
                                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white 
                                                      text-center py-1.5 px-3 rounded-md font-medium text-xs 
                                                      hover:from-orange-600 hover:to-red-600 transition-colors duration-200 
                                                      shadow-md hover:shadow-lg transform hover:scale-105">
                                                      Chi tiết
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </Link>
      )
})

BookCard.displayName = 'BookCard'

export default memo(BestSeller);
