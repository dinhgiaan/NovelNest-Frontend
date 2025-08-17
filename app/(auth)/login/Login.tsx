"use client"

import { useContext, useState, useEffect } from "react"
import { loginAPI } from "../../lib/api/auth";
import toast from "react-hot-toast"
import { Button, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { AuthContext } from "../../context/auth.context"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import axios, { AxiosError } from "axios"
import { Eye, EyeOff, Github, MoveLeft } from "lucide-react";
import Google from "./components/svg/google.svg";
import ButtonBack from "@/app/components/ui/button.back";

const setStoredData = (key: string, value: string): void => {
      if (typeof window === 'undefined') return;
      try {
            localStorage.setItem(key, value);
      } catch (error) {
            console.error(`Error setting ${key} to localStorage:`, error);
      }
};

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
                  const userInfo = {
                        isAuthenticated: true,
                        user: {
                              _id: session.user.userData._id,
                              email: session.user.userData.email,
                              name: session.user.userData.name,
                              role: session.user.userData.role,
                              loginMethod: session.user.userData.loginMethod || "Social"
                        },
                  }

                  setUserInfo(userInfo)

                  if (session.user.customAccessToken) {
                        setStoredData("access_token", session.user.customAccessToken)
                  }

                  setStoredData("user_info", JSON.stringify(userInfo))

                  if (session.user.message) {
                        toast.success(session.user.message)
                  }

                  navigate.push("/")
            }
      }, [session, status, setUserInfo, navigate])

      const handleClickShowPassword = () => setShowPassword((show) => !show)

      const handleLogin = async () => {
            try {
                  setLoading(true);

                  const res = await loginAPI({ email, password });

                  if (res?.success === true) {
                        if (!res.access_token || !res.refresh_token || !res.user) {
                              toast.error("Phản hồi đăng nhập không đầy đủ!");
                              return;
                        }
                        setStoredData("access_token", res.access_token);
                        setStoredData("refresh_token", res.refresh_token);

                        const userInfo = {
                              isAuthenticated: true,
                              user: {
                                    _id: res.user._id,
                                    email: res.user.email,
                                    name: res.user.name,
                                    role: res.user.role,
                                    loginMethod: res.user.loginMethod || "Email"
                              },
                        };

                        setUserInfo(userInfo);

                        setStoredData("user_info", JSON.stringify(userInfo));

                        toast.success(`Chào mừng ${res.user.name} đã đăng nhập vào NovelNest`, {
                              className: "text-xs"
                        });

                        setTimeout(() => {
                              navigate.push("/");
                        }, 100);

                  } else {
                        toast.error(res?.message || "Đăng nhập thất bại!");
                  }
            } catch (error) {
                  if (axios.isAxiosError(error)) {
                        const serverMessage = error.response?.data?.message;
                        toast.error(serverMessage || "Đăng nhập thất bại!");
                  } else {
                        toast.error("Có lỗi không xác định xảy ra!");
                  }
            } finally {
                  setLoading(false);
            }
      };

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
            <section className="bg-bannerLogin bg-repeat bg-cover bg-bottom w-full h-screen relative overflow-hidden">

                  <ButtonBack className="absolute top-3 left-2 flex items-center space-x-1 text-[#675d5d] hover:text-white">
                        <MoveLeft className="sm:size-5" />
                        <span>Quay lại</span>
                  </ButtonBack>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center px-4">
                        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-lg shadow-xl px-10 py-10 sm:py-14">
                              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-8">
                                    Đăng nhập
                              </h2>

                              <div className="space-y-5">
                                    <TextField
                                          label="Email"
                                          variant="outlined"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full"
                                          InputProps={{ style: { borderRadius: 4, color: "black" } }}
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
                                                                  {showPassword ? (
                                                                        <Eye size={14} color="black" />
                                                                  ) : (
                                                                        <EyeOff size={14} color="black" />
                                                                  )}
                                                            </IconButton>
                                                      </InputAdornment>
                                                ),
                                                style: { borderRadius: 4, color: "black" },
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

                              <div className="my-6 text-center text-sm text-gray-500">
                                    Hoặc đăng nhập bằng
                              </div>

                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                          onClick={() => handleSocialAuth("google")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm transition-colors"
                                          disabled={status === "loading"}
                                    >
                                          <Google className="mr-2" /> Google
                                    </button>

                                    <button
                                          onClick={() => handleSocialAuth("github")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm transition-colors"
                                          disabled={status === "loading"}
                                    >
                                          <Github size={20} className="mr-2" /> GitHub
                                    </button>
                              </div>

                              <p className="mt-8 text-sm text-gray-600 text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/register" className="text-blue-500 hover:underline">
                                          Đăng ký ngay
                                    </Link>
                              </p>
                        </div>
                  </div>
            </section>
      );

}

export default LoginPage;
