'use client'

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import image from '../../public/logo-dark.png';
import { Chrome, Github } from "lucide-react";
import { loginAPI } from "../../lib/api";
import toast from "react-hot-toast";
import { CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/auth.context";

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const { userInfo, setUserInfo } = useContext(AuthContext);

      const navigate = useRouter();

      const handleLogin = async () => {
            try {
                  setLoading(true);

                  const res = await loginAPI({ email, password });
                  console.log('--> check res login: ', res)
                  if (res) {
                        localStorage.setItem("access_token", res.access_token);
                        toast.success(`Chào mừng ${res.user?.name} trở lại NovelNest`, { className: 'text-xs' });

                        setUserInfo({
                              isAuthenticated: true,
                              user: {
                                    _id: res.user?._id,
                                    email: res.user?.email,
                                    name: res.user?.name,
                                    role: res.user?.role,
                                    phone: res.user?.phone,
                                    address: res.user?.address,
                                    avatar: res.user?.avatar,
                              }
                        });
                        navigate.push('/');
                  }
                  setLoading(false);
            } catch (error) {
                  console.log('--> check error: ', error)
                  toast.error(error?.response?.data?.message);
            }
      }

      // useEffect(() => {
      //       console.log('--> check info after update: ', userInfo);
      // }, [userInfo]);

      return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                  <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-500 to-cyan-400 p-8 flex-col justify-between relative">
                              <div className="relative z-10">
                                    <div className="mb-8">
                                          <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-6">
                                                <Image src={image} alt="Logo" width={75} height={55} />
                                          </div>
                                          <h1 className="text-xl font-bold text-white mb-3">NovelNest</h1>
                                          <p className="text-blue-50 text-sm leading-relaxed">
                                                Khám phá tri thức mới mỗi ngày cùng NovelNest
                                          </p>
                                    </div>
                              </div>

                              <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
                                    <div className="w-48 h-48 rounded-full bg-blue-400/20 backdrop-blur-3xl"></div>
                              </div>
                        </div>

                        <div className="w-full lg:w-3/5 p-6">
                              <div className="max-w-sm mx-auto">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Chào mừng trở lại!</h2>
                                    <p className="text-gray-600 text-sm mb-6">Đăng nhập để tiếp tục</p>

                                    <div className="space-y-4">
                                          <TextField
                                                fullWidth
                                                label="Email"
                                                variant="outlined"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                size="small"
                                          />

                                          <TextField
                                                fullWidth
                                                label="Mật khẩu"
                                                variant="outlined"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••"
                                                size="small"
                                          />

                                          <div className="flex justify-end">
                                                <Link
                                                      rel="preload"
                                                      as={"document"}
                                                      href="/auth/forgot"
                                                      className="text-xs font-medium text-blue-600 hover:text-blue-500"
                                                >
                                                      Quên mật khẩu?
                                                </Link>
                                          </div>

                                          <button
                                                onClick={handleLogin}
                                                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                disabled={loading === true}
                                          >
                                                {loading ? <CircularProgress color="secondary" size={16} /> : "Đăng nhập"}
                                          </button>

                                          {/* Rest of the component remains the same */}
                                          <div className="relative my-6">
                                                <div className="absolute inset-0 flex items-center">
                                                      <div className="w-full border-t border-gray-200"></div>
                                                </div>
                                                <div className="relative flex justify-center text-xs">
                                                      <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-2 gap-3">
                                                <button
                                                      onClick={() => signIn("google")}
                                                      className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                      <Chrome className="mr-2 h-4 w-4" />
                                                      Google
                                                </button>
                                                <button
                                                      onClick={() => signIn("github")}
                                                      className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                      <Github className="mr-2 h-4 w-4" />
                                                      GitHub
                                                </button>
                                          </div>

                                          <p className="mt-6 text-center text-xs text-gray-600">
                                                Chưa có tài khoản?{' '}
                                                <Link
                                                      rel="preload"
                                                      as={""}
                                                      href="/auth/register"
                                                      className="font-medium text-blue-600 hover:text-blue-500"
                                                >
                                                      Đăng ký ngay
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default LoginPage;
