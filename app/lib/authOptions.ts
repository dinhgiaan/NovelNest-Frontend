import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = {
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
            async signIn({ user, account, profile }) {
                  if (account?.provider === "google" || account.provider === "github") {
                        try {
                              // Send user data to your API
                              const response = await axios.post(
                                    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/social-auth`,
                                    {
                                          email: user.email,
                                          name: user.name,
                                          avatar: user.image,
                                    }
                              );

                              // If user doesn't exist, API creates a new one
                              // If user exists, API returns existing user data
                              if (response.data.success) {
                                    // Store token in cookie/local storage (consider using httpOnly cookies for better security)
                                    if (response.data.access_token) {
                                          // The token can be stored in session or cookies
                                          // This is handled differently based on your auth strategy
                                    }
                                    return true;
                              }
                              return false;
                        } catch (error) {
                              console.error("Error during social auth:", error);
                              return false;
                        }
                  }
                  return true;
            },
            async session({ session, token }) {
                  // Get additional user info from your database
                  try {
                        // You might want to make an API call to get full user details
                        // This is optional if you have all the data you need from the provider

                        // Add custom properties to the session
                        session.user.token = token.accessToken;
                        // You can add more custom fields here
                  } catch (error) {
                        console.error("Error enriching session:", error);
                  }
                  return session;
            },
            async jwt({ token, account, user }) {
                  // Persist the OAuth access_token to the token
                  if (account) {
                        token.accessToken = account.access_token;
                        token.provider = account.provider;
                  }
                  return token;
            },
            async redirect({ url, baseUrl }) {
                  // Customize redirect behavior if needed
                  return baseUrl;
            },
      },
      pages: {
            signIn: "/login",
            // Other custom pages if needed
      },
      session: {
            strategy: "jwt",
      },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };