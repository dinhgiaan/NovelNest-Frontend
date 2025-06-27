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
import { FaBookReader, FaTags, FaEye } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';

// Type definitions - quan trọng nhất!
interface Category {
      _id: string;
      name: string;
}

interface Thumbnail {
      url: string;
      alt?: string;
}

interface Book {
      _id: string;
      title: string;
      author: string;
      isbn: string;
      publicDate: string;
      description: string;
      rating: number;
      thumbnail?: Thumbnail;
      categories: Category[] | string[];
      price?: number;
}

interface BookDetailProps {
      book: Book | null;
      error: Error | string | null;
      isLoading: boolean;
      userId: string;
}

// Constants - tách ra để dễ quản lý
const BOOK_IMAGE_SIZE = {
      width: 240,
      height: 300,
} as const;

const RATING_STYLES = {
      '& .MuiRating-iconFilled': {
            color: '#fbbf24', // yellow-400
      },
      '& .MuiRating-iconEmpty': {
            color: '#d1d5db', // gray-300 in light mode
      },
      '@media (prefers-color-scheme: dark)': {
            '& .MuiRating-iconEmpty': {
                  color: '#4b5563', // gray-600 in dark mode
            },
      },
} as const;

const BookDetail = ({ book, error, isLoading }: BookDetailProps) => {
      const [clickBuy, setClickBuy] = useState<boolean>(false);

      // Utility functions - đơn giản, không cần useMemo
      const formatDate = (date: string): string => {
            if (!date) return '';

            try {
                  const parsedDate = new Date(date);
                  if (isNaN(parsedDate.getTime())) {
                        return 'Ngày không hợp lệ';
                  }
                  return parsedDate.toLocaleDateString('vi-VN').replace(/\//g, ' - ');
            } catch {
                  return 'Ngày không hợp lệ';
            }
      };

      // Event handlers - đơn giản, không cần useCallback
      const handleBuyClick = () => {
            setClickBuy(true);
      };

      const handlePreviewClick = () => {
            // Handle preview logic here
            console.log('Preview clicked for book:', book?.title);
      };

      // Render helpers - tách logic phức tạp ra functions
      const renderStockBadge = () => (
            <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">
                  Có sẵn
            </span>
      );

      const renderActionButtons = () => (
            <div className="flex gap-3 justify-center">
                  <button
                        onClick={handlePreviewClick}
                        className="flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                        <FaEye size={14} />
                        Xem trước
                  </button>

                  <button
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        onClick={handleBuyClick}
                  >
                        <AiOutlineShoppingCart size={14} />
                        Mua sách
                  </button>
            </div>
      );

      const renderBookImage = () => {
            if (!book) return null;

            return (
                  <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 overflow-hidden flex justify-center relative pt-4">
                        {book.thumbnail?.url ? (
                              <Image
                                    src={book.thumbnail.url}
                                    width={BOOK_IMAGE_SIZE.width}
                                    height={BOOK_IMAGE_SIZE.height}
                                    alt={book.thumbnail.alt || `Ảnh bìa sách ${book.title}`}
                                    className="object-cover"
                                    priority
                                    quality={80}
                              />
                        ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                                    <span className="text-gray-400 dark:text-gray-500">Không có ảnh</span>
                              </div>
                        )}
                        {renderStockBadge()}
                  </div>
            );
      };

      const renderBookInfo = () => {
            if (!book) return null;

            const infoItems = [
                  {
                        icon: AiOutlineBarcode,
                        label: 'ISBN',
                        value: book.isbn,
                  },
                  {
                        icon: FaBookReader,
                        label: 'Tác giả',
                        value: book.author,
                  },
                  {
                        icon: MdDateRange,
                        label: 'Ngày xuất bản',
                        value: formatDate(book.publicDate),
                  },
            ];

            return infoItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                        <Icon className="text-indigo-500 dark:text-indigo-400" size={16} />
                        <span className="text-sm">
                              {label}: <span className="font-medium ml-1">{value}</span>
                        </span>
                  </div>
            ));
      };

      const renderCategories = () => {
            if (!book?.categories || book.categories.length === 0) {
                  return (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                              Hiện chưa có danh mục nào
                        </span>
                  );
            }

            return book.categories.map((item) => {
                  const categoryId = typeof item === 'object' ? item._id : item;
                  const categoryName = typeof item === 'object' ? item.name : item;

                  return (
                        <span
                              key={categoryId}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                        >
                              <FaTags className="h-3 w-3 mr-1" />
                              {categoryName}
                        </span>
                  );
            });
      };

      // Early returns
      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;
      if (!book) {
            return (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Không tìm thấy sách
                  </div>
            );
      }

      if (clickBuy) {
            return <PurchaseTimeline book={book} />;
      }

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
                  <div className="max-w-4xl mx-auto">
                        {/* Back button */}
                        <Link
                              href="/books"
                              className="inline-flex items-center space-x-2 mb-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors hover:scale-110"
                        >
                              <IoIosArrowRoundBack size={20} />
                              <span className="text-sm font-medium">Quay lại danh sách</span>
                        </Link>

                        <div className="grid md:grid-cols-3 gap-6">
                              {/* Book Image Section */}
                              <div className="md:col-span-1">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                          {renderBookImage()}

                                          {/* Rating and Actions */}
                                          <div className="p-4">
                                                <div className="flex items-center justify-center space-x-2 mb-4">
                                                      <Rating
                                                            value={book.rating}
                                                            precision={0.1}
                                                            size="small"
                                                            readOnly
                                                            sx={RATING_STYLES}
                                                      />
                                                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                                            {book.rating.toFixed(1)}
                                                      </span>
                                                </div>

                                                {renderActionButtons()}
                                          </div>
                                    </div>
                              </div>

                              {/* Book Details Section */}
                              <div className="md:col-span-2">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                                          <div className="space-y-4">
                                                <div>
                                                      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {book.title}
                                                      </h1>
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                                <div className="grid gap-4">
                                                      {renderBookInfo()}
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                {/* Description */}
                                                <div>
                                                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                                            Mô tả
                                                      </h2>
                                                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                            {book.description}
                                                      </p>
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                {/* Categories */}
                                                <div>
                                                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                                            Thể loại
                                                      </h2>
                                                      <div className="flex flex-wrap gap-2 pb-2">
                                                            {renderCategories()}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8">
                        <InfoUser />
                  </div>
            </div>
      );
};

export default BookDetail;