'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import image from '../../public/logo.png';

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                  <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Left Panel */}
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

                              {/* Decorative Elements */}
                              <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
                                    <div className="w-48 h-48 rounded-full bg-blue-400/20 backdrop-blur-3xl"></div>
                              </div>
                        </div>

                        {/* Right Panel */}
                        <div className="w-full lg:w-3/5 p-6">
                              <div className="max-w-sm mx-auto">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Chào mừng trở lại!</h2>
                                    <p className="text-gray-600 text-sm mb-6">Đăng nhập để tiếp tục</p>

                                    <div className="space-y-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Email
                                                </label>
                                                <input
                                                      type="email"
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                      placeholder="your@email.com"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Mật khẩu
                                                </label>
                                                <input
                                                      type="password"
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                      className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                      placeholder="••••••••••"
                                                />
                                          </div>

                                          <div className="flex justify-end">
                                                <Link
                                                      href="/auth/forgot"
                                                      className="text-xs font-medium text-blue-600 hover:text-blue-500"
                                                >
                                                      Quên mật khẩu?
                                                </Link>
                                          </div>

                                          <button
                                                onClick={() => console.log({ email, password })}
                                                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          >
                                                Đăng nhập
                                          </button>

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
                                                      <FcGoogle className="mr-2 h-4 w-4" />
                                                      Google
                                                </button>
                                                <button
                                                      onClick={() => signIn("github")}
                                                      className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                      <FaGithub className="mr-2 h-4 w-4" />
                                                      GitHub
                                                </button>
                                          </div>

                                          <p className="mt-6 text-center text-xs text-gray-600">
                                                Chưa có tài khoản?{' '}
                                                <Link
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