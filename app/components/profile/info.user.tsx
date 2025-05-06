"use client"

import bannerProfile from "@/app/public/banner-profile.png"
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

      // Callback function to update local state after successful API update
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
                  className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-[620px]"
            >
                  <div className="flex">
                        <div className="w-full shadow-md">
                              <div className="dark:bg-[#474d63] bg-[#ebf1fa] rounded-sm">
                                    <div className="h-40 z-10">
                                          <Image src={bannerProfile || "/placeholder.svg"} alt="Banner Profile User" width={1003} height={220} />
                                    </div>

                                    <div
                                          className="absolute top-60 right-72 dark:text-[#ccc] text-[#ccc] hover:text-[#d26767] cursor-pointer"
                                          onClick={handleOpenUpdateInfo}
                                    >
                                          <div>
                                                <CiEdit size={18} />
                                          </div>
                                    </div>

                                    <div className="p-8 mt-[-115]">
                                          <div className="flex flex-col items-center mb-6 z-50">
                                                <div className="dark:bg-[#dbdac3] bg-[#f1f0f0] rounded-full w-28 h-28 flex items-center justify-center">
                                                      <Image
                                                            alt="User Avatar Profile"
                                                            src="https://res.cloudinary.com/dovw8fqpp/image/upload/v1736577135/book_thumbnails/jfqfmqsddxvpjouxupqg.webp"
                                                            priority
                                                            width={70}
                                                            height={50}
                                                      />
                                                </div>
                                                <h1 className="text-xl font-bold dark:text-[#63d9e8] text-[#9087fb] mt-3 mb-1">
                                                      {localUserInfo.user?.name}
                                                </h1>
                                                <span className="text-xs dark:text-[#ccc] text-[#454343] tracking-wide font-medium italic">
                                                      {localUserInfo.user?.role}
                                                </span>
                                          </div>

                                          <div className="relative border dark:border-[#2a2a36] border-[#e0e0e0] p-7 rounded-lg shadow-sm bg-white/50 dark:bg-[#2d3142]/50 backdrop-blur-sm">
                                                <div className="absolute -top-4 left-4 dark:bg-[#474d63] bg-[#6794d8] px-4 py-1 rounded-full text-sm font-bold dark:text-[#b6cbfb] text-[#ebf178] shadow-sm">
                                                      Thông tin cơ bản
                                                </div>

                                                <div className="space-y-2 mt-2">
                                                      <div className="flex items-center gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                                                                  <MdOutlineMail className="w-5 h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Email</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-sm font-medium">
                                                                        {localUserInfo.user?.email}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                                                                  <MdOutlineLocalPhone className="w-5 h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Điện thoại</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-sm font-medium">
                                                                        {localUserInfo.user?.phone}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-4 group">
                                                            <div className="dark:bg-[#4b5270] bg-[#f5eaf5] p-3 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                                                                  <FaMapMarkedAlt className="w-5 h-5 dark:text-[#a2b8ff] text-[#d985e0]" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                  <span className="text-xs text-gray-500 dark:text-gray-400">Địa chỉ</span>
                                                                  <span className="dark:text-[#e9e9b0] text-[#6d5a5a] text-sm font-medium">
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

