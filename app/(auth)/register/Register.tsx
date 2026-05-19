"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerAPI } from "@/app/lib/api/auth";
import OtpModal from "@/app/components/register/otp.modal";
import { AxiosError } from "axios";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";

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

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await registerAPI({ name, email, password, confirmPassword });
      if (res?.success === true) {
        toast.success(
          res.message || "Đăng ký thành công! Vui lòng xác thực OTP.",
        );
        setIsModalOtpOpen(true);
      } else {
        toast.error(res?.message || "Đăng ký thất bại");
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (error as Error).message ||
        "Đăng ký thất bại!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex bg-white selection:bg-zinc-200 selection:text-black">
      {isModalOtpOpen && (
        <OtpModal
          isModalOtpOpen={isModalOtpOpen}
          setIsModalOtpOpen={setIsModalOtpOpen}
          email={email}
          password={password}
          description={`Vui lòng nhập mã xác thực được gửi đến ${email}`}
        />
      )}

      <div className="hidden lg:flex w-[45%] bg-[#F7F5F0] relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-200">
        <div className="absolute -left-10 bottom-0 select-none pointer-events-none">
          <h1 className="text-[16vw] leading-[0.75] font-serif font-bold tracking-tighter text-zinc-900/5 m-0 p-0">
            AUTHOR.
          </h1>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-xl font-semibold tracking-widest uppercase text-zinc-900 group-hover:text-zinc-600 transition-colors">
              NovelNest.
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="w-8 h-[1px] bg-zinc-400 mb-8" />
          <p className="text-3xl leading-snug text-zinc-800 font-light tracking-tight mb-6">
            &quot;Mọi tác phẩm vĩ đại đều bắt đầu từ một{" "}
            <span className="italic font-serif">nét bút đầu tiên.</span>&quot;
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Tạo dấu ấn của riêng bạn
          </p>
        </div>

        <div className="relative z-10 flex justify-between items-end text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
          <span>© {new Date().getFullYear()} Việt Nam</span>
          <span>Khởi đầu mới</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-white overflow-y-auto">
        <Link
          href="/"
          className="absolute top-8 left-8 md:top-12 md:left-12 group inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-semibold uppercase tracking-widest">
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Trang chủ</span>
        </Link>

        <div className="w-full max-w-[420px] mt-16 md:mt-0 py-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight mb-3">
              Trang giấy <br />{" "}
              <span className="italic font-serif text-zinc-500">trắng.</span>
            </h2>
            <p className="text-sm text-zinc-500">
              Điền thông tin để bắt đầu hành trình tại NovelNest.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="relative group">
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-zinc-900">
                Tên hiển thị
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full bg-transparent border-b border-zinc-200 py-2 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
              />
            </div>

            <div className="relative group">
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-zinc-900">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ví dụ: reader@novelnest.vn"
                className="w-full bg-transparent border-b border-zinc-200 py-2 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="relative group">
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-zinc-900">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full bg-transparent border-b border-zinc-200 py-2 pr-8 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors">
                    {showPassword ? (
                      <Eye size={14} strokeWidth={1.5} />
                    ) : (
                      <EyeOff size={14} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-zinc-900">
                  Xác nhận
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && acceptTerms && handleRegister()
                    }
                    placeholder="Nhập lại mật khẩu"
                    className="w-full bg-transparent border-b border-zinc-200 py-2 pr-8 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors">
                    {showConfirmPassword ? (
                      <Eye size={14} strokeWidth={1.5} />
                    ) : (
                      <EyeOff size={14} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-10">
            <button
              type="button"
              onClick={() => setAcceptTerms(!acceptTerms)}
              className={`mt-1 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                acceptTerms
                  ? "bg-zinc-900 border-zinc-900"
                  : "bg-transparent border-zinc-300 hover:border-zinc-600"
              }`}>
              {acceptTerms && (
                <Check size={12} className="text-white" strokeWidth={3} />
              )}
            </button>
            <p className="text-xs text-zinc-500 leading-relaxed flex-1">
              Bằng cách đăng ký, tôi xác nhận đã đọc và đồng ý với{" "}
              <Link
                href="/privacy"
                className="text-zinc-900 font-medium hover:italic transition-all border-b border-transparent hover:border-zinc-900">
                Chính sách bảo mật
              </Link>{" "}
              và{" "}
              <Link
                href="/terms"
                className="text-zinc-900 font-medium hover:italic transition-all border-b border-transparent hover:border-zinc-900">
                Điều khoản dịch vụ
              </Link>{" "}
              của NovelNest.
            </p>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading || !acceptTerms}
            className="group w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-xs tracking-widest uppercase font-semibold">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Tạo tài khoản
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>

          <p className="text-center text-xs text-zinc-500 mt-10">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-zinc-900 font-semibold hover:italic transition-all">
              Đăng nhập thôi nào
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
