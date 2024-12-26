'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Menu } from 'lucide-react';

const Header = () => {
      const pathname = usePathname();

      const isActive = (path: string) => {
            return pathname === path;
      };

      return (
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-cyan-500">
                  <div className="backdrop-blur-sm bg-white/90">
                        <nav className="max-w-7xl mx-auto px-4">
                              <div className="flex justify-between h-16 items-center">
                                    <div className="flex flex-col items-start space-y-1">
                                          <Link
                                                href="/"
                                                className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all font-myFontCustom"
                                          >
                                                NovelNest
                                          </Link>
                                    </div>

                                    <div className="hidden lg:flex lg:items-center">
                                          <div className="flex space-x-1">
                                                {[
                                                      { name: 'Trang chủ', href: '/' },
                                                      { name: 'Sách', href: '/books' },
                                                      { name: 'Về chúng tôi', href: '/about' },
                                                      { name: 'Chính sách', href: '/policy' },
                                                      { name: 'FAQ', href: '/faq' },
                                                ].map((item) => (
                                                      <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(item.href)
                                                                        ? 'bg-blue-100 text-blue-600'
                                                                        : 'text-gray-600 hover:bg-gray-100'
                                                                  }`}
                                                      >
                                                            {item.name}
                                                      </Link>
                                                ))}
                                          </div>

                                          <div className="flex items-center ml-8 pl-8 border-l border-gray-200">
                                                <div className="flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full">
                                                      <User className="h-5 w-5 text-blue-500" />
                                                      <span className="text-sm font-medium text-gray-700">
                                                            Xin chào: Đinh Gia Ân
                                                      </span>
                                                </div>
                                          </div>
                                    </div>

                                    <button className="lg:hidden p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100">
                                          <Menu className="h-6 w-6" />
                                    </button>
                              </div>
                        </nav>
                  </div>
            </header>
      );
};

export default Header;
