'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

interface CarouselItem {
      _id?: string | number;
      imageUrl: string;
      title?: string;
      subtitle?: string;
      link?: string;
}

interface EmblaCarouselProps {
      items: CarouselItem[];
      showButtons?: boolean;
      showDots?: boolean;
      aspectRatioClass?: string;
      disableShadow?: boolean;
      hideText?: boolean;
      autoplayInterval?: number;
}

const EmblaCarousel = ({
      items,
      showButtons = true,
      showDots = true,
      aspectRatioClass = 'h-48 sm:h-56',
      disableShadow = false,
      hideText = false,
      autoplayInterval = 3000,
}: EmblaCarouselProps) => {
      const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
      const [selectedIndex, setSelectedIndex] = useState(0);
      const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
      const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
      const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

      const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
      const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

      const onSelect = useCallback(() => {
            if (!emblaApi) return;
            setSelectedIndex(emblaApi.selectedScrollSnap());
            setPrevBtnEnabled(emblaApi.canScrollPrev());
            setNextBtnEnabled(emblaApi.canScrollNext());
      }, [emblaApi]);

      useEffect(() => {
            if (!emblaApi) return;
            onSelect();
            setScrollSnaps(emblaApi.scrollSnapList());
            emblaApi.on('select', onSelect);
            emblaApi.on('reInit', onSelect);
            return () => {
                  emblaApi.off('select', onSelect);
                  emblaApi.off('reInit', onSelect);
            };
      }, [emblaApi, onSelect]);

      useEffect(() => {
            if (!emblaApi || !autoplayInterval) return;

            const autoplay = setInterval(() => {
                  if (!emblaApi.canScrollNext()) {
                        emblaApi.scrollTo(0); // quay lại đầu nếu hết
                  } else {
                        emblaApi.scrollNext();
                  }
            }, autoplayInterval);

            return () => clearInterval(autoplay);
      }, [emblaApi, autoplayInterval]);


      return (
            <div className="relative">
                  <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                              {items.map((item, index) => (
                                    <div key={item._id || index} className="flex-[0_0_100%] relative">
                                          <div className={`relative w-full ${aspectRatioClass} ${disableShadow ? '' : 'shadow-md'
                                                } rounded-xl overflow-hidden`}>
                                                <div className="relative w-full h-full">
                                                      <Image
                                                            src={item.imageUrl}
                                                            alt={item.title || `Slide ${index + 1}`}
                                                            fill
                                                            className="object-contain"
                                                            sizes="100vw"
                                                            priority
                                                      />
                                                </div>
                                                {!hideText && (
                                                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white z-10">
                                                            {item.title && <h3 className="font-bold text-lg">{item.title}</h3>}
                                                            {item.subtitle && <p className="text-sm">{item.subtitle}</p>}
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {showButtons && (
                        <>
                              <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-30"
                                    onClick={scrollPrev}
                                    disabled={!prevBtnEnabled}
                              >
                                    <FaChevronLeft />
                              </button>
                              <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-30"
                                    onClick={scrollNext}
                                    disabled={!nextBtnEnabled}
                              >
                                    <FaChevronRight />
                              </button>
                        </>
                  )}

                  {showDots && (
                        <div className="flex justify-center mt-4">
                              {scrollSnaps.map((_, index) => (
                                    <button
                                          key={index}
                                          onClick={() => emblaApi?.scrollTo(index)}
                                          className={`w-2 h-2 mx-1 rounded-full ${index === selectedIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    />
                              ))}
                        </div>
                  )}
            </div>
      );
};

export default EmblaCarousel;
