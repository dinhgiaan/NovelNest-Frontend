"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import SideBarUser from "@/app/components/profile/side.bar.user"
import type { AuthContextType } from "@/app/context/auth.context"

// Component loading thay thế skeleton
function ComponentSkeleton() {
      return <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
}

// Lazy load heavy components
const InfoUser = dynamic(() => import("@/app/components/profile/info.user"), {
      loading: () => <ComponentSkeleton />,
})

const ChangePassword = dynamic(() => import("@/app/components/profile/change.password"), {
      loading: () => <ComponentSkeleton />,
})

const OrderHistory = dynamic(() => import("@/app/components/profile/order.history"), {
      loading: () => <ComponentSkeleton />,
})

const PurchasedBook = dynamic(() => import("@/app/components/profile/purchased.book"), {
      loading: () => <ComponentSkeleton />,
})

interface IProps {
      userInfo: AuthContextType
}

const UserProfile = ({ userInfo }: IProps) => {
      const [active, setActive] = useState<number>(0)

      return (
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
                  <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                              <div className="w-full lg:w-1/4 xl:w-1/5">
                                    <SideBarUser active={active} setActive={setActive} />
                              </div>
                              <div className="w-full lg:w-3/4 xl:w-4/5">
                                    <div className="w-full">
                                          {active === 0 && <InfoUser userInfo={userInfo} />}
                                          {active === 1 && <ChangePassword userInfo={userInfo} />}
                                          {active === 2 && <PurchasedBook />}
                                          {active === 5 && <OrderHistory userInfo={userInfo} />}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default UserProfile
