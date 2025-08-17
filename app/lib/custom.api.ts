import axios, { AxiosResponse } from "axios"

interface RefreshTokenResponse {
      success: boolean
      access_token: string
      refresh_token?: string
      user?: {
            _id: "",
            email: "",
            name: "",
            role: "",
      }
}

interface QueueItem {
      resolve: (value?: string | null) => void
      reject: (error?: unknown) => void
}

// Configuration
const API_CONFIG = {
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      timeout: 10000,
      headers: {
            "Content-Type": "application/json",
      },
      withCredentials: true,
}

// Create axios instance
const instance = axios.create(API_CONFIG)

// Create separate instance for refresh token (không bị intercepted)
const refreshInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      timeout: 10000,
      headers: {
            "Content-Type": "application/json",
      },
      withCredentials: true,
})

// Token refresh state
let isRefreshing = false
let failedQueue: QueueItem[] = []

// Helper Functions
const getStorageItem = (key: string): string | null => {
      return typeof window !== "undefined" ? window.localStorage?.getItem(key) : null
}

const setStorageItem = (key: string, value: string): void => {
      if (typeof window !== "undefined") {
            window.localStorage.setItem(key, value)
      }
}

const removeStorageItem = (key: string): void => {
      if (typeof window !== "undefined") {
            window.localStorage.removeItem(key)
      }
}

const clearAuthData = (): void => {
      removeStorageItem("access_token")
      removeStorageItem("refresh_token")
      removeStorageItem("user_info")
}

const emitAuthEvent = (eventType: "logout" | "refresh", data?: unknown): void => {
      if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent(`auth:${eventType}`, { detail: data }))
      }
}

const processQueue = (error: unknown, token: string | null = null): void => {
      failedQueue.forEach((prom) => {
            if (error) {
                  prom.reject(error)
            } else {
                  prom.resolve(token)
            }
      })
      failedQueue = []
}

const saveTokens = (data: RefreshTokenResponse): void => {
      setStorageItem("access_token", data.access_token)
      if (data.refresh_token) {
            setStorageItem("refresh_token", data.refresh_token)
      }
      if (data.user) {
            const userInfo = {
                  isAuthenticated: true,
                  user: data.user,
            }
            setStorageItem("user_info", JSON.stringify(userInfo))
      }
}

// const redirectToLogin = (): void => {
//       if (typeof window !== "undefined") {
//             // Tránh redirect loop
//             if (!window.location.pathname.includes("/login")) {
//                   window.location.href = "/login"
//             }
//       }
// }

const refreshAccessToken = async (): Promise<string> => {
      const refreshToken = getStorageItem("refresh_token")

      if (!refreshToken) {
            throw new Error("No refresh token available")
      }

      try {
            const response = await refreshInstance.post<RefreshTokenResponse>(`/api/v1/auth/refresh`, {
                  refresh_token: refreshToken,
            })

            if (response.data?.success && response.data?.access_token) {
                  saveTokens(response.data)
                  emitAuthEvent("refresh", response.data)
                  return response.data.access_token
            }

            throw new Error("Invalid refresh response")
      } catch (error: unknown) { //any
            if (error && typeof error === 'object' && 'response' in error) {
                  const axiosError = error as { response: { status: number } }
                  if (axiosError.response?.status === 401) {
                        clearAuthData()
                        emitAuthEvent("logout")
                        // redirectToLogin()
                  }
            }
            throw error
      }
}

const handleTokenRefresh = async (originalRequest: Record<string, unknown> & {
      _retry?: boolean,
      headers: Record<string, string>
}): Promise<AxiosResponse> => {
      if (isRefreshing) {
            // Nếu đang refresh, thêm vào queue
            return new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject })
            }).then((token) => {
                  if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                  }
                  return instance(originalRequest)
            })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
            const newToken = await refreshAccessToken()
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            processQueue(null, newToken)
            return instance(originalRequest)
      } catch (error) {
            processQueue(error, null)
            throw error
      } finally {
            isRefreshing = false
      }
}

const shouldRefreshToken = (error: unknown): boolean => {
      if (!error || typeof error !== 'object' || !('response' in error)) {
            return false
      }

      const axiosError = error as {
            response?: {
                  data?: {
                        code?: string
                        message?: string
                  }
            }
      }

      const errorCode = axiosError.response?.data?.code
      const errorMessage = axiosError.response?.data?.message?.toLowerCase()

      return (
            errorCode === "TOKEN_EXPIRED" ||
            (errorMessage?.includes("expired") ?? false) ||
            ((errorMessage?.includes("token") ?? false) &&
                  errorCode !== "NO_TOKEN" &&
                  errorCode !== "INVALID_TOKEN")
      )
}

instance.interceptors.request.use(
      (config) => {
            const token = getStorageItem("access_token")
            if (token) {
                  config.headers.Authorization = `Bearer ${token}`
            }

            if (process.env.NODE_ENV === "development") {
                  console.log("API Request:", {
                        url: config.url,
                        method: config.method,
                        hasAuth: !!config.headers.Authorization,
                  })
            }

            return config
      },
      (error) => {
            return Promise.reject(error)
      },
)

instance.interceptors.response.use(
      (response) => {
            if (process.env.NODE_ENV === "development") {
                  console.log("API Response Success:", {
                        url: response.config.url,
                        status: response.status,
                        success: response.data?.success,
                  })
            }

            if (response.data && typeof response.data === 'object' &&
                  'success' in response.data && 'data' in response.data) {
                  return response.data;
            } else {
                  return response.data || response;
            }
      },
      async (error) => {
            const originalRequest = error.config

            if (process.env.NODE_ENV === "development") {
                  console.log("API Response Error:", {
                        url: originalRequest?.url,
                        status: error?.response?.status,
                        code: error?.response?.data?.code,
                        message: error?.response?.data?.message,
                  })
            }

            if (error?.response?.status === 401 && typeof window !== "undefined" && !originalRequest._retry) {
                  if (shouldRefreshToken(error)) {
                        try {
                              return await handleTokenRefresh(originalRequest)
                        } catch (refreshError) {
                              return Promise.reject(refreshError)
                        }
                  } else {
                        const errorCode = error?.response?.data?.code
                        if (errorCode === "NO_TOKEN" || errorCode === "INVALID_TOKEN") {
                              console.log("Invalid or missing token, clearing auth data")
                              clearAuthData()
                              emitAuthEvent("logout")
                              // redirectToLogin()
                        }
                  }
            }

            return Promise.reject(error)
      },
)

export default instance;
