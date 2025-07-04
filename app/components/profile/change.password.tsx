"use client"

import type React from "react"
import { useState } from "react"
import type { AuthContextType } from "@/app/context/auth.context"
import { changePasswordAPI } from "@/app/lib/api"
import { toast } from "react-hot-toast"
import { Eye, EyeOff, Key } from "lucide-react"

interface IProps {
      userInfo: AuthContextType
}

const ChangePassword = ({ userInfo }: IProps) => {
      const [formData, setFormData] = useState({
            password: "",
            newPassword: "",
            confirmNewPassword: "",
      })
      const [showPassword, setShowPassword] = useState({
            old: false,
            new: false,
            confirm: false,
      })
      const [isLoading, setIsLoading] = useState(false)

      const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
            setShowPassword((prev) => ({
                  ...prev,
                  [field]: !prev[field],
            }))
      }

      const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                  ...prev,
                  [field]: e.target.value,
            }))
      }

      const handleChangePassword = async () => {
            if (!userInfo.user?._id) {
                  toast.error("User ID not found")
                  return
            }

            setIsLoading(true)
            try {
                  const { password, newPassword, confirmNewPassword } = formData
                  const res = await changePasswordAPI({
                        _id: userInfo.user._id,
                        password,
                        newPassword,
                        confirmNewPassword,
                  })

                  if (res?.success === false) {
                        toast.error(res?.message)
                  } else {
                        setFormData({ password: "", newPassword: "", confirmNewPassword: "" })
                        toast.success("Thay đổi mật khẩu thành công")
                  }
            } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra khi đổi mật khẩu!")
                  console.error("Error changing password:", error)
            } finally {
                  setIsLoading(false)
            }
      }

      return (
            <div className="w-full max-w-2xl mx-auto">
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                    <Key size={20} className="text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-xl font-semibold dark:text-white">Đổi mật khẩu</h2>
                              </div>
                        </div>

                        <div className="p-6 space-y-4">
                              {/* Current Password */}
                              <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu hiện tại</label>
                                    <div className="relative">
                                          <input
                                                type={showPassword.old ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleInputChange("password")}
                                                placeholder="Nhập mật khẩu hiện tại"
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility("old")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                          >
                                                {showPassword.old ? <EyeOff size={16} /> : <Eye size={16} />}
                                          </button>
                                    </div>
                              </div>

                              {/* New Password */}
                              <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu mới</label>
                                    <div className="relative">
                                          <input
                                                type={showPassword.new ? "text" : "password"}
                                                value={formData.newPassword}
                                                onChange={handleInputChange("newPassword")}
                                                placeholder="Nhập mật khẩu mới"
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility("new")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                          >
                                                {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                          </button>
                                    </div>
                              </div>

                              {/* Confirm New Password */}
                              <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Xác nhận mật khẩu mới</label>
                                    <div className="relative">
                                          <input
                                                type={showPassword.confirm ? "text" : "password"}
                                                value={formData.confirmNewPassword}
                                                onChange={handleInputChange("confirmNewPassword")}
                                                placeholder="Xác nhận mật khẩu mới"
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility("confirm")}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                          >
                                                {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                          </button>
                                    </div>
                              </div>

                              <button
                                    onClick={handleChangePassword}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                              >
                                    {isLoading ? "Đang cập nhật..." : "Đổi mật khẩu"}
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default ChangePassword
