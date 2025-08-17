'use client'

import { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthContext } from '@/app/context/auth.context';

const PaymentSuccess = () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const { userInfo } = useContext(AuthContext);

      const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
      const [countdown, setCountdown] = useState(5);
      const [hasProcessed, setHasProcessed] = useState(false);
      const [isInitialized, setIsInitialized] = useState(false);

      const userId = searchParams.get('userId') || userInfo?.user?._id;
      const orderCode = searchParams.get('orderCode');
      const bookIds = searchParams.get('bookIds');
      const itemsParam = searchParams.get('items');

      useEffect(() => {
            if (userInfo !== null && !isInitialized) {
                  setIsInitialized(true);
            }
      }, [userInfo, isInitialized]);

      useEffect(() => {
            if (!isInitialized) return;

            if (!userId || !orderCode) {
                  toast.error('Thông tin thanh toán không hợp lệ - thiếu userId hoặc orderCode');
                  setStatus('error');
                  setTimeout(() => router.push('/books'), 2000);
                  return;
            }

            let items = [];
            if (itemsParam) {
                  try {
                        items = JSON.parse(decodeURIComponent(itemsParam));
                  } catch {
                        toast.error('Không thể phân tích thông tin sản phẩm');
                        setStatus('error');
                        return;
                  }
            } else if (bookIds) {
                  const bookIdArray = bookIds.split(',');
                  items = bookIdArray.map(bookId => ({
                        bookId: bookId.trim(),
                        title: 'Sản phẩm',
                        author: 'Không xác định',
                        price: 0,
                        quantity: 1,
                        thumbnail: { url: '' }
                  }));
            } else {
                  toast.error('Không tìm thấy thông tin sản phẩm');
                  setStatus('error');
                  return;
            }

            if (!items || items.length === 0) {
                  toast.error('Danh sách sản phẩm trống');
                  setStatus('error');
                  return;
            }

            const updatePurchase = async () => {
                  if (hasProcessed) return;
                  setHasProcessed(true);

                  try {
                        const requestBody = {
                              userId,
                              orderCode,
                              items
                        };

                        const paymentSuccessUrl = process.env.NEXT_PUBLIC_PAYMENT_SUCCESS;
                        if (!paymentSuccessUrl) {
                              toast.error('Lỗi cấu hình: Không tìm thấy URL thanh toán thành công')
                              return
                        }

                        const response = await fetch(paymentSuccessUrl, {
                              method: 'POST',
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(requestBody)
                        });

                        const data = await response.json();

                        if (response.ok && data.success) {
                              setStatus('success');
                              toast.success(data.message || 'Thanh toán thành công! Sách đã được thêm vào thư viện của bạn.');
                        } else {
                              setStatus('error');
                              toast.error(data.message || 'Có lỗi xảy ra khi xử lý thanh toán');
                        }
                  } catch {
                        setStatus('error');
                        toast.error('Không thể kết nối đến server');
                  }
            };

            updatePurchase();
      }, [isInitialized, userId, orderCode, itemsParam, bookIds, router, hasProcessed]);

      useEffect(() => {
            if (status === 'success' && countdown > 0) {
                  const timer = setTimeout(() => {
                        setCountdown(countdown - 1);
                  }, 1000);
                  return () => clearTimeout(timer);
            } else if (status === 'success' && countdown === 0) {
                  router.push('/books');
            }
      }, [status, countdown, router]);

      const handleGoHome = () => {
            router.push('/');
      };

      if (!isInitialized) {
            return (
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 max-w-sm w-full">
                              <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                    Đang khởi tạo...
                              </h1>
                              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                                    Vui lòng chờ trong giây lát
                              </p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24] flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 max-w-sm w-full pt-10">
                        {status === 'processing' && (
                              <>
                                    <div className="flex justify-center mb-4">
                                          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                          </div>
                                    </div>
                                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                          Đang xử lý giao dịch...
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                                          Chúng tôi đang xác nhận thanh toán và cập nhật thư viện
                                    </p>
                                    <div className="flex items-center justify-center space-x-1">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                              </>
                        )}

                        {status === 'success' && (
                              <>
                                    <div className="flex justify-center mb-4">
                                          <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                          </div>
                                    </div>

                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                          Thanh toán thành công
                                    </h1>

                                    <p className="text-gray-600 dark:text-gray-300 text-xs text-center mb-5">
                                          Sách đã thêm vào thư viện. Bạn có thể bắt đầu đọc ngay ❤️‍🔥
                                    </p>

                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5">
                                          <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">Mã đơn hàng</span>
                                                <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">ORD{orderCode}</span>
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <button
                                                onClick={handleGoHome}
                                                className="w-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                                          >
                                                Về trang chủ
                                          </button>
                                    </div>

                                    <div className="text-center mt-4">
                                          <span className="text-xs text-gray-400 dark:text-gray-500">
                                                Tự động chuyển hướng sau {countdown} giây
                                          </span>
                                    </div>
                              </>
                        )}

                        {status === 'error' && (
                              <>
                                    <div className="flex justify-center mb-4">
                                          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                          </div>
                                    </div>

                                    <h1 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 text-center">
                                          Có lỗi xảy ra
                                    </h1>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-5">
                                          Không thể xử lý giao dịch. Vui lòng liên hệ hỗ trợ nếu bạn đã bị trừ tiền.
                                    </p>

                                    <div className="space-y-2">
                                          <button
                                                onClick={() => window.location.reload()}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                                          >
                                                Thử lại
                                          </button>
                                          <button
                                                onClick={handleGoHome}
                                                className="w-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                                          >
                                                Về trang chủ
                                          </button>
                                    </div>
                              </>
                        )}
                  </div>
            </div>
      );
};

export default PaymentSuccess;
