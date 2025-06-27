"use client"

import { useState, useCallback, useEffect } from "react"
import useSWR from "swr"
import ErrorAPI from "../error.api"
import Loading from "@/app/utils/loading"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const CarouselGeneBooks = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 }
        }
    })

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_CATEGORIES, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)

        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    if (error) return <ErrorAPI />
    if (isLoading) return <Loading />

    const allCategories = data?.data?.categories

    return (
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mb-16 sm:mb-24 lg:mb-32">
            <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-gray-800 px-4 mb-3 sm:mb-4">
                    Các thể loại
                </h2>
                <div className="mx-auto w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                    Với các thể loại phong phú, bạn có thể tìm thấy cuốn sách phù hợp với mình
                </p>
            </div>

            <div className="relative">
                <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
                    <div className="flex py-2 sm:py-4">
                        {allCategories?.map((category) => (
                            <div key={category._id} className="flex-[0_0_180px] min-w-0 px-2 sm:flex-[0_0_220px] sm:px-3 md:flex-[0_0_250px] lg:flex-[0_0_280px]">
                                <Link href={"#"} className="block">
                                    <div className="group relative h-40 sm:h-48 lg:h-56 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                                        <Image
                                            src={category.thumbnail.url || "/placeholder.svg"}
                                            alt={`Hình ảnh minh hoạ cho ${category.name}`}
                                            fill
                                            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 250px, 280px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ objectPosition: "center" }}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-20">
                                            <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-1">{category.name}</h3>
                                            <div className="w-8 sm:w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-2 transform origin-left transition-all duration-300 group-hover:w-12 sm:group-hover:w-16"></div>
                                            <p className="text-gray-200 dark:text-[#aaaa56] hover:dark:text-[#e1e172] hover:scale-110 text-xs sm:text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                Khám phá ngay
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons - hidden on small screens */}
                <button
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                >
                    <FaChevronLeft className="h-4 w-4 lg:h-5 lg:w-5 text-gray-700 dark:text-gray-200" />
                </button>

                <button
                    className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                >
                    <FaChevronRight className="h-4 w-4 lg:h-5 lg:w-5 text-gray-700 dark:text-gray-200" />
                </button>
            </div>

            {/* Dots indicator for mobile */}
            <div className="flex justify-center mt-4 sm:hidden">
                <div className="flex space-x-1">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarouselGeneBooks