'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { Rating } from '@mui/material';
import Link from 'next/link';
import Loading from '@/app/utils/loading';
import ErrorAPI from '../error.api';

const BestSeller = () => {
      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR('http://localhost:8888/api/v1/books', fetcher, {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
      });

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;


      // // Lấy danh sách sách và sắp xếp lại
      // let books = data.data?.sort((a, b) => b.sold - a.sold).slice(0, 3);

      // // Di chuyển sách có sold lớn nhất vào vị trí thứ 2
      // const maxSoldBook = books[0];
      // books = [books[1], maxSoldBook, books[2]];

      return (
            <div className="w-full px-4 mb-24">
                  <div>
                        <p className="text-2xl dark:text-white text-black text-center mb-10">
                              Những Cuốn Sách Bán Chạy Nhất
                        </p>

                        {/* <div className="flex items-end justify-center space-x-8">
                              {books.map((item: any, index: number) => (
                                    <Link key={item.slug} href={`/books/detail/${item.slug}`} rel="preload"
                                          as={""}>
                                          <div

                                                className={` shadow-md rounded-md p-4 flex flex-col items-center transition-all ${index === 1
                                                      ? 'bg-[#59b8c3] dark:bg-[#dbbd89] w-48 h-80 md:w-60 md:h-96 transform scale-110 z-10]' // Tăng chiều cao của phần tử ở giữa
                                                      : 'bg-white dark:bg-gray-800 w-40 h-80 md:w-48 md:h-96' // Tăng chiều cao cho các phần tử còn lại
                                                      }`}
                                          >
                                                <div className="relative mb-5">
                                                      <Image
                                                            src={item.thumbnail?.url}
                                                            alt={item.title}

                                                            width={150}
                                                            height={250}
                                                            priority
                                                      />
                                                </div>
                                                <h3 className="text-sm font-semibold dark:text-white text-gray-900 text-center overflow-hidden text-ellipsis whitespace-nowrap w-full">
                                                      {item.title}
                                                </h3>

                                                <p className="text-xs dark:text-gray-400 text-gray-600 text-center truncate">
                                                      Tác giả: {item.author}
                                                </p>
                                                <p className="text-xs dark:text-gray-400 text-gray-600 truncate">
                                                      Đã bán: {item.sold}
                                                </p>
                                                <p className="text-xs dark:text-gray-400 text-gray-600">
                                                      <Rating
                                                            value={item.rating}
                                                            precision={0.1}
                                                            size="small"
                                                            readOnly={true}
                                                      />
                                                </p>
                                          </div>
                                    </Link>
                              ))}
                        </div> */}
                  </div>
            </div>
      );
};

export default BestSeller;
