"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Headers from "../components/header"
import Footer from "../components/footer"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
      const [mounted, setMounted] = useState(false)
      const pathname = usePathname()

      useEffect(() => {
            setMounted(true)
      }, [])

      const isAuthPage = mounted ? (pathname === "/login" || pathname === "/register") : false

      return (
            <>
                  {!isAuthPage && mounted && <Headers />}
                  <main className={!isAuthPage && mounted ? "pt-0" : ""}>
                        {!mounted ? (
                              <div className="min-h-screen flex items-center justify-center">
                                    <div>Loading...</div>
                              </div>
                        ) : (
                              children
                        )}
                  </main>
                  {!isAuthPage && mounted && <Footer />}
            </>
      )
}