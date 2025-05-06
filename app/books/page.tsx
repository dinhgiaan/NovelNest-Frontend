'use client'
import { lazy, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ErrorAPI from "../components/error.api"
import Heading from "../utils/heading"
import Loading from "../utils/loading"
import useSWR from "swr"

const BookPage = lazy(() => import('./Book'));

const Page = () => {
      const searchParams = useSearchParams();

      // Lấy thông số trang từ URL hoặc sử dụng giá trị mặc định
      const page = searchParams.get("page") || "1";
      const limit = searchParams.get("limit") || "10";

      // Tạo URL API với tham số trang
      const apiUrl = `${process.env.NEXT_PUBLIC_BOOKS}?page=${page}&limit=${limit}`;

      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR(apiUrl, fetcher,
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
                                    currentPage: 1,
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