import axios from "axios"
import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { JWT } from "next-auth/jwt"
import type { Session, User } from "next-auth"
import type { AdapterUser } from "next-auth/adapters"

// Extend the built-in session types
declare module "next-auth" {
      interface Session {
            user: {
                  id?: string
                  name?: string | null
                  email?: string | null
                  image?: string | null
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
            }
      }

      interface User {
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
      interface JWT {
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

export const authOptions: NextAuthOptions = {
      providers: [
            GithubProvider({
                  clientId: process.env.GITHUB_ID as string,
                  clientSecret: process.env.GITHUB_SECRET as string,
            }),
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID as string,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            }),
      ],
      callbacks: {
            async signIn({
                  user,
                  account,
            }: {
                  user: User | AdapterUser
                  account: any
            }): Promise<boolean> {
                  if (account?.provider === "google" || account?.provider === "github") {
                        try {
                              // Send user data to your API
                              const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/social-auth`, {
                                    email: user.email,
                                    name: user.name,
                                    avatar: user.image,
                              })

                              if (response.data.success) {
                                    // Store the custom access token and user data in the user object
                                    ; (user as User).customAccessToken = response.data.access_token
                                          ; (user as User).userData = response.data.user
                                          ; (user as User).message = response.data.message
                                    return true
                              }
                              return false
                        } catch (error) {
                              console.error("Error during social auth:", error)
                              return false
                        }
                  }
                  return true
            },

            async jwt({
                  token,
                  account,
                  user,
            }: {
                  token: JWT
                  account: any
                  user?: User | AdapterUser
            }): Promise<JWT> {
                  // Store custom data in JWT token
                  if (user && "customAccessToken" in user && user.customAccessToken) {
                        token.customAccessToken = user.customAccessToken
                        token.userData = (user as User).userData
                        token.message = (user as User).message
                  }

                  if (account) {
                        token.accessToken = account.access_token
                        token.provider = account.provider
                  }

                  return token
            },

            async session({
                  session,
                  token,
            }: {
                  session: Session
                  token: JWT
            }): Promise<Session> {
                  try {
                        if (token.userData) {
                              session.user.userData = token.userData
                              session.user.customAccessToken = token.customAccessToken
                              session.user.message = token.message
                        }
                        session.user.token = token.accessToken
                  } catch (error) {
                        console.error("Error enriching session:", error)
                  }
                  return session
            },

            async redirect({ baseUrl }: { url: string; baseUrl: string }): Promise<string> {
                  return baseUrl
            },
      },
      pages: {
            signIn: "/login",
      },
      session: {
            strategy: "jwt",
      },
}
