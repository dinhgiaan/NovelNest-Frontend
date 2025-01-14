'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import image from '../../public/logo-dark.png';
import { Checkbox, TextField } from "@mui/material";
import { Chrome, Github } from "lucide-react";

const RegisterPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [fullName, setFullName] = useState("");
      const [phone, setPhone] = useState("");

      return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                  <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="w-full lg:w-3/5 p-6">
                              <div className="max-w-sm mx-auto">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h2>
                                    <p className="text-gray-600 text-sm mb-4">Bắt đầu hành trình đọc sách của bạn</p>

                                    <div className="space-y-3">
                                          <div className="grid grid-cols-2 gap-2">
                                                <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                      <Chrome className="mr-2 h-4 w-4" />
                                                      Google
                                                </button>
                                                <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                      <Github className="mr-2 h-4 w-4" />
                                                      GitHub
                                                </button>
                                          </div>

                                          <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                      <div className="w-full border-t border-gray-200"></div>
                                                </div>
                                                <div className="relative flex justify-center text-xs">
                                                      <span className="px-2 bg-white text-gray-500">Hoặc đăng ký với email</span>
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-2 gap-2">
                                                <TextField
                                                      fullWidth
                                                      label="Họ và tên"
                                                      variant="outlined"
                                                      size="small"
                                                      value={fullName}
                                                      onChange={(e) => setFullName(e.target.value)}
                                                      placeholder="Đinh Gia Ân"
                                                />
                                                <TextField
                                                      fullWidth
                                                      label="Số điện thoại"
                                                      variant="outlined"
                                                      size="small"
                                                      type="tel"
                                                      value={phone}
                                                      onChange={(e) => setPhone(e.target.value)}
                                                      placeholder="0856562424"
                                                />
                                          </div>

                                          <TextField
                                                fullWidth
                                                label="Email"
                                                variant="outlined"
                                                size="small"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                          />

                                          <TextField
                                                fullWidth
                                                label="Mật khẩu"
                                                variant="outlined"
                                                size="small"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                          />

                                          <div>
                                                <Checkbox defaultChecked size="small" required={true} />
                                                <span className="text-[11.5px]">
                                                      Tôi đã đọc và đồng ý với{' '}
                                                      <Link rel="preload"
                                                            as={""}
                                                            href={'/policy'} className="text-[#3954ed] underline mr-1">
                                                            Chính sách
                                                      </Link>
                                                      và{' '}
                                                      <Link rel="preload"
                                                            as={""}
                                                            href={'/privacy'} className="text-[#3954ed] underline">
                                                            Quyền bảo mật riêng tư
                                                      </Link>
                                                </span>
                                          </div>

                                          <button
                                                onClick={() => console.log({ email, password, fullName, phone })}
                                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                          >
                                                Tạo tài khoản
                                          </button>

                                          <p className="text-center text-xs text-gray-600">
                                                Đã có tài khoản?{' '}
                                                <Link rel="preload"
                                                      as={""}
                                                      href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                                                      Đăng nhập
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>

                        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-400 p-6 flex-col justify-between relative">
                              <div className="relative z-10">
                                    <div className="mb-6">
                                          <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-4">
                                                <Image src={image} alt="Logo" width={75} height={55} />
                                          </div>
                                          <h1 className="text-xl font-bold text-white mb-2">NovelNest</h1>
                                          <p className="text-emerald-50 text-xs leading-relaxed">
                                                Khám phá kho tàng sách phong phú và đa dạng
                                          </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2">
                                                <p className="text-white text-sm font-medium">1000+</p>
                                                <p className="text-emerald-50 text-xs">Đầu sách</p>
                                          </div>
                                          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2">
                                                <p className="text-white text-sm font-medium">24/7</p>
                                                <p className="text-emerald-50 text-xs">Hỗ trợ</p>
                                          </div>
                                    </div>
                              </div>

                              <div className="absolute -bottom-16 -right-16">
                                    <div className="w-32 h-32 rounded-full bg-emerald-400/20 backdrop-blur-3xl"></div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default RegisterPage;