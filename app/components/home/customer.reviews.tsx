"use client"

import { Quote, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { memo, useMemo, useState, useEffect, useRef } from "react";

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    rotate: string;
}

const ANIMATION_DELAY = 150;
const INTERSECTION_THRESHOLD = 0.1;
const ROOT_MARGIN = '50px';

const reviewsData: Review[] = [
    {
        id: 1,
        name: "Trần Nguyễn Ngọc Ngân",
        avatar: "/assets/avatar1.webp",
        rating: 5,
        date: "15/03/2025",
        comment: "Sách rất hay và chất lượng. Bố cục đẹp mắt, nội dung phong phú. Tôi rất hài lòng với trải nghiệm mua sắm.",
        rotate: "-2deg",
    },
    {
        id: 2,
        name: "Đặng Hoàng Thắng",
        avatar: "/assets/avatar2.webp",
        rating: 4.5,
        date: "10/03/2025",
        comment: "Nội dung sách rất bổ ích và thú vị, giao hàng nhanh chóng. Dịch vụ khách hàng chuyên nghiệp.",
        rotate: "1.5deg",
    },
    {
        id: 3,
        name: "Lê Thuý Hà",
        avatar: "/assets/avatar3.webp",
        rating: 5,
        date: "05/03/2025",
        comment: "Dịch vụ khách hàng tuyệt vời. Họ đã phản hồi câu hỏi của tôi nhanh chóng và hiệu quả.",
        rotate: "-1deg",
    },
    {
        id: 4,
        name: "Nguyễn Văn Minh",
        avatar: "/assets/avatar4.webp",
        rating: 4,
        date: "28/02/2025",
        comment: "Chất lượng sách tốt, đóng gói cẩn thận. Giá cả hợp lý so với chất lượng nhận được.",
        rotate: "2deg",
    },
    {
        id: 5,
        name: "Phạm Thị Lan",
        avatar: "/assets/avatar5.webp",
        rating: 5,
        date: "20/02/2025",
        comment: "Website dễ sử dụng, tìm kiếm sách thuận tiện. Rất nhiều thể loại để lựa chọn.",
        rotate: "-1.5deg",
    },
];

const StarRating = memo(({ rating }: { rating: number }) => {
    const stars = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => {
            if (i + 1 <= rating) {
                return <Star key={i} className="text-yellow-400 drop-shadow-sm" />;
            } else if (i + 0.5 < rating) {
                return <StarHalf key={i} className="text-yellow-400 drop-shadow-sm" />;
            } else {
                return <Star key={i} className="text-gray-300 dark:text-gray-600" />;
            }
        });
    }, [rating]);

    return (
        <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
            {stars}
        </div>
    );
});

StarRating.displayName = "StarRating";

const ReviewCard = memo(({
    review,
    isVisible,
    animationDelay
}: {
    review: Review;
    isVisible: boolean;
    animationDelay: number;
}) => {
    const { name, avatar, rating, date, comment, rotate } = review;

    return (
        <div
            className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
        border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600
        transform-gpu transition-all duration-500 hover:-translate-y-2 hover:scale-105
        ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
            style={{
                transform: `rotate(${rotate}) ${isVisible ? 'translateY(0)' : 'translateY(2rem)'}`,
                transitionDelay: `${animationDelay}ms`,
            }}
        >
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 
        rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <Quote className="text-white text-xs" />
            </div>

            <div className="flex items-center mb-4 relative">
                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-3 border-gradient-to-r 
          from-blue-400 to-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <Image
                                src={avatar}
                                alt={`${name}'s avatar`}
                                width={56}
                                height={56}
                                className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-full"
                                sizes="(max-width: 768px) 48px, 56px"
                                loading="lazy"
                                quality={75}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-white truncate text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{date}</p>
                </div>
            </div>

            <div className="mb-4 flex justify-center">
                <StarRating rating={rating} />
            </div>

            <div className="relative">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm italic font-medium">
                    &quot;{comment}&quot;
                </p>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-50/20 dark:to-blue-900/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -m-2" />
            </div>

            <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent 
        dark:from-transparent dark:via-blue-700 dark:to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
    );
});

ReviewCard.displayName = "ReviewCard";

const CustomerReviews = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: INTERSECTION_THRESHOLD,
                rootMargin: ROOT_MARGIN,
            }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const organizedReviews = useMemo(() => {
        const topRow = reviewsData.slice(0, 3); // reviews 1, 2, 3
        const bottomRow = reviewsData.slice(3, 5); // reviews 4, 5

        return { topRow, bottomRow };
    }, []);

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4" ref={ref}>
                <div className="mb-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 
                              dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
                        Đánh giá của khách hàng
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-md">
                        Khám phá trải nghiệm tuyệt vời của những độc giả đã tin tựa và lựa chọn cửa hàng chúng tôi
                    </p>
                    <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mt-3"></div>
                </div>

                <div className="relative">
                    {/* Top Row - Reviews 1, 2, 3 */}
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {organizedReviews.topRow.map((review, index) => (
                            <div key={review.id} className="relative hover:scale-110 transition ease-in-out">
                                <ReviewCard
                                    review={review}
                                    isVisible={isVisible}
                                    animationDelay={index * ANIMATION_DELAY}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:grid md:grid-cols-6 gap-8">
                        <div />

                        {/* Review 4 - Between positions 1 & 2 */}
                        <div className="col-span-2 hover:scale-110 transition ease-in-out">
                            <ReviewCard
                                review={organizedReviews.bottomRow[0]}
                                isVisible={isVisible}
                                animationDelay={3 * ANIMATION_DELAY}
                            />
                        </div>

                        {/* Review 5 - Between positions 2 & 3 */}
                        <div className="col-span-2 hover:scale-110 transition ease-in-out">
                            <ReviewCard
                                review={organizedReviews.bottomRow[1]}
                                isVisible={isVisible}
                                animationDelay={4 * ANIMATION_DELAY}
                            />
                        </div>
                        <div />
                    </div>

                    <div className="md:hidden grid gap-6 mt-8">
                        {organizedReviews.bottomRow.map((review, index) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                isVisible={isVisible}
                                animationDelay={(index + 3) * ANIMATION_DELAY}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(CustomerReviews);
