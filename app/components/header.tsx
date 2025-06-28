"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useMemo, useState, useEffect } from "react"
import Image from "next/image"
import avatar from "../public/avatar_default.png"
import logo from "@/app/public/logo.webp"
import ThemeSwitch from "./theme.switch"
import { signOut, useSession } from "next-auth/react"
import { AuthContext } from "../context/auth.context"
import { IoMdList } from "react-icons/io"
import { BiX } from "react-icons/bi"
import { FaUserCircle } from "react-icons/fa"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
      Menu,
      MenuItem,
      IconButton,
      Avatar,
      Typography,
      ListItemIcon,
      ListItemText,
      Divider,
      Box
} from '@mui/material'
import {
      FaUser,
      FaSignOutAlt,
      FaSignInAlt,
      FaUserPlus
} from 'react-icons/fa'

const Header = () => {
      const { data: session, status } = useSession()
      const pathname = usePathname()
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [anchorEl, setAnchorEl] = useState(null)
      const [isLoggingOut, setIsLoggingOut] = useState(false)
      const { userInfo, setUserInfo } = useContext(AuthContext)
      const router = useRouter()

      const openUserMenu = Boolean(anchorEl)

      // Sync NextAuth session data with AuthContext
      useEffect(() => {
            if (status === "authenticated" && session?.user?.userData && !userInfo?.isAuthenticated) {
                  setUserInfo({
                        isAuthenticated: true,
                        user: {
                              _id: session.user.userData._id,
                              name: session.user.userData.name,
                              email: session.user.userData.email,
                              role: session.user.userData.role,
                        },
                  })

                  if (session.user.customAccessToken) {
                        localStorage.setItem("access_token", session.user.customAccessToken)
                  }
            }
      }, [session, status, userInfo, setUserInfo])

      // Determine authentication status and user data
      const isAuthenticated = useMemo(() => {
            return userInfo?.isAuthenticated || (status === "authenticated" && !!session)
      }, [userInfo, session, status])

      const displayUser = useMemo(() => {
            if (userInfo?.isAuthenticated && userInfo.user) {
                  return userInfo.user
            } else if (status === "authenticated" && session?.user?.userData) {
                  return {
                        _id: session.user.userData._id,
                        name: session.user.userData.name,
                        email: session.user.userData.email,
                        avatar: session.user.userData.avatar,
                        role: session.user.userData.role,
                        phone: session.user.userData.phone,
                        address: session.user.userData.address,
                  }
            }
            return null
      }, [userInfo, session, status])

      const handleUserMenuClick = (event) => {
            setAnchorEl(event.currentTarget)
      }

      const handleUserMenuClose = () => {
            setAnchorEl(null)
      }

      const handleMenuItemClick = (action, path) => {
            handleUserMenuClose()
            if (action === 'logout') {
                  handleLogout()
            } else if (path) {
                  router.push(path)
            }
      }

      const handleLogout = async () => {
            if (isLoggingOut) return

            try {
                  setIsLoggingOut(true)

                  // Close user menu immediately
                  setAnchorEl(null)

                  // Clear localStorage first
                  localStorage.removeItem("access_token")

                  // Reset AuthContext immediately
                  setUserInfo({
                        isAuthenticated: false,
                        user: null,
                  })

                  // Handle NextAuth signout if session exists
                  if (session) {
                        await signOut({
                              redirect: false,
                              callbackUrl: "/",
                        })
                  }

                  // Show success message
                  toast.success("Đăng xuất thành công")

                  // Small delay to ensure state is updated before redirect
                  setTimeout(() => {
                        router.push("/")
                        router.refresh() // Force refresh to clear any cached data
                  }, 100)
            } catch (error) {
                  console.error("Lỗi đăng xuất:", error)
                  toast.error("Đăng xuất thất bại")
            } finally {
                  setIsLoggingOut(false)
            }
      }

      const isActive = useMemo(() => (path: string) => pathname === path, [pathname])

      const toggleMenu = () => setIsMenuOpen((prev) => !prev)

      return (
            <header className="sticky top-0 z-50 dark:bg-[#181818] bg-[#b6f2fe] shadow-md">
                  <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <Link href="/" rel="preload" as={""}>
                              <div className="flex">
                                    <Image src={logo || "/placeholder.svg"} width={128} height={128} alt="Logo NovelNest" priority />
                                    <div className="dark:text-[#86eef1] text-[#dbb741] text-sm mt-6 ml-[-21] tracking-widest font-mono font-bold">
                                          <span className="block">Novel</span>
                                          <span>Nest</span>
                                    </div>
                              </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-6">
                              {[
                                    { name: "Trang chủ", href: "/" },
                                    { name: "Sách", href: "/books" },
                                    { name: "Về chúng tôi", href: "/about" },
                                    { name: "FAQ", href: "/faq" },
                              ].map((item) => (
                                    <Link
                                          rel="preload"
                                          as={""}
                                          key={item.name}
                                          href={item.href}
                                          className={`text-xs font-medium ${isActive(item.href) ? "text-blue-400" : "hover:text-blue-600 dark:text-white text-black"
                                                }`}
                                    >
                                          {item.name}
                                    </Link>
                              ))}
                              <div className="flex items-center space-x-4">
                                    <ThemeSwitch />
                              </div>

                              {/* Professional User Menu */}
                              <IconButton
                                    onClick={handleUserMenuClick}
                                    size="small"
                                    sx={{
                                          p: 0.5,
                                          ...(openUserMenu && {
                                                bgcolor: 'action.selected',
                                                '&:hover': { bgcolor: 'action.selected' }
                                          })
                                    }}
                                    aria-controls={openUserMenu ? 'user-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openUserMenu ? 'true' : undefined}
                              >
                                    {isAuthenticated && displayUser ? (
                                          <Avatar
                                                src={avatar.src}
                                                sx={{
                                                      width: 28,
                                                      height: 28,
                                                      border: (theme) => `2px solid ${theme.palette.primary.main}`
                                                }}
                                          >
                                                {displayUser.name?.[0] || displayUser.email?.[0]}
                                          </Avatar>
                                    ) : (
                                          <FaUserCircle style={{ fontSize: 32, color: '#6b7280' }} />
                                    )}
                              </IconButton>

                              <Menu
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={openUserMenu}
                                    onClose={handleUserMenuClose}
                                    onClick={handleUserMenuClose}
                                    PaperProps={{
                                          elevation: 3,
                                          sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                                                mt: 1.5,
                                                minWidth: 200,
                                                '& .MuiAvatar-root': {
                                                      width: 24,
                                                      height: 24,
                                                      mr: 1.5,
                                                },
                                                '&:before': {
                                                      content: '""',
                                                      display: 'block',
                                                      position: 'absolute',
                                                      top: 0,
                                                      right: 14,
                                                      width: 10,
                                                      height: 10,
                                                      bgcolor: 'background.paper',
                                                      transform: 'translateY(-50%) rotate(45deg)',
                                                      zIndex: 0,
                                                },
                                          },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                              >
                                    {isAuthenticated && displayUser ? (
                                          <>
                                                {/* User Info Header */}
                                                <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                                                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                            <Avatar
                                                                  src={avatar.src}
                                                                  sx={{ width: 32, height: 32, mr: 1.5 }}
                                                            >
                                                                  {displayUser.name?.[0] || displayUser.email?.[0]}
                                                            </Avatar>
                                                            <Box>
                                                                  <Typography variant="subtitle2" noWrap sx={{ maxWidth: 120 }}>
                                                                        {displayUser.name || 'User'}
                                                                  </Typography>
                                                                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 120 }}>
                                                                        {displayUser.email}
                                                                  </Typography>
                                                            </Box>
                                                      </Box>
                                                </Box>

                                                {/* Menu Items */}
                                                <MenuItem
                                                      onClick={() => handleMenuItemClick('profile', `/profile/${displayUser._id}`)}
                                                      sx={{ py: 1.5 }}
                                                >
                                                      <ListItemIcon>
                                                            <FaUser style={{ fontSize: 14, color: '#6b7280' }} />
                                                      </ListItemIcon>
                                                      <ListItemText>Thông tin độc giả</ListItemText>
                                                </MenuItem>

                                                <Divider />

                                                <MenuItem
                                                      onClick={() => handleMenuItemClick('logout')}
                                                      disabled={isLoggingOut}
                                                      sx={{ py: 1.5, color: 'error.main' }}
                                                >
                                                      <ListItemIcon>
                                                            <FaSignOutAlt style={{ fontSize: 16, color: '#ef4444' }} />
                                                      </ListItemIcon>
                                                      <ListItemText>
                                                            {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                                                      </ListItemText>
                                                </MenuItem>
                                          </>
                                    ) : (
                                          <>
                                                <MenuItem
                                                      onClick={() => handleMenuItemClick('login', '/login')}
                                                      sx={{ py: 1.5 }}
                                                >
                                                      <ListItemIcon>
                                                            <FaSignInAlt style={{ fontSize: 16, color: '#6b7280' }} />
                                                      </ListItemIcon>
                                                      <ListItemText>Đăng nhập</ListItemText>
                                                </MenuItem>

                                                <MenuItem
                                                      onClick={() => handleMenuItemClick('register', '/register')}
                                                      sx={{ py: 1.5 }}
                                                >
                                                      <ListItemIcon>
                                                            <FaUserPlus style={{ fontSize: 16, color: '#6b7280' }} />
                                                      </ListItemIcon>
                                                      <ListItemText>Đăng ký</ListItemText>
                                                </MenuItem>
                                          </>
                                    )}
                              </Menu>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              onClick={toggleMenu}
                              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                              {isMenuOpen ? <BiX className="h-6 w-6" /> : <IoMdList className="h-6 w-6" />}
                        </button>
                  </nav>

                  {/* Mobile Menu */}
                  {isMenuOpen && (
                        <div className="lg:hidden px-6 py-4 space-y-2 bg-[#94a0bf] shadow-md">
                              {[
                                    { name: "Trang chủ", href: "/" },
                                    { name: "Sách", href: "/books" },
                                    { name: "Về chúng tôi", href: "/about" },
                                    { name: "FAQ", href: "/faq" },
                              ].map((item) => (
                                    <Link
                                          rel="preload"
                                          as={""}
                                          key={item.name}
                                          href={item.href}
                                          className={`block text-sm font-medium py-2 px-3 rounded-md transition-colors ${isActive(item.href)
                                                ? "bg-blue-100 text-blue-600"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                                }`}
                                          onClick={() => setIsMenuOpen(false)}
                                    >
                                          {item.name}
                                    </Link>
                              ))}

                              {/* Mobile Auth Links */}
                              {!isAuthenticated ? (
                                    <>
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href="/login"
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                                onClick={() => setIsMenuOpen(false)}
                                          >
                                                Đăng nhập
                                          </Link>
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href="/register"
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                                onClick={() => setIsMenuOpen(false)}
                                          >
                                                Đăng ký
                                          </Link>
                                    </>
                              ) : (
                                    <>
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href={`/profile/${displayUser?._id}`}
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                                onClick={() => setIsMenuOpen(false)}
                                          >
                                                Thông tin độc giả
                                          </Link>
                                          <button
                                                onClick={() => {
                                                      setIsMenuOpen(false)
                                                      handleLogout()
                                                }}
                                                disabled={isLoggingOut}
                                                className={`block w-full text-left text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100 hover:text-blue-600 ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                                                      }`}
                                          >
                                                {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                                          </button>
                                    </>
                              )}
                        </div>
                  )}
            </header>
      )
}

export default Header