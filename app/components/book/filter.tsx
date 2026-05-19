"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Star } from "lucide-react";
import { Slider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { bookService, Category, FilterParams } from "../../lib/api/book";

interface FilterProps {
  onFilterChange?: (filters: FilterParams) => void;
  className?: string;
}

const FilterTag = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.95 }}
    className={`
      px-3.5 py-1.5 rounded-sm font-body text-[0.72rem] tracking-[0.06em] cursor-pointer transition-all duration-200 border
      ${
        active
          ? "bg-accent/10 border-accent text-accent font-semibold"
          : "bg-transparent border-white/40 text-ink-muted font-normal hover:border-ink/40 hover:text-ink"
      }
    `}>
    {label}
  </motion.button>
);

const FilterSection = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="font-display text-[0.65rem] tracking-[0.22em] text-accent uppercase">
      {label}
    </span>
    <div className="flex-1 h-px bg-ink/10" />
  </div>
);

const Filter = ({ onFilterChange, className = "" }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 1_000_000,
  ]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const { data: categoriesData } = useSWR<Category[]>(
    "books-filter-categories",
    () => bookService.getCategories(),
  );
  const { data: priceRangeData } = useSWR("price-range", () =>
    bookService.getPriceRange(),
  );
  const { data: publishersData } = useSWR("get-all-publishers", () =>
    bookService.getPublishers(),
  );

  useEffect(() => {
    const cats = searchParams.getAll("categories");
    const pubs = searchParams.getAll("publishers");
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    const rat = searchParams.get("rating");
    const sort = searchParams.get("sortBy");

    if (cats.length) setSelectedCategories(cats);
    if (pubs.length) setSelectedPublishers(pubs);
    if (rat) setSelectedRating(parseInt(rat));
    if (sort) setSortBy(sort);
    if (min || max) {
      const lo = priceRangeData?.data?.minPrice ?? 0;
      const hi = priceRangeData?.data?.maxPrice ?? 1_000_000;
      setPriceRange([min ? parseInt(min) : lo, max ? parseInt(max) : hi]);
    }
  }, [searchParams, priceRangeData]);

  useEffect(() => {
    if (priceRangeData?.data)
      setPriceRange([
        priceRangeData.data.minPrice,
        priceRangeData.data.maxPrice,
      ]);
  }, [priceRangeData]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    [
      "categories",
      "publishers",
      "minPrice",
      "maxPrice",
      "rating",
      "sortBy",
    ].forEach((k) => params.delete(k));
    params.set("page", "1");

    selectedCategories.forEach((c) => params.append("categories", c));
    selectedPublishers.forEach((p) => params.append("publishers", p));

    const lo = priceRangeData?.data?.minPrice ?? 0;
    const hi = priceRangeData?.data?.maxPrice ?? 1_000_000;
    if (priceRange[0] > lo) params.set("minPrice", String(priceRange[0]));
    if (priceRange[1] < hi) params.set("maxPrice", String(priceRange[1]));
    if (selectedRating) params.set("rating", String(selectedRating));
    if (sortBy !== "newest") params.set("sortBy", sortBy);

    router.push(`/books?${params.toString()}`, { scroll: false });
    onFilterChange?.({
      categories: selectedCategories.length ? selectedCategories : undefined,
      publisher: selectedPublishers.length ? selectedPublishers : undefined,
      minPrice: priceRange[0] > lo ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < hi ? priceRange[1] : undefined,
      rating: selectedRating || undefined,
      sortBy: sortBy as FilterParams["sortBy"],
    });
    setIsOpen(false);
  }, [
    selectedCategories,
    selectedPublishers,
    priceRange,
    selectedRating,
    sortBy,
    searchParams,
    router,
    onFilterChange,
    priceRangeData,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPublishers([]);
    setSelectedRating(null);
    setSortBy("newest");
    if (priceRangeData?.data)
      setPriceRange([
        priceRangeData.data.minPrice,
        priceRangeData.data.maxPrice,
      ]);
    const params = new URLSearchParams(searchParams.toString());
    [
      "categories",
      "publishers",
      "minPrice",
      "maxPrice",
      "rating",
      "sortBy",
    ].forEach((k) => params.delete(k));
    params.set("page", "1");
    router.push(`/books?${params.toString()}`, { scroll: false });
  };

  const hasActive =
    selectedCategories.length > 0 ||
    selectedPublishers.length > 0 ||
    selectedRating !== null ||
    sortBy !== "newest" ||
    (priceRangeData?.data &&
      (priceRange[0] > priceRangeData.data.minPrice ||
        priceRange[1] < priceRangeData.data.maxPrice));

  const fmt = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + " đ";

  const SORT_OPTIONS = [
    { value: "newest", label: "Mới nhất" },
    { value: "oldest", label: "Cũ nhất" },
    { value: "price_asc", label: "Giá thấp → cao" },
    { value: "price_desc", label: "Giá cao → thấp" },
    { value: "rating", label: "Đánh giá cao" },
  ];

  return (
    <div className={className}>
      <div
        className={`bg-surface border rounded-sm transition-colors ${isOpen ? "border-white/40" : "border-white/30"}`}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 group">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal size={15} className="text-ink-muted" />
            <span className="font-display text-[0.9rem] tracking-[0.12em] text-ink uppercase">
              BỘ LỌC
            </span>
            {hasActive && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="bg-accent text-white font-display text-[0.65rem] tracking-[0.06em] px-2 py-0.5 rounded-sm uppercase">
                ĐANG LỌC
              </motion.span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilters();
                }}
                className="text-accent font-body text-[0.72rem] bg-transparent border-none cursor-pointer hover:underline">
                Xóa tất cả
              </button>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}>
              <ChevronDown
                size={15}
                className="text-ink-muted group-hover:text-ink transition-colors"
              />
            </motion.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-ink/10">
              <div className="p-5 space-y-6">
                <div>
                  <FilterSection label="SẮP XẾP" />
                  <div className="flex flex-wrap gap-2">
                    {SORT_OPTIONS.map((opt) => (
                      <FilterTag
                        key={opt.value}
                        label={opt.label}
                        active={sortBy === opt.value}
                        onClick={() => setSortBy(opt.value)}
                      />
                    ))}
                  </div>
                </div>

                {categoriesData && categoriesData.length > 0 && (
                  <div>
                    <FilterSection label="THỂ LOẠI" />
                    <div className="flex flex-wrap gap-2">
                      {categoriesData.map((cat) => (
                        <FilterTag
                          key={cat._id}
                          label={cat.name}
                          active={selectedCategories.includes(cat._id)}
                          onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.includes(cat._id)
                                ? prev.filter((id) => id !== cat._id)
                                : [...prev, cat._id],
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
                {publishersData?.data && publishersData.data.length > 0 && (
                  <div>
                    <FilterSection label="NHÀ XUẤT BẢN" />
                    <div className="flex flex-wrap gap-2">
                      {publishersData.data.map((pub) => (
                        <FilterTag
                          key={pub.name}
                          label={`${pub.name} (${pub.count})`}
                          active={selectedPublishers.includes(pub.name)}
                          onClick={() =>
                            setSelectedPublishers((prev) =>
                              prev.includes(pub.name)
                                ? prev.filter((n) => n !== pub.name)
                                : [...prev, pub.name],
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {priceRangeData?.data && (
                  <div>
                    <FilterSection label="KHOẢNG GIÁ" />
                    <div className="bg-base-alt rounded-sm px-5 py-4">
                      <Slider
                        value={priceRange}
                        onChange={(_, v) =>
                          setPriceRange(v as [number, number])
                        }
                        valueLabelDisplay="auto"
                        valueLabelFormat={fmt}
                        min={priceRangeData.data.minPrice || 0}
                        max={priceRangeData.data.maxPrice || 1_000_000}
                        step={10_000}
                        size="small"
                        sx={{
                          color: "var(--accent)",
                          height: 3,
                          "& .MuiSlider-thumb": {
                            width: 14,
                            height: 14,
                            "&:hover": {
                              boxShadow:
                                "0 0 0 8px color-mix(in srgb, var(--accent) 20%, transparent)",
                            },
                          },
                          "& .MuiSlider-rail": {
                            backgroundColor:
                              "color-mix(in srgb, var(--ink) 15%, transparent)",
                            height: 3,
                          },
                          "& .MuiSlider-valueLabel": {
                            fontSize: "11px",
                            background: "var(--ink)",
                            borderRadius: "2px",
                          },
                        }}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-ink-faint font-body text-[0.72rem]">
                          {fmt(priceRange[0])}
                        </span>
                        <span className="text-ink-faint font-body text-[0.72rem]">
                          {fmt(priceRange[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <FilterSection label="ĐÁNH GIÁ" />
                  <div className="flex gap-2 flex-wrap">
                    {[5, 4, 3, 2, 1].map((r) => {
                      const isActive = selectedRating === r;
                      return (
                        <motion.button
                          key={r}
                          onClick={() => setSelectedRating(isActive ? null : r)}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-body text-[0.72rem] cursor-pointer transition-all duration-200 border ${
                            isActive
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-white/40 bg-transparent text-ink-muted hover:border-ink/30 hover:text-ink"
                          }`}>
                          <Star
                            size={11}
                            className={
                              isActive ? "text-gold fill-current" : "text-gold"
                            }
                          />
                          {r} sao{r < 5 ? "+" : ""}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <motion.button
                    onClick={applyFilters}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative overflow-hidden flex items-center gap-2 px-6 py-2.5 text-white font-medium text-xs tracking-widest uppercase bg-accent rounded-sm font-body cursor-pointer border-none">
                    <span className="relative z-10">Áp dụng</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-accent-dark"
                    />
                  </motion.button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 px-5 py-2.5 border border-ink/15 text-ink-muted bg-transparent rounded-sm font-body text-[0.72rem] tracking-[0.1em] uppercase cursor-pointer transition-all duration-200 hover:text-ink hover:border-ink/30">
                    <X size={11} />
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Filter;
