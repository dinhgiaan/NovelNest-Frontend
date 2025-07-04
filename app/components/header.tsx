"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useMemo, useState, useEffect } from "react"
import Image from "next/image";
import avatar from "@/public/assets/avatar_default.webp";
import logo from "@/public/assets/logo.webp"
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
      Box,
      Badge
} from '@mui/material'
import {
      FaUser,
      FaSignOutAlt,
      FaSignInAlt,
      FaUserPlus
} from 'react-icons/fa'
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../lib/store/cart.store";
import fontHeader from '@/app/fonts/fontHeader';


const Header = () => {
      const { data: session, status } = useSession()
      const pathname = usePathname()
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [anchorEl, setAnchorEl] = useState(null)
      const [isLoggingOut, setIsLoggingOut] = useState(false)
      const [isScrolled, setIsScrolled] = useState(false)
      const { userInfo, setUserInfo } = useContext(AuthContext)
      const router = useRouter()

      const openUserMenu = Boolean(anchorEl)

      useEffect(() => {
            const handleScroll = () => {
                  const scrollTop = window.scrollY;
                  setIsScrolled(scrollTop > 80);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
      }, []);

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

                  setAnchorEl(null)

                  localStorage.removeItem("access_token")

                  setUserInfo({
                        isAuthenticated: false,
                        user: null,
                  })

                  if (session) {
                        await signOut({
                              redirect: false,
                              callbackUrl: "/",
                        })
                  }
                  toast.success("Đăng xuất thành công")

                  setTimeout(() => {
                        router.push("/")
                        router.refresh()
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

      const CartIcon = () => {
            const { toggleCart, getTotalItems } = useCartStore();
            const [isMounted, setIsMounted] = useState(false);

            useEffect(() => {
                  setIsMounted(true);
            }, []);

            const totalItems = isMounted ? getTotalItems() : 0;

            return (
                  <IconButton
                        onClick={toggleCart}
                        size="small"
                        sx={{ p: 0.3 }}
                        aria-label="Shopping cart"
                  >
                        <Badge
                              badgeContent={totalItems}
                              color="error"
                              sx={{
                                    '& .MuiBadge-badge': {
                                          fontSize: '0.75rem',
                                          minWidth: '18px',
                                          height: '18px',
                                          backgroundColor: '#ef4444',
                                          color: 'white'
                                    }
                              }}
                        >
                              <ShoppingCart
                                    className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              />
                        </Badge>
                  </IconButton>
            );
      };

      return (
            <header className={`
                  fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
                  ${isScrolled
                        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
                        : 'bg-transparent backdrop-blur-sm shadow-sm'
                  }
            `}>
                  <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <Link href="/" rel="preload" as={""}>
                              <div className="flex">
                                    <Image
                                          src={logo || "/placeholder.svg"}
                                          width={95}
                                          height={80}
                                          alt="Logo NovelNest"
                                          priority
                                          className="transition-all duration-300"
                                    />
                                    <div
                                          className={`mt-2 ml-[-13] flex flex-col transition-all duration-300`}
                                    >
                                          <span className={`text-xl font-semibold ${fontHeader.className} ${isScrolled
                                                ? 'text-gray-800 dark:text-gray-200'
                                                : 'dark:text-[#86eef1] text-[#dbb741]'
                                                }`}>
                                                NovelNest
                                          </span>
                                          <span className="text-xs font-light text-gray-400">
                                                Sách hay, đọc mượt mọi nơi
                                          </span>
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
                                          className={`
                                                text-xs font-medium transition-all duration-300
                                                ${isActive(item.href)
                                                      ? "text-blue-500"
                                                      : isScrolled
                                                            ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                            : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                                }
                                          `}
                                    >
                                          {item.name}
                                    </Link>
                              ))}
                              <div className="flex items-center space-x-4">
                                    <ThemeSwitch />
                                    <CartIcon />
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
                                                alt="Ảnh đại diện"
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
                                                backdropFilter: 'blur(10px)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                                                                  src={avatar?.src ? avatar.src : undefined}
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
                                                      onClick={() => handleMenuItemClick('profile', `/profile`)}
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
                              className={`
                                    lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
                                    ${isScrolled
                                          ? 'text-gray-600 hover:text-blue-600'
                                          : 'text-gray-800 dark:text-white hover:text-blue-600'
                                    }
                              `}
                        >
                              {isMenuOpen ? <BiX className="h-6 w-6" /> : <IoMdList className="h-6 w-6" />}
                        </button>
                  </nav>

                  {/* Mobile Menu */}
                  {isMenuOpen && (
                        <div className={`
                              lg:hidden px-6 py-4 space-y-2 transition-all duration-300 backdrop-blur-md border-t border-gray-200/20
                              ${isScrolled
                                    ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg'
                                    : 'bg-white/80 dark:bg-gray-900/80'
                              }
                        `}>
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
                                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
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
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => setIsMenuOpen(false)}
                                          >
                                                Đăng nhập
                                          </Link>
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href="/register"
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
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
                                                className="block text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
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
                                                className={`block w-full text-left text-sm font-medium py-2 px-3 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
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