'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import langVI from '../public/lang-vi.png';
import langEN from '../public/lang-en.png';
import logo from '@/app/public/logo.webp';
import ThemeSwitch from './theme.switch';
import { signOut, useSession } from 'next-auth/react';
import { AuthContext } from '../context/auth.context';
import { IoMdList } from 'react-icons/io';
import { BiX } from 'react-icons/bi';
import { CiShoppingBasket } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Router } from 'next/router';

const Header = () => {
      const { data: session } = useSession();
      const pathname = usePathname();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [openUser, setOpenUser] = useState(false);
      const { userInfo, setUserInfo } = useContext(AuthContext);
      // console.log('--> check log userInfo: ', userInfo)
      const router = Router;

      // Kiểm tra thông tin người dùng kết hợp giữa userInfo và session
      const isAuthenticated = useMemo(() => {
            return userInfo?.isAuthenticated || !!session;
      }, [userInfo, session]);

      // Thông tin người dùng hiển thị (ưu tiên userInfo, rồi đến session)
      const displayUser = useMemo(() => {
            if (userInfo?.isAuthenticated) {
                  return userInfo.user;
            } else if (session) {
                  return {
                        _id: session.user?.id || 'session-user',
                        name: session.user?.name || '',
                        email: session.user?.email || '',
                        avatar: session.user?.image || '',
                  };
            }
            return null;
      }, [userInfo, session]);

      const handleLogout = async () => {
            try {
                  // Xử lý đăng xuất NextAuth (nếu đang dùng session)
                  if (session) {
                        await signOut({ redirect: false });
                  }

                  localStorage.removeItem("access_token");

                  // Cập nhật context
                  setUserInfo({
                        isAuthenticated: false,
                        user: null
                  });

                  // Đóng menu user
                  setOpenUser(false);

                  // Thông báo
                  toast.success('Đăng xuất thành công');

                  // Chuyển hướng về trang chủ
                  router.push('/');
            } catch (error) {
                  console.error('Lỗi đăng xuất:', error);
                  toast.error('Đăng xuất thất bại');
            }
      };

      const isActive = useMemo(() => (path: string) => pathname === path, [pathname]);

      const toggleMenu = () => setIsMenuOpen((prev) => !prev);

      return (
            <header className="sticky top-0 z-50 dark:bg-[#181818] bg-[#b6f2fe] shadow-md">
                  <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <Link href="/" rel="preload"
                              as={""}>
                              <div className='flex'>
                                    <Image
                                          src={logo}
                                          width={128}
                                          height={128}
                                          alt="Logo NovelNest"
                                          priority
                                    />
                                    <div className='dark:text-[#86eef1] text-[#dbb741] text-sm mt-6 ml-[-21] tracking-widest font-mono font-bold'>
                                          <span className='block'>Novel</span>
                                          <span>Nest</span>
                                    </div>
                              </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-6">
                              {[{ name: 'Trang chủ', href: '/' }, { name: 'Sách', href: '/books' }, { name: 'Về chúng tôi', href: '/about' },
                              { name: 'FAQ', href: '/faq' }].map((item) => (
                                    <Link
                                          rel="preload"
                                          as={""}
                                          key={item.name}
                                          href={item.href}
                                          className={`text-xs font-medium ${isActive(item.href) ? 'text-blue-400' : 'hover:text-blue-600 dark:text-white text-black '}`}
                                    >
                                          {item.name}
                                    </Link>
                              ))}
                              <div className="flex items-center space-x-4">
                                    <ThemeSwitch />
                              </div>

                              <div
                                    className="cursor-pointer"
                                    onClick={() => setOpenUser((prev) => !prev)}
                              >
                                    {isAuthenticated ? (
                                          <div className="flex items-center">
                                                <Image
                                                      src={displayUser?.avatar || langVI}
                                                      className="rounded-full border-2 dark:border-blue-400 border-blue-600"
                                                      width={25}
                                                      height={25}
                                                      alt="avatar"
                                                      priority
                                                />
                                                <span className="ml-2 text-xs font-medium dark:text-gray-300 text-gray-800">
                                                      {displayUser?.name || displayUser?.email?.split('@')[0]}
                                                </span>
                                          </div>
                                    ) : (
                                          <div className="flex items-center">
                                                <FaUserCircle className="text-lg dark:text-gray-400 text-blue-600" />
                                                <span className="ml-2 text-xs font-medium dark:text-gray-400 text-gray-800">
                                                      Khách
                                                </span>
                                          </div>
                                    )}
                              </div>

                              {openUser && (
                                    <div className="dark:bg-[#f8f6fd] bg-[#9bbbf7] w-36 px-3 py-2 space-y-2 rounded-sm absolute top-8 right-0 flex flex-col shadow-2xl">
                                          {isAuthenticated ? (
                                                <>
                                                      <Link
                                                            rel="preload"
                                                            as={""}
                                                            href={`/profile/${displayUser?._id}`}
                                                            className="text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold cursor-pointer"
                                                      >
                                                            Thông tin độc giả
                                                      </Link>
                                                      <button
                                                            onClick={handleLogout}
                                                            className="text-left text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold"
                                                      >
                                                            Đăng xuất
                                                      </button>
                                                </>
                                          ) : (
                                                <>
                                                      <Link
                                                            rel="preload"
                                                            as={""}
                                                            href="/login"
                                                            className="text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold cursor-pointer"
                                                      >
                                                            Đăng nhập
                                                      </Link>
                                                      <Link
                                                            rel="preload"
                                                            as={""}
                                                            href="/register"
                                                            className="text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold cursor-pointer"
                                                      >
                                                            Đăng ký
                                                      </Link>
                                                </>
                                          )}
                                    </div>
                              )}
                              <div className="flex items-center space-x-2">
                                    <Image src={langVI} width={20} height={20} alt="Tiếng Việt" className="cursor-pointer" />
                                    <Image src={langEN} width={20} height={20} alt="English" className="cursor-pointer" />
                              </div>
                              <div>
                                    <CiShoppingBasket className='dark:text-white text-black' size={18} />
                              </div>
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
                              {[{ name: 'Trang chủ', href: '/' }, { name: 'Sách', href: '/books' }, { name: 'Về chúng tôi', href: '/about' }, { name: 'FAQ', href: '/faq' }, { name: 'Đăng nhập', href: '/login' }, { name: 'Đăng ký', href: '/register' }].map((item) => (
                                    <Link
                                          rel="preload"
                                          as={""}
                                          key={item.name}
                                          href={item.href}
                                          className={`block text-sm font-medium py-2 px-3 rounded-md transition-colors ${isActive(item.href) ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
                                    >
                                          {item.name}
                                    </Link>
                              ))}
                        </div>
                  )}
            </header>
      );
};

export default Header;
