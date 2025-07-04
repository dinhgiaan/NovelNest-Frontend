import { Book, Coffee, Heart, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
      title: 'Câu chuyện của tôi - NovelNest',
      description: 'Khởi nguồn từ tình yêu sách và mong muốn chia sẻ niềm đam mê đọc với mọi người.',
};

const AboutPage = () => {
      return (
            <div className="min-h-screen bg-gradient-to-b from-stone-100 to-green-50 dark:from-[#233b57] dark:to-[#1a2a3e]">

                  {/* Header đơn giản */}
                  <div className="pt-20 pb-12 px-6">
                        <div className="max-w-4xl mx-auto">
                              <h1 className="text-5xl font-serif text-amber-900 dark:text-amber-100 mb-4">
                                    Chào bạn,
                              </h1>
                              <p className="text-xl text-amber-700 dark:text-amber-200 font-light">
                                    Đây là câu chuyện về hành trình của tôi và lý do NovelNest ra đời.
                              </p>
                        </div>
                  </div>

                  {/* Nội dung chính */}
                  <div className="max-w-4xl mx-auto px-6 pb-20">

                        {/* Câu chuyện khởi đầu */}
                        <section className="mb-16">
                              <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-sm">
                                    <div className="flex items-start gap-4 mb-6">
                                          <Coffee className="w-8 h-8 text-amber-600 -mt-1 flex-shrink-0" />
                                          <div>
                                                <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                                                      Tất cả bắt đầu từ một tách cà phê
                                                </h2>
                                                <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                                                      <p>
                                                            Năm 2025, trong không gian yên bình của một quán cà phê nhỏ giữa lòng Sài Gòn, tôi chợt lắng đọng và hồi tưởng về những trang sách đã dìu dắt mình qua bao thăng trầm cuộc sống. Hơn cả tri thức, chúng còn mở ra những chân trời mới, giúp tôi thấu hiểu sâu sắc hơn về thế giới rộng lớn và chính bản thân mình.
                                                      </p>
                                                      <p>
                                                            Ước vọng của tôi luôn là xây dựng một không gian nơi tri thức được lan tỏa, nơi mỗi người có thể dễ dàng tiếp cận những tác phẩm chất lượng. Từ trăn trở đó, nền tảng đọc sách trực tuyến này đã ra đời. Đây không chỉ là một thư viện số tiện lợi, mà còn là nơi tôn vinh giá trị tri thức và bản quyền.<br />
                                                            Tại đây, độc giả có thể tự do lựa chọn, thanh toán và đắm mình vào những tác phẩm giá trị. Quan trọng hơn, mỗi giao dịch đều là một sự ủng hộ thiết thực dành cho tác giả, góp phần nuôi dưỡng và phát triển một hệ sinh thái tri thức bền vững.
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Tại sao NovelNest */}
                        <section className="mb-16">
                              <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg">
                                          <Book className="w-8 h-8 text-emerald-600 mb-4" />
                                          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">
                                                Đọc sách không chỉ là thú vui
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Tôi tin rằng sách là cầu nối giữa các thế hệ, là nơi lưu giữ trí tuệ và cảm xúc. Mỗi cuốn sách đều có thể thay đổi một con người.
                                          </p>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                          <Users className="w-8 h-8 text-blue-600 mb-4" />
                                          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-3">
                                                Cộng đồng là sức mạnh
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Một cuốn sách hay trở nên ý nghĩa hơn khi được chia sẻ. Tôi muốn tạo ra không gian để mọi người kết nối qua những trang sách.
                                          </p>
                                    </div>
                              </div>
                        </section>

                        {/* Những gì tôi làm */}
                        <section className="mb-16">
                              <h2 className="text-3xl font-serif text-gray-800 dark:text-gray-100 mb-8 text-center">
                                    NovelNest làm và có gì?
                              </h2>

                              <div className="space-y-6">
                                    <div className="border-l-4 border-amber-400 pl-6 py-2">
                                          <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Thư viện sách online chất lượng</h4>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Hàng nghìn cuốn sách được tuyển chọn kỹ từ văn học đến khoa học, từ kinh điển đến hiện đại. Đọc bất cứ lúc nào, trên mọi thiết bị.
                                          </p>
                                    </div>

                                    <div className="border-l-4 border-emerald-400 pl-6 py-2">
                                          <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Trải nghiệm đọc tuyệt vời</h4>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Giao diện đọc thoải mái cho mắt, tùy chỉnh font chữ, kích thước, màu nền. Đồng bộ tiến độ đọc trên tất cả thiết bị của bạn.
                                          </p>
                                    </div>

                                    <div className="border-l-4 border-blue-400 pl-6 py-2">
                                          <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Cộng đồng yêu sách</h4>
                                          <p className="text-gray-600 dark:text-gray-300">
                                                Chia sẻ cảm nhận, đánh giá sách, trao đổi với những độc giả khác. Nhận gợi ý sách phù hợp với sở thích cá nhân.
                                          </p>
                                    </div>
                              </div>
                        </section>

                        {/* Cam kết của tôi */}
                        <section className="mb-16">
                              <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                          <Heart className="w-8 h-8 text-rose-500" />
                                          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                                                Cam kết
                                          </h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
                                          <div>
                                                <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Với độc giả</h4>
                                                <p>Luôn mang đến những cuốn sách chất lượng, giao diện thân thiện, và dịch vụ tận tâm. Không spam, không quảng cáo phiền toái.</p>
                                          </div>
                                          <div>
                                                <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Với tác giả</h4>
                                                <p>Tôn trọng bản quyền, hỗ trợ các tác giả Việt Nam, và tạo cầu nối giữa người viết và người đọc.</p>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Lời kết */}
                        <section className="text-center">
                              <div className="max-w-3xl mx-auto">
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic">
                                          &quot;NovelNest tin rằng những cuốn sách hay xứng đáng được đầu tư và trải nghiệm một cách tốt nhất. Đó là lý do tại sao tôi tạo ra một thư viện số chất lượng, nơi mỗi cuốn sách đều được tuyển chọn kỹ lưỡng và mang đến trải nghiệm đọc tuyệt vời.&quot;
                                    </p>
                                    <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-6"></div>
                                    <p className="text-amber-700 dark:text-amber-200 font-medium">
                                          Cảm ơn bạn đã dành thời gian để hiểu về tôi.
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                                          Giờ thì... hãy cùng đọc sách nhé! 📚
                                    </p>
                              </div>
                        </section>

                  </div>
            </div>
      );
}

export default AboutPage;