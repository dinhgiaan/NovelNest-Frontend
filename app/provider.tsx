"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"
import MUIThemeProvider from "./components/providers/mui.theme.provider"

interface ProvidersProps {
      children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
            setMounted(true)
      }, [])

      if (!mounted) {
            return (
                  <div suppressHydrationWarning>
                        {children}
                  </div>
            )
      }

      return (
            <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  storageKey="theme"
                  disableTransitionOnChange
            >
                  <MUIThemeProvider>
                        {children}
                  </MUIThemeProvider>
            </ThemeProvider>
      )
}

export default Providers;
