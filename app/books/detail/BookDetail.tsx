'use client'

import BookCard from '@/app/components/book.card'
import InfoUser from '@/app/components/book/more.book.detail'
import PurchaseTimeline from '@/app/components/book/time.line'
import ErrorAPI from '@/app/components/error.api'
import Loading from '@/app/utils/loading'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AiOutlineBarcode } from 'react-icons/ai'
import { MdDateRange } from 'react-icons/md'
import { FaBookReader, FaTags } from 'react-icons/fa'

interface Book {
      _id: string
      title: string
      author: string
      isbn: string
      publicDate: string
      description: string
      rating: number
      thumbnail?: { url: string; alt?: string }
      categories: { _id: string; name: string }[] | string[]
      price?: number
}

interface BookDetailProps {
      book: Book | null
      error: Error | string | null
      isLoading: boolean
      userId: string
}

const BookDetail = ({ book, error, isLoading }: BookDetailProps) => {
      const [clickBuy, setClickBuy] = useState(false)

      const formatDate = (date: string) => {
            const d = new Date(date)
            return isNaN(d.getTime()) ? 'Ngày không hợp lệ' : d.toLocaleDateString('vi-VN').replace(/\//g, ' - ')
      }

      const renderBookInfo = () =>
            [
                  { icon: AiOutlineBarcode, label: 'ISBN', value: book?.isbn },
                  { icon: FaBookReader, label: 'Tác giả', value: book?.author },
                  { icon: MdDateRange, label: 'Ngày xuất bản', value: formatDate(book?.publicDate || '') },
            ].map(
                  ({ icon: Icon, label, value }) =>
                        value && (
                              <div key={label} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                    <Icon className="text-indigo-500 dark:text-indigo-400" size={16} />
                                    <span className="text-sm">
                                          {label}: <span className="font-medium ml-1">{value}</span>
                                    </span>
                              </div>
                        )
            )

      const renderCategories = () => {
            if (!book?.categories || book.categories.length === 0) {
                  return <span className="text-gray-400 text-sm">Hiện chưa có danh mục nào</span>
            }

            return book.categories.map((item) => {
                  const id = typeof item === 'object' ? item._id : item
                  const name = typeof item === 'object' ? item.name : item
                  return (
                        <span
                              key={id}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                        >
                              <FaTags className="h-3 w-3 mr-1" />
                              {name}
                        </span>
                  )
            })
      }

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />
      if (!book) return <div className="p-4 text-center text-gray-400">Không tìm thấy sách</div>
      if (clickBuy) return <PurchaseTimeline book={book} />

      return (
            <div className="min-h-screen bg-gradient-to-b from-stone-100 to-green-50 dark:from-[#233b57] dark:to-[#1a2a3e] md:p-6 lg:pt-24 pt-20">
                  <div className="max-w-4xl mx-auto">
                        <Link
                              href="/books"
                              className="inline-flex items-center space-x-2 mb-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors hover:scale-110"
                        >
                              <IoIosArrowRoundBack size={20} />
                              <span className="text-sm font-medium">Quay lại danh sách</span>
                        </Link>

                        <div className="grid md:grid-cols-3 gap-6">
                              <div className="md:col-span-1">
                                    <BookCard
                                          book={book}
                                          variant="detail"
                                          onPreview={() => { }}
                                          onBuyNow={() => setClickBuy(true)}
                                          showPrice={false}
                                          showRating
                                          showActions
                                    />
                              </div>

                              <div className="md:col-span-2">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 space-y-4">
                                          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
                                          <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                          <div className="grid gap-4">{renderBookInfo()}</div>
                                          <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                          <div>
                                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Mô tả</h2>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                      {book.description}
                                                </p>
                                          </div>
                                          <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                          <div>
                                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Thể loại</h2>
                                                <div className="flex flex-wrap gap-2 pb-2">{renderCategories()}</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="mt-8">
                        <InfoUser />
                  </div>
            </div>
      )
}

export default BookDetail
