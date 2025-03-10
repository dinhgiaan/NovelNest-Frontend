"use client"

import { useContext, useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Input from "@mui/material/Input"
import Button from "@mui/material/Button"
import { AuthContext, AuthContextType } from "@/app/context/auth.context"
import { getInfo, updateUserInfo } from "@/app/lib/api"
import toast from "react-hot-toast"
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md"
import { FaMapMarkedAlt } from "react-icons/fa";
import { BiX } from "react-icons/bi"
import { TbUserHexagon } from "react-icons/tb"
import { RiShieldUserFill } from "react-icons/ri"

interface UpdateUserInfoProps {
      isOpen: boolean;
      setIsOpen: (value: boolean) => void;
      userInfo: AuthContextType;
}

export function UpdateUserInfo({ isOpen, setIsOpen, userInfo }: UpdateUserInfoProps) {
      const [name, setName] = useState<string>('');
      const [phone, setPhone] = useState<string>('');
      const [address, setAddress] = useState<string>('');
      const { setUserInfo } = useContext(AuthContext);

      useEffect(() => {
            if (isOpen) {
                  setName(userInfo.user?.name);
                  setPhone(userInfo.user?.phone);
                  setAddress(userInfo.user?.address);
            }
      }, [isOpen, userInfo]);

      const handleChangeUserInfo = async () => {
            if (userInfo.user?._id) {
                  const res = await updateUserInfo({
                        _id: userInfo.user._id,
                        email: userInfo.user.email,
                        name,
                        phone,
                        address
                  });

                  console.log('--> check res update: ', res)

                  if (res.success) {
                        toast.success(res.message);
                        // Update the context with the new user information
                        setUserInfo((prevState) => ({
                              ...prevState,
                              user: {
                                    ...prevState.user,
                                    ...res.user, // Use the updated user from the response
                              },
                        }))

                        // Close the dialog after successful update
                        setIsOpen(false)
                  }
                  console.log('--> check res update: ', res);
            } else {
                  toast.error("Email không tồn tại.");
            }
      }

      return (
            <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  maxWidth="sm"
                  fullWidth
                  BackdropProps={{
                        style: { position: 'absolute' }
                  }}
                  PaperProps={{
                        style: { position: 'absolute' }
                  }}
            >
                  <div className="flex justify-end cursor-pointer p-1 hover:text-red-700" onClick={() => setIsOpen(false)}>
                        <BiX className="h-4 w-4" />
                  </div>
                  <DialogTitle className="text-center text-xl font-semibold uppercase">
                        Cập nhật thông tin
                  </DialogTitle>
                  <DialogContent>
                        <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                    <MdOutlineMail className="h-4 w-4 opacity-50" />
                                    <Input disabled value={userInfo.user?.email} fullWidth sx={{ fontSize: '0.8rem' }} />
                              </div>
                              <div className="flex items-center gap-4">
                                    <RiShieldUserFill className="h-4 w-4 opacity-50" />
                                    <Input disabled value={userInfo.user?.role} fullWidth sx={{ fontSize: '0.8rem' }} />
                              </div>
                              <div className="flex items-center gap-4">
                                    <TbUserHexagon className="h-4 w-4 opacity-50" />
                                    <Input placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ fontSize: '0.8rem' }} />
                              </div>
                              <div className="flex items-center gap-4">
                                    <MdOutlineLocalPhone className="h-4 w-4 opacity-50" />
                                    <Input placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth sx={{ fontSize: '0.8rem' }} />
                              </div>
                              <div className="flex items-center gap-4">
                                    <FaMapMarkedAlt className="h-4 w-4 opacity-50" />
                                    <Input placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth sx={{ fontSize: '0.8rem' }} />
                              </div>
                        </div>
                        <Button variant="contained" color="primary" fullWidth className="mt-4" sx={{ fontSize: '0.8rem' }} onClick={handleChangeUserInfo}>
                              Cập nhật
                        </Button>
                  </DialogContent>
            </Dialog>
      )
}

export default UpdateUserInfo
