'use client'
import { lazy, Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ErrorAPI from "../components/error.api"
import Heading from "../utils/heading"
import Loading from "../utils/loading"
import useSWR from "swr"
import { bookService } from "../lib/api/book"
import { userService } from "../lib/api/user"

const BookPage = lazy(() => import('./Book'));

const Page = () => {
      const searchParams = useSearchParams();
      const [isBookPurchased, setBookPurchased] = useState<boolean>();

      const page = searchParams.get("page") || "1";
      const limit = searchParams.get("limit") || "10";

      const fetcher = () => bookService.getAllBooks({
            page: parseInt(page),
            limit: parseInt(limit)
      });

      const { data, error, isLoading } = useSWR(
            `books-${page}-${limit}`,
            fetcher,
            {
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false
            }
      );

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      return (
            <>
                  <Heading
                        title="Khám phá các cuốn sách"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Suspense fallback={<Loading />}>
                        <BookPage
                              data={data?.data || []}
                              pagination={data?.pagination || {
                                    currentPage: parseInt(page),
                                    totalPages: 1,
                                    totalResults: 0,
                                    resultsPerPage: parseInt(limit),
                                    hasNextPage: false,
                                    hasPrevPage: false
                              }}
                        />
                  </Suspense>
            </>
      );
}

export default Page;