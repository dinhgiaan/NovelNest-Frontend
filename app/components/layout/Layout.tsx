"use client";

import Image from "next/image";
import portrait from "@/public/assets/portrait_home.webp";
import Services from "../home/services";
import BestSeller from "../home/best.seller";
import CustomerReviews from "@/app/components/home/customer.reviews";
import Categories from "../home/category.book";
import PublisherCarousel from "../home/carousel.publisher";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../motion/scroll.reveal";
import { DiagonalTicker } from "../motion/diagonal.banner";
import {
  fadeUp,
  slideRight,
  staggerContainer,
  staggerItem,
  lineExpand,
} from "../motion/variants";

export const SectionLabel = ({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) => (
  <ScrollReveal variants={fadeUp} className="mb-10">
    <div className="flex items-center gap-4 mb-3">
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-display text-[0.7rem] tracking-[0.25em] text-accent">
        {index}
      </motion.span>
      <motion.div
        variants={lineExpand}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-10 h-px bg-accent"
      />
    </div>
    <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[0.03em] leading-none text-ink">
      {title}
    </h2>
    {sub && (
      <p className="mt-3 text-sm leading-relaxed text-ink-muted max-w-[52ch]">
        {sub}
      </p>
    )}
  </ScrollReveal>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 xl:col-span-7 space-y-8 order-2 lg:order-1">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}>
              <span className="font-display text-[0.75rem] tracking-[0.25em] text-accent">
                01
              </span>
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex-1 h-px bg-accent"
              />
              <span className="font-display text-[0.7rem] tracking-[0.25em] text-ink-faint">
                NỀN TẢNG SÁCH SỐ
              </span>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible">
              {["KHÁM PHÁ", "VŨ TRỤ", "TRI THỨC"].map((line, i) => (
                <motion.div
                  key={line}
                  variants={staggerItem}
                  className={`overflow-hidden ${i === 1 ? "-mt-[2rem] max-lg:-mt-[1rem] pt-1" : "mt-0"}`}>
                  <motion.span
                    className={`block font-display leading-[1.11] tracking-[0.02em] text-[clamp(3rem,9vw,7rem)] ${
                      i === 1 ? "text-accent" : "text-ink"
                    }`}>
                    {line}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="font-body text-base lg:text-lg text-ink-muted leading-relaxed max-w-[38ch]">
              Với <strong className="text-ink font-semibold">NovelNest</strong>,
              hành trình khám phá tri thức của bạn không có giới hạn.
            </motion.p>

            <motion.div
              className="flex gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible">
              {[
                { val: "10K+", lbl: "Đầu sách" },
                { val: "1M+", lbl: "Độc giả" },
                { val: "4.9", lbl: "Sao đánh giá" },
              ].map(({ val, lbl }) => (
                <motion.div key={lbl} variants={staggerItem}>
                  <div className="font-display text-[1.9rem] text-ink leading-none">
                    {val}
                  </div>
                  <div className="text-[0.7rem] text-ink-faint tracking-[0.1em] uppercase">
                    {lbl}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>
                <Link
                  href="/books"
                  className="group relative overflow-hidden block px-8 py-3.5 bg-accent text-white font-body font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_8px_32px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
                  <span className="relative z-10">Khám phá ngay</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent-dark"
                  />
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href="/about"
                  className="relative z-0 overflow-hidden block px-8 py-3.5 font-body font-medium text-sm tracking-widest uppercase text-ink transition-colors duration-300 border-none before:absolute before:inset-0 before:-z-10 before:w-0 before:bg-ink before:transition-all before:duration-300 hover:before:w-full hover:text-surface">
                  Tìm hiểu thêm
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2"
            variants={slideRight}
            initial="hidden"
            animate="visible"
            custom={0.3}>
            <div className="relative">
              <motion.div
                aria-hidden
                initial={{ opacity: 0, x: 8, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-4 -right-4 w-full h-full border-2 border-accent rounded-sm z-0"
              />

              <div className="relative overflow-hidden rounded-sm aspect-[4/5] z-10 bg-base-alt">
                <motion.div style={{ y: imageY }} className="absolute inset-0">
                  <Image
                    src={portrait}
                    alt="NovelNest — Trải nghiệm đọc sách"
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 90vw, 42vw"
                  />
                </motion.div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--ink)_40%,transparent)_0%,transparent_50%)]"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -16, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.7,
                }}
                className="absolute bottom-6 -left-6 bg-gold z-20 px-5 py-3 rounded-sm">
                <div className="font-display text-[1.6rem] text-white leading-none">
                  #1
                </div>
                <div className="text-[0.65rem] text-white/80 tracking-[0.12em] uppercase">
                  Tại Việt Nam
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Layout = () => (
  <div className="bg-base min-h-screen">
    <div className="h-[62px]" />
    <Hero />

    <div className="py-6 overflow-hidden">
      <DiagonalTicker
        items={[
          "KHÁM PHÁ",
          "ĐỌC SÁCH",
          "TRI THỨC",
          "NOVEL NEST",
          "VĂN HỌC",
          "SÁCH HAY",
        ]}
        color="var(--accent)"
        angle={-2}
        speed={20}
        className="bg-[#213f74]"
      />
    </div>

    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <section className="py-16">
        <SectionLabel
          index="02"
          title="NHÀ XUẤT BẢN"
          sub="Đối tác của chúng tôi từ khắp nơi trên thế giới"
        />
        <PublisherCarousel />
      </section>

      <div className="h-px bg-ink/10" />

      <section className="py-16">
        <SectionLabel
          index="03"
          title="DỊCH VỤ"
          sub="Những tính năng nổi bật giúp trải nghiệm đọc sách của bạn tốt hơn"
        />
        <Services />
      </section>

      <div className="h-px bg-ink/10" />

      <section className="py-16">
        <SectionLabel
          index="04"
          title="THỂ LOẠI"
          sub="Tìm cuốn sách phù hợp với tâm trạng và sở thích của bạn"
        />
        <Categories />
      </section>
    </div>

    <div className="py-10 overflow-hidden">
      <DiagonalTicker
        items={[
          "BÁN CHẠY",
          "BEST SELLER",
          "TOP PICKS",
          "ĐỌC NHIỀU NHẤT",
          "TRENDING",
        ]}
        color="var(--gold)"
        angle={2}
        speed={24}
        className="bg-[#5b3e0b]"
      />
    </div>

    <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
      <section className="py-16">
        <SectionLabel
          index="05"
          title="BÁN CHẠY"
          sub="Những cuốn sách được yêu thích nhất bởi hàng ngàn độc giả"
        />
        <BestSeller />
      </section>

      <div className="h-px bg-ink/10" />

      <section className="py-16">
        <SectionLabel
          index="06"
          title="ĐỘC GIẢ NÓI GÌ"
          sub="Cảm nhận của cộng đồng NovelNest"
        />
        <CustomerReviews />
      </section>
    </div>
  </div>
);

export default Layout;
