"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { Star, StarHalf, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../motion/variants";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  role?: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Trần Nguyễn Ngọc Ngân",
    avatar: "/assets/avatar1.webp",
    rating: 5,
    date: "15/03/2025",
    role: "Sinh viên Đại học",
    comment:
      "Sách rất hay và chất lượng. Bố cục đẹp mắt, nội dung phong phú. Tôi rất hài lòng với trải nghiệm đọc sách trực tuyến tại NovelNest.",
  },
  {
    id: 2,
    name: "Đặng Hoàng Thắng",
    avatar: "/assets/avatar2.webp",
    rating: 4.8,
    date: "10/03/2025",
    role: "Kỹ sư phần mềm",
    comment:
      "Nội dung rất bổ ích và thú vị. Dịch vụ khách hàng chuyên nghiệp, đáng để trải nghiệm. Giao diện thân thiện, dễ dùng.",
  },
  {
    id: 3,
    name: "Lê Thuý Hà",
    avatar: "/assets/avatar3.webp",
    rating: 5,
    date: "05/03/2025",
    role: "Giáo viên",
    comment:
      "Đội ngũ hỗ trợ tuyệt vời. Họ đã phản hồi câu hỏi của tôi nhanh chóng và rất tận tình. Sẽ tiếp tục ủng hộ lâu dài.",
  },
  {
    id: 4,
    name: "Nguyễn Văn Minh",
    avatar: "/assets/avatar4.webp",
    rating: 4,
    date: "28/02/2025",
    role: "Nhà nghiên cứu",
    comment:
      "Chất lượng tốt, đóng gói cẩn thận. Giá cả hợp lý so với chất lượng nhận được. Thư viện sách đa dạng và phong phú.",
  },
  {
    id: 5,
    name: "Phạm Thị Lan",
    avatar: "/assets/avatar5.webp",
    rating: 5,
    date: "20/02/2025",
    role: "Nhà văn tự do",
    comment:
      "Website dễ sử dụng, tìm kiếm sách thuận tiện. Rất nhiều thể loại để lựa chọn cho mọi lứa tuổi và sở thích.",
  },
];

const StarRating = memo(
  ({ rating, size = 13 }: { rating: number; size?: number }) => {
    const stars = useMemo(
      () =>
        Array.from({ length: 5 }, (_, i) => {
          if (i + 1 <= rating)
            return (
              <Star key={i} size={size} className="text-gold fill-current" />
            );
          if (i + 0.5 < rating)
            return (
              <StarHalf
                key={i}
                size={size}
                className="text-gold fill-current"
              />
            );
          return <Star key={i} size={size} className="text-ink/15" />;
        }),
      [rating, size],
    );
    return <div className="flex gap-0.5">{stars}</div>;
  },
);
StarRating.displayName = "StarRating";

const FeaturedCard = memo(({ review }: { review: Review }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    className="group relative h-full flex flex-col bg-surface rounded-sm overflow-hidden">
    <div className="h-[3px] bg-accent shrink-0" />

    <div className="flex flex-col flex-1 p-7">
      <div className="mb-6">
        <div className="inline-flex bg-accent/15 rounded-sm p-2">
          <Quote size={18} className="text-accent" />
        </div>
      </div>

      <p className="font-serif italic text-[1.05rem] text-ink/80 leading-[1.75] flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="my-5">
        <StarRating rating={review.rating} size={14} />
      </div>

      <div className="pt-5 flex items-center gap-3.5">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 relative">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
            sizes="46px"
          />
        </motion.div>
        <div className="min-w-0">
          <p className="font-body font-semibold text-[0.85rem] text-ink truncate">
            {review.name}
          </p>
          <p className="text-[0.68rem] text-ink-muted font-body mt-0.5">
            {review.role} · {review.date}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
));
FeaturedCard.displayName = "FeaturedCard";

const CompactCard = memo(({ review }: { review: Review }) => (
  <motion.div
    variants={staggerItem}
    whileHover={{ y: -3 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className="group flex flex-col h-full bg-surface  rounded-sm p-5 relative overflow-hidden transition-colors duration-300 hover:border-ink/20">
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

    <div className="flex items-center justify-between mb-3">
      <StarRating rating={review.rating} size={11} />
      <span className="text-[0.62rem] text-ink-faint font-body">
        {review.date}
      </span>
    </div>

    <p className="font-serif italic text-[0.8rem] text-ink-muted leading-[1.65] flex-1 line-clamp-3">
      &ldquo;{review.comment}&rdquo;
    </p>

    <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-ink/5">
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-[1.5px] border-ink/10 relative">
        <Image
          src={review.avatar}
          alt={review.name}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>
      <div className="min-w-0">
        <p className="font-body font-semibold text-[0.75rem] text-ink truncate">
          {review.name}
        </p>
        <p className="text-[0.62rem] text-ink-faint font-body mt-0.5">
          {review.role}
        </p>
      </div>
    </div>
  </motion.div>
));
CompactCard.displayName = "CompactCard";

const StatsBar = () => {
  const avg = (
    reviewsData.reduce((s, r) => s + r.rating, 0) / reviewsData.length
  ).toFixed(1);

  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviewsData.filter((r) => Math.round(r.rating) === s).length,
    pct: Math.round(
      (reviewsData.filter((r) => Math.round(r.rating) === s).length /
        reviewsData.length) *
        100,
    ),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-5 bg-base-alt rounded-sm border border-ink/10 border-l-[3px] border-l-accent">
      <div className="text-center sm:pr-6 shrink-0">
        <div className="font-display text-[3.5rem] leading-none text-ink">
          {avg}
        </div>
        <div className="mt-1 flex justify-center">
          <StarRating rating={parseFloat(avg)} size={14} />
        </div>
        <p className="text-[0.65rem] text-ink-faint font-body mt-1.5 tracking-[0.1em] uppercase">
          {reviewsData.length} ĐÁNH GIÁ
        </p>
      </div>

      <div className="flex-1 space-y-1.5 w-full">
        {dist.map(({ star, pct }) => (
          <div key={star} className="flex items-center gap-2.5">
            <span className="font-body text-[0.68rem] text-ink-muted w-3 text-right shrink-0">
              {star}
            </span>
            <Star size={10} className="text-gold fill-current shrink-0" />

            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-ink/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: (5 - star) * 0.06,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${pct > 0 ? "bg-gold" : "bg-transparent"}`}
              />
            </div>

            <span className="font-body text-[0.65rem] text-ink-faint w-8 shrink-0">
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const CustomerReviews = () => {
  const featured = reviewsData[0];
  const compact = reviewsData.slice(1);

  return (
    <div>
      <StatsBar />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}>
        <div className="md:col-span-2">
          <FeaturedCard review={featured} />
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {compact.map((r) => (
            <CompactCard key={r.id} review={r} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default memo(CustomerReviews);
