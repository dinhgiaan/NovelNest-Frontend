"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import convertPriceToVND from "../../utils/convert.price";
import { X, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { Drawer } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem, useCartStore } from "@/app/lib/store/cart.store";
import { AuthContext } from "@/app/context/auth.context";
import toast from "react-hot-toast";
import { staggerContainer, staggerItem } from "../motion/variants";

const Cart = () => {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    getTotalAmount,
    getTotalItems,
    clearCart,
  } = useCartStore();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFinalPrice = (item: CartItem) =>
    item.promotionPrice &&
    item.promotionPrice > 0 &&
    item.promotionPrice < item.price
      ? item.promotionPrice
      : item.price;

  const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT;
  if (!paymentUrl && mounted) {
    toast.error("Lỗi cấu hình: Không tìm thấy URL thanh toán");
  }

  const handleCheckout = async () => {
    if (!paymentUrl) return;
    if (items.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }
    if (!user?._id) {
      toast.error("Vui lòng đăng nhập để thanh toán", { duration: 4000 });
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch(paymentUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            ...i,
            quantity: 1,
            price: getFinalPrice(i),
          })),
          userId: user._id,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Server không phản hồi");
      if (result.success && result.checkoutUrl) {
        closeCart();
        window.location.href = result.checkoutUrl;
      } else
        throw new Error(result.message || "Không nhận được link thanh toán");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Có lỗi xảy ra";
      if (msg.includes("đã mua")) toast.error(msg, { duration: 5000 });
      else if (msg.includes("không khớp")) {
        toast.error("Giá sách đã thay đổi, đang làm mới...", {
          duration: 4000,
        });
        setTimeout(() => window.location.reload(), 3000);
      } else toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (item: CartItem) => {
    setRemovingId(item.bookId);
    await new Promise((r) => setTimeout(r, 250));
    removeFromCart(item.bookId);
    setRemovingId(null);
    toast.success(`Đã xóa "${item.title}"`);
  };

  const handleClear = () => {
    if (!items.length) return;
    clearCart();
    toast.success("Đã xóa tất cả sách khỏi giỏ hàng");
  };

  if (!mounted) return null;

  const canCheckout = !!user?._id && !isProcessing;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          maxWidth: "100vw",
          background: "var(--surface)",
          boxShadow: "-8px 0 32px rgba(0,0,0,.4)",
          borderLeft: "3px solid var(--accent)",
        },
        "& .MuiBackdrop-root": { backdropFilter: "blur(4px)" },
      }}>
      <div className="h-full flex flex-col bg-surface text-ink">
        <div className="px-6 py-5 border-b border-white/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-[1.3rem] tracking-[0.08em]">
              GIỎ HÀNG
            </span>
            {items.length > 0 && (
              <motion.span
                key={items.length}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="bg-accent text-white font-display text-[0.75rem] tracking-[0.05em] px-2 py-0.5 rounded-sm">
                {items.length}
              </motion.span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {items.length > 1 && (
              <button
                onClick={handleClear}
                disabled={isProcessing}
                className="text-ink-faint font-body text-[0.72rem] tracking-[0.08em] bg-transparent border-none cursor-pointer transition-colors hover:text-accent disabled:opacity-50">
                Xóa tất cả
              </button>
            )}
            <button
              onClick={closeCart}
              className="p-1.5 rounded-sm border border-ink/10 bg-transparent text-ink-muted flex items-center cursor-pointer transition-all duration-200 hover:border-accent hover:text-accent">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Items list ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}>
                  <BookOpen size={48} className="text-ink/10 mb-6" />
                </motion.div>
                <p className="font-display text-[1.4rem] tracking-[0.06em] text-ink/50 mb-2 uppercase">
                  GIỎ HÀNG TRỐNG
                </p>
                <p className="text-ink-muted font-body text-[0.8rem] mb-6">
                  Hãy thêm một vài cuốn sách yêu thích!
                </p>
                <Link href="/books" onClick={closeCart}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-accent text-white font-body text-[0.78rem] tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm border-none cursor-pointer flex items-center gap-2">
                    Khám phá sách <ArrowRight size={13} />
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              /* Items */
              <motion.div
                key="items"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3">
                {items.map((item) => {
                  const finalPrice = getFinalPrice(item);
                  const hasPromo =
                    item.promotionPrice &&
                    item.promotionPrice > 0 &&
                    item.promotionPrice < item.price;
                  const isRemoving = removingId === item.bookId;

                  return (
                    <motion.div
                      key={item.bookId}
                      variants={staggerItem}
                      layout
                      exit={{
                        opacity: 0,
                        x: 60,
                        transition: { duration: 0.22 },
                      }}
                      className={`flex gap-3 bg-ink/5 border dark:border-white/40 border-black/30 rounded-sm p-3.5 transition-opacity duration-250 ${
                        isRemoving ? "opacity-40" : "opacity-100"
                      }`}>
                      {/* Thumbnail */}
                      <Link
                        href={`/books/detail/${item.slug}`}
                        onClick={closeCart}
                        className="shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-[52px] h-[70px] rounded-sm overflow-hidden border border-ink/10 relative">
                          <Image
                            src={item.thumbnail.url || "/placeholder-book.jpg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="52px"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder-book.jpg";
                            }}
                          />
                        </motion.div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/books/detail/${item.slug}`}
                            onClick={closeCart}>
                            <p className="font-body text-[0.8rem] font-semibold text-ink leading-[1.3] line-clamp-2 transition-colors hover:text-accent">
                              {item.title}
                            </p>
                          </Link>
                          <p className="font-serif text-[0.7rem] text-ink-muted italic truncate mt-0.5">
                            {item.author}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Price */}
                          <div>
                            {hasPromo ? (
                              <div className="flex flex-col gap-0.5">
                                <span className="text-ink-faint text-[0.65rem] line-through font-body">
                                  {convertPriceToVND(item.price)}
                                </span>
                                <span className="text-accent text-[0.82rem] font-semibold font-body">
                                  {convertPriceToVND(finalPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gold text-[0.82rem] font-semibold font-body">
                                {convertPriceToVND(finalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Remove */}
                          <motion.button
                            onClick={() => handleRemove(item)}
                            disabled={isProcessing || isRemoving}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-ink-faint bg-transparent border-none cursor-pointer p-1 transition-colors hover:text-accent disabled:opacity-50">
                            <Trash2 size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="border-t border-ink/10 px-6 py-5 bg-ink/5">
              {/* Tổng */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-ink-muted font-body text-[0.7rem] tracking-[0.12em] uppercase">
                    Tổng cộng ({getTotalItems()} cuốn)
                  </p>
                  <motion.p
                    key={getTotalAmount()}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="font-display text-[1.6rem] text-gold tracking-[0.03em] leading-none">
                    {convertPriceToVND(getTotalAmount())}
                  </motion.p>
                </div>
                <div className="text-right">
                  <p className="text-ink-faint font-body text-[0.65rem]">
                    Thanh toán qua
                  </p>
                  <p className="font-display text-[0.9rem] text-gold tracking-[0.1em]">
                    PayOS
                  </p>
                </div>
              </div>

              {!user?._id && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent/10 border border-accent/30 rounded-xs px-3 py-2.5 mb-3">
                  <p className="text-accent font-body text-[0.75rem]">
                    Vui lòng{" "}
                    <Link
                      href="/login"
                      onClick={closeCart}
                      className="underline font-semibold">
                      đăng nhập
                    </Link>{" "}
                    để tiến hành thanh toán.
                  </p>
                </motion.div>
              )}

              {/* Checkout button */}
              <motion.button
                onClick={handleCheckout}
                disabled={!canCheckout}
                whileHover={{ scale: canCheckout ? 1.02 : 1 }}
                whileTap={{ scale: canCheckout ? 0.97 : 1 }}
                className={`group relative overflow-hidden w-full flex items-center justify-center gap-2 py-3.5 text-white font-medium text-sm tracking-widest uppercase transition-all duration-300 rounded-sm font-body border-none ${
                  canCheckout
                    ? "bg-accent cursor-pointer opacity-100"
                    : "bg-ink/20 cursor-not-allowed opacity-60"
                }`}>
                <span className="relative z-10 flex items-center gap-2">
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : !user?._id ? (
                    "Đăng nhập để thanh toán"
                  ) : (
                    <>
                      Thanh toán ngay <ArrowRight size={14} />
                    </>
                  )}
                </span>
                {canCheckout && (
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent-dark"
                  />
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Drawer>
  );
};

export default Cart;
