import React from 'react';
import Link from 'next/link';
import Heading from './utils/heading';

const NotFound = () => {
  return (<>
    <Heading
      title="Không tìm thấy trang"
      description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
      keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
    />
    <div className="min-h-svh bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>

        <div className="mb-8">
          <div className="h-1 w-32 bg-blue-500 mx-auto my-4"></div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-600 mb-8">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        <Link
          href="/"
          rel="preload"
          as={""}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  </>
  );
};

export default NotFound;