"use client"

import React, { useContext, useEffect, useState, useCallback, useMemo } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box, Typography, Fade, useTheme, useMediaQuery, MenuItem } from "@mui/material"
import { X, Loader2 } from "lucide-react"
import { AuthContext, type AuthContextType } from "@/app/context/auth.context"
import toast from "react-hot-toast"
import { userService } from "@/app/lib/api/user"
import axios from "axios"

interface UpdateUserInfoProps {
      isOpen: boolean
      setIsOpen: (value: boolean) => void
      userInfo: AuthContextType
      onUserInfoUpdated?: (updatedUser: IUser) => void
}

interface FormData {
      name: string
      gender: string
}

interface FormErrors {
      name?: string
      gender?: string
}

const genders = [
      {
            value: 'Nam',
            label: 'Nam',
      },
      {
            value: 'Nữ',
            label: 'Nữ',
      },
      {
            value: 'Không xác định',
            label: 'Không xác định',
      }
];

const IconWrapper = ({ children, color = "inherit" }: { children: React.ReactNode; color?: string }) => (
      <Box
            sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: color,
                  "& svg": {
                        width: 20,
                        height: 20,
                  },
            }}
      >
            {children}
      </Box>
)

const UpdateUserInfo = React.memo<UpdateUserInfoProps>(({ isOpen, setIsOpen, userInfo, onUserInfoUpdated }) => {
      const theme = useTheme()
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
      const { setUserInfo } = useContext(AuthContext)

      const [formData, setFormData] = useState<FormData>({
            name: "",
            gender: "",
      })
      const [errors, setErrors] = useState<FormErrors>({})
      const [loading, setLoading] = useState(false)

      const userData = useMemo(() => userInfo.user, [userInfo.user])

      useEffect(() => {
            if (isOpen && userData) {
                  setFormData({
                        name: userData.name || "",
                        gender: userData.gender || "",
                  })
                  setErrors({})
            }
      }, [isOpen, userData])

      const validateForm = useCallback((): boolean => {
            const newErrors: FormErrors = {}

            if (!formData.name.trim()) {
                  newErrors.name = "Tên không được để trống"
            } else if (formData.name.trim().length < 2) {
                  newErrors.name = "Tên phải có ít nhất 2 ký tự"
            }

            setErrors(newErrors)
            return Object.keys(newErrors).length === 0
      }, [formData])

      const handleClose = useCallback(() => {
            if (!loading) {
                  setIsOpen(false)
                  setErrors({})
            }
      }, [setIsOpen, loading])

      const handleInputChange = useCallback(
            (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value
                  setFormData((prev) => ({ ...prev, [field]: value }))

                  if (errors[field]) {
                        setErrors((prev) => ({ ...prev, [field]: undefined }))
                  }
            },
            [errors],
      )

      const handleSubmit = useCallback(
            async (event?: React.FormEvent) => {
                  event?.preventDefault()

                  if (!validateForm() || !userData?._id) {
                        if (!userData?._id) {
                              toast.error("Thông tin người dùng không hợp lệ.")
                        }
                        return
                  }

                  try {
                        setLoading(true)

                        const updateData = {
                              name: formData.name.trim(),
                              gender: formData.gender.replace(/\s/g, ""),
                        }

                        const res = await userService.updateUserInfo(updateData)

                        if (res.success) {
                              toast.success(res.message)

                              setUserInfo((prevState) => ({
                                    ...prevState,
                                    user: {
                                          ...prevState.user!,
                                          ...updateData,
                                    },
                              }))

                              onUserInfoUpdated?.(updateData)

                              try {
                                    const currentUserInfo = localStorage.getItem("user_info")
                                    if (currentUserInfo) {
                                          const parsedUserInfo = JSON.parse(currentUserInfo)
                                          localStorage.setItem(
                                                "user_info",
                                                JSON.stringify({
                                                      ...parsedUserInfo,
                                                      user: {
                                                            ...parsedUserInfo.user,
                                                            ...updateData,
                                                      },
                                                }),
                                          )
                                    }
                              } catch (localStorageError) {
                                    console.warn("localStorage update failed:", localStorageError)
                              }

                              handleClose()
                        } else {
                              toast.error(res.message || "Cập nhật thất bại")
                        }
                  } catch (error: unknown) {
                        let errorMessage = "Đã xảy ra lỗi khi cập nhật thông tin"

                        if (axios.isAxiosError(error)) {
                              errorMessage = error.response?.data?.message || error.message
                        } else if (error instanceof Error) {
                              errorMessage = error.message
                        }

                        toast.error(errorMessage)
                  } finally {
                        setLoading(false)
                  }
            },
            [formData, userData, validateForm, setUserInfo, onUserInfoUpdated, handleClose],
      )

      const handleKeyDown = useCallback(
            (event: React.KeyboardEvent) => {
                  if (event.key === "Escape" && !loading) {
                        handleClose()
                  }
            },
            [handleClose, loading],
      )

      const hasChanges = useMemo(() => {
            return formData.name !== (userData?.name || "") || formData.gender !== (userData?.gender || "")
      }, [formData, userData])

      return (
            <Dialog
                  open={isOpen}
                  onClose={handleClose}
                  maxWidth="sm"
                  fullWidth
                  fullScreen={isMobile}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 200 }}
                  onKeyDown={handleKeyDown}
                  PaperProps={{
                        sx: {
                              borderRadius: isMobile ? 0 : 1,
                              maxHeight: "90vh",
                        },
                  }}
            >
                  <DialogTitle
                        sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pb: 1,
                        }}
                  >
                        <Typography variant="h6" component="h2">
                              Cập nhật thông tin
                        </Typography>
                        <IconButton
                              onClick={handleClose}
                              disabled={loading}
                              size="small"
                              sx={{ color: "text.secondary" }}
                              aria-label="Đóng"
                        >
                              <IconWrapper>
                                    <X />
                              </IconWrapper>
                        </IconButton>
                  </DialogTitle>

                  <form onSubmit={handleSubmit}>
                        <DialogContent dividers>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <TextField
                                          fullWidth
                                          label="Email"
                                          value={userData?.email || ""}
                                          disabled
                                          variant="outlined"
                                          size="small"
                                          InputProps={{
                                                sx: {
                                                      "& fieldset": {
                                                            borderRadius: "0"
                                                      },
                                                },
                                          }}
                                    />

                                    <TextField
                                          fullWidth
                                          label="Vai trò"
                                          value={userData?.role || ""}
                                          disabled
                                          variant="outlined"
                                          size="small"
                                          InputProps={{
                                                sx: {
                                                      "& fieldset": {
                                                            borderRadius: "0"
                                                      },
                                                },
                                          }}
                                    />

                                    <TextField
                                          fullWidth
                                          label="Họ và tên"
                                          value={formData.name}
                                          onChange={handleInputChange("name")}
                                          error={!!errors.name}
                                          helperText={errors.name}
                                          required
                                          variant="outlined"
                                          size="small"
                                          autoComplete="name"
                                          InputProps={{
                                                sx: {
                                                      "& fieldset": {
                                                            borderRadius: "0.1"
                                                      },
                                                },
                                          }}
                                    />

                                    <TextField
                                          fullWidth
                                          label="Giới tính"
                                          select
                                          value={formData.gender}
                                          onChange={handleInputChange("gender")}
                                          error={!!errors.gender}
                                          helperText={errors.gender}
                                          variant="outlined"
                                          size="small"
                                          autoComplete="gender"
                                    >
                                          {genders.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                      {option.label}
                                                </MenuItem>
                                          ))}
                                    </TextField>
                              </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 1, pt: 2 }}>
                              <Button onClick={handleClose} disabled={loading} variant="outlined" size="medium" sx={{ minWidth: 70 }}>
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
                                    }
                              >
                                    {loading ? "Đang cập nhật..." : "Cập nhật"}
                              </Button>
                        </DialogActions>
                  </form>
            </Dialog>
      )
})

UpdateUserInfo.displayName = "UpdateUserInfo"

export default UpdateUserInfo;
