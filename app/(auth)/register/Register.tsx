'use client'

import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";
import { registerAPI } from "@/app/lib/api/auth";
import OtpModal from "@/app/components/register/otp.modal";
import { AxiosError } from "axios";
import EmblaCarousel from "@/app/components/embla.carousel";

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

      const carouselItems = [
            {
                  imageUrl: "/assets/librarybooks_slider_register.webp",
            },
            {
                  imageUrl: "/assets/readbook_slider_register.webp",
            },
            {
                  imageUrl: "/assets/pex_slider_register.webp",
            },
      ];

      const validateForm = () => {
            if (!name.trim()) return toast.error("Vui lòng nhập họ và tên!");
            if (!email.trim()) return toast.error("Vui lòng nhập email!");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return toast.error("Email không hợp lệ!");
            const passwordRegex = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{6,32}$/;
            if (!passwordRegex.test(password)) {
                  return toast.error("Mật khẩu phải có ít nhất một chữ cái, một chữ số và dài 6–32 ký tự!");
            }
            if (password !== confirmPassword) return toast.error("Mật khẩu xác nhận không khớp!");
            if (!acceptTerms) return toast.error("Bạn cần chấp nhận các điều khoản và chính sách!");
            return true;
      };

      const handleRegister = async () => {
            if (!validateForm()) return;
            try {
                  setLoading(true);
                  const res = await registerAPI({ name, email, password, confirmPassword });
                  if (res?.success === true) {
                        toast.success(res.message || "Đăng ký thành công!");
                        setIsModalOtpOpen(true);
                  } else {
                        toast.error(res?.message || "Đăng ký thất bại");
                  }
            } catch (error) {
                  const errorMessage = (error as AxiosError<{ message?: string }>)?.response?.data?.message
                        || (error as Error).message
                        || "Đăng ký thất bại!";
                  toast.error(errorMessage);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <section className="bg-bannerRegister bg-cover bg-center bg-no-repeat w-full h-screen flex">
                  {isModalOtpOpen && (
                        <OtpModal
                              isModalOtpOpen={isModalOtpOpen}
                              setIsModalOtpOpen={setIsModalOtpOpen}
                              email={email}
                              description={`Vui lòng nhập mã xác thực được gửi đến ${email}`}
                        />
                  )}
                  <div className="w-1/2 hidden lg:flex items-center justify-center px-8">
                        <div className="w-full max-w-lg">
                              <EmblaCarousel items={carouselItems} showButtons={false} disableShadow={true} hideText={true} autoplayInterval={2500} showDots aspectRatioClass="h-[80vh]" />
                        </div>
                  </div>


                  <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
                        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg space-y-6">
                              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">Tạo tài khoản</h2>

                              <div className="flex flex-col sm:flex-row gap-4">
                                    <TextField
                                          label="Họ và tên"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          className="w-full"
                                          size="small"
                                          InputProps={{ style: { borderRadius: 8 } }}
                                    />
                                    <TextField
                                          label="Email"
                                          type="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full"
                                          size="small"
                                          InputProps={{ style: { borderRadius: 8 } }}
                                    />
                              </div>

                              <TextField
                                    label="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full"
                                    size="small"
                                    InputProps={{
                                          endAdornment: (
                                                <InputAdornment position="end">
                                                      <IconButton onClick={handleClickShowPassword}>
                                                            {showPassword ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8 }
                                    }}
                              />

                              <TextField
                                    label="Xác nhận mật khẩu"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full"
                                    size="small"
                                    InputProps={{
                                          endAdornment: (
                                                <InputAdornment position="end">
                                                      <IconButton onClick={handleClickShowConfirmPassword}>
                                                            {showConfirmPassword ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8 }
                                    }}
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
                                          <span className="text-xs text-black">
                                                Bằng cách đăng ký, tôi chấp nhận
                                                <Link href="/policy" className="text-blue-500 hover:underline ml-1">Chính sách</Link> và
                                                <Link href="/policy" className="text-blue-500 hover:underline ml-1">Điều khoản</Link> của NovelNest
                                          </span>
                                    }
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
                                    {loading
                                          ? <div className="w-full"><LinearProgress color="inherit" /></div>
                                          : "Tạo tài khoản"}
                              </Button>

                              <p className="text-center text-sm text-gray-600">
                                    Bạn đã có tài khoản? <Link href={'/login'} className="text-blue-500 hover:underline">Đăng nhập</Link>
                              </p>
                        </div>
                  </div>
            </section>

      );
};

export default RegisterPage;
