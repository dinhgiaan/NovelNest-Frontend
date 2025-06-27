"use client"

import { useMemo } from "react"
import Image from "next/image"
import useSWR from "swr"
import { Rating } from "@mui/material"
import Link from "next/link"
import Loading from "@/app/utils/loading"
import ErrorAPI from "../error.api"
import Tilt from 'react-parallax-tilt'

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
            <div className="w-full px-3 sm:px-4 lg:px-6">
                  <div className="max-w-6xl mx-auto">
                        <div className="mb-8 sm:mb-12 lg:mb-16">
                              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-gray-800 px-4 text-center mb-3 sm:mb-4">
                                    Bestsellers
                              </h2>
                              <div className="mx-auto w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        </div>

                        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 xl:space-x-10">
                              {processedBooks.map((book, index) => (
                                    <BookCard key={book.slug} book={book} isHighlighted={index === 1} />
                              ))}
                        </div>
                  </div>
            </div>
      )
}

interface BookCardProps {
      book: Book
      isHighlighted: boolean
}

const BookCard = ({ book, isHighlighted }: BookCardProps) => {
      return (
            <Link href={`/books/detail/${book.slug}`} className="block">
                  <Tilt
                        className="parallax-effect"
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        perspective={1000}
                        scale={isHighlighted ? 1 : 1}
                        transitionSpeed={1500}
                        glareEnable={true}
                        glareMaxOpacity={0.12}
                        glareColor="#ffffff"
                        glarePosition="all"
                  >
                        <div
                              className={`
                            overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl
                            ${isHighlighted
                                          ? "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-indigo-900/40 dark:to-purple-900/40 w-44 sm:w-48 md:w-52 lg:w-56 z-10"
                                          : "bg-white dark:bg-gray-800/90 w-36 sm:w-40 md:w-44 lg:w-48 transform sm:translate-y-4"
                                    }
                          `}
                        >
                              <div className="relative overflow-hidden group">
                                    <div className="relative w-full pt-[140%]">
                                          <Image
                                                src={book.thumbnail?.url || "/placeholder.svg?height=300&width=200"}
                                                alt={book.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                priority
                                                sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-xs font-light">Đã bán: {book.sold}</p>
                                          </div>
                                    </div>
                              </div>

                              <div className="p-2 sm:p-3">
                                    <h3 className={`font-medium dark:text-white text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap ${isHighlighted ? "text-xs sm:text-sm" : "text-xs"}`}>
                                          {book.title}
                                    </h3>
                                    <p className="text-xs dark:text-gray-300 text-gray-600 mt-1 truncate">{book.author}</p>
                                    <div className="flex items-center mt-1 sm:mt-2 gap-1">
                                          <Rating
                                                value={book.rating}
                                                precision={0.5}
                                                size="small"
                                                readOnly={true}
                                                sx={{
                                                      fontSize: isHighlighted ? { xs: '0.7rem', sm: '0.8rem' } : { xs: '0.6rem', sm: '0.7rem' },
                                                      '& .MuiRating-icon': {
                                                            fontSize: 'inherit'
                                                      }
                                                }}
                                          />
                                          <span className="text-xs dark:text-gray-400 text-gray-500">{book.rating.toFixed(1)}</span>
                                    </div>

                                    {isHighlighted && (
                                          <div className="mt-1 sm:mt-2 bg-blue-500 dark:bg-indigo-600 text-white text-xs font-medium py-0.5 px-2 rounded-full w-fit mx-auto">
                                                #1 BESTSELLER
                                          </div>
                                    )}
                              </div>
                        </div>
                  </Tilt>
            </Link>
      )
}

export default BestSeller