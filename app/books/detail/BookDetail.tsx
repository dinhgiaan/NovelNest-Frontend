"use client";

import BookCard from "@/app/components/ui/card/book.card";
import InfoDetail from "@/app/components/book/more.book.detail";
import ErrorAPI from "@/app/components/error.api";
import Loading from "@/app/utils/loading";
import Link from "next/link";
import { ArrowLeft, Tags, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
  lineExpand,
} from "@/app/components/motion/variants";
import ScrollReveal from "@/app/components/motion/scroll.reveal";
import { DiagonalRibbon } from "@/app/components/motion/diagonal.banner";
import PaymentMethod from "@/app/components/book/payment.method";
import ReadMore from "@/app/components/ui/read.more";
import ButtonBack from "@/app/components/ui/button.back";
import { usePurchasedBooks } from "@/app/hooks/use.purchased.book";
import { useCartStore } from "@/app/lib/store/cart.store";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface BookDetailProps {
  book: IBook | null;
  error: Error | string | null;
  isLoading: boolean;
  userId?: string;
}

const BookDetail = ({ book, error, isLoading }: BookDetailProps) => {
  const [clickBuy, setClickBuy] = useState(false);
  const isPurchasedCheck = usePurchasedBooks();
  const { addToCart } = useCartStore();
  const isBookPurchased = book ? isPurchasedCheck(book._id) : false;

  const handleAddToCart = useCallback(
    (b: IBook) => {
      const finalPrice =
        b.promotionPrice && b.promotionPrice > 0 ? b.promotionPrice : b.price;
      addToCart({
        bookId: b._id,
        title: b.title,
        author: b.author,
        price: finalPrice,
        promotionPrice: b.promotionPrice ?? 0,
        thumbnail: { url: b.thumbnail!.url },
        slug: b.slug ?? "",
      });
      toast.success(`Đã thêm "${b.title}" vào giỏ hàng`);
    },
    [addToCart],
  );

  if (error) return <ErrorAPI />;
  if (isLoading) return <Loading />;
  if (!book)
    return (
      <div className="p-4 text-center text-ink-muted">Không tìm thấy sách</div>
    );
  if (clickBuy) return <PaymentMethod book={book} />;

  const hasDiscount = book.promotionPrice && book.promotionPrice > 0;
  const discountPct = hasDiscount
    ? Math.round((1 - book.promotionPrice! / book.price) * 100)
    : 0;
  const finalPrice = hasDiscount ? book.promotionPrice! : book.price;
  const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <div className="bg-base min-h-screen">
      <div className="h-[62px]" />

      <div className="relative overflow-hidden border-b-4 border-accent">
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-[clamp(5rem,14vw,13rem)] leading-[0.85] absolute -right-[1%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[#efecec] dark:text-[#FFFFFF0A]">
          BOOK
        </motion.span>

        <div className="max-w-[1200px] mx-auto px-6 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}>
            <ButtonBack className="inline-flex items-center gap-2 mb-5 transition-colors hover:text-accent text-ink">
              <ArrowLeft size={14} />
              <span className="uppercase tracking-widest font-body text-sm">
                Quay lại
              </span>
            </ButtonBack>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
            <motion.div
              className="relative"
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              custom={0.1}>
              {hasDiscount && (
                <DiagonalRibbon
                  label={`-${discountPct}%`}
                  color="var(--accent)"
                  position="top-left"
                  size="md"
                />
              )}
              <BookCard
                book={book}
                variant="detail"
                isPurchased={isBookPurchased}
                onPreview={() => {}}
                onAddToCart={handleAddToCart}
                onBuyNow={() => setClickBuy(true)}
                showPrice={false}
                showRating
                showActions
              />
            </motion.div>

            <motion.div
              className="py-2 space-y-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible">
              {/* Categories */}
              {(book.categories?.length ?? 0) > 0 && (
                <motion.div
                  variants={staggerItem}
                  className="flex flex-wrap gap-2">
                  {book.categories?.map((item) => {
                    const id = typeof item === "object" ? item._id : item;
                    const name = typeof item === "object" ? item.name : item;
                    return (
                      <motion.span
                        key={id}
                        whileHover={{ y: -2, scale: 1.04 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-wider bg-accent/15 text-accent border border-accent/30 rounded-sm font-body font-medium">
                        <Tags size={10} />
                        {name}
                      </motion.span>
                    );
                  })}
                </motion.div>
              )}

              {/* Title */}
              <motion.div variants={staggerItem}>
                <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] tracking-[0.03em] leading-none mb-1 text-ink">
                  {book.title}
                </h1>
                <p className="font-serif italic text-base text-ink-muted">
                  {book.author}
                </p>
              </motion.div>

              {/* Rating */}
              {(book.rating ?? 0) > 0 && (
                <motion.div
                  variants={staggerItem}
                  className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => {
                      const isFilled = i < Math.round(book.rating ?? 0);
                      return (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.4 + i * 0.06,
                            type: "spring",
                            stiffness: 400,
                          }}>
                          <Star
                            size={14}
                            className={
                              isFilled
                                ? "text-gold"
                                : "text-black/20 dark:text-white/20"
                            }
                            fill={isFilled ? "currentColor" : "none"}
                          />
                        </motion.div>
                      );
                    })}
                    <span className="text-gold font-body text-[0.8rem]">
                      {(book.rating ?? 0).toFixed(1)}
                    </span>
                  </div>
                  {(book.sold ?? 0) > 0 && (
                    <span className="text-ink-faint font-body text-[0.75rem]">
                      (Đã bán {(book.sold ?? 0).toLocaleString()})
                    </span>
                  )}
                </motion.div>
              )}

              {/* Price */}
              <motion.div
                variants={staggerItem}
                className="flex items-baseline gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  className="font-display text-[2rem] text-gold tracking-[0.03em]">
                  {fmt(finalPrice)}
                </motion.span>
                {hasDiscount && (
                  <span className="text-[0.9rem] line-through text-ink-muted">
                    {fmt(book.price)}
                  </span>
                )}
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap gap-3 pt-1">
                {isBookPurchased && book.epubFile?.url ? (
                  <Link href={`/books/read/${book.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-widest uppercase text-white transition-all duration-300 bg-gold rounded-sm font-body">
                      <BookOpen size={15} className="relative z-10" />
                      <span className="relative z-10">Đọc sách</span>
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#a67c2a]"
                      />
                    </motion.button>
                  </Link>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setClickBuy(true)}
                      className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-widest uppercase text-white transition-all duration-300 bg-accent rounded-sm font-body">
                      <span className="relative z-10">Mua ngay</span>
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent-dark"
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAddToCart(book)}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-300 rounded-sm font-body bg-transparent cursor-pointer border border-ink/25 text-ink/70 hover:border-ink/60 hover:text-ink">
                      Thêm vào giỏ
                    </motion.button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Description + Details ── */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mô tả */}
          <ScrollReveal
            className="md:col-span-2"
            variants={slideLeft}
            delay={0}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-display text-accent tracking-[0.2em] text-[0.7rem]">
                MÔ TẢ
              </span>
              <motion.div
                variants={lineExpand}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-1 h-px bg-ink/10"
              />
            </div>
            <ReadMore maxLines={9}>
              <p className="text-sm text-ink-muted font-body leading-[1.75]">
                {book.description}
              </p>
            </ReadMore>
          </ScrollReveal>

          {/* Thông tin */}
          <ScrollReveal variants={slideRight} delay={0.1}>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-display text-accent tracking-[0.2em] text-[0.7rem]">
                THÔNG TIN
              </span>
              <motion.div
                variants={lineExpand}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-1 h-px bg-ink/10"
              />
            </div>
            <motion.div
              className="space-y-3 p-5 bg-base-alt border border-ink/10 rounded-sm"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              {[
                { l: "Tác giả", v: book.author },
                { l: "Nhà xuất bản", v: book.publisher || "—" },
                { l: "Số trang", v: book.pages ? `${book.pages} trang` : "—" },
                { l: "ISBN", v: book.isbn },
                {
                  l: "Trạng thái",
                  v: book.status === "available" ? "Có sẵn" : book.status,
                },
              ].map(({ l, v }) => (
                <motion.div
                  key={l}
                  variants={staggerItem}
                  className="flex justify-between items-start gap-2">
                  <span className="text-ink-faint font-body text-[0.75rem] tracking-[0.08em] uppercase flex-shrink-0">
                    {l}
                  </span>
                  <span className="text-ink font-body text-[0.85rem] text-right">
                    {v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16">
        {/* <ScrollReveal variants={fadeUp}>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-display text-accent tracking-[0.2em] text-[0.7rem]">
              CÓ THỂ BẠN THÍCH
            </span>
            <motion.div
              variants={lineExpand}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-1 h-px bg-ink/10"
            />
          </div>
        </ScrollReveal> */}
        <InfoDetail />
      </div>
    </div>
  );
};

export default BookDetail;
