'use client'

import Heading from "@/app/utils/heading"
import UserProfile from "./UserProfile"
import { useContext } from "react"
import { AuthContext } from "@/app/context/auth.context"

const Page = () => {
      const { userInfo } = useContext(AuthContext);

      return (
            <>
                  <Heading
                        title={`Hồ sơ của: ${userInfo.user?.name}`}
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <UserProfile userInfo={userInfo} />
            </>
      );
}

export default Page;
