'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

interface CarouselProps {
      slides: {
            id: number;
            icon: string;
            title: string;
            bookCount: number;
      }[];
}

const CarouselGeneBooks = ({ slides }: CarouselProps) => {
      const [emblaRef, emblaApi] = useEmblaCarousel({
            loop: true,
            align: 'start',
            slidesToScroll: 4
      })

      const scrollPrev = useCallback(() => {
            if (emblaApi) emblaApi.scrollPrev()
      }, [emblaApi])

      const scrollNext = useCallback(() => {
            if (emblaApi) emblaApi.scrollNext()
      }, [emblaApi])

      return (
            <div className="relative max-w-screen-xl mx-auto px-4">
                  <p className='text-[23px] dark:text-white text-black text-center mb-7 ml-2'>
                        Khám Phá Các Thể Loại Đa Dạng
                  </p>
                  <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                              {slides.map((slide) => (
                                    <div key={slide.id} className="flex-[0_0_180px] min-w-0">
                                          <div className="mx-2 p-4 text-center dark:bg-[#fbf8f8] bg-[#f6caca] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <div className="mb-3 text-gray-600">
                                                      <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d={slide.icon} />
                                                      </svg>
                                                </div>
                                                <h3 className="font-medium text-gray-900">{slide.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{slide.bookCount} cuốn sách</p>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>

                  <button
                        className="absolute left-0 bottom-12 -translate-y-1/2 dark:bg-[#f2cdcd] bg-[#ccc] w-[40px] h-[40px] rounded-full shadow-lg dark:hover:bg-[#5ad8a3]"
                        onClick={scrollPrev}
                  >
                        ←
                  </button>
                  <button
                        className="absolute right-0 bottom-12 -translate-y-1/2 dark:bg-[#f2cdcd] bg-[#ccc] p-2 w-[40px] h-[40px] rounded-full shadow-lg dark:hover:bg-[#5ad8a3]"
                        onClick={scrollNext}
                  >
                        →
                  </button>
            </div>
      )
}

export default CarouselGeneBooks