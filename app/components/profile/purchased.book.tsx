'use client'

import { useEffect, useState } from 'react'
import BookCard from '../ui/card/book.card'
import { bookService } from '@/app/lib/api/book'
import toast from 'react-hot-toast'

const PurchasedBooksPage = () => {
      const [data, setDataBook] = useState<IBook[]>();
      useEffect(() => {
            const getBooksPurchased = async () => {
                  const res = await bookService.getPurchasedBooks();

                  if (res.success) {
                        setDataBook(res.data);
                  } else {
                        toast.error("Có lỗi khi lấy danh sách!");
                  }
            }
            getBooksPurchased();
      }, [])

      console.log('--> check data purchased: ', data)

      const books: IBook[] = data || [];

      const total = data?.length;

      return (
            <div className="container mx-auto px-4 pb-10">
                  <div className="items-start md:items-center justify-between gap-4 mb-8">
                        <button className="relative overflow-hidden rounded-lg px-20 py-4">
                              <span className="absolute inset-px z-10 flex items-center justify-center rounded-lg dark:bg-black bg-[#ebe9e9] bg-gradient-to-t dark:from-neutral-800 from-neutral-100 dark:text-neutral-300 text-neutral-800 text-sm font-medium cursor-default">
                                    Đang sở hữu {total} sách
                              </span>
                              <span
                                    aria-hidden
                                    className="absolute inset-0 z-0 scale-x-[2] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
                              />
                        </button>
                  </div>

                  {books?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                              {books.map((book) => (
                                    <BookCard
                                          key={book._id}
                                          book={book}
                                          variant="purchased"
                                          showPrice={false}
                                          showPurchaseDate
                                          showRating
                                          showActions
                                    />
                              ))}
                        </div>
                  )}
            </div>
      )
}

export default PurchasedBooksPage;
