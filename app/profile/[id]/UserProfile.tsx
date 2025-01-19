'use client'

import { useState } from 'react'
import SideBarUser from '@/app/components/side.bar.user';
import InfoUser from '@/app/components/profile/info.user';
import { AuthContextType } from '@/app/context/auth.context';
import ChangePassword from '@/app/components/profile/change.password';

interface IProps {
      userInfo: AuthContextType;
}

const UserProfile = ({ userInfo }: IProps) => {
      const [active, setActive] = useState<number>(1);


      // console.log('--> check info: ', userInfo)

      return (
            <div className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen'>
                  <div className='flex py-4'>
                        {/* Sidebar */}
                        <div className='w-1/4'>
                              <SideBarUser active={active} setActive={setActive} />
                        </div>

                        {/* Content */}
                        <div className='w-3/4 ml-32'>
                              {active == 0 && <InfoUser userInfo={userInfo} />}
                              {active == 1 && <ChangePassword userInfo={userInfo} />}
                        </div>
                  </div>
            </div>

      )
}

export default UserProfile

