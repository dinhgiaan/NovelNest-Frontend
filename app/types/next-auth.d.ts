import type { DefaultSession, DefaultUser } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
      interface Session {
            user: {
                  userData?: {
                        _id: string
                        email: string
                        name: string
                        role: string
                        avatar: string
                  }
                  customAccessToken?: string
                  message?: string
                  token?: string
            } & DefaultSession["user"]
      }

      interface User extends DefaultUser {
            customAccessToken?: string
            userData?: {
                  _id: string
                  email: string
                  name: string
                  role: string
                  avatar: string
                  loginMethod: string
            }
            message?: string
      }
}

declare module "next-auth/jwt" {
      interface JWT extends DefaultJWT {
            customAccessToken?: string
            userData?: {
                  _id: string
                  email: string
                  name: string
                  role: string
                  avatar: string
                  loginMethod: string
            }
            message?: string
            accessToken?: string
            provider?: string
      }
}

export interface UserData {
      _id: string
      email: string
      name: string
      role: string
      avatar: string
      loginMethod: string
}

export interface AuthResponse {
      success: boolean
      access_token: string
      user: UserData
      message: string
}

export interface SocialAuthRequest {
      email: string
      name: string
      avatar: string
}
