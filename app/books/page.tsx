'use client'
import ErrorAPI from "../components/error.api"
import Heading from "../utils/heading"
import Loading from "../utils/loading"
import BookPage from "./Book"
import useSWR from "swr"

const Page = () => {
      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR('http://localhost:8888/api/v1/books', fetcher,
            {
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false
            }
      );
      // console.log('--> check data with swr: ', data);

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      return (
            <>
                  <Heading
                        title="Khám phá các cuốn sách"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <BookPage
                        data={data?.data || []}
                  />
            </>
      );
}

export default Page;
