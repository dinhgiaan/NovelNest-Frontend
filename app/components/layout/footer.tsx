import { Facebook, Github, Linkedin, Mail, MapPinned, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
      const currentYear = new Date().getFullYear();

      const socialLinks = [
            {
                  href: 'https://www.facebook.com/dgiaan04',
                  icon: Facebook,
                  label: 'Facebook',
                  hoverColor: 'hover:text-blue-500'
            },
            {
                  href: 'https://github.com/dinhgiaan',
                  icon: Github,
                  label: 'GitHub',
                  hoverColor: 'hover:text-gray-300'
            },
            {
                  href: 'https://www.linkedin.com/in/dinhgiaan',
                  icon: Linkedin,
                  label: 'LinkedIn',
                  hoverColor: 'hover:text-blue-400'
            },
      ];

      const footerLinks = [
            { href: '/privacy', label: 'Chính sách bảo mật' },
            { href: '/terms', label: 'Điều khoản dịch vụ' },
            { href: '/about', label: 'Về chúng tôi' },
      ];

      return (
            <footer className="bg-[#0F111A] text-gray-300">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                              <div className="lg:col-span-5">
                                    <div className="space-y-6">
                                          <div>
                                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                                      NovelNest
                                                </h2>
                                                <p className="text-gray-400 mt-3 text-[13px] leading-relaxed max-w-md">
                                                      Nơi những câu chuyện và hành trình mới bắt đầu. Khám phá thế giới văn học đa dạng cùng cộng đồng của chúng tôi.
                                                </p>
                                          </div>

                                          <div>
                                                <p className="text-[13px] font-medium text-gray-300 mb-4">Kết nối với chúng tôi</p>
                                                <div className="flex space-x-4">
                                                      {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
                                                            <Link
                                                                  key={label}
                                                                  href={href}
                                                                  className={`p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-600 ${hoverColor} hover:scale-105`}
                                                                  aria-label={label}
                                                            >
                                                                  <Icon size={14} />
                                                            </Link>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="lg:col-span-4">
                                    <h3 className="text-lg font-semibold text-white mb-6">Thông tin liên hệ</h3>
                                    <div className="space-y-4">
                                          <div className="flex items-start space-x-3 group">
                                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                                      <Phone size={14} />
                                                </div>
                                                <div className='-mt-1'>
                                                      <p className="text-sm text-gray-400">Điện thoại</p>
                                                      <a href="tel:+84856562424" className="text-gray-300 hover:text-white transition-colors text-xs">
                                                            +84 856 562 424
                                                      </a>
                                                </div>
                                          </div>

                                          <div className="flex items-start space-x-3 group">
                                                <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                                                      <Mail size={14} />
                                                </div>
                                                <div className='-mt-1'>
                                                      <p className="text-sm text-gray-400">Email</p>
                                                      <a href="mailto:novelnest@contact.com" className="text-gray-300 hover:text-white transition-colors text-xs">
                                                            novelnest@contact.com
                                                      </a>
                                                </div>
                                          </div>

                                          <div className="flex items-start space-x-3 group">
                                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                                      <MapPinned size={14} />
                                                </div>
                                                <div className='-mt-1'>
                                                      <p className="text-sm text-gray-400">Địa chỉ</p>
                                                      <p className="text-gray-300 text-xs leading-relaxed max-w-xs">
                                                            Chung cư Bộ công an, Block A, Đường số 3, phường An Khánh, TP.Thủ Đức
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="lg:col-span-3">
                                    <h3 className="text-lg font-semibold text-white mb-6">Liên kết nhanh</h3>
                                    <nav className="space-y-3">
                                          {footerLinks.map(({ href, label }) => (
                                                <Link
                                                      key={href}
                                                      href={href}
                                                      className="block text-sm text-gray-400 transition-all duration-500 ease-in-out transform hover:tracking-wider hover:translate-x-1 hover:text-white"
                                                >
                                                      {label}
                                                </Link>
                                          ))}
                                    </nav>
                              </div>
                        </div>
                  </div>

                  <div className="border-t border-gray-800/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                              <div className="justify-between items-center">
                                    <p className="text-[12px] text-gray-500">
                                          © {currentYear} NovelNest. All Rights Reserved
                                    </p>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
