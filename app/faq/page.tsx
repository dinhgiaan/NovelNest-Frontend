'use client'

import useSWR from "swr";
import ErrorAPI from "../components/error.api";
import Heading from "../utils/heading"
import Loading from "../utils/loading";
import FAQPage from "./FAQ"

const Page = () => {
      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR('http://localhost:8888/api/v1/faqs', fetcher,
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
                        title="Các câu hỏi thường gặp"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <FAQPage faqData={data.data?.faq} />
            </>
      )
}

export default Page;
