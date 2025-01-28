import { useContext, useEffect, useState } from 'react';
import cod from '@/app/public/payment.cash.webp';
import momo from '@/app/public/payment.momo.webp';
import payOs from '@/app/public/payment.payos.webp';
import zalopay from '@/app/public/payment.zalopay.webp';
import Image from 'next/image';
import { usePayOS } from '@payos/payos-checkout';
import { AuthContext } from '@/app/context/auth.context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IProps {
      book: any;
}

const PaymentMethod = ({ book }: IProps) => {
      const router = useRouter();
      const [selectedMethod, setSelectedMethod] = useState<string>('');
      const [isOpen, setIsOpen] = useState(false);
      const [message, setMessage] = useState("");
      const [isCreatingLink, setIsCreatingLink] = useState(false);
      const { userInfo } = useContext(AuthContext);

      const handleSelect = (method: string) => {
            setSelectedMethod(method);
      };

      const [payOSConfig, setPayOSConfig] = useState({
            RETURN_URL: window.location.origin, // required
            ELEMENT_ID: "embedded-payment-container", // required
            CHECKOUT_URL: null, // required
            embedded: true, // Nếu dùng giao diện nhúng
            onSuccess: async (event) => {
                  setIsOpen(false);
                  setMessage("Thanh toán thành công");

                  // After successful payment, redirect to success page
                  const params = new URLSearchParams(window.location.search);
                  const userId = userInfo.user?._id
                  const bookId = book._id
                  const orderCode = params.get('orderCode');

                  if (userId && bookId && orderCode) {
                        try {
                              const response = await fetch('/api/v1/payments/success', {
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

                              if (response.ok) {
                                    router.push('/');
                              } else {
                                    setMessage("Có lỗi xảy ra khi cập nhật thông tin mua sách");
                              }
                        } catch (error) {
                              console.error("Error updating purchase:", error);
                              setMessage("Có lỗi xảy ra khi cập nhật thông tin mua sách");
                        }
                  }
            }
      });

      const { open, exit } = usePayOS(payOSConfig);

      const handleGetPaymentLink = async () => {
            setIsCreatingLink(true);

            try {
                  const response = await fetch(
                        "http://localhost:8888/api/v1/payments/create-embedded-payment-link",
                        {
                              method: "POST",
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                    name: book.title,
                                    price: book.price,
                                    quantity: 1,
                                    userId: userInfo.user?._id,
                                    bookId: book._id
                              })
                        }
                  );

                  if (!response.ok) {
                        throw new Error("Server doesn't respond");
                  }

                  const result = await response.json();

                  if (result.checkoutUrl) {
                        window.location.href = result.checkoutUrl;
                  }
            } catch (error) {
                  console.error("Error creating payment link:", error);
                  toast.error('Có lỗi');
            } finally {
                  setIsCreatingLink(false);
            }
      };

      useEffect(() => {
            if (payOSConfig.CHECKOUT_URL != null) {
                  open();
            }
      }, [payOSConfig]);

      return (
            <div className='w-full mt-10 space-y-6 p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto' >
                  <h2 className='text-lg font-bold text-center mb-4 text-[#211f1f]'>Phương thức thanh toán</h2>

                  {/* Phương thức COD */}
                  <div
                        className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 cursor-pointer border 
                        ${selectedMethod === 'COD' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-slate-50'}`}
                        onClick={() => handleSelect('COD')}
                  >
                        <Image
                              src={cod}
                              className='w-12 h-12'
                              alt='COD Method'
                        />
                        <span className='text-sm font-medium text-gray-700'>Thanh toán khi nhận hàng {'(COD)'}</span>
                  </div >

                  {/* Phương thức MoMo */}
                  <div
                        className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 cursor-pointer border 
                        ${selectedMethod === 'MoMo' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-slate-50'}`}
                        onClick={() => handleSelect('MoMo')}
                  >
                        <Image
                              src={momo}
                              className='w-12 h-12'
                              alt='MoMo Method'
                        />
                        <span className='text-sm font-medium text-gray-700'>Thanh toán với MoMo</span>
                  </div >

                  {/* Phương thức PayOs */}
                  <div
                        className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 cursor-pointer border 
                        ${selectedMethod === 'PayOs' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-slate-50'}`}
                        onClick={() => handleSelect('PayOs')}
                  >
                        <div
                              className='flex items-center space-x-4 p-4'
                              onClick={(event) => {
                                    event.preventDefault();
                                    handleGetPaymentLink();
                              }}
                        >
                              <Image
                                    src={payOs}
                                    className='w-12 h-12'
                                    alt='PayOs Method'
                              />
                              <span className='text-sm font-medium text-gray-700'>Thanh toán với PayOs</span>
                        </div>
                  </div >

                  {/* Phương thức ZaloPay */}
                  <div
                        className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 cursor-pointer border 
                        ${selectedMethod === 'ZaloPay' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-slate-50'}`}
                        onClick={() => handleSelect('ZaloPay')}
                  >
                        <Image
                              src={zalopay}
                              className='w-12 h-12'
                              alt='ZaloPay Method'
                        />
                        <span className='text-sm font-medium text-gray-700'>Thanh toán với ZaloPay</span>
                  </div >
            </div >
      );
};

export default PaymentMethod;
