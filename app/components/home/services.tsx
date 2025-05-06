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

      // Array of service data for cleaner rendering
      const services = [
            {
                  icon: <MdOutlineSecurity size={28} />,
                  title: "Bảo mật an toàn",
                  description: "Dữ liệu người dùng được mã hóa và bảo vệ an toàn",
            },
            {
                  icon: <BsCreditCard size={26} />,
                  title: "Thanh toán tiện lợi",
                  description: "Nhiều phương thức thanh toán an toàn, nhanh chóng",
            },
            {
                  icon: <IoIosFlash size={28} />,
                  title: "Phản hồi tức thì",
                  description: "Hỗ trợ khách hàng 24/7 với thời gian phản hồi nhanh",
            },
            {
                  icon: <GiBurningBook size={28} />,
                  title: "Kho sách phong phú",
                  description: "Hàng ngàn đầu sách từ nhiều thể loại khác nhau",
            },
      ];

      return (
            <section className="max-w-7xl mx-auto px-4 py-24" ref={containerRef}>
                  <div className="text-center mb-16 opacity-0 transition-all duration-1000 delay-100"
                        ref={(el) => (serviceRefs.current[0] = el)}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                              Dịch vụ của chúng tôi
                        </h2>
                        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                              Chúng tôi cam kết mang đến trải nghiệm mua sắm sách trực tuyến tốt nhất cho bạn
                        </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                              <div
                                    key={index}
                                    className="bg-[#f4f1f1] dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden opacity-0 translate-y-8"
                                    style={{ transitionDelay: `${(index + 1) * 50}ms` }}
                                    ref={(el) => (serviceRefs.current[index + 1] = el)}
                              >
                                    <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                                    <div className="p-6">
                                          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400">
                                                {service.icon}
                                          </div>
                                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                                {service.title}
                                          </h3>
                                          <p className="text-gray-600 dark:text-gray-300 text-sm">
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