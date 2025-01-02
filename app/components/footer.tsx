import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosCall, IoIosMail } from 'react-icons/io';
import { style } from '../styles/style';
import { FaMapLocation } from 'react-icons/fa6';

const Footer = () => {
      return (
            <footer className="bg-gray-900 text-white w-full py-10">
                  <div className="container mx-auto px-6 lg:px-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div>
                                    <h3 className={`${style.titleFooter}`}>NovelNest</h3>
                                    <p className={`${style.labelFooter}`}>
                                          Nơi những câu chuyện và hành trình mới bắt đầu. Tham gia cộng đồng của chúng tôi để khám phá thế giới văn học đa dạng.
                                    </p>
                              </div>

                              <div>
                                    <h3 className={`${style.titleFooter}`}>Liên hệ</h3>
                                    <ul className="text-sm space-y-3 text-gray-400">
                                          <li className="flex items-center space-x-3">
                                                <IoIosCall size={20} />
                                                <span className={`${style.labelFooter}`}>+84 856 562 424</span>
                                          </li>
                                          <li className="flex items-center space-x-3">
                                                <IoIosMail size={20} />
                                                <span className={`${style.labelFooter}`}>novelnest@contact.com</span>
                                          </li>
                                          <li className="flex items-center space-x-4">
                                                <FaMapLocation size={20} />
                                                <span className={`${style.labelFooter}`}>
                                                      Chung cư Bộ công an, Block A, Đường số 3, phường An Khánh, TP.Thủ Đức
                                                </span>
                                          </li>
                                    </ul>
                              </div>

                              <div>
                                    <h3 className={`${style.titleFooter}`}>Theo dõi chúng tôi</h3>
                                    <p className={`${style.labelFooter}`}>
                                          Kết nối với NovelNest qua các nền tảng xã hội.
                                    </p>
                                    <ul className="flex space-x-6 mt-3">
                                          <li>
                                                <Link href={'https://www.facebook.com/dgiaan04'} passHref>
                                                      <FaFacebook size={20} className="hover:text-blue-400" />
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href={'https://github.com/dinhgiaandev'} passHref>
                                                      <FaGithub size={20} className="hover:text-gray-300" />
                                                </Link>
                                          </li>
                                          <li>
                                                <Link href={'https://www.linkedin.com/in/dinhgiaan'} passHref>
                                                      <FaLinkedin size={20} className="hover:text-blue-600" />
                                                </Link>
                                          </li>
                                    </ul>
                              </div>
                        </div>

                        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
                              © {new Date().getFullYear()} NovelNest. All rights reserved.
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
