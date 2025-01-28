'use client'

import { useState } from "react";
import { Button, TextField, IconButton, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from "react-hot-toast";

const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [acceptTerms, setAcceptTerms] = useState(false); // Thêm trạng thái để kiểm tra checkbox

      const navigate = useRouter();

      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

      const handleRegister = async () => {
            if (!acceptTerms) {
                  toast.error('Bạn cần chấp nhận các điều khoản và chính sách!');
                  return;
            }

            try {
                  setLoading(true);

                  toast.success('Đăng ký thành công!');

                  setLoading(false);
                  navigate.push('/login');
            } catch (error) {
                  console.log('--> check error: ', error)
                  toast.error('Đăng ký thất bại!');
            }
      }

      return (
            <div className="w-full h-screen flex">
                  <div className="basis-3/6 bg-gradient-to-b from-pink-500 to-pink-300 flex flex-col items-center justify-center p-10 text-center">
                        <h1 className="text-xl font-extrabold text-white drop-shadow-md">+1000 cuốn sách</h1>
                        <p className="text-sm text-white mt-4">Có nhiều thể loại đa dạng cùng nhiều phương thức thanh toán khác nhau, tiện lợi cho độc giả</p>
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
                                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8 }
                                    }}
                                    size="small"
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
                                                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                                      </IconButton>
                                                </InputAdornment>
                                          ),
                                          style: { borderRadius: 8 }
                                    }}
                                    size="small"
                              />

                              <FormControlLabel
                                    control={
                                          <Checkbox
                                                checked={acceptTerms}
                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                                color="primary"
                                                size=''
                                          />
                                    }
                                    label={<span className="text-xs text-black">Bằng cách đăng kí, tôi chấp nhận <Link href="/terms" className="text-blue-500 hover:underline">Chính sách bảo mật</Link> và <Link href="/terms" className="text-blue-500 hover:underline">Thỏa thuận sử dụng</Link> của NovelNest</span>}
                              />

                              <Button
                                    onClick={handleRegister}
                                    variant="contained"
                                    color="primary"
                                    className="w-full text-white py-3"
                                    style={{ borderRadius: 8 }}
                                    disabled={loading || !acceptTerms} // Disable nút nếu checkbox chưa được tick
                              >
                                    {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                              </Button>
                        </div>

                        <p className="mt-6 text-sm text-gray-600">
                              Đã có tài khoản? <Link href={'/login'} className="text-blue-500 hover:underline">Đăng nhập</Link>
                        </p>
                  </div>
            </div>
      );
}

export default RegisterPage;
