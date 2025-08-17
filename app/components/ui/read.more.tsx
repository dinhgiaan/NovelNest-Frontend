import { useState, useRef, useLayoutEffect, ReactNode, useCallback, useMemo } from 'react';

interface ReadMoreProps {
      children: ReactNode;
      maxLines?: number;
      readMoreText?: string;
      readLessText?: string;
      className?: string;
}

const ReadMore = ({
      children,
      maxLines = 11,
      readMoreText = "Đọc thêm",
      readLessText = "Thu gọn",
      className = ""
}: ReadMoreProps) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const [isOverflowing, setIsOverflowing] = useState(false);
      const contentRef = useRef<HTMLDivElement>(null);
      const observerRef = useRef<ResizeObserver | null>(null);

      const checkOverflow = useCallback(() => {
            if (!contentRef.current) return;

            const el = contentRef.current;
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
            const maxHeight = lineHeight * maxLines;

            requestAnimationFrame(() => {
                  const shouldOverflow = el.scrollHeight > maxHeight + 1;
                  setIsOverflowing(prev => prev !== shouldOverflow ? shouldOverflow : prev);
            });
      }, [maxLines]);

      useLayoutEffect(() => {
            if (!contentRef.current) return;

            if (observerRef.current) {
                  observerRef.current.disconnect();
            }

            const el = contentRef.current;

            observerRef.current = new ResizeObserver(() => {
                  setTimeout(checkOverflow, 10);
            });

            observerRef.current.observe(el);

            checkOverflow();

            return () => {
                  if (observerRef.current) {
                        observerRef.current.disconnect();
                        observerRef.current = null;
                  }
            };
      }, [checkOverflow]);

      // Memoize styles để tránh tạo object mới
      const collapsedStyle = useMemo(() => ({
            display: '-webkit-box' as const,
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical' as const,
      }), [maxLines]);

      const toggleExpanded = useCallback(() => {
            setIsExpanded(prev => !prev);
      }, []);

      return (
            <div className={className}>
                  <div
                        ref={contentRef}
                        className={`overflow-hidden transition-all duration-300 ease-out relative ${isExpanded ? '' : `line-clamp-${maxLines}`
                              }`}
                        style={isExpanded ? undefined : collapsedStyle}
                  >
                        {children}
                        {!isExpanded && isOverflowing && (
                              <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none" />
                        )}
                  </div>

                  {isOverflowing && (
                        <button
                              onClick={toggleExpanded}
                              className=" text-blue-600 hover:text-blue-800 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                              type="button"
                        >
                              {isExpanded ? readLessText : readMoreText}
                        </button>
                  )}
            </div>
      );
};

export default ReadMore;
