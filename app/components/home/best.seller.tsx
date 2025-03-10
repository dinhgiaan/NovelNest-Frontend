"use client"

import { useMemo } from "react"
import Image from "next/image"
import useSWR from "swr"
import { Rating } from "@mui/material"
import Link from "next/link"
import Loading from "@/app/utils/loading"
import ErrorAPI from "../error.api"

// Định nghĩa interface cho dữ liệu sách
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

      // Tách logic xử lý dữ liệu ra khỏi phần render
      const processedBooks = useMemo(() => {
            if (!data?.data || !Array.isArray(data.data)) return []

            // Lấy 3 cuốn sách bán chạy nhất
            const topBooks = [...data.data].sort((a, b) => b.sold - a.sold).slice(0, 3)

            if (topBooks.length < 3) return topBooks

            // Sắp xếp lại với cuốn bán chạy nhất ở giữa
            const maxSoldBook = topBooks[0]
            return [topBooks[1], maxSoldBook, topBooks[2]]
      }, [data])

      // Xử lý các trạng thái
      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />
      if (processedBooks.length === 0) return <p>No books available.</p>

      return (
            <div className="w-full px-4 mb-24">
                  <div>
                        <h2 className="text-2xl dark:text-white text-black text-center mb-16">Những Cuốn Sách Bán Chạy Nhất</h2>

                        <div className="flex items-end justify-center space-x-8">
                              {processedBooks.map((book, index) => (
                                    <BookCard key={book.slug} book={book} isHighlighted={index === 1} />
                              ))}
                        </div>
                  </div>
            </div>
      )
}

// Tách thành component con để cải thiện khả năng tái sử dụng và đọc code
interface BookCardProps {
      book: Book
      isHighlighted: boolean
}

const BookCard = ({ book, isHighlighted }: BookCardProps) => {
      return (
            <Link href={`/books/detail/${book.slug}`} rel="preload">
                  <div
                        className={`
          shadow-md rounded-md p-4 flex flex-col items-center transition-all
          ${isHighlighted
                                    ? "bg-[#95e3ec] dark:bg-[#905fb0] w-48 h-80 md:w-60 md:h-96 transform hover:scale-125 scale-110 z-10"
                                    : "bg-white dark:bg-gray-800 w-40 h-80 md:w-48 md:h-96"
                              }
        `}
                  >
                        <div className="relative mb-5">
                              <Image
                                    src={book.thumbnail?.url || "/placeholder.svg?height=250&width=150"}
                                    alt={book.title}
                                    width={150}
                                    height={250}
                                    priority
                              />
                        </div>
                        <h3 className="text-sm font-semibold dark:text-white text-gray-900 text-center overflow-hidden text-ellipsis whitespace-nowrap w-full">
                              {book.title}
                        </h3>
                        <p className="text-xs dark:text-gray-400 text-gray-600 text-center truncate">Tác giả: {book.author}</p>
                        <p className="text-xs dark:text-gray-400 text-gray-600 truncate">Đã bán: {book.sold}</p>
                        <p className="text-xs dark:text-gray-400 text-gray-600">
                              <Rating value={book.rating} precision={0.1} size="small" readOnly={true} />
                        </p>
                  </div>
            </Link>
      )
}

export default BestSeller

