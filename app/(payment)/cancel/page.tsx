import { FaRegFaceSadTear } from 'react-icons/fa6';

const Page = () => {
      return (
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                  <div className='py-16'>
                        <div className="flex flex-col items-center py-16 px-6 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all hover:shadow-xl">
                              <div>
                                    <FaRegFaceSadTear className="text-[#e44444] dark:text-[#ff7676]" size={85} />
                              </div>
                              <div className="text-center space-y-4">
                                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                          Đơn hàng đã bị hủy!
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                          Rất tiếc khi phải tạm biệt đơn hàng này. Nhưng đừng lo, chúng mình luôn cập nhật những cuốn sách hay nhất.
                                          <br />Hãy theo dõi chúng mình để không bỏ lỡ bất kỳ sản phẩm mới nào nhé!
                                    </p>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Page;
