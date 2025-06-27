import type { DefaultSession, DefaultUser } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
      /**
       * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
       */
      interface Session {
            user: {
                  userData?: {
                        _id: string
                        email: string
                        name: string
                        role: string
                        phone?: string
                        address?: string
                        avatar: string
                  }
                  customAccessToken?: string
                  message?: string
                  token?: string
            } & DefaultSession["user"]
      }

      /**
       * The shape of the user object returned in the OAuth providers' `profile` callback,
       * or the second parameter of the `session` callback, when using a database.
       */
      interface User extends DefaultUser {
            customAccessToken?: string
            userData?: {
                  _id: string
                  email: string
                  name: string
                  role: string
                  phone?: string
                  address?: string
                  avatar: string
            }
            message?: string
      }
}

declare module "next-auth/jwt" {
      /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
      interface JWT extends DefaultJWT {
            customAccessToken?: string
            userData?: {
                  _id: string
                  email: string
                  name: string
                  role: string
                  phone?: string
                  address?: string
                  avatar: string
            }
            message?: string
            accessToken?: string
            provider?: string
      }
}

// Additional type definitions for your application
export interface UserData {
      _id: string
      email: string
      name: string
      role: string
      phone?: string
      address?: string
      avatar: string
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
