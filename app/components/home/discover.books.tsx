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
        slidesToScroll: 2,
        dragFree: true,
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
        <div className="relative max-w-screen-xl mx-auto px-4 mb-32">
            <div className="mb-16 text-center">
                <h2 className="text-2xl font-bold dark:text-white text-gray-800 px-4 mb-4">Các thể loại</h2>
                <div className="mx-auto w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Với các thể loại phong phú, bạn có thể tìm thấy cuốn sách phù hợp với mình
                </p>
            </div>

            <div className="relative">
                <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
                    <div className="flex py-4 justify-center">
                        {allCategories?.map((category) => (
                            <div key={category._id} className="flex-[0_0_220px] min-w-0 px-3 sm:flex-[0_0_250px] md:flex-[0_0_280px]">
                                <Link href={"#"} className="block">
                                    <div className="group relative h-56 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                                        <Image
                                            src={category.thumbnail.url || "/placeholder.svg"}
                                            alt={`Hình ảnh minh hoạ cho ${category.name}`}
                                            fill
                                            sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 280px"
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ objectPosition: "center" }}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                                            <h3 className="text-white text-lg font-bold mb-1">{category.name}</h3>
                                            <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-2 transform origin-left transition-all duration-300 group-hover:w-16"></div>
                                            <p className="text-gray-200 dark:text-[#aaaa56] hover:dark:text-[#e1e172] hover:scale-110 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                Khám phá ngay
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={scrollPrev}
                    disabled={!prevBtnEnabled}
                >
                    <FaChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </button>

                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={scrollNext}
                    disabled={!nextBtnEnabled}
                >
                    <FaChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </button>
            </div>

        </div>
    )
}

export default CarouselGeneBooks

