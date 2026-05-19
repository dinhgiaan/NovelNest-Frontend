"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Book, Users, Shield, Zap, ArrowRight } from "lucide-react";
import { DiagonalTicker } from "../components/motion/diagonal.banner";
import ScrollReveal from "../components/motion/scroll.reveal";
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
} from "../components/motion/variants";

const ChapterLabel = ({ num, title }: { num: string; title: string }) => (
  <motion.div
    className="flex items-center gap-4 mb-6"
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}>
    <span className="font-display text-[0.65rem] tracking-[0.3em] text-accent">
      {num}
    </span>
    <motion.div
      className="w-10 h-px bg-accent origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
    />
    <span className="font-display text-[0.65rem] tracking-[0.3em] text-gray-500">
      {title}
    </span>
  </motion.div>
);

const ParallaxWord = ({
  word,
  from,
  to,
}: {
  word: string;
  from: string;
  to: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <div
      ref={ref}
      className="overflow-hidden py-2 pointer-events-none select-none"
      aria-hidden>
      <motion.div style={{ x }}>
        <span className="font-display text-[clamp(5rem,16vw,14rem)] leading-[0.85] tracking-[0.04em] whitespace-nowrap block text-[#f5f5f5] dark:text-[#FFFFFF0A]">
          {word}
        </span>
      </motion.div>
    </div>
  );
};

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div className="bg-surface text-white min-h-screen">
      <div className="h-[62px]" />
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex items-center pointer-events-none"
          aria-hidden>
          <span className="font-display text-[clamp(10rem,28vw,26rem)] leading-[0.85] whitespace-nowrap tracking-[0.03em] pl-[3%] text-[#f5f5f5] dark:text-[#FFFFFF0A]">
            ABOUT
          </span>
        </motion.div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <span className="font-display text-[0.7rem] tracking-[0.25em] text-accent">
              01
            </span>
            <motion.div
              className="w-10 h-px bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <span className="font-display text-[0.7rem] tracking-[0.25em] text-gray-500 uppercase">
              VỀ CHÚNG TÔI
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible">
            {["NƠI TRI", "THỨC GẶP", "ĐAM MÊ"].map((line, i) => (
              <motion.div
                key={line}
                variants={staggerItem}
                className={`overflow-hidden ${i === 1 ? "max-md:-mt-[1.3rem] -mt-[2.3rem]" : ""}`}>
                <span
                  className={`block font-display text-[clamp(3.5rem,10vw,9rem)] leading-[1.1] tracking-[0.02em] ${
                    i === 1 ? "text-accent" : "text-gold"
                  }`}>
                  {line}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="font-body max-w-[48ch] text-base lg:text-lg leading-relaxed mt-8 dark:text-gray-400 text-gray-700">
            Câu chuyện của một người yêu sách, một ý tưởng nảy sinh trong quán
            cà phê, và hành trình xây dựng cộng đồng đọc sách Việt Nam.
          </motion.p>

          <motion.div
            className="flex gap-10 mt-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible">
            {[
              { val: "12/2024", lbl: "Thành lập" },
              { val: "10K+", lbl: "Đầu sách" },
              { val: "1M+", lbl: "Độc giả" },
            ].map(({ val, lbl }) => (
              <motion.div key={lbl} variants={staggerItem}>
                <div className="font-display text-[1.8rem] text-gold leading-none">
                  {val}
                </div>
                <div className="text-[0.65rem] tracking-[0.14em] uppercase mt-0.5 text-gray-600">
                  {lbl}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-3 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}>
            <motion.div
              className="w-px h-12 bg-accent origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">
              Cuộn xuống
            </span>
          </motion.div>
        </div>
      </section>

      <div>
        <DiagonalTicker
          items={[
            "NÀO CÙNG ĐỌC SÁCH",
            "NOVELNEST",
            "TRI THỨC KHÔNG GIỚI HẠN",
            "SÁCH HAY MỖI NGÀY",
          ]}
          color="var(--accent)"
          textColors={["#fff"]}
          angle={2}
          speed={22}
          className="bg-[#b87c22] max-md:-mt-20"
        />
      </div>

      <section className="relative py-24 overflow-hidden">
        <ParallaxWord word="STORY" from="-5%" to="5%" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variants={slideLeft}>
              <ChapterLabel num="02" title="CÂU CHUYỆN KHỞI NGUỒN" />
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[0.03em] mb-8 text-[#516482]">
                MỘT CHIỀU SÀI GÒN,
                <br />
                <span className="text-gold">MỘT Ý TƯỞNG NẢY SINH</span>
              </h2>
              <div className="leading-[1.9] space-y-5 text-sm lg:text-base">
                <p className="dark:text-gray-400 text-gray-500">
                  Vào tháng 12 năm 2024, trong không gian yên bình của một quán
                  cà phê nhỏ giữa lòng
                  <strong className="dark:text-gray-400 text-gray-700">
                    {" "}
                    Sài Gòn
                  </strong>
                  , tôi chợt lắng đọng và hồi tưởng về những trang sách đã dìu
                  dắt mình qua bao thăng trầm cuộc sống.
                </p>
                <p className="dark:text-gray-400 text-gray-500">
                  Hơn cả tri thức, chúng còn mở ra những chân trời mới — giúp
                  tôi thấu hiểu sâu sắc hơn về thế giới rộng lớn và chính bản
                  thân mình.
                </p>
                <p className="dark:text-gray-400 text-gray-500">
                  Từ trăn trở đó,{" "}
                  <strong className="text-gold">NovelNest</strong> ra đời —
                  không chỉ là một thư viện sách online, mà còn là nơi tôn vinh
                  giá trị tri thức và bảo vệ bản quyền tác giả.
                </p>
              </div>

              <blockquote className="font-serif text-gold border-l-4 border-gold mt-8 pl-5 italic text-lg leading-relaxed">
                &ldquo;Mỗi giao dịch là một sự ủng hộ thiết thực dành cho tác
                giả.&rdquo;
              </blockquote>
            </ScrollReveal>

            <ScrollReveal variants={slideRight} delay={0.1}>
              <div className="relative">
                <motion.div
                  aria-hidden
                  className="absolute -top-6 -right-6 bottom-6 left-6 border-2 border-gold rounded-sm z-0"
                  initial={{ opacity: 0, x: 12, y: -12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
                <div className="relative overflow-hidden rounded-sm aspect-[4/5] z-10">
                  <Image
                    src="/assets/about1.webp"
                    alt="Người đọc sách trong không gian yên tĩnh"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,14,14,.6)_0%,transparent_45%)]"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-6 left-0 bg-accent py-3 px-6 rounded-sm z-20"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}>
                  <div className="font-display text-[1.2rem] text-white tracking-[0.06em]">
                    Tháng 12, 2024
                  </div>
                  <div className="text-[0.65rem] text-white/70 tracking-[0.12em] uppercase">
                    Việt Nam
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-surface">
        <ParallaxWord word="VALUES" from="5%" to="-5%" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal variants={fadeUp} className="mb-16 text-center">
            <ChapterLabel num="03" title="GIÁ TRỊ CỐT LÕI" />
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[0.03em]">
              TẠI SAO CHỌN
              <br />
              <span className="text-accent">NOVELNEST?</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <ScrollReveal variants={slideLeft} className="lg:col-span-2">
              <div className="relative">
                <div className="overflow-hidden rounded-sm aspect-[3/4]">
                  <Image
                    src="/assets/about2.webp"
                    alt="Cộng đồng người đọc sách trao đổi và chia sẻ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 38vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,14,14,.7)_0%,transparent_40%)]"
                  />
                </div>
                <div className="absolute bottom-6 -left-6 bg-gold py-3 px-5 rounded-sm z-20">
                  <div className="font-display text-[1.4rem] text-white leading-none">
                    Cộng đồng
                  </div>
                  <div className="text-[0.65rem] text-white/70 tracking-[0.1em] uppercase">
                    Độc giả Việt Nam
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <motion.div
              className="lg:col-span-3 space-y-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}>
              {[
                {
                  num: "A",
                  icon: Book,
                  title: "Thư viện khổng lồ",
                  body: "Hàng ngàn cuốn sách tuyển chọn kỹ — từ văn học Việt Nam đến tác phẩm quốc tế, cổ điển đến hiện đại.",
                  textColor: "text-accent",
                },
                {
                  num: "B",
                  icon: Zap,
                  title: "Trải nghiệm đọc mượt mà",
                  body: "Giao diện tối ưu cho mắt, tùy chỉnh font, kích thước, màu nền. Đồng bộ tiến độ trên mọi thiết bị.",
                  textColor: "text-gold",
                },
                {
                  num: "C",
                  icon: Users,
                  title: "Cộng đồng năng động",
                  body: "Kết nối với hàng nghìn độc giả Việt Nam, chia sẻ cảm nhận và nhận gợi ý sách phù hợp.",
                  textColor: "text-accent",
                },
                {
                  num: "D",
                  icon: Shield,
                  title: "Bảo vệ bản quyền tác giả",
                  body: "Tôn trọng và bảo vệ bản quyền. Mỗi lượt mua sách đều đóng góp trực tiếp cho người sáng tạo.",
                  textColor: "text-gold",
                },
              ].map(({ num, icon: Icon, title, body, textColor }, idx) => (
                <motion.div
                  key={idx + 1}
                  variants={staggerItem}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex gap-5 py-6 border-b border-ink/10">
                  <div
                    className={`font-display text-[3.5rem] leading-none opacity-25 shrink-0 w-12 text-center ${textColor}`}>
                    {num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} className={textColor} />
                      <h3 className="font-display text-[1.2rem] tracking-[0.05em] dark:text-gray-400 text-gray-700">
                        {title}
                      </h3>
                    </div>
                    <p className="font-body text-[0.85rem] leading-[1.7] dark:text-gray-200 text-gray-700">
                      {body}
                    </p>
                  </div>
                  <motion.div
                    className={`shrink-0 self-center ${textColor}`}
                    initial={{ opacity: 0, x: -6 }}
                    whileHover={{ opacity: 1, x: 0 }}>
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div>
        <DiagonalTicker
          items={[
            "BẢO VỆ BẢN QUYỀN",
            "ĐỌC SÁCH MỌI NƠI",
            "TRI THỨC LÀ SỨC MẠNH",
            "NOVELNEST",
          ]}
          color="var(--gold)"
          textColors={["#0D0D0D"]}
          angle={1.5}
          speed={20}
        />
      </div>

      <section className="relative py-24 overflow-hidden">
        <ParallaxWord word="COMMIT" from="-8%" to="8%" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal variants={fadeUp} className="mb-16">
            <ChapterLabel num="04" title="CAM KẾT CỦA CHÚNG TÔI" />
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[0.03em] text-[#516482]">
              LỜI HỨA VỚI
              <br />
              <span className="text-accent">ĐỘC GIẢ & TÁC GIẢ</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px dark:bg-[#261e26] bg-gray-200">
            {[
              {
                side: "Độc giả",
                points: [
                  "Sách chất lượng được tuyển chọn kỹ lưỡng",
                  "Giao diện thân thiện, không quảng cáo",
                  "Bảo mật thông tin cá nhân tuyệt đối",
                  "Hỗ trợ 24/7, phản hồi nhanh chóng",
                ],
                bgClass: "bg-accent",
                textClass: "text-accent",
              },
              {
                side: "Tác giả",
                points: [
                  "Tôn trọng bản quyền, không vi phạm",
                  "Hỗ trợ tác giả Việt Nam xuất bản",
                  "Chia sẻ doanh thu công bằng, minh bạch",
                  "Tạo cầu nối người viết và người đọc",
                ],
                bgClass: "bg-gold",
                textClass: "text-gold",
              },
            ].map(({ side, points, bgClass, textClass }) => (
              <ScrollReveal key={side} variants={fadeUp} className="p-10">
                <div className={`w-8 h-[3px] mb-6 ${bgClass}`} />
                <h3
                  className={`font-display text-[1.8rem] tracking-[0.06em] mb-6 ${textClass}`}>
                  Với {side}
                </h3>
                <ul className="space-y-4">
                  {points.map((pt) => (
                    <motion.li
                      key={pt}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}>
                      <span
                        className={`font-display text-[0.8rem] shrink-0 mt-0.5 ${textClass}`}>
                        →
                      </span>
                      <span className="font-body text-[0.875rem] leading-[1.7] dark:text-gray-200 text-gray-700">
                        {pt}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden border-t-4 border-accent">
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(6rem,18vw,16rem)] leading-[0.85] whitespace-nowrap select-none pointer-events-none dark:text-[#FFFFFF0A] text-[#f5f5f5]">
          READ NOW
        </span>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <ScrollReveal variants={fadeUp}>
            <blockquote className="font-serif text-[clamp(1.2rem,3vw,2rem)] leading-[1.5] italic mb-4 max-w-3xl mx-auto dark:text-gray-300 text-gray-600">
              &ldquo;NovelNest tin rằng những cuốn sách hay xứng đáng được trải
              nghiệm một cách tốt nhất.&rdquo;
            </blockquote>
            <div className="w-12 h-px mx-auto mb-8 bg-accent" />

            <p className="font-body text-[0.875rem] mb-12 text-gray-400">
              Giờ thì... hãy cùng đọc sách nhé!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden flex items-center gap-2 px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-accent rounded-sm font-body">
                  <span className="relative z-10 flex items-center gap-2">
                    Khám phá thư viện <ArrowRight size={14} />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent-dark"
                  />
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 font-body text-[0.8rem] tracking-[0.12em] uppercase rounded-sm bg-transparent cursor-pointer border transition-colors duration-200 text-[#000000A6] border-[#00000033] hover:text-[#000000] hover:border-[#00000099] dark:text-[#FFFFFFA6] dark:border-[#FFFFFF33] dark:hover:text-[#ffffff] dark:hover:border-[#FFFFFF99]">
                  Đăng ký miễn phí
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
