import Link from 'next/link';

const Header = () => {
      return (
            <header className="p-6 mx-auto">
                  <nav className="flex justify-between items-center">
                        <div className="text-xl font-semibold cursor-pointer">NovelNest</div>
                        <ul className="hidden lg:flex gap-7 text-sm text-gray-500 font-medium uppercase">
                              <li>
                                    <Link href="/">Trang chủ</Link>
                              </li>
                              <li>
                                    <Link href="/books">Sách</Link>
                              </li>
                              <li>
                                    <Link href="/about">Về chúng tôi</Link>
                              </li>
                              <li>
                                    <Link href="/policy">Chính sách</Link>
                              </li>
                              <li>
                                    <Link href="/faq">FAQ</Link>
                              </li>
                        </ul>
                  </nav>
            </header>
      );
};

export default Header;
