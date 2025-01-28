'use client'

import { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthContext } from '@/app/context/auth.context';

const PaymentSuccess = () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const { userInfo } = useContext(AuthContext);

      const bookId = searchParams.get('bookId');
      const orderCode = searchParams.get('orderCode');
      const userId = userInfo?.user?._id;

      useEffect(() => {
            const updatePurchase = async () => {
                  if (userId && bookId && orderCode) {
                        try {
                              const response = await fetch('http://localhost:8888/api/v1/payments/success', {
                                    method: 'POST',
                                    headers: {
                                          'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                          userId,
                                          bookId,
                                          orderCode
                                    })
                              });

                              const data = await response.json();

                              if (response.ok) {
                                    toast.success('Thanh toán thành công');
                                    setTimeout(() => {
                                          router.push('/books');
                                    }, 2000);
                              } else {
                                    toast.error('Có lỗi');
                              }
                        } catch (error) {
                              console.error('Error updating purchase:', error);
                              toast.error('Có lỗi');
                        }
                  }
            };

            updatePurchase();
      }, [userId, bookId, orderCode, router]);

      return (
            <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Đang xử lý thanh toán...</h1>
                        <p>Vui lòng không đóng trang này</p>
                  </div>
            </div>
      );
}

export default PaymentSuccess;
