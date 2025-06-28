"use client"

import { useContext, useState, useEffect } from "react"
import { loginAPI } from "../../lib/api"
import toast from "react-hot-toast"
import { Button, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { AuthContext } from "../../context/auth.context"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { AxiosError } from "axios"

const LoginPage = () => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const { setUserInfo } = useContext(AuthContext)
      const [showPassword, setShowPassword] = useState(false)
      const { data: session, status } = useSession()

      const navigate = useRouter()

      useEffect(() => {
            if (status === "authenticated" && session?.user?.userData) {
                  setUserInfo({
                        isAuthenticated: true,
                        user: {
                              _id: session.user.userData._id,
                              email: session.user.userData.email,
                              name: session.user.userData.name,
                              role: session.user.userData.role
                        },
                  })

                  if (session.user.customAccessToken) {
                        localStorage.setItem("access_token", session.user.customAccessToken)
                  }

                  if (session.user.message) {
                        toast.success(session.user.message)
                  }

                  navigate.push("/")
            }
      }, [session, status, setUserInfo, navigate])

      const handleClickShowPassword = () => setShowPassword((show) => !show)

      const handleLogin = async () => {
            try {
                  setLoading(true)
                  const res = await loginAPI({ email, password })
                  if (res?.data?.success === true) {
                        localStorage.setItem("access_token", res?.data?.access_token)
                        toast.success(`Chào mừng ${res?.data?.user?.name} trở lại NovelNest`, { className: "text-xs" })

                        setUserInfo({
                              isAuthenticated: true,
                              user: {
                                    _id: res?.data?.user?._id,
                                    email: res?.data?.user?.email,
                                    name: res?.data?.user?.name,
                                    role: res?.data?.user?.role,
                                    phone: res?.data?.user?.phone,
                                    address: res?.data?.user?.address,
                                    avatar: res?.data?.user?.avatar,
                              },
                        })
                        navigate.push("/")
                  } else {
                        toast.error(res?.data?.message)
                  }
                  setLoading(false)
            } catch (error) {
                  toast.error(error?.response?.data?.message || "Đăng nhập thất bại!")
                  setLoading(false)
            }
      }

      const handleSocialAuth = async (provider: string) => {
            try {
                  const result = await signIn(provider, {
                        redirect: false,
                        callbackUrl: "/",
                  })

                  if (result?.error) {
                        toast.error("Đăng nhập thất bại!")
                  }
            } catch (error) {
                  console.error('Registration error:', error);
                  const errorMessage = (error as AxiosError<{ message?: string }>).response?.data?.message ||
                        (error as Error).message ||
                        'Đăng ký thất bại!';
                  toast.error(errorMessage);
            }
      }

      return (
            <div className="min-h-screen w-full flex flex-col lg:flex-row">
                  {/* Left: Branding */}
                  <div className="lg:basis-1/2 w-full bg-gradient-to-b from-blue-500 to-blue-300 flex flex-col items-center justify-center px-6 py-12 sm:p-12 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md">NovelNest</h1>
                        <p className="text-base sm:text-lg text-white mt-4">Nơi khơi dậy niềm cảm hứng đọc sách</p>
                  </div>

                  {/* Right: Login Form */}
                  <div className="lg:basis-1/2 w-full bg-gray-100 flex flex-col items-center justify-center px-6 py-10 sm:py-14">
                        <div className="w-full max-w-sm">
                              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">Đăng nhập</h2>

                              <div className="space-y-5">
                                    <TextField
                                          label="Email"
                                          variant="outlined"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full"
                                          InputProps={{ style: { borderRadius: 8 } }}
                                          size="small"
                                    />
                                    <TextField
                                          label="Mật khẩu"
                                          type={showPassword ? "text" : "password"}
                                          variant="outlined"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          className="w-full"
                                          size="small"
                                          InputProps={{
                                                endAdornment: (
                                                      <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                                  {showPassword ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                                                            </IconButton>
                                                      </InputAdornment>
                                                ),
                                                style: { borderRadius: 8 },
                                          }}
                                    />

                                    <div className="text-right">
                                          <Link href="/" className="text-sm text-blue-500 hover:underline">
                                                Quên mật khẩu?
                                          </Link>
                                    </div>

                                    <Button
                                          onClick={handleLogin}
                                          variant="contained"
                                          color="primary"
                                          className="w-full text-white py-3 text-sm sm:text-base"
                                          style={{ borderRadius: 8 }}
                                          disabled={loading}
                                    >
                                          {loading ? <CircularProgress size={24.5} /> : "Đăng nhập"}
                                    </Button>
                              </div>

                              {/* Divider */}
                              <div className="my-6 text-center text-sm text-gray-500">Hoặc đăng nhập bằng</div>

                              {/* Social Login */}
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                          onClick={() => handleSocialAuth("google")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm"
                                          disabled={status === "loading"}
                                    >
                                          <FcGoogle className="mr-2" /> Google
                                    </button>
                                    <button
                                          onClick={() => handleSocialAuth("github")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm"
                                          disabled={status === "loading"}
                                    >
                                          <FaGithub className="mr-2" /> GitHub
                                    </button>
                              </div>

                              {/* Register Link */}
                              <p className="mt-8 text-sm text-gray-600 text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/register" className="text-blue-500 hover:underline">
                                          Đăng ký
                                    </Link>
                              </p>
                        </div>
                  </div>
            </div>
      )
}

export default LoginPage
