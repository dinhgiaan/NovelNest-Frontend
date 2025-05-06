'use client';

import InfoUser from '@/app/components/book/more.book.detail';
import PurchaseTimeline from '@/app/components/book/time.line';
import ErrorAPI from '@/app/components/error.api';
import Loading from '@/app/utils/loading';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineBarcode, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBookReader, FaTags, FaEye } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';

interface IProps {
      book: any;
      error: any;
      isLoading: boolean;
      userId: string;
}

const BookDetail = ({ book, error, isLoading, userId }: IProps) => {
      const [clickBuy, setClickBuy] = useState<boolean>(false);

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      if (!book) {
            return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Không tìm thấy sách</div>;
      }

      const formatDate = (date: string) => {
            const parsedDate = new Date(date);
            return parsedDate.toLocaleDateString('vi-VN').replace(/\//g, ' - ');
      };

      const isOutOfStock = book.quantity <= 0;

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
                  {clickBuy ? (
                        <PurchaseTimeline book={book} />
                  ) : (
                        <>
                              <div className="max-w-4xl mx-auto">
                                    <Link
                                          href="/books"
                                          className="inline-flex items-center space-x-2 mb-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                                    >
                                          <IoIosArrowRoundBack size={20} />
                                          <span className="text-sm font-medium">Quay lại danh sách</span>
                                    </Link>

                                    <div className="grid md:grid-cols-3 gap-6">
                                          <div className="md:col-span-1">
                                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                                      <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 overflow-hidden flex justify-center relative">
                                                            <Image
                                                                  src={book.thumbnail?.url}
                                                                  width={240}
                                                                  height={300}
                                                                  alt={book.title}
                                                                  className={`object-cover ${isOutOfStock ? 'grayscale opacity-80' : ''}`}
                                                                  priority
                                                                  quality={80}
                                                            />
                                                            <span
                                                                  className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${isOutOfStock
                                                                        ? 'bg-red-500 text-white'
                                                                        : 'bg-emerald-500 text-white'
                                                                        }`}
                                                            >
                                                                  {isOutOfStock ? 'Hết hàng' : 'Còn hàng'}
                                                            </span>
                                                      </div>

                                                      <div className="p-4">
                                                            <div className="flex items-center justify-center space-x-2 mb-4">
                                                                  <Rating
                                                                        value={book.rating}
                                                                        precision={0.1}
                                                                        size="small"
                                                                        readOnly={true}
                                                                  />
                                                                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                                                        {book.rating}
                                                                  </span>
                                                            </div>

                                                            <div className="flex gap-3 justify-center">
                                                                  <button className="flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                                                        <FaEye size={14} />
                                                                        Xem trước
                                                                  </button>

                                                                  {isOutOfStock ? (
                                                                        <button
                                                                              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 px-4 py-2 rounded-md text-sm font-medium"
                                                                              disabled
                                                                        >
                                                                              <AiOutlineShoppingCart size={14} />
                                                                              Hết hàng
                                                                        </button>
                                                                  ) : (
                                                                        <button
                                                                              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                                                              onClick={() => setClickBuy(true)}
                                                                        >
                                                                              <AiOutlineShoppingCart size={14} />
                                                                              Mua sách
                                                                        </button>
                                                                  )}
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="md:col-span-2">
                                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                                                      <div className="space-y-4">
                                                            <div>
                                                                  <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                                        {book.title}
                                                                  </h1>
                                                                  <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium italic">
                                                                        {book.author}
                                                                  </p>
                                                            </div>

                                                            <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                            <div className="grid gap-4">
                                                                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                                                        <AiOutlineBarcode className="text-indigo-500 dark:text-indigo-400" size={16} />
                                                                        <span className="text-sm">ISBN: <span className="font-medium">{book.isbn}</span></span>
                                                                  </div>
                                                                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                                                        <FaBookReader className="text-indigo-500 dark:text-indigo-400" size={16} />
                                                                        <span className="text-sm">Tác giả: <span className="font-medium">{book.author}</span></span>
                                                                  </div>
                                                                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                                                        <MdDateRange className="text-indigo-500 dark:text-indigo-400" size={16} />
                                                                        <span className="text-sm">Ngày xuất bản: <span className="font-medium">{formatDate(book.publicDate)}</span></span>
                                                                  </div>
                                                                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                                                                        <BiCategoryAlt className="text-indigo-500 dark:text-indigo-400" size={16} />
                                                                        <span className="text-sm">Số lượng còn:
                                                                              <span className={`font-medium ml-1 ${isOutOfStock ? 'text-red-500 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                                                    {book.quantity}
                                                                              </span>
                                                                        </span>
                                                                  </div>
                                                            </div>

                                                            <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                            <div>
                                                                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                                                        Mô tả
                                                                  </h2>
                                                                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                                        {book.description}
                                                                  </p>
                                                            </div>

                                                            <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                            <div>
                                                                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                                                        Thể loại
                                                                  </h2>
                                                                  <div className="flex flex-wrap gap-2 pb-2">
                                                                        {book.categories && book.categories.length > 0 ? (
                                                                              book.categories.map((item: any) => (
                                                                                    <span
                                                                                          key={item}
                                                                                          className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                                                                                    >
                                                                                          <FaTags className="h-3 w-3 mr-1" />
                                                                                          {item}
                                                                                    </span>
                                                                              ))
                                                                        ) : (
                                                                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                                                    Hiện chưa có danh mục nào
                                                                              </span>
                                                                        )}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div className="mt-8">
                                    <InfoUser />
                              </div>
                        </>
                  )}
            </div>
      );
};

export default BookDetail;