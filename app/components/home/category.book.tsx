'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { categoryService } from '@/app/lib/api/category';
import { ArrowRight } from 'lucide-react';

const fetcher = async () => {
    const res = await categoryService.getAllCategoriesAPI();
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
};

const Categories = () => {
    const router = useRouter();
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    const { data: categories = [], isLoading, error } = useSWR('categories', fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 300000, // 5 minutes cache
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, [categories]);

    const handleCategoryClick = (slug) => {
        router.push(`/categories/${slug}`);
    };

    if (isLoading) {
        return (
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium">Không thể tải danh mục</p>
                        <p className="text-sm mt-1">Vui lòng thử lại sau</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!categories.length) {
        return (
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="text-gray-400 dark:text-gray-500">
                        <p className="text-lg">Chưa có danh mục nào</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div
                    className="text-center mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                    ref={(el) => (itemsRef.current[0] = el)}
                >
                    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                        Khám phá theo thể loại
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Tìm kiếm cuốn sách hoàn hảo từ hàng trăm thể loại đa dạng
                    </p>
                    <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full mt-3"></div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {categories.slice(0, 12).map((category, index) => (
                        <button
                            key={category._id}
                            onClick={() => handleCategoryClick(category.slug)}
                            className={`
                group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 p-6
                hover:border-gray-300 dark:hover:border-gray-600
                hover:shadow-lg transition-all duration-300
                opacity-0 translate-y-8
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
                            style={{
                                transitionDelay: `${index * 50 + 100}ms`
                            }}
                            ref={(el) => (itemsRef.current[index + 1] = el)}
                        >
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base mb-2 line-clamp-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2">
                                    {category.description || 'Khám phá ngay'}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                        {category.count > 0 ? `${category.count} sách` : ''}
                                    </span>
                                    <ArrowRight
                                        size={16}
                                        className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </button>
                    ))}
                </div>

                {categories.length > 12 && (
                    <div
                        className="text-center mt-12 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                        ref={(el) => (itemsRef.current[categories.length + 1] = el)}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <button
                            onClick={() => router.push('/categories')}
                            className="
                inline-flex items-center gap-2 px-6 py-3 
                bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-300 rounded-xl font-medium
                transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
                        >
                            Xem tất cả danh mục
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;