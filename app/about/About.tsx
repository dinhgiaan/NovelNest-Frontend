import { FaBookOpen, FaBullseye, FaLightbulb } from 'react-icons/fa';
import { MdInfo, MdStar } from 'react-icons/md';
import AboutUs1 from '@/public/assets/about-us-1.png';
import Misson from '@/public/assets/misson.png';
import Vison from '@/public/assets/vison.png';
import CoreValues from '@/public/assets/core-values.png';
import Image from 'next/image';

const AboutPage = () => {
      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16">
                        <div className="flex flex-col items-center text-center mb-16">
                              <div className="flex items-center mb-6">
                                    <MdInfo className="text-4xl text-emerald-600 mr-3" />
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Về Chúng Tôi</h1>
                              </div>
                              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                                    Chào mừng bạn đến với NovelNest — không gian đọc sách trực tuyến và đặt sách tận nhà dành riêng cho cộng đồng yêu sách Việt Nam!
                              </p>
                        </div>

                        <div className="space-y-24">
                              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div className="order-2 md:order-1">
                                          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">NovelNest - Tổ Ấm Sách Của Bạn</h2>
                                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                Tại NovelNest, chúng tôi tin rằng mỗi cuốn sách là một thế giới, mỗi trang sách là một hành trình. Với mong muốn kết nối độc giả với những câu chuyện hay nhất, những kiến thức giá trị nhất, chúng tôi xây dựng nên nền tảng đọc sách hiện đại, dễ sử dụng, đa dạng thể loại và tiện lợi hơn bao giờ hết.
                                          </p>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Từ tiểu thuyết đến sách kinh doanh, từ tác phẩm kinh điển đến sách mới phát hành, NovelNest mang đến cho bạn thế giới văn học đa dạng chỉ trong một nền tảng duy nhất.
                                          </p>
                                    </div>
                                    <div className="order-1 md:order-2 flex justify-center">
                                          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                                                <Image
                                                      src={AboutUs1}
                                                      alt="Về NovelNest"
                                                      width={300}
                                                      height={200}
                                                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 bg-[#c0fbdc] dark:bg-[#c39aaa]"
                                                      loading="lazy"
                                                />
                                          </div>
                                    </div>
                              </section>

                              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div className="flex justify-center">
                                          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                                                <Image
                                                      src={Misson}
                                                      alt="Sứ mệnh của NovelNest"
                                                      width={300}
                                                      height={200}
                                                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 bg-[#c0fbdc] dark:bg-[#c39aaa]"
                                                      loading="lazy"
                                                />
                                          </div>
                                    </div>
                                    <div>
                                          <div className="flex items-center mb-6">
                                                <FaBookOpen className="text-3xl text-emerald-600 mr-3" />
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Sứ Mệnh Của Chúng Tôi</h2>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Mang đến cho cộng đồng yêu sách một không gian đọc sách trực tuyến chất lượng, thân thiện và đầy cảm hứng.
                                                Song song đó, chúng tôi phát triển dịch vụ đặt sách tận nhà, giúp bạn có thể vừa đọc online,
                                                vừa đặt những cuốn sách giấy yêu thích để thưởng thức tại nhà.
                                          </p>
                                    </div>
                              </section>

                              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div className="order-2 md:order-1">
                                          <div className="flex items-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tầm Nhìn</h2>
                                                <FaBullseye className="text-3xl text-emerald-600 ml-3" />
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Trở thành nền tảng đọc sách trực tuyến và giao sách tận nhà hàng đầu tại Việt Nam, nơi mọi người có thể tiếp cận với tri thức một cách dễ dàng, thuận tiện và đầy cảm hứng.
                                          </p>
                                    </div>
                                    <div className="order-1 md:order-2 flex justify-center">
                                          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                                                <Image
                                                      src={Vison}
                                                      alt="Tầm nhìn của NovelNest"
                                                      width={300}
                                                      height={200}
                                                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 bg-[#c0fbdc] dark:bg-[#c39aaa]"
                                                      loading="lazy"
                                                />
                                          </div>
                                    </div>
                              </section>

                              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                                    <div className="flex justify-center">
                                          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                                                <Image
                                                      src={CoreValues}
                                                      alt="Giá trị cốt lõi của NovelNest"
                                                      width={300}
                                                      height={200}
                                                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 bg-[#c0fbdc] dark:bg-[#c39aaa]"
                                                      loading="lazy"
                                                />
                                          </div>
                                    </div>
                                    <div>
                                          <div className="flex items-center mb-6">
                                                <FaLightbulb className="text-3xl text-emerald-600 mr-3" />
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Giá Trị Cốt Lõi</h2>
                                          </div>
                                          <ul className="space-y-4">
                                                <li className="flex items-start">
                                                      <MdStar className="text-xl text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                                                      <p className="text-gray-600 dark:text-gray-300">
                                                            <span className="font-medium">Chất lượng:</span> Nội dung sách được tuyển chọn kỹ lưỡng, đảm bảo bản quyền và nội dung chuẩn.
                                                      </p>
                                                </li>
                                                <li className="flex items-start">
                                                      <MdStar className="text-xl text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                                                      <p className="text-gray-600 dark:text-gray-300">
                                                            <span className="font-medium">Tiện lợi:</span> Đọc sách mọi lúc, mọi nơi, hoặc đặt giao tận nhà chỉ với vài cú nhấp.
                                                      </p>
                                                </li>
                                                <li className="flex items-start">
                                                      <MdStar className="text-xl text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                                                      <p className="text-gray-600 dark:text-gray-300">
                                                            <span className="font-medium">Kết nối:</span> Xây dựng cộng đồng yêu sách cùng chia sẻ, đánh giá và đề xuất sách hay.
                                                      </p>
                                                </li>
                                                <li className="flex items-start">
                                                      <MdStar className="text-xl text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                                                      <p className="text-gray-600 dark:text-gray-300">
                                                            <span className="font-medium">Truyền cảm hứng:</span> Khuyến khích mọi người nuôi dưỡng thói quen đọc sách và học hỏi mỗi ngày.
                                                      </p>
                                                </li>
                                          </ul>
                                    </div>
                              </section>
                        </div>
                  </div>
            </div>
      );
};

export default AboutPage;