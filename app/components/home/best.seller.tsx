"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Award, Star } from "lucide-react";
import { useBooksSold } from "@/app/hooks/use.sold";
import ErrorAPI from "../error.api";
import convertPriceToVND from "@/app/utils/convert.price";
import { staggerContainer } from "../motion/variants";

const RANK = {
  1: {
    label: "BEST SELLER",
    icon: Flame,
    bgClass: "bg-accent",
    borderClass: "border-accent",
    ringClass: "ring-1 ring-accent",
  },
  2: {
    label: "TOP 2",
    icon: TrendingUp,
    bgClass: "bg-gold",
    borderClass: "border-ink/10",
    ringClass: "",
  },
  3: {
    label: "TOP 3",
    icon: Award,
    bgClass: "bg-ink-muted",
    borderClass: "border-ink/10",
    ringClass: "",
  },
} as const;

const Skeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-6 items-end">
    {[280, 380, 280].map((h, i) => (
      <div
        key={i}
        className="skeleton rounded-sm w-full"
        style={{ height: h }}
      />
    ))}
  </div>
);

interface CardProps {
  book: IBook;
  rank: 1 | 2 | 3;
}

const Card = memo(({ book, rank }: CardProps) => {
  const cfg = RANK[rank];
  const Icon = cfg.icon;
  const isFirst = rank === 1;

  const hasPromo = !!(
    book.promotionPrice &&
    book.promotionPrice > 0 &&
    book.promotionPrice < book.price
  );
  const finalPrice = hasPromo ? book.promotionPrice! : book.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 + rank * 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.65,
        delay: rank === 1 ? 0 : rank * 0.1,
        ease: [0.34, 1.2, 0.64, 1],
      }}>
      <Link
        href={`/books/detail/${book.slug}`}
        prefetch={isFirst}
        className="group block">
        <motion.div
          whileHover={{ y: isFirst ? -10 : -6 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="relative">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + rank * 0.08 }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-sm mb-2.5 ${cfg.bgClass}`}>
            <Icon size={11} className="text-white" />
            <span className="font-display text-[0.7rem] tracking-[0.2em] text-white uppercase mt-0.5">
              {cfg.label}
            </span>
          </motion.div>

          <div
            className={`bg-surface border rounded-sm overflow-hidden ${cfg.borderClass} ${cfg.ringClass}`}>
            {/* Thumbnail */}
            <div className="relative aspect-[2/3] bg-base-alt overflow-hidden">
              <Image
                src={book.thumbnail?.url || "/placeholder-book.jpg"}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={
                  isFirst
                    ? "(max-width:1024px) 60vw, 380px"
                    : "(max-width:1024px) 40vw, 240px"
                }
                priority={isFirst}
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.85)_0%,transparent_55%)]"
              />

              <div
                aria-hidden
                className={`absolute -top-2 right-2 font-display leading-none text-white/5 select-none pointer-events-none ${
                  isFirst ? "text-[7rem]" : "text-[5rem]"
                }`}>
                {rank}
              </div>

              <div className="absolute bottom-0 inset-x-0 px-3.5 pt-3.5 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const isFilled = i < Math.round(book.rating ?? 0);
                      return (
                        <Star
                          key={i}
                          size={10}
                          className={
                            isFilled
                              ? "text-gold fill-current"
                              : "text-white/20"
                          }
                        />
                      );
                    })}
                  </div>
                  <span className="text-white/55 text-[0.68rem] font-body">
                    {(book.sold ?? 0).toLocaleString()} bán
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className={isFirst ? "px-4 pt-4 pb-[1.1rem]" : "p-3"}>
              <h3
                className={`font-body font-semibold text-ink leading-[1.35] line-clamp-2 transition-colors group-hover:text-accent mb-1 ${
                  isFirst ? "text-[0.9rem]" : "text-[0.78rem]"
                }`}>
                {book.title}
              </h3>

              <p
                className={`font-serif text-[0.7rem] italic text-ink-muted truncate ${
                  isFirst ? "mb-3" : "mb-0"
                }`}>
                {book.author}
              </p>

              {/* Price — chỉ hiện ở rank 1 */}
              {isFirst && (
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`font-display text-[1.3rem] tracking-[0.03em] ${
                      hasPromo ? "text-accent" : "text-gold"
                    }`}>
                    {convertPriceToVND(finalPrice)}
                  </span>
                  {hasPromo && (
                    <span className="text-ink-faint text-[0.75rem] line-through font-body">
                      {convertPriceToVND(book.price)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
});
Card.displayName = "BestSellerCard";

const BestSeller = () => {
  const { data, error, isLoading } = useBooksSold({ limit: 50 });

  const [second, first, third] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [null, null, null];
    const top = [...data.data]
      .sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
      .slice(0, 3);
    return top.length < 3 ? [null, null, null] : [top[1], top[0], top[2]];
  }, [data]);

  if (error) return <ErrorAPI />;
  if (isLoading) return <Skeleton />;
  if (!first)
    return (
      <div className="p-12 text-center border border-dashed border-ink/15 rounded-sm text-ink-muted font-display tracking-[0.06em]">
        Chưa có dữ liệu bestseller
      </div>
    );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}>
      <div className="max-w-[680px] mx-auto">
        <div className="grid grid-cols-3 gap-4 items-end">
          <div className="mb-8">
            {second && <Card book={second} rank={2} />}
          </div>

          <div className="-mt-6">{first && <Card book={first} rank={1} />}</div>

          <div className="mb-14">{third && <Card book={third} rank={3} />}</div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mt-8">
        <div className="flex-1 h-px bg-ink/10" />
        <span className="font-display text-[0.62rem] tracking-[0.22em] text-ink-faint uppercase">
          XẾP HẠNG THEO LƯỢT BÁN
        </span>
        <div className="flex-1 h-px bg-ink/10" />
      </motion.div>
    </motion.div>
  );
};

export default memo(BestSeller);
