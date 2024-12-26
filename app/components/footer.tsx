// components/Footer.js
import Link from 'next/link';
import { Phone, Mail, Facebook, Github, Linkedin, MapPinned } from 'lucide-react';

const Footer = () => {
      return (
            <footer className="bg-[#65cadb] text-white py-4 mt-10">
                  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="flex flex-col space-y-2 mb-4 md:mb-0">
                              <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
                              <ul className="space-y-1 text-sm">
                                    <li><Link href="/" className="hover:text-gray-900 transition duration-300">Trang chủ</Link></li>
                                    <li><Link href="/books" className="hover:text-gray-900 transition duration-300">Sách</Link></li>
                                    <li><Link href="/about" className="hover:text-gray-900 transition duration-300">Về chúng tôi</Link></li>
                                    <li><Link href="/policy" className="hover:text-gray-900 transition duration-300">Chính sách</Link></li>
                                    <li><Link href="/faq" className="hover:text-gray-900 transition duration-300">FAQ</Link></li>
                              </ul>
                        </div>

                        <div className="flex flex-col space-y-2 mb-4 md:mb-0">
                              <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
                              <ul className="space-y-1 text-sm">
                                    <li className="flex items-center">
                                          <Phone className="mr-2" />
                                          <span>+84 565 424</span>
                                    </li>
                                    <li className="flex items-center">
                                          <Mail className="mr-2" />
                                          <a href="mailto:dinhgiaanforwork@gmail.com" className="hover:text-gray-900 transition duration-300">
                                                dinhgiaanforwork@gmail.com
                                          </a>

                                    </li>
                                    <li className="flex items-center">
                                          <MapPinned className="mr-2" />
                                          <span>Chung cư Bộ công an, Block A, Đường số 3, phường An Khánh, TP.Thủ Đức</span>
                                    </li>
                              </ul>
                        </div>

                        <div className="flex flex-col space-y-2">
                              <h3 className="text-lg font-semibold">Mạng xã hội</h3>
                              <div className="flex space-x-4 text-2xl">
                                    <Link href="https://www.facebook.com/dgiaan04" className="hover:text-gray-900 transition duration-300">
                                          <Facebook />
                                    </Link>
                                    <Link href="https://github.com/dinhgiaandev" className="hover:text-gray-900 transition duration-300">
                                          <Github />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/dinhgiaan/" className="hover:text-gray-900 transition duration-300">
                                          <Linkedin />
                                    </Link>
                              </div>
                        </div>

                  </div>

                  <div className="mt-8">
                        <div className="w-full max-w-sm mx-auto">
                              <div className="h-56 w-[500px] bg-gray-200">
                                    <iframe
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8046319588506!2d106.73568069886078!3d10.794568166897367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175260f64536ecb%3A0xbef6080aa59b0ea1!2zQ2h1bmcgY8awIELhu5kgQ8O0bmcgQW4sIMSQxrDhu51uZyAzLCBQLiBCw6xuaCBBbiwgUXXhuq1uIDIsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1735228133914!5m2!1sen!2s"
                                          width="100%"
                                          height="100%"
                                          style={{ border: 0 }}
                                          allowFullScreen={true}
                                          loading="lazy"
                                          referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                              </div>
                        </div>
                  </div>

                  <div className="text-center mt-4 text-sm text-gray-900">
                        <p>&copy; 2024 NovelNest. All rights reserved.</p>
                  </div>
            </footer>
      );
};

export default Footer;
