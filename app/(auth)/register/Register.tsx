'use client'

import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";
import Banner from '@/app/public/banner-register.png';
import Image from "next/image";
import { registerAPI } from "@/app/lib/api/auth";
import OtpModal from "@/app/components/register/otp.modal";

const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [acceptTerms, setAcceptTerms] = useState(false);
      const [isModalOtpOpen, setIsModalOtpOpen] = useState(false);

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
            const passwordRegex = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{6,32}$/;
            if (!passwordRegex.test(password)) {
                  toast.error('Mật khẩu phải có ít nhất một chữ cái, một chữ số và có độ dài từ 6 đến 32 ký tự!');
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

                  const res = await registerAPI({ name, email, password, confirmPassword });
                  console.log('--> check res register: ', res);

                  if (res?.success === true) {
                        toast.success(res.message || "Đăng ký thành công!");
                        setIsModalOtpOpen(true);
                  } else {
                        toast.error(res?.message || "Đăng ký thất bại");
                  }
            } catch (error) {
                  console.log('--> check error: ', error);
                  toast.error('Đăng ký thất bại!');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="w-full h-screen flex">
                  {isModalOtpOpen && (
                        <OtpModal
                              isModalOtpOpen={isModalOtpOpen}
                              setIsModalOtpOpen={setIsModalOtpOpen}
                              email={email}
                              description={`Vui lòng nhập mã xác thực được gửi đến ${email}`}
                        />
                  )}

                  <div className="basis-3/6 bg-gradient-to-b from-pink-500 to-pink-300 flex flex-col items-center justify-center p-10 text-center">
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