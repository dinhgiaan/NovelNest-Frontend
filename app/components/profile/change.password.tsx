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
            <div className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-max'>
                  <Card className='w-[550px]'>
                        <CardContent className='dark:bg-[#474d63] bg-[#ebf1fa]'>
                              <div className="relative">
                                    <TextField
                                          fullWidth
                                          type={showPassword.old ? 'text' : 'password'}
                                          value={formData.password}
                                          onChange={handleInputChange('password')}
                                          label="Mật khẩu hiện tại"
                                          variant="outlined"
                                          margin="normal"
                                          size="small"
                                          InputProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          InputLabelProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          sx={{
                                                '& .MuiInputBase-root': {
                                                      height: '1.875rem', // Đảm bảo chiều cao input đúng
                                                },
                                                '& .MuiInputLabel-root': {
                                                      fontSize: '0.7rem',
                                                      transition: 'transform 0.2s ease', // Thêm hiệu ứng di chuyển label
                                                },
                                                '& .Mui-focused .MuiInputLabel-root': {
                                                      transform: 'translate(0.7rem, -0.8rem) scale(0.2)', // Di chuyển label lên khi input được focus và có dữ liệu
                                                },
                                          }}
                                    />


                                    <button
                                          type="button"
                                          onClick={() => togglePasswordVisibility('old')}
                                          className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/4"
                                    >
                                          {showPassword.old ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                    </button>
                              </div>
                              <div className="relative">
                                    <TextField
                                          fullWidth
                                          type={showPassword.new ? 'text' : 'password'}
                                          value={formData.newPassword}
                                          onChange={handleInputChange('newPassword')}
                                          label="Mật khẩu mới"
                                          variant="outlined"
                                          margin="normal"
                                          size='small'
                                          InputProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          InputLabelProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          sx={{
                                                '& .MuiInputBase-root': {
                                                      height: '1.875rem', // Đảm bảo chiều cao input đúng
                                                },
                                                '& .MuiInputLabel-root': {
                                                      fontSize: '0.7rem',
                                                      transition: 'transform 0.2s ease', // Thêm hiệu ứng di chuyển label
                                                },
                                                '& .Mui-focused .MuiInputLabel-root': {
                                                      transform: 'translate(0.7rem, -0.8rem) scale(0.2)', // Di chuyển label lên khi input được focus và có dữ liệu
                                                },
                                          }}
                                    />
                                    <button
                                          type="button"
                                          onClick={() => togglePasswordVisibility('new')}
                                          className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/4"
                                    >
                                          {showPassword.new ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                                    </button>
                              </div>
                              <div className="relative">
                                    <TextField
                                          fullWidth
                                          type={showPassword.confirm ? 'text' : 'password'}
                                          value={formData.confirmNewPassword}
                                          onChange={handleInputChange('confirmNewPassword')}
                                          label="Xác nhận mật khẩu mới"
                                          variant="outlined"
                                          margin="normal"
                                          size='small'
                                          InputProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          InputLabelProps={{
                                                className: 'dark:text-white text-black',
                                          }}
                                          sx={{
                                                '& .MuiInputBase-root': {
                                                      height: '1.875rem', // Đảm bảo chiều cao input đúng
                                                },
                                                '& .MuiInputLabel-root': {
                                                      fontSize: '0.7rem',
                                                      transition: 'transform 0.2s ease', // Thêm hiệu ứng di chuyển label
                                                },
                                                '& .Mui-focused .MuiInputLabel-root': {
                                                      transform: 'translate(0.7rem, -0.8rem) scale(0.2)', // Di chuyển label lên khi input được focus và có dữ liệu
                                                },
                                          }}
                                    />
                                    <button
                                          type="button"
                                          onClick={() => togglePasswordVisibility('confirm')}
                                          className="dark:text-white text-black absolute right-3 top-1/2 transform -translate-y-1/4"
                                    >
                                          {showPassword.confirm ? <FaRegEye size={18} /> : <FaRegEye size={18} />}
                                    </button>
                              </div>
                              <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleChangePassword}
                                    startIcon={<ImKey2 size={18} />}
                              >
                                    <span className='text-xs'>Đổi mật khẩu</span>
                              </Button>
                        </CardContent>
                  </Card>
            </div>
      )
}

export default ChangePassword
