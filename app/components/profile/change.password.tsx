'use client'

import { useState } from 'react'
import { TextField, Button, Card, CardContent } from '@mui/material'
import { AuthContextType } from '@/app/context/auth.context'
import { changePasswordAPI } from '@/app/lib/api'
import { toast } from 'react-hot-toast'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { ImKey2 } from 'react-icons/im'

interface IProps {
      userInfo: AuthContextType
}

const ChangePassword = ({ userInfo }: IProps) => {
      const [formData, setFormData] = useState({
            password: '',
            newPassword: '',
            confirmNewPassword: ''
      })

      const [showPassword, setShowPassword] = useState({
            old: false,
            new: false,
            confirm: false
      })

      const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
            setShowPassword(prev => ({
                  ...prev,
                  [field]: !prev[field]
            }))
      }

      const handleInputChange = (field: keyof typeof formData) => (
            e: React.ChangeEvent<HTMLInputElement>
      ) => {
            setFormData(prev => ({
                  ...prev,
                  [field]: e.target.value
            }))
      }

      const handleChangePassword = async () => {
            try {
                  if (!userInfo.user?._id) {
                        throw new Error('User ID not found')
                  }

                  const { password, newPassword, confirmNewPassword } = formData

                  const res = await changePasswordAPI({
                        _id: userInfo.user?._id,
                        password,
                        newPassword,
                        confirmNewPassword
                  })

                  if (res?.success == false) {
                        return toast.error(res?.message)
                  } else {
                        setFormData({ password: '', newPassword: '', confirmNewPassword: '' })
                        return toast.success("Thay đổi mật khẩu thành công")
                  }
            } catch (error) {
                  toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đổi mật khẩu!')
                  console.error('Error changing password:', error)
            }
      }

      return (
            <div className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full'>
                  <div className='w-full max-w-2xl mx-auto px-2 sm:px-4'>
                        <Card className='w-full shadow-lg'>
                              <CardContent className='dark:bg-[#474d63] bg-[#ebf1fa] p-4 sm:p-6 lg:p-8'>
                                    <div className="space-y-4 sm:space-y-6">
                                          <div className="text-center mb-4 sm:mb-6">
                                                <h2 className="text-lg sm:text-xl font-semibold dark:text-white text-gray-800">
                                                      Đổi mật khẩu
                                                </h2>
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                      Vui lòng nhập thông tin để thay đổi mật khẩu
                                                </p>
                                          </div>

                                          {/* Current Password */}
                                          <div className="relative">
                                                <TextField
                                                      fullWidth
                                                      type={showPassword.old ? 'text' : 'password'}
                                                      value={formData.password}
                                                      onChange={handleInputChange('password')}
                                                      label="Mật khẩu hiện tại"
                                                      variant="outlined"
                                                      size="small"
                                                      InputProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      InputLabelProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      sx={{
                                                            '& .MuiInputBase-root': {
                                                                  height: { xs: '40px', sm: '44px' },
                                                                  fontSize: { xs: '14px', sm: '16px' }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                  fontSize: { xs: '12px', sm: '14px' },
                                                                  transition: 'transform 0.2s ease',
                                                            },
                                                            '& .Mui-focused .MuiInputLabel-root': {
                                                                  transform: {
                                                                        xs: 'translate(14px, -8px) scale(0.75)',
                                                                        sm: 'translate(14px, -9px) scale(0.75)'
                                                                  },
                                                            },
                                                      }}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => togglePasswordVisibility('old')}
                                                      className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-500 transition-colors"
                                                >
                                                      {showPassword.old ?
                                                            <FaRegEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                                                            <FaRegEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                      }
                                                </button>
                                          </div>

                                          {/* New Password */}
                                          <div className="relative">
                                                <TextField
                                                      fullWidth
                                                      type={showPassword.new ? 'text' : 'password'}
                                                      value={formData.newPassword}
                                                      onChange={handleInputChange('newPassword')}
                                                      label="Mật khẩu mới"
                                                      variant="outlined"
                                                      size='small'
                                                      InputProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      InputLabelProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      sx={{
                                                            '& .MuiInputBase-root': {
                                                                  height: { xs: '40px', sm: '44px' },
                                                                  fontSize: { xs: '14px', sm: '16px' }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                  fontSize: { xs: '12px', sm: '14px' },
                                                                  transition: 'transform 0.2s ease',
                                                            },
                                                            '& .Mui-focused .MuiInputLabel-root': {
                                                                  transform: {
                                                                        xs: 'translate(14px, -8px) scale(0.75)',
                                                                        sm: 'translate(14px, -9px) scale(0.75)'
                                                                  },
                                                            },
                                                      }}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => togglePasswordVisibility('new')}
                                                      className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-500 transition-colors"
                                                >
                                                      {showPassword.new ?
                                                            <FaRegEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                                                            <FaRegEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                      }
                                                </button>
                                          </div>

                                          {/* Confirm New Password */}
                                          <div className="relative">
                                                <TextField
                                                      fullWidth
                                                      type={showPassword.confirm ? 'text' : 'password'}
                                                      value={formData.confirmNewPassword}
                                                      onChange={handleInputChange('confirmNewPassword')}
                                                      label="Xác nhận mật khẩu mới"
                                                      variant="outlined"
                                                      size='small'
                                                      InputProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      InputLabelProps={{
                                                            className: 'dark:text-white text-black',
                                                      }}
                                                      sx={{
                                                            '& .MuiInputBase-root': {
                                                                  height: { xs: '40px', sm: '44px' },
                                                                  fontSize: { xs: '14px', sm: '16px' }
                                                            },
                                                            '& .MuiInputLabel-root': {
                                                                  fontSize: { xs: '12px', sm: '14px' },
                                                                  transition: 'transform 0.2s ease',
                                                            },
                                                            '& .Mui-focused .MuiInputLabel-root': {
                                                                  transform: {
                                                                        xs: 'translate(14px, -8px) scale(0.75)',
                                                                        sm: 'translate(14px, -9px) scale(0.75)'
                                                                  },
                                                            },
                                                      }}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => togglePasswordVisibility('confirm')}
                                                      className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-500 transition-colors"
                                                >
                                                      {showPassword.confirm ?
                                                            <FaRegEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                                                            <FaRegEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                                      }
                                                </button>
                                          </div>

                                          {/* Submit Button */}
                                          <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={handleChangePassword}
                                                startIcon={<ImKey2 size={18} />}
                                                sx={{
                                                      height: { xs: '44px', sm: '48px' },
                                                      fontSize: { xs: '12px', sm: '14px' },
                                                      fontWeight: 'medium',
                                                      textTransform: 'none',
                                                      borderRadius: '8px',
                                                      marginTop: { xs: '16px', sm: '24px' }
                                                }}
                                          >
                                                Đổi mật khẩu
                                          </Button>
                                    </div>
                              </CardContent>
                        </Card>
                  </div>
            </div>
      )
}

export default ChangePassword