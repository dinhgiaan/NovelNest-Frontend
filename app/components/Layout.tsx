import React from 'react';
import Image from 'next/image';
import banner from '../public/banner-homepage.webp';
import Services from './home/services';
import CarouselGeneBooks from './home/discover.books';
import BestSeller from './home/best.seller';
import Timer from './home/subscribe';
import { GiOlive } from 'react-icons/gi';

const Layout = () => {
      return (
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#233b57] dark:to-[#1a2a3e]">
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <section className="mb-20">
                              <div className="flex flex-col lg:flex-row items-center gap-12">
                                    <div className="flex-1 space-y-8">
                                          <div className="space-y-6">
                                                <div className="relative inline-block">
                                                      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur opacity-30" />
                                                      <GiOlive
                                                            size={80}
                                                            className="text-[#56f173] relative transform hover:scale-110 transition-all duration-300 cursor-pointer"
                                                      />
                                                </div>

                                                <h1 className="text-3xl lg:text-4xl dark:text-[#edd479] text-[#ee6c79] font-bold tracking-tight leading-tight">
                                                      Khám phá thế giới
                                                      <span className="block mt-2">qua từng trang sách</span>
                                                </h1>

                                                <p className="text-md dark:text-[#aed3e8] text-[#9bd6c2] leading-relaxed max-w-xl">
                                                      NovelNest - Nền tảng đọc sách số hàng đầu Việt Nam, nơi tri thức và cảm xúc hòa quyện trong từng trang sách điện tử.
                                                </p>
                                          </div>

                                          <div className="relative">
                                                <blockquote className="text-xs text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-6 py-2">
                                                      &quot;Nếu bạn không thích đọc sách, có lẽ bạn chưa tìm được cuốn sách phù hợp.&quot;
                                                </blockquote>
                                                <div className="mt-2 pl-6 text-gray-500 dark:text-gray-400 font-medium">
                                                      - J. K. Rowling -
                                                </div>
                                          </div>
                                    </div>

                                    <div className="flex-1">
                                          <div className="relative group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                                                <div className="relative overflow-hidden rounded-lg shadow-xl">
                                                      <Image
                                                            src={banner}
                                                            alt="NovelNest Reading Experience"
                                                            width={650}
                                                            height={450}
                                                            className="object-cover w-full h-full animate-gentle-float-swing"
                                                            priority
                                                            placeholder='blur'
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        <section className="mb-20">
                              <Services />
                        </section>

                        <section className="mb-20">
                              <CarouselGeneBooks />
                        </section>

                        <section className="mb-20">
                              <BestSeller />
                        </section>

                        <section className="mb-20">
                              <Timer />
                        </section>
                  </div>
            </div>
      );
};

export default Layout;