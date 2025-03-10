import Image from "next/image";
import Link from "next/link";
import Filter from "../components/book/filter";
import convertPriceToVND from "../utils/convert.price";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";

interface Book {
      _id: string;
      slug: string;
      title: string;
      isbn: number;
      author: string;
      price: number;
      status: string;
      quantity: number;
      thumbnail: {
            public_id: string;
            url: string;
      };
}

interface IProps {
      data: Book[];
}

const BookPage = ({ data }: IProps) => {
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
                  <div className="max-w-screen-xl mx-auto px-4 py-10 flex gap-4">
                        <div className="w-1/5 min-w-[200px] bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                              <Filter />
                        </div>

                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
                              {data.map((book) => {
                                    const isOutOfStock = book.quantity <= 0;

                                    return (
                                          <Link
                                                rel="preload"
                                                key={book.slug}
                                                href={`/books/detail/${book.slug}`}
                                                className="group"
                                          >
                                                <div className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
                                                      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                                            <Image
                                                                  src={book?.thumbnail?.url}
                                                                  alt={book.title}
                                                                  fill
                                                                  className="object-cover"
                                                                  priority
                                                            />
                                                            <span
                                                                  className={`absolute top-1 right-1 text-[8px] px-1 py-0.5 rounded-full ${isOutOfStock
                                                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                                        }`}
                                                            >
                                                                  {isOutOfStock ? "Hết" : "Còn"}
                                                            </span>
                                                      </div>

                                                      <div className="p-2">
                                                            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 text-[12px]">
                                                                  {book.title}
                                                            </h3>
                                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-1 text-[10px] italic">
                                                                  {book.author}
                                                            </p>
                                                            <span className="text-green-600 dark:text-green-400 font-semibold">
                                                                  {convertPriceToVND(book.price)}
                                                            </span>

                                                            <div className="flex justify-between mt-2 items-center">
                                                                  <p
                                                                        className={`flex space-x-1 border-2 rounded-lg px-3 py-2 hover:bg-[#97aac2] ${isOutOfStock
                                                                              ? "text-red-700 border-[#cf6c4e]"
                                                                              : "border-[#6182ec] hover:text-black"
                                                                              }`}
                                                                  >
                                                                        {isOutOfStock ? (
                                                                              <>
                                                                                    <MdCancel size={15} />
                                                                                    <span className="text-xs">Sách đã hết hàng</span>
                                                                              </>
                                                                        ) : (
                                                                              <>
                                                                                    <BsFillBagPlusFill
                                                                                          size={15}
                                                                                          className="dark:text-white text-black"
                                                                                    />
                                                                                    <span className="text-xs">Thêm vào giỏ hàng</span>
                                                                              </>
                                                                        )}
                                                                  </p>
                                                                  <p
                                                                        className={`border-2 rounded-lg px-3 py-2 ${isOutOfStock
                                                                              ? "border-[#ccc] bg-[#c79edc] hover:bg-[#c7b691]"
                                                                              : "border-[#ccc] bg-[#86599c] hover:bg-[#72a76e]"
                                                                              }`}
                                                                  >
                                                                        {isOutOfStock ? (
                                                                              <TbShoppingCartOff size={17} className="text-red-700" />
                                                                        ) : (
                                                                              <AiOutlineShoppingCart
                                                                                    size={17}
                                                                                    className="dark:text-white text-black"
                                                                              />
                                                                        )}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </Link>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
};

export default BookPage;
