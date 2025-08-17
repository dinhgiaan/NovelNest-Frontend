import React, { useContext, useEffect, useState } from 'react';
import { Check, MoveLeft, Shield, Zap } from 'lucide-react';
import { usePayOS } from '@payos/payos-checkout';
import { AuthContext } from '@/app/context/auth.context';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCartStore } from '@/app/lib/store/cart.store';
import Image from 'next/image';
import ButtonBack from '../ui/button.back';
import formatPrice from '@/app/utils/convert.price';

interface PaymentItem {
      bookId: string;
      title: string;
      author: string;
      price: number;
      quantity: number;
      thumbnail: {
            url: string;
      };
}

interface IProps {
      book?: IBook;
      fromCart?: boolean;
}

interface PayOSSuccessEvent {
      orderCode?: string | undefined;
}

interface PayOSCancelEvent {
      reason?: string;
      [key: string]: unknown;
}

interface PayOSExitEvent {
      [key: string]: unknown;
}

interface PayOSConfig {
      RETURN_URL: string;
      ELEMENT_ID: string;
      CHECKOUT_URL: string;
      embedded: boolean;
      onSuccess: (event: PayOSSuccessEvent) => Promise<void> | void;
      onCancel: (event: PayOSCancelEvent) => void;
      onExit: (event: PayOSExitEvent) => void;
}

