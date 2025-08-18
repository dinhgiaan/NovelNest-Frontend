"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useMemo, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { MouseEvent } from "react"
import logo from "@/public/assets/logo.webp"
import fontHeader from '@/app/fonts/fontHeader'
import ThemeSwitch from "../../providers/theme.switch"
import { AuthContext } from "../../../context/auth.context"
import { useCartStore } from "../../../lib/store/cart.store"
import { userService } from "../../../lib/api/user"
import { Menu, MenuItem, IconButton, Avatar, Typography, ListItemIcon, ListItemText, Divider, Box, Badge } from '@mui/material'
import { CircleUserRound, LogIn, LogOut, ShoppingCart, Text, UserRound, UserRoundPlus, X } from "lucide-react"

interface UserMenuProps {
      isAuthenticated: boolean
      displayUser: IUser | null
      onLogout: () => void
      isLoggingOut: boolean
}

interface ApiResponse<T = unknown> {
      success?: boolean
      data?: T
      message?: string
}

const NAV_ITEMS = [
      { name: "Trang chủ", href: "/" },
      { name: "Sách", href: "/books" },
      { name: "Về chúng tôi", href: "/about" },
      { name: "FAQ", href: "/faq" },
]

const CartIcon = () => {
      const { toggleCart, getTotalItems } = useCartStore()
      const [isMounted, setIsMounted] = useState(false)

      useEffect(() => {
            setIsMounted(true)
      }, [])

      const totalItems = isMounted ? getTotalItems() : 0

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
                                    fontSize: '0.7rem',
                                    minWidth: '18px',
                                    height: '18px',
                                    backgroundColor: '#ef4444',
                                    color: 'white'
                              }
                        }}
                  >
                        <ShoppingCart
                              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              size={19}
                        />
                  </Badge>
            </IconButton>
      )
}

const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated, displayUser, onLogout, isLoggingOut }) => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
      const router = useRouter()
      const openUserMenu = Boolean(anchorEl)
      const { userInfo } = useContext(AuthContext)
      const avatarUrl = userInfo.user?.avatar?.url || '/assets/avatar_default.webp'

      const handleUserMenuClick = useCallback((event: MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
      }, [])

      const handleUserMenuClose = useCallback(() => {
            setAnchorEl(null)
      }, [])

      const handleMenuItemClick = useCallback((action: string, path?: string) => {
            handleUserMenuClose()
            if (action === 'logout') {
                  onLogout()
            } else if (path) {
                  router.push(path)
            }
      }, [handleUserMenuClose, onLogout, router])

      return (
            <>
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
                                    src={avatarUrl}
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
                              <CircleUserRound style={{ fontSize: 32, color: '#6b7280' }} />
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
                                    backgroundColor: '#12404d',
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
                                          bgcolor: '#1A4F5D',
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
                                    <Box sx={{ px: 2, py: 0.5, borderBottom: 1, borderColor: 'divider' }}>
                                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                <Avatar
                                                      src={avatarUrl}
                                                      sx={{ width: 32, height: 32, mr: 1.5 }}
                                                >
                                                      {displayUser.name?.[0] || displayUser.email?.[0]}
                                                </Avatar>
                                                <Box>
                                                      <Typography variant="subtitle2" noWrap sx={{ maxWidth: 120 }} className="text-white">
                                                            {displayUser.name || 'User'}
                                                      </Typography>
                                                      <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 120 }} className="text-gray-400">
                                                            {displayUser.email}
                                                      </Typography>
                                                </Box>
                                          </Box>
                                    </Box>

                                    <MenuItem
                                          onClick={() => handleMenuItemClick('profile', `/profile`)}
                                          sx={{ py: 0.5 }}
                                    >
                                          <ListItemIcon>
                                                <UserRound size={20} className="text-white" />
                                          </ListItemIcon>
                                          <ListItemText className="text-white">Thông tin độc giả</ListItemText>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem
                                          onClick={() => handleMenuItemClick('logout')}
                                          disabled={isLoggingOut}
                                          sx={{ py: 0.5, color: 'error.main' }}
                                    >
                                          <ListItemIcon>
                                                <LogOut color="#c44444" size={20} />
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
                                                <LogIn size={20} color="#faf324" />
                                          </ListItemIcon>
                                          <ListItemText className="dark:text-white text-black">Đăng nhập</ListItemText>
                                    </MenuItem>

                                    <MenuItem
                                          onClick={() => handleMenuItemClick('register', '/register')}
                                          sx={{ py: 1.5 }}
                                    >
                                          <ListItemIcon>
                                                <UserRoundPlus size={20} color="#faf324" />
                                          </ListItemIcon>
                                          <ListItemText className="dark:text-white text-black">Đăng ký</ListItemText>
                                    </MenuItem>
                              </>
                        )}
                  </Menu>
            </>
      )
}

