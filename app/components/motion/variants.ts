import type { Variants } from "framer-motion"

/* ── Fade up — dùng cho sections, cards ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

/* ── Fade in ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

/* ── Scale pop — dùng cho badge, icon ── */
export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay },
  }),
}

/* ── Stagger container — wrap danh sách ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export const cardHover = {
  rest:  { y: 0,  scale: 1,    boxShadow: "0 2px 8px rgba(0,0,0,.08)" },
  hover: { y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,.14)",
    transition: { type: "spring", stiffness: 350, damping: 22 } },
}

export const lineExpand: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
}