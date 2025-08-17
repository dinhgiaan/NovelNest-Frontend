"use client"

import BookCard from "@/app/components/ui/card/book.card"
import InfoDetail from "@/app/components/book/more.book.detail"
import ErrorAPI from "@/app/components/error.api"
import Loading from "@/app/utils/loading"
import Link from "next/link"
import { useCallback, useState } from "react"
import { ArrowLeft, Tags } from "lucide-react"
import PaymentMethod from "@/app/components/book/payment.method"
import Button from "@/app/components/ui/button"
import ReadMore from "@/app/components/ui/read.more"
import ButtonBack from "@/app/components/ui/button.back"
import { usePurchasedBooks } from "@/app/hooks/use.purchased.book"
import { useCartStore } from "@/app/lib/store/cart.store"
import toast from "react-hot-toast"

interface BookDetailProps {
      book: IBook | null
      error: Error | string | null
      isLoading: boolean
      userId?: string
}

const BookDetail = ({ book, error, isLoading }: BookDetailProps) => {
      const [clickBuy, setClickBuy] = useState(false)
      const isPurchasedCheck = usePurchasedBooks()
      const { addToCart } = useCartStore();

      const isBookPurchased = book ? isPurchasedCheck(book._id) : false

      const renderCategories = () => {
            if (!book?.categories || book.categories.length === 0) {
                  return <span className="text-gray-400 text-sm">Hiện chưa có danh mục nào</span>
            }

            return book.categories.map((item) => {
                  const id = typeof item === "object" ? item._id : item
                  const name = typeof item === "object" ? item.name : item
                  return (
                        <span
                              key={id}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                        >
                              <Tags className="h-3 w-3 mr-1" />
                              {name}
                        </span>
                  )
            })
      }

      const handleAddToCart = useCallback((book: IBook) => {
            const finalPrice = book.promotionPrice && book.promotionPrice > 0
                  ? book.promotionPrice
                  : book.price;

            addToCart({
                  bookId: book._id,
                  title: book.title,
                  author: book.author,
                  price: finalPrice,
                  promotionPrice: book.promotionPrice ?? 0,
                  thumbnail: { url: book.thumbnail!.url },
                  slug: book.slug ?? ""
            });

            toast.success(`Đã thêm "${book.title}" vào giỏ hàng`);
      }, [addToCart]);

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />
      if (!book) return <div className="p-4 text-center text-gray-400">Không tìm thấy sách</div>
      if (clickBuy) return <PaymentMethod book={book} />

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24] py-10">
                  <div className="h-14"></div>
                  <div className="max-w-4xl mx-auto px-4 lg:px-0">
                        <ButtonBack
                              className="inline-flex items-center space-x-2 mb-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transform duration-150 transition-all hover:scale-110"
                        >
                              <ArrowLeft size={20} />
                              <span className="text-sm font-medium">Quay lại</span>
                        </ButtonBack>

                        <div className="grid md:grid-cols-3 space-y-7 lg:space-y-0">
                              <div className="md:col-span-1 mx-auto lg:mx-0">
                                    <BookCard
                                          book={book}
                                          variant="detail"
                                          isPurchased={isBookPurchased}
                                          onPreview={() => { }}
                                          onAddToCart={handleAddToCart}
                                          onBuyNow={() => setClickBuy(true)}
                                          showPrice={false}
                                          showRating
                                          showActions
                                    />
                                    {isBookPurchased && book.epubFile?.url && (
                                          <Link href={`/books/read/${book.slug}`} passHref>
                                                <Button className="flex w-[245px] mt-2  justify-center justify-items-center bg-green-500 hover:bg-green-600 text-white">
                                                      Đọc sách
                                                </Button>
                                          </Link>
                                    )}
                              </div>

                              <div className="md:col-span-2">
                                    <div className="bg-[#f7f3f3] dark:bg-gray-800 rounded-lg shadow-md p-5 space-y-4">
                                          <div>
                                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
                                                <h3 className="text-sm italic text-gray-900 dark:text-gray-500">{book.author}</h3>
                                          </div>
                                          <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                          <div>
                                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Mô tả</h2>
                                                <ReadMore maxLines={9}>
                                                      <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">{book.description}</p>
                                                </ReadMore>
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
                        <InfoDetail />
                  </div>
            </div>
      )
}

export default BookDetail;
