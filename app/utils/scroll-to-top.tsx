'use client'
import React from "react";

const ScrollToTop = () => {
      const [showButton, setShowButton] = React.useState(false);

      // Xử lý hiện/ẩn button khi scroll
      React.useEffect(() => {
            const handleScroll = () => {
                  // Hiển thị button khi scroll xuống 300px
                  if (window.scrollY > 300) {
                        setShowButton(true);
                  } else {
                        setShowButton(false);
                  }
            };

            window.addEventListener('scroll', handleScroll);

            // Cleanup listener
            return () => {
                  window.removeEventListener('scroll', handleScroll);
            };
      }, []);

      // Hàm scroll to top với animation mượt
      const scrollToTop = () => {
            window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
            });
      };

      return (
            <button
                  onClick={scrollToTop}
                  className={`
            fixed
            bottom-7
            right-6
            bg-blue-500
            hover:bg-blue-700
            text-white
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-300
            ease-in-out
            cursor-pointer
            ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          `}
                  aria-label="Scroll to top"
            >
                  <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                  >
                        <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                  </svg>
            </button>
      );
};

export default ScrollToTop;