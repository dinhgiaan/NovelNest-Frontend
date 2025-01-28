"use client"

import { usePathname } from "next/navigation"
import Headers from "../components/header"
import Footer from "../components/footer"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
      const pathname = usePathname()
      const isAuthPage = pathname === "/login" || pathname === "/register"

      return (
            <>
                  {!isAuthPage && <Headers />}
                  <main>{children}</main>
                  {!isAuthPage && <Footer />}
            </>
      )
}

