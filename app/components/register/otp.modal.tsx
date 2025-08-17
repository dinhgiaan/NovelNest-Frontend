"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { resendOtpAPI, verifyAPI } from "@/app/lib/api/auth"
import toast from "react-hot-toast"

interface OtpModalProps {
      isModalOtpOpen: boolean
      setIsModalOtpOpen: (value: boolean) => void
      title?: string
      description?: string
      length?: number
      email: string
      onResend?: () => Promise<void>
}

const OtpModal = ({
      isModalOtpOpen,
      setIsModalOtpOpen,
      title = "Xác thực OTP",
      description = "Nhập mã xác thực đã được gửi đến email của bạn",
      length = 6,
      email
}: OtpModalProps) => {
      const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
      const [isLoading, setIsLoading] = useState(false)
      const [isResending, setIsResending] = useState(false)
      const [error, setError] = useState("")
      const [timer, setTimer] = useState(0)
      const inputRefs = useRef<(HTMLInputElement | null)[]>([])
      const router = useRouter()

      useEffect(() => {
            let interval: NodeJS.Timeout
            if (timer > 0) {
                  interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
            }
            return () => clearInterval(interval)
      }, [timer])

      useEffect(() => {
            if (isModalOtpOpen) {
                  setOtp(Array(length).fill(""))
                  setError("")
                  setTimer(90)
                  setTimeout(() => inputRefs.current[0]?.focus(), 100)
            }
      }, [isModalOtpOpen, length])

      const handleChange = (index: number, value: string) => {
            if (!/^\d$/.test(value) && value !== "") return
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            setError("")

            if (value && index < length - 1) {
                  inputRefs.current[index + 1]?.focus()
            }

            if (value && index === length - 1 && newOtp.every((v) => v !== "")) {
                  setTimeout(() => handleSubmit(newOtp.join("")), 100)
            }
      }

      const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
            if (e.key === "Backspace") {
                  const newOtp = [...otp]
                  if (otp[index]) {
                        newOtp[index] = ""
                  } else if (index > 0) {
                        newOtp[index - 1] = ""
                        inputRefs.current[index - 1]?.focus()
                  }
                  setOtp(newOtp)
            }
      }

      const handleSubmit = async (otpValue?: string) => {
            const finalOtp = otpValue || otp.join("")
            if (finalOtp.length !== length) {
                  setError("Vui lòng nhập đầy đủ mã OTP")
                  return
            }

            setIsLoading(true)
            setError("")

            try {
                  const res = await verifyAPI({ otp: { code: finalOtp } })
                  if (res.success) {
                        toast.success("Xác thực thành công")
                        setIsModalOtpOpen(false)
                        router.push("/login")
                  } else {
                        throw new Error()
                  }
            } catch {
                  setError("Mã OTP không chính xác")
                  setOtp(Array(length).fill(""))
                  setTimeout(() => inputRefs.current[0]?.focus(), 100)
            } finally {
                  setIsLoading(false)
            }
      }

      const handleResend = async () => {
            if (timer > 0 || isResending) return
            setIsResending(true)
            setError("")

            try {
                  const res = await resendOtpAPI({ email });

                  if (res?.data?.success) {
                        toast.success(res.data.message);
                        setTimer(90);
                        setOtp(Array(length).fill(""));
                        setTimeout(() => inputRefs.current[0]?.focus(), 100);
                  } else {
                        toast.error(res.data.message);
                  }
            } catch (err) {
                  const error = err as Error;
                  const msg = error?.message || "Đã có lỗi xảy ra khi gửi lại mã OTP.";
                  toast.error(msg);
            }
      }

      const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60)
            const secs = seconds % 60
            return `${mins}:${secs.toString().padStart(2, "0")}`
      }

      const isComplete = otp.every((v) => v !== "")

      if (!isModalOtpOpen) return null

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden">
                        <div className="p-4 sm:p-6">
                              <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                          </svg>
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{title}</h2>
                                    <p className="text-sm text-gray-600">{description}</p>
                                    <p className="text-sm font-medium text-gray-800 mt-1 break-words">{email}</p>
                              </div>

                              <div className="flex justify-center gap-2 mb-4">
                                    {otp.map((val, i) => (
                                          <input
                                                key={i}
                                                ref={(el) => { inputRefs.current[i] = el }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={val}
                                                onChange={(e) => handleChange(i, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                disabled={isLoading}
                                                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
                                          />
                                    ))}
                              </div>

                              {error && (
                                    <div className="mb-4">
                                          <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg text-center">{error}</p>
                                    </div>
                              )}

                              <button
                                    onClick={() => handleSubmit()}
                                    disabled={!isComplete || isLoading}
                                    className="w-full h-12 sm:h-11 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-4 flex items-center justify-center gap-2"
                              >
                                    {isLoading ? (
                                          <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Đang xác thực...
                                          </>
                                    ) : (
                                          "Xác thực"
                                    )}
                              </button>

                              <div className="text-center mb-4">
                                    {timer > 0 ? (
                                          <p className="text-sm text-gray-600">
                                                Gửi lại mã sau{" "}
                                                <span className="font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                      {formatTime(timer)}
                                                </span>
                                          </p>
                                    ) : (
                                          <button
                                                onClick={handleResend}
                                                disabled={isResending}
                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed hover:underline"
                                          >
                                                {isResending ? "Đang gửi..." : "Gửi lại mã OTP"}
                                          </button>
                                    )}
                              </div>

                              <div className="text-center pt-4 border-t border-gray-100">
                                    <button
                                          onClick={() => setIsModalOtpOpen(false)}
                                          disabled={isLoading}
                                          className="text-sm text-gray-300 hover:text-gray-700 disabled:text-gray-400"
                                    >
                                          Hủy bỏ
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default OtpModal;
