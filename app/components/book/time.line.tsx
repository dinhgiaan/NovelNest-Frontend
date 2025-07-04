'use client'

import { useContext, useState } from 'react';
import InfoBuy from './info.buy';
import PaymentMethod from './payment.method';
import { AuthContext } from '@/app/context/auth.context';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { LuBan } from 'react-icons/lu';

interface IProps {
      book: any
}

const PurchaseTimeline = ({ book }: IProps) => {
      const [currentStep, setCurrentStep] = useState(1);
      const { userInfo } = useContext(AuthContext);

      const steps = [
            // { id: 1, label: 'Hình thức sách' },
            { id: 1, label: 'Xác nhận thông tin' },
            { id: 2, label: 'Thanh toán' },
      ];

      return (
            <div className="flex flex-col min-h-screen">
                  <div className="flex items-center w-full max-w-4xl mx-auto px-4">
                        {steps.map((step, index) => (
                              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                                    <div className="flex items-center w-full justify-center">
                                          <div
                                                className={`flex items-center justify-center rounded-full w-12 h-12 text-white z-10
                ${currentStep === step.id ? 'bg-blue-500' : currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}
                                          >
                                                {step.id}
                                          </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                          <div
                                                className={`absolute top-6 left-1/2 w-full h-1
                ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}
                                          ></div>
                                    )}
                                    <p
                                          className={`text-sm font-medium mt-2 text-center w-full px-2
              ${currentStep === step.id ? 'text-[#54d7ff]' : currentStep > step.id ? 'text-green-500' : 'text-gray-300'}`}
                                    >
                                          {step.label}
                                    </p>
                              </div>
                        ))}
                  </div>

                  <div className="flex-grow mt-7">
                        {/* {currentStep == 1 ? <PurchaseType purchaseType={purchaseType} setPurchaseType={setPurchaseType} /> : ""} */}
                        {currentStep == 1 ? <InfoBuy book={book} userInfo={userInfo} /> : ""}
                        {currentStep == 2 ? <PaymentMethod book={book} /> : ""}
                  </div>

                  <div className="sticky bottom-5 shadow-top flex justify-around w-full">
                        <button
                              className={`flex justify-center items-center px-3 py-2 bg-gray-500 text-white rounded text-xs ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                              disabled={currentStep === 1}
                              onClick={() => setCurrentStep((prev) => prev - 1)}
                        >
                              {currentStep === 1 ? (
                                    <>
                                          <LuBan size={15} className="mr-1" /> Vô hiệu
                                    </>
                              ) : (
                                    <>
                                          <IoIosArrowRoundBack size={15} className="mr-1" /> Quay lại
                                    </>
                              )}
                        </button>

                        <button
                              className={`flex justify-center items-center px-3 py-2 bg-blue-500 text-white rounded text-xs ${currentStep === steps.length ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                              disabled={currentStep === steps.length}
                              onClick={() => {
                                    // if (!purchaseType) {
                                    //       toast.error('Chọn một trong ba hình thức sách trước khi tiếp tục', {
                                    //             duration: 4000,
                                    //             position: 'top-center',
                                    //       });
                                    //       return;
                                    // }
                                    setCurrentStep((prev) => prev + 1);
                              }}
                        >
                              {currentStep === steps.length ? (
                                    <>
                                          <LuBan size={15} className="mr-1" /> Vô hiệu
                                    </>
                              ) : (
                                    <>
                                          Tiếp theo <IoIosArrowRoundForward size={15} className="ml-1" />
                                    </>
                              )}
                        </button>
                  </div>
            </div>
      );
};

export default PurchaseTimeline;