'use client'

import { FaMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
      const [mounted, setMounted] = useState(false);
      const { theme, setTheme } = useTheme();

      useEffect(() => setMounted(true), []);

      if (!mounted) return null;

      return (
            <div className="flex items-center space-x-2">
                  {theme === 'dark' ? (
                        <FaMoon
                              className="text-gray-400 cursor-pointer text-base"
                              onClick={() => setTheme('light')}
                        />
                  ) : (
                        <IoSunnyOutline
                              className="text-yellow-500 cursor-pointer text-base"
                              onClick={() => setTheme('dark')}
                        />
                  )}
            </div>
      );
};

export default ThemeSwitch;