"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";
import { fadeUp } from "./variants";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

const ScrollReveal = ({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
  threshold = 0.12,
  as = "div",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={variants}
      className={className}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
