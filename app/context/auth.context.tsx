'use client'

import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
      email: string;
      name: string;
      role: string;
}

interface AuthContextType {
      isAuthenticated: boolean;
      user: User;
}

interface AuthProviderProps {
      children: ReactNode;
}

export const AuthContext = createContext<{
      userInfo: AuthContextType;
      setUserInfo: React.Dispatch<React.SetStateAction<AuthContextType>>;
}>({
      userInfo: {
            isAuthenticated: false,
            user: {
                  email: '',
                  name: '',
                  role: ''
            }
      },
      setUserInfo: () => { }
});

export const AuthWrapper: React.FC<AuthProviderProps> = ({ children }) => {
      const [userInfo, setUserInfo] = useState<AuthContextType>({
            isAuthenticated: false,
            user: {
                  email: '',
                  name: '',
                  role: ''
            }
      });

      useEffect(() => {
            const storedUser = localStorage.getItem("user_info");
            if (storedUser) {
                  setUserInfo(JSON.parse(storedUser));
            }
      }, []);

      return (
            <AuthContext.Provider value={{ userInfo, setUserInfo }}>
                  {children}
            </AuthContext.Provider>
      );
};
