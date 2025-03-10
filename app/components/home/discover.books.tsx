'use client'

import useSWR from 'swr';
import ErrorAPI from '../error.api';
import Loading from '@/app/utils/loading';
import useEmblaCarousel from 'embla-carousel-react';

const CarouselGeneBooks = () => {
      const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 2 })

      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_CATEGORIES, fetcher,
            {
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false
            }
      )

      console.log('--> check data gene book: ', data)

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      const allCategories = data?.data?.categories;

      return (
            <div className="relative max-w-screen-xl mx-auto px-4 mb-56">
                  <p className="text-2xl dark:text-white text-black text-center mb-7 ml-2">
                        Khám Phá Các Thể Loại Đa Dạng
                  </p>
                  <div ref={emblaRef} className="overflow-hidden max-w-full">
                        <div className='flex'>
                              {allCategories?.map((item, index) => {
                                    return (
                                          <div key={index} className='w-max'>
                                                <div className='w-44 h-40 flex bg-pink-400 mx-5 justify-center text-md rounded-md'>
                                                      <div className='mt-3'>
                                                            {item}
                                                      </div>
                                                </div>
                                          </div>
                                    )
                              })}
                        </div>
                  </div>
            </div>
      )
}

export default CarouselGeneBooks
