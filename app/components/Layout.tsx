import Image from 'next/image';
import portrait from '@/public/assets/portrait_home.webp';
import Services from './home/services';
import BestSeller from './home/best.seller';
import CustomerReviews from "@/app/components/home/customer.reviews";
import Categories from './home/category.book';
import SponsorBanner from './home/carousel.publisher';

const Layout = () => {

      return (
            <div className="min-h-screen bg-gradient-to-b pt-16 from-stone-100 to-green-50 dark:from-[#233b57] dark:to-[#1a2a3e]">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Hero Section với layout mới */}
                        <section className="mb-24 relative overflow-hidden">
                              {/* Background decorative elements */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ee6c79]/10 to-[#4ecdc4]/10 rounded-full blur-3xl -z-10"></div>
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6bb3a8]/10 to-[#edd479]/10 rounded-full blur-2xl -z-10"></div>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
                                    <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                                          <div className="relative inline-flex items-center justify-center px-0.5 py-0.5 rounded-md overflow-hidden">
                                                <span className="relative z-10 text-sm font-medium text-[#ee6c79] dark:text-[#edd479] bg-black bg-gradient-to-r from-[#ee6c79]/10 to-[#4ecdc4]/10 px-4 py-2 rounded-md border border-[#ee6c79]/20 dark:border-[#edd479]/20">
                                                      ✨ Nền tảng sách số #1 Việt Nam
                                                </span>

                                                <span
                                                      aria-hidden
                                                      className="absolute inset-0 z-0 scale-150 blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
                                                />
                                          </div>

                                          <div className="space-y-1">
                                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold leading-tight">
                                                      <span className="bg-gradient-to-r from-[#ee6c79] to-[#4ecdc4] dark:from-[#edd479] dark:to-[#bde0f3] bg-clip-text text-transparent">
                                                            Khám phá vũ trụ
                                                      </span>
                                                      <br />
                                                      <span className="text-gray-900 dark:text-white">
                                                            tri thức bất tận
                                                      </span>
                                                </h1>

                                                <div className="w-20 h-1 bg-gradient-to-r from-[#ee6c79] to-[#4ecdc4] rounded-full"></div>
                                          </div>

                                          <div className="space-y-3">
                                                <p className="text-md sm:text-base text-[#6bb3a8] dark:text-[#bde0f3] leading-relaxed">
                                                      Với <span className="font-medium text-[#4ecdc4] dark:text-[#edd479]">NovelNest</span>,
                                                      hành trình khám phá tri thức của bạn không có giới hạn.
                                                      Từ những câu chuyện cổ tích đến khoa học hiện đại,
                                                      từ thơ ca lãng mạn đến kinh doanh thực tế.
                                                </p>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                                            <div className="w-2 h-2 bg-[#4ecdc4] rounded-full"></div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">Hơn 10,000+ đầu sách</span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                                            <div className="w-2 h-2 bg-[#ee6c79] rounded-full"></div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">Đọc với mọi thiết bị</span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                                            <div className="w-2 h-2 bg-[#4ecdc4] rounded-full"></div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">Cộng đồng sôi nổi</span>
                                                      </div>
                                                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                                            <div className="w-2 h-2 bg-[#ee6c79] rounded-full"></div>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">Gợi ý thông minh</span>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="relative p-4 rounded-tl-2xl rounded-br-3xl bg-gradient-to-r from-[#e2efe8] to-[#d1eedd] dark:from-[#383f61] dark:to-[#384e65] border-l-4 border-[#6bb3a8] dark:border-[#8ecae6]">
                                                <div className="absolute top-4 left-4 text-4xl text-[#6bb3a8]/30 dark:text-[#8ecae6]/30">&quot;</div>
                                                <blockquote className="italic text-gray-800 dark:text-gray-200 ml-8">
                                                      Một cuốn sách là một giấc mơ mà bạn có thể nắm trong tay
                                                </blockquote>
                                                <cite className="block mt-2 text-sm text-[#5d9f91] dark:text-[#bde0f3] ml-8">
                                                      – Neil Gaiman
                                                </cite>
                                          </div>


                                          <div className="flex flex-col sm:flex-row gap-4">
                                                <button className="px-8 py-4 bg-gradient-to-r from-[#ee6c79] to-[#4ecdc4] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                                                      Khám phá ngay
                                                </button>
                                                <button className="px-8 py-4 border-2 border-[#4ecdc4] text-[#4ecdc4] dark:text-[#edd479] dark:border-[#edd479] font-semibold rounded-full hover:bg-[#4ecdc4]/10 transition-all duration-300">
                                                      Tìm hiểu thêm
                                                </button>
                                          </div>
                                    </div>

                                    <div className="lg:col-span-5 order-1 lg:order-2">
                                          <div className="relative group">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[#ee6c79]/20 to-[#4ecdc4]/20 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

                                                <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                                                      <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] relative">
                                                            <Image
                                                                  src={portrait}
                                                                  alt="Trải nghiệm đọc sách cùng NovelNest"
                                                                  fill
                                                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                                  priority
                                                                  placeholder="blur"
                                                                  fetchPriority="high"
                                                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1280px) 40vw, 33vw"
                                                            />
                                                      </div>

                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                                                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-3">
                                                                  <div className="text-2xl font-bold text-[#ee6c79] dark:text-[#edd479]">1M+</div>
                                                                  <div className="text-xs text-gray-600 dark:text-gray-400">Độc giả</div>
                                                            </div>
                                                            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-3">
                                                                  <div className="text-2xl font-bold text-[#4ecdc4]">4.9★</div>
                                                                  <div className="text-xs text-gray-600 dark:text-gray-400">Đánh giá</div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <div className="space-y-14">
                              <section>
                                    <SponsorBanner />
                              </section>

                              <section>
                                    <Services />
                              </section>

                              <section>
                                    <Categories />
                              </section>

                              <section>
                                    <BestSeller />
                              </section>

                              <section>
                                    <CustomerReviews />
                              </section>
                        </div>
                  </div>
            </div>
      );
};

export default Layout;