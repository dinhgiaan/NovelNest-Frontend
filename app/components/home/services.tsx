"use client";

import { memo } from "react";
import { Shield, BookOpen, Headphones, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../motion/variants";

const SERVICES = [
  {
    icon: Shield,
    num: "01",
    title: "Bảo mật\ntuyệt đối",
    description: "Thông tin cá nhân và dữ liệu đọc của bạn được bảo vệ 100%",
    bgClass: "bg-accent",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Thư viện\nkhổng lồ",
    description: "Hơn 100,000 đầu sách từ cổ điển đến hiện đại",
    bgClass: "bg-gold",
  },
  {
    icon: Headphones,
    num: "03",
    title: "Hỗ trợ\n24/7",
    description: "Đội ngũ tư vấn chuyên nghiệp luôn sẵn sàng phục vụ",
    bgClass: "bg-accent",
  },
  {
    icon: Zap,
    num: "04",
    title: "Đồng bộ\nđa thiết bị",
    description: "Đọc liền mạch trên mọi thiết bị, lưu tiến độ tự động",
    bgClass: "bg-gold",
  },
];

const Services = () => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.12 }}>
    {SERVICES.map((s) => {
      const Icon = s.icon;
      return (
        <motion.div
          key={s.num}
          variants={staggerItem}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative p-8 overflow-hidden cursor-default bg-surface">
          <div
            className={`absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${s.bgClass}`}
          />

          <div className="absolute -bottom-4 right-2 font-display text-[7rem] leading-none dark:text-white/5 text-black/5 select-none transition-colors duration-300 group-hover:text-ink/10">
            {s.num}
          </div>

          <div
            className={`inline-flex p-3 mb-6 rounded-sm bg-base-alt/80 transition-all duration-300 group-hover:-rotate-8 group-hover:scale-110 group-hover:${s.bgClass}`}>
            <Icon
              size={22}
              className="text-ink-muted transition-colors duration-300 group-hover:text-white"
            />
          </div>

          <h3 className="font-display text-[1.6rem] tracking-[0.04em] leading-[1.05] text-ink whitespace-pre-line mb-3 relative z-10">
            {s.title}
          </h3>
          <p className="font-body text-[0.82rem] leading-[1.6] text-ink-muted relative z-10">
            {s.description}
          </p>
        </motion.div>
      );
    })}
  </motion.div>
);

export default memo(Services);
