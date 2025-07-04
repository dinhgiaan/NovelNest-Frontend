"use client"

import { useMemo } from "react"
import Image from "next/image"
import useSWR from "swr"
import { Rating } from "@mui/material"
import Link from "next/link"
import Loading from "@/app/utils/loading"
import ErrorAPI from "../error.api"
import { FaCrown, FaTrophy, FaMedal } from "react-icons/fa"

interface Book {
      slug: string
      title: string
      author: string
      sold: number
      rating: number
      thumbnail?: {
            url: string
      }
}

const BestSeller = () => {
      const fetcher = (url: string) => fetch(url).then((res) => res.json())

      const { data, error, isLoading } = useSWR<{ data: Book[] }>(process.env.NEXT_PUBLIC_BOOKS, fetcher, {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
      })

      const processedBooks = useMemo(() => {
            if (!data?.data || !Array.isArray(data.data)) return []
            const topBooks = [...data.data].sort((a, b) => b.sold - a.sold).slice(0, 3)
            if (topBooks.length < 3) return topBooks
            const maxSoldBook = topBooks[0]
            return [topBooks[1], maxSoldBook, topBooks[2]]
      }, [data])

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />
      if (processedBooks.length === 0) return <p>No books available.</p>

      return (
            <div className="w-full max-w-6xl mx-auto px-4 py-6">
                  {/* Header Section - Compact */}
                  <div className="mb-8 text-center">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                              Bestsellers
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-md">
                              Khám phá những cuốn sách bán chạy nhất được yêu thích bởi hàng ngàn độc giả
                        </p>
                        <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mt-3"></div>
                  </div>

                  {/* Books Grid - Compact */}
                  <div className="relative">
                        <div className="absolute inset-0 rounded-2xl -m-4 opacity-30"></div>

                        <div className="relative flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 py-4">
                              {processedBooks.map((book, index) => (
                                    <BookCard
                                          key={book.slug}
                                          book={book}
                                          position={index === 1 ? 'first' : index === 0 ? 'second' : 'third'}
                                          rank={index === 1 ? 1 : index === 0 ? 2 : 3}
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      )
}

interface BookCardProps {
      book: Book
      position: 'first' | 'second' | 'third'
      rank: number
}

const BookCard = ({ book, position, rank }: BookCardProps) => {
      const isFirst = position === 'first'

      const getRankIcon = () => {
            switch (rank) {
                  case 1: return <FaCrown className="text-red-500 pb-1" size={25} />
                  case 2: return <FaTrophy className="text-blue-800" size={18} />
                  case 3: return <FaMedal className="text-amber-100" size={12} />
                  default: return null
            }
      }

      const getRankColors = () => {
            switch (rank) {
                  case 1: return {
                        border: 'border-yellow-400/50',
                        shadow: 'shadow-yellow-400/20',
                        badge: 'from-yellow-400 to-orange-500',
                        glow: 'shadow-yellow-400/30'
                  }
                  case 2: return {
                        border: 'border-gray-400/50',
                        shadow: 'shadow-gray-400/20',
                        badge: 'from-gray-400 to-gray-600',
                        glow: 'shadow-gray-400/30'
                  }
                  case 3: return {
                        border: 'border-amber-600/50',
                        shadow: 'shadow-amber-600/20',
                        badge: 'from-amber-600 to-orange-700',
                        glow: 'shadow-amber-600/30'
                  }
                  default: return {
                        border: 'border-gray-200',
                        shadow: 'shadow-gray-200/20',
                        badge: 'from-gray-400 to-gray-600',
                        glow: 'shadow-gray-200/30'
                  }
            }
      }

      const colors = getRankColors()

      return (
            <Link href={`/books/detail/${book.slug}`} className="block group">
                  <div className="relative">
                        {/* Rank Badge - Smaller */}
                        <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-r ${colors.badge} text-white px-2 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold`}>
                              {getRankIcon()}
                              <span>#{rank}</span>
                        </div>

                        {/* Main Card - Much smaller */}
                        <div
                              className={`
                                    relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105
                                    ${isFirst
                                          ? `w-44 sm:w-48 bg-gradient-to-br from-white via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-yellow-900/20 dark:to-orange-900/20 border-2 ${colors.border} shadow-xl ${colors.shadow} hover:shadow-2xl hover:${colors.glow}`
                                          : `w-36 sm:w-40 bg-white/90 dark:bg-gray-800/90 border ${colors.border} shadow-lg ${colors.shadow} hover:shadow-xl`
                                    }
                              `}
                        >
                              {/* Image Container - Much smaller aspect ratio */}
                              <div className="relative overflow-hidden">
                                    <div className={`relative w-full ${isFirst ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
                                          <Image
                                                src={book.thumbnail?.url || "/placeholder.svg?height=200&width=150"}
                                                alt={book.title}
                                                fill
                                                className="object-cover transition-all duration-300 group-hover:scale-110"
                                                sizes={isFirst ? "(max-width: 640px) 176px, 192px" : "(max-width: 640px) 144px, 160px"}
                                          />

                                          {/* Overlay Effects */}
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                          {/* Hover Info - Simplified */}
                                          <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <div className="text-center">
                                                      <p className="text-xs font-medium">{book.sold} đã bán</p>
                                                      <p className="text-xs">{book.rating.toFixed(1)} ⭐</p>
                                                </div>
                                          </div>

                                          {/* Bestseller Ribbon - Smaller */}
                                          {isFirst && (
                                                <div className="absolute top-2 -right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold py-1 px-8 transform rotate-45 shadow-md">
                                                      HOT
                                                </div>
                                          )}
                                    </div>
                              </div>

                              {/* Content - Compact */}
                              <div className="p-3">
                                    <h3 className="font-bold dark:text-white text-gray-900 mb-1 line-clamp-2 leading-tight text-sm">
                                          {book.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 mb-2 truncate text-xs">
                                          {book.author}
                                    </p>

                                    {/* Rating - Smaller */}
                                    <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-1">
                                                <Rating
                                                      value={book.rating}
                                                      precision={0.5}
                                                      size="small"
                                                      readOnly={true}
                                                      sx={{
                                                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                            '& .MuiRating-icon': {
                                                                  fontSize: 'inherit'
                                                            }
                                                      }}
                                                />
                                                <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
                                                      ({book.rating.toFixed(1)})
                                                </span>
                                          </div>
                                    </div>

                                    {/* Stats - Compact */}
                                    <div className="flex items-center justify-between text-xs text-gray-300 dark:text-gray-400">
                                          <span>{book.sold} lượt bán</span>
                                          <span className={`px-1.5 py-0.5 rounded-full text-white font-medium bg-gradient-to-r ${colors.badge} text-xs`}>
                                                #{rank}
                                          </span>
                                    </div>

                                    {/* Call to Action - Only for first place and smaller */}
                                    {isFirst && (
                                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-1.5 px-3 rounded-md font-medium text-xs hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                                                      Chi tiết
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </Link>
      )
}

export default BestSeller