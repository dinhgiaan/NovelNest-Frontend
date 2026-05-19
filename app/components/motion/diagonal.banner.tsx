"use client";

import { motion } from "framer-motion";

interface RibbonProps {
  label: string;
  color?: string;
  textColor?: string;
  position?: "top-left" | "top-right";
  size?: "sm" | "md";
}

export const DiagonalRibbon = ({
  label,
  color = "bg-accent",
  textColor = "text-white",
  position = "top-left",
  size = "md",
}: RibbonProps) => {
  const isLeft = position === "top-left";

  const w = size === "sm" ? 80 : 100;
  const topPos = size === "sm" ? 14 : 18;
  const horizontalPos = -(w / 2) + 6;

  return (
    <div
      className={`absolute top-0 overflow-hidden z-10 pointer-events-none ${
        isLeft ? "left-0" : "right-0"
      }`}
      style={{ width: w, height: w }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
        className={`absolute text-center py-1 font-display tracking-[0.15em] shadow-[0_2px_8px_rgba(0,0,0,0.2)] ${color} ${textColor} ${
          size === "sm" ? "text-[0.55rem]" : "text-[0.6rem]"
        }`}
        style={{
          top: topPos,
          [isLeft ? "left" : "right"]: horizontalPos,
          width: w * 1.6,
          transform: `rotate(${isLeft ? -45 : 45}deg)`,
        }}>
        {label}
      </motion.div>
    </div>
  );
};

interface TickerProps {
  items: string[];
  color?: string;
  textColors?: string[];
  angle?: number;
  speed?: number;
  className?: string;
}

export const DiagonalTicker = ({
  items,
  color = "bg-accent",
  textColors = [
    "text-white",
    "text-gold",
    "text-accent-light",
    "text-ink-faint",
  ],
  angle = -2,
  speed = 18,
  className = "",
}: TickerProps) => {
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden py-3 -mx-[5%] w-[110%] ${color} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex whitespace-nowrap gap-12 will-change-transform">
        {doubled.map((text, i) => {
          const currentColorClass = textColors[i % textColors.length];

          return (
            <span
              key={i}
              className={`font-display text-[0.85rem] tracking-[0.22em] opacity-90 shrink-0 font-thin drop-shadow-md ${currentColorClass}`}>
              {text}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

interface StampProps {
  label: string;
  color?: string;
  textColor?: string;
  rotate?: number;
}

export const DiagonalStamp = ({
  label,
  color = "bg-gold",
  textColor = "text-white",
  rotate = -12,
}: StampProps) => (
  <motion.div
    initial={{ opacity: 0, rotate: rotate - 20, scale: 0.5 }}
    animate={{ opacity: 1, rotate, scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 }}
    className={`inline-flex items-center justify-center font-display text-[0.75rem] tracking-[0.18em] px-3.5 py-1 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.18)] origin-center select-none ${color} ${textColor}`}>
    {label}
  </motion.div>
);
