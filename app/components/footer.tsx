import Link from 'next/link';
import { style } from '../styles/style';
import { FaFacebook, FaGithub, FaLinkedin, FaLongArrowAltRight } from "react-icons/fa";
import { IoIosCall, IoIosMail } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';

const Footer = () => {
      return (
            <footer className="dark:bg-[#282422] bg-[#dfe3e4] dark:text-white text-black w-full h-auto bottom-0">
                  <div className='flex justify-between mx-40 py-7'>
                        <div className='w-[400px] h-40'>
                              <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8046319588506!2d106.73568069886078!3d10.794568166897367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175260f64536ecb%3A0xbef6080aa59b0ea1!2zQ2h1bmcgY8awIELhu5kgQ8O0bmcgQW4sIMSQxrDhu51uZyAzLCBQLiBCw6xuaCBBbiwgUXXhuq1uIDIsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1735228133914!5m2!1sen!2s&language=vi"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                        </div>
                        <div className='w-[400px]'>
                              <h3 className={`${style.titleFooter}`}>Thông tin liên hệ</h3>
                              <ul className='pt-4'>
                                    <li className={`${style.labelFooter}`}><IoIosCall size={20} /> <span>+84 856 562 424</span></li>
                                    <li className={`${style.labelFooter}`}><IoIosMail size={20} /> <span>novelnest@contact.com</span></li>
                                    <li className={`${style.labelFooter}`}><FaLocationDot size={20} /> <span>Chung cư Bộ công an, Block A, Đường số 3, phường An Khánh, TP.Thủ Đức</span></li>
                              </ul>
                        </div>

                        <div className='w-[400px]'>
                              <h3 className={`${style.titleFooter}`}>Đăng ký và theo dõi</h3>
                              <p className={` ${style.labelFooter} pt-4`}>Muốn trở thành một độc giả của NovelNest?</p>
                              <div className="flex items-center space-x-3 text-[12px]">
                                    <p>Còn ngần ngại gì mà không bấm vào đây</p>
                                    <FaLongArrowAltRight size={20} />
                                    <Link href={'/register'} className="font-bold text-blue-600">Đăng ký</Link>
                              </div>


                              <p className={`${style.labelFooter}`}>Theo dõi NovelNest tại</p>
                              <ul className='flex space-x-6 mt-3'>
                                    <li><Link href={'https://www.facebook.com/dgiaan04'}><FaFacebook size={20} /></Link></li>
                                    <li><Link href={'https://www.facebook.com/dgiaan04'}><FaGithub size={20} /></Link></li>
                                    <li><Link href={'https://www.facebook.com/dgiaan04'}><FaLinkedin size={20} /></Link></li>
                              </ul>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
