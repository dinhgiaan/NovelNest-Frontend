'use client';

import InfoUser from '@/app/components/book/more.book.detail';
import ErrorAPI from '@/app/components/error.api';
import Loading from '@/app/utils/loading';
import { Rating } from '@mui/material';
import { MoveLeft, Calendar, Bookmark, Webhook, Tag, Barcode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
      book: any;
      error: any;
      isLoading: boolean;
}

const BookDetail = ({ book, error, isLoading }: IProps) => {

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      if (!book) {
            return <div className="p-2">Không tìm thấy sách</div>;
      }

      const formatDate = (date: string) => {
            const parsedDate = new Date(date);
            return parsedDate.toLocaleDateString('vi-VN').replace(/\//g, ' - ');
      };

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
                  <div className="max-w-4xl mx-auto">
                        <Link
                              href="/books"
                              className="inline-flex items-center space-x-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                              <MoveLeft size={16} />
                              <span className="text-sm font-medium">Quay lại danh sách</span>
                        </Link>

                        <div className="grid md:grid-cols-3 gap-6">
                              <div className="md:col-span-1">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                                          <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                                <     Image
                                                      src={book.thumbnail?.url}
                                                      width={200}
                                                      height={250}
                                                      alt={book.title}
                                                      className="object-cover"
                                                />
                                          </div>

                                          <div className="mt-4 flex items-center justify-center space-x-2">
                                                <Rating
                                                      value={book.rating}
                                                      precision={0.1}
                                                      size="small"
                                                      readOnly={true}
                                                />
                                                <span className="text-sm font-semibold dark:text-gray-200">
                                                      {book.rating}
                                                </span>
                                          </div>
                                    </div>
                                    <div className='mt-3'>
                                          <div>
                                                <div className='text-center'>
                                                      <span className='dark:bg-[#693169] bg-[#30abc1] dark:text-[#e57fd9] text-[#f9f48e] px-3 py-1 rounded-md text-xs font-extralight cursor-pointer'>
                                                            Xem trước
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="md:col-span-2">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg pl-5 pt-3">
                                          <div className="space-y-3">
                                                <div>
                                                      <h1 className="text-lg italic font-bold text-[#72cd59] dark:text-[#f09c4f] mb-2">
                                                            {book.title}
                                                      </h1>
                                                      <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-xs ${book.quantity > 0
                                                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                                  }`}
                                                      >
                                                            {book.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                                                      </span>
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                <div className="grid gap-4">
                                                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                                            <Barcode size={15} />
                                                            <span className="text-xs">ISBN: <span className="font-medium dark:text-[#59a4de] text-[#aa8824]">{book.isbn}</span></span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                                            <Bookmark size={15} />
                                                            <span className="text-xs">Tác giả: <span className="font-medium dark:text-[#59a4de] text-[#aa8824]">{book.author}</span></span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                                            <Calendar size={15} />
                                                            <span className="text-xs">Ngày xuất bản: <span className="font-medium dark:text-[#59a4de] text-[#aa8824]">{formatDate(book.publicDate)}</span></span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                                            <Webhook size={15} />
                                                            <span className="text-xs">Số lượng còn: <span className="font-medium dark:text-[#59a4de] text-[#aa8824]">{book.quantity}</span></span>
                                                      </div>
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                <div>
                                                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                                            Mô tả
                                                      </h2>
                                                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed overflow-hidden max-h-[58.5px] line-clamp-3">
                                                            {book.description}
                                                      </p>
                                                </div>

                                                <div className="h-px bg-gray-200 dark:bg-gray-700" />

                                                <div>
                                                      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                                            Thể loại
                                                      </h2>
                                                      <div className="flex flex-wrap gap-2 pb-4">
                                                            {book.category.map((item: any) => (
                                                                  <span
                                                                        key={item}
                                                                        className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                                  >
                                                                        <Tag className="h-3 w-3 mr-1" />
                                                                        {item}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div>
                        <InfoUser />
                  </div>
            </div>
      );
};

export default BookDetail;