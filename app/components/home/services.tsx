"use client";

import { useEffect, useRef } from "react";
import { BsCreditCard } from "react-icons/bs";
import { GiBurningBook } from "react-icons/gi";
import { IoIosFlash } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";

const Services = () => {
      const containerRef = useRef(null);
      const serviceRefs = useRef([]);

      useEffect(() => {
            const observer = new IntersectionObserver(
                  (entries) => {
                        entries.forEach((entry) => {
                              if (entry.isIntersecting) {
                                    entry.target.classList.add("animate-in");
                              }
                        });
                  },
                  { threshold: 0.1 }
            );

            if (containerRef.current) {
                  observer.observe(containerRef.current);
            }

            serviceRefs.current.forEach((ref) => {
                  if (ref) observer.observe(ref);
            });

            return () => {
                  if (containerRef.current) {
                        observer.unobserve(containerRef.current);
                  }
                  serviceRefs.current.forEach((ref) => {
                        if (ref) observer.unobserve(ref);
                  });
            };
      }, []);

      const services = [
            {
                  icon: <MdOutlineSecurity size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
                  title: "Bảo mật an toàn",
                  description: "Dữ liệu người dùng được mã hóa và bảo vệ an toàn",
            },
            {
                  icon: <BsCreditCard size={22} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
                  title: "Thanh toán tiện lợi",
                  description: "Nhiều phương thức thanh toán an toàn, nhanh chóng",
            },
            {
                  icon: <IoIosFlash size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
                  title: "Phản hồi tức thì",
                  description: "Hỗ trợ khách hàng 24/7 với thời gian phản hồi nhanh",
            },
            {
                  icon: <GiBurningBook size={24} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
                  title: "Kho sách phong phú",
                  description: "Hàng ngàn đầu sách từ nhiều thể loại khác nhau",
            },
      ];

      return (
            <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24" ref={containerRef}>
                  <div className="text-center mb-8 sm:mb-12 lg:mb-16 opacity-0 transition-all duration-1000 delay-100"
                        ref={(el) => (serviceRefs.current[0] = el)}>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
                              Dịch vụ của chúng tôi
                        </h2>
                        <div className="mx-auto w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                              Chúng tôi cam kết mang đến trải nghiệm mua sắm sách trực tuyến tốt nhất cho bạn
                        </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {services.map((service, index) => (
                              <div
                                    key={index}
                                    className="bg-[#f4f1f1] dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden opacity-0 translate-y-8 hover:scale-105"
                                    style={{ transitionDelay: `${(index + 1) * 50}ms` }}
                                    ref={(el) => (serviceRefs.current[index + 1] = el)}
                              >
                                    <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                                    <div className="p-4 sm:p-5 lg:p-6">
                                          <div className="mb-3 sm:mb-4 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400">
                                                {service.icon}
                                          </div>
                                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                                {service.title}
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                                                {service.description}
                                          </p>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <style jsx>{`
                        .animate-in {
                              opacity: 1;
                              transform: translateY(0);
                        }
                  `}</style>
            </section>
      );
};

export default Services;