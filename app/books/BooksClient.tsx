'use client'

import { lazy, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ErrorAPI from "../components/error.api";
import Loading from "../utils/loading";
import useSWR from "swr";
import { bookService, FilterParams } from "../lib/api/book";

const BookPage = lazy(() => import('./Book'));

interface PaginationData {
      currentPage: number;
      totalPages: number;
      totalResults: number;
      hasNext: boolean;
      hasPrev: boolean;
}

const BooksClient = () => {
      const searchParams = useSearchParams();

      const buildFilterParams = (): FilterParams => {
            const params: FilterParams = {};

            const page = searchParams.get('page');
            if (page) params.page = parseInt(page);

            const limit = searchParams.get('limit');
            if (limit) params.limit = parseInt(limit);
            else params.limit = 12;

            const categories = searchParams.getAll('categories');
            if (categories.length) params.categories = categories;

            const minPrice = searchParams.get('minPrice');
            const maxPrice = searchParams.get('maxPrice');
            if (minPrice) params.minPrice = parseInt(minPrice);
            if (maxPrice) params.maxPrice = parseInt(maxPrice);

            const publisher = searchParams.getAll('publisher');
            if (publisher.length) params.publisher = publisher;

            const rating = searchParams.get('rating');
            if (rating) params.rating = parseInt(rating);

            const sortBy = searchParams.get('sortBy');
            if (sortBy) {
                  const validSortValues = ['newest', 'oldest', 'price_asc', 'price_desc', 'rating'] as const;
                  if (validSortValues.includes(sortBy as typeof validSortValues[number])) {
                        params.sortBy = sortBy as typeof validSortValues[number];
                  }
            }

            const search = searchParams.get('search');
            if (search) params.search = search;

            return params;
      };

      const fetcher = () => {
            const filterParams = buildFilterParams();
            return bookService.filterBooks(filterParams);
      };

      const { data, error, isLoading, mutate } = useSWR(
            ['books-client', searchParams.toString()],
            fetcher,
            {
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false,
                  keepPreviousData: true,
                  errorRetryCount: 3,
                  errorRetryInterval: 1000,
            }
      );

      if (error) {
            return <ErrorAPI />;
      }

      if (isLoading) {
            return <Loading />;
      }

      let booksData: IBook[];
      let paginationData: PaginationData;

      if (data && data.success && data.data && data.pagination) {
            booksData = data.data;

            paginationData = {
                  currentPage: data.pagination.currentPage,
                  totalPages: data.pagination.totalPages,
                  totalResults: data.pagination.totalResults,
                  hasNext: data.pagination.hasNextPage || data.pagination.currentPage < data.pagination.totalPages,
                  hasPrev: data.pagination.hasPrevPage || data.pagination.currentPage > 1
            };
      } else if (Array.isArray(data)) {
            booksData = data;

            const currentPage = parseInt(searchParams.get('page') || '1');
            const limit = parseInt(searchParams.get('limit') || '12');

            paginationData = {
                  currentPage: currentPage,
                  totalPages: Math.ceil(data.length / limit),
                  totalResults: data.length,
                  hasNext: currentPage < Math.ceil(data.length / limit),
                  hasPrev: currentPage > 1
            };
      } else {
            booksData = [];
            paginationData = {
                  currentPage: parseInt(searchParams.get('page') || '1'),
                  totalPages: 1,
                  totalResults: 0,
                  hasNext: false,
                  hasPrev: false
            };
      }

      return (
            <Suspense fallback={<Loading />}>
                  <BookPage
                        data={booksData}
                        pagination={paginationData}
                        onRefresh={() => mutate()}
                  />
            </Suspense>
      );
};

export default BooksClient;
