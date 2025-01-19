'use client';

import { createContext, useState, ReactNode, useEffect } from "react";
import { getInfo } from "../lib/api";

interface User {
      _id: string;
      email: string;
      name: string;
      role: string;
      phone: string;
      address: string;
      avatar: string;
}

export interface AuthContextType {
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
                  _id: '',
                  email: '',
                  name: '',
                  role: '',
                  phone: '',
                  address: '',
                  avatar: ''
            }
      },
      setUserInfo: () => { }
});

export const AuthWrapper: React.FC<AuthProviderProps> = ({ children }) => {
      const [userInfo, setUserInfo] = useState<AuthContextType>({
            isAuthenticated: false,
            user: {
                  _id: '',
                  email: '',
                  name: '',
                  role: '',
                  phone: '',
                  address: '',
                  avatar: ''
            }
      });

      const getMyInfo = async () => {
            try {
                  const res = await getInfo();
                  console.log("--> check res getMyInfo: ", res);

                  if (res.data) {
                        const userData: AuthContextType = {
                              isAuthenticated: true,
                              user: {
                                    _id: res.data._id,
                                    email: res.data.email,
                                    name: res.data.name,
                                    role: res.data.role,
                                    phone: res.data.phone,
                                    address: res.data.address,
                                    avatar: res.data.avatar
                              }
                        };
                        setUserInfo(userData);
                        localStorage.setItem("user_info", JSON.stringify(userData));
                  }
            } catch (error) {
                  console.error("--> Error in getMyInfo: ", error);
                  setUserInfo({
                        isAuthenticated: false,
                        user: {
                              _id: '',
                              email: '',
                              name: '',
                              role: '',
                              phone: '',
                              address: '',
                              avatar: ''
                        }
                  });
            }
      };

      useEffect(() => {
            const storedUser = localStorage.getItem("user_info");
            if (storedUser) {
                  setUserInfo(JSON.parse(storedUser));
            } else {
                  getMyInfo();
            }
      }, []);

      return (
            <AuthContext.Provider value={{ userInfo, setUserInfo }}>
                  {children}
            </AuthContext.Provider>
      );
};
