'use client'

import { BookOpen, Search } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'
import { userService } from '@/app/lib/api/user'
import Loading from '@/app/utils/loading'
import ErrorAPI from '../error.api'
import BookCard from '../book.card'

const PurchasedBooksPage = () => {
      const [searchTerm, setSearchTerm] = useState('')
      const { data, error, isLoading } = useSWR('/api/purchased-books', fetcher)

      const books: Book[] = data?.data || []
      const total = data?.total || 0

      const filteredBooks = books.filter((book) =>
            [book.title, book.author].some((field) =>
                  field.toLowerCase().includes(searchTerm.toLowerCase())
            )
      )

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />

      return (
            <div className="container mx-auto px-4 pb-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        <button className="relative overflow-hidden rounded-lg px-24 py-5">
                              <span className="absolute inset-px z-10 flex items-center justify-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 text-neutral-300 text-base font-medium">
                                    Đang sở hữu {total} cuốn
                              </span>
                              <span
                                    aria-hidden
                                    className="absolute inset-0 z-0 scale-x-[2] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
                              />
                        </button>

                        <div className="relative w-full md:w-80">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                    type="text"
                                    placeholder="Tìm kiếm sách..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              />
                        </div>
                  </div>

                  {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {filteredBooks.map((book) => (
                                    <BookCard
                                          key={book._id}
                                          book={book}
                                          variant="purchased"
                                          showPrice={false}
                                          showRating
                                          showPurchaseDate
                                          showActions
                                    />
                              ))}
                        </div>
                  ) : (
                        <EmptyState searchTerm={searchTerm} />
                  )}
            </div>
      )
}

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
      <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {searchTerm ? 'Không tìm thấy kết quả' : 'Bạn chưa mua sách nào'}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 max-w-xs">
                  {searchTerm
                        ? `Không có sách nào phù hợp với từ khoá "${searchTerm}"`
                        : 'Khám phá thư viện sách của chúng tôi để bắt đầu hành trình đọc nhé!'}
            </p>
      </div>
)

async function fetcher() {
      const response = await userService.purchasedBooks()
      if (!response?.success) {
            throw new Error('Failed to fetch purchased books')
      }
      return response.data
}

interface Book {
      _id: string
      title: string
      author: string
      thumbnail?: { url: string }
      rating: number
      purchaseDate: string
}

export default PurchasedBooksPage
