"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Heading from "@/app/utils/heading"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/app/context/auth.context"
import { useRouter } from "next/navigation"

function ProfileSkeleton() {
      return (
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
                  <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                              <div className="w-full lg:w-1/4 xl:w-1/5">
                                    <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                              </div>
                              <div className="w-full lg:w-3/4 xl:w-4/5">
                                    <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

const UserProfile = dynamic(() => import("./UserProfile"), {
      loading: () => <ProfileSkeleton />,
      ssr: false,
})

const Page = () => {
      const { userInfo, isLoading } = useContext(AuthContext)
      const router = useRouter()

      useEffect(() => {
            if (!isLoading && !userInfo.isAuthenticated) {
                  router.push("/login")
            }
      }, [userInfo.isAuthenticated, isLoading, router])

      if (isLoading) {
            return <ProfileSkeleton />
      }

      if (!userInfo.isAuthenticated) {
            return null
      }

      return (
            <>
                  <Heading
                        title={`${userInfo.user?.name}`}
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Suspense fallback={<ProfileSkeleton />}>
                        <UserProfile userInfo={userInfo} />
                  </Suspense>
            </>
      )
}

export default Page;
