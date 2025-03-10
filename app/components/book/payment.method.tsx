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
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiInfoCircle } from 'react-icons/bi';
import { BsCash } from 'react-icons/bs';

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

      const paymentMethods = [
            {
                  id: 'COD',
                  name: 'Thanh toán khi nhận hàng (COD)',
                  description: 'Thanh toán tiền mặt khi nhận được hàng tại địa chỉ của bạn',
                  icon: <BsCash className="w-6 h-6 text-gray-600" />,
                  image: cod,
                  benefits: ['Kiểm tra hàng trước khi nhận', 'Không cần thanh toán trước']
            },
            {
                  id: 'MoMo',
                  name: 'Thanh toán với MoMo',
                  description: 'Thanh toán nhanh chóng và an toàn qua ví điện tử MoMo',
                  image: momo,
                  benefits: ['Hoàn tiền lên đến 100k', 'Xử lý tức thì']
            },
            {
                  id: 'PayOs',
                  name: 'Quét mã QR',
                  description: 'Hỗ trợ thanh toán qua thẻ ATM, Visa, Mastercard',
                  image: payOs,
                  benefits: ['Đa dạng phương thức', 'Bảo mật cao']
            },
            {
                  id: 'ZaloPay',
                  name: 'Thanh toán với ZaloPay',
                  description: 'Thanh toán tiện lợi qua ví ZaloPay',
                  image: zalopay,
                  benefits: ['Ưu đãi người dùng mới', 'Hoàn tiền ZaloPay']
            }
      ];

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
                  const userId = userInfo.user?._id;
                  const bookId = book._id;
                  const title = book.tile;
                  const author = book.author;
                  const rating = book.rating;
                  const thumbnail = book.thumbnail?._url;
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
            <div className="w-full max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6 mb-10">
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Phương thức thanh toán
                  </h2>

                  <div className="space-y-4">
                        {paymentMethods.map((method) => (
                              <div
                                    key={method.id}
                                    className={`relative rounded-lg transition-all duration-300 cursor-pointer
              ${selectedMethod === method.id
                                                ? 'bg-blue-50 border-2 border-blue-500'
                                                : 'bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md'
                                          }`}
                                    onClick={() => method.id === 'PayOs' ? handleGetPaymentLink() : handleSelect(method.id)}
                              >
                                    <div className="p-4">
                                          <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                      <Image
                                                            src={method.image}
                                                            className="w-14 h-14 object-contain"
                                                            alt={`${method.name} icon`}
                                                      />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                      <div className="flex items-center justify-between">
                                                            <h3 className="text-xs font-semibold text-gray-900">
                                                                  {method.name}
                                                            </h3>
                                                            {selectedMethod === method.id && (
                                                                  <FaRegCheckCircle className="w-5 h-5 text-blue-500" />
                                                            )}
                                                      </div>

                                                      <p className="mt-1 text-sm text-gray-500">
                                                            {method.description}
                                                      </p>

                                                      <div className="mt-2 flex flex-wrap gap-2">
                                                            {method.benefits.map((benefit, index) => (
                                                                  <span
                                                                        key={index}
                                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full"
                                                                  >
                                                                        <BiInfoCircle className="w-3 h-3 mr-1" />
                                                                        {benefit}
                                                                  </span>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default PaymentMethod;
