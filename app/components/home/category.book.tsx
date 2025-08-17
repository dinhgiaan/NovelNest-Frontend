'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { categoryService } from '@/app/lib/api/category';
import { ArrowRight, BookOpen } from 'lucide-react';

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
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl w-64 mx-auto mb-4 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-96 mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-36 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                    />
                ))}
            </div>
        </div>
    </section>
);

const ErrorState = () => (
    <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
                    Không thể tải danh mục
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                    Vui lòng thử lại sau
                </p>
            </div>
        </div>
    </section>
);

const EmptyState = () => (
    <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-12">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    Chưa có danh mục nào
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                    Danh mục sách sẽ được cập nhật sớm
                </p>
            </div>
        </div>
    </section>
);

interface CategoryCardProps {
    category: Category;
    index: number;
    onClick: (slug: string) => void;
    itemRef: (el: HTMLButtonElement | null) => void;
}

const CategoryCard = ({ category, index, onClick, itemRef }: CategoryCardProps) => {
    const isComingSoon = category.count === 0;

    return (
        <button
            onClick={() => !isComingSoon && onClick(category.slug)}
            disabled={isComingSoon}
            className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 p-6
                ${!isComingSoon ? 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100/20 dark:hover:shadow-blue-900/20 hover:-translate-y-1' : 'opacity-70 cursor-not-allowed'}
                transition-all duration-300
                opacity-0 translate-y-8
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                active:scale-95`}
            style={{
                transitionDelay: `${index * ANIMATION_DELAY + INITIAL_DELAY}ms`
            }}
            ref={itemRef}
        >
            {!isComingSoon && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <div className="relative z-10 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-2 
                    line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {category.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm mb-4 line-clamp-2 min-h-11">
                    {category.description || 'Khám phá ngay những cuốn sách hay trong thể loại này'}
                </p>

                <div className="flex items-center justify-between">
                    {category.count > 0 ? (
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-md px-4">
                            <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                {category.count} sách
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500 italic bg-gray-100 dark:bg-gray-700 
                            px-4 py-1 rounded-md">
                            Sắp ra mắt
                        </span>
                    )}

                    {!isComingSoon && (
                        <ArrowRight
                            size={16}
                            className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 
                                transition-all duration-300 flex-shrink-0"
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

    const { data: categories = [], isLoading, error } = useSWR<Category[]>(
        'categories',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: CACHE_DURATION,
            errorRetryCount: 3,
            errorRetryInterval: 1000,
        }
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target as HTMLElement;
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -5% 0px'
            }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, [categories]);

    const handleCategoryClick = useCallback(() => {
        router.push(`/books`);
    }, [router]);

    const setItemRef = useCallback((index: number) => (el: HTMLElement | null) => {
        itemsRef.current[index] = el;
    }, []);

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState />;
    if (!categories.length) return <EmptyState />;

    const displayedCategories = categories.slice(0, CATEGORIES_TO_SHOW);
    const hasMoreCategories = categories.length > CATEGORIES_TO_SHOW;

    return (
        <section ref={containerRef} className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div
                    className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                    ref={setItemRef(0)}
                >
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 
            dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
                        Khám phá theo thể loại
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Tìm kiếm cuốn sách hoàn hảo từ hàng trăm thể loại đa dạng
                    </p>
                    <div className="mx-auto w-24 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 
            rounded-full mt-6 shadow-lg"></div>
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
                        className="text-center opacity-0 translate-y-8 transition-all duration-200 ease-out"
                        ref={setItemRef(displayedCategories.length + 1)}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1 max-w-20" />
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="text-xs uppercase tracking-wider opacity-75">Đang có</span>
                                <span className="text-sm font-semibold">{categories.length} thể loại khác nhau</span>
                                <span className="text-xs uppercase tracking-wider opacity-75">đợi bạn</span>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent flex-1 max-w-20" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;
