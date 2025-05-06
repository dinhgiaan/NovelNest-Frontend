import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import convertPriceToVND from "../utils/convert.price";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";
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
      quantity: number;
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

      const { userInfo } = useContext(AuthContext);

      /* chưa xong !!!!!!!!!!!!!
      const isPurchased = userInfo.purchasedBooks?.find((item: any) => item._id === data._id);
      */

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
                  const res = await getUserById(userId); // Or { _id: userId } depending on your implementation
                  console.log('--> check res: ', res);

                  // Assuming the response contains information about purchased books
                  // Update this logic based on your actual API response structure
                  if (res.data?.purchasedBooks) {
                        setHasPurchasedBook(true);
                  }
            } catch (error) {
                  console.error("Error fetching user purchases:", error);
            }
      }

      // Xử lý thay đổi trang
      const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
            // Giữ lại các tham số hiện tại từ URL
            const params = new URLSearchParams(searchParams.toString());

            // Cập nhật tham số page
            params.set("page", value.toString());

            // Chuyển đến URL mới với trang đã cập nhật
            router.push(`/books?${params.toString()}`);
      };

      if (!Array.isArray(data) || data.length === 0) {
            return (
                  <div className="min-h-[200px] flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                              Không có dữ liệu sách
                        </p>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="flex justify-center items-center pt-4">
                        <SearchBar />
                  </div>
                  <div className="max-w-screen-xl mx-auto px-4 py-10 flex gap-4">
                        <div className="w-1/6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-auto self-start">
                              <Filter />
                        </div>
                        <div className="flex-1">
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                                    {data.map((book) => {
                                          const isOutOfStock = book.quantity <= 0;

                                          return (
                                                <div key={book.slug}>
                                                      <div
                                                            className={`bg-white dark:bg-gray-800 rounded overflow-hidden shadow-md transition-shadow duration-200 ${isOutOfStock ? "opacity-75" : "hover:shadow-lg"}`}
                                                      >
                                                            <Link
                                                                  rel="preload"
                                                                  href={`/books/detail/${book.slug}`}
                                                                  className={isOutOfStock ? "cursor-not-allowed" : ""}
                                                                  onClick={(e) => isOutOfStock && e.preventDefault()}
                                                            >
                                                                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                                        <Image
                                                                              src={book?.thumbnail?.url}
                                                                              alt={book.title}
                                                                              fill
                                                                              className={`object-cover ${isOutOfStock ? "grayscale" : ""}`}
                                                                              loading="lazy"
                                                                              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 15vw"
                                                                        />
                                                                        <span
                                                                              className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${isOutOfStock && "bg-red-500 text-white"}`}
                                                                        >
                                                                              {isOutOfStock && "Hết bản cứng"}
                                                                        </span>
                                                                  </div>
                                                            </Link>

                                                            <div className="p-2">
                                                                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 text-xs">
                                                                        {book.title}
                                                                  </h3>
                                                                  <p className="text-gray-600 dark:text-gray-300 line-clamp-1 text-[10px] italic mt-1">
                                                                        {book.author}
                                                                  </p>
                                                                  <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold mt-1 block">
                                                                        {convertPriceToVND(book.price)}
                                                                  </span>

                                                                  <div className="flex justify-between mt-2 items-center gap-2">
                                                                        <button
                                                                              disabled={isOutOfStock}
                                                                              className={`flex items-center justify-center flex-1 space-x-1 rounded-lg px-2 py-1 text-xs transition-colors ${isOutOfStock
                                                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                                                                                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"}`}
                                                                        >
                                                                              {hasPurchasedBook ?
                                                                                    "Đọc ngay"
                                                                                    :
                                                                                    <>
                                                                                          {isOutOfStock ? (
                                                                                                <>
                                                                                                      <MdCancel className="mr-1" size={14} />
                                                                                                      <span>Hết hàng</span>
                                                                                                </>
                                                                                          ) : (
                                                                                                <>
                                                                                                      <BsFillBagPlusFill className="mr-1" size={12} />
                                                                                                      <span>Thêm vào giỏ</span>
                                                                                                </>
                                                                                          )}
                                                                                    </>
                                                                              }

                                                                        </button>
                                                                        <button
                                                                              disabled={isOutOfStock}
                                                                              className={`rounded-lg p-1 transition-colors ${isOutOfStock
                                                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                                                                                    : "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"}`}
                                                                        >
                                                                              {isOutOfStock ? (
                                                                                    <TbShoppingCartOff size={16} />
                                                                              ) : (
                                                                                    <AiOutlineShoppingCart size={16} />
                                                                              )}
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          );
                                    })}
                              </div>

                              {pagination && pagination.totalPages > 1 && (
                                    <div className="flex justify-center pt-8">
                                          <Pagination
                                                count={pagination.totalPages}
                                                page={pagination.currentPage}
                                                onChange={handlePageChange}
                                                color="primary"
                                                size="medium"
                                                showFirstButton
                                                showLastButton
                                                siblingCount={1}
                                          />
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default BookPage;