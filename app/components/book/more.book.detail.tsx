'use client';

import { useParams } from 'next/navigation';
import convertPriceToVND from '@/app/utils/convert.price';
import ErrorAPI from '../error.api';
import Loading from '@/app/utils/loading';
import formatDate from '@/app/utils/format.date';
import { useBookDetail } from '@/app/hooks/use.book.details';

const DetailItem = ({
      label,
      value,
      isPrice = false
}: {
      label: string;
      value: string | number | undefined;
      isPrice?: boolean;
}) => (
      <div className="group">
            <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {label}
            </dt>
            <dd className={`text-sm ${isPrice
                  ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                  : 'font-medium text-gray-900 dark:text-gray-100'
                  } transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200`}>
                  {value || <span className="text-gray-400 dark:text-gray-500 italic">Đang cập nhật</span>}
            </dd>
      </div>
);

const PriceDetail = ({ originalPrice, promotionPrice }: { originalPrice?: number; promotionPrice?: number }) => {
      const hasPromotion = promotionPrice && promotionPrice < originalPrice!;

      return (
            <div className="group">
                  <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Giá sách
                  </dt>
                  <dd className="text-sm transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                        {originalPrice ? (
                              <div className="flex flex-col gap-1">
                                    {hasPromotion ? (
                                          <>
                                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                                      {convertPriceToVND(promotionPrice)}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                      <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                                                            {convertPriceToVND(originalPrice)}
                                                      </span>
                                                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                                                            -{Math.round(((originalPrice - promotionPrice) / originalPrice) * 100)}%
                                                      </span>
                                                </div>
                                          </>
                                    ) : (
                                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                                {convertPriceToVND(originalPrice)}
                                          </span>
                                    )}
                              </div>
                        ) : (
                              <span className="text-gray-400 dark:text-gray-500 italic">Đang cập nhật</span>
                        )}
                  </dd>
            </div>
      );
};

const InfoDetail = () => {
      const { slug } = useParams();
      const { book: bookData, error, isLoading } = useBookDetail(slug as string);

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      return (
            <div className="max-w-4xl mx-auto mt-8 px-4 lg:px-0">
                  <div className="bg-[#f5f7f3] dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                              <div className="flex items-center justify-between">
                                    <div>
                                          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                Thông tin xuất bản
                                          </h2>
                                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Chi tiết về sách và nhà xuất bản
                                          </p>
                                    </div>
                              </div>
                        </div>

                        <div className="px-6 py-5">
                              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                    <DetailItem
                                          label="Nhà xuất bản"
                                          value={bookData?.publisher}
                                    />
                                    <DetailItem
                                          label="Ngày xuất bản"
                                          value={formatDate(bookData?.publicDate)}
                                    />
                                    <DetailItem
                                          label="Mã ISBN"
                                          value={bookData?.isbn}
                                    />
                                    <DetailItem
                                          label="Số trang"
                                          value={bookData?.page ? `${bookData.page} trang` : undefined}
                                    />
                                    <PriceDetail
                                          originalPrice={bookData?.price}
                                          promotionPrice={bookData?.promotionPrice}
                                    />
                              </dl>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-100 dark:border-gray-800">
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Thông tin được cập nhật từ nhà xuất bản
                              </p>
                        </div>
                  </div>
            </div>
      );
};

export default InfoDetail;
