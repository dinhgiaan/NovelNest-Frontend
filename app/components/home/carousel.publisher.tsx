'use client'

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const PublisherCarousel = () => {
      const publishers = [
            'bloomsbury_publisher.webp',
            'nxb_phu_nu_viet_nam_publisher.webp',
            'hachette_livre_publisher.webp',
            'harper_collins_publisher.webp',
            'macmillan_publisher.webp',
            'nxb_gdvn_publisher.webp',
            'oreilly_publisher.webp',
            'nxb_lao_dong_publisher.webp',
            'nxb_tong_hop_hcm_publisher.webp',
            'nxb_tre_publisher.webp',
            'penguin_random_house_publisher.webp',
            'scholastic_publisher.webp',
            'simon_schuster_publisher.webp',
            'wiley_publisher.webp'
      ];

      const containerRef = useRef<HTMLDivElement>(null);
      const [visible, setVisible] = useState(false);

      useEffect(() => {
            const observer = new IntersectionObserver(
                  ([entry]) => {
                        if (entry.isIntersecting) {
                              setVisible(true);
                              observer.disconnect();
                        }
                  },
                  { threshold: 0.1 }
            );

            if (containerRef.current) {
                  observer.observe(containerRef.current);
            }

            return () => observer.disconnect();
      }, []);

      return (
            <div
                  ref={containerRef}
                  className={`flex flex-col space-y-16 pt-24 pb-10 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
            >
                  <h2 className="text-center text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                        Các Nhà Xuất Bản Đồng Hành
                  </h2>

                  <div className="overflow-hidden py-6 dark:bg-slate-300 bg-slate-200">
                        <div className="flex animate-marquee gap-20">
                              {publishers.map((fileName, i) => (
                                    <div
                                          key={`original-${i}`}
                                          className="flex-shrink-0"
                                    >
                                          <Image
                                                src={`/assets/${fileName}`}
                                                alt={`Nhà xuất bản ${fileName.replace('.webp', '').replace(/_/g, ' ')}`}
                                                width={120}
                                                height={0}
                                                style={{ width: 'auto', height: '48px' }}
                                                className="hover:scale-110 transition-transform duration-300 ease-in-out"
                                          />
                                    </div>
                              ))}

                              <div className="flex-shrink-0 w-20" />

                              {publishers.map((fileName, i) => (
                                    <div
                                          key={`duplicate-${i}`}
                                          className="flex-shrink-0"
                                    >
                                          <Image
                                                src={`/assets/${fileName}`}
                                                alt={`Nhà xuất bản ${fileName.replace('.webp', '').replace(/_/g, ' ')}`}
                                                width={120}
                                                height={0}
                                                style={{ width: 'auto', height: '48px' }}
                                                className="hover:scale-110 transition-transform duration-300 ease-in-out"
                                          />
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default PublisherCarousel;
