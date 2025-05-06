'use client'

import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";
import ConfirmAccount from "@/app/components/confirm.account";
import Banner from '@/app/public/banner-register.png';
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [acceptTerms, setAcceptTerms] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const router = useRouter();

      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

      const validateForm = () => {
            if (!name.trim()) {
                  toast.error('Vui lòng nhập họ và tên!');
                  return false;
            }

            if (!email.trim()) {
                  toast.error('Vui lòng nhập email!');
                  return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                  toast.error('Email không hợp lệ!');
                  return false;
            }

            if (password.length < 6) {
                  toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
                  return false;
            }

            if (password !== confirmPassword) {
                  toast.error('Mật khẩu xác nhận không khớp!');
                  return false;
            }

            if (!acceptTerms) {
                  toast.error('Bạn cần chấp nhận các điều khoản và chính sách!');
                  return false;
            }

            return true;
      };

      const handleRegister = async () => {
            if (!validateForm()) return;

            try {
                  setLoading(true);

                  // Simulate API call - replace with your actual registration API
                  await new Promise(resolve => setTimeout(resolve, 1500));

                  // Instead of redirecting right away, show the confirmation modal
                  setIsConfirmOpen(true);

                  // Reset form after successful registration
                  setLoading(false);
            } catch (error) {
                  console.log('--> check error: ', error);
                  toast.error('Đăng ký thất bại!');
                  setLoading(false);
            }
      };

      const handleConfirmClose = () => {
            setIsConfirmOpen(false);
            router.push('/login');
      };

      return (
            <div className="w-full h-screen flex">
                  {isConfirmOpen && (
                        <ConfirmAccount
                              isConfirmOpen={isConfirmOpen}
                              setIsConfirmOpen={handleConfirmClose}
                              email={email}
                        />
                  )}

                  <div className="basis-3/6 bg-gradient-to-b from-pink-500 to-pink-300 flex flex-col items-center justify-center p-10 text-center">
                        {/* <h1 className="text-xl font-extrabold text-white drop-shadow-md">+1000 cuốn sách</h1>
                        <p className="text-sm text-white mt-4">Có nhiều thể loại đa dạng cùng nhiều phương thức thanh toán khác nhau, tiện lợi cho độc giả</p> */}
                        <Image
                              src={Banner}
                              className="w-50 h-50"
                              about="banner"
                              alt="Banner"
                              priority
                        />
                  </div>

                  <div className="basis-3/6 flex flex-col items-center justify-center p-10 bg-gray-100">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Tạo tài khoản NovelNest</h2>
                        <div className='w-full max-w-xl space-y-6'>
                              <div className="flex gap-4">
                                    <TextField
                                          label="Họ và tên"
                                          variant="outlined"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          className="w-full"
                                          InputProps={{
                                                style: { borderRadius: 8 }
                                          }}
                                          size="small"
                                          required
                                    />
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
                                          required
                                          type="email"
                                    />
                              </div>

                              <TextField
                                    label="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
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
                                    size="small"
                                    required
                              />

                              <TextField
                                    label="Xác nhận mật khẩu"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full"
                                    InputProps={{
                                          endAdornment: (
                                                <InputAdornment position="end">
                                                      <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                                            {showConfirmPassword ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8 }
                                    }}
                                    size="small"
                                    required
                              />

                              <FormControlLabel
                                    control={
                                          <Checkbox
                                                checked={acceptTerms}
                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                                color="primary"
                                                size='small'
                                          />
                                    }
                                    label={
                                          <span className="text-xs text-black">Bằng cách đăng kí, tôi chấp nhận
                                                <Link href="/policy" className="text-blue-500 hover:underline">{" Chính sách bảo mật "}</Link> và
                                                <Link href="/policy" className="text-blue-500 hover:underline">{" Điều khoản sử dụng "}</Link> của NovelNest
                                          </span>}
                              />

                              <Button
                                    onClick={handleRegister}
                                    variant="contained"
                                    color="primary"
                                    className="w-full text-white py-3"
                                    style={{ borderRadius: 8 }}
                                    disabled={loading || !acceptTerms}
                                    fullWidth
                              >
                                    {loading ?
                                          <div className="w-2/3">
                                                <LinearProgress color="inherit" />
                                          </div>
                                          : "Tạo tài khoản"}
                              </Button>
                        </div>

                        <p className="mt-6 text-sm text-gray-600">
                              Bạn đã có tài khoản? <Link href={'/login'} className="text-blue-500 hover:underline">Đăng nhập</Link>
                        </p>
                  </div>
            </div>
      );
};

export default RegisterPage;