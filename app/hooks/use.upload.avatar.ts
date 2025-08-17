import { useState } from 'react';
import toast from 'react-hot-toast';
import { userService } from '@/app/lib/api/user';

export const useAvatarUpload = () => {
      const [uploading, setUploading] = useState(false);

      const MAX_SIZE = 5 * 1024 * 1024;
      const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

      const validateFile = (file: File): boolean => {
            if (file.size > MAX_SIZE) {
                  toast.error('File quá lớn. Kích thước tối đa là 5MB', {
                        duration: 4000,
                  });
                  return false;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                  toast.error('Chỉ chấp nhận file ảnh (JPG, PNG, WebP)', {
                        duration: 4000,
                  });
                  return false;
            }

            return true;
      };

      const upload = async (file: File, onSuccess?: (data: unknown) => void) => {
            if (!file) {
                  toast.error('Không có file để upload!');
                  return;
            }

            if (!validateFile(file)) {
                  return;
            }

            setUploading(true);
            const loadingToast = toast.loading('Đang upload ảnh đại diện...');

            try {
                  const result = await userService.uploadAvatar(file);

                  toast.dismiss(loadingToast);
                  toast.success('Cập nhật ảnh đại diện thành công, bạn làm mới trang lại nhé', {
                        duration: 3000,
                  });

                  if (onSuccess) {
                        onSuccess(result);
                  }

                  return result;
            } catch (error: unknown) {
                  toast.dismiss(loadingToast);

                  const errorMessage = error instanceof Error ? error.message : 'Upload thất bại!'
                  toast.error(errorMessage, {
                        duration: 5000,
                  });

                  throw error;
            } finally {
                  setUploading(false);
            }
      };

      return {
            upload,
            uploading,
            validateFile,
            MAX_SIZE,
            ALLOWED_TYPES
      };
};
