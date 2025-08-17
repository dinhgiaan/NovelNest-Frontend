import Image from 'next/image';
import portrait from '@/public/assets/portrait_home.webp';
import Services from '../home/services';
import BestSeller from '../home/best.seller';
import CustomerReviews from "@/app/components/home/customer.reviews";
import Categories from '../home/category.book';
import PublisherCarousel from '../home/carousel.publisher';
import Link from 'next/link';

const Layout = () => {

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24]">
                  <div className="h-16"></div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <section className="mb-24 relative overflow-hidden">
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
                                    <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
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

                                          <div className="space-y-2">
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

                                          <div className="flex flex-col sm:flex-row gap-3">
                                                <Link
                                                      href={'/books'}
                                                      about='Navigation to book page'
                                                      className="relative px-6 py-3 bg-gradient-to-r from-[#0ea5e9]/10 to-[#8b5cf6]/10 text-white font-medium tracking-tight rounded-lg 
               border border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] 
               transition-all duration-300 group overflow-hidden"
                                                >
                                                      <span className="dark:text-white text-black relative z-10 group-hover:scale-102 transition-transform duration-200 ease-out">
                                                            Khám phá ngay
                                                      </span>
                                                      <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/30 to-[#8b5cf6]/30 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"></div>
                                                      <div className="absolute inset-0 bg-[#0ea5e9]/20 scale-0 group-hover:scale-100 rounded-lg 
                    transition-transform duration-500 ease-out origin-center"></div>
                                                </Link>
                                                <Link
                                                      href={'/about'}
                                                      about='Navigation to about us page'
                                                      className="relative px-6 py-3 bg-transparent border border-[#8b5cf6]/50 text-[#8b5cf6] dark:text-[#a78bfa] 
               font-medium tracking-tight rounded-lg hover:bg-[#8b5cf6]/10 hover:border-[#8b5cf6]/80 
               transition-all duration-300 group"
                                                >
                                                      <span className="relative z-10 group-hover:scale-102 transition-transform duration-200 ease-out">
                                                            Tìm hiểu thêm
                                                      </span>
                                                      <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/20 to-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"></div>
                                                </Link>
                                          </div>
                                    </div>

                                    <div className="lg:col-span-5 order-1 lg:order-2 cursor-default">
                                          <div className="relative group">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-[#ee6c79]/70 to-[#4ecdc4]/80 rounded-3xl rotate-3 group-hover:rotate-12 transition-transform duration-500"></div>

                                                <div className="relative bg-[#ead5ec] dark:bg-[#d2dcce] rounded-3xl overflow-hidden group-hover:shadow-3xl transition-all duration-500">
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

                                                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>

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
                                    <PublisherCarousel />
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
