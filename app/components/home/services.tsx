"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import { Shield, BookOpen, Headphones, Zap } from "lucide-react";
import Link from "next/link";

const services = [
      {
            icon: Shield,
            title: "Bảo mật tuyệt đối",
            description: "Thông tin cá nhân và dữ liệu đọc của bạn được bảo vệ 100%",
            color: "emerald"
      },
      {
            icon: BookOpen,
            title: "Thư viện khổng lồ",
            description: "Hơn 100,000 đầu sách từ cổ điển đến hiện đại",
            color: "blue"
      },
      {
            icon: Headphones,
            title: "Hỗ trợ 24/7",
            description: "Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng hỗ trợ",
            color: "purple"
      },
      {
            icon: Zap,
            title: "Đồng bộ đa thiết bị",
            description: "Đọc liền mạch trên mọi thiết bị, lưu tiến độ tự động",
            color: "orange"
      }
];

const colorVariants = {
      emerald: {
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
            text: "text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-200 dark:border-emerald-800"
      },
      blue: {
            bg: "bg-blue-50 dark:bg-blue-950/30",
            text: "text-blue-600 dark:text-blue-400",
            border: "border-blue-200 dark:border-blue-800"
      },
      purple: {
            bg: "bg-purple-50 dark:bg-purple-950/30",
            text: "text-purple-600 dark:text-purple-400",
            border: "border-purple-200 dark:border-purple-800"
      },
      orange: {
            bg: "bg-orange-50 dark:bg-orange-950/30",
            text: "text-orange-600 dark:text-orange-400",
            border: "border-orange-200 dark:border-orange-800"
      }
};

const ServiceCard = memo(({ service, index, itemRef }: {
      service: typeof services[0],
      index: number,
      itemRef: (el: HTMLDivElement | null) => void
}) => {
      const colors = colorVariants[service.color];
      const Icon = service.icon;

      return (
            <div
                  className={`
                group relative p-6 rounded-2xl bg-white dark:bg-gray-800 
                border ${colors.border} shadow-sm hover:shadow-lg
                transition-all duration-500 ease-out
                opacity-0 translate-y-8 will-change-transform
            `}
                  style={{
                        transitionDelay: `${index * 100 + 200}ms`
                  }}
                  ref={itemRef}
            >
                  <div className={`
                inline-flex items-center justify-center w-12 h-12 rounded-xl 
                ${colors.bg} ${colors.text}
                mb-4 transition-transform duration-300 group-hover:scale-110
                will-change-transform
            `}>
                        <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {service.description}
                  </p>

                  <div className={`
                absolute bottom-0 left-6 right-6 h-0.5 ${colors.bg}
                transform scale-x-0 transition-transform duration-300 
                group-hover:scale-x-100 origin-left
            `} />
            </div>
      );
});

ServiceCard.displayName = 'ServiceCard';

const Services = () => {
      const itemsRef = useRef<(HTMLElement | null)[]>([]);
      const observerRef = useRef<IntersectionObserver | null>(null);

      const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        target.style.opacity = "1";
                        target.style.transform = "translateY(0)";

                        if (observerRef.current) {
                              observerRef.current.unobserve(target);
                        }
                  }
            });
      }, []);

      useEffect(() => {
            const initObserver = () => {
                  observerRef.current = new IntersectionObserver(observerCallback, {
                        threshold: 0.1,
                        rootMargin: "0px 0px -10% 0px"
                  });

                  itemsRef.current.forEach((item) => {
                        if (item && observerRef.current) {
                              observerRef.current.observe(item);
                        }
                  });
            };

            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                  requestIdleCallback(initObserver);
            } else {
                  setTimeout(initObserver, 0);
            }

            return () => {
                  if (observerRef.current) {
                        observerRef.current.disconnect();
                  }
            };
      }, [observerCallback]);

      const setItemRef = useCallback((index: number) => (el: HTMLElement | null) => {
            itemsRef.current[index] = el;
      }, []);

      return (
            <section className="py-16 lg:py-24">
                  <div className="max-w-6xl mx-auto px-4">
                        {/* Header */}
                        <div
                              className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                              ref={setItemRef(0)}
                        >
                              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Tại sao chọn NovelNest?
                              </h2>
                              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-md">
                                    Chúng tôi cam kết mang đến trải nghiệm đọc sách số tốt nhất
                              </p>
                              <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mt-3"></div>
                        </div>

                        {/* Services Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {services.map((service, index) => (
                                    <ServiceCard
                                          key={index}
                                          service={service}
                                          index={index}
                                          itemRef={setItemRef(index + 1)}
                                    />
                              ))}
                        </div>

                        {/* Bottom CTA */}
                        <div
                              className="text-center mt-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                              ref={setItemRef(5)}
                              style={{ transitionDelay: "600ms" }}
                        >
                              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                          Sẵn sàng khám phá?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                          Tham gia cùng hàng triệu độc giả khác trên NovelNest
                                    </p>
                                    <Link href="/books">
                                          <button className="
                                bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                                px-8 py-3 rounded-xl font-medium
                                hover:bg-gray-800 dark:hover:bg-gray-100
                                transition-colors duration-300
                                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                            ">
                                                Bắt đầu đọc ngay
                                          </button>
                                    </Link>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default memo(Services);