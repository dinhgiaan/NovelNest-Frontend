'use client'

import { useState } from 'react'
import SideBarUser from '@/app/components/side.bar.user';
import InfoUser from '@/app/components/profile/info.user';
import { AuthContextType } from '@/app/context/auth.context';
import ChangePassword from '@/app/components/profile/change.password';
import PurchasedBook from '@/app/components/profile/purchased.book';

interface IProps {
      userInfo: AuthContextType;
}

const UserProfile = ({ userInfo }: IProps) => {
      const [active, setActive] = useState<number>(0);

      return (
            <div className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen'>
                  <div className='container mx-auto px-4 py-4'>
                        <div className='flex flex-col lg:flex-row gap-4 lg:gap-8'>
                              <div className='w-full lg:w-1/4 xl:w-1/5'>
                                    <SideBarUser active={active} setActive={setActive} />
                              </div>

                              <div className='w-full lg:w-3/4 xl:w-4/5'>
                                    <div className='w-full'>
                                          {active == 0 && <InfoUser userInfo={userInfo} />}
                                          {active == 1 && <ChangePassword userInfo={userInfo} />}
                                          {active == 2 && <PurchasedBook userInfo={userInfo} />}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default UserProfile