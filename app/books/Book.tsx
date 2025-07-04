import { useRouter, useSearchParams } from "next/navigation";
import Filter from "../components/book/filter";
import SearchBar from "../components/book/search";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { userService } from "../lib/api/user";
import { IBook, IPaginationInfo } from "../types/book.types";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useCartStore } from "../lib/store/cart.store";
import toast from "react-hot-toast";
import BookCard from "../components/book.card";

interface IProps {
      data: IBook[];
      pagination: IPaginationInfo;
}

const BookPage = ({ data, pagination }: IProps) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>([]);
      const [showMobileFilter, setShowMobileFilter] = useState(false);

      const { addToCart, toggleCart } = useCartStore();

      useEffect(() => {
            loadPurchasedBooks();
      }, []);

      const loadPurchasedBooks = async () => {
            try {
                  const res = await userService.purchasedBooks();
                  const bookIds = res.data.data?.map((book: any) => book.bookId) || [];
                  setPurchasedBookIds(bookIds);
            } catch (error) {
                  // Ignore error, user might not be logged in
            }
      };

      const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", value.toString());
            router.push(`/books?${params.toString()}`);
      };

      const handleAddToCart = (book: IBook) => {
            // Calculate discounted price for cart
            const finalPrice = book.discountPercent > 0
                  ? book.price * (1 - book.discountPercent / 100)
                  : book.price;

            addToCart({
                  bookId: book._id,
                  title: book.title,
                  author: book.author,
                  price: finalPrice,
                  thumbnail: { url: book.thumbnail!.url },
                  slug: book.slug
            });
            toast.success(`Đã thêm "${book.title}" vào giỏ hàng`)
      };

      const handleBuyNow = (book: IBook) => {
            handleAddToCart(book);
            toggleCart();
      };

      if (!data?.length) {
            return (
                  <div className="min-h-[200px] flex items-center justify-center">
                        <p className="text-gray-300 dark:text-gray-400 text-sm">
                              Không có dữ liệu sách
                        </p>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gradient-to-b from-stone-100 to-green-50 dark:from-[#233b57] dark:to-[#1a2a3e] pt-16">
                  <div className="flex justify-center items-center pt-4 px-4">
                        <SearchBar />
                  </div>

                  <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-10">
                        <div className="lg:hidden mb-4">
                              <button
                                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                                    className="w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md text-left font-medium text-gray-900 dark:text-white"
                              >
                                    Bộ lọc {showMobileFilter ? <ChevronDown /> : <ChevronRight />}
                              </button>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                              <div className={`
                                    w-full lg:w-1/6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-auto self-start
                                    ${showMobileFilter ? 'block' : 'hidden lg:block'}
                                    lg:-ml-6
                              `}>
                                    <Filter />
                              </div>

                              <div className="flex-1">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                                          {data.map((book) => {
                                                const isPurchased = purchasedBookIds.includes(book._id);

                                                return (
                                                      <BookCard
                                                            key={book.slug}
                                                            book={book}
                                                            variant="default"
                                                            isPurchased={isPurchased}
                                                            onAddToCart={handleAddToCart}
                                                            onBuyNow={handleBuyNow}
                                                            showPrice={true}
                                                            showRating={true}
                                                            showActions={true}
                                                      />
                                                );
                                          })}
                                    </div>

                                    {pagination?.totalPages > 1 && (
                                          <div className="flex justify-center pt-6 sm:pt-8">
                                                <Pagination
                                                      count={pagination.totalPages}
                                                      page={pagination.currentPage}
                                                      onChange={handlePageChange}
                                                      color="primary"
                                                      size="medium"
                                                      showFirstButton
                                                      showLastButton
                                                      siblingCount={typeof window !== 'undefined' && window.innerWidth < 640 ? 0 : 1}
                                                />
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default BookPage;