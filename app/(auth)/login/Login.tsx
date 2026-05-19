"use client";

import { useContext, useState, useEffect } from "react";
import { loginAPI } from "../../lib/api/auth";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/auth.context";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Github, ArrowRight, ArrowLeft } from "lucide-react";
import Google from "./components/svg/google.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { loginSuccess } = useContext(AuthContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.userData) return;

    loginSuccess(
      {
        _id: session.user.userData._id,
        email: session.user.userData.email,
        name: session.user.userData.name,
        role: session.user.userData.role,
        loginMethod: session.user.userData.loginMethod || "Social",
        // OAuth không trả avatar dạng { url }, cần wrap lại
        avatar: session.user.userData.avatar
          ? { url: session.user.userData.avatar }
          : undefined,
      },
      {
        access_token: session.user.customAccessToken ?? "",
      },
    );

    if (session.user.message) toast.success(session.user.message);
    router.replace("/");
  }, [session, status, loginSuccess, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      setLoading(true);
      const res = await loginAPI({ email, password });

      if (res?.success !== true) {
        toast.error(res?.message || "Đăng nhập thất bại!");
        return;
      }

      if (!res.access_token || !res.refresh_token || !res.user) {
        toast.error("Phản hồi đăng nhập không đầy đủ!");
        return;
      }

      loginSuccess(
        {
          _id: res.user._id,
          email: res.user.email,
          name: res.user.name,
          role: res.user.role,
          loginMethod: res.user.loginMethod || "Email",
          avatar: res.user.avatar,
        },
        {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        },
      );

      toast.success(`Chào mừng ${res.user.name} đã quay trở lại.`);
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
      } else {
        toast.error("Có lỗi không xác định xảy ra!");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Social Auth ───────────────────────────────────────────────────────────
  const handleSocialAuth = async (provider: string) => {
    try {
      const res = await signIn(provider, { redirect: false, callbackUrl: "/" });
      if (res?.error) toast.error("Đăng nhập thất bại!");
    } catch (e) {
      toast.error(
        (e as AxiosError<{ message?: string }>).response?.data?.message ||
          (e as Error).message ||
          "Thất bại!",
      );
    }
  };

  return (
    <section className="min-h-screen flex bg-white selection:bg-zinc-200 selection:text-black">
      <div className="hidden lg:flex w-[45%] bg-[#F7F5F0] relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-200">
        <div className="absolute -left-10 bottom-0 select-none pointer-events-none">
          <h1 className="text-[18vw] leading-[0.75] font-serif font-bold tracking-tighter text-zinc-900/5 m-0 p-0">
            NOVEL.
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
            &quot;Mỗi trang sách được lật là một{" "}
            <span className="italic font-serif">thế giới mới</span> được mở ra
            trước mắt bạn.&quot;
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Chương 01: Bắt đầu hành trình
          </p>
        </div>

        <div className="relative z-10 flex justify-between items-end text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
          <span>© {new Date().getFullYear()} Việt Nam</span>
          <span>Cuốn sách của bạn</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-white">
        <Link
          href="/"
          className="absolute top-8 left-8 md:top-12 md:left-12 group inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[10px] font-semibold uppercase tracking-widest">
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Trang chủ</span>
        </Link>

        <div className="w-full max-w-[380px] mt-12 md:mt-0">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tight mb-3">
              Mở lại <br />{" "}
              <span className="italic font-serif text-zinc-500">
                trang sách.
              </span>
            </h2>
            <p className="text-sm text-zinc-500">
              Điền thông tin để tiếp tục hành trình của bạn.
            </p>
          </div>

          <div className="space-y-8 mb-10">
            <div className="relative group">
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2 transition-colors group-focus-within:text-zinc-900">
                Email của bạn
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Ví dụ: reader@novelnest.vn"
                className="w-full bg-transparent border-b border-zinc-200 py-2 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
              />
            </div>

            <div className="relative group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest transition-colors group-focus-within:text-zinc-900">
                  Mật khẩu
                </label>
                <Link
                  href="/"
                  className="text-[10px] text-zinc-400 hover:text-zinc-900 transition-colors border-b border-transparent hover:border-zinc-900">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Nhập mật khẩu..."
                  className="w-full bg-transparent border-b border-zinc-200 py-2 pr-10 text-zinc-900 placeholder:text-zinc-300 outline-none transition-all focus:border-zinc-900 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 transition-colors">
                  {showPass ? (
                    <Eye size={16} strokeWidth={1.5} />
                  ) : (
                    <EyeOff size={16} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors disabled:opacity-60 text-xs tracking-widest uppercase font-semibold">
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <>
                Đăng nhập
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-zinc-100" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
              Hoặc
            </span>
            <div className="flex-1 h-[1px] bg-zinc-100" />
          </div>

          <div className="flex gap-4">
            {[
              {
                label: "Google",
                icon: (
                  <Google className="w-4 h-4 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                ),
                provider: "google",
              },
              {
                label: "GitHub",
                icon: <Github size={16} strokeWidth={1.5} />,
                provider: "github",
              },
            ].map(({ label, icon, provider }) => (
              <button
                key={provider}
                onClick={() => handleSocialAuth(provider)}
                disabled={status === "loading"}
                className="group flex-1 flex items-center justify-center gap-2 py-3 border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-all disabled:opacity-50 text-xs font-medium">
                {icon} {label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-500 mt-10">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-zinc-900 font-semibold hover:italic transition-all">
              Tạo ở đây nha
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
