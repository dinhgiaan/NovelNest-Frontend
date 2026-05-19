"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef, MouseEvent } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logo from "@/public/assets/logo.webp";
import ThemeSwitch from "../../providers/theme.switch";
import { useAuth } from "../../../context/auth.context";
import { useCartStore } from "../../../lib/store/cart.store";
import { userService } from "../../../lib/api/user";
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
  Badge,
} from "@mui/material";
import {
  CircleUserRound,
  LogIn,
  LogOut,
  ShoppingCart,
  UserRound,
  UserRoundPlus,
  X,
  Menu as MenuIcon,
} from "lucide-react";

interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  message?: string;
}

const NAV_ITEMS = [
  { name: "Trang chủ", href: "/" },
  { name: "Sách", href: "/books" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

const CartIcon = ({ onClick }: { onClick?: () => void }) => {
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const total = mounted ? getTotalItems() : 0;

  return (
    <IconButton
      onClick={() => {
        toggleCart();
        onClick?.();
      }}
      size="small"
      sx={{ p: 0.5 }}
      aria-label="Giỏ hàng">
      <Badge
        badgeContent={total}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.65rem",
            minWidth: 17,
            height: 17,
            background: "var(--accent)",
          },
        }}>
        <ShoppingCart
          size={20}
          className="text-ink-muted transition-colors duration-200 hover:text-accent"
        />
      </Badge>
    </IconButton>
  );
};

