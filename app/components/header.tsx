'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import langVI from '../public/lang-vi.png';
import langEN from '../public/lang-en.png';
import logoLight from '../public/logo-light.png';
import logoDark from '../public/logo-dark.png';
import ThemeSwitch from './theme.switch';
import { useSession } from 'next-auth/react';
import { AlignJustify, ShoppingBag, User2, X } from 'lucide-react';
import { AuthContext } from '../context/auth.context';

const Header = () => {
      const { data: session } = useSession();
      const pathname = usePathname();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [openUser, setOpenUser] = useState(false);
      const { userInfo } = useContext(AuthContext);

      const isActive = useMemo(() => (path: string) => pathname === path, [pathname]);

      const toggleMenu = () => setIsMenuOpen((prev) => !prev);

      // console.log('--> check log userInfo: ', userInfo)

      return (
            <header className="sticky top-0 z-50 dark:bg-[#181818] bg-[#b6f2fe] shadow-md">
                  <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <Link href="/" rel="preload"
                              as={""}>
                              <Image
                                    src={logoDark}
                                    width={65}
                                    height={65}
                                    alt="Logo NovelNest"
                                    className="hidden dark:block"
                                    priority
                              />
                              <Image
                                    src={logoLight}
                                    width={65}
                                    height={65}
                                    alt="Logo NovelNest"
                                    className="block dark:hidden"
                                    priority
                              />
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
                                    className="flex items-center px-4 py-2 border rounded-lg dark:bg-gray-800 bg-white dark:text-white text-gray-800 dark:border-gray-700 border-gray-300 cursor-pointer"
                                    onClick={() => setOpenUser((prev) => !prev)}
                              >
                                    {userInfo ? (
                                          <>
                                                <Image
                                                      src={langVI}
                                                      className="rounded-full border-2 dark:border-blue-400 border-blue-600"
                                                      width={25}
                                                      height={25}
                                                      alt="avatar"
                                                      priority
                                                />
                                                <span className="ml-3 text-xs font-semibold">
                                                      <span className="dark:text-[#ccc] text-[#242323]">Xin chào:</span>
                                                      <span className="ml-1 dark:text-[#7ee1ee] text-[#b28a39]">{userInfo.user.name}</span>
                                                </span>
                                          </>
                                    ) : session ? (
                                          <>
                                                <Image
                                                      src={session.user?.image as string}
                                                      className="rounded-full border-2 dark:border-blue-400 border-blue-600"
                                                      width={15}
                                                      height={15}
                                                      alt="avatar"
                                                />
                                                <span className="ml-3 text-xs font-semibold">
                                                      <span className="dark:text-[#ccc] text-[#242323]">Xin chào:</span>
                                                      <span className="ml-1 dark:text-[#7ee1ee] text-[#b28a39]">{session.user?.name}</span>
                                                </span>
                                          </>
                                    ) : (
                                          <>
                                                <User2 className="text-x dark:text-gray-400 text-blue-600" />
                                                <span className="ml-3 text-xs font-medium dark:text-gray-400 text-gray-800">
                                                      Xin chào: Đinh Gia Ân
                                                </span>
                                          </>
                                    )}
                              </div>

                              {openUser && (
                                    <div className="dark:bg-[#f8f6fd] bg-[#9bbbf7] w-32 px-3 py-2 space-y-2 rounded-sm absolute top-16 right-20 flex flex-col shadow-2xl">
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href={'/profile'} className="text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold">
                                                Thông tin độc giả
                                          </Link>
                                          <Link
                                                rel="preload"
                                                as={""}
                                                href={'/'} className="text-black text-xs hover:text-[#e7ef76] hover:font-semibold dark:hover:text-[#6fc9e1] dark:hover:font-semibold">
                                                Đăng xuất
                                          </Link>
                                    </div>
                              )}
                              <div className="flex items-center space-x-2">
                                    <Image src={langVI} width={20} height={20} alt="Tiếng Việt" className="cursor-pointer" />
                                    <Image src={langEN} width={20} height={20} alt="English" className="cursor-pointer" />
                              </div>
                              <div>
                                    <ShoppingBag className='dark:text-white text-black' />
                              </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              onClick={toggleMenu}
                              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                              {isMenuOpen ? <X className="h-6 w-6" /> : <AlignJustify className="h-6 w-6" />}
                        </button>
                  </nav>

                  {/* Mobile Menu */}
                  {isMenuOpen && (
                        <div className="lg:hidden px-6 py-4 space-y-2 bg-gray-50 shadow-md">
                              {[{ name: 'Trang chủ', href: '/' }, { name: 'Sách', href: '/books' }, { name: 'Về chúng tôi', href: '/about' }, { name: 'Chính sách', href: '/policy' }, { name: 'FAQ', href: '/faq' }].map((item) => (
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
