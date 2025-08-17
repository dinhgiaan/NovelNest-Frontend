'use client'

import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import Link from 'next/link';
import toast from "react-hot-toast";
import { registerAPI } from "@/app/lib/api/auth";
import OtpModal from "@/app/components/register/otp.modal";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

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

      const handleRegister = async () => {
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
                                          InputProps={{ style: { borderRadius: 8, color: "black" } }}
                                    />
                                    <TextField
                                          label="Email"
                                          type="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full"
                                          size="small"
                                          InputProps={{ style: { borderRadius: 8, color: "black" } }}
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
                                                            {showPassword ? <Eye size={14} color="black" /> : <EyeOff size={14} color="black" />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8, color: "black" }
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
                                                            {showConfirmPassword ? <Eye size={14} color="black" /> : <EyeOff size={14} color="black" />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8, color: "black" }
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
                                                <Link href="/privacy" className="text-blue-500 hover:underline ml-1">Chính sách</Link> và
                                                <Link href="/terms" className="text-blue-500 hover:underline ml-1">Điều khoản</Link> của NovelNest
                                          </span>
                                    }
                              />

                              <div className="flex justify-center">
                                    <Button
                                          onClick={handleRegister}
                                          variant="contained"
                                          color="info"
                                          className="max-w-36 py-3"
                                          sx={{
                                                "&.Mui-disabled": {
                                                      backgroundColor: "#9ca3af",
                                                      color: "#ccc4c4",
                                                      opacity: 0.9,
                                                },
                                          }}
                                          disabled={loading || !acceptTerms}
                                          fullWidth
                                    >
                                          {loading
                                                ? <div className="w-full"><LinearProgress color="inherit" /></div>
                                                : "Tạo tài khoản"}
                                    </Button>
                              </div>

                              <p className="text-center text-sm text-gray-600">
                                    Bạn đã có tài khoản? <Link href={'/login'} className="text-blue-500 hover:underline">Đăng nhập</Link>
                              </p>
                        </div>
                  </div>
            </section>

      );
};

export default RegisterPage;
