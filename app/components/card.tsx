import Image from 'next/image';
import image from '../public/book1.png';

const CardBook = () => {
      // Dữ liệu 3 cuốn sách
      const books = [
            { rank: 2, name: 'Cuốn Theo Chiều Gió', sales: 1800, image },
            { rank: 1, name: 'Những Vì Sao', sales: 1500, image },
            { rank: 3, name: 'Đồi Gió Hú', sales: 1000, image }
      ];

      return (
            <div className="w-full px-4 mb-24">
                  <div>
                        <p className="text-[23px] dark:text-white text-black text-center mb-10">
                              Những Cuốn Sách Bán Chạy Nhất
                        </p>

                        {/* Sắp xếp thẻ sách */}
                        <div className="flex justify-center gap-8">
                              {books.map((book) => (
                                    <div
                                          key={book.rank}
                                          className={`border rounded-md shadow-md p-4 w-[180px] flex flex-col items-center transition-transform duration-300 ${book.rank === 1
                                                ? 'border-yellow-500 bg-yellow-50 transform translate-y-[-40px] border-l-4 relative'
                                                : 'border-gray-300 bg-white'
                                                }`}
                                    >
                                          {book.rank === 1 && (
                                                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-[8px] font-bold rounded-full">
                                                      BÁN CHẠY
                                                </div>
                                          )}

                                          <div
                                                className={`text-sm font-bold mb-2 ${book.rank === 1
                                                      ? 'text-yellow-600'
                                                      : 'text-gray-700'
                                                      }`}
                                          >
                                                {book.rank === 1
                                                      ? '1st'
                                                      : book.rank === 2
                                                            ? '2nd'
                                                            : '3rd'}
                                          </div>

                                          <Image
                                                src={book.image}
                                                alt={`Book: ${book.name}`}
                                                width={150}
                                                height={200}
                                                className="object-cover rounded-md"
                                                priority
                                          />

                                          <div className="mt-2 text-center">
                                                <div className="text-xs font-medium text-black">
                                                      {book.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                      Lượt bán: {book.sales}
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default CardBook;