const Header = () => {
      const { data: session, status } = useSession()
      const pathname = usePathname()
      const router = useRouter()
      const { userInfo, setUserInfo } = useContext(AuthContext)

      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [isLoggingOut, setIsLoggingOut] = useState(false)
      const [isScrolled, setIsScrolled] = useState(false)
      const [scrollY, setScrollY] = useState(0)

      useEffect(() => {
            let ticking = false

            const handleScroll = () => {
                  if (!ticking) {
                        requestAnimationFrame(() => {
                              const currentScrollY = window.scrollY
                              setScrollY(currentScrollY)
                              setIsScrolled(currentScrollY > 50)
                              ticking = false
                        })
                        ticking = true
                  }
            }

            window.addEventListener('scroll', handleScroll, { passive: true })
            return () => window.removeEventListener('scroll', handleScroll)
      }, [])

      useEffect(() => {
            if (status === "authenticated" && session?.user?.userData && !userInfo?.isAuthenticated) {
                  setUserInfo({
                        isAuthenticated: true,
                        user: {
                              _id: session.user.userData._id,
                              name: session.user.userData.name,
                              email: session.user.userData.email,
                              role: session.user.userData.role,
                              loginMethod: session.user.userData.loginMethod
                        },
                  })

                  if (session.user.customAccessToken) {
                        localStorage.setItem("access_token", session.user.customAccessToken)
                  }
            }
      }, [session, status, userInfo, setUserInfo])

      // Memoized values
      const isAuthenticated = useMemo(() => {
            return userInfo?.isAuthenticated || (status === "authenticated" && !!session)
      }, [userInfo, session, status])

      const displayUser = useMemo((): IUser | null => {
            if (userInfo?.isAuthenticated && userInfo.user) {
                  return userInfo.user
            } else if (status === "authenticated" && session?.user?.userData) {
                  return {
                        _id: session.user.userData._id,
                        name: session.user.userData.name,
                        email: session.user.userData.email,
                        avatar: {
                              url: session.user.userData.avatar
                        },
                        role: session.user.userData.role,
                  }
            }
            return null
      }, [userInfo, session, status])

      const isActive = useCallback((path: string) => pathname === path, [pathname])

      const handleLogout = useCallback(async () => {
            setIsLoggingOut(true)
            try {
                  const res = await userService.logout() as ApiResponse

                  if (res.success) {
                        setUserInfo({
                              isAuthenticated: false,
                              user: {
                                    _id: "",
                                    email: "",
                                    name: "",
                                    role: "",
                                    loginMethod: ""
                              },
                        })

                        localStorage.removeItem("access_token")
                        localStorage.removeItem("refresh_token")

                        if (session) {
                              await signOut({ redirect: false })
                        }

                        toast.success('Đăng xuất thành công, hẹn gặp lại độc giả.')
                        router.push('/')
                  }
            } catch (error) {
                  toast.error(`Có lỗi xảy ra khi đăng xuất: ${error}`)
            } finally {
                  setIsLoggingOut(false)
            }
      }, [session, setUserInfo, router])

      const toggleMenu = useCallback(() => {
            setIsMenuOpen(prev => !prev)
      }, [])

      const closeMenu = useCallback(() => {
            setIsMenuOpen(false)
      }, [])

      const backdropOpacity = Math.min(scrollY / 80, 1)
      const shadowIntensity = Math.min(scrollY / 60, 1)
      const mobileOpacity = isScrolled ? backdropOpacity : 0.9

      const headerStyle = {
            background: isScrolled
                  ? `rgba(255, 255, 255, ${0.95 * backdropOpacity})`
                  : `rgba(255, 255, 255, ${0.05})`,
            backdropFilter: `blur(${4 + (8 * backdropOpacity)}px)`,
            WebkitBackdropFilter: `blur(${4 + (8 * backdropOpacity)}px)`,
            boxShadow: `0 1px ${15 * shadowIntensity}px rgba(0, 0, 0, ${0.08 * shadowIntensity})`,
            borderBottom: `1px solid rgba(229, 231, 235, ${0.15 * backdropOpacity})`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'background-color, backdrop-filter, box-shadow'
      }

      const headerStyleDark = {
            background: isScrolled
                  ? `rgba(17, 24, 39, ${0.95 * backdropOpacity})`
                  : `rgba(17, 24, 39, ${0.05})`,
            backdropFilter: `blur(${4 + (8 * backdropOpacity)}px)`,
            WebkitBackdropFilter: `blur(${4 + (8 * backdropOpacity)}px)`,
            boxShadow: `0 1px ${15 * shadowIntensity}px rgba(0, 0, 0, ${0.25 * shadowIntensity})`,
            borderBottom: `1px solid rgba(75, 85, 99, ${0.15 * backdropOpacity})`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'background-color, backdrop-filter, box-shadow'
      }

      const mobileMenuStyle = {
            background: isScrolled
                  ? `rgba(255, 255, 255, ${0.95 * mobileOpacity})`
                  : `rgba(255, 255, 255, ${0.85 * mobileOpacity})`,
            backdropFilter: `blur(${8 + (4 * mobileOpacity)}px)`,
            WebkitBackdropFilter: `blur(${8 + (4 * mobileOpacity)}px)`,
            boxShadow: `0 4px ${12 * shadowIntensity}px rgba(0, 0, 0, ${0.1 * shadowIntensity})`,
            borderTop: `1px solid rgba(229, 231, 235, ${0.2 * mobileOpacity})`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }

      const mobileMenuStyleDark = {
            background: isScrolled
                  ? `rgba(17, 24, 39, ${0.95 * mobileOpacity})`
                  : `rgba(17, 24, 39, ${0.85 * mobileOpacity})`,
            backdropFilter: `blur(${8 + (4 * mobileOpacity)}px)`,
            WebkitBackdropFilter: `blur(${8 + (4 * mobileOpacity)}px)`,
            boxShadow: `0 4px ${12 * shadowIntensity}px rgba(0, 0, 0, ${0.25 * shadowIntensity})`,
            borderTop: `1px solid rgba(75, 85, 99, ${0.2 * mobileOpacity})`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }

      const navLinkClasses = (href: string) => `
            text-xs space-x-6
            ${isActive(href)
                  ? "text-blue-700 bg-[#ffff] dark:bg-blue-100 font-semibold px-4 py-1 rounded-full shadow-[0_0_20px_rgba(200,7,217,0.6)] hover:shadow-[0_0_25px_rgba(59,130,246,0.9)] transition-all duration-300"
                  : isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        : "text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            }
      `

      const mobileLinkClasses = (href: string) => `
            block text-sm font-medium py-2 px-3 rounded-md transition-all duration-300 ease-out
            ${isActive(href)
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/70 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
            }
      `

      return (
            <>
                  {/* Light theme header */}
                  <header
                        className="fixed top-0 left-0 right-0 z-50 dark:hidden"
                        style={headerStyle}
                  >
                        <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                              <Link href="/" className="flex">
                                    <Image
                                          src={logo}
                                          width={95}
                                          height={80}
                                          alt="Logo NovelNest"
                                          priority
                                          className="w-[95px] aspect-auto object-contain transition-all duration-300"
                                    />
                                    <div className="mt-2 ml-[-13] flex flex-col transition-all duration-300">
                                          <span className={`text-xl font-semibold ${fontHeader.className} ${isScrolled
                                                ? 'text-gray-800'
                                                : 'text-[#dbb741]'
                                                }`}>
                                                NovelNest
                                          </span>
                                          <span className="text-xs font-light text-gray-400">
                                                Sách hay, đọc mượt mọi nơi
                                          </span>
                                    </div>
                              </Link>

                              {/* Desktop Menu */}
                              <div className="hidden lg:flex items-center space-x-6">
                                    {NAV_ITEMS.map((item) => (
                                          <Link
                                                key={item.name}
                                                href={item.href}
                                                className={navLinkClasses(item.href)}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}

                                    <div className="flex items-center space-x-4">
                                          <ThemeSwitch />
                                          <CartIcon />
                                    </div>

                                    <UserMenu
                                          isAuthenticated={isAuthenticated}
                                          displayUser={displayUser}
                                          onLogout={handleLogout}
                                          isLoggingOut={isLoggingOut}
                                    />
                              </div>

                              {/* Mobile Menu Button */}
                              <button
                                    onClick={toggleMenu}
                                    className={`
                                          lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
                                          ${isScrolled
                                                ? 'text-gray-600 hover:text-blue-600'
                                                : 'text-gray-800 hover:text-blue-600'
                                          }
                                    `}
                              >
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Text className="h-6 w-6" />}
                              </button>
                        </nav>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                              <div
                                    className="lg:hidden px-6 py-4 space-y-2"
                                    style={mobileMenuStyle}
                              >
                                    {NAV_ITEMS.map((item) => (
                                          <Link
                                                key={item.name}
                                                href={item.href}
                                                className={mobileLinkClasses(item.href)}
                                                onClick={closeMenu}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}

                                    {!isAuthenticated ? (
                                          <>
                                                <Link
                                                      href="/login"
                                                      className={mobileLinkClasses('/login')}
                                                      onClick={closeMenu}
                                                >
                                                      Đăng nhập
                                                </Link>
                                                <Link
                                                      href="/register"
                                                      className={mobileLinkClasses('/register')}
                                                      onClick={closeMenu}
                                                >
                                                      Đăng ký
                                                </Link>
                                          </>
                                    ) : (
                                          <>
                                                <Link
                                                      href='/profile/'
                                                      className={mobileLinkClasses(`/profile/${displayUser?._id}`)}
                                                      onClick={closeMenu}
                                                >
                                                      Thông tin độc giả
                                                </Link>
                                                <button
                                                      onClick={() => {
                                                            closeMenu()
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

                  {/* Dark theme header */}
                  <header
                        className="fixed top-0 left-0 right-0 z-50 hidden dark:block"
                        style={headerStyleDark}
                  >
                        <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                              <Link href="/" className="flex">
                                    <Image
                                          src={logo}
                                          width={95}
                                          height={80}
                                          alt="Logo NovelNest"
                                          priority
                                          className="transition-all duration-300"
                                    />
                                    <div className="mt-2 ml-[-13] flex flex-col transition-all duration-300">
                                          <span className={`text-xl font-semibold ${fontHeader.className} ${isScrolled
                                                ? 'text-gray-200'
                                                : 'text-[#86eef1]'
                                                }`}>
                                                NovelNest
                                          </span>
                                          <span className="text-xs font-light text-gray-400">
                                                Sách hay, đọc mượt mọi nơi
                                          </span>
                                    </div>
                              </Link>

                              {/* Desktop Menu */}
                              <div className="hidden lg:flex items-center space-x-6">
                                    {NAV_ITEMS.map((item) => (
                                          <Link
                                                key={item.name}
                                                href={item.href}
                                                className={navLinkClasses(item.href)}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}

                                    <div className="flex items-center space-x-4">
                                          <ThemeSwitch />
                                          <CartIcon />
                                    </div>

                                    <UserMenu
                                          isAuthenticated={isAuthenticated}
                                          displayUser={displayUser}
                                          onLogout={handleLogout}
                                          isLoggingOut={isLoggingOut}
                                    />
                              </div>

                              {/* Mobile Menu Button */}
                              <button
                                    onClick={toggleMenu}
                                    className={`
                                          lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
                                          ${isScrolled
                                                ? 'text-gray-300 hover:text-blue-400'
                                                : 'text-white hover:text-blue-400'
                                          }
                                    `}
                              >
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Text className="h-6 w-6" />}
                              </button>
                        </nav>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                              <div
                                    className="lg:hidden px-6 py-4 space-y-2"
                                    style={mobileMenuStyleDark}
                              >
                                    {NAV_ITEMS.map((item) => (
                                          <Link
                                                key={item.name}
                                                href={item.href}
                                                className={mobileLinkClasses(item.href)}
                                                onClick={closeMenu}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}

                                    {!isAuthenticated ? (
                                          <>
                                                <Link
                                                      href="/login"
                                                      className={mobileLinkClasses('/login')}
                                                      onClick={closeMenu}
                                                >
                                                      Đăng nhập
                                                </Link>
                                                <Link
                                                      href="/register"
                                                      className={mobileLinkClasses('/register')}
                                                      onClick={closeMenu}
                                                >
                                                      Đăng ký
                                                </Link>
                                          </>
                                    ) : (
                                          <>
                                                <Link
                                                      href='/profile/'
                                                      className={mobileLinkClasses(`/profile/${displayUser?._id}`)}
                                                      onClick={closeMenu}
                                                >
                                                      Thông tin độc giả
                                                </Link>
                                                <button
                                                      onClick={() => {
                                                            closeMenu()
                                                            handleLogout()
                                                      }}
                                                      disabled={isLoggingOut}
                                                      className={`block w-full text-left font-medium py-2 px-3 rounded-md transition-colors text-gray-300 hover:bg-gray-800 hover:text-blue-400 ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                                                            }`}
                                                >
                                                      {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                                                </button>
                                          </>
                                    )}
                              </div>
                        )}
                  </header>
            </>
      )
}

export default Header;
