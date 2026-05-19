"use client";

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { X, Loader2 } from "lucide-react";
import { AuthContext } from "@/app/context/auth.context";
import toast from "react-hot-toast";
import { userService } from "@/app/lib/api/user";
import axios from "axios";

interface UpdateUserInfoProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface FormData {
  name: string;
  gender: string;
}

interface FormErrors {
  name?: string;
}

const IconWrapper = ({
  children,
  color = "inherit",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      "& svg": { width: 20, height: 20 },
    }}>
    {children}
  </Box>
);

const UpdateUserInfo = React.memo<UpdateUserInfoProps>(
  ({ isOpen, setIsOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { user, updateUser } = useContext(AuthContext);

    const [formData, setFormData] = useState<FormData>({
      name: "",
      gender: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (isOpen && user) {
        setFormData({
          name: user.name || "",
          gender: user.gender || "",
        });
        setErrors({});
      }
    }, [isOpen, user]);

    const validateForm = useCallback((): boolean => {
      const newErrors: FormErrors = {};
      if (!formData.name.trim()) {
        newErrors.name = "Tên không được để trống";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Tên phải có ít nhất 2 ký tự";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleClose = useCallback(() => {
      if (!loading) {
        setIsOpen(false);
        setErrors({});
      }
    }, [loading, setIsOpen]);

    const handleInputChange = useCallback(
      (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setFormData((prev) => ({ ...prev, [field]: e.target.value }));
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        },
      [],
    );

    const hasChanges = useMemo(() => {
      if (!user) return false;
      return (
        formData.name.trim() !== (user.name || "") ||
        formData.gender !== (user.gender || "")
      );
    }, [formData, user]);

    const handleSubmit = useCallback(
      async (event?: React.FormEvent) => {
        event?.preventDefault();
        if (!validateForm() || !user?._id) {
          if (!user?._id) toast.error("Thông tin người dùng không hợp lệ.");
          return;
        }

        try {
          setLoading(true);
          const updateData = {
            name: formData.name.trim(),
            gender: formData.gender.replace(/\s/g, ""),
          };

          const res = await userService.updateUserInfo(updateData);

          if (res.success) {
            toast.success(res.message);
            updateUser(updateData);
            handleClose();
          } else {
            toast.error(res.message || "Cập nhật thất bại");
          }
        } catch (error: unknown) {
          let errorMessage = "Đã xảy ra lỗi khi cập nhật thông tin";
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      [formData, user, validateForm, updateUser, handleClose],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && hasChanges) handleSubmit();
      },
      [handleSubmit, hasChanges],
    );

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 200 }}
        fullScreen={isMobile}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : "12px",
            background: "var(--surface)",
          },
        }}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "var(--ink)" }}>
            Chỉnh sửa thông tin
          </Typography>
          <IconButton
            onClick={handleClose}
            disabled={loading}
            size="small"
            sx={{ color: "var(--ink-muted)" }}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ""}
                disabled
                variant="outlined"
                size="small"
                InputProps={{ sx: { "& fieldset": { borderRadius: "0" } } }}
              />

              <TextField
                fullWidth
                label="Họ và tên"
                value={formData.name}
                onChange={handleInputChange("name")}
                onKeyDown={handleKeyDown}
                error={!!errors.name}
                helperText={errors.name}
                required
                variant="outlined"
                size="small"
                autoComplete="name"
                InputProps={{ sx: { "& fieldset": { borderRadius: "0.1" } } }}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 1, pt: 2 }}>
            <Button
              onClick={handleClose}
              disabled={loading}
              variant="outlined"
              size="medium"
              sx={{ minWidth: 70 }}>
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading || !hasChanges}
              variant="contained"
              size="medium"
              sx={{ minWidth: 90 }}
              startIcon={
                loading ? (
                  <IconWrapper>
                    <Loader2 className="animate-spin" />
                  </IconWrapper>
                ) : null
              }>
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  },
);

UpdateUserInfo.displayName = "UpdateUserInfo";

export default UpdateUserInfo;
