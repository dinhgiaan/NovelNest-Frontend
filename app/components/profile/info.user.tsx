"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Mail, User, Shield, ChevronRight } from "lucide-react";
import UpdateUserInfo from "./update.user.info";
import ChangePasswordModal from "./change.password";
import { useSession } from "next-auth/react";
import { useAvatarUpload } from "@/app/hooks/use.upload.avatar";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/auth.context";

const InfoUser = () => {
  const { user, updateAvatar } = useAuth();

  const avatarUrl = user?.avatar?.url;

  const initial = user?.name?.charAt(0) || user?.email?.charAt(0) || "U";

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const id = useSession();
  const loginMethod = id?.data?.user?.userData?.loginMethod;
  const { upload, uploading } = useAvatarUpload();
  const [avatarKey, setAvatarKey] = useState(0);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 1) {
      toast.error("Chỉ được chọn tối đa 1 ảnh!");
      event.target.value = "";
      return;
    }
    const selectedFile = selectedFiles?.[0];
    if (selectedFile) {
      try {
        await upload(selectedFile, (data) => {
          const typedData = data as { avatar?: { url?: string } };
          if (typedData.avatar?.url) {
            updateAvatar(typedData.avatar.url);
            setAvatarKey(Date.now());
            toast.success("Cập nhật avatar thành công");
          }
        });
      } catch {
        toast.error("Có lỗi xảy ra khi tải lên ảnh!");
      } finally {
        event.target.value = "";
      }
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-[2rem] text-ink tracking-[0.02em] leading-none">
          Hồ sơ cá nhân
        </h2>
      </div>

      <div className="bg-surface border border-ink/10 rounded-sm overflow-hidden shadow-sm">
        <div className="h-32 bg-base-alt border-b border-ink/10 relative"></div>

        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-surface overflow-hidden bg-base-alt relative flex items-center justify-center">
                {avatarUrl ? (
                  <Image
                    key={avatarKey}
                    src={`${avatarUrl}?t=${avatarKey}`}
                    alt="Avatar"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full bg-accent text-white flex items-center justify-center font-display text-[3rem] uppercase">
                    {initial}
                  </div>
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer transition-opacity ${
                  uploading
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}>
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera size={20} className="text-white" />
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tên */}
              <div>
                <label className="text-[0.75rem] font-body font-semibold text-ink-muted uppercase tracking-[0.05em] flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2">
                    <User size={14} /> Tên hiển thị
                  </span>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-accent hover:text-accent-dark transition-colors text-[0.65rem] tracking-[0.1em] cursor-pointer bg-transparent border-none">
                    CHỈNH SỬA
                  </button>
                </label>
                <div className="text-[0.85rem] font-body font-medium text-ink bg-base-alt px-4 py-3 rounded-sm border border-ink/10">
                  {user?.name || "Chưa cập nhật"}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[0.75rem] font-body font-semibold text-ink-muted uppercase tracking-[0.05em] flex items-center gap-2 mb-2">
                  <Mail size={14} /> Địa chỉ Email
                </label>
                <div className="text-[0.85rem] font-body font-medium text-ink bg-base-alt px-4 py-3 rounded-sm border border-ink/10">
                  {user?.email || "Chưa cập nhật"}
                </div>
              </div>

              {/* Phân quyền */}
              <div>
                <label className="text-[0.75rem] font-body font-semibold text-ink-muted uppercase tracking-[0.05em] flex items-center gap-2 mb-2">
                  <Shield size={14} /> Vai trò
                </label>
                <div className="text-[0.85rem] font-body font-medium text-ink bg-base-alt px-4 py-3 rounded-sm border border-ink/10 capitalize">
                  {user?.role || "Thành viên"}
                </div>
              </div>
            </div>

            {/* Đổi mật khẩu */}
            {loginMethod !== "Social" && (
              <div className="pt-6 border-t border-ink/10">
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full flex items-center justify-between p-4 rounded-sm border border-ink/10 hover:bg-base-alt bg-transparent transition-colors group cursor-pointer">
                  <div className="text-left">
                    <p className="text-[0.85rem] font-body font-medium text-ink">
                      Bảo mật tài khoản
                    </p>
                    <p className="text-[0.75rem] font-body text-ink-muted mt-1">
                      Cập nhật mật khẩu để bảo vệ tài khoản của bạn
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-ink-faint group-hover:text-ink transition-colors"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateUserInfo isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default InfoUser;
