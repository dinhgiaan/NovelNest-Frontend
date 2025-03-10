'use client'

import { useContext, useState } from "react";
import { loginAPI } from "../../lib/api";
import toast from "react-hot-toast";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/auth.context";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const { userInfo, setUserInfo } = useContext(AuthContext);
      const [showPassword, setShowPassword] = useState(false);

      const navigate = useRouter();

      const handleClickShowPassword = () => setShowPassword((show) => !show);

      const handleLogin = async () => {
            try {
                  setLoading(true);

                  const res = await loginAPI({ email, password });
                  console.log('--> check res: ', res)
                  if (res?.success === true) {
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
                  } else {
                        toast.error(res.message)
                  }
                  setLoading(false);
            } catch (error) {
                  console.log('--> check error: ', error)
                  toast.error(error?.response?.data?.message);
            }
      }

      return (
            <div className="w-full h-screen flex">
                  <div className="basis-3/6 bg-gradient-to-b from-pink-500 to-pink-300 flex flex-col items-center justify-center p-10 text-center">
                        <h1 className='text-6xl font-extrabold text-white drop-shadow-md'>NovelNest</h1>
                        <p className='text-lg text-white mt-4'>Nơi khơi dậy niềm cảm hứng đọc sách</p>
                  </div>
                  <div className="basis-3/6 flex flex-col items-center justify-center p-10 bg-gray-100">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Đăng nhập</h2>
                        <div className='w-full max-w-sm space-y-6'>
                              <TextField
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                    InputProps={{
                                          style: { borderRadius: 8 }
                                    }}
                                    size="small"
                              />
                              <TextField
                                    label="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
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
                                          style: { borderRadius: 8 }
                                    }}
                              />

                              <Link href={'/'} className='block text-right text-sm text-blue-500 hover:underline'>
                                    Quên mật khẩu?
                              </Link>

                              <Button
                                    onClick={handleLogin}
                                    variant="contained"
                                    color="primary"
                                    className="w-full text-white py-3"
                                    style={{ borderRadius: 8 }}
                                    disabled={loading}
                              >
                                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                              </Button>
                        </div>

                        <span className="text-gray-500 my-6">Hoặc với</span>

                        <div className="flex gap-4">
                              <button
                                    onClick={() => signIn("google")}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700"
                              >
                                    <FaGoogle className="mr-2" /> Google
                              </button>
                              <button
                                    onClick={() => signIn("github")}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700"
                              >
                                    <FaGithub className="mr-2" /> GitHub
                              </button>
                        </div>

                        <p className="mt-6 text-sm text-gray-600">
                              Chưa có tài khoản? <Link href={'/register'} className="text-blue-500 hover:underline">Đăng ký</Link>
                        </p>
                  </div>
            </div>
      );
}

export default LoginPage;
