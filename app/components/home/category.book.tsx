"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import useSWR from "swr";
import { categoryService } from "@/app/lib/api/category";
import { ArrowRight, BookOpen } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  count: number;
}

interface ApiCategory {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  bookCount?: number;
}

interface ApiResponse {
  categories?: ApiCategory[];
}

const CACHE_DURATION = 300000;
const ANIMATION_DELAY = 50;
const INITIAL_DELAY = 100;
const CATEGORIES_TO_SHOW = 12;

const fetcher = async (): Promise<Category[]> => {
  try {
    const res: ApiResponse = await categoryService.getAllCategoriesAPI();
    if (res?.categories) {
      return res.categories.map((cat) => ({
        _id: cat._id,
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
        count: cat.bookCount || 0,
      }));
    }
    return [];
  } catch (error) {
    throw error;
  }
};

const LoadingSkeleton = () => (
  <section className="py-16 bg-base">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="h-8 bg-ink/10 rounded-sm w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-4 bg-ink/5 rounded-sm w-96 mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-36 bg-ink/5 border border-ink/5 rounded-sm animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  </section>
);

const ErrorState = () => (
  <section className="py-16 bg-base">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="bg-accent/5 border border-accent/20 rounded-sm p-12">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-accent" />
        </div>
        <p className="font-display text-[1.2rem] tracking-[0.05em] text-accent mb-1">
          KHÔNG THỂ TẢI DANH MỤC
        </p>
        <p className="font-body text-[0.85rem] text-accent/80">
          Vui lòng thử lại sau
        </p>
      </div>
    </div>
  </section>
);

const EmptyState = () => (
  <section className="py-16 bg-base">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="bg-surface border border-ink/10 rounded-sm p-12">
        <div className="w-20 h-20 bg-ink/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-ink-muted" />
        </div>
        <p className="font-display text-[1.2rem] tracking-[0.05em] text-ink mb-2">
          CHƯA CÓ DANH MỤC NÀO
        </p>
        <p className="font-body text-[0.85rem] text-ink-muted">
          Danh mục sách sẽ được cập nhật sớm
        </p>
      </div>
    </div>
  </section>
);

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: (id: string) => void;
  itemRef: (el: HTMLButtonElement | null) => void;
}

const CategoryCard = ({
  category,
  index,
  onClick,
  itemRef,
}: CategoryCardProps) => {
  const isComingSoon = category.count === 0;

  return (
    <button
      onClick={() => !isComingSoon && onClick(category._id)}
      disabled={isComingSoon}
      className={`group relative overflow-hidden rounded-sm bg-surface border border-ink/10 p-5 lg:p-6 transition-all duration-300 opacity-0 translate-y-8 focus:outline-none focus:border-accent text-left ${
        !isComingSoon
          ? "hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-pointer"
          : "opacity-60 cursor-not-allowed"
      }`}
      style={{
        transitionDelay: `${index * ANIMATION_DELAY + INITIAL_DELAY}ms`,
      }}
      ref={itemRef}>
      {!isComingSoon && (
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="font-body font-semibold text-[0.95rem] text-ink mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-accent">
            {category.name}
          </h3>
          <p className="font-body text-[0.8rem] text-ink-muted mb-3 line-clamp-2 min-h-[2.5rem]">
            {category.description ||
              "Khám phá ngay những cuốn sách hay trong thể loại này"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {category.count > 0 ? (
            <span className="text-[0.7rem] font-medium font-body tracking-[0.05em] text-gold uppercase">
              {category.count} sách
            </span>
          ) : (
            <span className="text-[0.7rem] font-medium font-body tracking-[0.05em] text-ink-faint bg-ink/5 px-3 py-1 rounded-sm italic uppercase">
              Sắp ra mắt
            </span>
          )}

          {!isComingSoon && (
            <ArrowRight
              size={15}
              className="text-ink-faint group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0"
            />
          )}
        </div>
      </div>
    </button>
  );
};

const Categories = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useSWR<Category[]>("categories", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: CACHE_DURATION,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [categories]);

  const handleCategoryClick = useCallback(
    (id: string) => {
      router.push(`/books?page=1&categories=${id}`);
    },
    [router],
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      itemsRef.current[index] = el;
    },
    [],
  );

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;
  if (!categories.length) return <EmptyState />;

  const displayedCategories = categories.slice(0, CATEGORIES_TO_SHOW);
  const hasMoreCategories = categories.length > CATEGORIES_TO_SHOW;

  return (
    <section ref={containerRef} className="py-20 bg-base">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="text-center mb-14 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          ref={setItemRef(0)}>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[0.03em] leading-none text-ink mb-3 uppercase">
            Khám phá theo thể loại
          </h2>
          <p className="font-body text-ink-muted text-[0.95rem] max-w-2xl mx-auto">
            Tìm kiếm cuốn sách hoàn hảo từ hàng trăm thể loại đa dạng
          </p>
          <div className="mx-auto w-12 h-[3px] bg-accent mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {displayedCategories.map((category, index) => (
            <CategoryCard
              key={category._id}
              category={category}
              index={index}
              onClick={handleCategoryClick}
              itemRef={setItemRef(index + 1)}
            />
          ))}
        </div>

        {hasMoreCategories && (
          <div
            className="text-center opacity-0 translate-y-8 transition-all duration-500 ease-out"
            ref={setItemRef(displayedCategories.length + 1)}
            style={{ transitionDelay: "300ms" }}>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-[linear-gradient(to_right,transparent,color-mix(in_srgb,var(--ink)_15%,transparent))] flex-1 max-w-[80px]" />
              <div className="flex items-center gap-1.5 font-body text-[0.8rem]">
                <span className="text-ink-faint uppercase tracking-wider">
                  Đang có
                </span>
                <span className="text-ink font-semibold">
                  {categories.length} thể loại khác nhau
                </span>
                <span className="text-ink-faint uppercase tracking-wider">
                  đợi bạn
                </span>
              </div>
              <div className="h-px bg-[linear-gradient(to_left,transparent,color-mix(in_srgb,var(--ink)_15%,transparent))] flex-1 max-w-[80px]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
