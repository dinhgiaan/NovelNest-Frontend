"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Search, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL_2;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.trim().length < 1) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      setIsOpen(true);
      try {
        const [{ data }] = await Promise.all([
          axios.get(`${API_URL}/search?title=${encodeURIComponent(query)}`),
          new Promise((r) => setTimeout(r, 600)),
        ]);
        setResults(data.success ? data.data : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const clear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      <div className="flex items-center bg-ink/5 border border-white/30 rounded-sm transition-colors duration-200 focus-within:border-accent focus-within:bg-ink/10">
        <div className="px-3.5 py-3 shrink-0">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 rounded-full border-2 border-ink/15 border-t-accent"
            />
          ) : (
            <Search size={16} className="text-ink-muted" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm sách, tác giả..."
          className="flex-1 bg-transparent border-none outline-none text-ink font-body text-[0.875rem] py-3 placeholder:text-ink-faint"
          autoComplete="off"
          spellCheck={false}
        />

        <AnimatePresence>
          {query.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={clear}
              className="p-3 shrink-0 bg-transparent border-none cursor-pointer text-ink-faint flex hover:text-ink transition-colors">
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-surface border border-ink/10 border-t-2 border-t-accent rounded-sm shadow-[0_16px_48px_rgba(0,0,0,0.4)] z-50 overflow-hidden max-h-[min(380px,60vh)] overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start animate-pulse">
                    <div className="w-10 h-[54px] bg-ink/5 rounded-sm shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-2.5 bg-ink/5 rounded-sm w-3/4" />
                      <div className="h-2 bg-ink/5 rounded-sm w-[45%]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="px-3.5 py-2 border-b border-ink/5">
                  <span className="font-display text-[0.62rem] tracking-[0.22em] text-ink-faint uppercase">
                    {results.length} KẾT QUẢ
                  </span>
                </div>

                {results.map((book, i) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}>
                    <Link
                      href={`/books/detail/${book.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-start gap-3 px-3.5 py-3 border-b border-ink/5 transition-colors duration-150 hover:bg-ink/5">
                      {/* Thumbnail */}
                      <div className="w-10 h-[54px] rounded-sm overflow-hidden shrink-0 border border-ink/10 relative">
                        {book.thumbnail?.url ? (
                          <Image
                            src={book.thumbnail.url}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full bg-ink/5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-[0.82rem] text-ink leading-[1.35] line-clamp-2">
                          {book.title}
                        </p>
                        <p className="font-serif text-[0.7rem] text-ink-muted italic truncate mt-0.5">
                          {book.author}
                        </p>
                        {book.rating !== undefined && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star
                              size={10}
                              className="text-gold fill-current"
                            />
                            <span className="text-gold text-[0.68rem] font-body">
                              {book.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-10 px-4 text-center">
                <p className="font-display text-[1.1rem] tracking-[0.06em] text-ink-faint mb-1">
                  KHÔNG TÌM THẤY
                </p>
                <p className="text-ink-faint/80 font-body text-[0.78rem]">
                  Thử tìm với từ khoá khác
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