const PaymentMethod = ({ book, fromCart = false }: IProps) => {
      const router = useRouter();
      const [selectedMethod, setSelectedMethod] = useState('PayOs');
      const [isCreatingLink, setIsCreatingLink] = useState(false);
      const [message, setMessage] = useState("");
      const { userInfo } = useContext(AuthContext);
      const { items, clearCart } = useCartStore();

      const getFinalPrice = (book: IBook): number => {
            return book.promotionPrice && book.promotionPrice > 0
                  ? book.promotionPrice
                  : book.price;
      };

      const [payOSConfig, setPayOSConfig] = useState<PayOSConfig>({
            RETURN_URL: window.location.origin,
            ELEMENT_ID: "embedded-payment-container",
            CHECKOUT_URL: "",
            embedded: true,
            onSuccess: async (event: PayOSSuccessEvent) => {
                  setMessage("Thanh toán thành công");

                  let orderCode: string | undefined;

                  if (event?.orderCode) {
                        orderCode = String(event.orderCode);
                  }

                  if (!orderCode && typeof window !== 'undefined') {
                        const urlParams = new URLSearchParams(window.location.search);
                        const orderCodeFromUrl = urlParams.get('orderCode');
                        orderCode = orderCodeFromUrl ?? undefined;
                  }

                  const userId = userInfo.user?._id;

                  if (userId && orderCode) {
                        try {
                              let requestBody;

                              if (fromCart) {
                                    const paymentItems: PaymentItem[] = items.map(item => ({
                                          bookId: item.bookId,
                                          title: item.title,
                                          author: item.author,
                                          price: item.price,
                                          quantity: 1,
                                          thumbnail: item.thumbnail
                                    }));



                                    requestBody = {
                                          userId,
                                          orderCode: String(orderCode),
                                          items: paymentItems
                                    };
                              } else {
                                    if (!book) {
                                          setMessage("Không tìm thấy thông tin sách");
                                          return;
                                    }

                                    const finalPrice = getFinalPrice(book);

                                    requestBody = {
                                          userId,
                                          orderCode: String(orderCode),
                                          items: [{
                                                bookId: book._id,
                                                title: book.title,
                                                author: book.author,
                                                price: finalPrice,
                                                quantity: 1,
                                                thumbnail: book.thumbnail
                                          }]
                                    };
                              }

                              if (!requestBody.items || requestBody.items.length === 0) {
                                    setMessage("Không có sản phẩm để xử lý");
                                    return;
                              }

                              for (const item of requestBody.items) {
                                    if (!item.bookId || !item.title || !item.price) {
                                          setMessage("Thông tin sản phẩm không đầy đủ");
                                          return;
                                    }
                              }

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

                              const result = await response.json();

                              if (response.ok && result.success) {
                                    if (fromCart) {
                                          clearCart();
                                    }
                                    toast.success(result.message || "Thanh toán thành công!");

                                    setTimeout(() => {
                                          router.push('/');
                                    }, 2000);
                              } else {
                                    setMessage(result.message || "Có lỗi xảy ra khi cập nhật thông tin mua sách");
                                    toast.error(result.message || "Có lỗi xảy ra khi cập nhật thông tin mua sách");
                              }
                        } catch (error) {
                              setMessage("Có lỗi xảy ra khi cập nhật thông tin mua sách");
                              toast.error(`Có lỗi xảy ra khi cập nhật thông tin mua sách ${error}`);
                        }
                  } else {
                        setMessage("Thiếu thông tin cần thiết để xử lý thanh toán");
                  }
            },
            onCancel: (event: PayOSCancelEvent): void => {
                  const cancelReason = event.reason || "Không xác định";
                  setMessage("Thanh toán đã bị hủy");
                  toast.error(`Thanh toán đã bị hủy: ${cancelReason}`);
            },
            onExit: (event: PayOSExitEvent) => {
                  setMessage("Thoát khỏi quá trình thanh toán");
                  toast.error(`Thoát khỏi quá trình thanh toán: ${event}`);
            }
      });

      const { open } = usePayOS(payOSConfig);

      const handleGetPaymentLink = async () => {
            if (!userInfo?.user?._id) {
                  toast.error('Vui lòng đăng nhập để thanh toán');
                  return;
            }

            setIsCreatingLink(true);

            try {
                  let requestBody;

                  if (fromCart) {
                        if (items.length === 0) {
                              toast.error('Giỏ hàng trống');
                              setIsCreatingLink(false);
                              return;
                        }

                        for (const item of items) {
                              if (!item.bookId || !item.title || !item.price) {
                                    toast.error(`Thông tin sản phẩm "${item.title || 'không xác định'}" không đầy đủ`);
                                    setIsCreatingLink(false);
                                    return;
                              }
                        }

                        const paymentItems: PaymentItem[] = items.map(item => ({
                              bookId: item.bookId,
                              title: item.title,
                              author: item.author,
                              price: item.price,
                              quantity: 1,
                              thumbnail: item.thumbnail
                        }));

                        requestBody = {
                              items: paymentItems,
                              userId: userInfo.user._id
                        };

                  } else {
                        if (!book) {
                              toast.error('Không tìm thấy thông tin sách');
                              setIsCreatingLink(false);
                              return;
                        }

                        const finalPrice = getFinalPrice(book);

                        requestBody = {
                              items: [{
                                    bookId: book._id,
                                    title: book.title,
                                    author: book.author,
                                    price: finalPrice,
                                    quantity: 1,
                                    thumbnail: book.thumbnail
                              }],
                              userId: userInfo.user._id
                        };
                  }

                  const response = await fetch(
                        "http://localhost:8888/api/v1/payments/create-embedded-payment-link",
                        {
                              method: "POST",
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(requestBody)
                        }
                  );

                  if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Server doesn't respond");
                  }

                  const result = await response.json();

                  if (result.success && result.checkoutUrl) {
                        setPayOSConfig(prev => ({
                              ...prev,
                              CHECKOUT_URL: result.checkoutUrl
                        }));

                        window.location.href = result.checkoutUrl;
                  } else {
                        throw new Error(result.message || "Không thể tạo link thanh toán");
                  }
            } catch (error) {
                  const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo link thanh toán';
                  toast.error(errorMessage);
            } finally {
                  setIsCreatingLink(false);
            }
      };

      useEffect(() => {
            if (payOSConfig.CHECKOUT_URL != null) {
                  open();
            }
      }, [payOSConfig, open]);

      const getTotalAmount = (): number => {
            if (fromCart) {
                  return items.reduce((total, item) => total + item.price, 0);
            }
            return book ? getFinalPrice(book) : 0;
      };

      const getDisplayInfo = () => {
            if (fromCart) {
                  const totalItems = items.length;
                  return {
                        title: `${totalItems} sản phẩm`,
                        items: items.map(item => ({
                              title: item.title,
                              author: item.author,
                              quantity: 1,
                              originalPrice: item.promotionPrice && item.promotionPrice < item.price ? item.price : null,
                              finalPrice: item.price,
                              hasPromotion: item.promotionPrice && item.promotionPrice < item.price
                        }))
                  };
            } else {
                  if (!book) return { title: 'Sản phẩm', items: [] };

                  const finalPrice = getFinalPrice(book);
                  const hasPromotion = book.promotionPrice && book.promotionPrice > 0 && book.promotionPrice < book.price;

                  return {
                        title: book?.title || 'Sản phẩm',
                        items: [{
                              title: book?.title || '',
                              author: book?.author || '',
                              quantity: 1,
                              originalPrice: hasPromotion ? book.price : null,
                              finalPrice: finalPrice,
                              hasPromotion: hasPromotion
                        }]
                  };
            }
      };

      const displayInfo = getDisplayInfo();

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24] py-8 px-4">
                  <div className='max-w-md mx-auto pt-14'>
                        <ButtonBack className='flex space-x-2 items-center text-[#7c7878] hover:text-[#e1dede]'>
                              <MoveLeft size={15} />
                              <span>Quay lại</span>
                        </ButtonBack>
                  </div>
                  <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-center text-center mb-3">
                              <h1 className="text-xl font-semibold text-slate-900 dark:text-gray-200">Tóm tắt đơn hàng</h1>
                        </div>

                        <div className="bg-white rounded-md p-6 shadow-sm border border-slate-200/60 mb-6">
                              <div className="space-y-3">
                                    {displayInfo.items.map((item, index) => (
                                          <div key={index} className="flex justify-between items-center">
                                                <div>
                                                      <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                                                      {item.author && (
                                                            <p className="text-xs text-slate-500">Tác giả: {item.author}</p>
                                                      )}
                                                </div>
                                                <div className="text-right">
                                                      {item.hasPromotion && item.originalPrice && (
                                                            <p className="font-semibold text-slate-500 text-xs line-through">
                                                                  {formatPrice(item.originalPrice)}
                                                            </p>
                                                      )}
                                                      <p className="font-semibold text-slate-900 text-xs">
                                                            {formatPrice(item.finalPrice)}
                                                      </p>
                                                </div>
                                          </div>
                                    ))}
                              </div>

                              <div className="border-t border-slate-300 mt-4 pt-4">
                                    <div className="flex justify-between items-center">
                                          <p className="font-semibold text-slate-900">Tổng cộng</p>
                                          <p className="font-bold text-lg text-slate-900">{formatPrice(getTotalAmount())}</p>
                                    </div>
                              </div>
                        </div>

                        <div className="bg-white rounded-md shadow-sm border border-slate-200/60 overflow-hidden mb-6">
                              <div className="p-6 pb-1">
                                    <h2 className="text-sm font-medium text-slate-600 mb-4">Phương thức thanh toán</h2>
                              </div>

                              <div
                                    className={`mx-6 mb-6 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${selectedMethod === 'PayOs'
                                          ? 'border-blue-500 bg-[#e4edf4]'
                                          : 'border-slate-200 hover:border-slate-300'
                                          }`}
                                    onClick={() => setSelectedMethod('PayOs')}
                              >
                                    <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                                      <Image src={'/assets/payment.payos.webp'} width={50} height={50} alt='PayOS' />
                                                </div>
                                                <div>
                                                      <h3 className="font-semibold text-slate-900 text-sm">PayOS</h3>
                                                      <p className="text-xs text-slate-500">Quét mã QR</p>
                                                </div>
                                          </div>
                                          {selectedMethod === 'PayOs' && (
                                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                      <Check className="w-3 h-3 text-white" />
                                                </div>
                                          )}
                                    </div>

                                    <div className="flex space-x-2">
                                          <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-md">
                                                <Shield className="w-3 h-3 text-slate-600" />
                                                <span className="text-xs text-slate-600 font-medium">Bảo mật</span>
                                          </div>
                                          <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-md">
                                                <Zap className="w-3 h-3 text-slate-600" />
                                                <span className="text-xs text-slate-600 font-medium">Nhanh chóng</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <button
                              onClick={handleGetPaymentLink}
                              disabled={isCreatingLink}
                              className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-200 ${isCreatingLink
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-[#475569] hover:bg-slate-800 active:scale-[0.98]'
                                    }`}
                        >
                              {isCreatingLink ? (
                                    <div className="flex items-center justify-center space-x-2">
                                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                          <span>Đang xử lý...</span>
                                    </div>
                              ) : (
                                    `Thanh toán ${formatPrice(getTotalAmount())}`
                              )}
                        </button>

                        {message && (
                              <div className={`mt-4 p-4 border rounded-xl ${message.includes('thành công')
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                                    }`}>
                                    <p className={`text-sm text-center ${message.includes('thành công')
                                          ? 'text-green-800'
                                          : 'text-red-800'
                                          }`}>{message}</p>
                              </div>
                        )}

                        {/* Embedded PayOS checkout container */}
                        <div id="embedded-payment-container" className="mt-4"></div>
                  </div>
            </div>
      );
};

export default PaymentMethod;