import { Book, Coffee, Users, Star, Award, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24]">
                  <div className="h-10"></div>
                  <div className="py-12 px-6">
                        <div className="max-w-4xl mx-auto">
                              <h1 className="text-4xl lg:text-5xl font-mono text-amber-900 dark:text-amber-100 mb-4">
                                    Về NovelNest - Nền tảng đọc sách online hàng đầu Việt Nam
                              </h1>
                              <p className="text-xl text-amber-700 dark:text-amber-200 font-light mb-6">
                                    Khám phá câu chuyện ra đời của NovelNest và hành trình xây dựng cộng đồng yêu sách Việt Nam.
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                          <Star className="w-4 h-4 text-yellow-500" />
                                          <span>Được tin tưởng bởi hàng nghìn độc giả</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <Award className="w-4 h-4 text-emerald-500" />
                                          <span>Thư viện sách chất lượng cao</span>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="max-w-4xl mx-auto px-6 pb-20">
                        <section className="mb-16">
                              <div className="bg-[#e1c6c6] dark:bg-slate-700 p-8 rounded-lg shadow-sm">
                                    <div className="flex items-start gap-4 mb-6">
                                          <Coffee className="w-8 h-8 text-amber-600 -mt-1 flex-shrink-0" />
                                          <div>
                                                <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                                                      Câu chuyện khởi nguồn từ quán cà phê Sài Gòn
                                                </h2>
                                                <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                                                      <p>
                                                            Vào tháng 12 năm 2024, trong không gian yên bình của một quán cà phê nhỏ giữa lòng <strong>Sài Gòn</strong>, tôi chợt lắng đọng và hồi tưởng về những trang sách đã dìu dắt mình qua bao thăng trầm cuộc sống. Hơn cả tri thức, chúng còn mở ra những chân trời mới, giúp tôi thấu hiểu sâu sắc hơn về thế giới rộng lớn và chính bản thân mình.
                                                      </p>
                                                      <p>
                                                            Ước vọng của tôi luôn là xây dựng một <strong>không gian đọc sách trực tuyến</strong> nơi tri thức được lan tỏa, nơi mỗi người có thể dễ dàng tiếp cận những tác phẩm chất lượng. Từ trăn trở đó, <strong>nền tảng đọc sách số NovelNest</strong> đã ra đời.
                                                      </p>
                                                      <p>
                                                            Đây không chỉ là một <Link href="/books" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">thư viện sách online</Link> tiện lợi, mà còn là nơi tôn vinh giá trị tri thức và bản quyền. Tại đây, độc giả có thể tự do lựa chọn, thanh toán và đắm mình vào những tác phẩm giá trị. Quan trọng hơn, mỗi giao dịch đều là một sự ủng hộ thiết thực dành cho tác giả, góp phần nuôi dưỡng và phát triển một hệ sinh thái tri thức bền vững.
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <section className="mb-16">
                              <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-8 text-center">
                                    Tại sao chọn NovelNest để đọc sách trực tuyến?
                              </h2>
                              <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg">
                                          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
                                                Đọc sách không chỉ là thú vui
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300 mb-10">
                                                Tôi tin rằng <strong>sách là cầu nối giữa các thế hệ</strong>, là nơi lưu giữ trí tuệ và cảm xúc. Mỗi cuốn sách đều có thể thay đổi một con người. NovelNest cam kết mang đến những tác phẩm chất lượng nhất.
                                          </p>
                                          <div className="relative w-auto h-56 overflow-hidden rounded-lg shadow-md">
                                                <Image
                                                      src="/assets/about1.webp"
                                                      alt="Người đọc sách trong không gian yên tĩnh - NovelNest mang đến trải nghiệm đọc sách số tuyệt vời"
                                                      fill
                                                      className="object-cover"
                                                      sizes="(max-width: 768px) 100vw, 50vw"
                                                      priority
                                                />
                                          </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
                                                Cộng đồng yêu sách Việt Nam
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300 mb-10">
                                                Một cuốn sách hay trở nên ý nghĩa hơn khi được chia sẻ. Tôi muốn tạo ra không gian để <strong>cộng đồng độc giả Việt Nam</strong> kết nối qua những trang sách, chia sẻ cảm nhận và học hỏi lẫn nhau.
                                          </p>
                                          <div className="relative w-auto h-56 overflow-hidden rounded-lg shadow-md">
                                                <Image
                                                      src="/assets/about2.webp"
                                                      alt="Cộng đồng người đọc sách trao đổi và chia sẻ - NovelNest xây dựng cộng đồng yêu sách"
                                                      fill
                                                      className="object-cover"
                                                      sizes="(max-width: 768px) 100vw, 50vw"
                                                      priority
                                                />
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <section className="mb-16">
                              <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-8 text-center">
                                    NovelNest cung cấp những gì?
                              </h2>

                              <div className="space-y-6">
                                    <div className="border-l-4 border-amber-400 pl-6 py-2 bg-[#f9f2f9] dark:bg-slate-700 rounded-r-lg p-6">
                                          <div className="flex items-center gap-3 mb-3">
                                                <Book className="w-6 h-6 text-amber-600" />
                                                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                                                      Thư viện sách online chất lượng cao
                                                </h3>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                <strong>Hàng nghìn cuốn sách được tuyển chọn kỹ</strong> từ văn học Việt Nam đến tác phẩm quốc tế, từ kinh điển đến hiện đại. Đọc <strong>sách điện tử</strong> bất cứ lúc nào, trên mọi thiết bị với trải nghiệm mượt mà.
                                          </p>
                                    </div>

                                    <div className="border-l-4 border-emerald-400 pl-6 py-2 bg-[#f9f2f9] dark:bg-slate-700 rounded-r-lg p-6">
                                          <div className="flex items-center gap-3 mb-3">
                                                <Zap className="w-6 h-6 text-emerald-600" />
                                                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                                                      Trải nghiệm đọc sách số tuyệt vời
                                                </h3>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Giao diện đọc thoải mái cho mắt, tùy chỉnh font chữ, kích thước, màu nền theo sở thích. <strong>Đồng bộ tiến độ đọc</strong> trên tất cả thiết bị của bạn, hỗ trợ đọc offline.
                                          </p>
                                    </div>

                                    <div className="border-l-4 border-blue-400 pl-6 py-2 bg-[#f9f2f9] dark:bg-slate-700 rounded-r-lg p-6">
                                          <div className="flex items-center gap-3 mb-3">
                                                <Users className="w-6 h-6 text-blue-600" />
                                                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                                                      Cộng đồng độc giả năng động
                                                </h3>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Chia sẻ cảm nhận, đánh giá sách, trao đổi với những độc giả khác trong cộng đồng NovelNest. Nhận gợi ý sách phù hợp với sở thích cá nhân.
                                          </p>
                                    </div>

                                    <div className="border-l-4 border-purple-400 pl-6 py-2 bg-[#f9f2f9] dark:bg-slate-700 rounded-r-lg p-6">
                                          <div className="flex items-center gap-3 mb-3">
                                                <Shield className="w-6 h-6 text-purple-600" />
                                                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                                                      Bảo vệ bản quyền tác giả
                                                </h3>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                <strong>Tôn trọng và bảo vệ bản quyền</strong> của các tác giả, nhà xuất bản. Mỗi lượt mua sách đều đóng góp trực tiếp cho người sáng tạo, khuyến khích phát triển văn học Việt Nam.
                                          </p>
                                    </div>
                              </div>
                        </section>

                        <section className="mb-16">
                              <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-lg">
                                    <div className="mb-6">
                                          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                                                Cam kết của NovelNest
                                          </h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
                                          <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Với độc giả</h3>
                                                <p>Luôn mang đến những <strong>cuốn sách chất lượng nhất</strong>, giao diện thân thiện, và dịch vụ tận tâm. Không spam, không quảng cáo phiền toái. Bảo mật thông tin cá nhân tuyệt đối.</p>
                                          </div>
                                          <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Với tác giả</h3>
                                                <p><strong>Tôn trọng bản quyền</strong>, hỗ trợ các tác giả Việt Nam, và tạo cầu nối giữa người viết và người đọc. Chia sẻ doanh thu công bằng, minh bạch.</p>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <section className="text-center">
                              <div className="max-w-3xl mx-auto">
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                                          &quot;NovelNest tin rằng những cuốn sách hay xứng đáng được đầu tư và trải nghiệm một cách tốt nhất. Đó là lý do tại sao chúng tôi tạo ra một <strong>thư viện sách số chất lượng</strong>, nơi mỗi cuốn sách đều được tuyển chọn kỹ lưỡng và mang đến trải nghiệm đọc tuyệt vời.&quot;
                                    </p>
                                    <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-6"></div>
                                    <p className="text-amber-700 dark:text-amber-200 font-medium mb-4">
                                          Cảm ơn bạn đã dành thời gian để hiểu về NovelNest.
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                                          Giờ thì... hãy cùng đọc sách nhé! 📚
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                          <Link href="/books">
                                                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                                                      Khám phá thư viện sách
                                                </button>
                                          </Link>
                                          <Link href="/register">
                                                <button className="border-2 border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                                                      Đăng ký miễn phí
                                                </button>
                                          </Link>
                                    </div>
                              </div>
                        </section>
                  </div>
            </div>
      );
}

export default AboutPage;
