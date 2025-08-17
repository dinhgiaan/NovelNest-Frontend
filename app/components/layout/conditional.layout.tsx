"use client"

import { useState, useEffect, Suspense, ReactNode } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const Headers = dynamic(() => import("./header/index"), {
      ssr: false,
      loading: () => (
            <div className="h-16 bg-gray-800/50 animate-pulse"></div>
      )
})

const Footer = dynamic(() => import("./footer"), {
      ssr: false,
      loading: () => (
            <div className="h-32 bg-gray-800/50 animate-pulse"></div>
      )
})

const LoadingScreen = () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center space-y-4">
                  <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-ping mx-auto"></div>
                  </div>
                  <div className="space-y-2">
                        <p className="text-gray-50 text-xl font-medium">Đang tải trang...</p>
                        <p className="text-gray-400 text-sm">Bạn hãy đợi chút xíu nhé</p>
                  </div>
            </div>
      </div>
)

const LayoutContent = ({ children }: { children: ReactNode }) => {
      const pathname = usePathname();
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
            setMounted(true)
      }, [])

      if (!mounted) {
            return <LoadingScreen />
      }

      const isAuthPage = pathname === "/login" || pathname === "/register" || pathname.includes("/books/read") || pathname === "/terms" || pathname === "/privacy";

      return (
            <>
                  {!isAuthPage && (
                        <Suspense fallback={<div className="h-16 bg-gray-800/50 animate-pulse"></div>}>
                              <Headers />
                        </Suspense>
                  )}
                  <main className={!isAuthPage ? "mt-0" : ""}>
                        {children}
                  </main>
                  {!isAuthPage && (
                        <Suspense fallback={<div className="h-32 bg-gray-800/50 animate-pulse"></div>}>
                              <Footer />
                        </Suspense>
                  )}
            </>
      )
}

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
      return (
            <Suspense fallback={<LoadingScreen />}>
                  <LayoutContent>{children}</LayoutContent>
            </Suspense>
      )
}