const UserMenu = ({
  onLogout,
  isLoggingOut,
}: {
  onLogout: () => void;
  isLoggingOut: boolean;
}) => {
  const { isAuthenticated, user } = useAuth();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchor);

  // Avatar: ưu tiên URL ảnh, fallback chữ cái đầu
  const avatarSrc = user?.avatar?.url || undefined;

  const openMenu = useCallback(
    (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget),
    [],
  );
  const closeMenu = useCallback(() => setAnchor(null), []);
  const handleItem = useCallback(
    (action: string, path?: string) => {
      closeMenu();
      if (action === "logout") onLogout();
      else if (path) router.push(path);
    },
    [closeMenu, onLogout, router],
  );

  return (
    <>
      <IconButton
        onClick={openMenu}
        size="small"
        sx={{ p: 0.4, borderRadius: "50%" }}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}>
        {isAuthenticated && user ? (
          <Avatar
            src={avatarSrc}
            sx={{
              width: 30,
              height: 30,
              border: "2px solid var(--accent)",
              transition: "box-shadow .2s",
              "&:hover": {
                boxShadow:
                  "0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent)",
              },
            }}>
            {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
          </Avatar>
        ) : (
          <CircleUserRound size={24} className="text-ink-muted" />
        )}
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchor}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: 210,
            borderRadius: "12px",
            overflow: "visible",
            background: "var(--surface)",
            border: "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
            boxShadow: "0 8px 24px rgba(0,0,0,.12)",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              background: "var(--surface)",
              borderTop:
                "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
              borderLeft:
                "1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        {isAuthenticated && user ? (
          <>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom:
                  "1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar src={avatarSrc} sx={{ width: 36, height: 36 }}>
                  {user.name?.charAt(0) || "U"}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                      maxWidth: 130,
                      color: "var(--ink)",
                      fontWeight: 600,
                    }}>
                    {user.name || "Độc giả"}
                  </Typography>
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ maxWidth: 130, color: "var(--ink-muted)" }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <MenuItem
              onClick={() => handleItem("profile", "/profile")}
              sx={{ py: 1, gap: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <UserRound size={17} className="text-ink-muted" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13, color: "var(--ink)" }}>
                Thông tin độc giả
              </ListItemText>
            </MenuItem>

            <Divider
              sx={{
                borderColor: "color-mix(in srgb, var(--ink) 8%, transparent)",
              }}
            />

            <MenuItem
              onClick={() => handleItem("logout")}
              disabled={isLoggingOut}
              sx={{ py: 1, gap: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <LogOut size={17} className="text-accent" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 13,
                  color: "var(--accent)",
                }}>
                {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
              </ListItemText>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => handleItem("login", "/login")}
              sx={{ py: 1.2, gap: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <LogIn size={17} className="text-gold" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13, color: "var(--ink)" }}>
                Đăng nhập
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => handleItem("register", "/register")}
              sx={{ py: 1.2, gap: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 0 }}>
                <UserRoundPlus size={17} className="text-gold" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13, color: "var(--ink)" }}>
                Đăng ký
              </ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const { isAuthenticated, loginSuccess, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.userData &&
      !isAuthenticated &&
      !isLoggingOutRef.current
    ) {
      loginSuccess(
        {
          _id: session.user.userData._id,
          email: session.user.userData.email,
          name: session.user.userData.name,
          role: session.user.userData.role,
          loginMethod: session.user.userData.loginMethod || "Social",
          avatar: session.user.userData.avatar
            ? { url: session.user.userData.avatar }
            : undefined,
        },
        {
          access_token: session.user.customAccessToken ?? "",
        },
      );
    }
  }, [status, session, isAuthenticated, loginSuccess]);

  const handleLogout = useCallback(async () => {
    isLoggingOutRef.current = true;
    setLoggingOut(true);
    try {
      const res = (await userService.logout()) as ApiResponse;
      if (res.success) {
        logout();
        if (session) signOut({ redirect: false });
        toast.success("Đăng xuất thành công, hẹn gặp lại độc giả.");
        router.push("/");
      }
    } catch (e) {
      isLoggingOutRef.current = false;
      toast.error(`Có lỗi xảy ra: ${e}`);
    } finally {
      setLoggingOut(false);
    }
  }, [session, logout, router]);

  const isActive = useCallback((p: string) => pathname === p, [pathname]);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navCls = (href: string) =>
    `relative text-[13px] font-medium tracking-wide transition-colors duration-200
     ${isActive(href) ? "text-accent" : "text-ink-muted hover:text-ink"}`;

  const activeBar = (href: string) =>
    isActive(href)
      ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-accent after:rounded-full"
      : "";

  const mobileCls = (href: string) =>
    `block text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200
     ${isActive(href) ? "bg-accent/10 text-accent" : "text-ink-muted hover:bg-ink/5 hover:text-ink"}`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base/90 backdrop-blur-md border-b border-ink/10"
            : "bg-transparent border-b border-transparent"
        }`}>
        <nav className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={logo}
              width={44}
              height={44}
              alt="NovelNest logo"
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display text-[1.35rem] tracking-[0.06em] transition-colors duration-300 ${
                  scrolled ? "text-ink" : "text-gold"
                }`}>
                NovelNest
              </span>
              <span className="text-[10px] tracking-widest uppercase text-ink-faint font-light">
                Sách hay · Đọc mượt
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${navCls(item.href)} ${activeBar(item.href)}`}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeSwitch />
            <CartIcon />
            <UserMenu onLogout={handleLogout} isLoggingOut={loggingOut} />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-ink/5"
            aria-label="Menu">
            {menuOpen ? (
              <X size={22} className="text-ink" />
            ) : (
              <MenuIcon size={22} className="text-ink" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden px-4 pb-5 pt-3 space-y-1 animate-fade-in bg-base/95 backdrop-blur-xl border-t border-ink/10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={mobileCls(item.href)}
                onClick={closeMenu}>
                {item.name}
              </Link>
            ))}

            <div className="pt-2 mt-2 border-t border-ink/10">
              {!isAuthenticated ? (
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex-1 text-center text-sm font-medium py-2.5 rounded-sm border border-accent text-accent hover:bg-accent/10 transition-colors">
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex-1 text-center text-sm font-medium py-2.5 rounded-sm bg-accent text-white hover:bg-accent-dark transition-colors">
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className={mobileCls("/profile")}
                    onClick={closeMenu}>
                    Thông tin độc giả
                  </Link>
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    disabled={loggingOut}
                    className="w-full text-left text-sm font-medium py-2.5 px-4 rounded-lg text-accent hover:bg-accent/10 transition-colors disabled:opacity-50">
                    {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 px-1">
              <ThemeSwitch />
              <CartIcon onClick={closeMenu} />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
