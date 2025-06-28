"use client"

import bannerProfile from "@/app/public/banner-profile.webp"
import Image from "next/image"
import type { AuthContextType } from "@/app/context/auth.context"
import { useState, useLayoutEffect, useRef, useEffect } from "react"
import UpdateUserInfo from "./update.user.info"
import { CiEdit } from "react-icons/ci"
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md"
import { FaMapMarkedAlt } from "react-icons/fa"

interface IProps {
      userInfo: AuthContextType
}

const InfoUser = ({ userInfo }: IProps) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const [localUserInfo, setLocalUserInfo] = useState(userInfo)
      const containerRef = useRef<HTMLDivElement>(null)

      // Update local state whenever userInfo changes
      useEffect(() => {
            setLocalUserInfo(userInfo)
      }, [userInfo])

      const handleOpenUpdateInfo = () => {
            setIsOpen(true)
      }

      const onUserInfoUpdated = (updatedUser: any) => {
            setLocalUserInfo((prev) => ({
                  ...prev,
                  user: {
                        ...prev.user,
                        ...updatedUser,
                  },
            }))
      }

      useLayoutEffect(() => {
            if (containerRef.current) {
                  const height = containerRef.current.offsetHeight
                  containerRef.current.style.minHeight = `${height}px`
            }
      }, [])

      return (
            <div
                  ref={containerRef}
                  className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full"
            >
                  <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
                        <div className="w-full shadow-lg rounded-lg overflow-hidden">
                              <div className="dark:bg-[#474d63] bg-[#ebf1fa] relative">
                                    {/* Banner Image */}
                                    <div className="h-24 sm:h-32 md:h-40 xl:h-48 overflow-hidden">
                                          <Image
                                                src={bannerProfile || "/placeholder.svg"}
                                                alt="Banner Profile User"
                                                width={1003}
                                                height={220}
                                                className="w-full h-full object-cover"
                                          />
                                    </div>

                                    {/* Edit Button */}
                                    <div
                                          className="absolute top-2 right-2 sm:top-4 sm:right-4 dark:text-[#ccc] text-[#ccc] hover:text-[#d26767] cursor-pointer bg-black/20 hover:bg-black/30 rounded-full p-1.5 sm:p-2 transition-all duration-200"
                                          onClick={handleOpenUpdateInfo}
                                    >
                                          <CiEdit size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </div>

                                    {/* Profile Content */}
                                    <div className="px-3 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 -mt-8 sm:-mt-12 lg:-mt-14 relative">
                                          {/* Avatar and Name Section */}
                                          <div className="flex flex-col items-center mb-4 sm:mb-6 relative z-50">
                                                <div className="dark:bg-[#dbdac3] bg-[#f1f0f0] rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 flex items-center justify-center shadow-lg">
                                                      <Image
                                                            alt="User Avatar Profile"
                                                            src="https://res.cloudinary.com/dovw8fqpp/image/upload/v1736577135/book_thumbnails/jfqfmqsddxvpjouxupqg.webp"
                                                            priority
                                                            width={70}
                                                            height={50}
                                                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-cover rounded-full"
                                                      />
                                                </div>
                                                <h1 className="text-base sm:text-lg lg:text-xl font-bold dark:text-[#63d9e8] text-[#9087fb] mt-2 sm:mt-3 mb-1 text-center px-2">
                                                      {localUserInfo.user?.name}
                                                </h1>
                                                <span className="text-xs sm:text-sm dark:text-[#ccc] text-[#454343] tracking-wide font-medium italic text-center px-2">
                                                      {localUserInfo.user?.role}
                                                </span>
                                          </div>

                                          {/* Info Card */}
                                          <div className="relative border dark:border-[#2a2a36] border-[#e0e0e0] p-3 sm:p-5 lg:p-7 rounded-lg shadow-sm bg-white/50 dark:bg-[#2d3142]/50 backdrop-blur-sm">
                                                <div className="absolute -top-2.5 sm:-top-3 left-3 sm:left-4 dark:bg-[#474d63] bg-[#6794d8] px-2 sm:px-3 lg:px-4 py-1 rounded-full text-xs sm:text-sm font-bold dark:text-[#b6cbfb] text-[#ebf178] shadow-sm">
                                                      Thông tin cơ bản
                                                </div>

                                                <div className="space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                                                      {/* Email */}
                                                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-2 sm:p-2.5 lg:p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                                                                  <MdOutlineMail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0 flex-1">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Email</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-xs sm:text-sm font-medium truncate">
                                                                        {localUserInfo.user?.email}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      {/* Phone */}
                                                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-2 sm:p-2.5 lg:p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                                                                  <MdOutlineLocalPhone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0 flex-1">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Điện thoại</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-xs sm:text-sm font-medium">
                                                                        {localUserInfo.user?.phone}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      {/* Address */}
                                                      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-2 sm:p-2.5 lg:p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0 mt-1">
                                                                  <FaMapMarkedAlt className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0 flex-1">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Địa chỉ</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-xs sm:text-sm font-medium leading-relaxed">
                                                                        {localUserInfo.user?.address}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <UpdateUserInfo
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        userInfo={localUserInfo}
                        onUserInfoUpdated={onUserInfoUpdated}
                  />
            </div>
      )
}

export default InfoUser