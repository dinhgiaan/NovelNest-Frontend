import Image from "next/image"
import { useContext } from "react"
import { AuthContext } from "@/app/context/auth.context"
import { ImageUp, LockKeyhole, Mail, Nut } from "lucide-react"
import EditButton from "./edit.button"
import UpdateUserInfo from "./update.user.info"
import ChangePasswordModal from "./change.password"
import { useState } from "react"
import { Button, styled } from "@mui/material"
import { useSession } from "next-auth/react"
import { useAvatarUpload } from "@/app/hooks/use.upload.avatar"
import toast from "react-hot-toast"

const InfoUser = () => {
      const { userInfo, updateUserAvatar } = useContext(AuthContext)
      const avatarUrl = userInfo.user?.avatar?.url || '/assets/avatar1.webp'
      const [isOpen, setIsOpen] = useState(false)
      const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
      const id = useSession();
      const loginMethod = id?.data?.user?.userData?.loginMethod;
      const { upload, uploading } = useAvatarUpload();
      const [avatarKey, setAvatarKey] = useState(0)

      const VisuallyHiddenInput = styled('input')({
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
      });

      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = event.target.files;

            if (selectedFiles && selectedFiles.length > 1) {
                  toast.error('Chỉ được chọn tối đa 1 ảnh!', {
                        duration: 4000,
                  });
                  event.target.value = '';
                  return;
            }

            const selectedFile = selectedFiles?.[0];

            if (selectedFile) {
                  try {
                        await upload(selectedFile, (data) => {
                              const typedData = data as { avatar?: { url?: string } };
                              if (typedData.avatar?.url) {
                                    updateUserAvatar(typedData.avatar.url);
                                    setAvatarKey(Date.now());
                                    toast.success('Cập nhật avatar thành công, bạn refresh lại trang nhé');
                              }
                        });

                  } catch (error) {
                        console.error('Upload error:', error);
                        toast.error('Có lỗi xảy ra khi tải lên ảnh!');
                  } finally {
                        event.target.value = '';
                  }
            }
      }

      return (
            <div className="w-full max-w-xl mx-auto">
                  <div className="bg-[#ecf2f7] dark:bg-[#111827] rounded-lg overflow-hidden">
                        <div className="relative h-20 sm:h-24 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 overflow-hidden">
                              <div className="absolute inset-0">
                                    <div className="absolute top-3 left-6 w-12 h-12 bg-white/10 rounded-lg rotate-45"></div>
                                    <div className="absolute top-8 right-12 w-8 h-8 bg-white/20 rounded-full"></div>
                                    <div className="absolute bottom-6 left-12 w-6 h-6 bg-white/15 rounded-full"></div>
                                    <div className="absolute bottom-3 right-8 w-10 h-10 bg-white/25 rounded-lg rotate-12"></div>
                              </div>

                              <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                          <defs>
                                                <pattern id="modernGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                                      <path
                                                            d="M 20 0 L 0 0 0 20"
                                                            fill="none"
                                                            stroke="white"
                                                            strokeWidth="0.5"
                                                      />
                                                </pattern>
                                          </defs>
                                          <rect width="100%" height="100%" fill="url(#modernGrid)" />
                                    </svg>
                              </div>

                              <EditButton onClick={() => setIsOpen(true)} />
                        </div>

                        <div className="p-4 -mt-16 relative">
                              <div className="flex flex-col items-center mb-4">
                                    <div className="relative w-24 h-24 mb-3 group cursor-pointer">
                                          <Image
                                                key={avatarKey}
                                                src={`${avatarUrl}?t=${avatarKey}`}
                                                alt="User Avatar"
                                                fill
                                                className="rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:brightness-75"
                                                priority
                                                sizes="96px"
                                                placeholder="blur"
                                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                          />

                                          {uploading && (
                                                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                                                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                                </div>
                                          )}

                                          <div className={`absolute inset-0 bg-black/40 rounded-full transition-opacity duration-300 flex items-center justify-center ${uploading
                                                ? 'opacity-0'
                                                : 'opacity-0 group-hover:opacity-100'
                                                }`}>
                                                <Button
                                                      component="label"
                                                      size="small"
                                                      disabled={uploading}
                                                      sx={{
                                                            minWidth: 'auto',
                                                            padding: '8px',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                            color: '#666',
                                                            '&:hover': {
                                                                  backgroundColor: 'rgba(255, 255, 255, 1)',
                                                            },
                                                            '&:disabled': {
                                                                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                                  color: '#999',
                                                            },
                                                            borderRadius: '50%',
                                                      }}
                                                >
                                                      <ImageUp size={16} />
                                                      <VisuallyHiddenInput
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            disabled={uploading}
                                                      />
                                                </Button>
                                          </div>
                                    </div>

                                    <h1 className="text-lg font-bold text-center mb-1 dark:text-white text-black">
                                          {userInfo.user?.name || "Không rõ"}
                                    </h1>
                                    <span className="text-xs text-gray-600 dark:text-gray-400 px-5 py-1 bg-gray-300 dark:bg-gray-800 rounded-full italic leading-tight">
                                          {userInfo.user?.role || "Không rõ"}
                                    </span>
                              </div>

                              <div className="">
                                    <div className="space-y-3">
                                          <div className="flex items-center space-x-2 px-3 py-1 dark:bg-[#1c273e] bg-[#E5E7EB] rounded-lg">
                                                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                      <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                      <p className="text-xs text-black dark:text-gray-400">Email</p>
                                                      <p className="text-sm font-medium dark:text-white text-black truncate">
                                                            {userInfo.user?.email || "Chưa có"}
                                                      </p>
                                                </div>
                                          </div>
                                          <div className="flex items-center space-x-2 px-3 py-1 dark:bg-[#1c273e] bg-[#E5E7EB] rounded-lg">
                                                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                                      <Nut size={14} className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                      <p className="text-xs text-black dark:text-gray-400">Giới tính</p>
                                                      <p className="text-sm font-medium dark:text-white text-black">
                                                            {userInfo.user?.gender || "Không xác định"}
                                                      </p>
                                                </div>
                                          </div>

                                          {loginMethod !== "Social" && (
                                                <div>
                                                      <div className="bg-black dark:bg-white h-px w-full opacity-10" />
                                                      <div
                                                            className="flex border border-[#a4a4a4] bg-[#385dae] dark:bg-[#0c2250] px-3 space-x-2 py-1 rounded-lg cursor-pointer hover:bg-[#3b3b3b] dark:hover:bg-[#2a2a2a] hover:text-white transition-all duration-150"
                                                            onClick={() => setIsPasswordModalOpen(true)}
                                                      >
                                                            <div className="w-6 flex items-center justify-center">
                                                                  <LockKeyhole size={14} className="text-inherit text-[#e7edee] dark:text-[#f5f6f6]" />
                                                            </div>
                                                            <div>
                                                                  <span className="font-medium text-sm block text-[#ebedf1]">Đổi mật khẩu</span>
                                                                  <span className="dark:text-[#9f9898] text-[#e7e4e4] font-thin block text-[10px]">Cập nhật bảo mật tài khoản của bạn</span>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}

                                    </div>
                              </div>
                        </div>
                  </div>
                  <UpdateUserInfo isOpen={isOpen} setIsOpen={setIsOpen} userInfo={userInfo} />
                  <ChangePasswordModal
                        open={isPasswordModalOpen}
                        onClose={() => setIsPasswordModalOpen(false)}
                  />
            </div>
      )
}

export default InfoUser;
