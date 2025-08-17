"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, IconButton, InputAdornment, Box, useTheme, Typography }
      from "@mui/material"
import { Eye, EyeOff, Loader2, X } from "lucide-react"
import { toast } from "react-hot-toast"
import { userService } from "@/app/lib/api/user"

interface FormData {
      currentPassword: string
      newPassword: string
      confirmPassword: string
}

interface ChangePasswordModalProps {
      open: boolean
      onClose: () => void
}

interface ChangePasswordResponse {
      success?: boolean
      message?: string
      data?: unknown
}

interface ApiErrorResponse {
      response?: {
            status?: number
            data?: {
                  message?: string
                  code?: string
            }
      }
}

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
      const theme = useTheme()

      const [form, setForm] = useState<FormData>({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
      })

      const [showPassword, setShowPassword] = useState({
            current: false,
            new: false,
            confirm: false,
      })

      const [loading, setLoading] = useState(false)

      const handleChange = useCallback(
            (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
                  setForm((prev) => ({ ...prev, [field]: e.target.value }))
            },
            [],
      )

      const toggleShow = useCallback((field: keyof typeof showPassword) => {
            setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
      }, [])

      const handleClose = useCallback(() => {
            if (!loading) {
                  setForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                  })
                  setShowPassword({
                        current: false,
                        new: false,
                        confirm: false,
                  })
                  onClose()
            }
      }, [loading, onClose])

      const handleSubmit = useCallback(
            async (e: React.FormEvent) => {
                  e.preventDefault()

                  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
                        toast.error("Vui lòng điền đầy đủ thông tin")
                        return
                  }

                  if (form.newPassword !== form.confirmPassword) {
                        toast.error("Mật khẩu xác nhận không khớp")
                        return
                  }

                  if (form.newPassword.length < 6) {
                        toast.error("Mật khẩu mới phải có ít nhất 6 ký tự")
                        return
                  }

                  setLoading(true)
                  try {
                        const res = await userService.changePassword(form) as ChangePasswordResponse
                        if (res?.success === false) {
                              toast.error(res.message || "Có lỗi xảy ra")
                        } else {
                              setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
                              toast.success("Đổi mật khẩu thành công")
                              handleClose()
                        }
                  } catch (error) {
                        if (error && typeof error === 'object' && 'response' in error) {
                              const apiError = error as ApiErrorResponse
                              toast.error(apiError.response?.data?.message || "Có lỗi xảy ra")
                        } else {
                              toast.error("Có lỗi xảy ra")
                        }
                  } finally {
                        setLoading(false)
                  }
            },
            [form, handleClose],
      )

      return (
            <Dialog
                  open={open}
                  onClose={handleClose}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                        sx: {
                              borderRadius: 2,
                              border: theme.palette.mode === 'dark'
                                    ? `1px solid ${theme.palette.divider}`
                                    : 'none',
                              background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                                    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                              boxShadow: theme.palette.mode === 'dark'
                                    ? '0 10px 40px rgba(0, 0, 0, 0.5)'
                                    : '0 10px 40px rgba(0, 0, 0, 0.15)',
                        }
                  }}
            >
                  <DialogTitle
                        sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              pb: 3,
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                        }}
                  >
                        <Typography variant="h6">Đổi mật khẩu</Typography>
                        <IconButton
                              onClick={handleClose}
                              disabled={loading}
                              size="small"
                              sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                          backgroundColor: theme.palette.action.hover,
                                    },
                              }}
                        >
                              <X size={20} />
                        </IconButton>
                  </DialogTitle>

                  <DialogContent sx={{ paddingTop: 3 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                              <Stack spacing={2} sx={{ paddingTop: 2 }}>
                                    <TextField
                                          fullWidth
                                          size="small"
                                          label="Mật khẩu hiện tại"
                                          type={showPassword.current ? "text" : "password"}
                                          value={form.currentPassword}
                                          onChange={handleChange("currentPassword")}
                                          disabled={loading}
                                          InputProps={{
                                                endAdornment: (
                                                      <InputAdornment position="end">
                                                            <IconButton
                                                                  size="small"
                                                                  onClick={() => toggleShow("current")}
                                                                  disabled={loading}
                                                                  sx={{ color: theme.palette.text.secondary }}
                                                            >
                                                                  {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </IconButton>
                                                      </InputAdornment>
                                                ),
                                          }}
                                    />

                                    <TextField
                                          fullWidth
                                          size="small"
                                          label="Mật khẩu mới"
                                          type={showPassword.new ? "text" : "password"}
                                          value={form.newPassword}
                                          onChange={handleChange("newPassword")}
                                          disabled={loading}
                                          InputProps={{
                                                endAdornment: (
                                                      <InputAdornment position="end">
                                                            <IconButton
                                                                  size="small"
                                                                  onClick={() => toggleShow("new")}
                                                                  disabled={loading}
                                                                  sx={{ color: theme.palette.text.secondary }}
                                                            >
                                                                  {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </IconButton>
                                                      </InputAdornment>
                                                ),
                                          }}
                                    />

                                    <TextField
                                          fullWidth
                                          size="small"
                                          label="Xác nhận mật khẩu"
                                          type={showPassword.confirm ? "text" : "password"}
                                          value={form.confirmPassword}
                                          onChange={handleChange("confirmPassword")}
                                          disabled={loading}
                                          InputProps={{
                                                endAdornment: (
                                                      <InputAdornment position="end">
                                                            <IconButton
                                                                  size="small"
                                                                  onClick={() => toggleShow("confirm")}
                                                                  disabled={loading}
                                                                  sx={{ color: theme.palette.text.secondary }}
                                                            >
                                                                  {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </IconButton>
                                                      </InputAdornment>
                                                ),
                                          }}
                                    />
                              </Stack>
                        </Box>
                  </DialogContent>

                  <DialogActions sx={{ p: 3, pt: 2 }}>
                        <Button
                              onClick={handleClose}
                              disabled={loading}
                              sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                          backgroundColor: theme.palette.action.hover,
                                    },
                              }}
                        >
                              Hủy
                        </Button>
                        <Button
                              onClick={handleSubmit}
                              variant="contained"
                              disabled={loading}
                              startIcon={loading ? <Loader2 size={16} className="animate-spin" /> : null}
                              sx={{
                                    fontWeight: 600,
                                    px: 3,
                                    boxShadow: theme.palette.mode === 'dark'
                                          ? '0 4px 12px rgba(144, 202, 249, 0.2)'
                                          : '0 4px 12px rgba(25, 118, 210, 0.2)',
                                    '&:hover': {
                                          boxShadow: theme.palette.mode === 'dark'
                                                ? '0 6px 20px rgba(144, 202, 249, 0.3)'
                                                : '0 6px 20px rgba(25, 118, 210, 0.3)',
                                    }
                              }}
                        >
                              {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
                        </Button>
                  </DialogActions>
            </Dialog>
      )
}

ChangePasswordModal.displayName = "ChangePasswordModal"

export default ChangePasswordModal;
