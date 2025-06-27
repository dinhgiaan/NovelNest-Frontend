import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import convertPriceToVND from "../utils/convert.price";
import Filter from "../components/book/filter";
import SearchBar from "../components/book/search";
import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { getUserById } from "../lib/api";

interface Book {
      _id: string;
      slug: string;
      title: string;
      isbn?: number;
      author: string;
      price: number;
      status: string;
      thumbnail: {
            public_id?: string;
            url: string;
      };
}

interface PaginationInfo {
      currentPage: number;
      totalPages: number;
      totalResults: number;
      resultsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
}

interface IProps {
      data: Book[];
      pagination: PaginationInfo;
}

const BookPage = ({ data, pagination }: IProps) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const [hasPurchasedBook, setHasPurchasedBook] = useState(false);
      const [showMobileFilter, setShowMobileFilter] = useState(false);

      const { userInfo } = useContext(AuthContext);

      useEffect(() => {
            getUserPurchasedBook()
      }, [])

      const getUserPurchasedBook = async () => {
            const userId = userInfo?.user?._id;
            if (!userId) {
                  console.error("User ID is undefined");
                  return;
            }

            try {
                  const res = await getUserById(userId);
                  console.log('--> check res: ', res);

                  if (res.data?.purchasedBooks) {
                        setHasPurchasedBook(true);
                  }
            } catch (error) {
                  console.error("Error fetching user purchases:", error);
            }
      }

      const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", value.toString());
            router.push(`/books?${params.toString()}`);
      };

      if (!Array.isArray(data) || data.length === 0) {
            return (
                  <div className="min-h-[200px] flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Không có dữ liệu sách
                        </p>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  {/* Search Bar - Responsive */}
                  <div className="flex justify-center items-center pt-4 px-4">
                        <SearchBar />
                  </div>

                  <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-10">
                        {/* Mobile Filter Toggle Button */}
                        <div className="lg:hidden mb-4">
                              <button
                                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                                    className="w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md text-left font-medium text-gray-900 dark:text-white"
                              >
                                    Bộ lọc {showMobileFilter ? '▼' : '▶'}
                              </button>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                              {/* Filter Sidebar - Desktop & Mobile */}
                              <div className={`
                                    w-full lg:w-1/6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-auto self-start
                                    ${showMobileFilter ? 'block' : 'hidden lg:block'}
                              `}>
                                    <Filter />
                              </div>

                              {/* Books Grid */}
                              <div className="flex-1">
                                    {/* Books Grid - Responsive columns */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                                          {data.map((book) => {

                                                return (
                                                      <div key={book.slug}>
                                                            <div
                                                                  className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg
                                                                        `}
                                                            >
                                                                  <Link
                                                                        rel="preload"
                                                                        href={`/books/detail/${book.slug}`}
                                                                        className={""}
                                                                        onClick={(e) => e.preventDefault()}
                                                                  >
                                                                        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                                              <Image
                                                                                    src={book?.thumbnail?.url}
                                                                                    alt={book.title}
                                                                                    fill
                                                                                    className={`object-cover`}
                                                                                    loading="lazy"
                                                                                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 18vw, 15vw"
                                                                              />
                                                                        </div>
                                                                  </Link>

                                                                  <div className="p-2 sm:p-3">
                                                                        <h3 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                                                                              {book.title}
                                                                        </h3>
                                                                        <p className="text-gray-600 dark:text-gray-300 line-clamp-1 text-[10px] sm:text-xs italic mt-1">
                                                                              {book.author}
                                                                        </p>
                                                                        <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mt-1 block">
                                                                              {convertPriceToVND(book.price)}
                                                                        </span>

                                                                        {/* Action Buttons - Responsive */}
                                                                        <div className="flex flex-col sm:flex-row justify-between mt-2 items-stretch sm:items-center gap-2">
                                                                              <button
                                                                                    className={`flex items-center justify-center flex-1 space-x-1 rounded-lg px-2 py-5 sm:py-1 text-xs transition-colors bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                                                                                          }`}
                                                                              >
                                                                                    {hasPurchasedBook ? (
                                                                                          <span className="text-center">Đọc sách</span>
                                                                                    ) : (
                                                                                                      <span className="hidden sm:inline">Mua ngay</span>
                                                                                    )}
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>

                                    {/* Pagination - Responsive */}
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
                                                      siblingCount={window.innerWidth < 640 ? 0 : 1}
                                                      className="pagination-responsive"
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