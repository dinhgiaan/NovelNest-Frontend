"use client"
import Image from "next/image"
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft } from "react-icons/fa"

const reviewsData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        avatar: "https://picsum.photos/id/237/200/300",
        rating: 5,
        date: "15/03/2025",
        comment: "Sách rất hay và chất lượng. Giao hàng nhanh chóng, đóng gói cẩn thận. Tôi rất hài lòng và chắc chắn sẽ quay lại.",
        rotate: "-5deg",
    },
    {
        id: 2,
        name: "Trần Thị B",
        avatar: "https://picsum.photos/seed/picsum/200/300",
        rating: 4.5,
        date: "10/03/2025",
        comment: "Nội dung sách rất bổ ích, nhưng bìa hơi bị cong khi nhận. Tuy nhiên, nhìn chung vẫn rất tốt.",
        rotate: "2deg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://picsum.photos/200/300?grayscale",
        rating: 4,
        date: "05/03/2025",
        comment: "Dịch vụ khách hàng tuyệt vời. Họ đã giải quyết vấn đề đơn hàng của tôi nhanh chóng và hiệu quả.",
        rotate: "-3deg",
    },
]


// Component hiển thị sao đánh giá
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) =>
                i + 1 <= rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                ) : i + 0.5 < rating ? (
                    <FaStarHalfAlt key={i} className="text-yellow-400" />
                ) : (
                    <FaRegStar key={i} className="text-yellow-400" />
                )
            )}
        </div>
    )
}

const CustomerReviews = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Đánh giá của khách hàng</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto my-3 rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Khám phá trải nghiệm của những độc giả đã mua sách tại cửa hàng chúng tôi
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {reviewsData.map(({ id, name, avatar, rating, date, comment, rotate }) => (
                    <div
                        key={id}
                        className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}
                        style={{ transform: `rotate(${rotate})` }}
                    >
                        <div className="flex items-start mb-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-cyan-500">
                                <Image src={avatar} alt={`Avatar của ${name}`} fill className="object-cover" priority />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
                            </div>
                            <div className="ml-auto">
                                <StarRating rating={rating} />
                            </div>
                        </div>

                        <div className="relative text-gray-600 dark:text-gray-300 pl-6 pt-2 italic">
                            <FaQuoteLeft className="absolute -left-1 -top-1 text-gray-200 dark:text-gray-700 opacity-50 text-xl" />
                            {comment}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerReviews
