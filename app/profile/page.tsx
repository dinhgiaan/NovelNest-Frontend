"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import Heading from "@/app/utils/heading";
import { useAuth } from "@/app/context/auth.context";
import { useRouter } from "next/navigation";

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
  );
}

const UserProfile = dynamic(() => import("./UserProfile"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});

const Page = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <ProfileSkeleton />;
  if (!isAuthenticated) return null;

  return (
    <>
      <Heading
        title={user?.name ?? "Hồ sơ"}
        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
      />
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile />
      </Suspense>
    </>
  );
};

export default Page;
