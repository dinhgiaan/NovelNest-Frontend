import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { verifyAPI } from '@/app/lib/api/auth';
import toast from 'react-hot-toast';

interface OtpModalProps {
      isModalOtpOpen: boolean;
      setIsModalOtpOpen: (value: boolean) => void;
      title?: string;
      description?: string;
      length?: number;
      email: string;
}

const OtpModal: React.FC<OtpModalProps> = ({
      isModalOtpOpen,
      setIsModalOtpOpen,
      title = "Xác thực OTP",
      description,
      length = 4,
}) => {
      const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
      const router = useRouter();

      // Reset state when modal opens
      useEffect(() => {
            if (isModalOtpOpen) {
                  setOtp(new Array(length).fill(''));
                  setError('');
                  setIsLoading(false);
                  // Focus first input after modal animation
                  setTimeout(() => inputRefs.current[0]?.focus(), 100);
            }
      }, [isModalOtpOpen, length]);

      const handleChange = (index: number, value: string) => {
            if (!/^\d*$/.test(value)) return;

            setError(''); // Clear error when user types
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            if (value && index < length - 1) {
                  inputRefs.current[index + 1]?.focus();
            }
      };

      const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Backspace') {
                  e.preventDefault();
                  const newOtp = [...otp];

                  if (otp[index]) {
                        newOtp[index] = '';
                        setOtp(newOtp);
                  } else if (index > 0) {
                        newOtp[index - 1] = '';
                        setOtp(newOtp);
                        inputRefs.current[index - 1]?.focus();
                  }
            }
      };

      const handlePaste = (e: React.ClipboardEvent) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

            if (pastedData.length >= length) {
                  const newOtp = pastedData.slice(0, length).split('');
                  setOtp(newOtp);
                  inputRefs.current[length - 1]?.focus();
            }
      };

      const handleSubmit = async () => {
            const otpValue = otp.join('');

            if (otpValue.length !== length) {
                  setError(`Vui lòng nhập đầy đủ ${length} số`);
                  return;
            }

            setIsLoading(true);
            setError('');

            try {
                  const res = await verifyAPI({ otp: { code: otpValue } });
                  console.log('--> check res: ', res);
                  if (res.success === true) {
                        toast.success("Độc giả đã tạo tài khoản thành công 🌻");
                        setIsModalOtpOpen(false);
                        router.push('/login')
                  } else {
                        toast.error(res?.message);
                  }
            } catch (err) {
                  setError('Mã OTP không hợp lệ. Vui lòng thử lại.');
            } finally {
                  setIsLoading(false);
            }
      };

      const handleClose = () => {
            if (!isLoading) {
                  setIsModalOtpOpen(false);
            }
      };

      const handleBackdropClick = (e: React.MouseEvent) => {
            if (e.target === e.currentTarget && !isLoading) {
                  handleClose();
            }
      };

      const isComplete = otp.every(val => val !== '');

      if (!isModalOtpOpen) return null;

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={handleBackdropClick}
                  />

                  {/* Modal */}
                  <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 text-center border-b border-gray-100">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                              </div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {/* OTP Input */}
                        <div className="px-6 py-6">
                              <div className="flex justify-center gap-3 mb-6">
                                    {Array.from({ length }, (_, i) => (
                                          <input
                                                key={i}
                                                ref={(el) => (inputRefs.current[i] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={otp[i]}
                                                onChange={(e) => handleChange(i, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                onPaste={handlePaste}
                                                disabled={isLoading}
                                                className={`
                  w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200
                  ${otp[i]
                                                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                      }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}
                  focus:outline-none
                `}
                                          />
                                    ))}
                              </div>

                              {/* Error Message */}
                              {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                          <div className="flex items-center">
                                                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm text-red-700">{error}</span>
                                          </div>
                                    </div>
                              )}

                              {/* Action Buttons */}
                              <div className="space-y-3">
                                    <button
                                          onClick={handleSubmit}
                                          disabled={!isComplete || isLoading}
                                          className={`
                w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200
                ${isComplete && !isLoading
                                                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                                                      : 'bg-gray-300 cursor-not-allowed'
                                                }
                focus:outline-none focus:ring-4 focus:ring-blue-100
              `}
                                    >
                                          {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                      </svg>
                                                      Đang xác thực...
                                                </div>
                                          ) : (
                                                'Xác nhận'
                                          )}
                                    </button>

                                    <button
                                          onClick={handleClose}
                                          disabled={isLoading}
                                          className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${isLoading
                                                      ? 'text-gray-400 cursor-not-allowed'
                                                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                                }
              `}
                                    >
                                          Hủy bỏ
                                    </button>
                              </div>
                        </div>

                        <div className="px-6 pb-6 text-center border-t border-gray-100 pt-4">
                              <p className="text-sm text-gray-500">
                                    Chưa nhận được mã?{' '}
                                    <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                                          Gửi lại
                                    </button>
                              </p>
                        </div>
                  </div>
            </div>
      );
};

export default OtpModal;