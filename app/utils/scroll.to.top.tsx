"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
      className?: string;
      showAfter?: number;
      duration?: number;
      easing?: string;
}

const ScrollToTop = ({
      className = "",
      showAfter = 300,
      duration = 800,
      easing = "cubic-bezier(0.4, 0, 0.2, 1)",
}: ScrollToTopProps) => {
      const [isVisible, setIsVisible] = useState(false);
      const [isScrolling, setIsScrolling] = useState(false);
      const pathname = usePathname();

      const isAuthPage =
            pathname === "/login" ||
            pathname === "/register" ||
            pathname === "/terms" ||
            pathname === "/privacy";

      const handleScroll = useCallback(() => {
            if (isScrolling) return;

            const scrollTop =
                  window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop > showAfter);
      }, [showAfter, isScrolling]);

      const scrollToTop = useCallback(async () => {
            if (isScrolling) return;

            setIsScrolling(true);

            const startPosition = window.pageYOffset;
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);

                  const ease =
                        progress < 0.5
                              ? 4 * progress * progress * progress
                              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                  const currentPosition = startPosition * (1 - ease);

                  window.scrollTo(0, currentPosition);

                  if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                  } else {
                        setIsScrolling(false);
                  }
            };

            requestAnimationFrame(animateScroll);
      }, [duration, isScrolling]);

      useEffect(() => {
            let timeoutId: number | null = null;

            const throttledScrollHandler = () => {
                  if (timeoutId !== null) return;

                  timeoutId = window.setTimeout(() => {
                        handleScroll();
                        timeoutId = null;
                  }, 16); // ~60fps
            };

            window.addEventListener("scroll", throttledScrollHandler, { passive: true });

            handleScroll();

            return () => {
                  window.removeEventListener("scroll", throttledScrollHandler);
                  if (timeoutId !== null) {
                        clearTimeout(timeoutId);
                  }
            };
      }, [handleScroll]);

      if (isAuthPage) return null;

      return (
            <button
                  onClick={scrollToTop}
                  disabled={isScrolling}
                  className={`
        fixed bottom-6 right-6 z-50
        w-12 h-auto rounded-lg space-y-1 py-1
        bg-[#696565]
        text-white
        transform transition-all duration-200 hover:scale-105
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        ${className}
      `}
                  style={{
                        transitionProperty: "opacity, transform, background, box-shadow",
                        transitionTimingFunction: easing,
                  }}
                  aria-label="Scroll to top"
            >
                  <ArrowUp
                        size={15}
                        className={`mx-auto ${isScrolling ? "animate-bounce" : ""}`}
                  />
                  <div className="text-[8px] font-thin -space-y-[3px]">
                        <span className="block">ĐẦU</span>
                        <span className="block">TRANG</span>
                  </div>
            </button>
      );
};

export default ScrollToTop;
