"use client"

import type React from "react"

import { createContext, useState, type ReactNode, useEffect, useCallback } from "react"
import { userService } from "../lib/api/user"

export interface AuthContextType {
      isAuthenticated: boolean
      user: IUser
}

interface ApiErrorResponse {
      response?: {
            status?: number
            data?: {
                  code?: string
                  message?: string
            }
      }
}

interface AuthProviderProps {
      children: ReactNode
}

export const AuthContext = createContext<{
      userInfo: AuthContextType
      setUserInfo: React.Dispatch<React.SetStateAction<AuthContextType>>
      logout: () => void
      isLoading: boolean
      refreshUserInfo: () => Promise<void>
      updateUserAvatar: (avatarUrl: string) => void
}>({
      userInfo: {
            isAuthenticated: false,
            user: {
                  _id: "",
                  email: "",
                  name: "",
                  role: "",
                  loginMethod: ""
            },
      },
      setUserInfo: () => { },
      logout: () => { },
      isLoading: true,
      refreshUserInfo: async () => { },
      updateUserAvatar: () => { },
})

const defaultUser: IUser = {
      _id: "",
      email: "",
      name: "",
      role: "",
      loginMethod: ""
}

const getStoredData = (key: string): string | null => {
      if (typeof window === "undefined") return null
      try {
            return localStorage.getItem(key)
      } catch (error) {
            console.error(`Error reading ${key} from localStorage:`, error)
            return null
      }
}

const setStoredData = (key: string, value: string): void => {
      if (typeof window === "undefined") return
      try {
            localStorage.setItem(key, value)
      } catch (error) {
            console.error(`Error setting ${key} to localStorage:`, error)
      }
}

const removeStoredData = (key: string): void => {
      if (typeof window === "undefined") return
      try {
            localStorage.removeItem(key)
      } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error)
      }
}

const getInitialAuthState = (): AuthContextType => {
      const storedUser = getStoredData("user_info")
      const token = getStoredData("access_token")
      const refreshToken = getStoredData("refresh_token")

      if (token && refreshToken && storedUser) {
            try {
                  const parsedUser = JSON.parse(storedUser)
                  if (parsedUser.isAuthenticated && parsedUser.user?._id) {
                        return parsedUser
                  }
            } catch (error) {
                  console.error("Error parsing stored user info:", error)
            }
      }

      return {
            isAuthenticated: false,
            user: defaultUser,
      }
}

export const AuthWrapper: React.FC<AuthProviderProps> = ({ children }) => {
      // Khởi tạo state với dữ liệu từ localStorage
      const [userInfo, setUserInfo] = useState<AuthContextType>(() => getInitialAuthState())
      const [isLoading, setIsLoading] = useState(true)

      const logout = useCallback(() => {
            removeStoredData("access_token")
            removeStoredData("refresh_token")
            removeStoredData("user_info")

            setUserInfo({
                  isAuthenticated: false,
                  user: defaultUser,
            })
      }, [])

      const updateUserAvatar = useCallback((avatarUrl: string) => {
            setUserInfo((prevState) => {
                  const updatedUserInfo = {
                        ...prevState,
                        user: {
                              ...prevState.user,
                              avatar: {
                                    ...(prevState.user.avatar ?? {}),
                                    url: avatarUrl,
                              },
                        },
                  }

                  // Cập nhật localStorage
                  setStoredData("user_info", JSON.stringify(updatedUserInfo))

                  return updatedUserInfo
            })
      }, [])

      const refreshUserInfo = useCallback(async () => {
            try {
                  const token = getStoredData("access_token")
                  const refreshToken = getStoredData("refresh_token")

                  if (!token || !refreshToken) {
                        console.log("No tokens available for refresh")
                        setUserInfo({
                              isAuthenticated: false,
                              user: defaultUser,
                        })
                        return
                  }

                  const res = await userService.getInfo()

                  const userData = res?.data || res

                  if (userData && userData._id) {
                        const userInfo: AuthContextType = {
                              isAuthenticated: true,
                              user: userData,
                        }
                        setUserInfo(userInfo)
                        setStoredData("user_info", JSON.stringify(userInfo))
                  } else {
                        console.log("Invalid user data received:", res)
                        logout()
                  }
            } catch (error) {
                  console.error("Error fetching user info:", error)

                  // Inline type checking
                  const isAuthenticationError = error &&
                        typeof error === 'object' &&
                        'response' in error &&
                        ((error as ApiErrorResponse).response?.status === 401 ||
                              (error as ApiErrorResponse).response?.status === 403 ||
                              (error as ApiErrorResponse).response?.data?.code === "NO_TOKEN" ||
                              (error as ApiErrorResponse).response?.data?.code === "INVALID_TOKEN")

                  if (isAuthenticationError) {
                        console.log("Authentication error, logging out")
                        logout()
                  } else {
                        console.log("Non-auth error, keeping current state")
                  }
            }
      }, [logout])

      useEffect(() => {
            const initializeAuth = async () => {
                  try {
                        const token = getStoredData("access_token")
                        const refreshToken = getStoredData("refresh_token")


                        if (token && refreshToken) {
                              if (userInfo.isAuthenticated && userInfo.user._id) {
                                    setTimeout(() => {
                                          refreshUserInfo().catch((error) => {
                                                console.error("Background user info validation failed:", error)
                                          })
                                    }, 100)
                              } else {
                                    await refreshUserInfo()
                              }
                        } else {
                              setUserInfo({
                                    isAuthenticated: false,
                                    user: defaultUser,
                              })

                              removeStoredData("user_info")
                              removeStoredData("access_token")
                              removeStoredData("refresh_token")
                        }
                  } catch (error) {
                        console.error("Error in initializeAuth:", error)
                        logout()
                  } finally {
                        setIsLoading(false)
                  }
            }

            initializeAuth()
      }, [])

      return (
            <AuthContext.Provider
                  value={{
                        userInfo,
                        setUserInfo,
                        logout,
                        isLoading,
                        refreshUserInfo,
                        updateUserAvatar,
                  }}
            >
                  {children}
            </AuthContext.Provider>
      )
}
