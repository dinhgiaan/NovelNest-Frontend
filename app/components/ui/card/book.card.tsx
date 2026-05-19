"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Heart, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import convertPriceToVND from "../../../utils/convert.price";
import Button from "../button";
import formatDate from "@/app/utils/format.date";

interface BookCardProps {
  book: IBook;
  variant?: "default" | "purchased" | "detail" | "white_lists";
  isPurchased?: boolean;
  onAddToCart?: (book: IBook) => void;
  onBuyNow?: (book: IBook) => void;
  onPreview?: (book: IBook) => void;
  onRemoveFromWishlist?: (book: IBook) => void;
  showActions?: boolean;
  showRating?: boolean;
  showSold?: boolean;
  showPrice?: boolean;
  showPurchaseDate?: boolean;
  className?: string;
}

const BookCard = ({
  book,
  variant = "default",
  isPurchased = false,
  onAddToCart,
  onBuyNow,
  onRemoveFromWishlist,
  showActions = true,
  showRating = true,
  showSold = true,
  showPrice = true,
  showPurchaseDate = false,
  className = "",
}: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const optimizeCloudinaryUrl = (url: string) =>
    url.includes("res.cloudinary.com")
      ? url.replace("/upload/", "/upload/f_auto,q_auto/")
      : url;

  const hasPromotion = !!(
    book.promotionPrice &&
    book.promotionPrice > 0 &&
    book.promotionPrice < book.price
  );
  const finalPrice = hasPromotion ? book.promotionPrice! : book.price;
  const discountPct = hasPromotion
    ? Math.round((1 - book.promotionPrice! / book.price) * 100)
    : book.discountPercent || 0;
  const imgSrc = optimizeCloudinaryUrl(
    book?.thumbnail?.url || "/placeholder-book.jpg",
  );

  const DiscountBadge = () => {
    if (!discountPct || discountPct <= 0) return null;
    if (variant === "default" || variant === "white_lists") {
      return (
        <div
          className="absolute top-2 left-2 z-20"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            color: "#ffffff",
            fontSize: "0.65rem",
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            borderRadius: "2px",
            padding: "2px 4px",
            lineHeight: 1,
          }}>
                    -{discountPct}%        {" "}
        </div>
      );
    }
    return null;
  };

  const renderPrice = () => {
    if (!showPrice || !book.price) return null;
    return (
      <div className="mt-2">
        {hasPromotion ? (
          <div className="flex flex-col gap-0.5">
            <span
              style={{
                color: "var(--ink-faint)",
                fontSize: "0.68rem",
                textDecoration: "line-through",
                fontFamily: "var(--font-body)",
              }}>
              {convertPriceToVND(book.price)}
            </span>
            <span
              style={{
                color: "var(--accent)",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}>
              {convertPriceToVND(finalPrice)}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span
              style={{
                color: "var(--ink-faint)",
                fontSize: "0.68rem",
                fontFamily: "var(--font-body)",
              }}>
              ㅤ
            </span>
            <span
              style={{
                color: "var(--gold)",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}>
              {convertPriceToVND(book.price)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderRating = () => {
    if (!showRating) return null;
    const rating = Number(book.rating) || 0;
    return (
      <div className="flex items-center justify-between mt-2 text-xs">
        <div className="flex items-center gap-0.5">
          <Star size={10} style={{ color: "var(--gold)" }} fill="var(--gold)" />
          <span
            style={{
              color: "var(--ink-muted)",
              fontFamily: "var(--font-body)",
            }}>
            {rating.toFixed(1)}
          </span>
        </div>
        {showSold && (
          <span
            style={{
              color: "var(--ink-faint)",
              fontSize: "0.65rem",
              fontFamily: "var(--font-body)",
            }}>
            {book.sold} bán
          </span>
        )}
      </div>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    switch (variant) {
      case "purchased":
        return (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,.45)" }}>
                <Link href={`/books/detail/${book.slug}`}>
                  <motion.div
                    initial={{ scale: 0.85, y: 6 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 20,
                    }}>
                    <Button variant="blue" size="sm">
                      Xem chi tiết
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        );

      default:
        if (isPurchased) {
          return (
            <div className="mt-auto pt-2">
              <Link href={`/books/read/${book.slug}`}>
                <button
                  className="group relative overflow-hidden w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 text-white"
                  style={{
                    background: "var(--gold)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-body)",
                  }}>
                  <BookOpen size={11} className="relative z-10" />
                  <span className="relative z-10">Đọc sách</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: "#a67c2a" }}
                  />
                </button>
              </Link>
            </div>
          );
        }
        return (
          <div className="flex gap-1.5 mt-auto pt-2 w-full">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => onAddToCart?.(book)}
              className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-all duration-200"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--ink) 16%, transparent)",
                color: "var(--ink-muted)",
                borderRadius: "2px",
                fontFamily: "var(--font-body)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "color-mix(in srgb, var(--ink) 16%, transparent)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--ink-muted)";
              }}>
              <ShoppingCart size={10} />
              <span className="hidden sm:inline">Thêm</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => onBuyNow?.(book)}
              className="flex-1 py-2 text-xs font-medium text-white transition-all duration-200"
              style={{
                background: "var(--accent)",
                borderRadius: "2px",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--accent-dark)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--accent)")
              }>
              Mua
            </motion.button>
          </div>
        );
    }
  };

  if (variant === "detail") {
    return (
      <div
        className={`overflow-hidden ${className}`}
        style={{
          background: "var(--bg-alt)",
          borderRadius: "2px",
          maxWidth: 245,
        }}>
        <div style={{ aspectRatio: "2/3", position: "relative" }}>
          <Image
            src={imgSrc}
            alt={book.title}
            fill
            className="object-contain"
            priority
            quality={85}
            sizes="245px"
          />
        </div>
        {/* Rating detail */}
        {showRating && (
          <div className="p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  style={{
                    color:
                      i < Math.floor(book.rating!)
                        ? "var(--gold)"
                        : "var(--ink-faint)",
                  }}
                  fill={i < Math.floor(book.rating!) ? "var(--gold)" : "none"}
                />
              ))}
              <span
                style={{
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-body)",
                  marginLeft: 2,
                }}>
                {book.rating?.toFixed(1)}
              </span>
            </div>
            <span
              style={{
                color: "var(--ink-faint)",
                fontSize: "0.7rem",
                fontFamily: "var(--font-body)",
              }}>
              (Đã bán {book.sold})
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative flex flex-col overflow-hidden ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
        borderRadius: "2px",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: "0 16px 40px rgba(0,0,0,.12)",
        borderColor: "color-mix(in srgb, var(--ink) 18%, transparent)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <DiscountBadge />

        {variant === "white_lists" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveFromWishlist?.(book);
            }}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,.9)",
              backdropFilter: "blur(4px)",
            }}>
            <Heart
              size={14}
              style={{ color: "var(--accent)", fill: "var(--accent)" }}
            />
          </motion.button>
        )}

        <Link href={`/books/detail/${book.slug}`} className="block h-full">
          <motion.div
            className="h-full w-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
            <Image
              src={imgSrc}
              alt={book.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
            />
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 55%)",
                }}
              />
            )}
          </AnimatePresence>
        </Link>

        {variant === "purchased" && renderActions()}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 p-3">
        {showPurchaseDate && book.purchaseDate && (
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--ink-faint)",
              fontFamily: "var(--font-body)",
              marginBottom: "0.25rem",
            }}>
            {formatDate(book.purchaseDate)}
          </p>
        )}

        <Link href={`/books/detail/${book.slug}`}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--ink)",
              lineHeight: 1.3,
            }}
            className="line-clamp-1 hover:text-[var(--accent)] transition-colors">
            {book.title}
          </p>
        </Link>

        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "0.7rem",
            fontFamily: "'Playfair Display', serif",
          }}
          className="truncate mt-0.5 italic">
          {book.author}
        </p>

        {renderPrice()}
        {renderRating()}

        {variant !== "purchased" && renderActions()}
      </div>
    </motion.div>
  );
};

export default BookCard;
