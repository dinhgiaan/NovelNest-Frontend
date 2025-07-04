"use client"

import Image from "next/image"
import type { AuthContextType } from "@/app/context/auth.context"
import { useState, useEffect } from "react"
import { Edit, Mail, Phone, MapPin } from "lucide-react"
import { getInfo } from "@/app/lib/api"
import UpdateUserInfo from "./update.user.info"

interface IProps {
      userInfo: AuthContextType
}

const InfoUser = ({ userInfo }: IProps) => {
      const [isOpen, setIsOpen] = useState<boolean>(false)
      const [localUserInfo, setLocalUserInfo] = useState(userInfo)

      useEffect(() => {
            setLocalUserInfo(userInfo)
      }, [userInfo])

      useEffect(() => {
            const fetchLatestInfo = async () => {
                  try {
                        const response = await getInfo()
                        if (response.success) {
                              setLocalUserInfo((prev) => ({
                                    ...prev,
                                    user: { ...prev.user, ...response.data },
                              }))
                        }
                  } catch (error) {
                        console.error("Error fetching latest info:", error)
                  }
            }
            fetchLatestInfo()
      }, [])

      const onUserInfoUpdated = (updatedUser: any) => {
            setLocalUserInfo((prev) => ({
                  ...prev,
                  user: {
                        ...prev.user,
                        ...updatedUser,
                  },
            }))
      }

      const optimizeCloudinaryUrl = (url: string) => {
            if (!url.includes('res.cloudinary.com')) return url;
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
      };
      /*
      Tham số	Mục đích
      f_auto	Tự động chọn định dạng ảnh tốt nhất (WebP, AVIF, JPEG…) tùy trình duyệt
      q_auto	Tự động chọn chất lượng tối ưu (tốt cho hiệu suất & hình ảnh)
      */

      return (
            <div className="w-full max-w-4xl mx-auto">
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                        {/* Banner Section - More interesting design */}
                        <div className="relative h-24 sm:h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
                              {/* Animated background shapes */}
                              <div className="absolute inset-0">
                                    <div className="absolute top-2 left-4 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                                    <div className="absolute top-6 right-8 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-300"></div>
                                    <div className="absolute bottom-4 left-8 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-700"></div>
                                    <div className="absolute bottom-2 right-4 w-3 h-3 bg-white/25 rounded-full animate-bounce delay-1000"></div>
                              </div>

                              {/* Geometric pattern overlay */}
                              <div className="absolute inset-0 opacity-20">
                                    <svg className="w-full h-full" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice">
                                          <defs>
                                                <pattern id="hexagons" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                                                      <polygon
                                                            points="10,1 18.66,6 18.66,16 10,21 1.34,16 1.34,6"
                                                            fill="none"
                                                            stroke="white"
                                                            strokeWidth="0.5"
                                                      />
                                                </pattern>
                                          </defs>
                                          <rect width="100%" height="100%" fill="url(#hexagons)" />
                                    </svg>
                              </div>

                              <button
                                    onClick={() => setIsOpen(true)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                    <Edit size={14} className="text-white" />
                              </button>
                        </div>

                        <div className="p-4 -mt-8 relative">
                              {/* Avatar and Name - Smaller */}
                              <div className="flex flex-col items-center mb-4">
                                    <div className="relative w-24 h-24 mb-3">
                                          <Image
                                                src="https://res.cloudinary.com/dovw8fqpp/image/upload/f_auto,q_auto/v1749960714/book_thumbnails/npbrlisodwk4ej93arqc.jpg"
                                                alt="User Avatar"
                                                fill
                                                className="rounded-full object-cover border-3 border-white shadow-lg"
                                                priority
                                                sizes="64px"
                                          />
                                    </div>
                                    <h1 className="text-lg font-bold text-center mb-1 dark:text-white">{localUserInfo.user?.name}</h1>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                          {localUserInfo.user?.role}
                                    </span>
                              </div>

                              {/* Info Card - More compact */}
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-base font-semibold mb-3 dark:text-white flex items-center gap-2">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                          Thông tin cơ bản
                                    </h3>
                                    <div className="space-y-3">
                                          <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                      <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                      <p className="text-xs text-gray-300 dark:text-gray-400">Email</p>
                                                      <p className="text-sm font-medium dark:text-white truncate">{localUserInfo.user?.email}</p>
                                                </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                      <Phone size={14} className="text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                      <p className="text-xs text-gray-300 dark:text-gray-400">Điện thoại</p>
                                                      <p className="text-sm font-medium dark:text-white">{localUserInfo.user?.phone}</p>
                                                </div>
                                          </div>
                                          <div className="flex items-start gap-2">
                                                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                                      <MapPin size={14} className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                      <p className="text-xs text-gray-300 dark:text-gray-400">Địa chỉ</p>
                                                      <p className="text-sm font-medium dark:text-white leading-relaxed">{localUserInfo.user?.address}</p>
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
