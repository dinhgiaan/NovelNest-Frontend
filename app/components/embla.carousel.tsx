'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export interface CarouselItem {
      _id?: string | number;
      imageUrl?: string;
      title?: string;
      subtitle?: string;
      link?: string;
      type?: 'image' | 'button';
}

interface EmblaCarouselProps {
      items: CarouselItem[];
      showButtons?: boolean;
      showDots?: boolean;
      aspectRatioClass?: string;
      disableShadow?: boolean;
      hideText?: boolean;
      autoplayInterval?: number;
      pauseOnHover?: boolean;
}

const EmblaCarousel = ({
      items,
      showButtons = true,
      showDots = true,
      aspectRatioClass = 'h-48 sm:h-56',
      disableShadow = false,
      hideText = false,
      autoplayInterval = 3000,
      pauseOnHover = true,
}: EmblaCarouselProps) => {
      const router = useRouter();
      const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
      const [selectedIndex, setSelectedIndex] = useState(0);
      const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
      const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
      const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
      const [isPaused, setIsPaused] = useState(false);
      const autoplayRef = useRef<NodeJS.Timeout | null>(null);

      const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
      const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

      const onSelect = useCallback(() => {
            if (!emblaApi) return;
            setSelectedIndex(emblaApi.selectedScrollSnap());
            setPrevBtnEnabled(emblaApi.canScrollPrev());
            setNextBtnEnabled(emblaApi.canScrollNext());
      }, [emblaApi]);

      const handleItemClick = useCallback((link: string) => {
            router.push(link);
      }, [router]);

      const startAutoplay = useCallback(() => {
            if (!emblaApi || !autoplayInterval || isPaused) return;

            autoplayRef.current = setInterval(() => {
                  if (!emblaApi.canScrollNext()) {
                        emblaApi.scrollTo(0);
                  } else {
                        emblaApi.scrollNext();
                  }
            }, autoplayInterval);
      }, [emblaApi, autoplayInterval, isPaused]);

      const stopAutoplay = useCallback(() => {
            if (autoplayRef.current) {
                  clearInterval(autoplayRef.current);
                  autoplayRef.current = null;
            }
      }, []);

      const handleMouseEnter = useCallback(() => {
            if (pauseOnHover) {
                  setIsPaused(true);
                  stopAutoplay();
            }
      }, [pauseOnHover, stopAutoplay]);

      const handleMouseLeave = useCallback(() => {
            if (pauseOnHover) {
                  setIsPaused(false);
            }
      }, [pauseOnHover]);

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

      // Autoplay effect
      useEffect(() => {
            startAutoplay();
            return stopAutoplay;
      }, [startAutoplay, stopAutoplay]);

      // Resume autoplay when not paused
      useEffect(() => {
            if (!isPaused) {
                  startAutoplay();
            } else {
                  stopAutoplay();
            }
      }, [isPaused, startAutoplay, stopAutoplay]);

      // Empty state
      if (!items.length) {
            return (
                  <div className="relative">
                        <div className={`relative w-full ${aspectRatioClass} ${disableShadow ? '' : 'shadow-md'} rounded-xl overflow-hidden flex items-center justify-center bg-gray-100`}>
                              <p className="text-gray-300">Không có nội dung để hiển thị</p>
                        </div>
                  </div>
            );
      }

      return (
            <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
            >
                  <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                              {items.map((item, index) => (
                                    <div key={item._id || index} className="flex-[0_0_100%] relative p-4">
                                          <div className={`relative w-full ${aspectRatioClass} ${disableShadow ? '' : 'shadow-md'} rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 group cursor-pointer transition-transform hover:scale-[1.02]`}>
                                                {item.type === 'button' ? (
                                                      <button
                                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                            onClick={() => {
                                                                  if (item.link) handleItemClick(item.link);
                                                            }}
                                                            aria-label={item.title || 'Click me'}
                                                      >
                                                            {item.title || 'Click me'}
                                                      </button>
                                                ) : (
                                                      <div
                                                            className="w-full h-full relative cursor-pointer"
                                                            onClick={() => {
                                                                  if (item.link) handleItemClick(item.link);
                                                            }}
                                                            role="button"
                                                            tabIndex={0}
                                                            onKeyDown={(e) => {
                                                                  if ((e.key === 'Enter' || e.key === ' ') && item.link) {
                                                                        handleItemClick(item.link);
                                                                  }
                                                            }}
                                                            aria-label={item.title || `Slide ${index + 1}`}
                                                      >
                                                            {item.imageUrl ? (
                                                                  <Image
                                                                        src={item.imageUrl}
                                                                        alt={item.title || `Slide ${index + 1}`}
                                                                        fill
                                                                        className="object-cover transition-transform group-hover:scale-105"
                                                                        sizes="100vw"
                                                                        priority={index === 0} // Only prioritize first image
                                                                        placeholder="blur"
                                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEQXMnqzCpKLbUJBVG8pKGRKDzLbOZd7J4mKltbtjhJkBUaZI8XmNsR1cQ1EIDeBtYvE4pMBfxLQrNUgd5K0x8qBE2eSQjI5DJgVFqtSCaLaQJw6D9rFqrVa5Ld5jYmQJzGdZR5YqWQJkdR1nCRFpGLa6/6bJy9NzBt5OjM7IbMr"
                                                                  />
                                                            ) : (
                                                                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                                        <span className="text-gray-300 text-sm">Không có hình ảnh</span>
                                                                  </div>
                                                            )}

                                                            {!hideText && (item.title || item.subtitle) && (
                                                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white z-10">
                                                                        {item.title && (
                                                                              <h3 className="font-bold text-lg mb-1 leading-tight">
                                                                                    {item.title}
                                                                              </h3>
                                                                        )}
                                                                        {item.subtitle && (
                                                                              <p className="text-sm opacity-90 line-clamp-2">
                                                                                    {item.subtitle}
                                                                              </p>
                                                                        )}
                                                                  </div>
                                                            )}
                                                      </div>
                                                )}
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>

                  {showButtons && items.length > 1 && (
                        <>
                              <button
                                    className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={scrollPrev}
                                    disabled={!prevBtnEnabled}
                                    aria-label="Slide trước"
                              >
                                    <FaChevronLeft className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                    className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={scrollNext}
                                    disabled={!nextBtnEnabled}
                                    aria-label="Slide tiếp theo"
                              >
                                    <FaChevronRight className="w-4 h-4 text-gray-600" />
                              </button>
                        </>
                  )}

                  {showDots && items.length > 1 && (
                        <div className="flex justify-center mt-4">
                              {scrollSnaps.map((_, index) => (
                                    <button
                                          key={index}
                                          onClick={() => emblaApi?.scrollTo(index)}
                                          className={`w-2 h-2 mx-1 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${index === selectedIndex
                                                ? 'bg-blue-500 scale-125'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                          aria-label={`Đi đến slide ${index + 1}`}
                                    />
                              ))}
                        </div>
                  )}

                  {autoplayInterval && (
                        <div className="absolute top-2 right-2 z-20">
                              <div className={`w-2 h-2 rounded-full transition-colors ${isPaused ? 'bg-yellow-400' : 'bg-green-400'}`} />
                        </div>
                  )}
            </div>
      );
};

export default EmblaCarousel;