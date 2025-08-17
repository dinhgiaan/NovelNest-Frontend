import { useRouter, useSearchParams } from "next/navigation";
import Filter from "../components/book/filter";
import SearchBar from "../components/book/search";
import { Pagination } from "@mui/material";
import { useCallback } from "react";
import { FilterParams } from "../lib/api/book";
import { useCartStore } from "../lib/store/cart.store";
import toast from "react-hot-toast";
import BookCard from "../components/ui/card/book.card";
import { usePurchasedBooks } from "../hooks/use.purchased.book";

interface IProps {
      data: IBook[];
      pagination: {
            currentPage: number,
            hasNext: boolean,
            hasPrev: boolean,
            totalPages: number,
            totalResults: number,
      };
      onRefresh?: () => void;
}

const BookPage = ({ data, pagination }: IProps) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const isPurchased = usePurchasedBooks();

      const { addToCart, toggleCart } = useCartStore();

      const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", value.toString());
            router.push(`/books?${params.toString()}`, { scroll: false });
      }, [searchParams, router]);

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

      const handleBuyNow = useCallback((book: IBook) => {
            handleAddToCart(book);
            toggleCart();
      }, [handleAddToCart, toggleCart]);

      const handleFilterChange = useCallback((filters: FilterParams) => {
            void filters;
      }, []);

      if (!data?.length) {
            return (
                  <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24]">
                        <div className="h-10"></div>

                        <div className="max-w-screen-xl mx-auto px-4 pt-16">
                              <SearchBar />
                        </div>
                        <div className="max-w-screen-xl mx-auto px-4 py-6">
                              <Filter onFilterChange={handleFilterChange} className="mb-6" />
                        </div>

                        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col items-center justify-center">
                              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                                    Không tìm thấy sách nào phù hợp với bộ lọc
                              </p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24]">
                  <div className="h-10"></div>

                  <div className="max-w-screen-xl mx-auto px-4 space-y-6 pt-16">
                        <div>
                              <SearchBar />
                        </div>

                        <div>
                              <Filter onFilterChange={handleFilterChange} className="mb-6" />
                        </div>
                  </div>

                  <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-8">
                        {/* Main Content */}
                        <div className="">
                              {/* Books Grid */}
                              <div className="flex-1">
                                    {/* Books Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                                          {data.map((book) => {
                                                return (
                                                      <BookCard
                                                            key={book.slug}
                                                            book={book}
                                                            variant="default"
                                                            isPurchased={isPurchased(book._id)}
                                                            onAddToCart={handleAddToCart}
                                                            onBuyNow={handleBuyNow}
                                                            showPrice={true}
                                                            showRating={true}
                                                            showActions={true}
                                                      />
                                                );
                                          })}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && pagination.totalPages > 1 && (
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
                                                      sx={{
                                                            '& .MuiPaginationItem-root': {
                                                                  color: 'inherit',
                                                                  borderColor: 'rgba(0, 0, 0, 0.23)',
                                                                  '&:hover': {
                                                                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                                  },
                                                                  '&.Mui-selected': {
                                                                        backgroundColor: '#1976d2',
                                                                        color: '#fff',
                                                                        '&:hover': {
                                                                              backgroundColor: '#1565c0',
                                                                        },
                                                                  },
                                                            },
                                                      }}
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
