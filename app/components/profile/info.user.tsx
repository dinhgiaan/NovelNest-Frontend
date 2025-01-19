'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import bannerProfile from '@/app/public/banner-profile.png';
import Image from 'next/image';
import { AuthContextType } from '@/app/context/auth.context';

interface IProps {
      userInfo: AuthContextType;
}

const InfoUser = ({ userInfo }: IProps) => {

      return (
            <div className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-[620px]'>
                  <div className='flex'>
                        <div>
                              <div className='dark:bg-[#967c9d] bg-[#e3ecf9] rounded-sm'>
                                    <div className='h-40 z-10'>
                                          <Image
                                                src={bannerProfile}
                                                alt="Banner Profile User"
                                                width={1003}
                                                height={220}
                                          />
                                    </div>
                                    <div className='p-8 mt-[-95]'>
                                          <div className="flex flex-col items-center mb-6 z-50">
                                                <div className='dark:bg-[#dbdac3] bg-[#f1f0f0] rounded-full w-28 h-28 flex items-center justify-center border border-[#000]'>
                                                      <Image
                                                            alt='User Avatar Profile'
                                                            src='https://res.cloudinary.com/dovw8fqpp/image/upload/v1736577135/book_thumbnails/jfqfmqsddxvpjouxupqg.webp'
                                                            priority
                                                            width={70}
                                                            height={50}
                                                      />
                                                </div>
                                                <h1 className="text-xl font-bold dark:text-[#63d9e8] text-[#b5bc4b] mt-3 mb-1">
                                                      {userInfo.user?.name}
                                                </h1>
                                                <span className="text-xs dark:text-[#ccc] text-[#454343] tracking-wide font-medium">
                                                      {userInfo.user?.role}
                                                </span>
                                          </div>

                                          <div className='relative border-2 dark:border-[#130f0f] border-[#5e5454] p-6 rounded-md space-y-2'>
                                                <span className="absolute -top-3 left-3 dark:bg-[#967c9d] bg-[#e3ecf9] px-2 text-sm font-bold dark:text-[#b6cbfb] text-[#eda3f2]">
                                                      Thông tin cơ bản
                                                </span>
                                                <div className="flex items-center space-x-3">
                                                      <div className='dark:bg-[#dfafdf] bg-[#e4d0e4] p-2 rounded-full'>
                                                            <Mail className="w-4 h-4 dark:text-[#728bd8] text-[#85cc9f]" />
                                                      </div>
                                                      <span className="dark:text-[#ccc87e] text-[#887474] text-sm">
                                                            {userInfo.user?.email}
                                                      </span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                      <div className='dark:bg-[#dfafdf] bg-[#e4d0e4] p-2 rounded-full'>
                                                            <Phone className="w-4 h-4 dark:text-[#8d9bc6] text-[#85cc9f]" />
                                                      </div>
                                                      <span className="dark:text-[#ccc87e] text-[#887474]  text-sm">
                                                            {userInfo.user?.phone}
                                                      </span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                      <div className='dark:bg-[#dfafdf] bg-[#e4d0e4] p-2 rounded-full'>
                                                            <MapPin className="w-4 h-4 dark:text-[#8d9bc6] text-[#85cc9f]" />
                                                      </div>
                                                      <span className="dark:text-[#ccc87e] text-[#887474]  text-sm">
                                                            {userInfo.user?.address}
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div >
      )
}

export default InfoUser
