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
import axios, { AxiosError } from "axios"
import book1_abstract from '@/public/assets/book1_abstract.webp';
import colorful1_abstract from '@/public/assets/colorful1_abstract.webp';
import human_abstract from '@/public/assets/human_abstract.webp';
import ufo_abstract from '@/public/assets/ufo_abstract.webp';
import Image from "next/image"

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
                  setLoading(true);
                  console.log('Starting login process...');

                  const res = await loginAPI({ email, password });
                  console.log('Login API response:', res);

                  if (res?.success === true) {
                        console.log('Login successful, processing response...');

                        // Kiểm tra response có đầy đủ thông tin không
                        if (!res.access_token || !res.refresh_token || !res.user) {
                              console.error('Incomplete login response:', res);
                              toast.error("Phản hồi đăng nhập không đầy đủ!");
                              return;
                        }

                        // Lưu tokens TRƯỚC
                        localStorage.setItem("access_token", res.access_token);
                        localStorage.setItem("refresh_token", res.refresh_token);
                        console.log('Tokens saved to localStorage');

                        // Tạo user info object
                        const userInfo = {
                              isAuthenticated: true,
                              user: {
                                    _id: res.user._id,
                                    email: res.user.email,
                                    name: res.user.name,
                                    role: res.user.role,
                              },
                        };

                        // Cập nhật context
                        setUserInfo(userInfo);

                        // Lưu user info
                        localStorage.setItem("user_info", JSON.stringify(userInfo));
                        console.log('User info saved to localStorage and context updated');

                        toast.success(`Chào mừng ${res.user.name} trở lại NovelNest`, {
                              className: "text-xs"
                        });

                        console.log('About to navigate to home page...');

                        // Delay nhỏ để đảm bảo state được cập nhật
                        setTimeout(() => {
                              navigate.push("/");
                        }, 100);

                  } else {
                        console.log('Login failed:', res?.message);
                        toast.error(res?.message || "Đăng nhập thất bại!");
                  }
            } catch (error) {
                  console.error('Login error:', error);

                  if (axios.isAxiosError(error)) {
                        const serverMessage = error.response?.data?.message;
                        console.error('Server error:', serverMessage);
                        toast.error(serverMessage || "Đăng nhập thất bại!");
                  } else {
                        console.error('Unknown error:', error);
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
                  <div className="absolute inset-0">
                        <Image
                              src={human_abstract}
                              alt="Abstract Human"
                              className="absolute top-5 -left-3 w-[200px] h-auto object-contain z-10 opacity-80 hidden sm:block"
                        />

                        <Image
                              src={colorful1_abstract}
                              alt="Colorful Abstract 1"
                              className="absolute bottom-8 left-60 w-[120px] h-auto object-contain z-15 opacity-75 hidden sm:block"
                        />

                        <Image
                              src={book1_abstract}
                              alt="Book Abstract"
                              className="absolute top-60 right-4 -translate-y-1/2 w-[150px] h-auto object-contain z-25 rotate-12 hidden sm:block"
                        />

                        <Image
                              src={ufo_abstract}
                              alt="UFO Abstract"
                              className="absolute bottom-5 right-32 w-[150px] h-auto object-contain z-30 opacity-85 hidden sm:block"
                        />
                  </div>

                  <div className="relative z-40 w-full h-full flex items-center justify-center p-4">
                        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-lg shadow-xl px-10 py-10 sm:py-14">
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

                              <div className="my-6 text-center text-sm text-gray-300">Hoặc đăng nhập bằng</div>

                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                          onClick={() => handleSocialAuth("google")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm transition-colors"
                                          disabled={status === "loading"}
                                    >
                                          <FcGoogle className="mr-2" /> Google
                                    </button>

                                    <button
                                          onClick={() => handleSocialAuth("github")}
                                          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 w-full text-sm transition-colors"
                                          disabled={status === "loading"}
                                    >
                                          <FaGithub className="mr-2" /> GitHub
                                    </button>
                              </div>

                              <p className="mt-8 text-sm text-gray-600 text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/register" className="text-blue-500 hover:underline">
                                          Đăng ký
                                    </Link>
                              </p>
                        </div>
                  </div>
            </section>
      )
}

export default LoginPage
