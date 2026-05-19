"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import ErrorAPI from "../components/error.api";
import Loading from "../utils/loading";
import { faqService } from "../lib/api/faq";
import ScrollReveal from "../components/motion/scroll.reveal";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "../components/motion/variants";

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: IFAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={staggerItem}
      style={{
        borderBottom:
          "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
      }}>
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-5 py-6 text-left group"
        aria-expanded={isOpen}>
        <motion.span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            lineHeight: 1,
            color: isOpen
              ? "var(--accent)"
              : "color-mix(in srgb, var(--ink) 15%, transparent)",
            flexShrink: 0,
            width: "3.2rem",
            transition: "color .25s ease",
          }}>
          {numStr}
        </motion.span>

        <div className="flex-1 flex items-center justify-between gap-4 pt-1">
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              fontWeight: 500,
              color: isOpen ? "var(--ink)" : "var(--ink-muted)",
              lineHeight: 1.4,
              transition: "color .25s ease",
            }}>
            {item.question}
          </h3>

          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              flexShrink: 0,
              width: 28,
              height: 28,
              borderRadius: "2px",
              border: `1px solid ${isOpen ? "var(--accent)" : "color-mix(in srgb, var(--ink) 18%, transparent)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color .25s ease",
              background: isOpen
                ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                : "transparent",
            }}>
            <Plus
              size={13}
              style={{ color: isOpen ? "var(--accent)" : "var(--ink-muted)" }}
            />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            <div className="flex gap-5 pb-7">
              <div style={{ width: "3.2rem", flexShrink: 0 }}>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    background: "var(--accent)",
                    margin: "0 auto",
                  }}
                />
              </div>
              <motion.p
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.8,
                  flex: 1,
                  paddingRight: "2.5rem",
                }}>
                {item.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPage = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR("faqs", faqService.getAllFAQ, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const faqData: IFAQ[] = data?.data?.faq || [];

  if (error) return <ErrorAPI />;
  if (isLoading) return <Loading />;

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="h-[62px]" />

      <div
        className="relative overflow-hidden py-14 px-6"
        style={{
          borderBottom: "4px solid var(--accent)",
        }}>
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 14vw, 13rem)",
            lineHeight: 0.85,
            color: "rgba(255,255,255,0.04)",
            position: "absolute",
            right: "-1%",
            top: "50%",
            transform: "translateY(-50%)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}>
          FAQ
        </motion.span>

        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: "var(--accent)", scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="max-w-[1200px] mx-auto relative">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}>
            <motion.div
              className="w-8 h-px"
              style={{ background: "var(--accent)", scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.25em",
                fontSize: "0.7rem",
              }}
              className="dark:text-gray-400 text-gray-500">
              CÂU HỎI THƯỜNG GẶP
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem,6vw,5rem)",
              letterSpacing: "0.03em",
              lineHeight: 0.9,
            }}
            className="dark:text-[#fff] text-black">
            BẠN CÓ
            <br />
            <span style={{ color: "var(--gold)" }}>THẮC MẮC GÌ?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            style={{
              color: "rgba(255,255,255,.35)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              marginTop: "1rem",
            }}>
            Những câu hỏi phổ biến nhất từ cộng đồng độc giả NovelNest.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-14">
        {faqData.length === 0 ? (
          <ScrollReveal>
            <div
              style={{
                padding: "4rem",
                textAlign: "center",
                border:
                  "1px dashed color-mix(in srgb, var(--ink) 15%, transparent)",
                borderRadius: "2px",
              }}>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  color: "var(--ink-muted)",
                }}>
                Chưa có câu hỏi nào
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{
              borderTop:
                "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
            }}>
            {faqData.map((item, index) => (
              <FAQItem
                key={item._id}
                item={item}
                index={index}
                isOpen={openId === item._id}
                onToggle={() => toggle(item._id)}
              />
            ))}
          </motion.div>
        )}

        <ScrollReveal
          variants={fadeUp}
          className="mt-16 text-center"
          delay={0.2}>
          <div
            className="p-8"
            style={{
              background: "var(--bg-alt)",
              border:
                "1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
              borderLeft: "3px solid var(--accent)",
              borderRadius: "2px",
            }}>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.05em",
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}>
              KHÔNG TÌM THẤY CÂU TRẢ LỜI?
            </p>
            <p
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                marginBottom: "1.25rem",
              }}>
              Đội ngũ hỗ trợ NovelNest luôn sẵn sàng giải đáp 24/7.
            </p>
            <a href="mailto:novelnest@contact.com">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 text-white font-medium text-sm tracking-widest uppercase"
                style={{
                  background: "var(--accent)",
                  borderRadius: "2px",
                  fontFamily: "var(--font-body)",
                }}>
                <span className="relative z-10">Liên hệ hỗ trợ</span>
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: "var(--accent-dark)" }}
                />
              </motion.button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default FAQPage;
