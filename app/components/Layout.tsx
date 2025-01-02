import dynamic from 'next/dynamic';
import Image from 'next/image';
import image from '../public/banner2.png';
import Services from './home/services';
import CarouselGeneBooks from './home/discover.books';
import BestSeller from './home/best.seller';
import Timer from './home/subscribe';

const Divider = dynamic(() => import('@mui/material/Divider'), { ssr: false });


const Layout = () => {
      const slides = [
            {
                  id: 1,
                  icon: "M10 1L3 6l7 5 7-5-7-5zM3 11l7 5 7-5",
                  title: "Văn học",
                  bookCount: 150
            },
            {
                  id: 2,
                  icon: "M12 3L2 8l10 5 10-5-10-5zM2 16l10 5 10-5",
                  title: "Khoa học",
                  bookCount: 120
            },
            {
                  id: 3,
                  icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                  title: "Lịch sử",
                  bookCount: 100
            },
            {
                  id: 4,
                  icon: "M5 3l7 7-7 7",
                  title: "Tâm lý",
                  bookCount: 90
            },
            {
                  id: 5,
                  icon: "M12 5L2 12l10 5 10-5-10-5",
                  title: "Hành động",
                  bookCount: 200
            },
            {
                  id: 6,
                  icon: "M12 1L1 12h22L12 1z",
                  title: "Kinh tế",
                  bookCount: 75
            },
            {
                  id: 7,
                  icon: "M12 0L5 7l7 7 7-7L12 0z",
                  title: "Văn hóa",
                  bookCount: 80
            },
            {
                  id: 8,
                  icon: "M12 2L4 10h16L12 2z",
                  title: "Phát triển bản thân",
                  bookCount: 110
            },
            {
                  id: 9,
                  icon: "M10 3L2 12l8 7 8-7L10 3z",
                  title: "Tiểu thuyết",
                  bookCount: 250
            }
      ];

      return (
            <div className="min-h-screen bg-white dark:bg-[#233b57]">
                  <div className="w-full">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              {/* Main Hero Section */}
                              <div className="flex flex-col lg:flex-row items-center gap-12">
                                    {/* Content Section */}
                                    <div className="flex-1 space-y-8">
                                          <div className="space-y-4">
                                                <h1 className="text-[30px] md:text-[43px] dark:text-white text-black w-[530px] font-bold tracking-tight">
                                                      Khám phá thế giới qua từng trang sách
                                                </h1>
                                                <p className="text-[14px] dark:text-yellow-400 leading-relaxed w-[530px]">
                                                      NovelNest - Nền tảng đọc sách số hàng đầu Việt Nam, nơi tri thức và cảm xúc hòa quyện trong từng trang sách điện tử.
                                                </p>
                                          </div>

                                          <blockquote className="text-[17px] text-gray-600 dark:text-gray-400 italic border-l-4 border-blue-500 pl-4">
                                                &quot;Sách là cửa sổ nhìn ra thế giới, là người bạn đồng hành trên hành trình khám phá tri thức vô tận.&quot;
                                          </blockquote>
                                    </div>

                                    <div className="flex-2">
                                          <div className="relative overflow-hidden">
                                                <Image
                                                      src={image}
                                                      alt="NovelNest Reading Experience"
                                                      width={400}
                                                      height={200}
                                                      className="object-cover rounded-lg"
                                                      priority
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <Divider variant="middle" sx={{ marginX: 25, marginY: 10 }} color='white' />
                  </div>

                  {/* ---------- Services ---------- */}
                  <Services />

                  <Divider variant="middle" sx={{ marginX: 25, marginY: 10 }} color='white' />

                  {/* ---------- Discover Books ---------- */}
                  <CarouselGeneBooks slides={slides} />

                  <Divider variant="middle" sx={{ marginX: 25, marginY: 10 }} color='white' />

                  {/* ---------- Best Seller ---------- */}
                  <BestSeller />

                  {/* ---------- Subscribe ---------- */}
                  <Timer />

            </div>
      );
};

export default Layout;
