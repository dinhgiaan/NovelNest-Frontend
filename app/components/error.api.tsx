import React from 'react';

const ErrorAPI = () => {
      return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#233b57] p-4">
                  <div className="text-center bg-red-100 dark:bg-red-800 border border-red-500 dark:border-red-700 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-red-600 dark:text-red-300">Không thể tải dữ liệu</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-200">
                              Vui lòng tải lại trang hoặc thử lại sau. Nếu lỗi vẫn tiếp tục, hãy gọi: 0856562424
                        </p>
                  </div>
            </div>
      );
};

export default ErrorAPI;