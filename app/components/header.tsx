'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import langVI from '../public/lang-vi.png';
import langEN from '../public/lang-en.png';
import { FaRegUserCircle } from 'react-icons/fa';
import logo from '../public/logo.png';
import logoDark from '../public/logoDark.png';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import ThemeSwitch from './theme.switch';
import { useSession } from 'next-auth/react';

const Header = () => {
      const { data: session } = useSession();
      const pathname = usePathname();
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const isActive = (path: string) => pathname === path;

      const toggleMenu = () => setIsMenuOpen((prev) => !prev);

      return (
            <header className="sticky top-0 z-50 dark:bg-[#181818] bg-[#b6f2fe] shadow-md">
                  <nav className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
                        <Link href="/">
                              <Image
                                    src={logoDark}
                                    width={55}
                                    height={55}
                                    alt="Logo NovelNest"
                                    className="hidden dark:block"
                              />
                              <Image
                                    src={logo}
                                    width={55}
                                    height={55}
                                    alt="Logo NovelNest"
                                    className="block dark:hidden"
                              />
                        </Link>


                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-6">
                              {[{ name: 'Trang chủ', href: '/' }, { name: 'Sách', href: '/books' }, { name: 'Về chúng tôi', href: '/about' }, { name: 'Chính sách', href: '/policy' }, { name: 'FAQ', href: '/faq' }].map((item) => (
                                    <Link
                                          key={item.name}
                                          href={item.href}
                                          className={`text-[13px] font-medium transition-colors ${isActive(item.href) ? 'text-blue-600' : 'dark:text-white text-black hover:text-blue-600'}`}
                                    >
                                          {item.name}
                                    </Link>
                              ))}
                              <div className="flex items-center space-x-4">
                                    <ThemeSwitch />
                              </div>
                              <div className="flex items-center px-4 py-2 border dark:!bg-gray-200 bg-gray-700 rounded-lg">
                                    {session ?
                                          (
                                                <>
                                                      <Image src={session.user?.image as string} className='rounded-full' width={20} height={20} alt='avatar' />
                                                      <span className="ml-2 text-[10px] font-medium dark:text-black text-white">Xin chào: {session.user?.name}</span>
                                                </>
                                          )
                                          :
                                          (
                                                <>
                                                      <FaRegUserCircle className="text-blue-600" />
                                                      <span className="ml-2 text-[10px] font-medium dark:text-black text-white">Xin chào: Đinh Gia Ân</span>
                                                </>
                                          )
                                    }
                              </div>
                              <div className="flex items-center space-x-2">
                                    <Image src={langVI} width={20} height={20} alt="Tiếng Việt" className="cursor-pointer" />
                                    <Image src={langEN} width={20} height={20} alt="English" className="cursor-pointer" />
                              </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              onClick={toggleMenu}
                              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                              {isMenuOpen ? <IoMdClose className="h-6 w-6" /> : <IoMdMenu className="h-6 w-6" />}
                        </button>
                  </nav>

                  {/* Mobile Menu */}
                  {isMenuOpen && (
                        <div className="lg:hidden px-6 py-4 space-y-2 bg-gray-50 shadow-md">
                              {[{ name: 'Trang chủ', href: '/' }, { name: 'Sách', href: '/books' }, { name: 'Về chúng tôi', href: '/about' }, { name: 'Chính sách', href: '/policy' }, { name: 'FAQ', href: '/faq' }].map((item) => (
                                    <Link
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
