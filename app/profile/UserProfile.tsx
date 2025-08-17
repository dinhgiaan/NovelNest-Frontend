"use client"

import { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import SideBarUser from "@/app/components/profile/side.bar.user"
import type { AuthContextType } from "@/app/context/auth.context"

const ComponentSkeleton = () => {
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

const InfoUser = dynamic(() => import("@/app/components/profile/info.user"), {
      loading: () => <ComponentSkeleton />,
})

const PurchasedBook = dynamic(() => import("@/app/components/profile/purchased.book"), {
      loading: () => <ComponentSkeleton />,
})

const WhiteLists = dynamic(() => import("@/app/components/profile/white.lists"), {
      loading: () => <ComponentSkeleton />,
})

const SupportTicket = dynamic(() => import("@/app/components/profile/support.ticket"), {
      loading: () => <ComponentSkeleton />,
})

const OrderHistory = dynamic(() => import("@/app/components/profile/order.history"), {
      loading: () => <ComponentSkeleton />,
})

interface IProps {
      userInfo: AuthContextType
}

const UserProfile = ({ userInfo }: IProps) => {
      const [active, setActive] = useState<number>(0)
      const [renderedComponents, setRenderedComponents] = useState<Set<number>>(new Set([0]))

      const renderComponent = useMemo(() => {
            const components: { [key: number]: JSX.Element } = {}

            if (renderedComponents.has(0)) {
                  components[0] = <InfoUser />
            }

            if (renderedComponents.has(1)) {
                  components[1] = <PurchasedBook />
            }

            if (renderedComponents.has(2)) {
                  components[2] = <WhiteLists />
            }

            if (renderedComponents.has(3)) {
                  components[3] = <SupportTicket />
            }

            if (renderedComponents.has(4)) {
                  components[4] = <OrderHistory userInfo={userInfo} />
            }

            return components
      }, [renderedComponents, userInfo])

      const handleTabChange = (tabIndex: number) => {
            setActive(tabIndex)
            if (!renderedComponents.has(tabIndex)) {
                  setRenderedComponents(prev => new Set([...Array.from(prev), tabIndex]))
            }
      }

      return (
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
                  <div className="h-20"></div>
                  <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                              <div className="w-full lg:w-1/4 xl:w-1/5">
                                    <SideBarUser active={active} setActive={handleTabChange} />
                              </div>
                              <div className="w-full lg:w-3/4 xl:w-4/5">
                                    <div className="w-full">
                                          {Object.entries(renderComponent).map(([index, component]) => (
                                                <div
                                                      key={index}
                                                      style={{
                                                            display: active === parseInt(index) ? 'block' : 'none'
                                                      }}
                                                >
                                                      {component}
                                                </div>
                                          ))}
                                          {!renderedComponents.has(active) && <ComponentSkeleton />}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default UserProfile;
