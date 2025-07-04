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

      const bookId = searchParams.get('bookId');
      const orderCode = searchParams.get('orderCode');
      const quantity = searchParams.get('quantity') || '1';
      const userId = userInfo?.user?._id;

      // Đợi userInfo được load trước khi validate
      useEffect(() => {
            if (userInfo !== null && !isInitialized) {
                  setIsInitialized(true);
            }
      }, [userInfo, isInitialized]);

      useEffect(() => {
            // Chỉ chạy validation khi đã initialized
            if (!isInitialized) return;

            // Validate required parameters
            if (!userId || !bookId || !orderCode) {
                  console.log('Missing params:', { userId, bookId, orderCode });
                  toast.error('Thông tin thanh toán không hợp lệ');
                  setStatus('error');
                  setTimeout(() => router.push('/books'), 2000);
                  return;
            }

            const updatePurchase = async () => {
                  if (hasProcessed) return;
                  setHasProcessed(true);

                  try {
                        const response = await fetch('http://localhost:8888/api/v1/payments/success', {
                              method: 'POST',
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                    userId,
                                    bookId,
                                    orderCode,
                                    quantity: parseInt(quantity)
                              })
                        });

                        const data = await response.json();

                        if (response.ok && data.success) {
                              setStatus('success');
                              toast.success('Thanh toán thành công! Sách đã được thêm vào thư viện của bạn.');
                        } else {
                              setStatus('error');
                              toast.error(data.message || 'Có lỗi xảy ra khi xử lý thanh toán');
                        }
                  } catch (error) {
                        console.error('Error updating purchase:', error);
                        setStatus('error');
                        toast.error('Không thể kết nối đến server');
                  }
            };

            updatePurchase();
      }, [isInitialized, userId, bookId, orderCode, quantity, router, hasProcessed]);

      // Countdown timer
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

      const handleGoToBooks = () => {
            router.push('/books');
      };

      const handleGoHome = () => {
            router.push('/');
      };

      // Hiển thị loading nếu chưa initialized
      if (!isInitialized) {
            return (
                  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                              <div className="mb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    Đang khởi tạo...
                              </h1>
                              <p className="text-gray-600">
                                    Vui lòng chờ trong giây lát
                              </p>
                        </div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                        {status === 'processing' && (
                              <>
                                    <div className="mb-6">
                                          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                          </div>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                          Đang xử lý giao dịch...
                                    </h1>
                                    <p className="text-gray-600 mb-4">
                                          Chúng tôi đang xác nhận thanh toán và cập nhật thư viện của bạn
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
                                    <div className="mb-6">
                                          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                          </div>
                                    </div>
                                    <h1 className="text-3xl font-bold text-green-600 mb-2">
                                          Thanh toán thành công!
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                          Sách đã được thêm vào thư viện của bạn. Bạn có thể bắt đầu đọc ngay bây giờ!
                                    </p>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                          <p className="text-sm text-gray-300 mb-2">Mã đơn hàng:</p>
                                          <p className="font-mono text-lg font-semibold text-gray-800">ORD{orderCode}</p>
                                    </div>

                                    <div className="space-y-3">
                                          <button
                                                onClick={handleGoToBooks}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                          >
                                                Đi đến thư viện sách
                                          </button>
                                          <button
                                                onClick={handleGoHome}
                                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                          >
                                                Về trang chủ
                                          </button>
                                    </div>

                                    <p className="text-sm text-gray-300 mt-4">
                                          Tự động chuyển hướng sau {countdown} giây...
                                    </p>
                              </>
                        )}

                        {status === 'error' && (
                              <>
                                    <div className="mb-6">
                                          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                          </div>
                                    </div>
                                    <h1 className="text-2xl font-bold text-red-600 mb-2">
                                          Có lỗi xảy ra
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                          Không thể xử lý giao dịch của bạn. Vui lòng liên hệ hỗ trợ khách hàng nếu bạn đã bị trừ tiền.
                                    </p>

                                    <div className="space-y-3">
                                          <button
                                                onClick={() => window.location.reload()}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                          >
                                                Thử lại
                                          </button>
                                          <button
                                                onClick={handleGoHome}
                                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                          >
                                                Về trang chủ
                                          </button>
                                    </div>
                              </>
                        )}
                  </div>
            </div>
      );
}

export default PaymentSuccess;