'use client';

import Heading from "../../../utils/heading";
import { useParams } from 'next/navigation';
import BookDetail from '../BookDetail';
import Loading from "@/app/utils/loading";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth.context";
import { useBookDetail } from "@/app/hooks/use.book.details";
import ErrorAPI from "@/app/components/error.api";

const Page = () => {
      const { slug } = useParams();
      const { userInfo } = useContext(AuthContext);
      const userId = userInfo?.user?._id;

      const { book: bookData, error, isLoading } = useBookDetail(slug as string)

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />

      const title = bookData?.title;

      return (
            <>
                  <div>
                        <Heading
                              title={`${title}`}
                              description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                              keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                        />
                        <BookDetail
                              book={bookData}
                              error={error}
                              isLoading={isLoading}
                              userId={userId}
                        />
                  </div>
            </>
      )
};

export default Page;
