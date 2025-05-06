'use client';

import Heading from "../../../utils/heading";
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import BookDetail from '../BookDetail';
import Loading from "@/app/utils/loading";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth.context";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = () => {
      const { slug } = useParams();
      const { userInfo } = useContext(AuthContext);
      const userId = userInfo?.user?._id;



      const { data, error, isLoading } = useSWR(
            slug ? `${process.env.NEXT_PUBLIC_BOOKS}/detail/${slug}` : null,
            fetcher
      );


      if (error) {
            return <div>Có lỗi xảy ra!</div>
      }

      if (isLoading) {
            return <Loading />
      }

      return (
            <>
                  <div>
                        <Heading
                              title={`${data?.data?.title}`}
                              description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                              keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                        />
                        <BookDetail
                              book={data?.data}
                              error={error}
                              isLoading={isLoading}
                              userId={userId}
                        />
                  </div>
            </>
      )
};

export default Page;
